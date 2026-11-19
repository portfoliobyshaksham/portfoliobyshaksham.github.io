import PerspectiveTunnelHero, { type TunnelImage } from "@/components/ui/perspective-tunnel-hero"
import { EMAIL, EMAIL_URL, PROJECTS, RESUME_URL, projectUrl } from "@/data/projects"

const FEATURED = PROJECTS.filter((p) => p.slug === "dr-store" || p.slug === "ixigo-redesign")
const [drStore, ixigo] = FEATURED

// Cards that fly through the hero tunnel: the two featured projects
// (covers + Dr Store case-study slides) and two portraits.
const slide = (n: string) => `/projects/drstore/${n}.webp`
const TUNNEL_IMAGES: TunnelImage[] = [
  { src: "/images/hero.webp", title: "Shaksham Sinha" },
  { src: drStore.cover.src, title: drStore.title, href: projectUrl(drStore) },
  { src: slide("11"), title: "Dr Store — interactions", href: projectUrl(drStore) },
  { src: ixigo.cover.src, title: ixigo.title, href: projectUrl(ixigo) },
  { src: "/images/about.webp", title: "Shaksham Sinha" },
  { src: slide("14"), title: "Dr Store — components", href: projectUrl(drStore) },
  { src: slide("06"), title: "Dr Store — device register", href: projectUrl(drStore) },
  { src: slide("22"), title: "My Tracky — final design", href: projectUrl(drStore) },
]

export default function Home() {
  return (
    <main id="top">
      <PerspectiveTunnelHero
        images={TUNNEL_IMAGES}
        eyebrow="Design / Fitness Enthusiast"
        title={
          <>
            Designing Experiences
            <br />
            That Move People
          </>
        }
        subtitle={
          <>
            I'm <strong className="font-semibold text-white">Shaksham Sinha</strong>, an Experience Design student at NIFT Mumbai working in UI/UX, video editing and branding.
          </>
        }
        actions={
          <>
            <a className="btn btn-primary" href="/work/">View my work</a>
            <a className="btn btn-secondary" href={RESUME_URL}>Resume</a>
          </>
        }
        scrollPrompt="Scroll"
      />

      {/* FEATURED WORK */}
      <section id="featured" className="page-section">
        <div className="wrap">
          <div className="section-head">
            <h2 className="display">Featured Work</h2>
            <a className="btn btn-secondary" href="/work/">All projects</a>
          </div>
          <div className="work-grid">
            {FEATURED.map((p) => (
              <a key={p.slug} className="project" href={projectUrl(p)}>
                <img src={p.cover.src} width={p.cover.width} height={p.cover.height} alt={p.cover.alt} loading="lazy" />
                <div className="info">
                  <div>
                    <h3>{p.title}</h3>
                    <p className="tags">{p.tags}</p>
                  </div>
                  <span className="open">View project</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="page-section contact">
        <div className="wrap">
          <h2 className="display">Let’s Work Together</h2>
          <p className="muted">I am currently seeking internship opportunities where I can contribute, learn, and grow while adding value through thoughtful and impactful design.</p>
          <a className="btn btn-primary" href={EMAIL_URL}>Email me</a>
          <p className="address">{EMAIL}</p>
        </div>
      </section>
    </main>
  )
}
