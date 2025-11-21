export default function SectionTryNow() {
	return (
		<section className="w-full bg-[#0f172a]">
			<div className="mx-auto max-w-[1216px] px-4 py-24 text-center md:px-28">
				<h2
					className="bg-clip-text bg-center bg-no-repeat bg-cover text-3xl font-extrabold tracking-tight text-transparent md:text-6xl md:leading-[68px]"
					style={{
						backgroundImage:
							"url('https://www.figma.com/api/mcp/asset/d99ba919-f5d8-4839-8968-2692620093d6')",
					}}
				>
					Try Now!
				</h2>
				<p className="mx-auto mt-3 max-w-[765.131px] text-[16px] leading-[1.6] text-shade-off md:text-[32px]">
					the #1 AI app for homebuilders
				</p>
				<div className="relative mt-10 flex justify-center">
					{/* Glow under button (206x53, blurred, centered) */}
					<div className="absolute left-1/2 top-1/2 z-0 h-[53px] w-[206px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] opacity-[0.72] blur-[27px]" />
					<button
						type="button"
						className="relative z-[1] inline-flex h-[67.177px] items-center gap-3 rounded-[1472.206px] bg-slate-50 px-[28.633px] py-[19.089px] font-bold text-slate-600 transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-30/40 md:text-[21.47px]"
					>
						<span aria-hidden="true">✨</span>
						Start Chat
					</button>
				</div>
			</div>
		</section>
	);
}


