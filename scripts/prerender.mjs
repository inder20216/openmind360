import { build } from 'vite'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import { routes, siteUrl } from './routes.mjs'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const ssrOutDir = path.join(root, 'dist-ssr')

function applyMeta(template, route) {
  const url = route.path === '/' ? `${siteUrl}/` : `${siteUrl}${route.path}`
  return template
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${route.description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${route.title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${route.description}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${route.title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${route.description}$2`)
}

async function main() {
  // Bundle the server entry so it can run in plain Node
  await build({
    root,
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: 'dist-ssr',
      emptyOutDir: true,
    },
  })

  const { render } = await import(pathToFileURL(path.join(ssrOutDir, 'entry-server.js')))

  const indexPath = path.join(root, 'dist', 'index.html')
  const template = await readFile(indexPath, 'utf-8')

  for (const route of routes) {
    const appHtml = render(route.path)
    const html = applyMeta(template, route).replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

    const outPath = route.path === '/'
      ? indexPath
      : path.join(root, 'dist', route.path.replace(/^\//, ''), 'index.html')

    await mkdir(path.dirname(outPath), { recursive: true })
    await writeFile(outPath, html, 'utf-8')
  }

  await rm(ssrOutDir, { recursive: true, force: true })

  console.log(`Prerendered ${routes.length} routes with per-page title/meta for crawlers.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
