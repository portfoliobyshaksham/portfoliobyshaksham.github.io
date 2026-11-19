import { useEffect } from "react"
import { Component as HorizonHeroSection, type HorizonSection } from "@/components/ui/horizon-hero-section"
import { PROJECTS, projectUrl } from "@/data/projects"

// Each project becomes one scroll section of the Horizon scene.
const SECTIONS: HorizonSection[] = PROJECTS.map((p, i) => ({
  id: p.slug,
  eyebrow: `${String(i + 1).padStart(2, "0")} — ${p.meta[0]?.value ?? ""}`,
  title: p.title,
  tags: p.tags,
  body: p.summary,
  image: { src: p.cover.src, width: p.cover.width, height: p.cover.height, alt: p.cover.alt },
  href: projectUrl(p),
  cta: "View project",
}))

export default function WorkPage() {
  useEffect(() => {
    document.title = "Work — Shaksham Sinha"
  }, [])

  return (
    <main>
      <HorizonHeroSection
        title="WORK"
        subtitle={["UI/UX, branding, packaging", "and graphic design — scroll through"]}
        sections={SECTIONS}
      />
    </main>
  )
}
