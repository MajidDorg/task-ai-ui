import Image from "next/image";
import TheHandOverLogo from "../../public/assets/The_Hand_Over_Logo.svg";
import Sparkle from "../../public/assets/Sparkle.svg";
import ArrowRight from "../../public/assets/Header_ArrowRight.svg";
// comment
export default function Header() {
  return (
    <header className="w-full bg-[#0f172a]">
      <div className="page-container flex items-center justify-between py-4 md:py-5">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <span>
              <Image
                src={TheHandOverLogo}
                alt="The Handover"
                width={220}
                height={32}
                className="w-[143px] h-[32px] md:w-[170px] md:h-[32px]"
              />
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-brand-30 px-2.5 py-0.5 text-[11px] font-semibold text-brand-30 md:px-2 md:py-1 md:text-xs">
        <Image
          src={Sparkle}
          alt="Sparkle"
          width={16}
          height={16}
          className="inline-block w-3 h-3"
        />
        <span className="leading-none">AI</span>
      </span>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16A34A] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:px-3 md:py-2 md:text-[14px]"
        >
          <span>Sign Up</span>
          <span aria-hidden="true" className="hidden md:inline">
            <Image
              src={ArrowRight}
              alt="Arrow Right"
              width={18}
              height={18}
              className="w-4 h-4"
            />
          </span>
        </button>
      </div>
    </header>
  );
}
