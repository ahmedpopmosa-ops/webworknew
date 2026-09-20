import { chromium } from 'playwright';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

async function testSingle() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();
  const testUrl = 'https://safalighting.com';
  console.log(`Navigating to ${testUrl}...`);

  try {
    await page.goto(testUrl, { waitUntil: 'networkidle', timeout: 25000 });
  } catch (e) {
    console.log('networkidle timeout, waiting for load state...');
    await page.waitForLoadState('load').catch(() => {});
  }

  await page.waitForTimeout(3000);

  // Close/hide banners
  await page.evaluate(() => {
    const selectors = [
      '#cookie-banner', '.cookie-banner', '.cookie-consent', '#onetrust-consent-sdk',
      '[class*="cookie"]', '[class*="preloader"]', '#preloader', '.preloader'
    ];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.setProperty('display', 'none', 'important');
      });
    });
  });

  // Scroll to bottom and back
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 1000));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2000);

  const tmpPng = '/tmp/test-screenshot.png';
  const outWebp = '/tmp/test-safalighting.webp';

  await page.screenshot({ path: tmpPng, fullPage: false });
  console.log('Screenshot captured, converting to webp...');

  execSync(`convert "${tmpPng}" -quality 80 "${outWebp}"`);
  const size = fs.statSync(outWebp).size;
  console.log(`Converted webp size: ${(size / 1024).toFixed(1)} KB`);

  await browser.close();
}

testSingle().catch(console.error);
