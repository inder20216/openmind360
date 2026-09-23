import { chromium } from 'playwright'
const BASE_URL = process.env.OPENMIND_BASE_URL || 'http://localhost:5173'
const label = process.argv[2]
const out = process.argv[3]
const width = +(process.argv[4] || 1280)
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
const dot = page.locator(`button[aria-label="Go to ${label}"]:visible`).first()
await dot.click()
await page.waitForTimeout(780)
const card = dot.locator('xpath=../..')
await card.screenshot({ path: out })
console.log('saved', out, errors.length ? errors : 'no errors')
await browser.close()
