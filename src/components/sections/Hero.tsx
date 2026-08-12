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
          className="inline-flex items-center gap-3.5 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full border border-blue-400/40 bg-blue-50/80 backdrop-blur-sm mb-10 shrink-0 shadow-sm"
        >
          <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shrink-0" />
          <span className="text-xs sm:text-sm text-blue-800 font-mono tracking-widest font-semibold uppercase whitespace-nowrap">
            VIT Chennai · AI Engineer &amp; LLM Researcher
          </span>
        </motion.div>

        {/* Name / Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.08] text-zinc-900 mb-8"
        >
          Vibhav Sharma
        </motion.h1>

        {/* One-line subtitle with highlighted text boxes */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl sm:text-2xl text-zinc-600 font-normal leading-relaxed sm:leading-loose mb-14 max-w-4xl"
        >
          Engineering intelligent <span className="inline-block px-4 py-1.5 mx-1 rounded-xl bg-blue-50/90 border border-blue-300/50 text-blue-700 font-semibold shadow-xs">LLM inference</span>, topic-aware <span className="inline-block px-4 py-1.5 mx-1 rounded-xl bg-blue-50/90 border border-blue-300/50 text-blue-700 font-semibold shadow-xs">KV Cache optimization</span>, and dynamic <span className="inline-block px-4 py-1.5 mx-1 rounded-xl bg-blue-50/90 border border-blue-300/50 text-blue-700 font-semibold shadow-xs">RAG systems</span>.
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
            className="inline-flex items-center justify-center min-w-[170px] sm:min-w-[190px] gap-3.5 px-8 py-4 sm:px-10 sm:py-4.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base sm:text-lg shadow-xl shadow-blue-600/25 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            <FiFileText className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Resume</span>
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-w-[170px] sm:min-w-[190px] gap-3.5 px-8 py-4 sm:px-10 sm:py-4.5 rounded-full border border-zinc-300 bg-white/90 backdrop-blur-sm hover:bg-zinc-50 text-zinc-800 hover:text-zinc-950 font-medium text-base sm:text-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-md"
          >
            <FiGithub className="w-5 h-5 text-blue-600" />
            <span>GitHub</span>
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-w-[170px] sm:min-w-[190px] gap-3.5 px-8 py-4 sm:px-10 sm:py-4.5 rounded-full border border-zinc-300 bg-white/90 backdrop-blur-sm hover:bg-zinc-50 text-zinc-800 hover:text-zinc-950 font-medium text-base sm:text-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-md"
          >
            <FiLinkedin className="w-5 h-5 text-blue-600" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="inline-flex items-center justify-center min-w-[170px] sm:min-w-[190px] gap-3.5 px-8 py-4 sm:px-10 sm:py-4.5 rounded-full border border-zinc-300 bg-white/90 backdrop-blur-sm hover:bg-zinc-50 text-zinc-800 hover:text-zinc-950 font-medium text-base sm:text-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-md"
          >
            <FiMail className="w-5 h-5 text-blue-600" />
            <span>Email</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
