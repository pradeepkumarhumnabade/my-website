                    USER
                      ↓
              Chatbot UI
             Next.js + React
                      ↓
              Vercel AI SDK
                      ↓
             Next.js API Route
                      ↓
                  Ollama
                      ↓
                 RAG Service
                      ↓
          Embedding / Vector Search
                      ↓
        Supabase PostgreSQL + pgvector
                      ↓
             Your Knowledge
# Signal / AI portfolio

A production-shaped personal portfolio for a full-stack developer moving toward AI engineering. It pairs a responsive editorial portfolio with a grounded, streaming AI assistant backed by a local Ollama model and Supabase PostgreSQL + pgvector.

## What is included

- Next.js 14 App Router and TypeScript
- Responsive portfolio UI with profile, skills, delivery capabilities, experience, and contact links
- Visual Bedrock and Streamlit agent architecture diagrams with security, RAG, MCP, and data boundaries
- Resume template section with the Realize modules and full AWS/frontend toolkit
- AI assistant with starter prompts, streamed answers, and a grounded system prompt
- RAG retrieval through Supabase `match_knowledge` RPC and pgvector cosine similarity
- Local fallback retrieval from `lib/knowledge.ts` when Supabase is not configured
- Optional Supabase vector knowledge base with local keyword retrieval fallback
- Vercel-ready API route with server-only service role usage

## Stack

Next.js, React, TypeScript, Tailwind CSS, Vercel AI SDK, Ollama, Supabase, PostgreSQL, pgvector.

## Run locally

Prerequisites: Node.js 18.17+ and Ollama with the configured model installed. Supabase is optional because the app can retrieve from the local knowledge file.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The portfolio shell works without remote credentials, but Ollama must be running for live assistant responses.

Start Ollama before asking a question:

```bash
ollama pull llama3.2:latest
ollama serve
```

### Environment variables

```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:latest
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`SUPABASE_SERVICE_ROLE_KEY` is only read by the server. Never expose it as a `NEXT_PUBLIC_` variable or commit `.env.local`.

## Supabase + pgvector

1. Create a Supabase project.
2. In the Supabase SQL Editor, run [`supabase/schema.sql`](supabase/schema.sql).
3. Set the Supabase URL and service role key in `.env.local`.
4. Seed the knowledge base:

```bash
node scripts/seed-knowledge.mjs
```

The chat route uses local keyword-ranked retrieval from `lib/knowledge.ts`, so it works with Ollama without an OpenAI key. The existing Supabase schema remains available for a hosted vector knowledge base; seed it with an embedding model whose vector dimension matches the schema before enabling vector retrieval.

The request flow is:

```text
Browser chat -> /api/chat -> local knowledge retrieval -> Ollama
            -> grounded prompt -> streamed response
```

When Supabase is unavailable, the route uses keyword-ranked local chunks from `lib/knowledge.ts`. If Ollama is unavailable, the UI shows a clear startup message.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Keep the default Next.js build settings.
4. Add `OLLAMA_BASE_URL`, `OLLAMA_MODEL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `NEXT_PUBLIC_SITE_URL` under Project Settings > Environment Variables for Preview and Production. A localhost Ollama URL is only reachable from a local deployment; use a network-accessible Ollama host for Vercel.
5. Deploy, run the Supabase SQL once, and seed the production database using the production environment values.

The chat API runs on the Node.js runtime because it uses the Ollama-compatible AI provider and Supabase server client. Vercel automatically serves it at `/api/chat`.

## Customize

Update the identity, skills, experience, projects, and local knowledge in [`lib/knowledge.ts`](lib/knowledge.ts). Update the matching seed content in [`scripts/seed-knowledge.mjs`](scripts/seed-knowledge.mjs) and reseed Supabase after content changes. Replace the placeholder GitHub, LinkedIn, and email links in [`components/Portfolio.tsx`](components/Portfolio.tsx).

## Validation

```bash
npm run build
```

The build validates the app, route handlers, and TypeScript. For a production smoke test, run `npm run build && npm start` and ask the assistant a question from the home page.