"use client";

import { useState } from "react";
import { ArrowUp, Bot, Loader2, Sparkles, UserRound, X } from "lucide-react";
import Image from "next/image";

type Message = { role: "user" | "assistant"; content: string };
const starters = ["What is Pradeep building now?", "What is his strongest technical edge?", "Tell me about the RAG project"];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: "Hi. I have Pradeep's work notes open. Ask me something specific." }]);

  async function ask(question = input) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next); setInput(""); setLoading(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next }) });
      if (!response.ok || !response.body) throw new Error("Unable to connect");
      const reader = response.body.getReader(); const decoder = new TextDecoder(); let answer = "";
      setMessages([...next, { role: "assistant", content: "" }]);
      while (true) { const { done, value } = await reader.read(); if (done) break; answer += decoder.decode(value, { stream: true }); setMessages([...next, { role: "assistant", content: answer }]); }
    } catch { setMessages([...next, { role: "assistant", content: "I could not reach Ollama. Start Ollama, run `ollama run llama3.2:latest`, and try again." }]); }
    finally { setLoading(false); }
  }

  return <>
    {!open && <button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-30 flex items-center gap-3 border border-acid bg-acid px-4 py-3 text-xs font-semibold text-ink shadow-[5px_5px_0_#ff735c] transition-transform hover:-translate-y-1" aria-label="Open AI assistant"><Sparkles size={16} /> ASK MY AI</button>}
    {open && <aside className="fixed bottom-5 right-5 z-30 flex h-[min(680px,calc(100vh-40px))] w-[min(410px,calc(100vw-40px))] flex-col border border-white/20 bg-[#101313] shadow-[8px_8px_0_#d6ff3f]">
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div className="flex items-center gap-3"><Image src="/Pradeep_pic.png" alt="Pradeep" width={34} height={34} className="h-9 w-9 rounded-full border border-acid/70 object-cover" /><div><p className="font-display text-sm font-semibold">Pradeep&apos;s AI assistant</p><p className="font-mono text-[10px] uppercase tracking-[.18em] text-mist">RAG / online</p></div></div><button onClick={() => setOpen(false)} aria-label="Close assistant" className="text-mist hover:text-paper"><X size={18} /></button></header>
      <div className="flex-1 space-y-4 overflow-y-auto p-5">{messages.map((message, index) => <div key={index} className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[86%] px-3 py-3 text-xs leading-5 ${message.role === "user" ? "bg-acid text-ink" : "bg-white/[.07] text-paper"}`}>{message.role === "assistant" && <span className="mb-1 block text-[9px] uppercase tracking-[.14em] text-coral">AI / grounded</span>}{message.content || <Loader2 size={14} className="animate-spin" />}</div>{message.role === "user" && <UserRound size={15} className="mt-2 text-acid" />}</div>)}{messages.length === 1 && <div className="space-y-2 pt-2">{starters.map((starter) => <button key={starter} onClick={() => ask(starter)} className="block w-full border border-white/10 px-3 py-2 text-left text-[11px] text-mist transition-colors hover:border-acid hover:text-acid">{starter}</button>)}</div>}</div>
      <form onSubmit={(event) => { event.preventDefault(); ask(); }} className="m-4 flex border border-white/20 focus-within:border-acid"><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about the work..." className="min-w-0 flex-1 bg-transparent px-3 py-3 text-xs text-paper outline-none placeholder:text-mist/60" /><button className="px-3 text-acid disabled:text-mist" disabled={loading || !input.trim()} aria-label="Send question">{loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowUp size={17} />}</button></form>
    </aside>}
  </>;
}
