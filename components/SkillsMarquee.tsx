"use client";

import { useRef, useEffect } from "react";

const SKILLS = [
  "REACT.JS",
  "NEXT.JS",
  "TYPESCRIPT",
  "NODE.JS",
  "EXPRESS.JS",
  "PYTHON",
  "JAVA",
  "C++",
  "SOCKET.IO",
  "MONGODB",
  "POSTGRESQL",
  "REDIS",
  "TAILWIND CSS",
  "GSAP",
  "FRAMER MOTION",
  "AI PROMPT ENGINEERING",
  "OPENAI APIS",
  "LLM BENCHMARKING",
  "ARCJET",
  "RESEND",
  "CLOUDINARY",
  "DOCKER",
  "REST APIS",
  "WEBGL",
];

export default function SkillsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const xRef = useRef(0);
  const speedRef = useRef(0.4);
  const pausedRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const track = trackRef.current;
    if (!track) return;

    let halfWidth = 0;
    function measure() {
      halfWidth = track ? track.scrollWidth / 2 : 0;
    }

    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    requestAnimationFrame(measure);

    function animate() {
      if (!pausedRef.current) {
        xRef.current -= speedRef.current;
        if (halfWidth > 0 && Math.abs(xRef.current) >= halfWidth) {
          xRef.current = 0;
        }
        if (track) {
          track.style.transform = `translateX(${xRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  const doubled = [...SKILLS, ...SKILLS];

  return (
    <section
      aria-label="Core Technology Flow"
      className="w-full py-4 overflow-hidden border-y border-[var(--line)] bg-[var(--background-elevated)]/50"
    >
      <div
        ref={trackRef}
        onMouseEnter={() => {
          speedRef.current = 0.1;
        }}
        onMouseLeave={() => {
          speedRef.current = 0.4;
        }}
        className="flex gap-0 will-change-transform select-none"
        aria-hidden="true"
      >
        {doubled.map((skill, i) => (
          <div key={`${skill}-${i}`} className="flex items-center gap-0 shrink-0">
            <span
              className={`font-mono text-xs sm:text-sm tracking-widest uppercase px-6 sm:px-8 whitespace-nowrap transition-colors ${
                i % 3 === 0
                  ? "text-[var(--accent)] font-bold"
                  : i % 2 === 0
                  ? "text-[var(--label-1)]"
                  : "text-[var(--label-3)]"
              }`}
            >
              {skill}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 inline-block" />
          </div>
        ))}
      </div>

      <ul className="sr-only">
        {SKILLS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  );
}
