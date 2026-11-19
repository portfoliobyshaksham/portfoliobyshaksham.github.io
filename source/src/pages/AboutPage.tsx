import { useEffect } from "react"
import { RESUME_URL } from "@/data/projects"

const SKILLS = "UI/UX Design, Graphic Design, User Research & Analysis, Wireframing & Prototyping, Video Editing"
const TOOLS = "Figma, Premiere Pro, Photoshop, Illustrator, AutoCAD"
const INTERESTS = "Fitness & active lifestyle, design & digital products, video editing, sports, content creation"

export default function AboutPage() {
  useEffect(() => {
    document.title = "About — Shaksham Sinha"
  }, [])

  return (
    <main className="standalone-page">
      <div className="wrap">
        <h1 className="display page-title">About</h1>
        <div className="about-grid">
          <div className="about-photo">
            <img src="/images/about.webp" width={900} height={1055} alt="Black and white portrait of Shaksham Sinha" />
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
    </main>
  )
}
