"use client";

import Hero_Sparkle from "../../public/assets/Hero_Button.svg";
import Hero_Union from "../../public/assets/Union.svg";
import file_attachment_icon from "../../public/assets/Hero_Button Icon.svg";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import RotatingTitle from "./RotatingTitle";
import Hero_Microphone_Icon from "../../public/assets/Hero_Microphone_Icon.svg";
import Hero_Icon_Container from "../../public/assets/Hero_Icon Container.svg";

export default function Hero() {
  return (
    <section className="relative w-screen overflow-hidden bg-[#0f172a]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 opacity-60 md:right-24 md:top-32"
      >
        <Image src={Hero_Union} alt="Union" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute hidden opacity-60 md:left-0 md:top-0 md:block"
      >
        <Image src={Hero_Union} alt="Union" />
      </div>
      {/* Static decorative union under the white box, fixed position */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-120px] top-[520px] opacity-60 md:left-16 md:top-[620px]"
      >
        <Image src={Hero_Union} alt="Union" />
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-0 pb-16 md:min-h-[900px] md:px-28 md:py-24">
        <div className="flex max-w-3xl flex-col items-center gap-4 text-center md:gap-6">
          <h1 className="pt-40 md:pt-0 text-3xl font-bold tracking-tight md:text-6xl md:leading-[68px] font-['Plus Jakarta Sans',sans-serif]">
            <RotatingTitle
              maxLines={3}
              className="bg-linear-to-r from-white to-[#e762ff] bg-clip-text text-transparent"
            />
          </h1>
          <p className="mx-auto max-w-[343px] text-center text-balance text-base leading-[1.6] text-shade-off font-['Plus Jakarta Sans',sans-serif] md:max-w-[717.235px] md:text-xl">
            Use thehandover.ai to search and analyse your next project.
          </p>
        </div>

        <HeroChatInput />
      </div>
    </section>
  );
}

