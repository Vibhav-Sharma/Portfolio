"use client";

import { experiences } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center py-32 md:py-48 border-t border-blue-300/20"
    >
      <div className="content-container w-full">
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-16 md:mb-24">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <h2 className="text-xs sm:text-sm uppercase tracking-widest text-blue-600 font-mono font-semibold">
              Work &amp; Research Experience
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-8 md:gap-12">
          {experiences.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group rounded-2xl border border-blue-300/25 bg-white/70 backdrop-blur-sm p-8 sm:p-10 md:p-12 hover:border-blue-400/50 hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-blue-700 transition-colors duration-200">
                    {exp.role}{" "}
                    <span className="text-blue-600 font-medium">
                      @ {exp.company}
                    </span>
                  </h3>
                  <span className="text-xs sm:text-sm text-blue-700 font-mono shrink-0 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-300/30 w-fit">
                    {exp.period}
                  </span>
                </div>
                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-3xl">
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
