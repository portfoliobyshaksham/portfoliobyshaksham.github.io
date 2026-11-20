import pageSizes from "./pages.json"

export const RESUME_URL = "/shaksham-sinha-resume-nov-2026.pdf"
export const EMAIL = "sinhashaksham9431@gmail.com"
export const EMAIL_URL = `mailto:${EMAIL}?subject=Hello`

export interface ProjectPageImage {
  src: string
  width: number
  height: number
}

export interface Project {
  slug: string
  title: string
  tags: string
  cover: { src: string; width: number; height: number; alt: string }
  summary: string
  meta: { label: string; value: string }[]
  /** Buttons shown under the description, e.g. Figma prototypes. */
  links?: { label: string; href: string }[]
  /** Case-study pages rendered as images (from the original PDF). */
  pages: ProjectPageImage[]
  /** Interactive Figma prototype, embedded on the page. */
  figmaEmbed?: string
}

const sizes: Record<string, number[][]> = pageSizes

function pagesFor(slug: string): ProjectPageImage[] {
  return (sizes[slug] ?? []).map(([width, height], i) => ({
    src: `/projects/${slug}/${String(i + 1).padStart(2, "0")}.webp`,
    width,
    height,
  }))
}

export const PROJECTS: Project[] = [
  {
    slug: "dr-store",
    title: "Dr. Store",
    tags: "UI/UX · Branding · Product Design",
    cover: { src: "/images/drstore.webp", width: 1200, height: 675, alt: "Dr. Store app case study cover" },
    summary:
      "An eight-week industry internship: two healthcare platforms, Dr Store and My Tracky, redesigned around one question — how do you make a body’s quiet signals legible without overwhelming the person reading them.",
    meta: [
      { label: "Type", value: "Industry internship" },
      { label: "Role", value: "UI/UX & Digital Product Design" },
      { label: "Duration", value: "8 weeks · 2026" },
    ],
    links: [
      {
        label: "Dr Store prototype",
        href: "https://www.figma.com/proto/kNtmYgn2wjABjx95UMcokW/internship?page-id=0%3A1&node-id=1016-10719&viewport=-16258%2C334%2C0.2&t=cAg316ngK69dXqXl-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1016%3A10719",
      },
      {
        label: "My Tracky prototype",
        href: "https://www.figma.com/proto/kNtmYgn2wjABjx95UMcokW/internship?page-id=0%3A1&node-id=556-6381&viewport=-7215%2C397%2C0.11&t=EuUoNWHxhntjyVmY-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=556%3A6381",
      },
    ],
    pages: pagesFor("drstore"),
  },
  {
    slug: "ixigo-redesign",
    title: "ixigo Redesign",
    tags: "UI/UX · App Redesign",
    cover: { src: "/images/ixigo.webp", width: 1200, height: 800, alt: "ixigo app redesign cover" },
    summary: "A redesign of the ixigo travel app.",
    meta: [
      { label: "Type", value: "App redesign" },
      { label: "Tool", value: "Figma" },
    ],
    pages: [],
  },
  {
    slug: "muscle-mapping",
    title: "Muscle Mapping",
    tags: "UI/UX · Branding · Product Design",
    cover: { src: "/images/muscle.webp", width: 1200, height: 675, alt: "Muscle Mapping fitness app cover" },
    summary:
      "A mobile app that connects travelling fitness enthusiasts to verified gyms in any city — with transparent pricing, real photos, equipment lists and instant day-pass booking.",
    meta: [
      { label: "Type", value: "UI/UX class assignment" },
      { label: "Platform", value: "iOS mobile app" },
      { label: "Tool", value: "Figma" },
    ],
    pages: pagesFor("muscle"),
  },
  {
    slug: "soap-packaging-redesign",
    title: "Soap Packaging Redesign",
    tags: "Packaging · Branding",
    cover: { src: "/images/soap.webp", width: 1200, height: 675, alt: "Khadi Natural soap packaging redesign" },
    summary:
      "Packaging for Khadi Natural that communicates the soul of the ingredient before the box is even opened — and lives on as a soap stand.",
    meta: [
      { label: "Brand", value: "Khadi Natural" },
      { label: "Scope", value: "Research, colour system, structure & material, dieline, prototype, product shoot" },
    ],
    pages: pagesFor("soap"),
  },
  {
    slug: "sbd-utility-bag",
    title: "SBD Utility Bag",
    tags: "Product Design · Branding",
    cover: { src: "/images/sbd.webp", width: 1200, height: 849, alt: "SBD Utility Bag product shot" },
    summary:
      "A rugged, functional carry system that organises and transports gym essentials, with dedicated compartments and external attachments for the whole SBD range.",
    meta: [
      { label: "Type", value: "Product design" },
      { label: "Direction", value: "Utility / carry" },
    ],
    pages: pagesFor("sbd"),
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    tags: "Posters · Visual Design",
    cover: { src: "/images/graphic.webp", width: 1200, height: 675, alt: "Graphic design portfolio cover with posters" },
    summary: "Five A4 posters across cultural, automotive, motivational, sports and film-concept briefs.",
    meta: [
      { label: "Type", value: "Graphic design" },
      { label: "Format", value: "5 works · A4" },
    ],
    pages: pagesFor("graphic"),
  },
]

export const projectUrl = (p: Project) => `/work/${p.slug}/`
