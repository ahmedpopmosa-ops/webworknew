import { chromium } from 'playwright';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Featured projects first (items 1-10 in Featured Work section)
const featuredProjects = [
  { name: 'CLH Egypt', slug: 'clh', url: 'https://clh-eg.com/' },
  { name: 'Safa Lighting', slug: 'safalighting', url: 'https://safalighting.com' },
  { name: 'Seraj Bright', slug: 'serajbright', url: 'https://serajbright.com/' },
  { name: 'El Safa Inc', slug: 'elsafainc', url: 'https://elsafainc.com/' },
  { name: 'Jolie Gold', slug: 'joliegold', url: 'https://joliegoldeg.com/' },
  { name: 'Chongwei Electric', slug: 'chongwei', url: 'https://chongwei-electric.com/' },
  { name: 'Catchy Adv', slug: 'catchyadv', url: 'https://catchy-adv.com/' },
  { name: 'Happy Motorhomes', slug: 'happymotorhomes', url: 'https://happymotorhomes.net/' },
  { name: 'Verdanza', slug: 'verdanza', url: 'https://verdanza.net' },
  { name: 'True for Training', slug: 'truefortraining', url: 'https://truefortraining.com' },
];

// Additional portfolio projects
const remainingProjects = [
  { name: 'HP Clinics', slug: 'hpclinics', url: 'https://hp-clinics.com/' },
  { name: 'SoftPrimes', slug: 'softprimes', url: 'https://softprimes.com/' },
  { name: 'Galala Challenge', slug: 'galalachallenge', url: 'https://galalachallenge.com/' },
  { name: 'Ironstar Egypt', slug: 'ironstaregypt', url: 'https://ironstaregypt.powerridesports.com/' },
  { name: 'Nexara', slug: 'nexara', url: 'https://nexara-sa.com/' },
  { name: 'Saraya Marketing', slug: 'sarayamarketing', url: 'https://sarayamarketing.com/' },
  { name: 'Xpert', slug: 'xpert', url: 'https://xperteg.com/' },
  { name: 'Different MEP', slug: 'differentmep', url: 'https://different-mep.com/' },
  { name: 'Control Tech SA', slug: 'controltechsa', url: 'https://controltech-sa.com/' },
  { name: 'Power Ride Sports', slug: 'powerridesports', url: 'http://powerridesports.com/' },
  { name: 'Control Tech ENT', slug: 'controltechent', url: 'https://controltech-ent.com/' },
  { name: 'Discover Egypt Tour', slug: 'discoveregypttour', url: 'http://discoveregypttour.com/' },
  { name: 'Cepurity', slug: 'cepurity', url: 'https://cepurity.com/' },
  { name: 'Etqan', slug: 'etqan', url: 'https://etqan.org/' },
  { name: 'QaPool', slug: 'qapool', url: 'https://qapool.com/' },
  { name: 'Wow Me Clinics', slug: 'wowmeclinics', url: 'https://www.wowmeclinics.com/' },
  { name: 'Taqa Noor', slug: 'taqanoor', url: 'https://taqanoor.com/' },
  { name: 'Egyptian Spanish SEO', slug: 'egyptianspanish', url: 'https://egyptianspanish.com/' },
  { name: 'Bremco', slug: 'bremco', url: 'https://bremcoeg.com/' },
  { name: 'Sun Laser CNC', slug: 'sunlasercnc', url: 'https://sunlasercnc.com/' },
  { name: 'TTI EG', slug: 'ttieg', url: 'http://ttieg.com/' },
];

const TARGET_DIR = path.resolve(process.cwd(), 'src/assets/portfolio');
const TMP_DIR = '/tmp/screenshots';

if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
}

