"use client";

import Hero_Sparkle from "../../public/assets/Hero_Button.svg";
import Hero_Union from "../../public/assets/Union.svg";
import file_attachment_icon from "../../public/assets/Hero_Button Icon.svg";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import RotatingTitle from "./RotatingTitle";
import Hero_Microphone_Icon from "../../public/assets/Hero_Microphone_Icon.svg";

export default function Hero() {
  return (
    <section className="relative w-screen overflow-hidden bg-[#0f172a]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 opacity-60 md:right-24 md:top-32"
      >
        <Image src={Hero_Union} alt="Union" />
      </div>
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center px-6 py-16 md:min-h-[900px] md:px-28 md:py-24">
        <div className="flex max-w-3xl flex-col items-center gap-4 text-center md:gap-6">
          <h1 className="pt-40 text-3xl font-bold tracking-tight md:text-6xl md:leading-[68px] font-['Plus Jakarta Sans',sans-serif]">
            <RotatingTitle className="bg-gradient-to-r from-white to-[#e762ff] bg-clip-text text-transparent" />
          </h1>
          <p className="pb-6 mx-auto max-w-[343px] text-center text-balance text-base leading-[1.6] text-shade-off font-['Plus Jakarta Sans',sans-serif] md:max-w-[717.235px] md:text-xl">
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

  const wrapperBase =
    "rounded-[30px] border bg-white transition-shadow transition-colors";
  const wrapperState = focused
    ? "border-slate-300 shadow-[0_0_0_4px_rgba(148,163,184,0.15)]"
    : "border-slate-200";

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // When first character is typed, move focus to textarea seamlessly
  useEffect(() => {
    if (value.length > 0 && textAreaRef.current) {
      textAreaRef.current.focus();
      const len = textAreaRef.current.value.length;
      textAreaRef.current.setSelectionRange(len, len);
    }
  }, [value]);

  // If cleared while focused, keep focus on compact input
  useEffect(() => {
    if (value.length === 0 && focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [value, focused]);

  return (
    <div className="pb-30 mt-6 w-full max-w-3xl md:mt-12">
      {value.length === 0 ? (
        // Compact placeholder state (single row)
        <div className="relative">
          {/* persistent glow layer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[50px] shadow-[0_0_0_2px_rgba(255,255,255,0.25),0_8px_24px_rgba(208,128,255,0.25)]"
          />
          <form
            className={`${wrapperBase} ${wrapperState} h-[56px] md:h-[64px]`}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex h-full items-center gap-3 pl-5 pr-2 md:gap-4 md:pl-6">
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
                placeholder="Ask me anything..."
                aria-label="Ask me anything"
                className="min-w-0 flex-1 bg-transparent text-[16px] md:text-[20px] leading-tight text-[#64748b] placeholder-[#64748b] outline-none font-['Plus_Jakarta_Sans',sans-serif]"
              />
              <button
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
        </div>
      ) : (
        // Typing state (two rows with textarea, bottom controls)
        <div className="relative">
          {/* persistent glow layer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[30px] shadow-[0_0_0_2px_rgba(255,255,255,0.25),0_8px_24px_rgba(208,128,255,0.25)]"
          />
          <form
            className={`${wrapperBase} ${wrapperState}`}
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Top row: textarea only */}
            <div className="px-4 pt-4 md:px-5 md:pt-5">
              <textarea
                ref={textAreaRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Ask me anything..."
                aria-label="Ask me anything"
                rows={2}
                className="min-h-[48px] w-full resize-none bg-transparent text-[16px] leading-[22px] text-shade-off placeholder-[#64748b] outline-none font-['Plus_Jakarta_Sans',sans-serif] md:min-h-[56px] md:text-[24px] md:leading-[28px]"
              />
            </div>
            {/* Bottom row: paperclip left, mic + analyze right */}
            <div className="flex items-center justify-between px-3 pb-3 pt-3 md:px-4 md:pb-4">
              {/* Attachment button */}
              <button
                type="button"
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
        </div>
      )}
    </div>
  );
}
