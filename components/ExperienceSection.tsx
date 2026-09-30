"use client";

import { useEffect, useRef } from "react";
import { Briefcase, Calendar, MapPin, Sparkles } from "lucide-react";
import { EXPERIENCES } from "@/lib/resume";

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (headingRef.current) {
            headingRef.current.style.opacity = "1";
            headingRef.current.style.transform = "translateY(0)";
          }

          itemsRef.current.forEach((el, index) => {
            if (!el) return;
            if (prefersReduced) {
              el.style.opacity = "1";
              el.style.transform = "none";
            } else {
              setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }, 150 + index * 120);
            }
          });

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
      id="experience"
      ref={sectionRef}
      aria-label="Professional Experience"
      className="w-full py-[var(--page-py-lg)]"
      style={{
        paddingLeft: "var(--page-px)",
        paddingRight: "var(--page-px)",
      }}
    >
      {/* ─── Section Header ────────────────────────────────────── */}
      <div
        ref={headingRef}
        className="flex flex-wrap justify-between items-end gap-4 pb-6 border-b border-[var(--line)] mb-12 opacity-0 translate-y-6 transition-all duration-700"
      >
        <div>
          <div className="text-[0.68rem] font-mono text-[var(--accent)] tracking-widest uppercase mb-1 flex items-center gap-1.5">
            <Briefcase size={12} />
            <span>CAREER TIMELINE // 02</span>
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight uppercase text-[var(--label-1)]">
            PROFESSIONAL EXPERIENCE
          </h2>
        </div>

        <span className="text-[0.72rem] font-mono tracking-wider uppercase text-[var(--label-3)]">
          {EXPERIENCES.length} STATIONS & COLLABORATIONS
        </span>
      </div>

      {/* ─── Timeline Items ────────────────────────────────────── */}
      <div className="relative border-l border-[var(--line)] ml-3 sm:ml-4 pl-6 sm:pl-10 space-y-12 sm:space-y-16">
        {EXPERIENCES.map((exp, index) => (
          <div
            key={exp.id}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="relative group transition-all duration-700 opacity-0 translate-y-8"
          >
            {/* Timeline Node Icon */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--background-1)] bg-[var(--accent)] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_var(--accent)]" />

            <div className="bg-[var(--background-elevated)] border border-[var(--line)] group-hover:border-[var(--label-3)] p-6 sm:p-8 rounded-sm transition-all duration-300">
              {/* Header Info */}
              <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs font-mono text-[var(--accent)] font-semibold">
                      [{exp.number}]
                    </span>
                    <h3 className="text-[clamp(1.2rem,2.2vw,1.6rem)] font-bold tracking-tight uppercase text-[var(--label-1)]">
                      {exp.company}
                    </h3>

                    {exp.badge && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[0.62rem] font-mono uppercase tracking-wider rounded bg-[var(--accent)] text-black font-bold">
                        <Sparkles size={10} />
                        {exp.badge}
                      </span>
                    )}
                  </div>

                  <div className="text-[clamp(0.9rem,1.4vw,1.1rem)] font-medium text-[var(--label-2)] mt-1">
                    {exp.role}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end text-[0.7rem] font-mono text-[var(--label-3)] gap-1">
                  <span className="flex items-center gap-1.5 text-[var(--label-2)]">
                    <Calendar size={12} className="text-[var(--accent)]" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Responsibilities */}
              <ul className="space-y-2.5 text-[0.88rem] sm:text-[0.95rem] text-[var(--label-2)] leading-relaxed my-5">
                {exp.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2.5">
                    <span className="text-[var(--accent)] mt-1.5 text-xs">▹</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--line)]">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-[0.65rem] font-mono tracking-wider uppercase rounded-sm border border-[var(--line)] text-[var(--label-3)] bg-[var(--background-1)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
