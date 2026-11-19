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
writeFileSync(join(root, "404.html"), html)

// Remove build files from earlier builds that index.html no longer uses.
for (const f of readdirSync(join(root, "assets"))) {
  if (!html.includes(f)) rmSync(join(root, "assets", f))
}
console.log(`postbuild: wrote ${slugs.length} project pages:`, slugs.join(", "))
