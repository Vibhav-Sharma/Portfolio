"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
}

export default function DotGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let points: Point[] = [];

    const spacing = 28; // Grid spacing in pixels
    const radius = 100; // Radius of mouse influence
    const forceFactor = 0.4;

    const initGrid = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      points = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          points.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    initGrid();
    window.addEventListener("resize", initGrid);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        if (!prefersReduced && mouseRef.current.active) {
          const dx = mx - pt.x;
          const dy = my - pt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            const force = (1 - dist / radius) * forceFactor;
            const angle = Math.atan2(dy, dx);
            const targetX = pt.originX - Math.cos(angle) * force * 24;
            const targetY = pt.originY - Math.sin(angle) * force * 24;

            pt.vx += (targetX - pt.x) * 0.15;
            pt.vy += (targetY - pt.y) * 0.15;
          }
        }

        // Spring back to origin
        pt.vx += (pt.originX - pt.x) * 0.05;
        pt.vy += (pt.originY - pt.y) * 0.05;

        // Friction / Damping
        pt.vx *= 0.82;
        pt.vy *= 0.82;

        pt.x += pt.vx;
        pt.y += pt.vy;

        // Calculate opacity based on distance to mouse
        let dotAlpha = 0.12;
        let dotSize = 1.2;

        if (mouseRef.current.active) {
          const dx = mx - pt.x;
          const dy = my - pt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius * 1.5) {
            const factor = 1 - dist / (radius * 1.5);
            dotAlpha = 0.12 + factor * 0.45;
            dotSize = 1.2 + factor * 1.2;
          }
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", initGrid);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
