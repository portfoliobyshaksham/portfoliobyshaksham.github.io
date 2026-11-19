import PerspectiveTunnelHero, { type TunnelImage } from "@/components/ui/perspective-tunnel-hero"

const RESUME_URL = "https://drive.google.com/file/d/1xlX3Wh7KpKa_moqOkYJOUhswoQJEEb5A/view?usp=drive_link"
const EMAIL_URL = "mailto:sinhashaksham9431@gmail.com?subject=Hello"

interface Project {
  title: string
  tags: string
  image: string
  width: number
  height: number
  alt: string
  href: string
  linkLabel: string
}

const PROJECTS: Project[] = [
  {
    title: "Dr. Store",
    tags: "UI/UX · Branding · Product Design",
    image: "/images/drstore.webp", width: 1200, height: 675,
    alt: "Dr. Store app case study cover",
    href: "https://drive.google.com/file/d/1_-ogJS4lbI5pF7h7RkDEV_5OA2K3IybX/view?usp=drivesdk",
    linkLabel: "Case study",
  },
  {
    title: "ixigo Redesign",
    tags: "UI/UX · App Redesign",
    image: "/images/ixigo.webp", width: 1200, height: 800,
    alt: "ixigo app redesign cover",
    href: "https://www.figma.com/proto/1XzNJ0oUEDGNMuLQhyZEfF/IXIGO?page-id=0%3A1&node-id=91-23&viewport=-2551%2C377%2C0.17&t=64NAQJiVOYhchuSh-1&scaling=scale-down-width&content-scaling=fixed",
    linkLabel: "Prototype",
  },
  {
    title: "Muscle Mapping",
    tags: "UI/UX · Branding · Product Design",
    image: "/images/muscle.webp", width: 1200, height: 675,
    alt: "Muscle Mapping fitness app cover",
    href: "https://drive.google.com/file/d/1259_lz97Swq29Ea55ni6U6z1neoQwL_a/view?usp=drivesdk",
    linkLabel: "Case study",
  },
  {
    title: "Soap Packaging Redesign",
    tags: "Packaging · Branding",
    image: "/images/soap.webp", width: 1200, height: 675,
    alt: "Khadi Natural soap packaging redesign",
    href: "https://drive.google.com/file/d/1E7q0jF_65WvDmQOXcuDSMJo8iz4tY93p/view?usp=drivesdk",
    linkLabel: "View project",
  },
  {
    title: "SBD Utility Bag",
    tags: "Product Design · Branding",
    image: "/images/sbd.webp", width: 1200, height: 849,
    alt: "SBD Utility Bag product shot",
    href: "https://drive.google.com/file/d/1X2Y8M8Zc7_byN-4lSNblnY2cqC1G9dWO/view?usp=drivesdk",
    linkLabel: "View project",
  },
  {
    title: "Graphic Design",
    tags: "Posters · Visual Design",
    image: "/images/graphic.webp", width: 1200, height: 675,
    alt: "Graphic design portfolio cover with posters",
    href: "https://drive.google.com/file/d/1EB2kexot7Pgr5Qbyrlp4JR9pzZyk9wpa/view?usp=drivesdk",
    linkLabel: "View portfolio",
  },
]

// Cards that fly through the hero tunnel: every project plus two portraits.
const TUNNEL_IMAGES: TunnelImage[] = [
  { src: "/images/hero.webp", title: "Shaksham Sinha" },
  ...PROJECTS.slice(0, 3).map((p) => ({ src: p.image, title: p.title, href: p.href })),
  { src: "/images/about.webp", title: "Design / Fitness" },
  ...PROJECTS.slice(3).map((p) => ({ src: p.image, title: p.title, href: p.href })),
]

const SKILLS = ["UI/UX Design", "Graphic Design", "User Research & Analysis", "Wireframing & Prototyping", "Video Editing"]
const TOOLS = ["Figma", "Premiere Pro", "Photoshop", "Illustrator", "AutoCAD"]
const INTERESTS = ["Fitness & active lifestyle", "Design & digital products", "Video editing", "Sports", "Content creation"]

function Chips({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="chips" aria-label={label}>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  )
}

