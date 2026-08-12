import MagBackground from "@/components/hero/MagBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Publications from "@/components/sections/Publications";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import MouseGlow from "@/components/MouseGlow";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans selection:bg-blue-500/20 selection:text-blue-900">
      {/* WebGL particle background (Mag) */}
      <MagBackground />
      <MouseGlow />

      {/* Main layout */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Publications />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
