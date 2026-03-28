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
        <label className="flex flex-col gap-2 text-sm">
          Bid From
          <select
            name="bid_from_type"
            required
            className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
            defaultValue="solo"
          >
            <option value="solo">Solo Tukang</option>
            <option value="crew">Crew / Agency</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Bid Type
          <select
            name="bid_type"
            className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
            defaultValue="direct_quote"
          >
            <option value="direct_quote">Direct Quote</option>
            <option value="inspection_only">Inspection Only</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Tukang ID
          <input
            name="tukang_id"
            placeholder="Required for solo bids"
            className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Agency ID
          <input
            name="agency_id"
            placeholder="Required for crew bids"
            className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          Bid Amount (IDR)
          <input
            name="amount"
            type="number"
            min="0"
            step="1000"
            placeholder="1500000"
            className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Duration Estimate
          <input
            name="duration_estimate"
            placeholder="3-5 days"
            className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm">
        Message
        <textarea
          name="message"
          rows={3}
          placeholder="Outline scope, timeline, and inspection details."
          className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white"
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-zinc-950">
          Submit Bid
        </button>
        <div className="text-sm text-zinc-300">{state.message}</div>
      </div>
    </form>
  );
}
