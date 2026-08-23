import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { db } from "./src/db/index.ts";
import { pages, services, portfolio, posts, leads } from "./src/db/schema.ts";
import { eq } from "drizzle-orm";
import { GoogleGenAI, Type } from "@google/genai";
import { seoConfig } from "./src/lib/seoConfig.ts";
import { seoMiddleware } from "./src/middleware/seoMiddleware.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Public API routes
  app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body;
    if (email === "admin" && password === "123456") {
      res.json({ token: "admin-token-123", user: { email: "admin", role: "admin" } });
    } else {
      res.status(401).json({ error: "بيانات الدخول غير صحيحة" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/pages", async (req, res) => {
    try {
      const data = await db.select().from(pages);
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
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
      
      res.json(data[0]);
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
      
      res.json(data[0]);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
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
      const data = await db.select().from(portfolio);
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
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
