"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPEECH_BUBBLES = [
  "Hi there! 👋",
  "I'm watching your cursor! 👀",
  "Vibhav builds awesome AI systems! 🚀",
  "Boop! You found me! 👉👈",
  "Need an LLM researcher? 🤖",
  "Keep scrolling to see cool projects! ✨",
  "I follow your every move! 👁️👁️",
];

export default function DoodleMascot() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [speechIndex, setSpeechIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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
      setTimeout(() => setIsBlinking(false), 180);
    }, 3500 + Math.random() * 2500);

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

        // Maximum offset radius in SVG units (eyeball radius is ~14, pupil is ~6, so max ~6.5 offset)
        const maxOffset = 6.5;
        const offset = Math.min(dist / 20, maxOffset);

        return {
          x: Math.cos(angle) * offset,
          y: Math.sin(angle) * offset,
        };
      };

      leftPupilRef.current = calcEyeOffset(leftEyeRef.current);
      rightPupilRef.current = calcEyeOffset(rightEyeRef.current);

      // Lerp (linear interpolation for buttery motion)
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
    setTimeout(() => setIsClicked(false), 300);

    setSpeechIndex((prev) =>
      prev === null ? 0 : (prev + 1) % SPEECH_BUBBLES.length
    );
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 select-none flex flex-col items-end pointer-events-auto">
      {/* Speech Bubble */}
      <AnimatePresence>
        {speechIndex !== null && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative mb-3 max-w-[200px] rounded-2xl bg-zinc-900/90 border border-purple-500/30 px-3.5 py-2 text-xs font-medium text-zinc-200 shadow-xl backdrop-blur-md"
          >
            <div className="pr-3">{SPEECH_BUBBLES[speechIndex]}</div>
            {/* Close speech bubble button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSpeechIndex(null);
              }}
              aria-label="Close message"
              className="absolute top-1.5 right-1.5 text-zinc-500 hover:text-zinc-300 text-[10px] p-0.5 rounded-full hover:bg-zinc-800 transition"
            >
              ✕
            </button>
            {/* Speech bubble tail pointing down */}
            <div className="absolute -bottom-2 right-8 h-0 w-0 border-x-[6px] border-x-transparent border-t-[8px] border-t-zinc-900/90 drop-shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Doodle Container */}
      <div className="relative group flex items-center gap-2">
        {/* Minimize / Close controls on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          className="absolute -top-3 -left-3 flex gap-1 z-10"
        >
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? "Expand doodle" : "Minimize doodle"}
            className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] flex items-center justify-center shadow hover:bg-purple-600 hover:text-white transition"
          >
            {isMinimized ? "▲" : "▼"}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            title="Dismiss doodle"
            className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] flex items-center justify-center shadow hover:bg-red-500 hover:text-white transition"
          >
            ✕
          </button>
        </motion.div>

        {/* Doodle Character SVG */}
        {!isMinimized ? (
          <motion.div
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
              y: isClicked ? [0, -12, 0] : isHovered ? [0, -4, 0] : [0, -6, 0],
              scale: isClicked ? [1, 0.88, 1.08, 1] : isHovered ? 1.06 : 1,
              rotate: isHovered ? [0, -3, 3, 0] : 0,
            }}
            transition={{
              y: {
                duration: isClicked ? 0.3 : 2.5,
                repeat: isClicked ? 0 : Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              scale: { duration: 0.3 },
              rotate: { duration: 0.4 },
            }}
            className="cursor-pointer relative p-2 rounded-3xl bg-zinc-950/70 border border-purple-500/20 shadow-2xl backdrop-blur-md hover:border-purple-500/50 hover:shadow-purple-500/10 transition-all duration-300 group"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-600/10 to-indigo-500/10 opacity-60 group-hover:opacity-100 transition-opacity blur-md" />

            <svg
              width="100"
              height="100"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 overflow-visible"
            >
              {/* Cute Antenna with glowing orb */}
              <path
                d="M 60 32 Q 60 16 68 12"
                stroke="#a855f7"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle
                cx="68"
                cy="12"
                r="4"
                fill="#c084fc"
                className="animate-pulse"
              />
              <circle
                cx="68"
                cy="12"
                r="7"
                fill="#c084fc"
                opacity="0.3"
                className="animate-ping"
              />

              {/* Main Body Ghost/Blob Hand-Drawn Doodle SVG */}
              {/* Body Shadow */}
              <ellipse
                cx="60"
                cy="108"
                rx="32"
                ry="6"
                fill="#000000"
                opacity="0.35"
              />

              {/* Body Fill & Stroke */}
              <path
                d="M 28 65 
                   C 28 35, 40 28, 60 28 
                   C 80 28, 92 35, 92 65 
                   C 92 85, 90 98, 82 102 
                   C 76 105, 72 98, 67 101 
                   C 62 104, 58 104, 53 101 
                   C 48 98, 44 105, 38 102 
                   C 30 98, 28 85, 28 65 Z"
                fill="#18181b"
                stroke="#d4d4d8"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Cute Little Hands / Paws */}
              <path
                d="M 24 68 Q 16 72 24 78"
                stroke="#d4d4d8"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 96 68 Q 104 72 96 78"
                stroke="#d4d4d8"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />

              {/* Rosy Cheeks */}
              <circle cx="38" cy="68" r="5" fill="#f43f5e" opacity="0.4" />
              <circle cx="82" cy="68" r="5" fill="#f43f5e" opacity="0.4" />

              {/* Left Eyeball Base */}
              <circle
                ref={leftEyeRef}
                cx="44"
                cy="54"
                r="13"
                fill="#ffffff"
                stroke="#27272a"
                strokeWidth="2"
              />

              {/* Right Eyeball Base */}
              <circle
                ref={rightEyeRef}
                cx="76"
                cy="54"
                r="13"
                fill="#ffffff"
                stroke="#27272a"
                strokeWidth="2"
              />

              {/* Left Eyelid / Blink */}
              {isBlinking ? (
                <path
                  d="M 31 54 Q 44 62 57 54"
                  stroke="#18181b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : (
                <g ref={pupilLeftDOM}>
                  {/* Pupil */}
                  <circle cx="44" cy="54" r="6" fill="#09090b" />
                  {/* Cute White Pupil Reflection */}
                  <circle cx="42" cy="52" r="2" fill="#ffffff" />
                </g>
              )}

              {/* Right Eyelid / Blink */}
              {isBlinking ? (
                <path
                  d="M 63 54 Q 76 62 89 54"
                  stroke="#18181b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : (
                <g ref={pupilRightDOM}>
                  {/* Pupil */}
                  <circle cx="76" cy="54" r="6" fill="#09090b" />
                  {/* Cute White Pupil Reflection */}
                  <circle cx="74" cy="52" r="2" fill="#ffffff" />
                </g>
              )}

              {/* Eyebrows */}
              <path
                d={isHovered ? "M 36 37 Q 44 33 50 38" : "M 36 38 Q 44 35 50 38"}
                stroke="#d4d4d8"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={isHovered ? "M 70 38 Q 76 33 84 37" : "M 70 38 Q 76 35 84 38"}
                stroke="#d4d4d8"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Expressive Mouth */}
              {isClicked ? (
                // O-mouth on click 😮
                <ellipse
                  cx="60"
                  cy="75"
                  rx="6"
                  ry="8"
                  fill="#09090b"
                  stroke="#d4d4d8"
                  strokeWidth="2"
                />
              ) : isHovered ? (
                // Happy big open smile on hover 😀
                <path
                  d="M 48 72 Q 60 86 72 72 Z"
                  fill="#09090b"
                  stroke="#d4d4d8"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              ) : (
                // Cute simple cat-mouth / curve smile 😊
                <path
                  d="M 50 73 Q 55 77 60 73 Q 65 77 70 73"
                  stroke="#d4d4d8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              )}
            </svg>
          </motion.div>
        ) : (
          /* Minimized pill icon */
          <motion.button
            onClick={() => setIsMinimized(false)}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-purple-500/30 text-xs font-mono text-zinc-300 shadow-xl backdrop-blur-md hover:border-purple-500 hover:text-white transition"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>Mascot 👀</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
