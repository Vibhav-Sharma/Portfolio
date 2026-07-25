"use client";

import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import ScrollReveal from "./ScrollReveal";

interface ProjectCardProps {
  title: string;
  subtitle?: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  year?: string;
  badge?: string;
  featured?: boolean;
  index: number;
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  tech,
  github,
  live,
  year,
  badge,
  featured,
  index,
}: ProjectCardProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.article
        className={`group relative rounded-xl border border-border bg-surface p-6 md:p-8 transition-colors duration-300 hover:border-border-hover hover:bg-surface-hover ${
          featured ? "md:col-span-2" : ""
        }`}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {/* Spotlight hover effect */}
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(139,92,246,0.06),transparent_40%)]" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                {year && (
                  <span className="text-xs text-text-tertiary font-medium tracking-wider uppercase">
                    {year}
                  </span>
                )}
                {badge && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-dim text-accent border border-accent/20">
                    {badge}
                  </span>
                )}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-text-primary group-hover:text-accent transition-colors duration-300">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
              )}
            </div>

            {/* Links */}
            <div className="flex items-center gap-2 ml-4">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-white/5 transition-all duration-200"
                  aria-label={`View ${title} on GitHub`}
                >
                  <FiGithub className="w-4 h-4" />
                </a>
              )}
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-white/5 transition-all duration-200"
                  aria-label={`View live demo of ${title}`}
                >
                  <FiExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">
            {description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs font-medium rounded-md bg-white/[0.04] text-text-secondary border border-border"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0">
          <FiArrowUpRight className="w-5 h-5 text-accent" />
        </div>
      </motion.article>
    </ScrollReveal>
  );
}
