"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AnimatedContent from "./AnimatedContent";

type RotatingTitleProps = {
  className?: string;
  maxLines?: number;
};

const MESSAGES = [
  "Construction Due Diligence With AI",
  "The AI CoPilot To Plan, Budget, Build Your Next Project!",
  "Ask Anything...",
  "Upload Your Files or Let Your AI Create Them For You",
  "Convert Your Proforma Into A Project On Our Marketplace, Publish It And Find Investors!",
];

export default function RotatingTitle({
  className = "",
  maxLines,
}: RotatingTitleProps) {
  const [index, setIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [fittedFontSize, setFittedFontSize] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<number | null>(null);

  // Unified timings (seconds)
  const IN_S = 0.6;
  const HOLD_S = 2.0;
  const OUT_S = 0.6;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % MESSAGES.length);
  }, []);

  const key = useMemo(() => `title-${index}`, [index]);
  const text = useMemo(() => MESSAGES[index], [index]);

  // Measure the tallest message for the current container width
  useEffect(() => {
    const compute = () => {
      const container = containerRef.current;
      const measurer = measureRef.current;
      if (!container || !measurer) return;

      // Set measurer width to container's current width
      measurer.style.width = `${container.clientWidth}px`;

      // If maxLines provided, auto-fit the font size so text fits within maxLines.
      if (maxLines) {
        // Get current computed styles
        measurer.textContent = "A";
        measurer.style.fontSize = "";
        const computed = window.getComputedStyle(measurer);
        const baseFontSize = parseFloat(computed.fontSize || "24");

        // Measure the single line height at current settings to derive clamp height
        const singleLineHeight =
          measurer.offsetHeight ||
          parseFloat(computed.lineHeight || "0") ||
          baseFontSize * 1.2;
        const clampHeight = singleLineHeight * maxLines;

        // Binary search the largest font-size that fits the current message within clamp height
        const fitForText = (msg: string) => {
          let low = Math.max(10, baseFontSize * 0.5);
          let high = baseFontSize;
          for (let i = 0; i < 12; i++) {
            const mid = (low + high) / 2;
            measurer.style.fontSize = `${mid}px`;
            measurer.textContent = msg;
            const h = measurer.scrollHeight;
            if (h <= clampHeight + 0.5) {
              low = mid; // fits, try bigger
            } else {
              high = mid; // too big
            }
          }
          return Math.floor(low);
        };

        const sizeForCurrent = fitForText(MESSAGES[index]);
        setFittedFontSize(sizeForCurrent);
        setContainerHeight(clampHeight);
        return;
      }

      // Default behavior: lock to tallest message height
      let maxH = 0;
      for (const msg of MESSAGES) {
        measurer.textContent = msg;
        const h = measurer.offsetHeight;
        if (h > maxH) maxH = h;
      }
      setContainerHeight(maxH);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [index, maxLines]);

  // Drive the cycle with a timer so every message advances reliably
  useEffect(() => {
    const total = (IN_S + HOLD_S + OUT_S) * 1000;
    if (cycleRef.current) {
      window.clearTimeout(cycleRef.current);
    }
    cycleRef.current = window.setTimeout(() => {
      next();
    }, total);
    return () => {
      if (cycleRef.current) {
        window.clearTimeout(cycleRef.current);
        cycleRef.current = null;
      }
    };
  }, [index, next]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={containerHeight ? { height: containerHeight } : undefined}
    >
      <AnimatedContent
        key={key}
        className="inline-block"
        distance={28}
        duration={IN_S}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        threshold={0.2}
        disappearAfter={HOLD_S}
        disappearDuration={OUT_S}
        disappearEase="power3.inOut"
        disableScrollTrigger
      >
        <span
          className={`inline-block ${className}`}
          style={{
            backgroundImage: "linear-gradient(to right, #ffffff, #e762ff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            WebkitTextFillColor: "transparent",
            ...(fittedFontSize ? { fontSize: `${fittedFontSize}px` } : {}),
          }}
        >
          {text}
        </span>
      </AnimatedContent>
      {/* invisible measurer to lock height to tallest message */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className={`invisible absolute left-0 top-0 pointer-events-none ${className}`}
        style={{
          ...(fittedFontSize ? { fontSize: `${fittedFontSize}px` } : {}),
          // Ensure the measurer wraps exactly like the visible text
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      />
    </div>
  );
}
