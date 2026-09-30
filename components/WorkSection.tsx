"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Code, ExternalLink, GitFork, Sparkles } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/resume";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const isGithubOnly = project.liveUrl.includes("github.com");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), index * 120);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative border border-[var(--line)] bg-[var(--background-elevated)] rounded-sm overflow-hidden p-6 sm:p-10 transition-all duration-700 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Project Visual Display */}
        <div className="lg:col-span-7 relative w-full aspect-[16/10] overflow-hidden rounded-sm bg-black/40 border border-white/5 order-1">
          {/* Category Tag */}
          <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
            <span className="px-2.5 py-1 text-[0.62rem] font-mono font-bold tracking-widest uppercase bg-[var(--accent)] text-black rounded-sm shadow-md">
              PROJECT // {project.number}
            </span>
            <span className="hidden sm:inline-block px-2.5 py-1 text-[0.62rem] font-mono tracking-wider uppercase bg-black/70 text-white/80 backdrop-blur-sm rounded-sm border border-white/10">
              {project.year}
            </span>
          </div>

          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority={index === 0}
            className={`object-cover object-top transition-transform duration-700 ease-out ${
              hovered ? "scale-105" : "scale-100"
            }`}
          />

          {/* Dark gradient overlay for typography readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Quick Action Button Overlay */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-label={isGithubOnly ? "REPO" : "LAUNCH"}
            aria-label={isGithubOnly ? `View GitHub repo for ${project.title}` : `Open live site for ${project.title}`}
            className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-4 py-2 text-[0.72rem] font-mono font-bold uppercase tracking-wider bg-[var(--accent)] text-black rounded-sm shadow-lg hover:scale-105 transition-transform"
          >
            <span>{isGithubOnly ? "VIEW ON GITHUB" : "LIVE PREVIEW"}</span>
            {isGithubOnly ? <GitFork size={14} /> : <ArrowUpRight size={14} />}
          </a>
        </div>

        {/* Project Context & Details */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 order-2">
          <div>
            <div className="text-[0.65rem] font-mono tracking-widest text-[var(--accent)] uppercase mb-2 flex items-center gap-1.5">
              <Sparkles size={11} />
              <span>{project.category}</span>
            </div>

            <h3 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold tracking-tight uppercase text-[var(--label-1)] group-hover:text-[var(--accent)] transition-colors duration-200">
              <a
                href={project.githubUrl || project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="VIEW"
                className="hover:underline"
              >
                {project.title}
              </a>
            </h3>

            <p className="text-[0.72rem] font-mono text-[var(--label-3)] tracking-wider uppercase mt-1 mb-4">
              {project.tagline}
            </p>

            <p className="text-[clamp(0.88rem,1.2vw,0.98rem)] text-[var(--label-2)] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Feature Highlights */}
          <div className="space-y-2 pt-2">
            <div className="text-[0.68rem] font-mono tracking-wider uppercase text-[var(--label-3)]">
              KEY HIGHLIGHTS
            </div>
            <ul className="space-y-1.5 text-xs text-[var(--label-2)]">
              {project.features.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-0.5">✦</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Chips */}
          <div className="space-y-2 pt-2 border-t border-[var(--line)]">
            <div className="text-[0.68rem] font-mono tracking-wider uppercase text-[var(--label-3)]">
              TECHNOLOGIES
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-wider bg-[var(--background-1)] border border-[var(--line)] text-[var(--label-2)] rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links Row */}
          <div className="flex items-center gap-4 pt-2">
            {!isGithubOnly && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[0.78rem] font-mono tracking-wider uppercase text-[var(--accent)] font-semibold hover:underline"
              >
                <ExternalLink size={14} />
                <span>VISIT LIVE APP ({project.liveUrl.replace("https://", "")})</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-[0.78rem] font-mono tracking-wider uppercase transition-colors ${
                  isGithubOnly
                    ? "text-[var(--accent)] font-semibold hover:underline"
                    : "text-[var(--label-3)] hover:text-[var(--label-1)]"
                }`}
              >
                <GitFork size={13} />
                <span>{isGithubOnly ? `VIEW REPO (${project.githubUrl.replace("https://github.com/", "")})` : "GITHUB REPO"}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WorkSection() {
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-label="Selected Projects"
      className="w-full py-[var(--page-py-lg)]"
      style={{
        paddingLeft: "var(--page-px)",
        paddingRight: "var(--page-px)",
      }}
    >
      {/* ─── Section Heading ─────────────────────────────────── */}
      <div
        ref={headingRef}
        className="flex flex-wrap justify-between items-end gap-4 pb-6 border-b border-[var(--line)] mb-12 opacity-0 translate-y-6 transition-all duration-700"
      >
        <div>
          <div className="text-[0.68rem] font-mono text-[var(--accent)] tracking-widest uppercase mb-1">
            FEATURED SHIPPED WORK // 03
          </div>
          <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight uppercase text-[var(--label-1)]">
            SELECTED PROJECTS
          </h2>
        </div>

        <span className="text-[0.72rem] font-mono tracking-wider uppercase text-[var(--label-3)]">
          {PROJECTS.length} PRODUCTION DEPLOYMENTS
        </span>
      </div>

      {/* ─── Projects Stack ──────────────────────────────────── */}
      <div className="space-y-12 sm:space-y-16">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
