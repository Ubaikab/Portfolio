"use client";

import { useEffect, useRef } from "react";
import { User, Terminal, Sparkles } from "lucide-react";

function SignatureSVG() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paths = svg.querySelectorAll<SVGPathElement>(".svg-sign__path");

    if (prefersReduced) {
      paths.forEach((p) => {
        p.style.opacity = "1";
        p.style.strokeDashoffset = "0";
      });
      return;
    }

    paths.forEach((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          svg.classList.add("is-drawing");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 280 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="svg-sign"
      style={{ width: "100%", maxWidth: 260, height: "auto" }}
      aria-label="Ubaikab Shaikh — signature"
      role="img"
    >
      <path
        className="svg-sign__path"
        d="M10 15 L10 65 Q10 85 30 85 Q50 85 50 65 L50 15"
        stroke="var(--accent)"
        strokeWidth="3.5"
        style={{ "--path-delay": "0s", "--path-dur": "0.7s" } as React.CSSProperties}
      />
      <path
        className="svg-sign__path"
        d="M65 10 L65 85 M65 50 Q65 35 80 35 Q95 35 95 52 Q95 70 80 70 Q65 70 65 70"
        stroke="var(--accent)"
        strokeWidth="3.5"
        style={{ "--path-delay": "0.5s", "--path-dur": "0.8s" } as React.CSSProperties}
      />
      <path
        className="svg-sign__path"
        d="M110 45 Q110 35 122 35 Q135 35 135 45 L135 70 M135 55 Q135 70 120 70 Q108 70 108 58 Q108 45 122 45 Q135 45 135 45"
        stroke="var(--accent)"
        strokeWidth="3.5"
        style={{ "--path-delay": "1.1s", "--path-dur": "0.8s" } as React.CSSProperties}
      />
      <path
        className="svg-sign__path"
        d="M150 28 L150 29"
        stroke="var(--accent)"
        strokeWidth="5"
        strokeLinecap="round"
        style={{ "--path-delay": "1.7s", "--path-dur": "0.2s" } as React.CSSProperties}
      />
      <path
        className="svg-sign__path"
        d="M150 38 L150 70"
        stroke="var(--accent)"
        strokeWidth="3.5"
        style={{ "--path-delay": "1.9s", "--path-dur": "0.4s" } as React.CSSProperties}
      />
      <path
        className="svg-sign__path"
        d="M165 10 L165 70 M165 52 L185 35 M172 47 L190 70"
        stroke="var(--accent)"
        strokeWidth="3.5"
        style={{ "--path-delay": "2.2s", "--path-dur": "0.7s" } as React.CSSProperties}
      />
      <path
        className="svg-sign__path"
        d="M205 45 Q205 35 217 35 Q230 35 230 45 L230 70 M230 55 Q230 70 215 70 Q203 70 203 58 Q203 45 217 45 Q230 45 230 45"
        stroke="var(--accent)"
        strokeWidth="3.5"
        style={{ "--path-delay": "2.8s", "--path-dur": "0.8s" } as React.CSSProperties}
      />
      <path
        className="svg-sign__path"
        d="M245 10 L245 85 M245 50 Q245 35 260 35 Q275 35 275 52 Q275 70 260 70 Q245 70 245 70"
        stroke="var(--accent)"
        strokeWidth="3.5"
        style={{ "--path-delay": "3.4s", "--path-dur": "0.8s" } as React.CSSProperties}
      />
    </svg>
  );
}

