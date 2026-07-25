export const siteConfig = {
  name: "Vibhav Sharma",
  title: "Vibhav Sharma — AI Engineer & LLM Researcher",
  description:
    "AI Engineer & LLM Researcher at VIT Chennai specializing in LLM inference optimization, RAG systems, and high-performance backend systems.",
  url: "https://vibhavsharma.dev",
  links: {
    github: "https://github.com/Vibhav-Sharma",
    linkedin: "https://www.linkedin.com/in/vibhav-sharma-6599b4287/",
    email: "vibhav.sharma2335@gmail.com",
    resume:
      "https://drive.google.com/file/d/1X1FduOSiX8xt_BllgH0HBkBL8uNvjMuS/view?usp=drive_link",
  },
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const experiences = [
  {
    role: "AI/ML Intern",
    company: "BoxInnovate",
    period: "May 2026 – Jul 2026",
    summary:
      "Engineered LLM pipelines for automated subjective answer evaluation, prompt benchmarking, and automated scoring.",
  },
  {
    role: "Student Research Intern",
    company: "CADS Lab, VIT Chennai",
    period: "June 2025 – Nov 2025",
    summary:
      "Designed a topic-aware KV Cache eviction policy reducing GPU memory overhead in LLM multi-turn inference. Submitted to Springer.",
  },
  {
    role: "Teaching Assistant (DSA & DAA)",
    company: "VIT Chennai",
    period: "Jan 2026 – Apr 2026",
    summary:
      "Mentored students in Data Structures and Algorithms, led technical debugging sessions, and reviewed assignments.",
  },
];

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  year: string;
  badge?: string;
}

export const projects: Project[] = [
  {
    title: "Personalized KV Cache Management for LLMs",
    description:
      "Semantic topic-aware KV Cache eviction policy for LLM inference that cuts GPU VRAM usage while preserving multi-turn conversational context.",
    tech: ["Python", "PyTorch", "Transformers"],
    github: "https://github.com/Vibhav-Sharma/KV-Cache-Management",
    year: "2026",
  },
  {
    title: "DA-RAG",
    description:
      "Dynamic Retrieval-Augmented Generation system with clarification-driven query refinement using SBERT, FAISS, and BART.",
    tech: ["Python", "SBERT", "FAISS", "BART"],
    github: "https://github.com/Vibhav-Sharma/DA-RAG",
    year: "2026",
    badge: "IEEE Published",
  },
  {
    title: "Open Pit Rockfall Prediction",
    description:
      "Geological hazard machine learning prediction system selected among Top 50 of ~1,000 Smart India Hackathon internal entries.",
    tech: ["Python", "Machine Learning"],
    github: "https://github.com/Vibhav-Sharma/Open_Pit_Rockfall",
    year: "2025",
    badge: "Top 50 SIH",
  },
  {
    title: "Blockchain Secure Data Storage",
    description:
      "Immutable password & credential manager using SHA-256 hash chaining and encrypted storage.",
    tech: ["JavaScript", "Node.js"],
    github: "https://github.com/Vibhav-Sharma/Blockchain-based-Secure-data-storage-system",
    year: "2025",
  },
];

export const publications = [
  {
    title: "DA-RAG: Dynamic Retrieval-Augmented Generation with Clarification-Driven Query Refinement",
    venue: "IEEE Conference Proceedings",
    year: "2026",
    status: "Published",
    github: "https://ieeexplore.ieee.org/document/11539462",
  },
  {
    title: "Personalized KV Cache Management for LLMs",
    venue: "Springer — Frontiers of Computer Science",
    year: "2026",
    status: "Under Review",
    github: "https://github.com/Vibhav-Sharma/KV-Cache-Management",
  },
];

export const skillCategories = [
  {
    category: "AI / ML & LLMs",
    skills: [
      "Large Language Models",
      "PyTorch",
      "Transformers",
      "RAG Architecture",
      "SBERT & FAISS",
      "KV Cache Optimization",
    ],
  },
  {
    category: "Languages",
    skills: ["Python", "C++", "Java", "JavaScript", "TypeScript"],
  },
  {
    category: "Backend & Cloud",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "AWS",
      "Docker",
      "Linux",
      "GitHub Actions",
    ],
  },
  {
    category: "Core Fundamentals",
    skills: [
      "Data Structures & Algorithms (500+ Solved)",
      "Distributed Systems",
      "Operating Systems",
    ],
  },
];
