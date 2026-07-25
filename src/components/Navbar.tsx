"use client";

import { useState, useEffect } from "react";
import { navLinks, siteConfig } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08080a]/90 backdrop-blur-md border-b border-purple-500/10 shadow-lg shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <nav className="content-container h-20 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-sm font-semibold tracking-wide text-white hover:text-purple-300 transition-colors duration-200"
        >
          {siteConfig.name}
        </a>

        <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-mono text-zinc-400">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="hover:text-purple-300 transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
