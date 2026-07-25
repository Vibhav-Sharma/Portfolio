"use client";

import { publications } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { FiArrowUpRight } from "react-icons/fi";

export default function Publications() {
  return (
    <section
      id="publications"
      className="min-h-screen flex flex-col justify-center py-32 md:py-48 border-t border-purple-500/10"
    >
      <div className="content-container w-full">
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-16 md:mb-24">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <h2 className="text-xs sm:text-sm uppercase tracking-widest text-purple-400 font-mono font-semibold">
              Research Publications
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-8 md:gap-12">
          {publications.map((pub, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <a
                href={pub.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-start justify-between gap-6 p-8 sm:p-10 md:p-12 rounded-2xl border border-purple-500/15 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-purple-500/40 transition-all duration-300 shadow-xl"
              >
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="text-xs font-mono px-3 py-1 rounded-full border border-purple-500/30 text-purple-300 bg-purple-500/15 font-medium">
                      {pub.status}
                    </span>
                    <span className="text-xs sm:text-sm text-purple-300/80 font-mono">{pub.venue}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-200">
                    {pub.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 group-hover:text-purple-300 transition-colors duration-200 shrink-0 pt-1">
                  <span className="text-sm font-mono text-purple-300/80">{pub.year}</span>
                  <FiArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 text-purple-400" />
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
