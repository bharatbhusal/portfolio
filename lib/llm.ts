import type { ResumeData } from "@/types/resume";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

export async function generateResume(
  systemPrompt: string,
  userPrompt: string,
): Promise<ResumeData> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY not set. Get one free at https://console.groq.com/keys",
    );
  }

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4096,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    const msg = errBody?.error?.message || `HTTP ${res.status}`;
    throw new Error(`Groq API failed: ${msg}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty response from Groq");

  const parsed = JSON.parse(text) as Record<string, unknown>;
  if (!Array.isArray(parsed.work)) {
    throw new Error("Invalid resume structure from LLM");
  }

  return parsed as unknown as ResumeData;
}
