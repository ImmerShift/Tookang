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
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10">
        <div>
          <h1 className="text-3xl font-semibold">AI Job Assistant</h1>
          <p className="mt-2 text-sm text-zinc-300">
            Describe a job and get structured fields for posting.
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <textarea
            name="prompt"
            rows={6}
            placeholder="Contoh: Perbaikan atap bocor di rumah 2 lantai, butuh selesai minggu ini."
            className="rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-sm text-white"
          />
          <button className="w-fit rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-zinc-950">
            Generate structured output
          </button>
        </form>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
          {state.message}
        </div>

        {state.output && (
          <pre className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4 text-xs text-emerald-200">
            {JSON.stringify(state.output, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
