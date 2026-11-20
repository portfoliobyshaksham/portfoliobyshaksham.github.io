import type { HeroApp } from "@/components/ui/designer-hero"

/** Two-letter app mark, drawn as SVG so it scales with the tile. */
const mark = (letters: string) => (
  <svg viewBox="0 0 100 100" className="h-full w-full">
    <text
      x="50"
      y="69"
      textAnchor="middle"
      fontFamily="Inter, system-ui, sans-serif"
      fontWeight="700"
      fontSize="54"
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
 * The apps Shaksham uses, as tiles in the home hero. `at` is the final spot
 * on desktop and `atMobile` on phones, in % of the hero from its centre.
 */
export const HERO_APPS: HeroApp[] = [
  { name: "Figma", bg: "#1e1e1e", fg: "#fff", glyph: figma, size: 12, at: { x: 37, y: -32, r: 9 }, atMobile: { x: -37, y: -36, r: -8 } },
  { name: "Photoshop", bg: "#001e36", fg: "#31a8ff", glyph: mark("Ps"), size: 13, at: { x: -27, y: 12, r: -12 }, atMobile: { x: 37, y: -36, r: 10 } },
  { name: "Illustrator", bg: "#330000", fg: "#ff9a00", glyph: mark("Ai"), size: 11, at: { x: 28, y: 15, r: 8 }, atMobile: { x: -38, y: -10, r: 8 } },
  { name: "After Effects", bg: "#00005b", fg: "#9999ff", glyph: mark("Ae"), size: 11, at: { x: -41, y: 15, r: 10 }, atMobile: { x: 38, y: -23, r: -9 } },
  { name: "Premiere Pro", bg: "#00005b", fg: "#9999ff", glyph: mark("Pr"), size: 11, at: { x: 39, y: 30, r: -10 }, atMobile: { x: 38, y: -10, r: 6 } },
  { name: "Lightroom", bg: "#001e36", fg: "#31a8ff", glyph: mark("Lr"), size: 9, at: { x: 25, y: 31, r: 6 }, atMobile: { x: -36, y: 3, r: -6 } },
  { name: "AutoCAD", bg: "#c4122f", fg: "#fff", glyph: mark("A"), size: 9, at: { x: -41, y: -12, r: -8 }, atMobile: { x: -38, y: -23, r: 4 } },
]
