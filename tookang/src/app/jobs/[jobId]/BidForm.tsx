"use client";

import { useFormState } from "react-dom";

import { createBidAction } from "./actions";

const initialState = {
  ok: false,
  message: "",
};

export default function BidForm({ jobId }: { jobId: string }) {
  const [state, formAction] = useFormState(createBidAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input name="job_id" type="hidden" value={jobId} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs text-[#454652]">
          Bid From
          <select
            name="bid_from_type"
            required
            className="rounded-2xl bg-[#F3F4F5] px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
            defaultValue="solo"
          >
            <option value="solo">Solo Tukang</option>
            <option value="crew">Crew / Agency</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-xs text-[#454652]">
          Bid Type
          <select
            name="bid_type"
            className="rounded-2xl bg-[#F3F4F5] px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
            defaultValue="direct_quote"
          >
            <option value="direct_quote">Direct Quote</option>
            <option value="inspection_only">Inspection Only</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-xs text-[#454652]">
          Tukang ID
          <input
            name="tukang_id"
            placeholder="Required for solo bids"
            className="rounded-2xl bg-[#F3F4F5] px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs text-[#454652]">
          Agency ID
          <input
            name="agency_id"
            placeholder="Required for crew bids"
            className="rounded-2xl bg-[#F3F4F5] px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs text-[#454652]">
          Bid Amount (IDR)
          <input
            name="amount"
            type="number"
            min="0"
            step="1000"
            placeholder="1500000"
            className="rounded-2xl bg-[#F3F4F5] px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs text-[#454652]">
          Duration Estimate
          <input
            name="duration_estimate"
            placeholder="3-5 days"
            className="rounded-2xl bg-[#F3F4F5] px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-xs text-[#454652]">
        Message
        <textarea
          name="message"
          rows={3}
          placeholder="Outline scope, timeline, and inspection details."
          className="rounded-2xl bg-[#F3F4F5] px-4 py-3 text-sm text-[#191C1D] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button className="rounded-full bg-[#AC332A] px-6 py-3 text-sm font-semibold text-white">
          Submit Bid
        </button>
        <div className="text-sm text-[#454652]">{state.message}</div>
      </div>
    </form>
  );
}
