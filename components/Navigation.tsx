"use client";

import { useEffect, useRef, useCallback } from "react";
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

type Theme = "light" | "dark" | "system";

interface NavigationProps {
  visible: boolean;
  onNavigate: (sectionId: string) => void;
}

function applyTheme(t: Theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = t === "dark" || (t === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", isDark);
}

export default function Navigation({ visible, onNavigate }: NavigationProps) {
  const themeRef = useRef<Theme>("dark");
  const timeElRef = useRef<HTMLSpanElement>(null);
  const themeBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuOpenRef = useRef(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Live Clock
  useEffect(() => {
    const tick = () => {
      if (!timeElRef.current) return;
      const ist = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      timeElRef.current.textContent = `MUMBAI // IST ${ist}`;
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Theme Init
  useEffect(() => {
    try {
      const stored = (localStorage.getItem("theme") as Theme) || "dark";
      themeRef.current = stored;
      applyTheme(stored);
      updateThemeLabel(stored);
    } catch {
      /* no-op */
    }
  }, []);

  function updateThemeLabel(t: Theme) {
    const labels: Record<Theme, string> = { light: "LIGHT", dark: "DARK", system: "AUTO" };
    if (themeBtnRef.current) {
      themeBtnRef.current.textContent = `THEME[${labels[t]}]`;
    }
  }

  const cycleTheme = useCallback(() => {
    const next: Record<Theme, Theme> = { light: "dark", dark: "system", system: "light" };
    const nextTheme = next[themeRef.current];
    themeRef.current = nextTheme;
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      /* no-op */
    }
    applyTheme(nextTheme);
    updateThemeLabel(nextTheme);
  }, []);

  // Mobile Menu Handlers
  const openMenu = useCallback(() => {
    menuOpenRef.current = true;
    if (menuRef.current) {
      menuRef.current.style.transform = "translateX(0)";
      menuRef.current.style.opacity = "1";
      menuRef.current.setAttribute("aria-hidden", "false");
    }
    if (hamburgerRef.current) hamburgerRef.current.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }, []);

  const closeMenu = useCallback(() => {
    menuOpenRef.current = false;
    if (menuRef.current) {
      menuRef.current.style.transform = "translateX(100%)";
      menuRef.current.style.opacity = "0";
      menuRef.current.setAttribute("aria-hidden", "true");
    }
    if (hamburgerRef.current) hamburgerRef.current.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }, []);

  const handleMenuNavigate = useCallback(
    (id: string) => {
      closeMenu();
      setTimeout(() => onNavigate(id), 120);
    },
    [closeMenu, onNavigate]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpenRef.current) closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  return (
    <>
      <header
        aria-label="Site navigation"
        className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between text-[var(--label-1)] font-mono transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        {/* Top Navbar Row */}
        <div
          className="w-full pointer-events-auto flex justify-between items-center py-4 backdrop-blur-md bg-[var(--background-1)]/80 border-b border-[var(--line)] z-50"
          style={{
            paddingLeft: "var(--page-px)",
            paddingRight: "var(--page-px)",
          }}
        >
          {/* Brand Logo — Scrolls smoothly to top */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("hero");
            }}
            className="hover-dotted text-xs sm:text-sm font-bold font-display tracking-widest uppercase text-[var(--label-1)] cursor-pointer text-left py-2"
            data-cursor-label="TOP"
            aria-label="Scroll to top of page"
          >
            UBAIKAB<span className="text-[var(--accent)]">.</span>DEV
          </button>

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
            <NavBtn label="ABOUT" onClick={() => onNavigate("about")} />
            <NavBtn label="EXPERIENCE" onClick={() => onNavigate("experience")} />
            <NavBtn label="WORK" onClick={() => onNavigate("work")} />
            <NavBtn label="SKILLS" onClick={() => onNavigate("skills")} />
            <NavBtn label="EDUCATION" onClick={() => onNavigate("education")} />
            <NavBtn label="CONTACT" onClick={() => onNavigate("contact")} />

            <a
              href={PERSONAL_INFO.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-[0.68rem] font-mono uppercase tracking-wider text-black bg-[var(--accent)] hover:opacity-90 rounded-sm transition-opacity cursor-pointer"
            >
              RESUME
            </a>

            <button
              ref={themeBtnRef}
              type="button"
              onClick={cycleTheme}
              className="px-2.5 py-1 text-[0.68rem] tracking-wider uppercase text-[var(--label-2)] hover:text-[var(--label-1)] transition-colors border border-transparent hover:border-[var(--line)] rounded-sm cursor-pointer"
            >
              THEME[DARK]
            </button>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--label-2)] hover:text-[var(--label-1)] transition-colors"
              aria-label="GitHub profile"
              data-cursor-label="GITHUB"
            >
              <GitHubIcon size={14} />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--label-2)] hover:text-[var(--label-1)] transition-colors"
              aria-label="LinkedIn profile"
              data-cursor-label="LINKEDIN"
            >
              <LinkedInIcon size={14} />
            </a>
          </nav>

          {/* Mobile Hamburger Button (44px x 44px min touch target) */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-label="Open navigation menu"
            aria-expanded="false"
            onClick={openMenu}
            onTouchEnd={(e) => {
              e.preventDefault();
              openMenu();
            }}
            className="flex md:hidden w-11 h-11 items-center justify-center rounded-sm bg-[var(--background-elevated)] border border-[var(--line)] active:scale-95 transition-transform cursor-pointer"
            style={{ touchAction: "manipulation" }}
          >
            <div className="flex flex-col gap-1.5 w-5 pointer-events-none">
              <span className="w-5 h-0.5 bg-[var(--label-1)] rounded-full" />
              <span className="w-5 h-0.5 bg-[var(--label-1)] rounded-full" />
              <span className="w-3.5 h-0.5 bg-[var(--accent)] rounded-full self-end" />
            </div>
          </button>
        </div>

        {/* Bottom Ambient Row */}
        <div
          className="w-full flex justify-between items-end py-3 text-[0.68rem] font-mono tracking-wider uppercase text-[var(--label-3)] pointer-events-none"
          style={{
            paddingLeft: "var(--page-px)",
            paddingRight: "var(--page-px)",
          }}
        >
          <span ref={timeElRef}>MUMBAI // IST --:--:--</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[var(--label-2)] font-semibold">OPEN FOR ROLES</span>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer — outside the pointer-events-none header */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        aria-hidden="true"
        className="fixed inset-0 z-[9998] flex flex-col justify-between p-8"
        style={{
          background: "var(--background-1)",
          color: "var(--label-1)",
          transform: "translateX(100%)",
          opacity: 0,
          transition: "transform 0.45s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.45s ease",
          touchAction: "pan-y",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex justify-between items-center pb-6 border-b border-[var(--line)]">
          <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest font-bold">
            UBAIKAB SHAIKH // V2
          </span>
          <button
            type="button"
            onClick={closeMenu}
            onTouchEnd={(e) => { e.preventDefault(); closeMenu(); }}
            className="text-xs font-mono uppercase tracking-wider text-[var(--label-2)] hover:text-[var(--label-1)] p-2 cursor-pointer"
          >
            CLOSE ✕
          </button>
        </div>

        {/* Mobile Section Nav List */}
        <div className="space-y-4 my-auto">
          {[
            { label: "ABOUT", id: "about" },
            { label: "EXPERIENCE", id: "experience" },
            { label: "SELECTED WORK", id: "work" },
            { label: "SKILLS", id: "skills" },
            { label: "EDUCATION", id: "education" },
            { label: "CERTIFICATIONS", id: "certifications" },
            { label: "CONTACT", id: "contact" },
          ].map((item, idx) => (
            <div key={item.id} className="border-b border-[var(--line)] pb-3">
              <button
                type="button"
                onClick={() => handleMenuNavigate(item.id)}
                onTouchEnd={(e) => { e.preventDefault(); handleMenuNavigate(item.id); }}
                className="text-2xl sm:text-3xl font-bold font-display tracking-tight uppercase hover:text-[var(--accent)] transition-colors flex items-center justify-between w-full text-left cursor-pointer"
                style={{ color: "var(--label-1)" }}
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-[var(--accent)] font-bold">0{idx + 1}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Drawer Footer */}
        <div className="pt-6 border-t border-[var(--line)] flex flex-col gap-4">
          <a
            href={PERSONAL_INFO.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-3 text-sm font-mono font-bold uppercase tracking-wider bg-[var(--accent)] text-black rounded-sm"
          >
            DOWNLOAD RESUME
          </a>
          <div className="flex justify-between items-center text-xs font-mono" style={{ color: "var(--label-2)" }}>
            <button type="button" onClick={cycleTheme} className="uppercase text-[var(--accent)] font-semibold cursor-pointer">
              TOGGLE THEME
            </button>
            <span>{PERSONAL_INFO.email}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function NavBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1.5 text-[0.68rem] font-mono uppercase tracking-wider text-[var(--label-2)] hover:text-[var(--label-1)] hover:bg-[var(--background-elevated)] rounded-sm transition-all cursor-pointer"
    >
      {label}
    </button>
  );
}
