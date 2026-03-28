import Link from "next/link";

import JobForm from "./JobForm";

export default function NewJobPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Post a Job</h1>
            <p className="mt-2 text-sm text-zinc-300">
              Share your project details to receive bids from solo tukang or crews.
            </p>
          </div>
          <Link className="text-sm text-emerald-300" href="/jobs">
            View active jobs
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <JobForm />
        </div>
      </div>
    </div>
  );
}
