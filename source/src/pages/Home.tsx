import DesignerHero from "@/components/ui/designer-hero"
import { HERO_APPS } from "@/data/apps"
import { EMAIL, EMAIL_URL, PROJECTS, RESUME_URL, projectUrl } from "@/data/projects"

const FEATURED = PROJECTS.filter((p) => p.slug === "dr-store" || p.slug === "ixigo-redesign")

export default function Home() {
  return (
    <main id="top">
      <DesignerHero
        words={["UI/UX", "Designer"]}
        person={{ src: "/images/hero-portrait-illustration.webp", width: 1000, height: 1167, alt: "Illustrated portrait of Shaksham Sinha smiling, in a varsity jacket" }}
        apps={HERO_APPS}
        intro={
          <>
            I'm <strong className="font-semibold text-white">Shaksham Sinha</strong>, a UI/UX designer studying Experience Design at NIFT Mumbai.
          </>
        }
        actions={
          <>
            <a className="btn btn-primary" href="/work/">View my work</a>
            <a className="btn btn-secondary" href={RESUME_URL}>Resume</a>
          </>
        }
      />

      {/* ABOUT (short) */}
      <section id="about-short" className="page-section about-short">
        <div className="wrap">
          <p className="about-short-label muted">About me</p>
          <h2 className="display">Designing experiences that move people.</h2>
          <p className="about-short-text muted">
            I'm an Experience Design student at NIFT Mumbai, focused on UI/UX — turning research and user insight into
            interfaces that are clear, useful and good to look at.
          </p>
          <a className="btn btn-secondary" href="/about/">More about me</a>
        </div>
      </section>

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