function HeroChatInput() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  // Control which layout is shown independently of value to avoid snap
  const [uiExpanded, setUiExpanded] = useState(false);
  // Whether we are currently animating from expanded -> compact
  const [isCollapsing, setIsCollapsing] = useState(false);
  // Track any transition (expand or collapse) to keep glow visible
  const [isAnimating, setIsAnimating] = useState(false);
  // Drag/drop state
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  // Attached files
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  // Wrapper used for height animation across states
  const animWrapRef = useRef<HTMLDivElement>(null);
  // Inner content wrapper to control overflow during height animation (avoid clipping glow)
  const contentWrapRef = useRef<HTMLDivElement>(null);
  // FLIP refs for buttons (pre/compact vs post/expanded)
  const preAttachRef = useRef<HTMLButtonElement>(null);
  const preSendRef = useRef<HTMLButtonElement>(null);
  const postAttachRef = useRef<HTMLButtonElement>(null);
  const postAnalyzeRef = useRef<HTMLButtonElement>(null);
  const preFormRef = useRef<HTMLFormElement>(null);
  const postFormRef = useRef<HTMLFormElement>(null);
  // Content containers to FLIP the typing line smoothly
  const preContentRef = useRef<HTMLDivElement>(null);
  const postTopRef = useRef<HTMLDivElement>(null);
  // File input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wrapperBase = "transition-shadow transition-colors";
  const wrapperState = focused
    ? "border-slate-300 shadow-[0_0_0_4px_rgba(148,163,184,0.15)]"
    : "border-slate-200";

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper to compute compact height responsive
  const getCompactHeight = () => {
    return window.matchMedia("(min-width: 768px)").matches ? 64 : 56;
  };

  // When first character is typed, move focus to textarea seamlessly
  useEffect(() => {
    if (value.length > 0 && textAreaRef.current) {
      textAreaRef.current.focus();
      const len = textAreaRef.current.value.length;
      textAreaRef.current.setSelectionRange(len, len);
    }
    // Keep expanded layout while there is content
    if (value.length > 0 && !uiExpanded) {
      setUiExpanded(true);
    }
  }, [value, uiExpanded]);

  // Removed auto-focus jump on clear to avoid stealing last keypress during collapse

  // change handler with FLIP for first expansion transition
  const handleChange = (next: string) => {
    if (value.length === 0 && next.length === 1) {
      const wrap = animWrapRef.current;
      const startHeight = wrap ? wrap.getBoundingClientRect().height : 0;
      const startAttach = preAttachRef.current?.getBoundingClientRect();
      const startSend = preSendRef.current?.getBoundingClientRect();
      const startForm = preFormRef.current?.getBoundingClientRect();
      const startContent = preContentRef.current?.getBoundingClientRect();

      setValue(next);
      setUiExpanded(true);
      // ensure glow stays during the whole expand sequence
      setIsAnimating(true);

      // After DOM updates, animate height and buttons
      requestAnimationFrame(() => {
        const wrapNow = animWrapRef.current;
        if (wrap && wrapNow) {
          const endHeight = wrapNow.scrollHeight;
          wrapNow.style.height = `${startHeight}px`;
          if (contentWrapRef.current)
            contentWrapRef.current.style.overflow = "hidden";
          // force reflow
          void wrapNow.offsetHeight;
          wrapNow.style.transition =
            "height 420ms cubic-bezier(0.22,1,0.36,1), border-radius 420ms cubic-bezier(0.22,1,0.36,1)";
          wrapNow.style.height = `${endHeight}px`;
          wrapNow.style.borderRadius = "30px";
          const onEnd = () => {
            // lock final height for a frame to avoid snap, then release to auto
            const lockHeight = getComputedStyle(wrapNow).height;
            wrapNow.style.height = lockHeight;
            wrapNow.removeEventListener("transitionend", onEnd);
            requestAnimationFrame(() => {
              wrapNow.style.transition = "";
              wrapNow.style.height = "";
              if (contentWrapRef.current)
                contentWrapRef.current.style.overflow = "";
              setIsAnimating(false);
            });
          };
          wrapNow.addEventListener("transitionend", onEnd);
        }

        // FLIP animate buttons
        const animateFromTo = (
          target: HTMLElement | null | undefined,
          startRect?: DOMRect
        ) => {
          if (!target || !startRect) return;
          const endRect = target.getBoundingClientRect();
          const dx =
            startRect.left +
            startRect.width / 2 -
            (endRect.left + endRect.width / 2);
          const dy =
            startRect.top +
            startRect.height / 2 -
            (endRect.top + endRect.height / 2);
          const sx = Math.max(0.01, startRect.width / endRect.width);
          const sy = Math.max(0.01, startRect.height / endRect.height);

          // Use Web Animations API for smooth transform & opacity
          target.animate(
            [
              {
                transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`,
                opacity: 0,
              },
              { transform: "translate(0, 0) scale(1, 1)", opacity: 1 },
            ],
            { duration: 420, easing: "cubic-bezier(0.22,1,0.36,1)" }
          );
        };

        animateFromTo(postAttachRef.current as HTMLElement, startAttach);
        animateFromTo(postAnalyzeRef.current as HTMLElement, startSend);

        // Animate the white form (compact -> expanded) via FLIP
        const formTarget = postFormRef.current as unknown as HTMLElement | null;
        if (formTarget && startForm) {
          const endRect = formTarget.getBoundingClientRect();
          const dx =
            startForm.left +
            startForm.width / 2 -
            (endRect.left + endRect.width / 2);
          const dy =
            startForm.top +
            startForm.height / 2 -
            (endRect.top + endRect.height / 2);
          formTarget.animate(
            [
              {
                transform: `translate(${dx}px, ${dy}px)`,
                borderRadius: "50px",
              },
              { transform: "translate(0,0)", borderRadius: "30px" },
            ],
            {
              duration: 420,
              easing: "cubic-bezier(0.22,1,0.36,1)",
              fill: "both",
            }
          );
        }

        // Animate content (input row -> textarea row) to avoid snap
        const topRow = postTopRef.current as unknown as HTMLElement | null;
        if (topRow && startContent) {
          const endRect = topRow.getBoundingClientRect();
          const dx =
            startContent.left +
            startContent.width / 2 -
            (endRect.left + endRect.width / 2);
          const dy =
            startContent.top +
            startContent.height / 2 -
            (endRect.top + endRect.height / 2);
          topRow.animate(
            [
              { transform: `translate(${dx}px, ${dy}px)` },
              { transform: "translate(0,0)" },
            ],
            {
              duration: 420,
              easing: "cubic-bezier(0.22,1,0.36,1)",
              fill: "both",
            }
          );
        }
      });
      return;
    }

    // Collapse back to compact when cleared
    if (value.length > 0 && next.length === 0) {
      const wrap = animWrapRef.current;
      const startHeight = wrap ? wrap.getBoundingClientRect().height : 0;
      const startAttach = postAttachRef.current?.getBoundingClientRect();
      const startAnalyze = postAnalyzeRef.current?.getBoundingClientRect();
      const startForm = postFormRef.current?.getBoundingClientRect();
      const startTop = postTopRef.current?.getBoundingClientRect();

      setValue(next);
      setIsCollapsing(true);
      setIsAnimating(true);

      requestAnimationFrame(() => {
        const wrapNow = animWrapRef.current;
        if (wrap && wrapNow) {
          const endHeight = getCompactHeight();
          wrapNow.style.height = `${startHeight}px`;
          if (contentWrapRef.current)
            contentWrapRef.current.style.overflow = "hidden";
          void wrapNow.offsetHeight;
          wrapNow.style.transition =
            "height 420ms cubic-bezier(0.22,1,0.36,1), border-radius 420ms cubic-bezier(0.22,1,0.36,1)";
          wrapNow.style.height = `${endHeight}px`;
          wrapNow.style.borderRadius = "50px";
          const onEnd = () => {
            wrapNow.style.transition = "";
            wrapNow.style.height = "";
            if (contentWrapRef.current)
              contentWrapRef.current.style.overflow = "";
            wrapNow.removeEventListener("transitionend", onEnd);
            // Switch layout only after animation completes
            setUiExpanded(false);
            setIsCollapsing(false);
            setIsAnimating(false);
            // return focus so user can continue typing without clicking
            requestAnimationFrame(() => inputRef.current?.focus());
          };
          wrapNow.addEventListener("transitionend", onEnd);
        }

        const animateFromPrev = (
          target: HTMLElement | null | undefined,
          prevRect?: DOMRect
        ) => {
          if (!target || !prevRect) return;
          const endRect = target.getBoundingClientRect();
          const dx =
            prevRect.left +
            prevRect.width / 2 -
            (endRect.left + endRect.width / 2);
          const dy =
            prevRect.top +
            prevRect.height / 2 -
            (endRect.top + endRect.height / 2);
          const sx = Math.max(0.01, prevRect.width / endRect.width);
          const sy = Math.max(0.01, prevRect.height / endRect.height);

          target.animate(
            [
              {
                transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`,
                opacity: 0,
              },
              { transform: "translate(0, 0) scale(1, 1)", opacity: 1 },
            ],
            { duration: 420, easing: "cubic-bezier(0.22,1,0.36,1)" }
          );
        };

        animateFromPrev(preAttachRef.current as HTMLElement, startAttach);
        animateFromPrev(preSendRef.current as HTMLElement, startAnalyze);

        // Animate the white form (expanded -> compact) via FLIP
        const compactForm = preFormRef.current as unknown as HTMLElement | null;
        if (compactForm && startForm) {
          const endRect = compactForm.getBoundingClientRect();
          const dx =
            startForm.left +
            startForm.width / 2 -
            (endRect.left + endRect.width / 2);
          const dy =
            startForm.top +
            startForm.height / 2 -
            (endRect.top + endRect.height / 2);
          compactForm.animate(
            [
              {
                transform: `translate(${dx}px, ${dy}px)`,
                borderRadius: "30px",
              },
              { transform: "translate(0,0)", borderRadius: "50px" },
            ],
            {
              duration: 420,
              easing: "cubic-bezier(0.22,1,0.36,1)",
              fill: "both",
            }
          );
        }

        // Animate content (textarea row -> input row) to avoid snap
        const compactRow =
          preContentRef.current as unknown as HTMLElement | null;
        if (compactRow && startTop) {
          const endRect = compactRow.getBoundingClientRect();
          const dx =
            startTop.left +
            startTop.width / 2 -
            (endRect.left + endRect.width / 2);
          const dy =
            startTop.top +
            startTop.height / 2 -
            (endRect.top + endRect.height / 2);
          compactRow.animate(
            [
              { transform: `translate(${dx}px, ${dy}px)` },
              { transform: "translate(0,0)" },
            ],
            {
              duration: 420,
              easing: "cubic-bezier(0.22,1,0.36,1)",
              fill: "both",
            }
          );
        }
      });
      return;
    }
    setValue(next);
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    setAttachedFiles((prev) => [...prev, ...newFiles]);
    setIsDraggingOver(false);
    // If there is no text, collapse back to compact after receiving files
    if (value.length === 0) {
      const wrap = animWrapRef.current;
      const startHeight = wrap ? wrap.getBoundingClientRect().height : 0;
      setIsCollapsing(true);
      setIsAnimating(true);
      requestAnimationFrame(() => {
        const wrapNow = animWrapRef.current;
        if (wrap && wrapNow) {
          const endHeight = getCompactHeight();
          wrapNow.style.height = `${startHeight}px`;
          if (contentWrapRef.current)
            contentWrapRef.current.style.overflow = "hidden";
          void wrapNow.offsetHeight;
          wrapNow.style.transition =
            "height 420ms cubic-bezier(0.22,1,0.36,1), border-radius 420ms cubic-bezier(0.22,1,0.36,1)";
          wrapNow.style.height = `${endHeight}px`;
          wrapNow.style.borderRadius = "50px";
          const onEnd = () => {
            wrapNow.style.transition = "";
            wrapNow.style.height = "";
            if (contentWrapRef.current)
              contentWrapRef.current.style.overflow = "";
            wrapNow.removeEventListener("transitionend", onEnd);
            setUiExpanded(false);
            setIsCollapsing(false);
            setIsAnimating(false);
            requestAnimationFrame(() => inputRef.current?.focus());
          };
          wrapNow.addEventListener("transitionend", onEnd);
        }
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      handleFilesSelected(dt.files);
    }
    setIsDraggingOver(false);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    if (Array.from(e.dataTransfer?.types || []).includes("Files")) {
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingOver(true);
      // If currently collapsed, expand so the panel can render inline
      if (!uiExpanded) setUiExpanded(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (Array.from(e.dataTransfer?.types || []).includes("Files")) {
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingOver(true);
      if (!uiExpanded) setUiExpanded(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // When leaving the container entirely, hide overlay
    if (!contentWrapRef.current?.contains(e.relatedTarget as Node)) {
      setIsDraggingOver(false);
    }
  };

  return (
    <div className="pb-30 mt-6 w-full max-w-3xl md:mt-12">
      <div
        ref={animWrapRef}
        className={`relative z-0 ${wrapperState} ${
          uiExpanded ? "rounded-[30px]" : "rounded-[50px]"
        } bg-white border`}
        style={{
          transition:
            "height 420ms cubic-bezier(0.22,1,0.36,1), border-radius 420ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* keep glow persistent during transition */}
        {(focused || isAnimating) && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 shadow-[0_0_0_2px_rgba(255,255,255,0.25),0_8px_24px_rgba(208,128,255,0.25)]"
            style={{ borderRadius: "inherit" }}
          />
        )}
        <div
          ref={contentWrapRef}
          className="relative"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Hidden file input for attachment buttons */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFilesSelected(e.target.files)}
            accept=".csv,image/png,image/jpeg,application/pdf"
          />
          {/* Inline drag panel will render within expanded form below textarea */}
          {(!uiExpanded || isCollapsing) && (
            <form
              ref={preFormRef}
              className={`${wrapperBase} h-[56px] md:h-[64px] ${
                uiExpanded && isCollapsing
                  ? "opacity-100"
                  : !uiExpanded
                  ? "opacity-100"
                  : "opacity-0"
              } transition-opacity duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
              onSubmit={(e) => e.preventDefault()}
            >
              <div
                ref={preContentRef}
                className="flex h-full items-center gap-3 pl-5 pr-2 md:gap-4 md:pl-6"
              >
                <button
                  ref={preAttachRef}
                  type="button"
                  onClick={handleAttachClick}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 -ml-1 md:-ml-2"
                  aria-label="Add attachment"
                >
                  <Image
                    src={file_attachment_icon}
                    alt="Attachment"
                    width={24}
                    height={24}
                    className="h-[36px] w-[36px]"
                  />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Ask me anything..."
                  aria-label="Ask me anything"
                  className="min-w-0 flex-1 bg-transparent text-[16px] md:text-[20px] leading-tight text-[#64748b] placeholder-[#64748b] outline-none font-['Plus_Jakarta_Sans',sans-serif]"
                />
                <button
                  ref={preSendRef}
                  type="submit"
                  className="inline-flex h-10 w-12 items-center justify-center rounded-full bg-success-60 text-white transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-60/30 md:h-10 md:w-10"
                  aria-label="Run"
                >
                  <Image
                    src={Hero_Sparkle}
                    alt="Sparkle"
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px]"
                  />
                </button>
              </div>
            </form>
          )}

          {(uiExpanded || isCollapsing) && (
            <form
              ref={postFormRef}
              className={`${wrapperBase} ${
                isCollapsing ? "opacity-0" : "opacity-100"
              } transition-opacity duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
              onSubmit={(e) => e.preventDefault()}
            >
              <div ref={postTopRef} className="px-4 pt-4 md:px-5 md:pt-5">
                <textarea
                  ref={textAreaRef}
                  value={value}
                  onChange={(e) => handleChange(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Ask me anything..."
                  aria-label="Ask me anything"
                  rows={2}
                  className="min-h-[48px] w-full resize-none bg-transparent text-[16px] leading-[22px] text-black placeholder-[#64748b] outline-none font-['Plus_Jakarta_Sans',sans-serif] md:min-h-[56px] md:text-[24px] md:leading-[28px]"
                />
              </div>
              {isDraggingOver && (
                <div className="px-4 md:px-5">
                  <div className="mt-3 rounded-[24px] border border-fuchsia-300/50 bg-white shadow-[0_12px_48px_rgba(208,128,255,0.35)]">
                    <div className="m-3 rounded-[20px] border-2 border-dashed border-slate-300 bg-white/85 p-5 md:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex w-full justify-center">
                          <Image
                            src={Hero_Icon_Container}
                            alt="Attachment"
                            width={24}
                            height={24}
                            className="h-[36px] w-[36px]"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={handleAttachClick}
                          className="text-[#4F46E5] text-sm font-bold underline decoration-[#4F46E5] underline-offset-2 hover:brightness-110"
                        >
                          Click here
                        </button>
                        <span className="text-xs text-slate-500">
                          to upload your file or drag.
                        </span>
                      </div>
                      <p className="mt-2 text-center text-[10px] text-slate-400">
                        Supported Format: CSV, PNG, PDF (10mb each)
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between px-3 pb-3 pt-3 md:px-4 md:pb-4">
                <button
                  ref={postAttachRef}
                  type="button"
                  onClick={handleAttachClick}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                  aria-label="Add attachment"
                >
                  <Image
                    src={file_attachment_icon}
                    alt="Sparkle"
                    width={24}
                    height={24}
                    className="h-[36px] w-[36px]"
                  />
                </button>
                <div className="flex items-center gap-3 md:gap-4">
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                    aria-label="Voice input"
                  >
                    <Image
                      src={Hero_Microphone_Icon}
                      alt="Microphone"
                      width={24}
                      height={24}
                      className="h-[36px] w-[36px]"
                    />
                  </button>
                  <button
                    ref={postAnalyzeRef}
                    type="submit"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-[1234px] bg-success-60 px-5 text-[16px] font-semibold text-white transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-60/30 md:h-10 md:px-6"
                    aria-label="Analyze"
                  >
                    Analyze
                    <Image
                      src={Hero_Sparkle}
                      alt="Sparkle"
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px]"
                    />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      {attachedFiles.length > 0 && (
        <div className="mt-[5px] flex flex-col items-center gap-2">
          {attachedFiles.map((file, idx) => {
            const sizeKb = Math.ceil(file.size / 1024);
            return (
              <span
                key={`${file.name}-${idx}`}
                className="inline-flex max-w-[16ch] items-center gap-2 truncate rounded-full border border-indigo-300 bg-white px-3 py-1 text-[14px] font-semibold text-[#4F46E5] md:max-w-[60ch] font-['Plus Jakarta Sans',sans-serif]"
                title={`${file.name} • ${sizeKb} KB`}
              >
                <span className="truncate">{file.name}</span>
                <span className="shrink-0 text-[12px] text-slate-500">
                  {sizeKb} KB
                </span>
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  className="ml-1 shrink-0 rounded-full px-1 text-slate-500 hover:text-slate-700"
                  onClick={() =>
                    setAttachedFiles((prev) => prev.filter((_, i) => i !== idx))
                  }
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
