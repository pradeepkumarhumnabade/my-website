import "dotenv/config";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
if (!url || !key || !process.env.OPENAI_API_KEY) throw new Error("Set Supabase and OpenAI environment variables first.");

const supabase = createClient(url, key, { auth: { persistSession: false } });
const chunks = [
  ["About Pradeep", "Pradeep is a full-stack developer in Bengaluru, India, moving toward AI engineering. He builds dependable web products and intelligent systems that make interfaces feel human."],
  ["Working style", "Pradeep values simple interfaces, explicit system boundaries, useful observability, and small reversible steps. He pairs product thinking with engineering rigor."],
  ["AI direction", "Pradeep is building retrieval-augmented generation systems and learning evaluation, embeddings, vector search, prompt design, and the operational discipline needed to make AI features reliable."],
  ["Signal / personal RAG", "A Next.js portfolio turned into a queryable knowledge system with retrieval citations and a streamed assistant. It uses OpenAI embeddings and Supabase pgvector."],
  ["Orbit ops console", "A calm command center for a distributed operations team. Built with React, Node.js, and Postgres; it reduced incident handoff time by 42 percent."],
  ["Field notes API", "A typed content API and publishing workflow for teams that want documentation close to the code. Built with TypeScript, REST, and CI/CD."],
  ["Resume summary", "Passionate Front-End Developer with 7 years of extensive experience in Angular development and AWS cloud services. Proficient in dynamic, responsive, user-centric web applications, performance optimization, scalability, and DevOps principles."],
  ["Assignment and Content Access", "Reader Realize is an MFE project providing summaries of complete books, a full page index, and assigned status for each student. Contributed to the Assignment module, tracking whether books or individual pages are assigned and displaying assignment details."],
  ["Student Activity Orchestration", "Developed the Appysync project with Amplify. When a student interacts with an SCO, it triggers a GraphQL call to create or update the SCO, which then calls Resolver and pipeline functions."],
  ["Event-Driven Content Processing", "When content is ingested by the backend team, AWS SNS is triggered. Listened to SNS and processed the content further using AWS Step Functions."],
  ["Reusable UI Component Systems", "Built reusable components for various frameworks."],
  ["Environment Provisioning and IaC", "Automated resource creation for different environments using CDK scripts with Node.js."],
  ["Learning Data Migration", "Migrated old content to the new import workflow process and transferred EFs to S3 using DataSync. Migrated student activity content using Python scripts using ECS."],
  ["AI implementation practice", "Learning and implementing RAG architecture, chunking, retrieval strategy, grounded prompts, citation-aware answers, agent routing, MCP tool contracts, prompt engineering, structured outputs, AI evaluation, golden datasets, Ollama local model serving, streaming, prompt injection defense, access control, tool allowlists, secret isolation, and audit trails."],
  ["Resume technical toolkit", "Windows, Linux. Angular, JavaScript ES5 and ES6, TypeScript, HTML5, CSS3, GraphQL, StencilJS, VTL. AWS SNS, SQS, S3, DynamoDB, Step Functions, Amplify, AWS AppSync, Batch, ECR, ECS, DataSync, EventBridge, API Gateway, Cognito, CloudWatch, Systems Manager. Node.js, Python 3, DynamoDB, MySQL, CDK, CloudFormation, Docker, Git, GitHub, Jasmine, Jest."],
];
const input = chunks.map(([, content]) => content);
const response = await openai.embeddings.create({ model: "text-embedding-3-small", input });
const rows = chunks.map(([title, content], index) => ({ title, content, embedding: response.data[index].embedding }));
const { error } = await supabase.from("knowledge_chunks").delete().neq("id", 0);
if (error) throw error;
const { error: insertError } = await supabase.from("knowledge_chunks").insert(rows);
if (insertError) throw insertError;
console.log(`Seeded ${rows.length} knowledge chunks.`);
