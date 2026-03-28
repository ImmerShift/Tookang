import Link from "next/link";

import { getActiveJobs } from "../../lib/db/jobs";

export default async function JobsPage() {
  const { data: jobs, error } = await getActiveJobs();

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#191C1D]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[#000666]">
              Active Jobs
            </h1>
            <p className="mt-2 text-sm text-[#454652]">
              Latest active requests that are available for bidding.
            </p>
          </div>
          <Link className="text-sm font-semibold text-[#AC332A]" href="/jobs/new">
            Post a job
          </Link>
        </div>

        <div className="grid gap-4">
          {error && (
            <div className="rounded-[20px] bg-[#FFE8E6] p-4 text-sm text-[#AC332A]">
              {error.message}
            </div>
          )}
          {(jobs ?? []).length === 0 && !error && (
            <div className="rounded-[24px] bg-white px-6 py-5 text-sm text-[#454652]">
              No active jobs yet. Create the first one.
            </div>
          )}
          {(jobs ?? []).map((job) => (
            <div
              key={job.id}
              className="flex flex-col gap-4 rounded-[28px] bg-white p-6 shadow-[0_18px_45px_rgba(25,28,29,0.08)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Link
                    className="text-lg font-semibold text-[#000666]"
                    href={`/jobs/${job.id}`}
                  >
                    {job.title ?? "Untitled job"}
                  </Link>
                  <p className="text-sm text-[#454652]">{job.location ?? "Location not set"}</p>
                </div>
                <span className="rounded-full bg-[#1A237E]/10 px-3 py-1 text-xs font-semibold text-[#1A237E]">
                  {job.status ?? "active"}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-[#454652]">
                <span>
                  Budget:{" "}
                  {job.budget_min || job.budget_max
                    ? `Rp ${job.budget_min ?? "-"} - ${job.budget_max ?? "-"}`
                    : "Not specified"}
                </span>
                <span>Category: {job.category ?? "General"}</span>
                <span>Inspection: {job.requires_inspection ? "Required" : "No"}</span>
              </div>
              {job.description && <p className="text-sm text-[#454652]">{job.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
