"use client";

import {
    motion,
    useTransform,
    useReducedMotion,
    useMotionValue,
    useSpring,
    useScroll,
    MotionValue,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/*
 * Perspective tunnel hero (based on the 21st.dev component).
 * Changes from the original:
 *  - Progress follows normal page scroll (sticky section), so it works with
 *    mouse wheel, trackpad, touch and keyboard, and the page can be scrolled
 *    past the hero. The original captured every wheel event inside the hero,
 *    which trapped visitors there and did nothing on phones.
 *  - Images, eyebrow, title, subtitle and actions come from props.
 *  - Cards can link somewhere; invisible cards don't catch clicks.
 *  - Reduced motion: no scroll-driven flight, cards rest in place.
 */

export interface TunnelImage {
    src: string;
    title: string;
    href?: string;
}

const DEFAULT_IMAGES: TunnelImage[] = [
    { src: "https://cdn.21st.dev/assets/mirror/c3/c3fbd2afa140223999a441b32ed986f61d473930002708df805a81532a326aac.jpg", title: "Chroma I" },
    { src: "https://cdn.21st.dev/assets/mirror/9d/9d8b2f675a5814476ada3736ce439bcda23c5c389e0ebf9b25d8a0c09f3bbcfe.jpg", title: "Prism III" },
    { src: "https://cdn.21st.dev/assets/mirror/8b/8bb738bf2f00d7f7ed3c3ec034adb9938ad38f4be4ac191d632a6a11ad525574.jpg", title: "Ether IV" },
    { src: "https://cdn.21st.dev/assets/mirror/ac/ac5ac700b188d7ef16ee9dab868098b59f15c440db3f71d4e8c03262a3287577.jpg", title: "Quantum V" },
    { src: "https://cdn.21st.dev/assets/mirror/ef/ef25eff6ce655fba459b3b7e7711524dc92499aa18f6c7dbea9a0fcc56a8f908.jpg", title: "Nebula VI" },
    { src: "https://cdn.21st.dev/assets/mirror/f2/f28b370a5dcbf76240f1504579c4b05fc0ff0bb990a42aff8dc2f73a5dc46072.jpg", title: "Cyber VII" },
];

interface TunnelCardData {
    item: TunnelImage;
    angleCos: number;
    angleSin: number;
    radiusFactorX: number;
    radiusFactorY: number;
    rotationZ: number;
    index: number;
}

function buildCards(images: TunnelImage[]): TunnelCardData[] {
    return images.map((item, i) => {
        const goldenAngle = i * 137.5 * (Math.PI / 180);
        return {
            item,
            angleCos: Math.cos(goldenAngle),
            angleSin: Math.sin(goldenAngle),
            radiusFactorX: 0.28 + (i % 3) * 0.08,
            radiusFactorY: 0.26 + (i % 2) * 0.09,
            rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
            index: i,
        };
    });
}

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
    width: number;
    height: number;
    isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SPRING_CONFIG);
    const y = useSpring(rawY, SPRING_CONFIG);

    useEffect(() => {
        if (!enabled) return;
        const onMove = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
            rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [enabled, rawX, rawY]);

    return { x, y };
}

