"use client";

import { useEffect, useRef } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, Globe } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/resume";

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (ctaRef.current) {
            ctaRef.current.style.opacity = "1";
            ctaRef.current.style.transform = "translateY(0)";
          }
          if (infoRef.current) {
            infoRef.current.style.opacity = "1";
            infoRef.current.style.transform = "translateY(0)";
          }
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      aria-label="Contact Ubaikab Shaikh"
      className="w-full min-h-[90dvh] flex flex-col justify-between py-[var(--page-py-lg)] border-t border-[var(--line)]"
      style={{
        paddingLeft: "var(--page-px)",
        paddingRight: "var(--page-px)",
      }}
    >
      {/* ─── Top Call to Action ───────────────────────────────── */}
      <div
        ref={ctaRef}
        className="my-auto py-12 space-y-6 opacity-0 translate-y-12 transition-all duration-1000"
      >
        <div className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase">
          INITIATE COLLABORATION // 08
        </div>

        <h2 className="text-[clamp(2.8rem,8vw,8.5rem)] font-bold tracking-[-0.035em] leading-[0.92] uppercase text-[var(--label-1)] select-none">
          LET&#39;S BUILD
          <br />
          <span className="text-[var(--label-2)]">SOMETHING</span>
          <br />
          EXTRAORDINARY<span className="text-[var(--accent)]">.</span>
        </h2>

        <p className="text-[clamp(1rem,1.8vw,1.25rem)] text-[var(--label-2)] max-w-2xl leading-relaxed pt-2">
          Open to full-time engineering roles, high-impact freelance projects, and creative digital collaborations.
        </p>

        {/* Primary Contact Action Button */}
        <div className="pt-6 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            data-cursor-label="EMAIL"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-black font-mono font-bold text-sm uppercase tracking-wider rounded-sm shadow-xl hover:scale-105 transition-transform"
          >
            <Mail size={16} />
            <span>START A CONVERSATION</span>
            <ArrowUpRight size={16} />
          </a>

          <a
            href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-2.5 px-6 py-4 border border-[var(--line)] bg-[var(--background-elevated)] text-[var(--label-1)] font-mono text-sm uppercase tracking-wider rounded-sm hover:border-[var(--accent)] transition-colors"
          >
            <Phone size={14} className="text-[var(--accent)]" />
            <span>{PERSONAL_INFO.phone}</span>
          </a>

          <a
            href={PERSONAL_INFO.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-4 border border-[var(--accent)] text-[var(--accent)] font-mono text-sm uppercase tracking-wider rounded-sm hover:bg-[var(--accent)] hover:text-black transition-all"
          >
            <ArrowUpRight size={14} />
            <span>DOWNLOAD RESUME</span>
          </a>
        </div>
      </div>

      {/* ─── Bottom Meta & Social Grid ────────────────────────── */}
      <div
        ref={infoRef}
        className="pt-12 border-t border-[var(--line)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-xs font-mono tracking-wider uppercase opacity-0 translate-y-6 transition-all duration-700"
      >
        {/* Author Location Info */}
        <div className="md:col-span-5 space-y-1">
          <div className="text-[var(--label-1)] font-bold text-sm">
            {PERSONAL_INFO.displayName}
          </div>
          <div className="text-[var(--label-3)] flex items-center gap-1.5">
            <MapPin size={12} className="text-[var(--accent)]" />
            <span>{PERSONAL_INFO.location} · {PERSONAL_INFO.role}</span>
          </div>
        </div>

        {/* Direct Links */}
        <div className="md:col-span-4 flex flex-wrap gap-6 text-[var(--label-2)]">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-label="GITHUB"
            className="hover:text-[var(--label-1)] flex items-center gap-1.5 transition-colors"
          >
            <GitHubIcon size={14} />
            <span>GITHUB</span>
            <ArrowUpRight size={11} />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-label="LINKEDIN"
            className="hover:text-[var(--label-1)] flex items-center gap-1.5 transition-colors"
          >
            <LinkedInIcon size={14} />
            <span>LINKEDIN</span>
            <ArrowUpRight size={11} />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-[var(--label-1)] flex items-center gap-1.5 transition-colors"
          >
            <Mail size={14} />
            <span>{PERSONAL_INFO.email}</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="md:col-span-3 md:text-right text-[var(--label-3)] flex md:flex-col justify-between items-center md:items-end gap-1">
          <span className="flex items-center gap-1">
            <Globe size={11} />
            ALL RIGHTS RESERVED
          </span>
          <span className="text-[var(--label-2)]">{PERSONAL_INFO.year} UBAIKAB SHAIKH</span>
        </div>
      </div>
    </footer>
  );
}
