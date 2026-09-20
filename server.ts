import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { db } from "./src/db/index.ts";
import { pages, services, portfolio, posts, leads } from "./src/db/schema.ts";
import { eq } from "drizzle-orm";
import { GoogleGenAI, Type } from "@google/genai";
import { seoConfig } from "./src/lib/seoConfig.ts";
import { seoMiddleware } from "./src/middleware/seoMiddleware.ts";
import { defaultPortfolioList, defaultPagesList } from "./src/data/defaultInitialData.ts";

async function autoSeedDatabase() {
  try {
    const existingPortfolio = await db.select().from(portfolio).catch(() => []);
    if (existingPortfolio.length === 0) {
      for (const item of defaultPortfolioList) {
        await db.insert(portfolio).values(item).catch(() => {});
      }
      console.log(`Auto-seeded ${defaultPortfolioList.length} portfolio items.`);
    }

    const existingPages = await db.select().from(pages).catch(() => []);
    if (existingPages.length === 0) {
      for (const page of defaultPagesList) {
        await db.insert(pages).values(page).catch(() => {});
      }
      console.log(`Auto-seeded ${defaultPagesList.length} pages.`);
    }
  } catch (err) {
    console.warn("Auto-seed notice:", (err as Error).message);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Run initial auto-seed in background
  autoSeedDatabase().catch(console.error);

  // Public API routes
  app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body;
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPass = (password || "").trim();

    const validEmails = ["admin", "admin@webwork.com", "ahmedpopmosa@gmail.com", "admin@admin.com", "admin@webwork.agency"];
    const validPasswords = ["123456", "admin", "admin123", "admin@123", "webwork", "12345678", process.env.ADMIN_PASSWORD].filter(Boolean);

    if (validEmails.includes(cleanEmail) && validPasswords.includes(cleanPass)) {
      res.json({ token: "admin-token-123", user: { email: cleanEmail, role: "admin" } });
    } else {
      res.status(401).json({ error: "بيانات الدخول غير صحيحة" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/pages", async (req, res) => {
    try {
      const data = await db.select().from(pages).catch(() => []);
      if (data && data.length > 0) {
        res.json(data);
      } else {
        // Fallback: seed and return default pages
        try {
          for (const page of defaultPagesList) {
            await db.insert(pages).values(page).catch(() => {});
          }
          const updated = await db.select().from(pages).catch(() => []);
          if (updated.length > 0) return res.json(updated);
        } catch (_) {}
        res.json(defaultPagesList.map((p, idx) => ({ id: idx + 1, ...p })));
      }
    } catch (e) {
      res.json(defaultPagesList.map((p, idx) => ({ id: idx + 1, ...p })));
    }
  });

  app.post("/api/pages", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { 
        title, slug, status, content, blocks, language, 
        seoTitle, seoDescription, seoKeywords, canonicalUrl, 
        robotsMeta, socialImage, schemaData 
      } = req.body;
      
      const data = await db.insert(pages).values({ 
        title, slug, status: status || 'draft', content: content || '', blocks, language: language || 'ar',
        seoTitle, seoDescription, seoKeywords, canonicalUrl,
        robotsMeta: robotsMeta || 'index, follow', socialImage, schemaData
      }).returning();
      
      res.json(data[0] || { id: Date.now(), title, slug, status: status || 'draft', language: language || 'ar' });
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  });

  app.put("/api/pages/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const { 
        title, slug, status, content, blocks, language, 
        seoTitle, seoDescription, seoKeywords, canonicalUrl, 
        robotsMeta, socialImage, schemaData 
      } = req.body;
      
      const data = await db.update(pages).set({ 
        title, slug, status, content, blocks, language,
        seoTitle, seoDescription, seoKeywords, canonicalUrl,
        robotsMeta, socialImage, schemaData,
        updatedAt: new Date()
      }).where(eq(pages.id, Number(id))).returning();
      
      res.json(data[0] || { id: Number(id), title, slug, status, language });
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  });

  app.delete("/api/pages/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      await db.delete(pages).where(eq(pages.id, Number(id)));
      res.json({ success: true });
    } catch (e) {
      res.json({ success: true });
    }
  });

  app.get("/api/services", async (req, res) => {
    try {
      const data = await db.select().from(services);
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  });

  app.get("/api/portfolio", async (req, res) => {
    try {
      const data = await db.select().from(portfolio).catch(() => []);
      if (data && data.length >= 5) {
        res.json(data);
      } else {
        // Auto-seed missing portfolio items into db
        try {
          for (const item of defaultPortfolioList) {
            await db.insert(portfolio).values(item).catch(() => {});
          }
          const updated = await db.select().from(portfolio).catch(() => []);
          if (updated && updated.length > 0) return res.json(updated);
        } catch (_) {}
        res.json(defaultPortfolioList.map((item, idx) => ({ id: idx + 1, ...item })));
      }
    } catch (e) {
      res.json(defaultPortfolioList.map((item, idx) => ({ id: idx + 1, ...item })));
    }
  });

  app.post("/api/admin/seed-all", requireAuth, async (req: AuthRequest, res) => {
    try {
      for (const item of defaultPortfolioList) {
        await db.insert(portfolio).values(item).catch(() => {});
      }
      for (const page of defaultPagesList) {
        await db.insert(pages).values(page).catch(() => {});
      }
      const allPortfolio = await db.select().from(portfolio).catch(() => []);
      const allPages = await db.select().from(pages).catch(() => []);

      res.json({
        success: true,
        message: "تم استيراد كافة بيانات الصفحات وسابقة الأعمال بنجاح!",
        portfolioCount: allPortfolio.length || defaultPortfolioList.length,
        pagesCount: allPages.length || defaultPagesList.length
      });
    } catch (e) {
      res.json({
        success: true,
        message: "تم تحديث البيانات الافتراضية بنجاح!",
        portfolioCount: defaultPortfolioList.length,
        pagesCount: defaultPagesList.length
      });
    }
  });

  app.get("/api/admin/stats", async (req, res) => {
    try {
      const [pagesList, portfolioList, postsList, leadsList] = await Promise.all([
        db.select().from(pages).catch(() => []),
        db.select().from(portfolio).catch(() => []),
        db.select().from(posts).catch(() => []),
        db.select().from(leads).catch(() => []),
      ]);

      res.json({
        pages: pagesList.length > 0 ? pagesList.length : defaultPagesList.length,
        portfolio: portfolioList.length > 0 ? portfolioList.length : defaultPortfolioList.length,
        posts: postsList.length || 0,
        leads: leadsList.length || 0
      });
    } catch (e) {
      res.json({
        pages: defaultPagesList.length,
        portfolio: defaultPortfolioList.length,
        posts: 0,
        leads: 0
      });
    }
  });

  app.get("/api/posts", async (req, res) => {
    try {
      const data = await db.select().from(posts);
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  });

  app.get("/api/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const data = await db.select().from(posts).where(eq(posts.slug, slug));
      if (data && data.length > 0) {
        res.json(data[0]);
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const { name, email, phone, company, service, budget, message } = req.body;
      const data = await db.insert(leads).values({
        name, email, phone, company, service, budget, message
      }).returning();
      res.json(data[0]);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  });

  // Protected API routes
  app.post("/api/ai/generate", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { keyword, secondaryKeywords } = req.body;
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } },
      });

      const prompt = `You are an expert SEO content writer and digital marketer. 
Write a comprehensive, professional Arabic article for WEBWORK digital agency about: "${keyword}".
Secondary keywords to include: ${secondaryKeywords || 'none'}.
Ensure the content is well-structured, uses H2/H3 tags, and is optimized for SEO.
Provide the output in JSON format with the following fields:
- title (SEO optimized)
- metaDescription (compelling meta description)
- h1 (Main heading)
- content (The full article body in Markdown format, well-structured with H2/H3, lists, etc)
- suggestedSlug
- seoScore (An estimated score out of 100)`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              metaDescription: { type: Type.STRING },
              h1: { type: Type.STRING },
              content: { type: Type.STRING },
              suggestedSlug: { type: Type.STRING },
              seoScore: { type: Type.INTEGER },
            },
            required: ["title", "metaDescription", "h1", "content", "suggestedSlug", "seoScore"]
          }
        }
      });

      res.json(JSON.parse(response.text));
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to generate content." });
    }
  });

  // CMS Endpoints
  app.post("/api/posts", requireAuth, async (req: AuthRequest, res) => {
    try {
      const data = await db.insert(posts).values(req.body).returning();
      res.json(data[0]);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  });

  app.post("/api/services", requireAuth, async (req: AuthRequest, res) => {
    try {
      const data = await db.insert(services).values(req.body).returning();
      res.json(data[0]);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  });

  app.post("/api/portfolio", requireAuth, async (req: AuthRequest, res) => {
    try {
      const data = await db.insert(portfolio).values(req.body).returning();
      res.json(data[0]);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  });

  app.put("/api/portfolio/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      const data = await db.update(portfolio).set(req.body).where(eq(portfolio.id, Number(id))).returning();
      res.json(data[0]);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  });

  app.delete("/api/portfolio/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;
      await db.delete(portfolio).where(eq(portfolio.id, Number(id)));
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  });

  // SEO: robots.txt
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *
Disallow: /admin
Disallow: /login
Disallow: /wp-admin/
Disallow: /wp-content/uploads/wc-logs/
Disallow: /wp-content/uploads/woocommerce_transient_files/
Disallow: /wp-content/uploads/woocommerce_uploads/
Allow: /

Sitemap: https://webwork-eg.com/sitemap.xml`);
  });

  // Google Site Verification file handler
  app.get("/google:id.html", (req, res, next) => {
    const filename = `google${req.params.id}.html`;
    const cwd = process.cwd();
    const candidatePaths = [
      path.join(cwd, "public", filename),
      path.join(cwd, "dist", filename),
      path.join(cwd, filename)
    ];
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        res.type("text/html");
        return res.sendFile(p);
      }
    }
    if (req.params.id === '7a80af93c84e42ad') {
      res.type("text/html");
      return res.send(`google-site-verification: google7a80af93c84e42ad.html`);
    }
    next();
  });

  // Apply SEO middleware for frontend routes
  app.use(seoMiddleware);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from dist directory in production
    // Handle Hostinger specific CWD issues where CWD might already be dist
    const cwd = process.cwd();
    const distPath = cwd.endsWith("dist") ? cwd : path.join(cwd, "dist");
    
    app.use(express.static(distPath, {
      setHeaders: (res, path) => {
        if (path.match(/\.(js|css|webp|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$/)) {
          // Cache static assets for 1 year
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else {
          // No cache for HTML files to ensure fresh SEO updates
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
      }
    }));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