interface TunnelCardProps {
    card: TunnelCardData;
    progress: MotionValue<number>;
    pointer: { x: MotionValue<number>; y: MotionValue<number> };
    total: number;
    stage: StageDimensions;
}

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
    const staggerSpan = 0.55;
    const start = (card.index / total) * (1 - staggerSpan);
    const end = start + staggerSpan;

    const localProgress = useTransform(progress, [start, end], [0, 1]);

    const farZ = stage.isMobile ? -1200 : -1700;
    const nearZ = stage.isMobile ? 350 : 500;
    const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

    const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);
    const pointerEvents = useTransform(opacity, (o) => (o > 0.6 ? "auto" : "none"));

    const cardWidth = stage.isMobile
        ? Math.max(150, Math.min(220, stage.width * 0.48))
        : Math.max(220, Math.min(340, stage.width * 0.22));

    const baseX = card.angleCos * (stage.width * card.radiusFactorX);
    const baseY = card.angleSin * (stage.height * card.radiusFactorY);
    const panStrength = stage.isMobile ? 20 : 45;

    const transform = useTransform(
        [z, pointer.x, pointer.y],
        ([currZ, px, py]: number[]) => {
            const offsetX = baseX - px * panStrength;
            const offsetY = baseY - py * panStrength;
            return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
        }
    );

    const inner = (
        <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl shadow-black/90 ring-1 ring-white/15 transition-all duration-500 hover:ring-[#d1e1e8]/70">
            <img
                src={card.item.src}
                alt=""
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 sm:p-5">
                <span className="font-mono text-xs uppercase tracking-widest text-white/95 drop-shadow-md sm:text-sm">
                    {card.item.title}
                </span>
            </div>
        </div>
    );

    return (
        <motion.div
            style={{ width: cardWidth, transform, opacity, pointerEvents, zIndex: card.index + 1 }}
            className="absolute left-1/2 top-1/2 aspect-[4/3] select-none will-change-transform"
        >
            {card.item.href ? (
                <a
                    href={card.item.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${card.item.title} (opens in a new tab)`}
                    className="block h-full w-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d1e1e8]"
                >
                    {inner}
                </a>
            ) : (
                inner
            )}
        </motion.div>
    );
}

export interface PerspectiveTunnelHeroProps {
    images?: TunnelImage[];
    eyebrow?: ReactNode;
    title?: ReactNode;
    subtitle?: ReactNode;
    actions?: ReactNode;
    scrollPrompt?: string;
}

export default function PerspectiveTunnelHero({
    images = DEFAULT_IMAGES,
    eyebrow = "Warp Drive Sequence",
    title = (
        <>
            INTO THE
            <br />
            ETHER.
        </>
    ),
    subtitle = "Scroll to fly through the spatial 3D corridor.",
    actions,
    scrollPrompt = "Scroll to Explore",
}: PerspectiveTunnelHeroProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();
    const cards = useMemo(() => buildCards(images), [images]);

    const [stage, setStage] = useState<StageDimensions>({ width: 1440, height: 900, isMobile: false });

    useEffect(() => {
        const updateDimensions = () =>
            setStage({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth < 768,
            });
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // Progress = how far the page has scrolled through this (tall) section.
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.0001 });
    const staticProgress = useMotionValue(0.45);
    const progress = reduce ? staticProgress : smoothProgress;

    const pointer = useCameraParallax(!reduce);

    const titleScale = useTransform(progress, [0, 0.5, 1], [0.85, 1, 1.25]);
    const titleOpacity = useTransform(progress, [0, 0.85, 1], [1, 1, 0]);
    const promptOpacity = useTransform(progress, [0, 0.08], [1, 0]);

    return (
        <section
            ref={sectionRef}
            aria-label="Introduction"
            className={reduce ? "relative h-[100svh]" : "relative h-[320svh]"}
        >
            <div
                className="sticky top-0 flex h-[100svh] w-full select-none items-center justify-center overflow-hidden bg-[#111111] text-white"
                style={{ perspective: stage.isMobile ? "900px" : "1200px", transformStyle: "preserve-3d" }}
            >
                {/* Background grid & glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#2a2f36_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] opacity-70" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(209,225,232,0.10)_0%,transparent_70%)]" />

                {/* Depth ring guides */}
                <div className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-[#d1e1e8]/15" />
                <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-white/10" />

                {/* Central typography */}
                <motion.div
                    style={{ scale: titleScale, opacity: titleOpacity }}
                    className="relative z-0 flex max-w-3xl flex-col items-center px-6 text-center"
                >
                    {eyebrow && (
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#d1e1e8] sm:text-sm">{eyebrow}</p>
                    )}
                    <h1 className="font-[Anton,Impact,sans-serif] text-5xl uppercase leading-[0.95] tracking-[0.01em] text-white sm:text-7xl md:text-8xl">
                        {title}
                    </h1>
                    {subtitle && <p className="mt-5 max-w-[42ch] text-base text-white/70 sm:text-lg">{subtitle}</p>}
                    {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
                </motion.div>

                {/* Scroll prompt */}
                {!reduce && (
                    <motion.div
                        aria-hidden="true"
                        style={{ opacity: promptOpacity }}
                        className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-white/60"
                    >
                        <span>{scrollPrompt}</span>
                        <div className="h-6 w-px bg-gradient-to-b from-[#d1e1e8] to-transparent" />
                    </motion.div>
                )}

                {/* 3D Z-space plane */}
                <div className="pointer-events-none absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                    {cards.map((card) => (
                        <TunnelCard
                            key={card.item.src}
                            card={card}
                            progress={progress}
                            pointer={pointer}
                            total={cards.length}
                            stage={stage}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
