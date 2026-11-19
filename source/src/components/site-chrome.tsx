export type Route = "home" | "work" | "about" | "project"

/** Global navigation (fixed to the top) and footer, shared by every page. */
export function SiteHeader({ route }: { route: Route }) {
  const current = (r: Route[]) => (r.includes(route) ? "page" : undefined)
  return (
    <header className="site-header">
      <nav className="wrap" aria-label="Main">
        <a className="logo" href={route === "home" ? "#top" : "/"}>SHAKSHAM</a>
        <ul>
          <li><a href="/work/" aria-current={current(["work", "project"])}>Work</a></li>
          <li><a href="/about/" aria-current={current(["about"])}>About</a></li>
          <li><a href={route === "home" ? "#contact" : "/#contact"}>Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap">© {new Date().getFullYear()} Shaksham Sinha</div>
    </footer>
  )
}
