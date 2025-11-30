import Sparkle from "../../../public/assets/Try_Now_Sparkle.svg";
import Image from "next/image";
import TryNow_Union_1 from "../../../public/assets/Try_Now_Union_1.svg";
import TryNow_Union_2 from "../../../public/assets/TryNow_Union_2.svg";
import TryNow_Union_3 from "../../../public/assets/TryNow_Union_3.svg";
export default function SectionTryNow() {
  return (
    <section className="relative w-full bg-[#0f172a] section-y pt-24 md:py-62">
      {/* Decorative unions anchored to page container width */}
      <div className="page-container relative pointer-events-none">
        <div
          aria-hidden="true"
          className="absolute right-6 opacity-60 hidden md:block md:right-24 md:top-[-250px]"
        >
          <Image src={TryNow_Union_1} alt="Union" />
        </div>
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 opacity-60 hidden md:block md:left-0 md:top-[-250px]"
        >
          <Image src={TryNow_Union_3} alt="Union" />
        </div>
        <div
          aria-hidden="true"
          className="absolute left-[-20px] opacity-100 md:left-50 md:top-[50px]"
        >
          <Image src={TryNow_Union_2} alt="Union" />
        </div>
      </div>
      <div className="page-container text-center">
        <h2 className="bg-[linear-gradient(90deg,#ffffff_40%,#ffffff_25%,#e762ff_60%,#e762ff_100%)] bg-clip-text text-transparent text-[28px] font-bold tracking-tight md:text-[48px] md:leading-[56px] font-['Plus Jakarta Sans',sans-serif]">
          Try Now!
        </h2>
        <p className="mx-auto mt-3 max-w-[765.131px] text-[16px] leading-[1.6] text-[#E2E8F0] md:text-[20px] font-['Plus Jakarta Sans',sans-serif]">
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
              className="relative z-1 inline-flex h-[48px] items-center gap-2 rounded-[1472.206px] bg-slate-50 px-[56px] py-[6px] font-bold text-slate-600 shadow-[0_8px_28px_rgba(231,98,255,0.25)] transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-30/40 md:text-[14px] md:px-[28px] md:py-[3px] whitespace-nowrap"
            >
              <Image
                src={Sparkle}
                alt="Sparkle"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="text-[14px] md:text-[16px] text-slate-600 font-['Plus Jakarta Sans',sans-serif] whitespace-nowrap">
                Start Chat
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
