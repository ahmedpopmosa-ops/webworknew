/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext.tsx';
import { LanguageProvider } from './lib/LanguageContext.tsx';
import MainLayout from './components/MainLayout.tsx';
import AdminLayout from './components/AdminLayout.tsx';

// Lazy loading pages for code splitting
const Home = lazy(() => import('./pages/Home.tsx'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.tsx'));
const AdminPages = lazy(() => import('./pages/AdminPages.tsx'));
const AdminPageBuilder = lazy(() => import('./pages/AdminPageBuilder.tsx'));
const AdminSettings = lazy(() => import('./pages/AdminSettings.tsx'));
const AdminLogin = lazy(() => import('./pages/AdminLogin.tsx'));
const AdminPortfolio = lazy(() => import('./pages/AdminPortfolio.tsx'));
const AIArticleGenerator = lazy(() => import('./pages/AIArticleGenerator.tsx'));
const Portfolio = lazy(() => import('./pages/Portfolio.tsx'));
const Services = lazy(() => import('./pages/Services.tsx'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails.tsx'));
const Blog = lazy(() => import('./pages/Blog.tsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route element={<MainLayout />}>
                {/* English Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetails />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />

                {/* Arabic Routes */}
                <Route path="/ar" element={<Home />} />
                <Route path="/ar/portfolio" element={<Portfolio />} />
                <Route path="/ar/services" element={<Services />} />
                <Route path="/ar/services/:id" element={<ServiceDetails />} />
                <Route path="/ar/blog" element={<Blog />} />
                <Route path="/ar/blog/:slug" element={<BlogPost />} />
                <Route path="/ar/contact" element={<Contact />} />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Route>

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="pages" element={<AdminPages />} />
                <Route path="pages/new" element={<AdminPageBuilder />} />
                <Route path="pages/:id/edit" element={<AdminPageBuilder />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="portfolio" element={<AdminPortfolio />} />
                <Route path="ai-writer" element={<AIArticleGenerator />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
