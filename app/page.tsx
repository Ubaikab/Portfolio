"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import WorkSection from "@/components/WorkSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ManifestoSection from "@/components/ManifestoSection";
import FooterSection from "@/components/FooterSection";

// Lazy-load client-only heavy components
const WebGLBackground = dynamic(() => import("@/components/WebGLBackground"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<import("lenis").default | null>(null);

  /* ─── Initialize Lenis Smooth Scroll ───────────────────────── */
  useEffect(() => {
    let lenis: import("lenis").default | null = null;
    let rafId = 0;

    async function initLenis() {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { default: Lenis } = await import("lenis");
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      lenis = new Lenis({
        wrapper: container,
        content: container.firstElementChild as HTMLElement,
        lerp: prefersReduced ? 1 : 0.085,
        smoothWheel: !prefersReduced,
        touchMultiplier: 1.5,
        infinite: false,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis?.destroy();
      };
    }

    const cleanup = initLenis();

    return () => {
      cancelAnimationFrame(rafId);
      cleanup.then((fn) => fn?.());
    };
  }, []);

  /* ─── Smooth Navigation Scroll Helper ──────────────────────── */
  const handleNavigate = useCallback((sectionId: string) => {
    if (sectionId === "hero") {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const target = document.getElementById(sectionId);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: 0,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* ─── Accessibility Skip Link ──────────────────────────── */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* ─── WebGL Ambient Reactive Background ────────────────── */}
      <WebGLBackground />

      {/* ─── Custom Responsive Cursor ─────────────────────────── */}
      <CustomCursor />

      {/* ─── Minimalist Preloader ─────────────────────────────── */}
      <Loader onComplete={handleLoaderComplete} />

      {/* ─── Fixed Header & Mobile Navigation ─────────────────── */}
      <Navigation visible={loaded} onNavigate={handleNavigate} />

      {/* ─── Main Scroll Viewport Container ───────────────────── */}
      <div ref={scrollContainerRef} className="scroll-container">
        <main id="main-content">
          {/* 01: Hero with Interactive Portrait */}
          <HeroSection visible={loaded} />

          {/* Technology Marquee */}
          <SkillsMarquee />

          {/* 02: Editorial Background & Verified Identity */}
          <div className="border-t border-[var(--line)]">
            <AboutSection />
          </div>

          {/* 03: Career Timeline (ModelSuite AI, Soul AI, Outlier AI) */}
          <div className="border-t border-[var(--line)]">
            <ExperienceSection />
          </div>

          {/* 04: Featured Shipped Projects (Crown Construction, Botilla) */}
          <div className="border-t border-[var(--line)]">
            <WorkSection />
          </div>

          {/* 05: Interactive Skills Explorer (6 Categories) */}
          <div className="border-t border-[var(--line)]">
            <SkillsSection />
          </div>

          {/* 06: Academic Foundation (BSc CS 8.58 CGPA, etc.) */}
          <div className="border-t border-[var(--line)]">
            <EducationSection />
          </div>

          {/* 07: Verified Certifications & Languages */}
          <div className="border-t border-[var(--line)]">
            <CertificationsSection />
          </div>

          {/* 08: Dual-Core AI & Full Stack Positioning Manifesto */}
          <div className="border-t border-[var(--line)]">
            <ManifestoSection />
          </div>

          {/* 09: Editorial Footer & Magnetic Contact */}
          <FooterSection />
        </main>
      </div>
    </>
  );
}
