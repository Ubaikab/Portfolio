"use client";

import { useState, useRef, useEffect } from "react";
import { Layers, Terminal, Sparkles } from "lucide-react";
import { SKILL_CATEGORIES } from "@/lib/resume";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && headingRef.current) {
          headingRef.current.style.opacity = "1";
          headingRef.current.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-label="Technical Capabilities"
      className="w-full py-[var(--page-py-lg)]"
      style={{
        paddingLeft: "var(--page-px)",
        paddingRight: "var(--page-px)",
      }}
    >
      {/* ─── Header ─────────────────────────────────────────── */}
      <div
        ref={headingRef}
        className="flex flex-wrap justify-between items-end gap-4 pb-6 border-b border-[var(--line)] mb-12 opacity-0 translate-y-6 transition-all duration-700"
      >
        <div>
          <div className="text-[0.68rem] font-mono text-[var(--accent)] tracking-widest uppercase mb-1 flex items-center gap-1.5">
            <Terminal size={12} />
            <span>TECHNICAL EXPERTISE // 04</span>
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight uppercase text-[var(--label-1)]">
            SKILLS & CAPABILITIES
          </h2>
        </div>

        <span className="text-[0.72rem] font-mono tracking-wider uppercase text-[var(--label-3)]">
          FULL STACK + AI ECOSYSTEM
        </span>
      </div>

      {/* ─── Interactive 6-Category Grid & Detail System ─────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Category Selector */}
        <div className="lg:col-span-5 space-y-2">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isActive = activeCategory === idx;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-sm border transition-all duration-300 flex items-center justify-between group ${
                  isActive
                    ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-lg"
                    : "bg-[var(--background-elevated)] text-[var(--label-2)] border-[var(--line)] hover:border-[var(--label-3)] hover:text-[var(--label-1)]"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`text-xs font-mono font-bold ${isActive ? "text-black" : "text-[var(--accent)]"}`}>
                    [{cat.number}]
                  </span>
                  <span className="text-base sm:text-lg font-bold tracking-tight uppercase">
                    {cat.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[0.7rem] font-mono tracking-wider ${isActive ? "text-black/70" : "text-[var(--label-3)]"}`}>
                    {cat.skills.length} TECHS
                  </span>
                  <span className={`transition-transform duration-300 ${isActive ? "translate-x-1" : "group-hover:translate-x-0.5"}`}>
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Skills Visual Explorer Display */}
        <div className="lg:col-span-7 bg-[var(--background-elevated)] border border-[var(--line)] rounded-sm p-6 sm:p-10 min-h-[380px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[var(--line)] mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] tracking-widest uppercase">
                <Sparkles size={12} />
                <span>CATEGORY [{SKILL_CATEGORIES[activeCategory].number}]</span>
              </div>
              <span className="text-xs font-mono text-[var(--label-3)] uppercase tracking-wider">
                ACTIVE FOCUS
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-[var(--label-1)] mb-6">
              {SKILL_CATEGORIES[activeCategory].title}
            </h3>

            {/* Skills Tag Cloud */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {SKILL_CATEGORIES[activeCategory].skills.map((skill, sIdx) => (
                <div
                  key={skill}
                  style={{ animationDelay: `${sIdx * 30}ms` }}
                  className="px-3.5 py-2 rounded-sm border border-[var(--line)] bg-[var(--background-1)] text-xs sm:text-sm font-mono text-[var(--label-1)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 shadow-sm"
                >
                  <span className="text-[var(--accent)] mr-1.5">✦</span>
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[var(--line)] flex justify-between items-center text-[0.7rem] font-mono text-[var(--label-3)] tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <Layers size={12} className="text-[var(--accent)]" />
              INTEGRATED FULL-STACK & AI DEVELOPMENT WORKFLOW
            </span>
            <span>0{activeCategory + 1} / 06</span>
          </div>
        </div>
      </div>
    </section>
  );
}
