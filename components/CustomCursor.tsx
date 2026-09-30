"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const animRef = useRef<number>(0);
  const stateRef = useRef({
    visible: false,
    hovering: false,
    clicking: false,
    label: "",
  });

  useEffect(() => {
    // Disable entirely on touch-primary devices & small screens
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
      ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth < 1024;
    if (isTouch) {
      document.documentElement.style.cursor = "auto";
      return;
    }

    const outer = outerRef.current;
    const inner = innerRef.current;
    const label = labelRef.current;
    if (!outer || !inner) return;

    // Hide native cursor globally
    document.documentElement.style.cursor = "none";

    let outerX = -200;
    let outerY = -200;
    const OUTER_EASE = 0.12;

    function raf() {
      const { x, y } = posRef.current;
      const { visible, hovering, clicking, label: cursorLabel } = stateRef.current;

      const innerX = x;
      const innerY = y;

      outerX += (x - outerX) * OUTER_EASE;
      outerY += (y - outerY) * OUTER_EASE;

      const isDark = document.documentElement.classList.contains("dark");
      const hasLabel = Boolean(cursorLabel);

      const outerSize = hasLabel ? 72 : hovering ? 44 : 28;
      const innerSize = clicking ? 3 : 5;

      if (inner) {
        inner.style.transform = `translate(${innerX}px,${innerY}px) translate(-50%,-50%)`;
        inner.style.width = `${innerSize}px`;
        inner.style.height = `${innerSize}px`;
        inner.style.background = hovering ? "var(--accent)" : isDark ? "#ffffff" : "#000000";
        inner.style.opacity = visible && !hasLabel ? "1" : "0";
      }

      if (outer) {
        outer.style.transform = `translate(${outerX}px,${outerY}px) translate(-50%,-50%)`;
        outer.style.width = `${outerSize}px`;
        outer.style.height = `${outerSize}px`;
        outer.style.borderColor = hasLabel || hovering ? "var(--accent)" : isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)";
        outer.style.backgroundColor = hasLabel
          ? isDark ? "rgba(192, 254, 4, 0.95)" : "rgba(0, 0, 0, 0.9)"
          : hovering
          ? "rgba(192, 254, 4, 0.15)"
          : "transparent";
        outer.style.opacity = visible ? (clicking ? "0.4" : "1") : "0";
      }

      if (label) {
        if (hasLabel && visible) {
          label.textContent = cursorLabel;
          label.style.opacity = "1";
          label.style.color = isDark ? "#000000" : "#ffffff";
        } else {
          label.style.opacity = "0";
        }
      }

      animRef.current = requestAnimationFrame(raf);
    }

    animRef.current = requestAnimationFrame(raf);

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      stateRef.current.visible = true;
    };
    const onLeave = () => {
      stateRef.current.visible = false;
    };
    const onEnter = () => {
      stateRef.current.visible = true;
    };
    const onDown = () => {
      stateRef.current.clicking = true;
    };
    const onUp = () => {
      stateRef.current.clicking = false;
    };

    const attachHovers = () => {
      document.querySelectorAll<HTMLElement>("a, button, [role='button'], [data-cursor], [data-cursor-label]").forEach((el) => {
        const customLabel = el.getAttribute("data-cursor-label") || "";
        el.onmouseenter = () => {
          stateRef.current.hovering = true;
          stateRef.current.label = customLabel;
        };
        el.onmouseleave = () => {
          stateRef.current.hovering = false;
          stateRef.current.label = "";
        };
      });
    };
    attachHovers();

    const mutObs = new MutationObserver(attachHovers);
    mutObs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(animRef.current);
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      mutObs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Outer Follower Circle */}
      <div
        ref={outerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderWidth: "1.5px",
          borderStyle: "solid",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          willChange: "transform, width, height",
          transition: "width 0.25s var(--ease-out-expo), height 0.25s var(--ease-out-expo), border-color 0.2s ease, background-color 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0,
            transition: "opacity 0.15s ease",
            textAlign: "center",
            lineHeight: 1,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Inner Dot Indicator */}
      <div
        ref={innerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          willChange: "transform",
          transition: "width 0.15s ease, height 0.15s ease, background-color 0.15s ease",
        }}
      />
    </>
  );
}
