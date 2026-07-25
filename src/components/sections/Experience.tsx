"use client";

import { experiences } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center py-32 md:py-48 border-t border-purple-500/10"
    >
      <div className="content-container w-full">
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-16 md:mb-24">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <h2 className="text-xs sm:text-sm uppercase tracking-widest text-purple-400 font-mono font-semibold">
              Work & Research Experience
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-8 md:gap-12">
          {experiences.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group rounded-2xl border border-purple-500/15 bg-zinc-900/40 p-8 sm:p-10 md:p-12 hover:border-purple-500/40 hover:bg-zinc-900/70 transition-all duration-300 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-200">
                    {exp.role}{" "}
                    <span className="text-purple-400 font-medium">
                      @ {exp.company}
                    </span>
                  </h3>
                  <span className="text-xs sm:text-sm text-purple-300 font-mono shrink-0 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20 w-fit">
                    {exp.period}
                  </span>
                </div>
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl">
                  {exp.summary}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
