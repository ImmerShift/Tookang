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
    <form action={formAction} className="flex flex-col gap-8">
      <div className="rounded-[28px] bg-white px-6 py-6 shadow-[0_20px_50px_rgba(25,28,29,0.08)]">
        <h2 className="font-[var(--font-display)] text-lg font-semibold text-[#000666]">
          Project Details
        </h2>
        <p className="mt-2 text-sm text-[#454652]">
          Provide a clear description so professionals can respond quickly.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-xs text-[#454652]">
            User ID (Auth UID)
            <input
              name="user_id"
              placeholder="Paste auth user id for demo mode"
              className="rounded-2xl bg-[#F3F4F5] px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs text-[#454652]">
            Category
            <input
              name="category"
              placeholder="Plumbing, Electrical, Renovation"
              className="rounded-2xl bg-[#F3F4F5] px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs text-[#454652]">
            Job Title
            <input
              name="title"
              required
              placeholder="Fix leaking kitchen pipe"
              className="rounded-2xl bg-[#F3F4F5] px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs text-[#454652]">
            Location
            <input
              name="location"
              placeholder="Denpasar, Bali"
              className="rounded-2xl bg-[#F3F4F5] px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
            />
          </label>
        </div>

        <label className="mt-4 flex flex-col gap-2 text-xs text-[#454652]">
          Description
          <textarea
            name="description"
            rows={4}
            placeholder="Describe the work, timeline, and any constraints."
            className="rounded-2xl bg-[#F3F4F5] px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
          />
        </label>
      </div>

      <div className="rounded-[28px] bg-[#F3F4F5] px-6 py-6">
        <h2 className="font-[var(--font-display)] text-lg font-semibold text-[#000666]">
          Budget & Preferences
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-2 text-xs text-[#454652]">
            Budget Min (IDR)
            <input
              name="budget_min"
              type="number"
              min="0"
              step="1000"
              placeholder="500000"
              className="rounded-2xl bg-white px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs text-[#454652]">
            Budget Max (IDR)
            <input
              name="budget_max"
              type="number"
              min="0"
              step="1000"
              placeholder="1500000"
              className="rounded-2xl bg-white px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs text-[#454652]">
            Inspection Fee (IDR)
            <input
              name="inspection_fee_idr"
              type="number"
              min="0"
              step="1000"
              placeholder="150000"
              className="rounded-2xl bg-white px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
            />
          </label>
        </div>
        <div className="mt-5 flex flex-wrap gap-6 text-sm text-[#454652]">
          <label className="flex items-center gap-2">
            <input
              name="requires_inspection"
              type="checkbox"
              className="h-4 w-4 rounded bg-white"
            />
            Requires inspection
          </label>
          <label className="flex items-center gap-2">
            <input
              name="crew_welcome"
              type="checkbox"
              className="h-4 w-4 rounded bg-white"
            />
            Crew welcome
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button className="rounded-full bg-[#000666] px-6 py-3 text-sm font-semibold text-white">
          Post Job
        </button>
        <div className="text-sm text-[#454652]">{state.message}</div>
      </div>
    </form>
  );
}
