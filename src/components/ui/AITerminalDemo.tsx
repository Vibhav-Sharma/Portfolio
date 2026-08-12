"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTerminal, FiPlay, FiRefreshCw, FiCopy, FiCheck, FiCpu, FiZap, FiDatabase } from "react-icons/fi";

const PRESET_DEMOS = [
  {
    id: "kv-cache",
    title: "KV-Cache Optimization",
    icon: FiCpu,
    prompt: "Benchmark topic-aware KV cache compression ratio vs standard attention",
    response: `[SYSTEM] Initializing FlashAttention-v3 + TopicKV Engine...
[INFO] Context Length: 32,768 tokens | Batch Size: 8
[EXEC] Running baseline FP16 KV Cache memory: 4.09 GB
[EXEC] Applying Topic-Aware Head Pruning & Quantization...
------------------------------------------------
✓ Memory Reduced: 4.09 GB ➔ 1.18 GB (71.1% saving)
✓ TTFT (Time-To-First-Token): 14.2ms
✓ Throughput: 148.6 tokens/sec (2.4x speedup)
✓ Perplexity Loss: < 0.04% (Negligible precision drop)
------------------------------------------------
[STATUS] Cache hits: 98.4% | Compression: ACTIVE`,
    stats: { speed: "148.6 t/s", memory: "-71.1%", hitRate: "98.4%" },
  },
  {
    id: "rag-stream",
    title: "Dynamic RAG Pipeline",
    icon: FiDatabase,
    prompt: "Execute Hybrid Dense-Sparse vector retrieval over 1M documents",
    response: `[QUERY] "Retrieve LLM latency bottlenecks in multi-turn agent execution"
[STAGE 1] Dense Vector Search (BGE-M3): top_k=20 (11ms)
[STAGE 2] Sparse BM25 Keyword Filter: top_k=50 (4ms)
[STAGE 3] Reciprocal Rank Fusion & Cross-Encoder Rerank (8ms)
------------------------------------------------
Top Retrieved Context Chunks:
1. doc_8492.pdf [Score: 0.942] -> "KV Cache overhead in long context..."
2. doc_3910.pdf [Score: 0.891] -> "PagedAttention memory fragmentation..."
------------------------------------------------
[GENERATION] Streaming answer synthesized with 99.1% factual grounding score.`,
    stats: { speed: "23ms total", recall: "99.1%", chunks: "top-5 reranked" },
  },
  {
    id: "inference-eval",
    title: "Model Quantization Eval",
    icon: FiZap,
    prompt: "Compare INT4 AWQ vs FP8 vs FP16 LLM inference latency",
    response: `[BENCHMARK] Llama-3-70B-Instruct across GPU Architectures
------------------------------------------------
Format     VRAM Required    Tokens/Sec    Latency (p99)
FP16       140.0 GB         38 t/s        42.1 ms
FP8        70.0 GB          79 t/s        21.4 ms
INT4 (AWQ) 36.5 GB          112 t/s       14.8 ms  <-- OPTIMAL
------------------------------------------------
[VERDICT] AWQ INT4 achieves 2.94x throughput gain with 0.02 MMLU loss.`,
    stats: { speed: "112 t/s", vram: "36.5 GB", accuracy: "99.8%" },
  },
];

export default function AITerminalDemo() {
  const [activeTab, setActiveTab] = useState(PRESET_DEMOS[0].id);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentDemo = PRESET_DEMOS.find((d) => d.id === activeTab) || PRESET_DEMOS[0];

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDisplayedText("");
    setIsTyping(true);

    const fullText = currentDemo.response;
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 3));
        index += 3;
      } else {
        setDisplayedText(fullText);
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 12);

    return () => clearInterval(interval);
  }, [activeTab, currentDemo]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentDemo.response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-16 rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur-md shadow-xl overflow-hidden text-left">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-zinc-900 text-zinc-300 border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-zinc-400 ml-2 flex items-center gap-2">
            <FiTerminal className="w-4 h-4 text-blue-400" />
            ai-inference-engine ~ v2.4.0
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            title="Copy logs"
          >
            {copied ? <FiCheck className="w-3.5 h-3.5 text-green-400" /> : <FiCopy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-2 bg-zinc-100/80 border-b border-zinc-200 overflow-x-auto">
        {PRESET_DEMOS.map((demo) => {
          const Icon = demo.icon;
          const isActive = demo.id === activeTab;
          return (
            <button
              key={demo.id}
              onClick={() => setActiveTab(demo.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all shrink-0 ${
                isActive
                  ? "bg-white text-blue-700 shadow-sm border border-zinc-200/80"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-white/50"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-zinc-500"}`} />
              <span>{demo.title}</span>
            </button>
          );
        })}
      </div>

      {/* Terminal Content */}
      <div className="p-6 bg-zinc-950 font-mono text-xs sm:text-sm text-zinc-200 min-h-[260px] flex flex-col justify-between leading-relaxed">
        <div>
          {/* Prompt */}
          <div className="flex items-center gap-2.5 mb-4 text-blue-400 pb-3 border-b border-zinc-800/80">
            <span className="text-zinc-500">$&gt;</span>
            <span className="text-zinc-200 font-semibold">{currentDemo.prompt}</span>
          </div>

          {/* Response text stream */}
          <pre className="whitespace-pre-wrap text-zinc-300 font-mono leading-relaxed overflow-x-auto">
            {displayedText}
            {isTyping && <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse" />}
          </pre>
        </div>

        {/* Live metric badges footer */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            {Object.entries(currentDemo.stats).map(([key, val]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/50 text-blue-300 font-mono"
              >
                <span className="text-zinc-400 capitalize">{key}:</span>
                <span className="font-semibold text-blue-200">{val}</span>
              </span>
            ))}
          </div>
          <span className="text-zinc-500 text-[11px] font-mono">
            {isTyping ? "Streaming tokens..." : "Execution completed cleanly"}
          </span>
        </div>
      </div>
    </div>
  );
}
