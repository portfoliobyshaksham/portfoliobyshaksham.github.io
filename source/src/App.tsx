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

const SKILLS = "UI/UX Design, Graphic Design, User Research & Analysis, Wireframing & Prototyping, Video Editing"
const TOOLS = "Figma, Premiere Pro, Photoshop, Illustrator, AutoCAD"
const INTERESTS = "Fitness & active lifestyle, design & digital products, video editing, sports, content creation"

export default function App() {
  return (
    <>
      <header className="site-header">
        <nav className="wrap" aria-label="Main">
          <a className="logo" href="#top">SHAKSHAM</a>
          <ul>
            <li><a href="#work">Work</a></li>
            <li><a href="#about">About</a></li>
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
              I'm <strong className="font-semibold text-white">Shaksham Sinha</strong>, an Experience Design student at NIFT Mumbai working in UI/UX, video editing and branding.
            </>
          }
          actions={
            <>
              <a className="btn btn-primary" href="#work">View my work</a>
              <a className="btn btn-secondary" href={RESUME_URL} target="_blank" rel="noopener">Resume</a>
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
                <a key={p.title} className="project" href={p.href} target="_blank" rel="noopener">
                  <img src={p.image} width={p.width} height={p.height} alt={p.alt} loading="lazy" />
                  <div className="info">
                    <div>
                      <h3>{p.title}</h3>
                      <p className="tags">{p.tags}</p>
                    </div>
                    <span className="open">{p.linkLabel}</span>
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
                      <a className="btn btn-secondary" href={RESUME_URL} target="_blank" rel="noopener">View resume</a>
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
            <p className="address">sinhashaksham9431@gmail.com</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">© {new Date().getFullYear()} Shaksham Sinha</div>
      </footer>
    </>
  )
}
