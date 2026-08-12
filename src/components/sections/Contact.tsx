"use client";

import { siteConfig } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { FiArrowUpRight, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center py-32 md:py-48 border-t border-rose-300/20"
    >
      <div className="content-container w-full">
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <h2 className="text-xs sm:text-sm uppercase tracking-widest text-rose-600 font-mono font-semibold">
              Get In Touch
            </h2>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 mb-8 tracking-tight max-w-2xl leading-tight">
            Let&apos;s build something meaningful.
          </h3>

          <p className="text-lg sm:text-xl text-zinc-600 font-normal mb-14 max-w-xl leading-relaxed">
            Interested in AI research, LLM inference optimization, or scalable backend systems? Reach out directly.
          </p>

          <div className="flex flex-wrap items-center gap-5 text-sm sm:text-base">
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-xl shadow-rose-500/20 transition-all duration-200"
            >
              <FiMail className="w-5 h-5" />
              <span>{siteConfig.links.email}</span>
              <FiArrowUpRight className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-zinc-300 bg-white/80 backdrop-blur-sm hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 font-medium transition-all duration-200"
            >
              <FiGithub className="w-5 h-5 text-rose-600" />
              <span>GitHub</span>
              <FiArrowUpRight className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-zinc-300 bg-white/80 backdrop-blur-sm hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 font-medium transition-all duration-200"
            >
              <FiLinkedin className="w-5 h-5 text-rose-600" />
              <span>LinkedIn</span>
              <FiArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
