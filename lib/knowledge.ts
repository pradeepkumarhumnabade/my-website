export const profile = {
  name: "Pradeep",
  role: "Full-stack developer / AI engineer in progress",
  location: "Bengaluru, India",
  availability: "Open to thoughtful product teams",
  bio: "I build dependable web products and the intelligent systems that make them feel remarkably human. My current edge is the space between a clean interface, a resilient backend, and an AI workflow you can actually observe and trust.",
  stats: [
    { value: "06+", label: "years building" },
    { value: "24", label: "systems shipped" },
    { value: "∞", label: "things to learn" }
  ]
};

export const skills = [
  { name: "TypeScript", group: "core", level: 92 }, { name: "React / Next.js", group: "core", level: 90 },
  { name: "Node.js", group: "core", level: 88 }, { name: "PostgreSQL", group: "data", level: 84 },
  { name: "Python", group: "ai", level: 78 }, { name: "RAG systems", group: "ai", level: 76 },
  { name: "Ollama / LLMs", group: "ai", level: 78 }, { name: "Angular", group: "frontend", level: 95 },
  { name: "AWS / CDK", group: "cloud", level: 88 }, { name: "Docker / CI", group: "ship", level: 80 }
];

export const aiTopics = [
  { title: "RAG architecture", detail: "Chunking, retrieval strategy, context assembly, grounded prompts, and citation-aware answers." },
  { title: "Agent orchestration", detail: "Planning, routing, tool selection, MCP contracts, state, and human approval for actions." },
  { title: "Prompt engineering", detail: "System prompts, structured outputs, few-shot examples, refusal behavior, and prompt versioning." },
  { title: "AI evaluation", detail: "Golden datasets, relevance checks, faithfulness, latency, cost, and regression testing." },
  { title: "Local LLM delivery", detail: "Ollama model serving, streaming responses, fallback behavior, and practical local development." },
  { title: "AI security", detail: "Prompt injection defense, secret isolation, access control, tool allowlists, and audit trails." }
];

export const experience = [
  { period: "2022 — now", role: "Senior Full-Stack Developer", company: "Product studio / independent", detail: "Designing and shipping high-traffic product surfaces, internal tooling, and integrations from first schema to deployed interface." },
  { period: "2020 — 22", role: "Software Engineer", company: "SaaS platform", detail: "Built customer workflows with React and Node, improved API reliability, and helped a small team establish a pragmatic delivery rhythm." },
  { period: "2018 — 20", role: "Frontend Developer", company: "Digital products", detail: "Learned the craft through accessible, responsive experiences and a healthy obsession with the details users feel." }
];

export const resume = {
  headline: "Passionate Front-End Developer with 9 years of experience in Angular development and AWS cloud services.",
  summary: "Proficient in developing and managing dynamic, responsive, and user-centric web applications. Adept at leveraging modern frameworks and cloud solutions for efficient deployment, scaling, and management. Expertise in performance optimization, scalability, and DevOps principles. Strong collaborator and team player with a proven track record of delivering high-quality software solutions within agile environments, committed to achieving project goals through innovative and efficient coding practices.",
  timeline: [
    { period: "Aug 2013 — Jul 2016", title: "Realize", detail: "Front-end and cloud engineering work across learning platforms, content workflows, student activity, infrastructure, and migration programs." },
    { period: "Jul 2010 — 2013", title: "Earlier engineering experience", detail: "Built a foundation across Windows and Linux environments, web application development, and collaborative delivery." }
  ],
  modules: [
    { number: "01", title: "Assignment & Content Access", detail: "Reader Realize is an MFE project that provides summaries of complete books, including a full page index and the assigned status for each student. Contributed to the Assignment module, which tracks whether a book or individual pages have been assigned and displays assignment details." },
    { number: "02", title: "Student Activity Orchestration", detail: "Developed the Appysync project with Amplify. When a student interacts with an SCO, it triggers a GraphQL call to create or update the SCO, which then calls Resolver and pipeline functions." },
    { number: "03", title: "Event-Driven Content Processing", detail: "When content is ingested by the backend team, AWS SNS is triggered. Listened to SNS and processed the content further using AWS Step Functions." },
    { number: "04", title: "Reusable UI Component Systems", detail: "Built reusable components for various frameworks." },
    { number: "05", title: "Environment Provisioning & IaC", detail: "Automated resource creation for different environments using CDK scripts with Node.js." },
    { number: "06", title: "Learning Data Migration", detail: "Migrated old content to the new import workflow and transferred EFs to S3 using DataSync. Migrated student activity content using Python scripts and ECS." }
  ],
  toolkit: {
    environments: "Windows, Linux",
    frontend: "Angular, JavaScript ES5/ES6, TypeScript, HTML5, CSS3, GraphQL, StencilJS, VTL",
    aws: "SNS, SQS, S3, DynamoDB, Step Functions, Amplify, AWS AppSync, Batch, ECR, ECS, DataSync, EventBridge, API Gateway, Cognito, CloudWatch, Systems Manager",
    backend: "Node.js, Python 3",
    database: "DynamoDB, MySQL",
    infrastructure: "CDK, CloudFormation",
    delivery: "Docker, Git, GitHub, Jasmine, Jest"
  }
};

export const knowledgeChunks = [
  { title: "About Pradeep", content: `${profile.name} is a ${profile.role} based in ${profile.location}. ${profile.bio}` },
  { title: "Working style", content: "Pradeep cares about simple interfaces, explicit system boundaries, useful observability, and shipping in small reversible steps. He likes pairing product thinking with engineering rigor." },
  ...experience.map((item) => ({ title: `${item.role} at ${item.company}`, content: `${item.period}: ${item.detail}` })),
  { title: "AI direction", content: "Pradeep is moving toward AI engineering by building retrieval-augmented generation systems, learning evaluation, embeddings, vector search, prompt design, and the operational discipline needed to make AI features reliable." },
  ...aiTopics.map((topic) => ({ title: `AI practice: ${topic.title}`, content: topic.detail })),
  { title: "Bedrock architecture", content: "The portfolio demonstrates a modified Amazon Bedrock RAG flow: a user question is combined with knowledge from S3, relevant context is retrieved through vector search, Bedrock generates an answer, and a response check adds citations and blocks unsupported claims." },
  { title: "AI agent architecture", content: "The agent flow starts in Streamlit, passes through a security gate and agent router, retrieves context through RAG, uses MCP tools with explicit contracts, and connects to Postgres or service APIs. Security includes authentication, authorization, input validation, tool allowlists, secrets isolation, and audit logs." },
  { title: "Resume summary", content: `${resume.headline} ${resume.summary}` },
  ...resume.modules.map((module) => ({ title: `Resume module ${module.number}: ${module.title}`, content: module.detail })),
  { title: "Resume technical toolkit", content: Object.values(resume.toolkit).join(". ") },
  { title: "Realize project timeline", content: resume.timeline.map((item) => `${item.period}: ${item.title}. ${item.detail}`).join(" ") }
];
