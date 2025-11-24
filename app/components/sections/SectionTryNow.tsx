import Sparkle from "../../../public/assets/Try_Now_Sparkle.svg";
import Image from "next/image";
export default function SectionTryNow() {
  return (
    <section className="w-full bg-[#0f172a]">
      <div className="mx-auto max-w-[1216px] px-4 pt-70 pb-70 text-center md:px-28">
        <h2 className="bg-gradient-to-r from-white to-[#e762ff] bg-clip-text text-transparent text-[32px] font-bold tracking-tight md:text-6xl md:leading-[68px] font-['Plus Jakarta Sans',sans-serif]">
          Try Now!
        </h2>
        <p className="mx-auto mt-3 max-w-[765.131px] text-[16px] leading-[1.6] text-shade-off md:text-[32px] font-['Plus Jakarta Sans',sans-serif]">
          the #1 AI app for homebuilders
        </p>
        <div className="mt-10 flex justify-center">
          <div className="relative inline-flex">
            {/* Glow under button (auto-sizes to button) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 rounded-[999px] opacity-80 blur-[32px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(231,98,255,0.45)_0%,rgba(165,180,252,0.35)_100%)]"
            />
            <button
              type="button"
              className="relative z-[1] inline-flex h-[67.177px] items-center gap-3 rounded-[1472.206px] bg-slate-50 px-[120px] py-[10px] font-bold text-slate-600 shadow-[0_8px_28px_rgba(231,98,255,0.25)] transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-30/40 md:text-[21.47px] md:px-[36px] md:py-[5px] whitespace-nowrap"
            >
              <Image
                src={Sparkle}
                alt="Sparkle"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="text-[18px] text-slate-600 font-['Plus Jakarta Sans',sans-serif] whitespace-nowrap">
                Start Chat
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
