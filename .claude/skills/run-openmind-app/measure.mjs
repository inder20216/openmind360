import { chromium } from 'playwright'

const BASE_URL = process.env.OPENMIND_BASE_URL || 'http://localhost:5175'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)
const data = await page.evaluate(() => {
  const rect = (el) => {
    const r = el.getBoundingClientRect()
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
  }
  const out = {}
  const all = Array.from(document.querySelectorAll('*'))
  out.purpleViews = all
    .filter((el) => getComputedStyle(el).backgroundColor === 'rgb(130, 115, 255)')
    .map((el) => ({ cls: el.className.slice(0, 70), rect: rect(el) }))

  // Grab the visible (desktop) card face container col
  const cols = Array.from(document.querySelectorAll('[class*="p-3"]'))
    .filter((el) => el.getBoundingClientRect().width > 100)
  out.col = cols.map((el) => ({
    rect: rect(el),
    children: Array.from(el.children).map((c) => ({
      text: (c.textContent || '').replace(/\s+/g, ' ').slice(0, 45),
      rect: rect(c),
    })),
  }))
  return out
})
console.log(JSON.stringify(data, null, 2))
await browser.close()