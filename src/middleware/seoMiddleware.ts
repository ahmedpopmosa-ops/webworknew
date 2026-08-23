import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { seoConfig } from '../lib/seoConfig.ts';

export function seoMiddleware(req: Request, res: Response, next: NextFunction) {
  // If in development mode, let Vite handle the HTML directly
  if (process.env.NODE_ENV !== "production") {
    return next();
  }

  // Only process GET requests for HTML routes (not API or assets)
  if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|webp|xml|txt)$/)) {
    return next();
  }

  // Strip trailing slash unless it's the root or /ar/
  let lookupPath = req.path;
  if (lookupPath !== '/' && lookupPath !== '/ar/' && lookupPath.endsWith('/')) {
    lookupPath = lookupPath.slice(0, -1);
  }

  const isDynamicRoute = lookupPath.startsWith('/services/') || lookupPath.startsWith('/ar/services/');
  const hasSeoData = !!seoConfig[lookupPath];

  // If not a valid exact route and not a dynamic route pattern, it's a 404.
  if (!hasSeoData && !isDynamicRoute && !lookupPath.startsWith('/admin')) {
    res.status(404);
  }

  // Use a fallback SEO data for dynamic routes or 404 if needed
  const defaultSeo = seoConfig['/'];
  const seoData = seoConfig[lookupPath] || {
    ...defaultSeo,
    title: res.statusCode === 404 ? 'Page Not Found | Webwork' : defaultSeo.title,
    h1: res.statusCode === 404 ? '404 - Page Not Found' : defaultSeo.h1,
    canonical: `https://webwork-eg.com${lookupPath}`
  };

  const cwd = process.cwd();
  const distPath = cwd.endsWith("dist") ? cwd : path.join(cwd, "dist");
  const indexFile = path.join(distPath, 'index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      // In dev mode, dist/index.html might not exist yet, so we just continue to Vite middleware
      return next();
    }

    const { title, description, canonical, h1, content, links, lang, dir } = seoData;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Webwork",
      "url": "https://webwork-eg.com/",
      "logo": "https://webwork-eg.com/logo.png",
      "description": description || defaultSeo.description,
      "email": "hello@webwork-eg.com",
      "telephone": "+20 123 456 789",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cairo",
        "addressCountry": "EG"
      },
      "areaServed": "Egypt"
    };

    let html = data;

    html = html.replace(/<html[^>]*>/, `<html lang="${lang || 'en'}" dir="${dir || 'ltr'}">`);
    html = html.replace(/<title>.*<\/title>/, `<title>${title}</title>`);

    const metaTags = `
      <meta name="description" content="${description}" />
      <link rel="canonical" href="${canonical}" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Webwork" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:url" content="${canonical}" />
      <meta property="og:image" content="https://webwork-eg.com/og/default.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${title}" />
      <meta name="twitter:description" content="${description}" />
      <meta name="twitter:image" content="https://webwork-eg.com/og/default.jpg" />
      
      ${(lang || 'en') === 'ar' ? `
        <link rel="alternate" hreflang="ar" href="${canonical}" />
        <link rel="alternate" hreflang="en" href="${canonical.replace('/ar', '') || 'https://webwork-eg.com/'}" />
        <link rel="alternate" hreflang="x-default" href="${canonical.replace('/ar', '') || 'https://webwork-eg.com/'}" />
      ` : `
        <link rel="alternate" hreflang="en" href="${canonical}" />
        <link rel="alternate" hreflang="ar" href="${canonical.replace('.com/', '.com/ar/')}" />
        <link rel="alternate" hreflang="x-default" href="${canonical}" />
      `}

      <script type="application/ld+json">
        ${JSON.stringify(jsonLd)}
      </script>
    `;

    html = html.replace('</head>', `${metaTags}</head>`);

    const botContent = `
      <noscript id="seo-content" style="display:block;">
        <h1>${h1}</h1>
        <p>${content}</p>
        <nav>
          <ul>
            ${(links || []).map(link => `<li><a href="${link.href}">${link.text}</a></li>`).join('')}
          </ul>
        </nav>
      </noscript>
    `;

    html = html.replace('<div id="root">', `${botContent}<div id="root">`);

    res.send(html);
  });
}
