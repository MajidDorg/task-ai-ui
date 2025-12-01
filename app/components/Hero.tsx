"use client";

import Hero_Sparkle from "../../public/assets/Hero_Button.svg";
import file_attachment_icon from "../../public/assets/Hero_Button Icon.svg";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import RotatingTitle from "./RotatingTitle";
import Hero_Microphone_Icon from "../../public/assets/Hero_Microphone_Icon.svg";
import Hero_Icon_Container from "../../public/assets/Hero_Icon Container.svg";
import Hero_Union_1 from "../../public/assets/Hero_Union_1.svg";
import Hero_Union_2 from "../../public/assets/Hero_Union_2.svg";
import Hero_Union_3 from "../../public/assets/Hero_Union_3.svg";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0f172a] section-y pt-30">
      {/* Anchor decorative unions to the page container width */}
      <div className="page-container relative pointer-events-none">
        <div
          aria-hidden="true"
          className="absolute right-6 opacity-60 md:right-[12px] md:top-[32px]"
        >
          <Image src={Hero_Union_2} alt="Union" />
        </div>
        <div
          aria-hidden="true"
          className="absolute hidden opacity-60 md:left-[-10px] md:top-[-50px] md:block"
        >
          <Image src={Hero_Union_1} alt="Union" />
        </div>
        {/* Static decorative union under the white box, fixed position */}
        <div
          aria-hidden="true"
          className="absolute left-[-120px] top-[520px] opacity-60 md:left-16 md:top-[420px]"
        >
          <Image src={Hero_Union_3} alt="Union" />
        </div>
      </div>
      <div className="page-container mx-auto flex flex-col items-center text-center md:min-h-[640px]">
        <div className="flex max-w-3xl flex-col items-center gap-4 md:gap-6">
          <h1 className="pt-6 md:pt-10 text-[26px] leading-tight font-bold tracking-tight md:text-[48px] md:leading-[58px] pb-[2px] font-['Plus Jakarta Sans',sans-serif]">
            <RotatingTitle
              maxLines={3}
              className="bg-linear-to-r from-white to-[#e762ff] bg-clip-text text-transparent"
            />
          </h1>
          <p className="mx-auto max-w-[68ch] -mt-1 md:-mt-6 text-center text-balance text-sm leading-[1.6] text-shade-off font-['Plus Jakarta Sans',sans-serif] md:text-[14px]">
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

  // Narrower when collapsed, a bit wider when expanded
  const collapsedWidthClass = "max-w-[680px]";
  const expandedWidthClass = "max-w-[680px]";
  const widthClass = uiExpanded ? expandedWidthClass : collapsedWidthClass;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper to compute compact height responsive
  const getCompactHeight = () => {
    return window.matchMedia("(min-width: 768px)").matches ? 56 : 48;
  };

  // When first character is typed, move focus to textarea seamlessly
  useEffect(() => {
    if (value.length > 0 && textAreaRef.current) {
      textAreaRef.current.focus();
      const len = textAreaRef.current.value.length;
      textAreaRef.current.setSelectionRange(len, len);
    }
  }, [value]);

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
    <div className="pb-30 mt-10 w-full max-w-6xl md:mt-16">
      <div
        ref={animWrapRef}
        className={`relative z-0 ${widthClass} mx-auto ${wrapperState} ${
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
              className={`${wrapperBase} h-[48px] md:h-[56px] ${
                uiExpanded && isCollapsing
                  ? "opacity-100"
                  : !uiExpanded
                  ? "opacity-100"
                  : "opacity-0"
              } transition-opacity duration-420 ease-[cubic-bezier(0.22,1,0.36,1)]`}
              onSubmit={(e) => e.preventDefault()}
            >
              <div
                ref={preContentRef}
                className="flex h-full items-center gap-3 pl-4 pr-2 md:gap-4 md:pl-5"
              >
                <button
                  ref={preAttachRef}
                  type="button"
                  onClick={handleAttachClick}
                  className="inline-flex h-6 w-6 md:h-9 md:w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:bg-slate-100 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 -ml-1 md:-ml-2"
                  aria-label="Add attachment"
                >
                  <Image
                    src={file_attachment_icon}
                    alt="Attachment"
                    width={24}
                    height={24}
                    className="h-6 w-6 md:h-[18px] md:w-[18px]"
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
                  className="min-w-0 flex-1 bg-transparent text-[14px] md:text-[14px] leading-tight text-gray-50 placeholder-gray-50 outline-none font-['Plus_Jakarta_Sans',sans-serif]"
                />
                <button
                  ref={preSendRef}
                  type="submit"
                  className="inline-flex h-7 w-9 md:h-8 md:w-10 items-center justify-center rounded-full bg-success-60 text-white transition-colors hover:bg-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-60/30"
                  aria-label="Run"
                >
                  <Image
                    src={Hero_Sparkle}
                    alt="Sparkle"
                    width={18}
                    height={18}
                    className="h-[16px] w-[16px] md:h-[18px] md:w-[18px]"
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
              } transition-opacity duration-420 ease-[cubic-bezier(0.22,1,0.36,1)]`}
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
                  className="min-h-[48px] w-full resize-none bg-transparent text-[14px] leading-[20px] text-black placeholder-gray-50 outline-none font-['Plus_Jakarta_Sans',sans-serif] md:min-h-[56px] md:text-[16px] md:leading-[22px]"
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
                          className="text-[#4F46E5] text-sm font-bold underline decoration-[#4F46E5] underline-offset-2 hover:text-[#4338CA] hover:bg-indigo-50 rounded px-1"
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
                  className="inline-flex h-6 w-6 md:h-9 md:w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:bg-slate-100 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                  aria-label="Add attachment"
                >
                  <Image
                    src={file_attachment_icon}
                    alt="Sparkle"
                    width={24}
                    height={24}
                    className="h-6 w-6 md:h-[18px] md:w-[18px]"
                  />
                </button>
                <div className="flex items-center gap-3 md:gap-4">
                  <button
                    type="button"
                    className="inline-flex h-6 w-6 md:h-9 md:w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:bg-slate-100 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                    aria-label="Voice input"
                  >
                    <Image
                      src={Hero_Microphone_Icon}
                      alt="Microphone"
                      width={24}
                      height={24}
                      className="h-6 w-6 md:h-[18px] md:w-[18px]"
                    />
                  </button>
                  <button
                    ref={postAnalyzeRef}
                    type="submit"
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-[1234px] bg-success-60 px-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-60/30 md:h-10 md:px-6 md:text-[16px]"
                    aria-label="Analyze"
                  >
                    Analyze
                    <Image
                      src={Hero_Sparkle}
                      alt="Sparkle"
                      width={18}
                      height={18}
                      className="h-[16px] w-[16px] md:h-[18px] md:w-[18px]"
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
