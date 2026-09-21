import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { routes, siteUrl } from './routes.mjs'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

function urlEntry({ path: routePath, changefreq, priority }) {
  const loc = routePath === '/' ? `${siteUrl}/` : `${siteUrl}${routePath}`
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
}

async function main() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(urlEntry).join('\n')}\n</urlset>\n`
  const outPath = path.join(root, 'dist', 'sitemap.xml')
  await writeFile(outPath, xml, 'utf-8')
  console.log(`Generated sitemap.xml with ${routes.length} URLs.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