function StatItem({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="border-t border-[var(--line)] pt-4 pb-2 flex justify-between items-baseline gap-4">
      <span className="font-mono text-xs tracking-wider uppercase text-[var(--label-3)]">
        {label}
      </span>
      <span
        className={`font-display font-bold text-[clamp(1.3rem,2.5vw,1.75rem)] tracking-tight ${
          highlight ? "text-[var(--accent)]" : "text-[var(--label-1)]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (leftRef.current) {
            leftRef.current.style.opacity = "1";
            leftRef.current.style.transform = "translateY(0)";
          }
          setTimeout(() => {
            if (rightRef.current) {
              rightRef.current.style.opacity = "1";
              rightRef.current.style.transform = "translateY(0)";
            }
          }, 120);
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
      id="about"
      ref={sectionRef}
      aria-label="About Ubaikab Shaikh"
      className="w-full py-[var(--page-py-lg)]"
      style={{
        paddingLeft: "var(--page-px)",
        paddingRight: "var(--page-px)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Signature & Key Metrics */}
        <div
          ref={leftRef}
          className="lg:col-span-5 space-y-6 opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="text-[0.68rem] font-mono text-[var(--accent)] tracking-widest uppercase flex items-center gap-1.5">
            <User size={12} />
            <span>BACKGROUND & IDENTITY // 01</span>
          </div>

          <div className="relative p-6 border border-[var(--line)] bg-[var(--background-elevated)] rounded-sm">
            <SignatureSVG />
            <span className="absolute top-3 right-3 font-mono text-[0.6rem] tracking-widest uppercase bg-[var(--accent)] text-black px-2 py-0.5 font-bold rounded-sm">
              VERIFIED IDENTITY
            </span>
          </div>

          <div className="space-y-1">
            <StatItem label="Current Role" value="Full Stack Developer" highlight />
            <StatItem label="Academic GPA" value="8.58 CGPA" highlight />
            <StatItem label="Base Location" value="Mumbai, India" />
          </div>
        </div>

        {/* Right Column: Editorial Narrative */}
        <div
          ref={rightRef}
          className="lg:col-span-7 space-y-6 opacity-0 translate-y-8 transition-all duration-700"
        >
          <h2 className="text-[clamp(1.75rem,3.5vw,2.8rem)] font-bold tracking-tight uppercase leading-tight text-[var(--label-1)]">
            I BUILD RESPONSIVE, USER-FOCUSED WEB APPLICATIONS WITH SCALABLE ARCHITECTURES & INTELLIGENT AI WORKFLOWS.
          </h2>

          <p className="text-[clamp(0.95rem,1.4vw,1.1rem)] text-[var(--label-2)] leading-relaxed font-normal">
            I am a dedicated <strong>Full Stack Developer</strong> based in <strong>Mumbai, India</strong> with deep expertise across modern frontend ecosystems (React, Next.js, TypeScript, Tailwind CSS, GSAP) and robust backend engines (Node.js, Express, Python, Java, C++, Socket.io, MongoDB, PostgreSQL).
          </p>

          <p className="text-[clamp(0.95rem,1.4vw,1.1rem)] text-[var(--label-2)] leading-relaxed font-normal">
            Alongside full-stack engineering, I specialize in <strong>AI Prompt Engineering</strong> and LLM evaluation—having developed data-aware prompt strategies at <strong>Soul AI</strong> (boosting output relevance by 40%) and <strong>Outlier AI</strong>. I bridge the gap between creative frontend design, distributed backend architecture, and generative intelligence.
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[var(--line)]">
            <div className="p-4 rounded-sm border border-[var(--line)] bg-[var(--background-elevated)]">
              <div className="text-xs font-mono text-[var(--accent)] font-semibold uppercase mb-1 flex items-center gap-1.5">
                <Terminal size={11} />
                <span>SECURE & OPTIMIZED</span>
              </div>
              <div className="text-xs text-[var(--label-2)] leading-relaxed">
                JWT authentication, Arcjet rate limiting, Redis caching, and real-time Socket.io channels.
              </div>
            </div>

            <div className="p-4 rounded-sm border border-[var(--line)] bg-[var(--background-elevated)]">
              <div className="text-xs font-mono text-[var(--accent)] font-semibold uppercase mb-1 flex items-center gap-1.5">
                <Sparkles size={11} />
                <span>AI INTEGRATION</span>
              </div>
              <div className="text-xs text-[var(--label-2)] leading-relaxed">
                OpenAI API pipelines, context engineering, automated benchmarks, and safety evaluation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
