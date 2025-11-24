export default function SectionFooterCta() {
  return (
    <section className="w-full bg-[#0f172a]">
      <div className="mx-auto max-w-[1216px] px-0 pt-24 pb-0 md:px-28 md:py-24">
        <div className="relative mx-auto w-full overflow-hidden rounded-t-none rounded-b-[24px] px-4 py-16 md:px-[112px] md:py-[96px]">
          {/* background with image and overlay */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              src="https://www.figma.com/api/mcp/asset/7c6e6387-b57b-420d-b049-7428b1146c74"
            />
            <div className="absolute inset-0 bg-[rgba(16,13,77,0.64)]" />
          </div>

          <div className="relative grid gap-10 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
            {/* left content */}
            <div className="text-shade-on">
              <div className="flex items-center gap-4">
                <img
                  alt="THE HANDOVER"
                  src="https://www.figma.com/api/mcp/asset/4c9c4f59-0975-43ca-b46b-9cf679fa57c6"
                  className="h-12 w-auto"
                />
              </div>
              <p className="mt-4 text-[16px] leading-[1.6] text-slate-100 md:mt-6 md:max-w-2xl md:text-[20px]">
                Secured. Verified. Built for ROI — powered by AI to redefine
                construction finance.
              </p>

              {/* CTA (mobile full width) */}
              <div className="mt-6 md:mt-8">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-success-60 px-5 py-4 text-[16px] font-bold text-white transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:w-auto md:px-8"
                >
                  Create Account
                  <img
                    src="/assets/Header_ArrowRight.svg"
                    alt=""
                    className="h-5 w-5"
                  />
                </button>
              </div>

              {/* Links */}
              <div className="mt-8 grid grid-cols-1 gap-6 text-[16px] font-bold text-white md:mt-10 md:grid-cols-2 md:flex md:flex-wrap md:gap-8">
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
                Create Account <span aria-hidden>→</span>
              </button>
            </div>
          </div>

          <hr className="relative z-[1] mt-10 border-t border-white/30" />

          <div className="relative mt-6 flex flex-col items-center justify-between gap-6 text-white/90 md:flex-row">
            <p className="text-center text-[14px]">
              Copyright 2025 © The Handover, All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <img
                alt=""
                className="h-6 w-6"
                src="https://www.figma.com/api/mcp/asset/e4a4c8ec-a4e4-4e47-b935-19afa3b1bd32"
              />
              <img
                alt=""
                className="h-6 w-6"
                src="https://www.figma.com/api/mcp/asset/ef5812c2-725a-4364-a703-93b6234b88e7"
              />
              <img
                alt=""
                className="h-6 w-6"
                src="https://www.figma.com/api/mcp/asset/0bb2df6c-03e4-4793-bc3f-9083375ca40b"
              />
              <img
                alt=""
                className="h-6 w-6"
                src="https://www.figma.com/api/mcp/asset/d5cdfff0-3d8e-49d5-b724-e594db87bd00"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
