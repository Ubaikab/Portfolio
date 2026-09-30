"use client";

import { ArrowDownRight, Terminal, Globe, Cpu } from "lucide-react";
import PortraitCanvas from "./PortraitCanvas";
import { PERSONAL_INFO } from "@/lib/resume";

interface HeroSectionProps {
  visible: boolean;
}

export default function HeroSection({ visible }: HeroSectionProps) {
  const isRevealed = visible;

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative w-full min-h-[100dvh] flex flex-col justify-between pt-24 pb-8"
      style={{
        paddingLeft: "var(--page-px)",
        paddingRight: "var(--page-px)",
      }}
    >
      {/* ─── Top Status & System HUD ───────────────────────────── */}
      <div
        className={`w-full flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-[var(--line)] text-[0.68rem] font-mono tracking-widest uppercase transition-all duration-700 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-[var(--accent)]" />
          <span className="text-[var(--label-3)]">IDENTITY //</span>
          <span className="text-[var(--label-1)] font-bold">{PERSONAL_INFO.displayName}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2">
            <Globe size={13} className="text-[var(--label-3)]" />
            <span className="text-[var(--label-3)]">LOC:</span>
            <span className="text-[var(--label-1)] font-semibold">MUMBAI, INDIA</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[var(--accent)] font-bold">{PERSONAL_INFO.status}</span>
          </div>

          <span className="text-[var(--label-3)] font-mono">{PERSONAL_INFO.year}</span>
        </div>
      </div>

      {/* ─── Center Hero Composition: Typography + Portrait ───────── */}
      <div className="my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        {/* Left Typography Block */}
        <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
          <div>
            <h1 className="text-[clamp(3.2rem,8vw,8rem)] font-bold tracking-[-0.035em] leading-[0.92] uppercase text-[var(--label-1)] select-none">
              UBAIKAB
              <span className="block text-[clamp(3.2rem,8vw,8rem)] text-[var(--label-1)]">
                SHAIKH<span className="text-[var(--accent)]">.</span>
              </span>
            </h1>
          </div>

          <div className="mt-4 lg:mt-6">
            <h2 className="text-[clamp(1.2rem,2.8vw,2.2rem)] font-bold tracking-tight uppercase text-[var(--label-1)] flex flex-wrap items-center gap-x-3 gap-y-1.5 select-none">
              <span className="text-[var(--accent)]">FULL STACK DEVELOPER</span>
              <span className="text-[var(--label-3)] hidden sm:inline">✦</span>
              <span className="text-[var(--label-2)] font-mono text-[clamp(0.8rem,1.4vw,1.1rem)] tracking-wider">
                [AI PROMPT ENGINEER]
              </span>
            </h2>
          </div>

          <p className="mt-4 text-[clamp(0.9rem,1.4vw,1.1rem)] text-[var(--label-2)] max-w-xl leading-relaxed">
            {PERSONAL_INFO.tagline}
          </p>

          {/* Quick Category Badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              "FULL STACK ARCHITECTURE",
              "AI PROMPT ENGINEERING",
              "INTERACTIVE WEBGL / GSAP",
              "REAL-TIME SYSTEMS",
            ].map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 text-[0.65rem] font-mono uppercase tracking-wider rounded-sm border border-[var(--line)] bg-[var(--background-elevated)] text-[var(--label-1)] hover:border-[var(--accent)] transition-colors duration-200"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Right Portrait Interactive Canvas Block */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] xl:max-w-[420px]">
            <PortraitCanvas />
          </div>
        </div>
      </div>

      {/* ─── Bottom Navigation / Tech Stack Stream ────────────────── */}
      <div className="w-full pt-6 border-t border-[var(--line)] flex flex-wrap justify-between items-center gap-4 text-[0.7rem] font-mono tracking-wider uppercase text-[var(--label-3)]">
        <div className="flex items-center gap-3">
          <ArrowDownRight size={14} className="text-[var(--accent)]" />
          <span className="text-[var(--label-2)]">
            REACT · NEXT.JS · NODE.JS · TYPESCRIPT · SOCKET.IO · TAILWIND · MONGODB · AI
          </span>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <span className="flex items-center gap-1.5 text-[var(--label-2)]">
            <Cpu size={12} className="text-[var(--accent)]" />
            V2.4 STABLE
          </span>
          <span className="hidden sm:inline text-[var(--label-3)]">SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
    </section>
  );
}
