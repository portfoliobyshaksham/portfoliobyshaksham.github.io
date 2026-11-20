import { useEffect } from "react"
import { PROJECTS, projectUrl, type Project } from "@/data/projects"

export default function ProjectPage({ project }: { project: Project }) {
  const index = PROJECTS.findIndex((p) => p.slug === project.slug)
  const next = PROJECTS[(index + 1) % PROJECTS.length]

  useEffect(() => {
    document.title = `${project.title} — Shaksham Sinha`
  }, [project])

  return (
    <main className="project-page">
      <div className="wrap">
        <a className="back" href="/work/">← All work</a>

        <header className="project-head">
          <p className="tags">{project.tags}</p>
          <h1 className="display">{project.title}</h1>
          <p className="summary">{project.summary}</p>
          {project.links && project.links.length > 0 && (
            <div className="actions project-links">
              {project.links.map((l, i) => (
                <a
                  key={l.href}
                  className={i === 0 ? "btn btn-primary" : "btn btn-secondary"}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
          <dl className="project-meta">
            {project.meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        {project.figmaEmbed && (
          <div className="figma-embed">
            <iframe
              src={project.figmaEmbed}
              title={`${project.title} — interactive Figma prototype`}
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}

        {project.pages.length > 0 && (
          <div className={project.continuous ? "case-pages case-pages-continuous" : "case-pages"}>
            {project.pages.map((page, i) => (
              <img
                key={page.src}
                src={page.src}
                width={page.width}
                height={page.height}
                alt={`${project.title} case study, ${project.continuous ? "part" : "page"} ${i + 1} of ${project.pages.length}`}
                loading={i < 2 ? "eager" : "lazy"}
                decoding="async"
              />
            ))}
          </div>
        )}

        <nav className="next-project" aria-label="Next project">
          <span className="muted">Next project</span>
          <a href={projectUrl(next)}>
            <span className="display">{next.title}</span> →
          </a>
        </nav>
      </div>
    </main>
  )
}
