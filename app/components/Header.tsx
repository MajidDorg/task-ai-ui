export default function Header() {
	return (
		<header className="w-full bg-[#0f172a]">
			<div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4 md:py-5">
				<div className="flex items-center gap-2 md:gap-4">
					<div className="flex items-center gap-2">
						<span className="text-shade-on text-base md:text-lg font-semibold">THE HANDOVER</span>
					</div>
					<span className="rounded-full border border-brand-30 px-2 py-1 text-xs font-semibold text-brand-30 md:px-3 md:py-1.5 md:text-sm">
						AI
					</span>
				</div>
				<button
					type="button"
					className="inline-flex items-center gap-2 rounded-full bg-success-60 px-3 py-1.5 text-sm font-bold text-white transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:px-5 md:py-3 md:text-lg"
				>
					<span>Sign Up</span>
					<span aria-hidden="true">→</span>
				</button>
			</div>
		</header>
	);
}


