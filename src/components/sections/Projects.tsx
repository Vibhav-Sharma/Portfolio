"use client";

import { projects } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { FiArrowUpRight } from "react-icons/fi";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center py-32 md:py-48 border-t border-blue-300/20"
    >
      <div className="content-container w-full">
        <ScrollReveal>
          <div className="flex items-center gap-2.5 mb-16 md:mb-24">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <h2 className="text-xs sm:text-sm uppercase tracking-widest text-blue-600 font-mono font-semibold">
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
                className="group block p-8 sm:p-10 md:p-12 rounded-2xl border border-blue-300/25 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:border-blue-400/50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3.5 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-blue-700 transition-colors duration-200">
                      {project.title}
                    </h3>
                    {project.badge && (
                      <span className="text-xs font-mono px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-50 text-blue-700 font-medium">
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 group-hover:text-blue-600 transition-colors duration-200 shrink-0">
                    <span className="text-sm font-mono text-blue-600/80">{project.year}</span>
                    <FiArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 text-blue-500" />
                  </div>
                </div>

                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed mb-8 max-w-3xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-blue-800 bg-blue-50/90 px-4.5 py-2 rounded-xl border border-blue-300/40 shadow-2xs"
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
