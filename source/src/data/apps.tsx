import type { HeroApp } from "@/components/ui/designer-hero"

/** Letter mark, drawn as SVG so it scales with the tile. */
const mark = (letters: string, size = 54) => (
  <svg viewBox="0 0 100 100" className="h-full w-full">
    <text
      x="50"
      y={50 + size * 0.35}
      textAnchor="middle"
      fontFamily="Inter, system-ui, sans-serif"
      fontWeight="700"
      fontSize={size}
      fill="currentColor"
    >
      {letters}
    </text>
  </svg>
)

const figma = (
  <svg viewBox="0 0 38 57" className="h-[86%] w-[86%]">
    <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
    <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
    <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
    <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
    <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
  </svg>
)

/**
 * The apps Shaksham uses, as tiles in the home hero (each appears once).
 * `at` is the final spot on desktop and `atMobile` on phones, in % of the
 * hero from its centre.
 */
export const HERO_APPS: HeroApp[] = [
  { name: "Figma", bg: "#1e1e1e", fg: "#fff", glyph: figma, size: 12, at: { x: 37, y: -30, r: 9 }, atMobile: { x: -37, y: -36, r: -8 } },
  { name: "Photoshop", bg: "#001e36", fg: "#31a8ff", glyph: mark("Ps"), size: 12, at: { x: -30, y: 16, r: -12 }, atMobile: { x: 37, y: -36, r: 10 } },
  { name: "Claude", bg: "#d97757", fg: "#fff", image: "/images/apps/claude.webp", size: 10, at: { x: -24, y: -16, r: -6 }, atMobile: { x: -38, y: -23, r: 6 } },
  { name: "ChatGPT", bg: "#0d0d0d", fg: "#fff", image: "/images/apps/chatgpt.webp", size: 11, at: { x: -41, y: -10, r: 8 }, atMobile: { x: 38, y: -23, r: -8 } },
  { name: "Illustrator", bg: "#330000", fg: "#ff9a00", glyph: mark("Ai"), size: 11, at: { x: 31, y: 6, r: 8 }, atMobile: { x: -38, y: -10, r: 8 } },
  { name: "Premiere Pro", bg: "#00005b", fg: "#9999ff", glyph: mark("Pr"), size: 11, at: { x: 39, y: 30, r: -10 }, atMobile: { x: 38, y: -10, r: -6 } },
  { name: "Canva", bg: "#3b5bdb", fg: "#fff", image: "/images/apps/canva.webp", size: 10, at: { x: -42, y: 12, r: 10 }, atMobile: { x: -36, y: 3, r: -6 } },
  { name: "Pinterest", bg: "#ffffff", fg: "#e60023", image: "/images/apps/pinterest.webp", size: 10, at: { x: 22, y: -14, r: 6 }, atMobile: { x: 36, y: 3, r: 6 } },
]
