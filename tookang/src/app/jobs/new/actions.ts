"use server";

import { getServerUserId } from "../../../lib/auth/session";
import { createSupabaseAdminClient } from "../../../lib/supabase/admin";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

type JobActionState = {
  ok: boolean;
  message: string;
  jobId?: string;
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

export const createJobAction = async (
  _prevState: JobActionState,
  formData: FormData
): Promise<JobActionState> => {
  const serverUserId = await getServerUserId();
  const fallbackUserId = parseText(formData.get("user_id"));
  const requiresInspection = formData.get("requires_inspection") === "on";
  const crewWelcome = formData.get("crew_welcome") === "on";

  const payload = {
    user_id: serverUserId ?? fallbackUserId,
    title: parseText(formData.get("title")),
    description: parseText(formData.get("description")),
    category: parseText(formData.get("category")),
    location: parseText(formData.get("location")),
    budget_min: parseNumber(formData.get("budget_min")),
    budget_max: parseNumber(formData.get("budget_max")),
    requires_inspection: requiresInspection,
    inspection_fee_idr: requiresInspection ? parseNumber(formData.get("inspection_fee_idr")) : null,
    crew_welcome: crewWelcome,
    status: "active",
  };

  if (!payload.user_id) {
    return {
      ok: false,
      message: "Missing user id. Sign in or provide a User ID.",
    };
  }

  try {
    if (serverUserId) {
      const supabase = createSupabaseServerClient();
      const { data, error } = await supabase
        .from("jobs")
        .insert(payload)
        .select("id")
        .single();

      if (error) {
        return { ok: false, message: error.message };
      }

      return { ok: true, message: "Job posted successfully.", jobId: data.id };
    }

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("jobs").insert(payload).select("id").single();

    if (error) {
      return { ok: false, message: error.message };
    }

    return { ok: true, message: "Job posted in demo mode.", jobId: data.id };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to post job.",
    };
  }
};
