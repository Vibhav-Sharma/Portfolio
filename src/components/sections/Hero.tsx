"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { FiGithub, FiLinkedin, FiMail, FiFileText } from "react-icons/fi";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center py-32 md:py-48 relative"
    >
      <div className="content-container w-full">
        {/* Status / Role pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-10 shrink-0"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse shrink-0" />
          <span className="text-xs sm:text-sm text-purple-300 font-mono tracking-widest font-semibold uppercase whitespace-nowrap">
            VIT Chennai · AI Engineer & LLM Researcher
          </span>
        </motion.div>

        {/* Name / Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.08] text-white mb-8"
        >
          Vibhav Sharma
        </motion.h1>

        {/* One-line subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl sm:text-2xl text-zinc-300 font-normal leading-relaxed mb-14 max-w-3xl"
        >
          Engineering intelligent <span className="text-purple-400 font-medium">LLM inference</span>, topic-aware <span className="text-purple-400 font-medium">KV Cache optimization</span>, and dynamic <span className="text-purple-400 font-medium">RAG systems</span>.
        </motion.p>

        {/* Links / Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-4 sm:gap-6 text-base sm:text-lg flex-wrap"
        >
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-5 px-30 py-5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-base sm:text-lg shadow-2xl shadow-purple-600/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <FiFileText className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Resume</span>
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-20 py-4 rounded-full border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-base hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <FiGithub className="w-5 h-5 text-purple-400" />
            <span>GitHub</span>
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-20 py-4 rounded-full border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-base hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <FiLinkedin className="w-5 h-5 text-purple-400" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="flex items-center justify-center gap-3 px-20 py-4 rounded-full border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-base hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <FiMail className="w-5 h-5 text-purple-400" />
            <span>Email</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
