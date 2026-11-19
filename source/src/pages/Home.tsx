import PerspectiveTunnelHero, { type TunnelImage } from "@/components/ui/perspective-tunnel-hero"
import { EMAIL, EMAIL_URL, PROJECTS, RESUME_URL, projectUrl } from "@/data/projects"

// Cards that fly through the hero tunnel: every project plus two portraits.
const TUNNEL_IMAGES: TunnelImage[] = [
  { src: "/images/hero.webp", title: "Shaksham Sinha" },
  ...PROJECTS.slice(0, 3).map((p) => ({ src: p.cover.src, title: p.title, href: projectUrl(p) })),
  { src: "/images/about.webp", title: "Design / Fitness" },
  ...PROJECTS.slice(3).map((p) => ({ src: p.cover.src, title: p.title, href: projectUrl(p) })),
]

const SKILLS = "UI/UX Design, Graphic Design, User Research & Analysis, Wireframing & Prototyping, Video Editing"
const TOOLS = "Figma, Premiere Pro, Photoshop, Illustrator, AutoCAD"
const INTERESTS = "Fitness & active lifestyle, design & digital products, video editing, sports, content creation"

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
            <a className="btn btn-primary" href="#work">View my work</a>
            <a className="btn btn-secondary" href={RESUME_URL}>Resume</a>
          </>
        }
        scrollPrompt="Scroll"
      />

      {/* WORK */}
      <section id="work" className="page-section">
        <div className="wrap">
          <h2 className="display">Work</h2>
          <div className="work-grid">
            {PROJECTS.map((p) => (
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

      {/* ABOUT */}
      <section id="about" className="page-section">
        <div className="wrap">
          <h2 className="display">About</h2>
          <div className="about-grid">
            <div className="about-photo">
              <img src="/images/about.webp" width={900} height={1055} alt="Black and white portrait of Shaksham Sinha" loading="lazy" />
            </div>
            <div>
              <div className="bio">
                <p>I am an Experience Design student at NIFT Mumbai with a strong interest in creating user-centric digital solutions. My academic journey has built a solid foundation in design thinking, usability, and visual communication.</p>
                <p className="muted">I focus on combining functionality with aesthetics to create meaningful user experiences. Alongside design, my involvement in sports and fitness has developed discipline, consistency, and a results-driven mindset, which I apply to meet deadlines, adapt quickly, and continuously improve.</p>
              </div>

              <dl className="facts">
                <div className="fact">
                  <dt>Education</dt>
                  <dd>
                    National Institute of Fashion Technology, Mumbai
                    <div className="sub">B.Des in Experience Design</div>
                    <a className="btn btn-secondary" href={RESUME_URL}>View resume</a>
                  </dd>
                </div>
                <div className="fact">
                  <dt>Achievements</dt>
                  <dd>
                    <ul>
                      <li>Sports Club President, NIFT Mumbai <span className="sub">(2026 – present)</span></li>
                      <li>Sports Club Secretary, NIFT Mumbai <span className="sub">(2025 – 2026)</span></li>
                      <li>Team Head &amp; Event Coordinator, NIFT International Conference</li>
                    </ul>
                  </dd>
                </div>
                <div className="fact">
                  <dt>Skills</dt>
                  <dd>{SKILLS}</dd>
                </div>
                <div className="fact">
                  <dt>Tools</dt>
                  <dd>{TOOLS}</dd>
                </div>
                <div className="fact">
                  <dt>Interests</dt>
                  <dd>{INTERESTS}</dd>
                </div>
              </dl>
            </div>
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
