"use client";

import { projects } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { FiArrowUpRight } from "react-icons/fi";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center py-32 md:py-48 border-t border-purple-500/10"
    >
      <div className="content-container w-full">
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-16 md:mb-24">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <h2 className="text-xs sm:text-sm uppercase tracking-widest text-purple-400 font-mono font-semibold">
              Featured Projects
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-8 md:gap-12">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.1}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 sm:p-10 md:p-12 rounded-2xl border border-purple-500/15 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-purple-500/40 transition-all duration-300 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3.5 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-200">
                      {project.title}
                    </h3>
                    {project.badge && (
                      <span className="text-xs font-mono px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/15 text-purple-300 font-medium">
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 group-hover:text-purple-300 transition-colors duration-200 shrink-0">
                    <span className="text-sm font-mono text-purple-300/80">{project.year}</span>
                    <FiArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 text-purple-400" />
                  </div>
                </div>

                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8 max-w-3xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-purple-200 bg-purple-950/50 px-3 py-1.5 rounded-lg border border-purple-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
