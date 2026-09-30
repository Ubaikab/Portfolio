"use client";

import { useEffect, useRef } from "react";
import { Award, CheckCircle2, ShieldCheck } from "lucide-react";
import { CERTIFICATIONS_LIST, LANGUAGES } from "@/lib/resume";

export default function CertificationsSection() {
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
      id="certifications"
      ref={sectionRef}
      aria-label="Certifications and Accreditations"
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
            <Award size={12} />
            <span>ACCREDITATIONS & LANGUAGES // 06</span>
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight uppercase text-[var(--label-1)]">
            CERTIFICATIONS
          </h2>
        </div>

        <span className="text-[0.72rem] font-mono tracking-wider uppercase text-[var(--label-3)]">
          {CERTIFICATIONS_LIST.length} VERIFIED CREDENTIALS
        </span>
      </div>

      {/* ─── Certifications Grid ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {CERTIFICATIONS_LIST.map((cert, i) => (
          <div
            key={cert.id}
            className="p-6 rounded-sm border border-[var(--line)] bg-[var(--background-elevated)] hover:border-[var(--accent)] transition-all duration-300 flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[0.65rem] font-mono text-[var(--accent)] font-semibold tracking-wider">
                  CERT // {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-[var(--label-3)] bg-[var(--background-1)] px-2 py-0.5 rounded-sm border border-[var(--line)]">
                  {cert.type}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold tracking-tight uppercase text-[var(--label-1)] group-hover:text-[var(--accent)] transition-colors mb-2">
                {cert.title}
              </h3>
            </div>

            <div className="pt-4 border-t border-[var(--line)] mt-4 flex items-center justify-between text-xs font-mono text-[var(--label-2)]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[var(--accent)]" />
                {cert.issuer}
              </span>
              <ShieldCheck size={14} className="text-[var(--label-3)]" />
            </div>
          </div>
        ))}
      </div>

      {/* ─── Languages Minimal Strip ─────────────────────────── */}
      <div className="mt-12 p-6 rounded-sm border border-[var(--line)] bg-[var(--background-elevated)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold uppercase text-[var(--accent)]">
            LANGUAGES SPOKEN:
          </span>
          <div className="flex flex-wrap gap-4 text-xs font-mono text-[var(--label-1)]">
            {LANGUAGES.map((lang) => (
              <span key={lang.name} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <strong>{lang.name}</strong> ({lang.level})
              </span>
            ))}
          </div>
        </div>

        <div className="text-[0.68rem] font-mono uppercase tracking-wider text-[var(--label-3)]">
          GLOBAL / REGIONAL COMMUNICATION
        </div>
      </div>
    </section>
  );
}
