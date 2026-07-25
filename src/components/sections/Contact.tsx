"use client";

import { siteConfig } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { FiArrowUpRight, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center py-32 md:py-48 border-t border-purple-500/10"
    >
      <div className="content-container w-full">
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <h2 className="text-xs sm:text-sm uppercase tracking-widest text-purple-400 font-mono font-semibold">
              Get In Touch
            </h2>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight max-w-2xl leading-tight">
            Let&apos;s build something meaningful.
          </h3>

          <p className="text-lg sm:text-xl text-zinc-300 font-normal mb-14 max-w-xl leading-relaxed">
            Interested in AI research, LLM inference optimization, or scalable backend systems? Reach out directly.
          </p>

          <div className="flex flex-wrap items-center gap-5 text-sm sm:text-base">
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-xl shadow-purple-500/25 transition-all duration-200"
            >
              <FiMail className="w-5 h-5" />
              <span>{siteConfig.links.email}</span>
              <FiArrowUpRight className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium transition-all duration-200"
            >
              <FiGithub className="w-5 h-5 text-purple-400" />
              <span>GitHub</span>
              <FiArrowUpRight className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium transition-all duration-200"
            >
              <FiLinkedin className="w-5 h-5 text-purple-400" />
              <span>LinkedIn</span>
              <FiArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
