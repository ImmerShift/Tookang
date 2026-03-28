"use server";

import { getServerUserId } from "../../../lib/auth/session";
import { createSupabaseAdminClient } from "../../../lib/supabase/admin";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

type BidActionState = {
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
