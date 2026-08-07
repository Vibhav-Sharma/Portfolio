"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AnimalType = "cat" | "panda" | "fox" | "bunny" | "bear";

const ANIMALS: { id: AnimalType; label: string; icon: string }[] = [
  { id: "cat", label: "Cyber Kitty", icon: "🐱" },
  { id: "panda", label: "Chibi Panda", icon: "🐼" },
  { id: "fox", label: "Aesthetic Fox", icon: "🦊" },
  { id: "bunny", label: "Fluffy Bunny", icon: "🐰" },
  { id: "bear", label: "Teddy Bear", icon: "🐻" },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  icon: string;
}

export default function DoodleMascot() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeAnimal, setActiveAnimal] = useState<AnimalType>("panda");
  const [showSelector, setShowSelector] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Left & Right pupil target offsets
  const leftPupilRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rightPupilRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Current animated positions (for lerp)
  const leftPupilPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rightPupilPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // DOM refs to SVG eye elements
  const leftEyeRef = useRef<SVGCircleElement>(null);
  const rightEyeRef = useRef<SVGCircleElement>(null);
  const pupilLeftDOM = useRef<SVGGElement>(null);
  const pupilRightDOM = useRef<SVGGElement>(null);

  // Target mouse position
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Random periodic blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800 + Math.random() * 2200);

    return () => clearInterval(blinkInterval);
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop for smooth pupil movement
  useEffect(() => {
    let animFrameId: number;

    const updatePupils = () => {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      const calcEyeOffset = (eyeEl: SVGCircleElement | null) => {
        if (!eyeEl) return { x: 0, y: 0 };
        const rect = eyeEl.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const dx = mx - eyeX;
        const dy = my - eyeY;
        const dist = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        // Max pupil offset inside eyeball
        const maxOffset = 6.5;
        const offset = Math.min(dist / 22, maxOffset);

        return {
          x: Math.cos(angle) * offset,
          y: Math.sin(angle) * offset,
        };
      };

      leftPupilRef.current = calcEyeOffset(leftEyeRef.current);
      rightPupilRef.current = calcEyeOffset(rightEyeRef.current);

      // Lerp for buttery motion
      const lerpFactor = 0.2;

      leftPupilPos.current.x +=
        (leftPupilRef.current.x - leftPupilPos.current.x) * lerpFactor;
      leftPupilPos.current.y +=
        (leftPupilRef.current.y - leftPupilPos.current.y) * lerpFactor;

      rightPupilPos.current.x +=
        (rightPupilRef.current.x - rightPupilPos.current.x) * lerpFactor;
      rightPupilPos.current.y +=
        (rightPupilRef.current.y - rightPupilPos.current.y) * lerpFactor;

      if (pupilLeftDOM.current) {
        pupilLeftDOM.current.setAttribute(
          "transform",
          `translate(${leftPupilPos.current.x.toFixed(2)}, ${leftPupilPos.current.y.toFixed(2)})`
        );
      }
      if (pupilRightDOM.current) {
        pupilRightDOM.current.setAttribute(
          "transform",
          `translate(${rightPupilPos.current.x.toFixed(2)}, ${rightPupilPos.current.y.toFixed(2)})`
        );
      }

      animFrameId = requestAnimationFrame(updatePupils);
    };

    animFrameId = requestAnimationFrame(updatePupils);
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 250);

    // Spamming Emoji Explosion (Spawns 3-5 randomized emojis per click)
    const emojiPool = ["✨", "❤️", "🐾", "⭐", "💖", "🌸", "💫", "⚡", "🤖", "💜", "🌟", "🔥", "🎉", "👑"];
    const count = 3 + Math.floor(Math.random() * 3);
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + Math.random() + i,
        x: (Math.random() - 0.5) * 75,
        y: (Math.random() - 0.5) * 20,
        rotation: (Math.random() - 0.5) * 60,
        size: 14 + Math.random() * 14,
        icon: emojiPool[Math.floor(Math.random() * emojiPool.length)],
      });
    }

    setParticles((prev) => [...prev.slice(-20), ...newParticles]);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.7 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 22,
        delay: 0.6,
      }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 select-none flex flex-col items-end pointer-events-auto"
    >
      {/* Floating Spam Emoji Burst Container */}
      <div className="absolute top-0 right-10 pointer-events-none z-30">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{
                opacity: 1,
                y: p.y,
                x: p.x,
                scale: 0.5,
                rotate: p.rotation,
              }}
              animate={{
                opacity: 0,
                y: p.y - 100 - Math.random() * 40,
                x: p.x + (Math.random() - 0.5) * 45,
                scale: [0.8, 1.4, 1],
                rotate: p.rotation + (Math.random() - 0.5) * 90,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              style={{ fontSize: `${p.size}px` }}
              className="absolute font-bold drop-shadow-md select-none"
            >
              {p.icon}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Animal Switcher Menu */}
      <AnimatePresence>
        {showSelector && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            className="mb-3 p-2 rounded-2xl bg-zinc-950/90 border border-purple-500/30 shadow-2xl backdrop-blur-xl flex items-center gap-1.5 z-30"
          >
            {ANIMALS.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  setActiveAnimal(a.id);
                  setShowSelector(false);
                }}
                title={a.label}
                className={`p-2 rounded-xl text-base transition-all ${
                  activeAnimal === a.id
                    ? "bg-purple-600/40 border border-purple-400/50 scale-110 shadow-md"
                    : "hover:bg-zinc-800/80 opacity-70 hover:opacity-100"
                }`}
              >
                {a.icon}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Mascot Container */}
      <div className="relative group flex items-center gap-2">
        {/* Hover Controls (Animal Switcher & Minimize & Dismiss) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          className="absolute -top-3 -left-4 flex gap-1 z-30"
        >
          <button
            onClick={() => setShowSelector(!showSelector)}
            title="Change animal mascot"
            className="w-5.5 h-5.5 rounded-full bg-zinc-900/90 border border-purple-500/30 text-zinc-300 text-[10px] flex items-center justify-center shadow-lg hover:bg-purple-600 hover:text-white transition-all"
          >
            🐾
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? "Expand mascot" : "Minimize mascot"}
            className="w-5.5 h-5.5 rounded-full bg-zinc-900/90 border border-purple-500/30 text-zinc-300 text-[10px] flex items-center justify-center shadow-lg hover:bg-purple-600 hover:text-white transition-all"
          >
            {isMinimized ? "▲" : "▼"}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            title="Dismiss mascot"
            className="w-5.5 h-5.5 rounded-full bg-zinc-900/90 border border-purple-500/30 text-zinc-300 text-[10px] flex items-center justify-center shadow-lg hover:bg-rose-500 hover:text-white transition-all"
          >
            ✕
          </button>
        </motion.div>

        {/* Animal SVG */}
        {!isMinimized ? (
          <motion.div
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
              y: isClicked ? [0, -14, 0] : isHovered ? [0, -5, 0] : [0, -6, 0],
              scale: isClicked ? [1, 0.86, 1.12, 1] : isHovered ? 1.05 : 1,
              rotate: isHovered ? [0, -2, 2, 0] : 0,
            }}
            transition={{
              y: {
                duration: isClicked ? 0.25 : 3,
                repeat: isClicked ? 0 : Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              scale: { duration: 0.25 },
              rotate: { duration: 0.35 },
            }}
            className="cursor-pointer relative p-2.5 rounded-full bg-zinc-950/60 border border-purple-500/25 shadow-2xl backdrop-blur-xl hover:border-purple-500/60 hover:shadow-purple-500/25 transition-all duration-300 group"
          >
            {/* Ambient Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/20 via-indigo-500/15 to-pink-500/20 opacity-70 group-hover:opacity-100 transition-opacity blur-lg" />

            <svg
              width="105"
              height="105"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 overflow-visible"
            >
              <defs>
                <linearGradient id="bodyDark" x1="0" y1="0" x2="120" y2="120">
                  <stop offset="0%" stopColor="#1e1b4b" />
                  <stop offset="60%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#09090b" />
                </linearGradient>
                <linearGradient id="foxGrad" x1="0" y1="0" x2="120" y2="120">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="70%" stopColor="#c2410c" />
                  <stop offset="100%" stopColor="#1e1b4b" />
                </linearGradient>
                <linearGradient id="bearGrad" x1="0" y1="0" x2="120" y2="120">
                  <stop offset="0%" stopColor="#581c87" />
                  <stop offset="70%" stopColor="#3b0764" />
                  <stop offset="100%" stopColor="#09090b" />
                </linearGradient>
                <linearGradient id="pinkAccent" x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>

              {/* Top Accessory */}
              {activeAnimal === "cat" && (
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "60px 10px" }}
                >
                  <path
                    d="M 60 4 L 62.5 8.5 L 67 9.5 L 63.5 12.5 L 64.5 17 L 60 14.5 L 55.5 17 L 56.5 12.5 L 53 9.5 L 57.5 8.5 Z"
                    fill="#c084fc"
                    opacity="0.9"
                  />
                </motion.g>
              )}
              {activeAnimal === "panda" && (
                <path
                  d="M 57 14 C 55 4, 66 4, 63 14 Z M 60 14 C 62 6, 72 8, 67 16 Z"
                  fill="#22c55e"
                />
              )}
              {activeAnimal === "bunny" && (
                <ellipse cx="60" cy="10" rx="4" ry="2.5" fill="#f472b6" />
              )}

              {/* Shadow Base */}
              <ellipse cx="60" cy="110" rx="30" ry="5" fill="#000000" opacity="0.4" />

              {/* EAR DESIGNS */}
              {activeAnimal === "cat" && (
                <>
                  <path d="M 28 42 C 20 22, 38 12, 46 32 Z" fill="url(#bodyDark)" stroke="#a855f7" strokeWidth="3" />
                  <path d="M 32 38 C 26 26, 38 20, 43 32 Z" fill="url(#pinkAccent)" opacity="0.8" />
                  <path d="M 92 42 C 100 22, 82 12, 74 32 Z" fill="url(#bodyDark)" stroke="#a855f7" strokeWidth="3" />
                  <path d="M 88 38 C 94 26, 82 20, 77 32 Z" fill="url(#pinkAccent)" opacity="0.8" />
                </>
              )}

              {activeAnimal === "panda" && (
                <>
                  <circle cx="34" cy="30" r="13" fill="#09090b" stroke="#3f3f46" strokeWidth="3" />
                  <circle cx="86" cy="30" r="13" fill="#09090b" stroke="#3f3f46" strokeWidth="3" />
                  <circle cx="34" cy="30" r="7" fill="#27272a" />
                  <circle cx="86" cy="30" r="7" fill="#27272a" />
                </>
              )}

              {activeAnimal === "fox" && (
                <>
                  <path d="M 26 44 C 14 16, 38 10, 48 30 Z" fill="url(#foxGrad)" stroke="#f97316" strokeWidth="3" />
                  <path d="M 30 38 C 22 22, 38 18, 44 30 Z" fill="#ffffff" opacity="0.9" />
                  <path d="M 94 44 C 106 16, 82 10, 72 30 Z" fill="url(#foxGrad)" stroke="#f97316" strokeWidth="3" />
                  <path d="M 90 38 C 98 22, 82 18, 76 30 Z" fill="#ffffff" opacity="0.9" />
                </>
              )}

              {activeAnimal === "bunny" && (
                <>
                  <path d="M 38 34 C 20 -8, 48 -8, 48 30 Z" fill="url(#bodyDark)" stroke="#f472b6" strokeWidth="3" />
                  <path d="M 40 28 C 28 0, 46 0, 46 26 Z" fill="url(#pinkAccent)" opacity="0.75" />
                  <path d="M 82 34 C 100 -8, 72 -8, 72 30 Z" fill="url(#bodyDark)" stroke="#f472b6" strokeWidth="3" />
                  <path d="M 80 28 C 92 0, 74 0, 74 26 Z" fill="url(#pinkAccent)" opacity="0.75" />
                </>
              )}

              {activeAnimal === "bear" && (
                <>
                  <circle cx="34" cy="32" r="12" fill="url(#bearGrad)" stroke="#a855f7" strokeWidth="3" />
                  <circle cx="86" cy="32" r="12" fill="url(#bearGrad)" stroke="#a855f7" strokeWidth="3" />
                  <circle cx="34" cy="32" r="6" fill="#f472b6" opacity="0.7" />
                  <circle cx="86" cy="32" r="6" fill="#f472b6" opacity="0.7" />
                </>
              )}

              {/* MAIN BODY SILHOUETTE */}
              <path
                d="M 60 26 C 86 26, 98 44, 98 68 C 98 94, 82 106, 60 106 C 38 106, 22 94, 22 68 C 22 44, 34 26, 60 26 Z"
                fill={
                  activeAnimal === "fox"
                    ? "url(#foxGrad)"
                    : activeAnimal === "bear"
                    ? "url(#bearGrad)"
                    : activeAnimal === "panda"
                    ? "#fafafa"
                    : "url(#bodyDark)"
                }
                stroke={
                  activeAnimal === "fox"
                    ? "#f97316"
                    : activeAnimal === "bunny"
                    ? "#f472b6"
                    : activeAnimal === "panda"
                    ? "#3f3f46"
                    : "#c084fc"
                }
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Panda Eye Patches */}
              {activeAnimal === "panda" && (
                <>
                  <ellipse cx="44" cy="54" rx="15" ry="13" fill="#09090b" transform="rotate(-10 44 54)" />
                  <ellipse cx="76" cy="54" rx="15" ry="13" fill="#09090b" transform="rotate(10 76 54)" />
                </>
              )}

              {/* Fox White Muzzle Patch */}
              {activeAnimal === "fox" && (
                <path d="M 34 68 Q 60 92 86 68 Q 60 104 34 68 Z" fill="#ffffff" opacity="0.95" />
              )}

              {/* Whiskers for Cat & Bunny */}
              {(activeAnimal === "cat" || activeAnimal === "bunny") && (
                <>
                  <path d="M 20 62 L 8 59 M 20 66 L 9 67 M 20 70 L 10 74" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                  <path d="M 100 62 L 112 59 M 100 66 L 111 67 M 100 70 L 110 74" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                </>
              )}

              {/* Rosy Cheeks */}
              <circle cx="36" cy="68" r="6" fill="#f43f5e" opacity="0.45" />
              <circle cx="84" cy="68" r="6" fill="#f43f5e" opacity="0.45" />

              {/* LEFT EYEBASE */}
              <circle ref={leftEyeRef} cx="44" cy="54" r="13" fill="#ffffff" stroke="#1e1b4b" strokeWidth="2.5" />

              {/* RIGHT EYEBASE */}
              <circle ref={rightEyeRef} cx="76" cy="54" r="13" fill="#ffffff" stroke="#1e1b4b" strokeWidth="2.5" />

              {/* LEFT PUPIL & HIGHLIGHTS */}
              {isBlinking ? (
                <path d="M 31 54 Q 44 62 57 54" stroke="#312e81" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              ) : (
                <g ref={pupilLeftDOM}>
                  <circle cx="44" cy="54" r="7" fill={activeAnimal === "fox" ? "#c2410c" : "#4c1d95"} />
                  <circle cx="44" cy="54" r="5" fill="#09090b" />
                  <circle cx="42" cy="51" r="2.2" fill="#ffffff" />
                  <circle cx="46.5" cy="56.5" r="1" fill="#ffffff" />
                </g>
              )}

              {/* RIGHT PUPIL & HIGHLIGHTS */}
              {isBlinking ? (
                <path d="M 63 54 Q 76 62 89 54" stroke="#312e81" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              ) : (
                <g ref={pupilRightDOM}>
                  <circle cx="76" cy="54" r="7" fill={activeAnimal === "fox" ? "#c2410c" : "#4c1d95"} />
                  <circle cx="76" cy="54" r="5" fill="#09090b" />
                  <circle cx="74" cy="51" r="2.2" fill="#ffffff" />
                  <circle cx="78.5" cy="56.5" r="1" fill="#ffffff" />
                </g>
              )}

              {/* Cute Nose */}
              <polygon points="60,65 57,61 63,61" fill="#f472b6" stroke="#db2777" strokeWidth="1" />

              {/* Expressive Mouth */}
              {isClicked ? (
                <ellipse cx="60" cy="73" rx="5" ry="7" fill="#09090b" stroke="#f472b6" strokeWidth="2" />
              ) : isHovered ? (
                <path d="M 52 68 Q 60 80 68 68 Z" fill="#f43f5e" stroke="#c084fc" strokeWidth="2" strokeLinejoin="round" />
              ) : (
                <path d="M 51 68 Q 55.5 73 60 69 Q 64.5 73 69 68" stroke={activeAnimal === "panda" ? "#18181b" : "#c084fc"} strokeWidth="2.5" strokeLinecap="round" fill="none" />
              )}

              {/* Adorable Paws */}
              <ellipse cx="42" cy="102" rx="8" ry="5" fill={activeAnimal === "panda" ? "#09090b" : "#1e1b4b"} stroke="#c084fc" strokeWidth="2" />
              <ellipse cx="78" cy="102" rx="8" ry="5" fill={activeAnimal === "panda" ? "#09090b" : "#1e1b4b"} stroke="#c084fc" strokeWidth="2" />
            </svg>
          </motion.div>
        ) : (
          /* Minimized pill icon */
          <motion.button
            onClick={() => setIsMinimized(false)}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-950/80 border border-purple-500/30 text-xs font-medium text-zinc-200 shadow-xl backdrop-blur-xl hover:border-purple-500 hover:text-white transition"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span>Mascot 🐾</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
