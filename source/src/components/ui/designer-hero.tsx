"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Designer hero: a maroon perspective room, a huge warped title on the back
 * wall, the person cut out in front of it, and the apps they use. As the page
 * scrolls, the app tiles fly out from behind the person to their places.
 * Reduced motion: the tiles are simply shown in place.
 */

export interface HeroApp {
  name: string;
  /** Tile face: background, accent, and the glyph drawn on it. */
  bg: string;
  fg: string;
  glyph: ReactNode;
  /** Final position, as % of the stage from its centre (desktop / phone). */
  at: { x: number; y: number; r: number };
  atMobile: { x: number; y: number; r: number };
  /** Tile size in vmin. */
  size?: number;
}

export interface DesignerHeroProps {
  /** Words on the back wall, e.g. ["UI/UX", "DESIGNER"]. */
  words: string[];
  quotes?: [string, string];
  person: { src: string; width: number; height: number; alt: string };
  apps: HeroApp[];
  /** Name line and actions in the bottom-left corner. */
  intro?: ReactNode;
  actions?: ReactNode;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return mobile;
}

/** Perspective room: concentric frames and the four corner rays. */
function Room() {
  const frames = [0.18, 0.34, 0.52, 0.72, 0.94];
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g fill="none" stroke="rgba(255,236,226,0.10)" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
        {frames.map((f) => (
          <rect key={f} x={800 - 800 * f} y={450 - 450 * f} width={1600 * f} height={900 * f} vectorEffect="non-scaling-stroke" />
        ))}
        <path d="M0 0L656 369M1600 0L944 369M0 900L656 531M1600 900L944 531" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

function AppTile({
  app,
  index,
  total,
  progress,
  mobile,
}: {
  app: HeroApp;
  index: number;
  total: number;
  progress: MotionValue<number>;
  mobile: boolean;
}) {
  // Each tile has its own slice of the scroll, slightly staggered.
  const start = (index / total) * 0.35;
  const end = start + 0.5;
  const t = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const to = mobile ? app.atMobile : app.at;
  // Start hidden behind the chest, small and flat; end at its place.
  const from = { x: 0, y: mobile ? 20 : 8, r: 0 };

  const transform = useTransform(t, (v) => {
    const e = 1 - Math.pow(1 - v, 3); // ease out
    const x = from.x + (to.x - from.x) * e;
    const y = from.y + (to.y - from.y) * e;
    const r = from.r + (to.r - from.r) * e;
    const s = 0.35 + 0.65 * e;
    const tilt = (1 - e) * 35;
    return `translate(-50%, -50%) translate(${x}cqw, ${y}cqh) rotate(${r}deg) rotateY(${to.x > 0 ? -tilt : tilt}deg) scale(${s})`;
  });
  const opacity = useTransform(t, [0, 0.15, 1], [0, 1, 1]);
  const size = (mobile ? 1.5 : 1) * (app.size ?? 11);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{ transform, opacity, width: `${size}vmin`, height: `${size}vmin` }}
    >
      <div
        className="grid h-full w-full place-items-center rounded-[24%]"
        style={{
          background: `linear-gradient(160deg, color-mix(in srgb, ${app.bg} 78%, white) 0%, ${app.bg} 38%, color-mix(in srgb, ${app.bg} 80%, black) 100%)`,
          color: app.fg,
          boxShadow: `inset 0 2px 0 rgba(255,255,255,.25), inset 0 -4px 10px rgba(0,0,0,.45), 0 0 0 1px rgba(0,0,0,.35), 0 6px 0 color-mix(in srgb, ${app.bg} 55%, black), 0 22px 40px -10px rgba(0,0,0,.65)`,
        }}
      >
        <span className="sr-only">{app.name}</span>
        <span aria-hidden="true" className="flex h-[58%] w-[58%] items-center justify-center">
          {app.glyph}
        </span>
      </div>
    </motion.div>
  );
}