async function captureProject(browser, project) {
  const result = {
    name: project.name,
    slug: project.slug,
    url: project.url,
    success: false,
    filePath: path.join(TARGET_DIR, `${project.slug}.webp`),
    fileSizeKB: null,
    error: null,
    attempts: 0
  };

  const maxAttempts = 2;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    result.attempts = attempt;
    console.log(`\n[${project.name}] Attempt ${attempt}/${maxAttempts} -> ${project.url}`);
    
    let context = null;
    let page = null;

    try {
      context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        ignoreHTTPSErrors: true,
      });

      page = await context.newPage();
      page.setDefaultTimeout(30000);
      page.setDefaultNavigationTimeout(30000);

      // Navigate with timeout 30s
      try {
        await page.goto(project.url, { waitUntil: 'networkidle', timeout: 25000 });
      } catch (navErr) {
        console.log(`[${project.name}] networkidle wait completed or timed out, checking page state...`);
        await page.waitForLoadState('load', { timeout: 10000 }).catch(() => {});
      }

      // Wait an extra 3 seconds so animations, sliders, and fonts finish rendering
      console.log(`[${project.name}] Waiting 3s for animations/fonts...`);
      await page.waitForTimeout(3000);

      // Close or hide any cookie banners, popups, chat widgets, or preloaders that cover the content
      console.log(`[${project.name}] Hiding popups, preloaders & chat widgets...`);
      await page.evaluate(() => {
        const selectors = [
          '#cookie-banner', '.cookie-banner', '.cookie-consent', '#onetrust-consent-sdk',
          '#cookieConsent', '.cc-banner', '.cc-window', '.modal-backdrop', '.modal.show',
          '.modal.in', '[class*="cookie"]', '[id*="cookie"]', '[class*="consent"]',
          '[id*="consent"]', '[class*="preloader"]', '[id*="preloader"]', '.preloader',
          '#preloader', '[class*="loader-wrapper"]', '[id*="loader-wrapper"]',
          '[class*="loading-screen"]', '[class*="chat-widget"]', '[id*="chat-widget"]',
          '[class*="tawk"]', '[id*="tawk"]', '#chat-widget-container', '#hubspot-messages-iframe-container',
          'iframe[src*="chat"]', 'iframe[src*="tawk"]', 'iframe[title*="chat"]',
          '.wp-block-popup', '.pum-overlay', '.elementor-popup-modal', '[class*="popup"]',
          '.cky-consent-container', '#cky-consent-container', '.grecaptcha-badge'
        ];
        selectors.forEach(sel => {
          document.querySelectorAll(sel).forEach(el => {
            try {
              el.style.setProperty('display', 'none', 'important');
              el.style.setProperty('opacity', '0', 'important');
              el.style.setProperty('visibility', 'hidden', 'important');
            } catch (_) {}
          });
        });
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      });

      // Scroll to the bottom and back to the top to trigger lazy-loaded images, then wait 2 more seconds
      console.log(`[${project.name}] Scrolling to bottom and back to top...`);
      await page.evaluate(async () => {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 1200));
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(2000);

      // Take a screenshot of the visible viewport only (above the fold), not the full page
      const tempPng = path.join(TMP_DIR, `${project.slug}.png`);
      await page.screenshot({ path: tempPng, fullPage: false });
      console.log(`[${project.name}] Screenshot taken. Optimizing to WebP...`);

      // Convert to WebP, quality ~80, target size under 200 KB
      const targetWebp = path.join(TARGET_DIR, `${project.slug}.webp`);
      execSync(`convert "${tempPng}" -quality 80 "${targetWebp}"`);

      let stats = fs.statSync(targetWebp);
      let sizeKB = (stats.size / 1024).toFixed(1);

      if (stats.size > 200 * 1024) {
        console.log(`[${project.name}] Size ${sizeKB}KB > 200KB, applying further optimization...`);
        execSync(`convert "${tempPng}" -resize 1440x900 -quality 75 "${targetWebp}"`);
        stats = fs.statSync(targetWebp);
        sizeKB = (stats.size / 1024).toFixed(1);
      }

      console.log(`[${project.name}] SUCCESS: ${targetWebp} (${sizeKB} KB)`);
      result.success = true;
      result.fileSizeKB = sizeKB;
      result.error = null;

      await page.close().catch(() => {});
      await context.close().catch(() => {});
      break; // break out of retry loop on success
    } catch (err) {
      console.error(`[${project.name}] Attempt ${attempt} failed: ${err.message}`);
      result.error = err.message;
      if (page) await page.close().catch(() => {});
      if (context) await context.close().catch(() => {});
      
      if (attempt < maxAttempts) {
        console.log(`[${project.name}] Retrying once in 2 seconds...`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        console.log(`[${project.name}] SKIPPED: keeping existing image after ${maxAttempts} failed attempts.`);
      }
    }
  }

  return result;
}

async function main() {
  console.log('Launching headless browser (Playwright Chromium)...');
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-first-run'
    ]
  });

  const featuredResults = [];
  console.log(`\n======================================================`);
  console.log(`PHASE 1: Capturing 10 Featured Work Project Screenshots`);
  console.log(`======================================================`);

  for (const proj of featuredProjects) {
    const res = await captureProject(browser, proj);
    featuredResults.push(res);
  }

  console.log(`\n======================================================`);
  console.log(`PHASE 2: Capturing Additional Portfolio Projects`);
  console.log(`======================================================`);

  const additionalResults = [];
  for (const proj of remainingProjects) {
    const res = await captureProject(browser, proj);
    additionalResults.push(res);
  }

  await browser.close();

  const fullReport = {
    timestamp: new Date().toISOString(),
    featured: featuredResults,
    additional: additionalResults
  };

  fs.writeFileSync('/tmp/screenshot-report.json', JSON.stringify(fullReport, null, 2));
  console.log('\nAll done! Report written to /tmp/screenshot-report.json');
}

main().catch(console.error);
