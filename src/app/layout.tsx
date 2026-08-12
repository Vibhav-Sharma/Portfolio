import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vibhav Sharma — AI Engineer & LLM Researcher",
  description:
    "AI Engineer and LLM Researcher building intelligent systems that scale. Computer Science undergraduate at VIT Chennai with research in Large Language Models, RAG systems, and KV Cache optimization.",
  keywords: [
    "AI Engineer",
    "LLM Researcher",
    "Machine Learning",
    "Full Stack Developer",
    "Vibhav Sharma",
    "VIT Chennai",
    "Large Language Models",
    "RAG",
    "PyTorch",
  ],
  authors: [{ name: "Vibhav Sharma" }],
  openGraph: {
    title: "Vibhav Sharma — AI Engineer & LLM Researcher",
    description:
      "Engineering AI systems for real-world impact. Computer Science undergraduate at VIT Chennai.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibhav Sharma — AI Engineer & LLM Researcher",
    description:
      "Engineering AI systems for real-world impact. Computer Science undergraduate at VIT Chennai.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans bg-bg antialiased">
        {children}
      </body>
    </html>
  );
}
