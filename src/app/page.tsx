import DotGridCanvas from "@/components/hero/DotGridCanvas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Publications from "@/components/sections/Publications";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#08080a] text-zinc-100 font-sans selection:bg-white/20 selection:text-white">
      {/* Mouse-reactive dot grid canvas background */}
      <DotGridCanvas />

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
