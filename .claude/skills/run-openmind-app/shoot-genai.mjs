import { chromium } from 'playwright'

const BASE_URL = process.env.OPENMIND_BASE_URL || 'http://localhost:5175'
const out = process.argv[2] || 'genai-out.png'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' })
// index 1 (gen-ai) is on screen from ~3.5s to ~7s
await page.waitForTimeout(4600)
await page.screenshot({ path: out })
console.log('Screenshot saved:', out)
await browser.close()