export default function DesignerHero({ words, quotes, person, apps, intro, actions }: DesignerHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mobile = useIsMobile();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.0005 });
  const done = useTransform(scrollYProgress, () => 1);
  const progress = reduce ? done : smooth;
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Letters grow taller towards the ends of the line, like a curved wall.
  const line = words.join(" ");
  const mid = (line.length - 1) / 2;
  let i = -1;

  return (
    <section ref={ref} aria-label="Introduction" className={reduce ? "relative h-[100svh]" : "relative h-[230svh]"}>
      <div
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
        style={{
          containerType: "size",
          background:
            "radial-gradient(ellipse 60% 55% at 50% 42%, #8a4a45 0%, #6b302d 38%, #431a1a 70%, #210b0c 100%)",
        }}
      >
        <Room />

        {/* Back wall title */}
        <h1
          aria-label={line}
          className="absolute inset-x-0 top-[calc(var(--nav-h)+2svh)] flex flex-col items-center font-[Anton,Impact,sans-serif] uppercase leading-none text-[#ecdccd] md:top-1/2 md:-translate-y-[55%] md:flex-row md:justify-center"
          style={{ textShadow: "0 10px 40px rgba(40,8,8,.45)" }}
        >
          {words.map((word, w) => (
            <span key={w} aria-hidden="true" className="flex md:mx-[1.2vw]">
              {word.split("").map((ch) => {
                i += 1;
                const d = Math.abs(i - mid) / mid; // 0 centre … 1 ends
                return (
                  <span
                    key={i}
                    className="inline-block origin-center text-[24vw] tracking-[-0.01em] md:text-[12.2vw] md:[transform:scaleY(var(--w))]"
                    style={{ ["--w" as string]: (0.72 + 0.62 * d * d).toFixed(3) }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Handwritten quotes */}
        {quotes && (
          <>
            <p className="pointer-events-none absolute left-[15%] top-[17%] hidden -rotate-[12deg] font-[Caveat,cursive] text-[clamp(20px,2.4vw,34px)] text-[#f3e3d6] md:block">
              “{quotes[0]}”
            </p>
            <p className="pointer-events-none absolute right-[20%] top-[21%] hidden -rotate-[10deg] font-[Caveat,cursive] text-[clamp(20px,2.4vw,34px)] text-[#f3e3d6] md:block">
              “{quotes[1]}”
            </p>
          </>
        )}

        {/* Apps: behind the person, flying out on scroll */}
        <div className="pointer-events-none absolute inset-0" style={{ containerType: "size", perspective: "900px" }}>
          {apps.map((app, n) => (
            <AppTile key={app.name} app={app} index={n} total={apps.length} progress={progress} mobile={mobile} />
          ))}
        </div>

        {/* The person */}
        <img
          src={person.src}
          width={person.width}
          height={person.height}
          alt={person.alt}
          fetchPriority="high"
          className="pointer-events-none absolute bottom-0 left-1/2 h-[50svh] w-auto max-w-none -translate-x-1/2 select-none md:h-[68svh]"
          draggable={false}
        />

        {/* Fade into the page below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22svh] bg-gradient-to-b from-transparent to-[#111111]" />

        {/* Name and actions */}
        {(intro || actions) && (
          <div className="absolute inset-x-0 bottom-6 z-10 md:inset-x-auto md:bottom-10 md:left-[max(32px,calc((100vw-1120px)/2+32px))]">
            <div className="mx-4 rounded-xl bg-[#111111]/85 p-4 ring-1 ring-white/10 md:mx-0 md:max-w-[280px] md:bg-transparent md:p-0 md:ring-0">
              {intro && <div className="text-[15px] text-white/80 md:text-base">{intro}</div>}
              {actions && <div className="mt-3 flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        )}

        {/* Scroll hint */}
        {!reduce && (
          <motion.p
            aria-hidden="true"
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute bottom-10 right-8 hidden text-sm text-white/70 md:block"
          >
            Scroll ↓
          </motion.p>
        )}
      </div>
    </section>
  );
}
