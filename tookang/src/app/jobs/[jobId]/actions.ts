"use server";

import { getServerUserId } from "../../../lib/auth/session";
import { calculatePlatformFeeAmount } from "../../../lib/escrow/amounts";
import { getNextTransactionStatus } from "../../../lib/escrow/state";
import { createSupabaseAdminClient } from "../../../lib/supabase/admin";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

type BidActionState = {
  ok: boolean;
  message: string;
};

type AcceptBidState = {
  ok: boolean;
  message: string;
};

type EscrowActionState = {
  ok: boolean;
  message: string;
};

type SubmitFinishState = {
  ok: boolean;
  message: string;
};

const parseNumber = (value: FormDataEntryValue | null) => {
  if (typeof value !== "string") {
    return null;
  }
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const parseText = (value: FormDataEntryValue | null) => {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
};

export const createBidAction = async (
  _prevState: BidActionState,
  formData: FormData
): Promise<BidActionState> => {
  const serverUserId = await getServerUserId();
  const jobId = parseText(formData.get("job_id"));
  const bidFromType = parseText(formData.get("bid_from_type")) as "solo" | "crew" | null;
  const tukangId = parseText(formData.get("tukang_id"));
  const agencyId = parseText(formData.get("agency_id"));

  if (!jobId) {
    return { ok: false, message: "Missing job id." };
  }

  if (!bidFromType) {
    return { ok: false, message: "Choose a bid type." };
  }

  if (bidFromType === "solo" && !tukangId) {
    return { ok: false, message: "Solo bids require a tukang id." };
  }

  if (bidFromType === "crew" && !agencyId) {
    return { ok: false, message: "Crew bids require an agency id." };
  }

  const payload = {
    job_id: jobId,
    bid_from_type: bidFromType,
    tukang_id: bidFromType === "solo" ? tukangId : null,
    agency_id: bidFromType === "crew" ? agencyId : null,
    amount: parseNumber(formData.get("amount")),
    message: parseText(formData.get("message")),
    duration_estimate: parseText(formData.get("duration_estimate")),
    bid_type: parseText(formData.get("bid_type")),
    status: "submitted",
  };

  try {
    if (serverUserId) {
      const supabase = createSupabaseServerClient();
      const { error } = await supabase.from("bids").insert(payload);
      if (error) {
        return { ok: false, message: error.message };
      }
      return { ok: true, message: "Bid submitted." };
    }

    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("bids").insert(payload);
    if (error) {
      return { ok: false, message: error.message };
    }

    return { ok: true, message: "Bid submitted in demo mode." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to submit bid.",
    };
  }
};

export const acceptBidAction = async (
  _prevState: AcceptBidState,
  formData: FormData
): Promise<AcceptBidState> => {
  const serverUserId = await getServerUserId();
  const bidId = parseText(formData.get("bid_id"));

  if (!bidId) {
    return { ok: false, message: "Missing bid id." };
  }

  try {
    const supabase = serverUserId ? createSupabaseServerClient() : createSupabaseAdminClient();
    const { data: bid, error: bidError } = await supabase
      .from("bids")
      .select("*")
      .eq("id", bidId)
      .maybeSingle();

    if (bidError) {
      return { ok: false, message: bidError.message };
    }

    if (!bid) {
      return { ok: false, message: "Bid not found." };
    }

    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", bid.job_id)
      .maybeSingle();

    if (jobError) {
      return { ok: false, message: jobError.message };
    }

    if (!job) {
      return { ok: false, message: "Job not found." };
    }

    if (serverUserId && job.user_id !== serverUserId) {
      return { ok: false, message: "You can only accept bids on your own jobs." };
    }

    if (!bid.amount) {
      return { ok: false, message: "Bid amount is required to accept." };
    }

    const platformFeeRate = 5;
    const platformFeeAmount = calculatePlatformFeeAmount(bid.amount, platformFeeRate);
    const transactionStatus =
      bid.bid_type === "inspection_only" ? "inspection_escrowed" : "full_escrow_funded";

    const { error: transactionError } = await supabase.from("transactions").insert({
      job_id: job.id,
      user_id: job.user_id,
      payee_type: bid.bid_from_type,
      tukang_id: bid.tukang_id,
      agency_id: bid.agency_id,
      total_amount: bid.amount,
      platform_fee_rate: platformFeeRate,
      platform_fee_amount: platformFeeAmount,
      material_release_amount: null,
      status: transactionStatus,
      midtrans_order_id: null,
    });

    if (transactionError) {
      return { ok: false, message: transactionError.message };
    }

    const { error: jobUpdateError } = await supabase
      .from("jobs")
      .update({
        hired_type: bid.bid_from_type,
        hired_tukang_id: bid.bid_from_type === "solo" ? bid.tukang_id : null,
        hired_agency_id: bid.bid_from_type === "crew" ? bid.agency_id : null,
        status: "assigned",
      })
      .eq("id", job.id);

    if (jobUpdateError) {
      return { ok: false, message: jobUpdateError.message };
    }

    const { error: acceptError } = await supabase
      .from("bids")
      .update({ status: "accepted" })
      .eq("id", bid.id);

    if (acceptError) {
      return { ok: false, message: acceptError.message };
    }

    const { error: declineError } = await supabase
      .from("bids")
      .update({ status: "declined" })
      .eq("job_id", job.id)
      .neq("id", bid.id);

    if (declineError) {
      return { ok: false, message: declineError.message };
    }

    return { ok: true, message: "Bid accepted and escrow created." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to accept bid.",
    };
  }
};

export const transitionEscrowAction = async (
  _prevState: EscrowActionState,
  formData: FormData
): Promise<EscrowActionState> => {
  const serverUserId = await getServerUserId();
  const transactionId = parseText(formData.get("transaction_id"));
  const event = parseText(formData.get("event"));

  if (!transactionId || !event) {
    return { ok: false, message: "Missing transaction action." };
  }

  try {
    const supabase = serverUserId ? createSupabaseServerClient() : createSupabaseAdminClient();
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", transactionId)
      .maybeSingle();

    if (transactionError) {
      return { ok: false, message: transactionError.message };
    }

    if (!transaction) {
      return { ok: false, message: "Transaction not found." };
    }

    const nextStatus = getNextTransactionStatus(transaction.status, event as never);
    if (!nextStatus) {
      return { ok: false, message: "Invalid escrow transition." };
    }

    const { error: updateError } = await supabase
      .from("transactions")
      .update({ status: nextStatus })
      .eq("id", transaction.id);

    if (updateError) {
      return { ok: false, message: updateError.message };
    }

    if (event === "confirm_completion" || event === "resolve_dispute") {
      await supabase.from("jobs").update({ status: "completed" }).eq("id", transaction.job_id);
    }

    if (event === "open_dispute") {
      await supabase.from("jobs").update({ status: "disputed" }).eq("id", transaction.job_id);
    }

    return { ok: true, message: "Escrow updated." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to update escrow.",
    };
  }
};

export const submitFinishAction = async (
  _prevState: SubmitFinishState,
  formData: FormData
): Promise<SubmitFinishState> => {
  const serverUserId = await getServerUserId();
  const transactionId = parseText(formData.get("transaction_id"));
  const finishPhotoUrl = parseText(formData.get("finish_photo_url"));

  if (!transactionId || !finishPhotoUrl) {
    return { ok: false, message: "Missing finish photo URL." };
  }

  try {
    const supabase = serverUserId ? createSupabaseServerClient() : createSupabaseAdminClient();
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", transactionId)
      .maybeSingle();

    if (transactionError) {
      return { ok: false, message: transactionError.message };
    }

    if (!transaction) {
      return { ok: false, message: "Transaction not found." };
    }

    const nextStatus = getNextTransactionStatus(transaction.status, "submit_finish");
    if (!nextStatus) {
      return { ok: false, message: "Invalid finish submission." };
    }

    const { error: jobError } = await supabase
      .from("jobs")
      .update({ finish_photo_url: finishPhotoUrl })
      .eq("id", transaction.job_id);

    if (jobError) {
      return { ok: false, message: jobError.message };
    }

    const { error: transactionUpdateError } = await supabase
      .from("transactions")
      .update({ status: nextStatus })
      .eq("id", transaction.id);

    if (transactionUpdateError) {
      return { ok: false, message: transactionUpdateError.message };
    }

    return { ok: true, message: "Finish submitted." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to submit finish.",
    };
  }
};
