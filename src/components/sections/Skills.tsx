"use client";

import { skillCategories } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center py-32 md:py-48 border-t border-rose-300/20"
    >
      <div className="content-container w-full">
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-16 md:mb-24">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <h2 className="text-xs sm:text-sm uppercase tracking-widest text-rose-600 font-mono font-semibold">
              Technical Stack &amp; Skills
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-10 md:gap-12">
          {skillCategories.map((cat, i) => (
            <ScrollReveal key={cat.category} delay={i * 0.1}>
              <div className="p-8 sm:p-10 md:p-12 rounded-2xl border border-rose-300/25 bg-white/70 backdrop-blur-sm hover:border-rose-400/45 transition-colors duration-300 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-mono text-rose-700 font-semibold mb-6 uppercase tracking-wider">
                    {cat.category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs sm:text-sm text-zinc-700 bg-rose-50/80 border border-rose-300/30 px-4 py-2 rounded-xl font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
