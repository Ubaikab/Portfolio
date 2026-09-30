"use client";

import { useEffect, useRef } from "react";
import { Sparkles, Terminal, Code2, Brain } from "lucide-react";
import Image from "next/image";

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && contentRef.current) {
          contentRef.current.style.opacity = "1";
          contentRef.current.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      aria-label="Core Philosophy & AI Positioning"
      className="w-full py-[var(--page-py-lg)] border-t border-[var(--line)] relative overflow-hidden"
      style={{
        paddingLeft: "var(--page-px)",
        paddingRight: "var(--page-px)",
      }}
    >
      <div
        ref={contentRef}
        className="max-w-6xl mx-auto opacity-0 translate-y-12 transition-all duration-1000 space-y-16"
      >
        {/* Top Tag */}
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 text-xs font-mono tracking-widest uppercase text-[var(--label-3)]">
          <span className="flex items-center gap-2 text-[var(--accent)] font-semibold">
            <Sparkles size={13} />
            <span>DUAL CORE POSITIONING // 07</span>
          </span>
          <span>CODE × INTELLIGENCE</span>
        </div>

        {/* Editorial Headline Statement */}
        <div className="space-y-4">
          <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold tracking-[-0.03em] leading-[0.96] uppercase text-[var(--label-1)] select-none">
            I BUILD <span className="text-[var(--accent)]">THE APPLICATION</span>.
            <br />
            AND I BUILD <span className="text-[var(--label-2)]">THE INTELLIGENCE</span> INSIDE IT.
          </h2>

          <p className="text-[clamp(1rem,1.8vw,1.35rem)] text-[var(--label-2)] max-w-3xl leading-relaxed font-normal pt-4">
            Combining rigorous full-stack development with advanced prompt engineering and LLM orchestration.
            Crafting software that is visually stunning, architecturally sound, and contextually aware.
          </p>
        </div>

        {/* Dual Pillar Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
          {/* Pillar 01: Full Stack Architecture */}
          <div className="p-8 rounded-sm border border-[var(--line)] bg-[var(--background-elevated)] space-y-6 flex flex-col justify-between hover:border-[var(--label-3)] transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-sm bg-[var(--background-1)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)]">
                <Code2 size={20} />
              </div>

              <div className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase">
                ENGINEERING PILLAR 01
              </div>

              <h3 className="text-2xl font-bold uppercase tracking-tight text-[var(--label-1)]">
                FULL STACK ENGINEERING
              </h3>

              <p className="text-sm text-[var(--label-2)] leading-relaxed">
                Responsive, accessible interfaces with React, Next.js, and Tailwind CSS.
                High-throughput backends with Node.js, Express, Socket.io, and MongoDB/PostgreSQL.
                Clean code, modular architecture, and 60fps micro-animations.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--line)] flex flex-wrap gap-2 text-xs font-mono text-[var(--label-3)]">
              <span>REACT</span> · <span>NEXT.JS</span> · <span>NODE.JS</span> · <span>TYPESCRIPT</span> · <span>SOCKET.IO</span>
            </div>
          </div>

          {/* Pillar 02: AI & Prompt Engineering */}
          <div className="p-8 rounded-sm border border-[var(--line)] bg-[var(--background-elevated)] space-y-6 flex flex-col justify-between hover:border-[var(--accent)] transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-sm bg-[var(--background-1)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)]">
                <Brain size={20} />
              </div>

              <div className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase">
                INTELLIGENCE PILLAR 02
              </div>

              <h3 className="text-2xl font-bold uppercase tracking-tight text-[var(--label-1)]">
                AI & PROMPT ENGINEERING
              </h3>

              <p className="text-sm text-[var(--label-2)] leading-relaxed">
                Systematic prompt optimization, automated evaluation harnesses, and safety alignment.
                Proven experience boosting generative output relevance by 40% (Soul AI) and architecting educational AI tutors (Outlier AI).
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--line)] flex flex-wrap gap-2 text-xs font-mono text-[var(--label-3)]">
              <span>LLM EVALUATION</span> · <span>SAFETY ALIGNMENT</span> · <span>OPENAI APIS</span> · <span>CONTEXT OPTIMIZATION</span>
            </div>
          </div>
        </div>

        {/* Small Author Stamp / Signature Vignette */}
        <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-sm border border-[var(--line)] bg-[var(--background-1)]">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--accent)] shrink-0">
              <Image
                src="/images/cyber-portrait.jpg"
                alt="Ubaikab Shaikh"
                fill
                sizes="48px"
                className="object-cover object-top grayscale contrast-125"
              />
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-tight text-[var(--label-1)]">
                UBAIKAB SHAIKH
              </div>
              <div className="text-xs font-mono text-[var(--label-3)]">
                FULL STACK DEVELOPER · MUMBAI, INDIA
              </div>
            </div>
          </div>

          <div className="text-xs font-mono text-[var(--label-3)] tracking-widest uppercase flex items-center gap-2">
            <Terminal size={12} className="text-[var(--accent)]" />
            <span>CRAFTED WITH PRECISION & INTENTIONALITY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
