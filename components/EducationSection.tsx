"use client";

import { useEffect, useRef } from "react";
import { GraduationCap, Award, MapPin } from "lucide-react";
import { EDUCATION_LIST } from "@/lib/resume";

export default function EducationSection() {
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
      id="education"
      ref={sectionRef}
      aria-label="Academic Background"
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
            <GraduationCap size={12} />
            <span>ACADEMIC FOUNDATION // 05</span>
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight uppercase text-[var(--label-1)]">
            EDUCATION
          </h2>
        </div>

        <span className="text-[0.72rem] font-mono tracking-wider uppercase text-[var(--label-3)]">
          COMPUTER SCIENCE & SCIENCE STREAM
        </span>
      </div>

      {/* ─── Editorial Education Timeline Rows ───────────────── */}
      <div className="space-y-6">
        {EDUCATION_LIST.map((edu, idx) => (
          <div
            key={edu.id}
            className="p-6 sm:p-8 rounded-sm border border-[var(--line)] bg-[var(--background-elevated)] hover:border-[var(--label-3)] transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-4 items-center group"
          >
            {/* Period */}
            <div className="md:col-span-3">
              <div className="text-xs font-mono text-[var(--accent)] font-semibold mb-1">
                [{String(idx + 1).padStart(2, "0")}]
              </div>
              <div className="text-[clamp(1.1rem,1.8vw,1.4rem)] font-bold font-mono tracking-tight text-[var(--label-1)]">
                {edu.period}
              </div>
            </div>

            {/* Degree & Institution */}
            <div className="md:col-span-6 space-y-1">
              <h3 className="text-[clamp(1.1rem,1.8vw,1.35rem)] font-bold tracking-tight uppercase text-[var(--label-1)] group-hover:text-[var(--accent)] transition-colors">
                {edu.institution}
              </h3>
              <div className="text-sm text-[var(--label-2)] font-medium">
                {edu.degree}
              </div>
              <div className="text-xs font-mono text-[var(--label-3)] flex items-center gap-1">
                <MapPin size={11} />
                <span>{edu.location}</span>
              </div>
            </div>

            {/* Score / Grade Badge */}
            <div className="md:col-span-3 md:text-right flex md:flex-col justify-between items-center md:items-end gap-1 pt-2 md:pt-0 border-t md:border-t-0 border-[var(--line)]">
              <span className="text-[0.65rem] font-mono uppercase tracking-wider text-[var(--label-3)]">
                ACADEMIC SCORE
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--background-1)] border border-[var(--accent)] text-[var(--accent)] font-mono font-bold text-sm rounded-sm">
                <Award size={13} />
                {edu.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
