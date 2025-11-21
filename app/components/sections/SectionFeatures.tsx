function CheckBullet() {
  return (
    <span className="inline-flex size-7 items-center justify-center rounded-full bg-indigo-50 md:size-7">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="text-indigo-600"
      >
        <path
          d="M20 7L9 18L4 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function SectionFeatures() {
  return (
    <section className="w-full bg-[#0f172a]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-28 md:py-24">
        {/* Heading */}
        <div className="mb-12 flex flex-col items-center gap-4 text-center md:mb-16">
          <span className="rounded-full border border-indigo-300 bg-indigo-50/10 px-3 py-1 text-xs font-semibold text-indigo-300 md:px-3 md:py-1.5 md:text-sm">
            Features of TheHandover AI
          </span>
          <h2 className="bg-linear-to-r from-[#ffffff] to-[#f0abfc] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent md:text-5xl md:leading-[68px]">
            Say Goobye To Unecessary Hard Work.
          </h2>
        </div>

        {/* Row 1 */}
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-24">
          {/* Image card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#081534]">
            {/* image overlay */}
            <img
              alt=""
              className="pointer-events-none block h-full w-full select-none mix-blend-luminosity"
              src="https://www.figma.com/api/mcp/asset/121504c3-6ac2-43e0-9319-1a5be0a10740"
            />
            {/* floating chip */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 rounded-full backdrop-blur-[7px] bg-white/10 px-2.5 py-1.5 text-xs text-slate-100">
              Analyzing…
            </div>
          </div>
          {/* Text */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-extrabold tracking-tight text-shade-on md:text-2xl md:leading-[38px]">
              AI-powered construction due diligence.
            </h3>
            <p className="text-[18px] leading-[1.6] text-shade-off">
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
              className="self-start rounded-full px-0 py-0 text-indigo-200 hover:text-indigo-100"
            >
              Run Due Diligence →
            </button>
          </div>
        </div>

        {/* Row 2 */}
        <div className="mt-16 grid items-center gap-8 md:mt-24 md:grid-cols-2 md:gap-24">
          {/* Text */}
          <div className="order-2 flex flex-col gap-5 md:order-1">
            <h3 className="text-xl font-extrabold tracking-tight text-shade-on md:text-2xl md:leading-[38px]">
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
              className="self-start rounded-full px-0 py-0 text-indigo-200 hover:text-indigo-100"
            >
              Create Takeoff →
            </button>
          </div>
          {/* Image card */}
          <div className="order-1 relative overflow-hidden rounded-3xl border border-white/10 bg-[#081534] md:order-2">
            <img
              alt=""
              className="pointer-events-none block h-full w-full select-none mix-blend-luminosity"
              src="https://www.figma.com/api/mcp/asset/45cd79c1-e5e6-442e-a9c0-4c37792e2d0a"
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full backdrop-blur-[7px] bg-white/10 px-4 py-2 text-sm text-slate-100">
              Analyzing Floor Plan
            </div>
          </div>
        </div>

        {/* Block 3: Image Left, Text Right */}
        <div className="mt-16 grid items-center gap-8 md:mt-24 md:grid-cols-2 md:gap-24">
          {/* Image card (diagram) */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#081534]">
            <img
              alt=""
              className="pointer-events-none block h-full w-full select-none mix-blend-luminosity"
              src="https://www.figma.com/api/mcp/asset/45cd79c1-e5e6-442e-a9c0-4c37792e2d0a"
            />
          </div>
          {/* Text */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-extrabold tracking-tight text-shade-on md:text-2xl md:leading-[38px]">
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
              className="self-start rounded-full px-0 py-0 text-indigo-200 hover:text-indigo-100"
            >
              Find Financing Options →
            </button>
          </div>
        </div>

        {/* Block 4: Text Left, Image Right */}
        <div className="mt-16 grid items-center gap-8 md:mt-24 md:grid-cols-2 md:gap-24">
          {/* Text */}
          <div className="order-2 flex flex-col gap-5 md:order-1">
            <h3 className="text-xl font-extrabold tracking-tight text-shade-on md:text-2xl md:leading-[38px]">
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
              className="self-start rounded-full px-0 py-0 text-indigo-200 hover:text-indigo-100"
            >
              Create Takeoff →
            </button>
          </div>
          {/* Image card (bar chart) */}
          <div className="order-1 relative overflow-hidden rounded-3xl border border-white/10 bg-[#081534] md:order-2">
            <img
              alt=""
              className="pointer-events-none block h-full w-full select-none mix-blend-luminosity"
              src="https://www.figma.com/api/mcp/asset/9f9f7f40-5cea-4525-869b-65640e2635fb"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
