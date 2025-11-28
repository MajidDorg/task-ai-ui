import Image from "next/image";
import Footer_The_Handover_Logo_mobile from "../../../public/assets/Footer_The_Handover_Logo_mobile.svg";
import Footer_The_Handover_Logo_desktop from "../../../public/assets/Footer_The_Handover_Logo_desktop.svg";
import Footer_ArrowRight from "../../../public/assets/Footer_ArrowRight.svg";
import Footer_ArrowRight_white from "../../../public/assets/Footer_ArrowRight_white.svg";
import Footer_Facebook_Vector from "../../../public/assets/Footer_Facebook_Vector.svg";
import Footer_X_Vector from "../../../public/assets/Footer_X_Vector.svg";
import Footer_Instagram_Vector from "../../../public/assets/Footer_Instagram_Vector.svg";
import Footer_Linkedin_Vector from "../../../public/assets/Footer_Linkedin_Vector.svg";
import Footer_Background from "../../../public/assets/footer_card_background.jpeg";
import TryNow_Union from "../../../public/assets/TryNow_Union.svg";
export default function SectionFooterCta() {
  return (
    <section className="relative w-full bg-[#0f172a]">
      {/* Decorative unions pinned to the section corners (not just the card) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-80px] top-[-140px] opacity-60 hidden md:block md:left-[-120px] md:top-[-200px]"
      >
        <Image
          src={TryNow_Union}
          alt="Union"
          className="rotate-90"
          style={{ clipPath: "inset(50% 0 0 0)" }}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-80px] top-[-140px] opacity-60 hidden md:block md:right-[-120px] md:top-[-200px]"
      >
        <Image
          src={TryNow_Union}
          alt="Union"
          className="rotate-90"
          style={{ clipPath: "inset(50% 0 0 0)" }}
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-0 pt-24 pb-0 md:px-28 md:py-24">
        <div className="relative mx-auto w-full overflow-hidden rounded-t-none rounded-b-[24px] px-4 py-16 md:px-[112px] md:py-[96px]">
          {/* background with image and overlay */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 rounded-t-none rounded-b-[24px] md:rounded-[24px]"
              style={{
                background:
                  "linear-gradient(0deg, rgba(16, 13, 77, 0.64) 0%, rgba(16, 13, 77, 0.64) 100%), url(" +
                  Footer_Background.src +
                  "), #312E81",
                backgroundPosition: "64% 36%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
          <div className="relative grid gap-10 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
            {/* left content */}
            <div className="text-shade-on">
              <div className="flex items-center gap-4">
                <Image
                  src={Footer_The_Handover_Logo_mobile}
                  alt="Footer The Handover Logo"
                  className="block md:hidden"
                />
                <Image
                  src={Footer_The_Handover_Logo_desktop}
                  alt="Footer The Handover Logo"
                  className="hidden md:block"
                  width={466}
                  height={82.3}
                />
              </div>
              <p className="mt-4 md:mt-6 md:max-w-2xl text-[18px] leading-[160%] font-normal text-[var(--Gray-30,#CBD5E1)] font-['Plus Jakarta Sans',sans-serif]">
                Secured. Verified. Built for ROI — powered by AI to redefine
                construction finance.
              </p>

              {/* CTA (mobile full width) */}
              <div className="mt-6 md:mt-8 md:hidden">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#4ADE80] px-5 py-4 text-[16px] font-semibold text-black transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-60/40 md:w-auto md:px-8 font-['Plus Jakarta Sans',sans-serif]"
                >
                  Create Account
                  <Image src={Footer_ArrowRight} alt="Footer Arrow Right" />
                </button>
              </div>

              {/* Links */}
              <div className="mt-8 grid grid-cols-1 gap-6 text-[16px] font-semibold text-[#F1F5F9] md:mt-10 md:grid-cols-2 md:flex md:flex-wrap md:gap-8 font-['Plus Jakarta Sans',sans-serif]">
                <a className="hover:opacity-90" href="#">
                  Back to Top
                </a>
                <a className="hover:opacity-90" href="#">
                  For Investors
                </a>
                <a className="hover:opacity-90" href="#">
                  Platform &amp; Solutions
                </a>
                <a className="hover:opacity-90" href="#">
                  Company
                </a>
                <a className="hover:opacity-90" href="#">
                  FAQ
                </a>
                <a className="hover:opacity-90" href="#">
                  Terms
                </a>
                <a className="hover:opacity-90" href="#">
                  Privacy
                </a>
                <a className="hover:opacity-90" href="#">
                  Risk Disclaimer
                </a>
                <a className="hover:opacity-90" href="#">
                  Contact Us
                </a>
              </div>
            </div>

            {/* right CTA (desktop only placement) */}
            <div className="hidden md:flex md:justify-end">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-success-60 px-8 py-4 font-bold text-white transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Sign Up{" "}
                <span aria-hidden>
                  <Image
                    src={Footer_ArrowRight_white}
                    alt="Footer Arrow Right"
                  />
                </span>
              </button>
            </div>
          </div>

          <hr className="relative z-1 mt-16 border-t border-white/50" />

          <div className="relative mt-6 w-full flex flex-col items-center justify-between gap-6 text-white/90 md:flex-row">
            <div className="flex items-center gap-6 order-1 md:order-2">
              <Image
                src={Footer_Facebook_Vector}
                alt="Footer Facebook Vector"
              />
              <Image src={Footer_X_Vector} alt="Footer X Vector" />
              <Image
                src={Footer_Instagram_Vector}
                alt="Footer Instagram Vector"
              />
              <Image
                src={Footer_Linkedin_Vector}
                alt="Footer Linkedin Vector"
              />
            </div>
            <p className="text-center text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-[var(--Gray-40,#94A3B8)] font-['Plus Jakarta Sans',sans-serif] order-2 md:order-1">
              Copyright 2025 © The Handover, All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
