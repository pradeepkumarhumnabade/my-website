import { knowledgeChunks } from "@/lib/knowledge";
import { supabase } from "@/lib/supabase";

export type RetrievedChunk = { title: string; content: string; similarity?: number };

export async function retrieveKnowledge(query: string): Promise<RetrievedChunk[]> {
  // Ollama generation is local. Keep retrieval available without requiring a second hosted API.
  // Supabase vector retrieval can be restored once the database is seeded with Ollama-compatible embeddings.
  void supabase;

  const terms = query.toLowerCase().split(/\W+/).filter(Boolean);
  return knowledgeChunks.map((chunk) => ({ ...chunk, score: terms.reduce((total, term) => total + (chunk.content.toLowerCase().includes(term) || chunk.title.toLowerCase().includes(term) ? 1 : 0), 0) }))
    .sort((a, b) => b.score - a.score).slice(0, 4).map(({ title, content }) => ({ title, content }));
}

export function contextFrom(chunks: RetrievedChunk[]) {
  return chunks.map((chunk, index) => `[${index + 1}] ${chunk.title}\n${chunk.content}`).join("\n\n");
}
