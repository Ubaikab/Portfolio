"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface PortraitCanvasProps {
  className?: string;
}

export default function PortraitCanvas({ className = "" }: PortraitCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0, isHovered: false });
  const [isGlitching, setIsGlitching] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Detect theme (dark/light) by watching the .dark class on <html>
  useEffect(() => {
    const checkTheme = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Periodic subtle holographic glitch pulse
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      const timer = setTimeout(() => setIsGlitching(false), 260);
      return () => clearTimeout(timer);
    }, 4500);

    return () => clearInterval(glitchInterval);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x, y, isHovered: true });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setMouseOffset((prev) => ({ ...prev, isHovered: true }));
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 380);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0, isHovered: false });
    setIsGlitching(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-sm select-none border border-[var(--line)] ${isDark ? "bg-[#080a0a]" : "bg-[#f5f5f0]"} ${className}`}
      style={{
        aspectRatio: "3 / 4",
        boxShadow: isDark
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(192, 254, 4, 0.12)"
          : "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 35px rgba(158, 219, 0, 0.08)",
      }}
      data-cursor-label="UBAIKAB"
    >
      {/* ─── Cyber Ambient Backdrop ───────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(192, 254, 4, ${isDark ? "0.08" : "0.05"}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192, 254, 4, ${isDark ? "0.08" : "0.05"}) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(circle at ${50 + mouseOffset.x * 25}% ${35 + mouseOffset.y * 25}%, rgba(192, 254, 4, 0.2) 0%, transparent 65%)
          `,
        }}
      />

      {/* ─── Main Graphic Artwork with Parallax & Glitch Layers ─ */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${mouseOffset.isHovered ? 1.03 : 1}) translate3d(${mouseOffset.x * 6}px, ${mouseOffset.y * 6}px, 0)`,
        }}
      >
        {/* Red Glitch Channel Ghost */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-150 mix-blend-screen ${
            isGlitching ? "opacity-80" : "opacity-0"
          }`}
          style={{
            transform: "translate(-4px, 2px)",
            filter: "hue-rotate(290deg) saturate(2)",
          }}
        >
          <Image
            src={isDark ? "/images/cyber-portrait.jpg" : "/images/cyber-portrait-light.jpg"}
            alt=""
            fill
            sizes="420px"
            className="object-cover object-top"
          />
        </div>

        {/* Cyan Glitch Channel Ghost */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-150 mix-blend-screen ${
            isGlitching ? "opacity-80" : "opacity-0"
          }`}
          style={{
            transform: "translate(4px, -2px)",
            filter: "hue-rotate(160deg) saturate(2)",
          }}
        >
          <Image
            src={isDark ? "/images/cyber-portrait.jpg" : "/images/cyber-portrait-light.jpg"}
            alt=""
            fill
            sizes="420px"
            className="object-cover object-top"
          />
        </div>

        {/* Primary Artwork */}
        <Image
          src={isDark ? "/images/cyber-portrait.jpg" : "/images/cyber-portrait-light.jpg"}
          alt="Ubaikab Shaikh — Full Stack Developer"
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 420px"
          priority
          onLoad={() => setImageLoaded(true)}
          className={`object-cover object-top transition-all duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            filter: isGlitching
              ? "contrast(1.3) brightness(1.1) saturate(1.2)"
              : mouseOffset.isHovered
              ? "contrast(1.1) brightness(1.02)"
              : "contrast(1.05) brightness(0.98)",
          }}
        />

        {/* Subtle Bottom Fade to seamlessly frame ID card */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, transparent 80%, rgba(8, 10, 10, 0.6) 100%)"
              : "linear-gradient(to bottom, transparent 80%, rgba(245, 245, 240, 0.6) 100%)",
          }}
        />
      </div>

      {/* ─── Holographic Scanlines ────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.7) 3px, rgba(0, 0, 0, 0.7) 4px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Horizontal Glitch Slice Bar */}
      {isGlitching && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-70 mix-blend-overlay animate-pulse"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(192, 254, 4, 0.5), transparent)",
            transform: "translateY(-15%)",
          }}
        />
      )}

      {/* ─── Cyberpunk HUD Frame Overlays ─────────────────────── */}
      <div className="absolute inset-0 pointer-events-none p-3.5 flex flex-col justify-between z-20">
        <div className="flex justify-between items-center text-[0.62rem] font-mono tracking-widest uppercase">
          <span className="px-2 py-0.5 rounded-sm bg-black/80 backdrop-blur-md border border-[var(--accent)]/50 text-[var(--accent)] font-bold flex items-center gap-1.5 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping inline-block" />
            SYS_ID // 01
          </span>
          <span className="px-2 py-0.5 rounded-sm bg-black/70 backdrop-blur-md border border-white/10 text-white/80 font-mono text-[0.55rem]">
            LIVE // 99.8%
          </span>
        </div>

        <div className="flex justify-between items-end text-[0.58rem] font-mono tracking-wider">
          <span className="px-2 py-0.5 rounded-sm bg-black/80 backdrop-blur-md border border-white/10 text-white/80">
            MUMBAI, IN
          </span>
          <span className="px-2 py-0.5 rounded-sm bg-black/80 backdrop-blur-md border border-white/10 text-[var(--accent)] font-semibold">
            19.0760° N, 72.8777° E
          </span>
        </div>
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] pointer-events-none z-20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] pointer-events-none z-20" />
    </div>
  );
}
