"use client";

import { useFormState } from "react-dom";

import { runJobAssistant } from "./actions";

const initialState = {
  ok: false,
  message: "",
};

export default function JobAssistantPage() {
  const [state, formAction] = useFormState(runJobAssistant, initialState);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#191C1D]">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10">
        <div>
          <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[#000666]">
            AI Job Assistant
          </h1>
          <p className="mt-2 text-sm text-[#454652]">
            Describe a job and get structured fields for posting.
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <textarea
            name="prompt"
            rows={6}
            placeholder="Contoh: Perbaikan atap bocor di rumah 2 lantai, butuh selesai minggu ini."
            className="rounded-[28px] bg-white px-5 py-4 text-sm text-[#191C1D] shadow-[0_20px_50px_rgba(25,28,29,0.08)] outline-none focus:shadow-[inset_0_-3px_0_#000666]"
          />
          <button className="w-fit rounded-full bg-[#000666] px-5 py-2 text-sm font-semibold text-white">
            Generate structured output
          </button>
        </form>

        <div className="rounded-[24px] bg-[#F3F4F5] p-4 text-sm text-[#454652]">
          {state.message}
        </div>

        {state.output && (
          <pre className="rounded-[24px] bg-white p-4 text-xs text-[#000666] shadow-[0_18px_45px_rgba(25,28,29,0.08)]">
            {JSON.stringify(state.output, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
