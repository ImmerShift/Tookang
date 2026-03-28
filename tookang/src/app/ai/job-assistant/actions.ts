"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

import { normalizeJobIntelligence } from "../../../lib/ai/parsers";
import { JobIntelligenceOutput } from "../../../lib/ai/types";

type JobAssistantState = {
  ok: boolean;
  message: string;
  output?: JobIntelligenceOutput;
};

const responseSchema = {
  type: "object",
  properties: {
    category: { type: "string", nullable: true },
    title: { type: "string", nullable: true },
    budget_range: { type: "string", nullable: true },
    urgency: { type: "string", nullable: true },
    requires_inspection: { type: "boolean", nullable: true },
    missing_fields: { type: "array", items: { type: "string" } },
    recommended_tier: { type: "string", enum: ["solo", "crew", "both"] },
  },
  required: [
    "category",
    "title",
    "budget_range",
    "urgency",
    "requires_inspection",
    "missing_fields",
    "recommended_tier",
  ],
};

export const runJobAssistant = async (
  _prevState: JobAssistantState,
  formData: FormData
): Promise<JobAssistantState> => {
  const prompt = String(formData.get("prompt") ?? "").trim();
  if (!prompt.length) {
    return { ok: false, message: "Please describe the job first." };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { ok: false, message: "Missing GEMINI_API_KEY in environment." };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema,
      },
    });

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    const rawJson = JSON.parse(rawText) as Partial<JobIntelligenceOutput>;
    const output = normalizeJobIntelligence(rawJson);

    return { ok: true, message: "Structured output ready.", output };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to run assistant.",
    };
  }
};
