import { useEffect, useState } from "react"
import { EMAIL, EMAIL_URL, RESUME_URL } from "@/data/projects"

export default function ContactPage() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.title = "Contact — Shaksham Sinha"
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: the address is on screen and selectable.
    }
  }

  return (
    <main className="standalone-page contact-page">
      <div className="wrap">
        <h1 className="display page-title">Let’s Work Together</h1>
        <p className="contact-lead muted">
          I am currently seeking internship opportunities where I can contribute, learn, and grow while adding value
          through thoughtful and impactful design.
        </p>

        <dl className="contact-list">
          <div className="contact-row">
            <dt>Email</dt>
            <dd>
              <a className="contact-value" href={EMAIL_URL}>{EMAIL}</a>
              <div className="actions">
                <a className="btn btn-primary" href={EMAIL_URL}>Email me</a>
                <button type="button" className="btn btn-secondary" onClick={copy}>
                  {copied ? "Copied" : "Copy email"}
                </button>
              </div>
              <span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span>
            </dd>
          </div>
          <div className="contact-row">
            <dt>Resume</dt>
            <dd>
              <a className="btn btn-secondary" href={RESUME_URL}>View resume</a>
            </dd>
          </div>
          <div className="contact-row">
            <dt>Based in</dt>
            <dd className="contact-value">Mumbai, India · NIFT Mumbai</dd>
          </div>
          <div className="contact-row">
            <dt>Open to</dt>
            <dd className="contact-value">UI/UX internships</dd>
          </div>
        </dl>
      </div>
    </main>
  )
}
