"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	container?: Element | string | null;
	distance?: number;
	direction?: "vertical" | "horizontal";
	reverse?: boolean;
	duration?: number;
	ease?: string;
	initialOpacity?: number;
	animateOpacity?: boolean;
	scale?: number;
	threshold?: number;
	delay?: number;
	disappearAfter?: number;
	disappearDuration?: number;
	disappearEase?: string;
	onComplete?: () => void;
	onDisappearanceComplete?: () => void;
	playOnMount?: boolean;
	disableScrollTrigger?: boolean;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
	children,
	container,
	distance = 100,
	direction = "vertical",
	reverse = false,
	duration = 0.8,
	ease = "power3.out",
	initialOpacity = 0,
	animateOpacity = true,
	scale = 1,
	threshold = 0.1,
	delay = 0,
	disappearAfter = 0,
	disappearDuration = 0.5,
	disappearEase = "power3.in",
	onComplete,
	onDisappearanceComplete,
	className = "",
	playOnMount = true,
	disableScrollTrigger = false,
	...props
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const disappearTweenRef = useRef<gsap.core.Tween | null>(null);
	const isUnmountingRef = useRef(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		let scrollerTarget: Element | string | null =
			container || document.getElementById("snap-main-container") || null;

		if (typeof scrollerTarget === "string") {
			scrollerTarget = document.querySelector(scrollerTarget);
		}

		const axis = direction === "horizontal" ? "x" : "y";
		const offset = reverse ? -distance : distance;
		const startPct = (1 - threshold) * 100;

		gsap.set(el, {
			[axis]: offset,
			scale,
			opacity: animateOpacity ? initialOpacity : 1,
			visibility: "visible",
		} as any);

		const tl = gsap.timeline({
			paused: true,
			delay,
			onComplete: () => {
				onComplete?.();
				if (disappearAfter > 0) {
					disappearTweenRef.current = gsap.to(el, {
						[axis]: reverse ? distance : -distance,
						scale: 0.98,
						opacity: animateOpacity ? initialOpacity : 0,
						delay: disappearAfter,
						duration: disappearDuration,
						ease: disappearEase,
						onComplete: () => {
							if (!isUnmountingRef.current) {
								onDisappearanceComplete?.();
							}
						},
					} as any);
				}
			},
		});

		tl.to(el, {
			[axis]: 0,
			scale: 1,
			opacity: 1,
			duration,
			ease,
		} as any);

		let st: ScrollTrigger | null = null;
		if (!disableScrollTrigger) {
			st = ScrollTrigger.create({
				trigger: el,
				scroller: (scrollerTarget as Element) || window,
				start: `top ${startPct}%`,
				once: true,
				onEnter: () => tl.play(),
			});
		}

		// Ensure animation also runs when already in view (e.g., repeated mounts)
		if (playOnMount) {
			// Play on next frame to allow initial gsap.set to apply
			requestAnimationFrame(() => tl.play());
		}

		return () => {
			isUnmountingRef.current = true;
			// Kill any pending delayed disappearance tween to avoid late callbacks
			disappearTweenRef.current?.kill();
			disappearTweenRef.current = null;
			st?.kill();
			tl.kill();
		};
	}, [
		container,
		distance,
		direction,
		reverse,
		duration,
		ease,
		initialOpacity,
		animateOpacity,
		scale,
		threshold,
		delay,
		disappearAfter,
		disappearDuration,
		disappearEase,
		onComplete,
		onDisappearanceComplete,
		playOnMount,
		disableScrollTrigger,
	]);

	return (
		<div ref={ref} className={`invisible ${className}`} {...props}>
			{children}
		</div>
	);
};

export default AnimatedContent;


