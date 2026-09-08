#!/usr/bin/env node
// Drives the running openmind-app dev server with Playwright.
// Run from anywhere; paths below are relative to this file.
//
// Usage:
//   node driver.mjs                         # full smoke run (default)
//   node driver.mjs goto <route> <out.png>  # visit one route, screenshot it
//   node driver.mjs eval <route> "<js>"     # visit a route, eval JS, print result
//
// Assumes the dev server is already running at BASE_URL (see SKILL.md for
// how to start it). This script does NOT start/stop the dev server itself,
// so repeated runs are fast (no rebuild/relaunch each time).

import { chromium } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE_URL = process.env.OPENMIND_BASE_URL || 'http://localhost:5173'
const SCREEN_DIR = path.join(__dirname, 'screenshots')

async function withBrowser(fn) {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  try {
    await fn(page)
  } finally {
    await browser.close()
  }
}

async function cmdGoto(route, outFile) {
  await withBrowser(async (page) => {
    await page.goto(BASE_URL + route, { waitUntil: 'networkidle' })
    const out = path.isAbsolute(outFile) ? outFile : path.join(SCREEN_DIR, outFile)
    await page.screenshot({ path: out, fullPage: false })
    console.log('Screenshot saved:', out)
  })
}

async function cmdEval(route, js) {
  await withBrowser(async (page) => {
    await page.goto(BASE_URL + route, { waitUntil: 'networkidle' })
    // eslint-disable-next-line no-eval
    const result = await page.evaluate(js)
    console.log(JSON.stringify(result, null, 2))
  })
}

// Default: a real end-to-end smoke pass over the actual running app -
// homepage loads, nav works, the live chatbot widget opens and its
// pre-chat form is interactable, a service page renders.
async function smoke() {
  await withBrowser(async (page) => {
    const errors = []
    page.on('pageerror', (e) => errors.push(String(e)))
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })

    console.log('-> GET /')
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' })
    await page.waitForSelector('text=Open Mind', { timeout: 10000 }).catch(() => {})
    await page.screenshot({ path: path.join(SCREEN_DIR, '01-home.png') })
    console.log('   Home loaded, screenshot saved')

    console.log('-> Open chatbot widget')
    const launcher = page.locator('button[aria-label="Talk to us"]').first()
    if (await launcher.count()) {
      await launcher.click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: path.join(SCREEN_DIR, '02-chat-widget-open.png') })
      console.log('   Chat widget opened, screenshot saved')

      // Scoped to the form containing "Your name" - the homepage's own
      // ContactForm also has a "Contact number" placeholder, so an
      // unscoped locator is ambiguous (hits both forms at once).
      const chatForm = page.locator('form').filter({ has: page.getByPlaceholder('Your name') })
      if (await chatForm.count()) {
        await chatForm.getByPlaceholder('Your name').fill('Smoke Test')
        await chatForm.getByPlaceholder('Contact number').fill('9999999999')
        await chatForm.getByPlaceholder('Email address').fill('smoke@example.com')
        await page.screenshot({ path: path.join(SCREEN_DIR, '03-chat-precapture-filled.png') })
        console.log('   Pre-chat form filled, screenshot saved')
      }
    } else {
      console.log('   WARNING: chat launcher button not found')
    }

    console.log('-> GET /services')
    await page.goto(BASE_URL + '/services', { waitUntil: 'networkidle' })
    await page.screenshot({ path: path.join(SCREEN_DIR, '04-services.png') })
    console.log('   Services page loaded, screenshot saved')

    console.log('-> GET /about')
    await page.goto(BASE_URL + '/about', { waitUntil: 'networkidle' })
    await page.screenshot({ path: path.join(SCREEN_DIR, '05-about.png') })
    console.log('   About page loaded, screenshot saved')

    if (errors.length) {
      console.log('\nConsole/page errors seen during the run:')
      errors.forEach((e) => console.log('  -', e))
    } else {
      console.log('\nNo console/page errors seen.')
    }
  })
}

const [, , cmd, ...rest] = process.argv

if (!cmd) {
  await smoke()
} else if (cmd === 'goto') {
  const [route, outFile] = rest
  if (!route || !outFile) { console.error('Usage: node driver.mjs goto <route> <out.png>'); process.exit(1) }
  await cmdGoto(route, outFile)
} else if (cmd === 'eval') {
  const [route, js] = rest
  if (!route || !js) { console.error('Usage: node driver.mjs eval <route> "<js>"'); process.exit(1) }
  await cmdEval(route, js)
} else {
  console.error('Unknown command:', cmd)
  process.exit(1)
}
