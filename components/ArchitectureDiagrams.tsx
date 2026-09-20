const bedrockSteps = [
  { label: "User question", detail: "Intent + session", tone: "acid" },
  { label: "Knowledge source", detail: "S3 documents", tone: "paper" },
  { label: "Retrieve context", detail: "Vector search", tone: "coral" },
  { label: "Amazon Bedrock", detail: "Claude / Llama", tone: "acid" },
  { label: "Grounded answer", detail: "Citations + guardrails", tone: "paper" }
];

const agentSteps = [
  { label: "Streamlit", detail: "Human-in-the-loop UI", tone: "acid" },
  { label: "Security gate", detail: "Auth + allowlists", tone: "coral" },
  { label: "Agent router", detail: "Intent + planning", tone: "coral" },
  { label: "RAG layer", detail: "Retrieve relevant context", tone: "paper" },
  { label: "MCP tools", detail: "Safe tool contracts", tone: "acid" },
  { label: "DB + APIs", detail: "Postgres / services", tone: "paper" }
];

function FlowNode({ label, detail, tone }: { label: string; detail: string; tone: string }) {
  return <div className={`architecture-node architecture-node-${tone}`}><span>{label}</span><small>{detail}</small></div>;
}

function FlowArrow() {
  return <span className="architecture-arrow" aria-hidden="true">→</span>;
}

export function ArchitectureDiagrams() {
  return <section id="systems" className="border-y border-white/10 bg-[#101313] px-5 py-24 lg:px-10">
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 max-w-2xl"><p className="mb-3 text-[10px] uppercase tracking-[.25em] text-coral">03 / Systems thinking</p><h2 className="font-display text-4xl tracking-[-.06em] sm:text-6xl">How the pieces<br /><span className="text-acid">talk to each other.</span></h2><p className="mt-6 text-xs leading-6 text-mist">Two reference architectures from the workbench: a grounded Bedrock flow and an agent workflow with explicit boundaries around tools, data, and security.</p></div>
      <div className="grid gap-5 lg:grid-cols-2">
        <article className="architecture-card">
          <div className="mb-8 flex items-start justify-between"><div><p className="text-[9px] uppercase tracking-[.22em] text-acid">Pattern A / modified RAG</p><h3 className="mt-2 font-display text-2xl tracking-[-.05em]">Bedrock knowledge flow</h3></div><span className="architecture-index">01</span></div>
          <div className="architecture-flow">{bedrockSteps.map((step, index) => <span className="architecture-flow-item" key={step.label}><FlowNode {...step} />{index < bedrockSteps.length - 1 && <FlowArrow />}</span>)}</div>
          <div className="mt-8 grid gap-3 border-t border-white/10 pt-5 text-[10px] leading-5 text-mist sm:grid-cols-2"><p><strong className="text-paper">Small modification:</strong> retrieval happens before Bedrock, then a response check adds citations and blocks unsupported claims.</p><p><strong className="text-paper">Useful for:</strong> document Q&amp;A, internal knowledge, and auditable assistant responses.</p></div>
        </article>
        <article className="architecture-card">
          <div className="mb-8 flex items-start justify-between"><div><p className="text-[9px] uppercase tracking-[.22em] text-coral">Pattern B / tool-using agent</p><h3 className="mt-2 font-display text-2xl tracking-[-.05em]">Agent control loop</h3></div><span className="architecture-index architecture-index-coral">02</span></div>
          <div className="architecture-flow">{agentSteps.map((step, index) => <span className="architecture-flow-item" key={step.label}><FlowNode {...step} />{index < agentSteps.length - 1 && <FlowArrow />}</span>)}</div>
          <div className="agent-loop"><span className="agent-loop-label">secure feedback loop</span><span className="agent-loop-line agent-loop-left" /><span className="agent-loop-line agent-loop-right" /><span className="agent-loop-line agent-loop-bottom" /></div>
          <div className="mt-8 grid gap-3 border-t border-white/10 pt-5 text-[10px] leading-5 text-mist sm:grid-cols-2"><p><strong className="text-paper">Guardrails:</strong> authentication, authorization, input validation, tool allowlists, secrets isolation, and audit logs.</p><p><strong className="text-paper">Useful for:</strong> operational assistants that can read, reason, and take controlled actions.</p></div>
        </article>
      </div>
    </div>
  </section>;
}
