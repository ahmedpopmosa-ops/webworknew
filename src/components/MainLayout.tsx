import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext.tsx';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './CustomCursor.tsx';
import Lenis from 'lenis';
import { cn } from '../lib/utils.ts';

import { useLanguage } from '../lib/LanguageContext.tsx';
import Logo from './Logo.tsx';

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-8 overflow-hidden relative">
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-white/20" 
            initial={{ height: "0%" }}
            animate={{ height: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
          <span className="font-bold text-3xl relative z-10">W</span>
        </div>
        <div className="text-4xl font-black tracking-tighter mb-4">WEBWORK</div>
        <div className="text-blue-500 font-mono text-xl">{Math.min(progress, 100)}%</div>
      </div>
    </motion.div>
  );
}

export default function MainLayout() {
  const { user, logout } = useAuth();
  const { t, language, setLanguage, dir } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (loading) return;
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-600 selection:text-white" dir={dir}>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 border-b",
        scrolled ? "h-20 bg-slate-950/80 backdrop-blur-xl border-white/10 shadow-2xl" : "h-24 bg-transparent border-transparent"
      )}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-3 group magnetic transition-colors bg-white px-3 py-1 rounded-lg">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-300">
            <Link to="/" className="hover:text-white transition-colors relative group magnetic">
              {t('nav.home')}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/services" className="hover:text-white transition-colors relative group magnetic">
              {t('nav.services')}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/portfolio" className="hover:text-white transition-colors relative group magnetic">
              {t('nav.portfolio')}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/blog" className="hover:text-white transition-colors relative group magnetic">
              {t('nav.blog')}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="text-sm font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              {language === 'en' ? 'عربي' : 'EN'}
            </button>
            {user ? (
              <>
                <Link to="/admin" className="text-sm font-bold text-slate-300 hover:text-white magnetic">{t('nav.dashboard')}</Link>
                <button onClick={logout} className="text-sm font-bold text-red-400 hover:text-red-300 magnetic">{t('nav.logout')}</button>
              </>
            ) : (
              <Link to="/admin/login" className="text-sm font-bold text-slate-400 hover:text-white magnetic">{t('nav.login')}</Link>
            )}
            <Link to="/contact" className="bg-white text-slate-950 px-6 py-3 rounded-full text-sm font-bold hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 magnetic">
              {t('nav.startProject')}
            </Link>
          </div>

          <button className="md:hidden p-2 text-white magnetic relative z-[60]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at top left)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top left)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top left)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-blue-600 z-[55] flex flex-col justify-center items-center text-white"
          >
            <nav className="flex flex-col items-center gap-8 text-4xl font-black">
              {[
                { name: t('nav.home'), path: '/' },
                { name: t('nav.services'), path: '/services' },
                { name: t('nav.portfolio'), path: '/portfolio' },
                { name: t('nav.blog'), path: '/blog' },
                { name: t('nav.contact'), path: '/contact' }
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link to={item.path} className="hover:text-slate-900 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + 5 * 0.1 }}
                onClick={() => {
                  setLanguage(language === 'en' ? 'ar' : 'en');
                  setMobileMenuOpen(false);
                }}
                className="mt-8 text-2xl text-blue-200"
              >
                {language === 'en' ? 'عربي' : 'English'}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="w-full flex-1 flex flex-col bg-slate-950">
        <Outlet />
      </main>

      <footer className="bg-slate-950 text-white pt-32 pb-12 px-6 md:px-12 border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter leading-none mb-8 uppercase">
              {language === 'en' ? (
                <>LET'S <span className="text-blue-500">{t('footer.talk')}</span></>
              ) : (
                <><span className="text-blue-500">{t('footer.talk')}</span></>
              )}
            </h2>
            <Link to="/contact" className="group flex items-center justify-center w-40 h-40 bg-blue-600 rounded-full text-white font-bold hover:scale-110 transition-transform duration-500 magnetic">
              <span className="group-hover:hidden text-lg text-center leading-tight px-4">{t('nav.startProject')}</span>
              <span className="hidden group-hover:block text-2xl">{dir === 'rtl' ? '←' : '→'}</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="inline-flex items-center gap-3 mb-6 transition-colors bg-white px-3 py-1.5 rounded-lg w-fit">
                <Logo className="h-10 w-auto" />
              </Link>
              <p className="text-slate-400 max-w-sm text-lg leading-relaxed">
                {t('footer.desc')}
              </p>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-6 font-bold">{t('footer.contact')}</h4>
              <ul className="space-y-4 text-slate-300">
                <li><a href="mailto:hello@webwork-eg.com" className="hover:text-blue-400 transition-colors" dir="ltr">hello@webwork-eg.com</a></li>
                <li><a href="tel:+20123456789" className="hover:text-blue-400 transition-colors" dir="ltr">+20 123 456 789</a></li>
                <li className="text-slate-500">{t('footer.cairo')}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-6 font-bold">{t('footer.socials')}</h4>
              <div className="flex gap-4 flex-wrap">
                {['TW', 'IN', 'FB', 'IG'].map((social) => (
                  <a key={social} href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-sm font-bold hover:bg-white hover:text-slate-950 transition-all magnetic">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 font-medium">
            <p>{t('footer.rights')}</p>
            <p>{t('footer.built')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
