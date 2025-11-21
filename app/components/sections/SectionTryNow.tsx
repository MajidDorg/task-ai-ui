export default function SectionTryNow() {
	return (
		<section className="w-full bg-white">
			<div className="mx-auto max-w-7xl px-4 py-16 text-center md:px-28 md:py-24">
				<h2
					className="bg-clip-text bg-center bg-no-repeat bg-cover text-3xl font-extrabold tracking-tight text-transparent md:text-6xl md:leading-[68px]"
					style={{
						backgroundImage:
							"url('https://www.figma.com/api/mcp/asset/d99ba919-f5d8-4839-8968-2692620093d6')",
					}}
				>
					Try Now!
				</h2>
				<p className="mx-auto mt-3 max-w-2xl text-2xl leading-[1.6] text-shade-off">
					the #1 AI app for homebuilders
				</p>
				<div className="mt-10 flex justify-center">
					<button
						type="button"
						className="relative inline-flex items-center gap-3 rounded-full bg-slate-50 px-8 py-4 font-bold text-slate-600 shadow-[0_0_60px_0_rgba(240,171,252,0.35)] transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-30/40 md:px-10 md:py-5 md:text-xl"
					>
						<span aria-hidden="true">✨</span>
						Start Chat
					</button>
				</div>
			</div>
		</section>
	);
}


