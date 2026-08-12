import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-blue-300/20">
      <div className="content-container flex items-center justify-between text-xs sm:text-sm text-zinc-400 font-mono">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span>VIT Chennai</span>
      </div>
    </footer>
  );
}
