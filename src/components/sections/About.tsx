"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center py-32 md:py-48 border-t border-blue-300/20"
    >
      <div className="content-container w-full">
        <div className="max-w-[720px] mx-auto text-left">
          <ScrollReveal>
            <div className="flex items-center gap-2.5 mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <h2 className="text-xs sm:text-sm uppercase tracking-widest text-blue-600 font-mono font-semibold">
                About Me
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-zinc-700 text-xl sm:text-2xl font-normal leading-relaxed sm:leading-loose mb-8">
              I am a <span className="text-zinc-900 font-semibold">Computer Science undergraduate at VIT Chennai</span> focused on Artificial Intelligence and Large Language Models.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-zinc-500 text-lg sm:text-xl font-normal leading-relaxed sm:leading-loose">
              I build scalable inference optimizations, solve complex algorithmic problems, and convert research ideas into production-ready software.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
