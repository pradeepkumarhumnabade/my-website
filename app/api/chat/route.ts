import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { contextFrom, retrieveKnowledge } from "@/lib/rag";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ollamaBaseUrl = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
const ollamaModel = process.env.OLLAMA_MODEL ?? "llama3.2:latest";
const ollama = createOpenAI({
  baseURL: `${ollamaBaseUrl.replace(/\/$/, "")}/v1`,
  apiKey: "ollama",
});

export async function POST(request: Request) {
  try {
    const body = await request.json() as { messages?: Array<{ role: "user" | "assistant"; content: string }> };
    const messages = body.messages ?? [];
    const latest = [...messages].reverse().find((message) => message.role === "user")?.content;
    if (!latest) return new Response("Ask a question to begin.", { status: 400 });
    const chunks = await retrieveKnowledge(latest);
    const result = await streamText({
      model: ollama(ollamaModel),
      system: `You are Signal, Pradeep's portfolio assistant. Answer only using the context below. Be concise, warm, and specific. If the context does not support an answer, say you do not have that detail and suggest contacting Pradeep. Cite supporting notes inline like [1]. Never invent employers, metrics, links, or dates.\n\nCONTEXT:\n${contextFrom(chunks)}`,
      messages,
      temperature: 0.2,
    });
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Ollama chat route error", error);
    return new Response("Ollama is not reachable. Start Ollama and make sure the llama3.2:latest model is installed.", { status: 503 });
  }
}
