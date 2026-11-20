// GitHub Pages has no server-side routing, so give every project its own
// folder with a copy of index.html: /work/<slug>/index.html.
import { mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..")
const html = readFileSync(join(root, "index.html"), "utf8")
const src = readFileSync(join(root, "source", "src", "data", "projects.ts"), "utf8")
const slugs = [...src.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1])

rmSync(join(root, "work"), { recursive: true, force: true })
for (const slug of slugs) {
  mkdirSync(join(root, "work", slug), { recursive: true })
  writeFileSync(join(root, "work", slug, "index.html"), html)
}
for (const page of ["work", "about", "contact"]) {
  mkdirSync(join(root, page), { recursive: true })
  writeFileSync(join(root, page, "index.html"), html)
}
writeFileSync(join(root, "404.html"), html)

// Remove build files from earlier builds. Keep everything index.html uses,
// plus files those scripts load later (e.g. the lazily loaded Work page).
const assetsDir = join(root, "assets")
const files = readdirSync(assetsDir)
const keep = new Set(files.filter((f) => html.includes(f)))
for (let changed = true; changed; ) {
  changed = false
  for (const k of [...keep]) {
    if (!k.endsWith(".js")) continue
    const code = readFileSync(join(assetsDir, k), "utf8")
    for (const f of files) if (!keep.has(f) && code.includes(f)) { keep.add(f); changed = true }
  }
}
for (const f of files) if (!keep.has(f)) rmSync(join(assetsDir, f))
console.log(`postbuild: wrote /work/, /about/, /contact/ and ${slugs.length} project pages:`, slugs.join(", "))
