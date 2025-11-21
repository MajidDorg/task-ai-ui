"use client";

export default function Hero() {
  return (
    <section className="w-full bg-[#0f172a]">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center px-4 py-16 md:px-28 md:py-24">
        <div className="flex max-w-3xl flex-col items-center gap-4 text-center md:gap-6">
          <h1 className="bg-linear-to-r from-[#ffffff] to-[#f0abfc] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent md:text-6xl md:leading-[68px]">
            Construction due diligence with AI
          </h1>
          <p className="text-balance text-base leading-relaxed text-shade-off md:text-xl">
            Use thehandover.ai to search and analyse your next project.
          </p>
        </div>

        <div className="mt-6 w-full max-w-3xl md:mt-12">
          <form
            className="rounded-[40px] border border-gray-200 bg-white p-3 md:p-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex items-center gap-3 pl-3 md:gap-4">
              <input
                type="text"
                placeholder="Ask me anything..."
                aria-label="Ask me anything"
                className="min-w-0 flex-1 bg-transparent text-lg leading-tight text-shade-off placeholder-gray-50 outline-none md:text-2xl"
              />
              <button
                type="submit"
                className="rounded-full bg-success-60 px-4 py-2 text-white transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-60/30 md:px-5 md:py-2.5"
                aria-label="Run"
              >
                <span aria-hidden="true">✨</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
