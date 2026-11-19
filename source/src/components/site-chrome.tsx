/** Global navigation (fixed to the top) and footer, shared by every page. */
export function SiteHeader({ onHome }: { onHome: boolean }) {
  // On the home page, links jump within the page; elsewhere they go back to it.
  const base = onHome ? "" : "/"
  return (
    <header className="site-header">
      <nav className="wrap" aria-label="Main">
        <a className="logo" href={onHome ? "#top" : "/"}>SHAKSHAM</a>
        <ul>
          <li><a href={`${base}#work`}>Work</a></li>
          <li><a href={`${base}#about`}>About</a></li>
          <li><a href={`${base}#contact`}>Contact</a></li>
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
