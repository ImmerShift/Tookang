import Link from "next/link";

import { getActiveJobs } from "../../lib/db/jobs";

export default async function JobsPage() {
  const { data: jobs, error } = await getActiveJobs();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Active Jobs</h1>
            <p className="mt-2 text-sm text-zinc-300">
              Latest active requests that are available for bidding.
            </p>
          </div>
          <Link className="text-sm text-emerald-300" href="/jobs/new">
            Post a job
          </Link>
        </div>

        <div className="grid gap-4">
          {error && (
            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
              {error.message}
            </div>
          )}
          {(jobs ?? []).length === 0 && !error && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
              No active jobs yet. Create the first one.
            </div>
          )}
          {(jobs ?? []).map((job) => (
            <div
              key={job.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Link
                    className="text-lg font-semibold text-emerald-200"
                    href={`/jobs/${job.id}`}
                  >
                    {job.title ?? "Untitled job"}
                  </Link>
                  <p className="text-sm text-zinc-300">{job.location ?? "Location not set"}</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-emerald-300">
                  {job.status ?? "active"}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
                <span>
                  Budget:{" "}
                  {job.budget_min || job.budget_max
                    ? `Rp ${job.budget_min ?? "-"} - ${job.budget_max ?? "-"}`
                    : "Not specified"}
                </span>
                <span>Category: {job.category ?? "General"}</span>
                <span>Inspection: {job.requires_inspection ? "Required" : "No"}</span>
              </div>
              {job.description && <p className="text-sm text-zinc-300">{job.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