export default function App() {
  return (
    <>
      <header>
        <nav className="wrap" aria-label="Main">
          <a className="logo" href="#top">SHAKSHAM</a>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

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
              Meet <strong className="font-semibold text-white">Shaksham Sinha</strong> — B.Des Experience Design, NIFT Mumbai.
              UI / UX · Video Editing · Branding.
            </>
          }
          actions={
            <>
              <a className="btn btn-primary" href="#work">View my work</a>
              <a className="btn btn-secondary" href={RESUME_URL} target="_blank" rel="noopener">Download resume</a>
            </>
          }
          scrollPrompt="Scroll to explore"
        />

        {/* ABOUT */}
        <section id="about" className="page-section">
          <div className="wrap">
            <div className="section-num"><span className="label">01.</span><span className="label muted">(About Me)</span></div>
            <h2 className="display">About Me</h2>
            <div className="about-grid">
              <div className="about-photo">
                <img src="/images/about.webp" width={900} height={1055} alt="Black and white portrait of Shaksham Sinha" loading="lazy" />
              </div>
              <div>
                <div className="bio">
                  <p>I am an Experience Design student at NIFT Mumbai with a strong interest in creating user-centric digital solutions. My academic journey has built a solid foundation in design thinking, usability, and visual communication.</p>
                  <p className="muted">I focus on combining functionality with aesthetics to create meaningful user experiences. Alongside design, my involvement in sports and fitness has developed discipline, consistency, and a results-driven mindset, which I apply to meet deadlines, adapt quickly, and continuously improve.</p>
                </div>

                <div className="facts">
                  <div className="fact">
                    <span className="label">Education</span>
                    <p><strong>National Institute of Fashion Technology, Mumbai</strong>B.Des in Experience Design</p>
                    <a className="btn btn-secondary" href={RESUME_URL} target="_blank" rel="noopener">View resume</a>
                  </div>
                  <div className="fact">
                    <span className="label">Achievements</span>
                    <ul>
                      <li><strong>Sports Club President</strong>NIFT Mumbai (2026 – Present)</li>
                      <li><strong>Sports Club Secretary</strong>NIFT Mumbai (2025 – 2026)</li>
                      <li><strong>Team Head &amp; Event Coordinator</strong>NIFT International Conference</li>
                    </ul>
                  </div>
                  <div className="fact wide">
                    <span className="label">Skills</span>
                    <Chips items={SKILLS} label="Skills" />
                  </div>
                  <div className="fact">
                    <span className="label">Tools</span>
                    <Chips items={TOOLS} label="Tools" />
                  </div>
                  <div className="fact">
                    <span className="label">Interests</span>
                    <Chips items={INTERESTS} label="Interests" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="page-section">
          <div className="wrap">
            <div className="section-num"><span className="label">02.</span><span className="label muted">(Work)</span></div>
            <h2 className="display">Selected Work</h2>
            <div className="work-grid">
              {PROJECTS.map((p) => (
                <a key={p.title} className="project" href={p.href} target="_blank" rel="noopener">
                  <div className="thumb">
                    <img src={p.image} width={p.width} height={p.height} alt={p.alt} loading="lazy" />
                  </div>
                  <div className="info">
                    <div>
                      <h3>{p.title}</h3>
                      <p className="tags">{p.tags}</p>
                    </div>
                    <span className="open">{p.linkLabel} ↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="page-section contact">
          <div className="wrap">
            <div className="section-num" style={{ justifyContent: "center" }}>
              <span className="label">03.</span><span className="label muted">(Contact me)</span>
            </div>
            <h2 className="display">Let’s Work Together</h2>
            <p className="muted">I am currently seeking internship opportunities where I can contribute, learn, and grow while adding value through thoughtful and impactful design.</p>
            <div className="actions">
              <a className="btn btn-primary" href={EMAIL_URL}>Contact now</a>
              <a className="btn btn-secondary" href={RESUME_URL} target="_blank" rel="noopener">Download resume</a>
            </div>
            <a className="email" href={EMAIL_URL}>sinhashaksham9431@gmail.com</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>© {new Date().getFullYear()} Shaksham Sinha</span>
          <span>UI / UX · Video Editing · Branding</span>
        </div>
      </footer>
    </>
  )
}
