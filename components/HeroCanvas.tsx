"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    let w = 0;
    let h = 0;

    function draw(pulse = 0) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0D1C14";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(78, 158, 106, 0.12)";
      ctx.lineWidth = 1;
      for (let gx = 0; gx <= w; gx += 48) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy <= h; gy += 48) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      const scale = w / 600;
      const domeCx = w * 0.55;
      const domeCy = h * 0.38;
      const rings = [120, 95, 70, 48, 28];
      rings.forEach((r, i) => {
        const radius = (r + (i === 0 ? pulse * 6 : 0)) * scale;
        ctx.beginPath();
        ctx.arc(domeCx, domeCy, radius, 0, Math.PI * 2);
        ctx.strokeStyle =
          i === 0
            ? `rgba(78, 158, 106, ${0.25 + pulse * 0.1})`
            : "rgba(78, 158, 106, 0.25)";
        ctx.lineWidth = i === 0 ? 1.5 : 1;
        ctx.stroke();
      });

      const hills = [
        { color: "#1a3d2a", points: [0, 0.62, 0.15, 0.48, 0.35, 0.55, 0.55, 0.42, 0.75, 0.52, 1, 0.45] },
        { color: "#234d35", points: [0, 0.72, 0.2, 0.58, 0.42, 0.65, 0.65, 0.52, 0.85, 0.6, 1, 0.55] },
        { color: "#2d6042", points: [0, 0.82, 0.25, 0.72, 0.5, 0.78, 0.72, 0.68, 1, 0.75] },
      ];

      hills.forEach((hill) => {
        ctx.fillStyle = hill.color;
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(0, h * hill.points[1]);
        for (let i = 2; i < hill.points.length; i += 2) {
          ctx.lineTo(w * hill.points[i], h * hill.points[i + 1]);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
      });

      ctx.strokeStyle = "#4E9E6A";
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.82);
      ctx.lineTo(w * 0.25, h * 0.72);
      ctx.lineTo(w * 0.5, h * 0.78);
      ctx.lineTo(w * 0.72, h * 0.68);
      ctx.lineTo(w, h * 0.75);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function resize() {
      const c = canvasRef.current;
      if (!c || !ctx) return;
      const wrap = c.parentElement;
      if (!wrap) return;
      const dpr = window.devicePixelRatio || 1;
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    let animId: number;
    function animate() {
      if (reducedMotion) return;
      frame++;
      const pulse = Math.sin(frame * 0.015) * 0.5 + 0.5;
      draw(pulse);
      animId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    if (!reducedMotion) animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
