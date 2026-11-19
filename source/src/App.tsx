import { SiteFooter, SiteHeader, type Route } from "@/components/site-chrome"
import { PROJECTS } from "@/data/projects"
import AboutPage from "@/pages/AboutPage"
import Home from "@/pages/Home"
import ProjectPage from "@/pages/ProjectPage"
import WorkPage from "@/pages/WorkPage"

// GitHub Pages serves a copy of index.html at /work/, /about/ and
// /work/<slug>/ (written by scripts/postbuild.mjs); the path picks the page.
function resolve(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/"
  if (path === "/work") return { route: "work" as Route }
  if (path === "/about") return { route: "about" as Route }
  const match = path.match(/^\/work\/([^/]+)$/)
  const project = match ? PROJECTS.find((p) => p.slug === match[1]) : undefined
  if (project) return { route: "project" as Route, project }
  return { route: "home" as Route }
}

export default function App() {
  const { route, project } = resolve(window.location.pathname)
  return (
    <>
      <SiteHeader route={route} />
      {route === "home" && <Home />}
      {route === "about" && <AboutPage />}
      {route === "work" && <WorkPage />}
      {route === "project" && project && <ProjectPage project={project} />}
      <SiteFooter />
    </>
  )
}
