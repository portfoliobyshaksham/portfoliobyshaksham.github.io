import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { PROJECTS } from "@/data/projects"
import Home from "@/pages/Home"
import ProjectPage from "@/pages/ProjectPage"

// GitHub Pages serves a copy of index.html at /work/<slug>/ for each project
// (written by scripts/postbuild.mjs), so the path decides which page to show.
function findProject(pathname: string) {
  const match = pathname.match(/^\/work\/([^/]+)\/?$/)
  return match ? PROJECTS.find((p) => p.slug === match[1]) : undefined
}

export default function App() {
  const project = findProject(window.location.pathname)
  return (
    <>
      <SiteHeader onHome={!project} />
      {project ? <ProjectPage project={project} /> : <Home />}
      <SiteFooter />
    </>
  )
}
