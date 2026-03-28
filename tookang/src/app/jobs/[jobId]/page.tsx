import { notFound } from "next/navigation";

import { getBidsForJob } from "../../../lib/db/bids";
import { getJobById } from "../../../lib/db/jobs";
import BidForm from "./BidForm";

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
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">{job.title ?? "Untitled job"}</h1>
              <p className="mt-2 text-sm text-zinc-300">
                {job.location ?? "Location not set"} • {job.category ?? "General"}
              </p>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-emerald-300">
              {job.status ?? "active"}
            </span>
          </div>
          {job.description && <p className="mt-4 text-sm text-zinc-300">{job.description}</p>}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-300">
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
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Bids</h2>
            <div className="mt-4 grid gap-4">
              {(bids ?? []).length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4 text-sm text-zinc-300">
                  No bids yet. Be the first to respond.
                </div>
              )}
              {(bids ?? []).map((bid) => (
                <div
                  key={bid.id}
                  className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-emerald-300">{bid.bid_from_type}</span>
                    <span className="text-zinc-400">{bid.status ?? "submitted"}</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold">
                    {bid.amount ? `Rp ${bid.amount}` : "Bid amount pending"}
                  </p>
                  {bid.message && <p className="mt-2 text-sm text-zinc-300">{bid.message}</p>}
                  <div className="mt-3 text-xs text-zinc-400">
                    {bid.duration_estimate ?? "No duration provided"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Submit a Bid</h2>
            <p className="mt-2 text-sm text-zinc-300">
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
