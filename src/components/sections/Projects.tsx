"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { FiArrowUpRight, FiFilter } from "react-icons/fi";

const CATEGORIES = ["All", "LLM & Inference", "RAG Systems", "AI & ML", "Systems & Security"] as const;

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center py-32 md:py-48 border-t border-blue-300/20"
    >
      <div className="content-container w-full">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 md:mb-16">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <h2 className="text-xs sm:text-sm uppercase tracking-widest text-blue-600 font-mono font-semibold">
                Featured Projects
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all shrink-0 ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-white/80 border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-8 md:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={handleMouseMove}
                  className="group relative block p-8 sm:p-10 md:p-12 rounded-2xl border border-blue-300/25 bg-white/70 backdrop-blur-sm hover:bg-white/95 hover:border-blue-400/50 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
                >
                  {/* Subtle soft spotlight glow - minimal and subtle */}
                  <div
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background:
                        "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.05), transparent 60%)",
                    }}
                  />

                  <div className="relative z-10">
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
                        <span className="text-xs font-mono px-3 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-500">
                          {project.category}
                        </span>
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
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
