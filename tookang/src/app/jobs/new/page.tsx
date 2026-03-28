import Link from "next/link";

import JobForm from "./JobForm";

export default function NewJobPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#191C1D]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[#000666]">
              Post a Job
            </h1>
            <p className="mt-2 text-sm text-[#454652]">
              Share your project details to receive bids from solo tukang or crews.
            </p>
          </div>
          <Link className="text-sm font-semibold text-[#AC332A]" href="/jobs">
            View active jobs
          </Link>
        </div>

        <div className="rounded-[32px] bg-[#F3F4F5] p-6">
          <JobForm />
        </div>
      </div>
    </div>
  );
}
