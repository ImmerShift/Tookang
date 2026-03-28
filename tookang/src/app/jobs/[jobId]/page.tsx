import { notFound } from "next/navigation";

import { acceptBidAction } from "./actions";
import BidForm from "./BidForm";
import { getBidsForJob } from "../../../lib/db/bids";
import { getJobById } from "../../../lib/db/jobs";

type JobPageProps = {
  params: { jobId: string };
};

export default async function JobDetailPage({ params }: JobPageProps) {
  const { data: job } = await getJobById(params.jobId);
  if (!job) {
    notFound();
  }

  const { data: bids } = await getBidsForJob(job.id);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#191C1D]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10">
        <div className="rounded-[32px] bg-white px-6 py-6 shadow-[0_24px_60px_rgba(25,28,29,0.08)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[#000666]">
                {job.title ?? "Untitled job"}
              </h1>
              <p className="mt-2 text-sm text-[#454652]">
                {job.location ?? "Location not set"} • {job.category ?? "General"}
              </p>
            </div>
            <span className="rounded-full bg-[#1A237E]/10 px-3 py-1 text-xs font-semibold text-[#1A237E]">
              {job.status ?? "active"}
            </span>
          </div>
          {job.description && <p className="mt-4 text-sm text-[#454652]">{job.description}</p>}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#454652]">
            <span>
              Budget:{" "}
              {job.budget_min || job.budget_max
                ? `Rp ${job.budget_min ?? "-"} - ${job.budget_max ?? "-"}`
                : "Not specified"}
            </span>
            <span>Inspection: {job.requires_inspection ? "Required" : "No"}</span>
            <span>Crew welcome: {job.crew_welcome ? "Yes" : "No"}</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] bg-[#F3F4F5] px-6 py-6">
            <h2 className="font-[var(--font-display)] text-xl font-semibold text-[#000666]">
              Bids
            </h2>
            <div className="mt-4 grid gap-4">
              {(bids ?? []).length === 0 && (
                <div className="rounded-[24px] bg-white px-5 py-4 text-sm text-[#454652]">
                  No bids yet. Be the first to respond.
                </div>
              )}
              {(bids ?? []).map((bid) => (
                <div key={bid.id} className="rounded-[26px] bg-white px-5 py-5">
                  <div className="flex items-center justify-between text-xs text-[#454652]">
                    <span className="font-semibold text-[#1A237E]">{bid.bid_from_type}</span>
                    <span>{bid.status ?? "submitted"}</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-[#000666]">
                    {bid.amount ? `Rp ${bid.amount}` : "Bid amount pending"}
                  </p>
                  {bid.message && <p className="mt-2 text-sm text-[#454652]">{bid.message}</p>}
                  <div className="mt-3 text-xs text-[#454652]">
                    {bid.duration_estimate ?? "No duration provided"}
                  </div>
                  {job.status !== "assigned" && (
                    <form action={acceptBidAction} className="mt-4">
                      <input type="hidden" name="bid_id" value={bid.id} />
                      <button className="rounded-full bg-[#AC332A] px-4 py-2 text-xs font-semibold text-white">
                        Accept Bid
                      </button>
                    </form>
                  )}
                  {job.status === "assigned" && bid.status === "accepted" && (
                    <span className="mt-4 inline-flex rounded-full bg-[#DFF4E7] px-3 py-1 text-[10px] font-semibold text-[#1A7F37]">
                      Accepted
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] bg-white px-6 py-6 shadow-[0_24px_60px_rgba(25,28,29,0.08)]">
            <h2 className="font-[var(--font-display)] text-xl font-semibold text-[#000666]">
              Submit a Bid
            </h2>
            <p className="mt-2 text-sm text-[#454652]">
              Demo mode: provide a valid Tukang or Agency ID that matches the bid type.
            </p>
            <div className="mt-4">
              <BidForm jobId={job.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
