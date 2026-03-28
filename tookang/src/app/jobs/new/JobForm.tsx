"use client";

import { useFormState } from "react-dom";

import { createJobAction } from "./actions";

const initialState = {
  ok: false,
  message: "",
};

export default function JobForm() {
  const [state, formAction] = useFormState(createJobAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          User ID (Auth UID)
          <input
            name="user_id"
            placeholder="Paste auth user id for demo mode"
            className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Category
          <input
            name="category"
            placeholder="Plumbing, Electrical, Renovation"
            className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Job Title
          <input
            name="title"
            required
            placeholder="Fix leaking kitchen pipe"
            className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Location
          <input
            name="location"
            placeholder="Denpasar, Bali"
            className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm">
        Description
        <textarea
          name="description"
          rows={4}
          placeholder="Describe the work, timeline, and any constraints."
          className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-2 text-sm">
          Budget Min (IDR)
          <input
            name="budget_min"
            type="number"
            min="0"
            step="1000"
            placeholder="500000"
            className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Budget Max (IDR)
          <input
            name="budget_max"
            type="number"
            min="0"
            step="1000"
            placeholder="1500000"
            className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Inspection Fee (IDR)
          <input
            name="inspection_fee_idr"
            type="number"
            min="0"
            step="1000"
            placeholder="150000"
            className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-6 text-sm">
        <label className="flex items-center gap-2">
          <input
            name="requires_inspection"
            type="checkbox"
            className="h-4 w-4 rounded border-white/20 bg-zinc-950"
          />
          Requires inspection
        </label>
        <label className="flex items-center gap-2">
          <input
            name="crew_welcome"
            type="checkbox"
            className="h-4 w-4 rounded border-white/20 bg-zinc-950"
          />
          Crew welcome
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-zinc-950">
          Post Job
        </button>
        <div className="text-sm text-zinc-300">{state.message}</div>
      </div>
    </form>
  );
}
