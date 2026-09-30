"use client";

import { useEffect, useRef } from "react";

interface LoaderProps {
  onComplete: () => void;
}

type Phase = "filling" | "done" | "exit";

export default function Loader({ onComplete }: LoaderProps) {
  const barRef     = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const rootRef    = useRef<HTMLDivElement>(null);
  const phaseRef   = useRef<Phase>("filling");

  useEffect(() => {
    const segments = [
      { target: 30, duration: 380 },
      { target: 62, duration: 320 },
      { target: 85, duration: 480 },
      { target: 100, duration: 380 },
    ];

    let currentVal = 0;
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];
    let rafId = 0;

    function animateTo(target: number, duration: number, onDone?: () => void) {
      const startVal = currentVal;
      const startTime = performance.now();

      function step(now: number) {
        const elapsed = now - startTime;
        const fraction = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - fraction, 3);
        const val = startVal + (target - startVal) * eased;
        currentVal = val;

        if (barRef.current)     barRef.current.style.width = `${val}%`;
        if (counterRef.current) counterRef.current.textContent = String(Math.round(val)).padStart(3, "0");

        if (fraction < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          onDone?.();
        }
      }

      rafId = requestAnimationFrame(step);
    }

    let cumulativeDelay = 0;
    segments.forEach((seg, i) => {
      const delay = cumulativeDelay;
      cumulativeDelay += seg.duration;

      const tid = setTimeout(() => {
        const isLast = i === segments.length - 1;
        animateTo(seg.target, seg.duration, isLast ? () => {
          phaseRef.current = "done";
          if (rootRef.current) {
            rootRef.current.style.opacity = "0";
          }
          const exitTid = setTimeout(() => {
            phaseRef.current = "exit";
            if (rootRef.current) {
              rootRef.current.style.display = "none";
            }
            onComplete();
          }, 600);
          timeoutIds.push(exitTid);
        } : undefined);
      }, delay);

      timeoutIds.push(tid);
    });

    return () => {
      timeoutIds.forEach(clearTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      role="progressbar"
      aria-label="Loading portfolio"
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-loader)" as unknown as number,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--background-1)",
        transition: "opacity 0.6s var(--ease-out-expo)",
      }}
    >
      {/* Brand mark */}
      <div style={{
        marginBottom: "2.5rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "var(--label-3)",
        fontWeight: 400,
      }}>
        UBAIKAB
      </div>

      {/* Progress pill */}
      <div style={{
        width: 140,
        height: 5,
        borderRadius: 999,
        background: "var(--label-4)",
        overflow: "hidden",
        position: "relative",
      }}>
        <div
          ref={barRef}
          style={{
            position: "absolute",
            insetBlock: 0,
            left: 0,
            borderRadius: 999,
            background: "var(--label-1)",
            width: "0%",
            willChange: "width",
          }}
        />
      </div>

      {/* Numeric counter */}
      <div style={{
        marginTop: "1rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        letterSpacing: "0.12em",
        color: "var(--label-3)",
        fontVariantNumeric: "tabular-nums",
      }}>
        <span ref={counterRef}>000</span>
      </div>

      {/* Accent dot */}
      <div style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "var(--accent)",
        marginTop: "2.5rem",
        animation: "cursor-pulse 1.5s ease-in-out infinite",
      }} aria-hidden="true" />
    </div>
  );
}
