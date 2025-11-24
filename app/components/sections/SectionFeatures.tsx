import Image from "next/image";

import Features_SealCheck from "../../../public/assets/Features_SealCheck.svg";
import Sparkle from "../../../public/assets/Hero_Button.svg";
import Features_Checklist from "../../../public/assets/Features_Checklist_Item.svg";
import Features_ArrowRight from "../../../public/assets/Features_ArrowRight.svg";
import Features_Frame from "../../../public/assets/Features_Frame.svg";
import Features_Frame_2 from "../../../public/assets/Features_Frame_2.svg";
import Features_Frame_3 from "../../../public/assets/Features_Frame_3.svg";
function CheckBullet() {
  return <Image src={Features_Checklist} alt="Features_Checklist" />;
}
function ArrowRight() {
  return (
    <Image
      src={Features_ArrowRight}
      alt="Features_ArrowRight"
      width={20}
      height={20}
      className="w-5 h-5"
    />
  );
}

export default function SectionFeatures() {
  return (
    <section className="w-full bg-[#0f172a]">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-28 md:py-24">
        {/* Heading */}
        <div className="mb-12 flex flex-col items-center gap-4 text-center md:mb-16">
          <span className="rounded-full border border-indigo-300 bg-white px-3 py-1 text-[14px] font-semibold text-[#4F46E5] md:px-3 md:py-1.5 md:text-sm font-['Plus Jakarta Sans',sans-serif]">
            Features of TheHandover AI
          </span>
          <h2 className="bg-linear-to-r from-[#ffffff] to-[#e762ff] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-5xl md:leading-[68px]">
            Say goobye to unecessary hard work.
          </h2>
        </div>

        {/* Row 1 */}
        <div className="grid justify-items-center items-start md:items-center gap-8 md:grid-cols-2 md:gap-24 md:justify-items-start md:mt-12">
          {/* Image card (Figma 1-4955 exact composition with dimensions) */}
          <div className="relative mx-auto overflow-hidden w-[343px] aspect-square md:w-full md:max-w-[627.75px] rounded-[18.485px] md:rounded-[32px] border border-white/10 bg-[#081534] md:justify-self-start">
            {/* background luminosity grid/image could go here if you add the asset */}

            {/* Inner message group (card + chip + approved) positioned as a block */}
            <div className="absolute left-[41px] top-[130px] w-[270.744px] md:left-1/2 md:top-1/2 md:w-[404px] md:-translate-x-1/2 md:-translate-y-1/2 relative">
              {/* Card */}
              <div className="rounded-[16px] md:rounded-[24px] border border-white/10 bg-[#263149] p-[12px] md:p-5 shadow-[0_40px_80px_rgba(0,0,0,0.25)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50">
                    <Image
                      src={Features_SealCheck}
                      alt="Sparkle"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </span>
                </div>
                <div className="mt-3 space-y-3 md:mt-4">
                  <div className="h-3 w-[88%] rounded-full bg-[#334060]" />
                  <div className="h-3 w-[92%] rounded-full bg-[#334060]" />
                  <div className="h-3 w-[64%] rounded-full bg-[#334060]" />
                </div>
              </div>

              {/* Analyzing chip pinned to card's top-right */}
              <div
                className="absolute right-px top-[-32px] inline-flex items-center gap-1 rounded-[24px]
               bg-white/10 px-3 py-1 text-xs text-slate-100 backdrop-blur-[7px] md:right-[5px] md:top-[-32px]"
              >
                <Image
                  src={Sparkle}
                  alt="Sparkle"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                Analyzing…
              </div>

              {/* Approved badge pinned to card's bottom-left */}
              <div
                className="absolute left-px bottom-[-32px] inline-flex items-center gap-2 rounded-full 
              bg-green-600 px-3 py-1 text-[12px] font-semibold text-white md:left-[5px] md:bottom-[-32px]"
              >
                <Image
                  src={Sparkle}
                  alt="Sparkle"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                Approved
              </div>
            </div>
          </div>
          {/* Text */}
          <div className="flex min-w-0 w-[343px] md:w-full md:max-w-[560px] flex-col gap-5 items-start text-left mx-auto md:mx-0 pl-5">
            <h3 className="text-2xl font-bold tracking-tight text-shade-on lg:text-2xl lg:leading-[32px] font-['Plus Jakarta Sans',sans-serif]">
              AI-powered construction due diligence.
            </h3>
            <p className="text-[16px] leading-[1.6] text-shade-off font-['Plus Jakarta Sans',sans-serif]">
              Decide go/no go on your next project faster than ever before, by
              answering questions like:
            </p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 text-[18px] text-slate-200">
                <CheckBullet />
                <span>What can I build or what is allowed to be built?</span>
              </li>
              <li className="flex items-center gap-3 text-[18px] text-slate-200">
                <CheckBullet />
                <span>What will the cost to build be?</span>
              </li>
              <li className="flex items-center gap-3 text-[18px] text-slate-200">
                <CheckBullet />
                <span>What is the market rate to sell once built?</span>
              </li>
            </ul>
            <button
              type="button"
              className="inline-flex items-center gap-2 self-start rounded-full px-0 py-0 text-indigo-200 hover:text-indigo-100"
            >
              Run Due Diligence
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* Row 2 */}
        <div className="mt-16 grid items-center gap-8 md:mt-24 md:grid-cols-2 md:gap-24">
          {/* Text */}
          <div className="order-2 flex flex-col gap-5 md:order-1 pl-5">
            <h3 className="text-2xl font-bold tracking-tight text-shade-on md:text-2xl md:leading-[38px]">
              Generate takeoff estimates. Build vendor scopes in seconds.
            </h3>
            <p className="text-[18px] leading-[1.6] text-shade-off">
              Upload your drawings, PDFs, or material schedules — TheHandover AI
              reads them, calculates takeoff quantities, and drafts scope
              outlines ready to send to vendors or subcontractors.
            </p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 text-[18px] text-slate-200">
                <CheckBullet />
                <span>Convert PDFs or CAD exports into itemized takeoffs.</span>
              </li>
              <li className="flex items-center gap-3 text-[18px] text-slate-200">
                <CheckBullet />
                <span>
                  Produce trade-specific scope docs with cost benchmarks.
                </span>
              </li>
              <li className="flex items-center gap-3 text-[18px] text-slate-200">
                <CheckBullet />
                <span>Flag high-variance items against market pricing.</span>
              </li>
            </ul>
            <button
              type="button"
              className="inline-flex items-center gap-2 self-start rounded-full px-0 py-0 text-indigo-200 hover:text-indigo-100"
            >
              Create Takeoff
              <ArrowRight />
            </button>
          </div>
          {/* Image card */}
          <div className="order-1 relative overflow-hidden rounded-3xl border border-white/10 bg-[#081534] md:order-2">
            <Image
              src={Features_Frame}
              alt="Features_Frame"
              width={500}
              height={500}
              className="pointer-events-none block h-full w-full select-none mix-blend-luminosity"
            />
          </div>
        </div>

        {/* Block 3: Image Left, Text Right */}
        <div className="mt-16 grid items-center gap-8 md:mt-24 md:grid-cols-2 md:gap-24">
          {/* Image card (diagram) */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#081534]">
            <Image
              src={Features_Frame_2}
              alt="Features_Frame_2"
              width={500}
              height={500}
              className="pointer-events-none block h-full w-full select-none mix-blend-luminosity"
            />
          </div>
          {/* Text */}
          <div className="flex flex-col gap-5 pl-5">
            <h3 className="text-2xl font-bold tracking-tight text-shade-on md:text-2xl md:leading-[38px]">
              Simplify construction loans and project financing.
            </h3>
            <p className="text-[18px] leading-[1.6] text-shade-off">
              Make your proforma with our AI solution or convert what you have
              into a project, add and post to our marketplace
            </p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 text-[18px] text-slate-200">
                <CheckBullet />
                <span>
                  Compare financing scenarios (bridge vs. construction loan).
                </span>
              </li>
              <li className="flex items-center gap-3 text-[18px] text-slate-200">
                <CheckBullet />
                <span>Identify equity gaps and blended cost of capital.</span>
              </li>
              <li className="flex items-center gap-3 text-[18px] text-slate-200">
                <CheckBullet />
                <span>Match with verified lenders ready to fund.</span>
              </li>
            </ul>
            <button
              type="button"
              className="inline-flex items-center gap-2 self-start rounded-full px-0 py-0 text-indigo-200 hover:text-indigo-100"
            >
              Find Financing Options
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* Block 4: Text Left, Image Right */}
        <div className="mt-16 grid items-center gap-8 md:mt-24 md:grid-cols-2 md:gap-24">
          {/* Text */}
          <div className="order-2 flex flex-col gap-5 md:order-1 pl-5">
            <h3 className="text-2xl font-bold tracking-tight text-shade-on md:text-2xl md:leading-[38px]">
              Build cost and market analysis through AI reporting.
            </h3>
            <p className="text-[18px] leading-[1.6] text-shade-off">
              TheHandover AI’s finance engine models your total capital stack,
              repayment schedules, and expected ROI automatically. Adjust your
              assumptions and watch updated forecasts in real time.
            </p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 text-[18px] text-slate-200">
                <CheckBullet />
                <span>
                  Auto-calculate LTV, DSCR, and IRR from uploaded proformas.
                </span>
              </li>
              <li className="flex items-center gap-3 text-[18px] text-slate-200">
                <CheckBullet />
                <span>
                  Simulate loan terms and repayment impact on returns.
                </span>
              </li>
              <li className="flex items-center gap-3 text-[18px] text-slate-200">
                <CheckBullet />
                <span>
                  Export full financing summary for lenders or investors.
                </span>
              </li>
            </ul>
            <button
              type="button"
              className="inline-flex items-center gap-2 self-start rounded-full px-0 py-0 text-indigo-200 hover:text-indigo-100"
            >
              Create Takeoff
              <ArrowRight />
            </button>
          </div>
          {/* Image card (bar chart) */}
          <div className="order-1 relative overflow-hidden rounded-3xl border border-white/10 bg-[#081534] md:order-2">
            <Image
              src={Features_Frame_3}
              alt="Features_Frame_3"
              width={500}
              height={500}
              className="pointer-events-none block h-full w-full select-none mix-blend-luminosity"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
