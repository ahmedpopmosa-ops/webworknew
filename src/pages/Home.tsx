import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import DynamicPageRenderer from '../components/DynamicPageRenderer.tsx';
import { RowData } from '../lib/builder-types.ts';

const RevealText = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <div className={`overflow-hidden flex flex-wrap ${className}`} dir="ltr">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[1.5vw] inline-block"
          initial={{ y: "100%", rotate: 5, opacity: 0 }}
          whileInView={{ y: 0, rotate: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

import { portfolioData } from '../data/portfolio.ts';
import { useLanguage } from '../lib/LanguageContext.tsx';


const LegacyHome = ({ t, dir }: { t: any, dir: any }) => {
  const containerRef = useRef(null);
  const horizontalScrollRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalScrollRef,
  });

  const x = useTransform(horizontalProgress, [0, 1], ["0%", "-80%"]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [activeService, setActiveService] = useState(0);

  const services = [
    { slug: 'web-design', title: t('services.1.title'), desc: t('services.1.desc'), num: '01', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop' },
    { slug: 'digital-marketing', title: t('services.2.title'), desc: t('services.2.desc'), num: '02', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },
    { slug: 'seo-optimization', title: t('services.3.title'), desc: t('services.3.desc'), num: '03', img: 'https://images.unsplash.com/photo-1572177191856-3cbde618072f?q=80&w=800&auto=format&fit=crop' },
    { slug: 'mobile-apps', title: t('services.4.title'), desc: t('services.4.desc'), num: '04', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop' },
    { slug: 'branding', title: t('services.5.title'), desc: t('services.5.desc'), num: '05', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop' },
    { slug: 'motion-graphic', title: t('services.6.title'), desc: t('services.6.desc'), num: '06', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop' },
    { slug: 'marketing-strategy', title: t('services.7.title'), desc: t('services.7.desc'), num: '07', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop' },
    { slug: 'content-creation', title: t('services.8.title'), desc: t('services.8.desc'), num: '08', img: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop' },
    { slug: 'media-buying', title: t('services.9.title'), desc: t('services.9.desc'), num: '09', img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop' },
    { slug: 'email-marketing', title: t('services.10.title'), desc: t('services.10.desc'), num: '10', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop' },
    { slug: '360-vr', title: t('services.11.title'), desc: t('services.11.desc'), num: '11', img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop' },
  ];

  const portfolio = portfolioData.slice(0, 10);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-950 text-white" ref={containerRef}>
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-600/30 rounded-full blur-[100px] animate-pulse mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse mix-blend-screen" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <motion.div 
          className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping absolute"></span>
            <span className="w-2 h-2 bg-blue-500 rounded-full relative"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-blue-200">{t('hero.badge')}</span>
          </div>
          
          <h1 className="text-[12vw] md:text-[9vw] font-black tracking-tighter leading-[0.85] uppercase mb-8 mix-blend-difference" dir={dir}>
            <RevealText text={t('hero.title.build')} />
            <RevealText text={t('hero.title.digital')} className="text-blue-500 justify-center" />
            <RevealText text={t('hero.title.experiences')} />
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-lg md:text-2xl text-slate-400 max-w-2xl font-medium leading-relaxed"
          >
            {t('hero.desc')}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-12 flex flex-wrap gap-4 justify-center"
          >
            <Link to="/contact" className="bg-blue-600 text-white px-8 py-4 rounded-full text-sm font-bold shadow-lg hover:bg-blue-700 transition w-fit flex items-center justify-center gap-2 magnetic">
              {t('hero.cta.start')}
            </Link>
            <Link to="/portfolio" className="bg-white/5 text-white border border-white/10 backdrop-blur-md px-8 py-4 rounded-full text-sm font-bold hover:bg-white/10 transition w-fit flex items-center justify-center magnetic">
              {t('hero.cta.portfolio')}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <div className="py-8 bg-blue-600 overflow-hidden flex whitespace-nowrap rotate-[-2deg] scale-110 relative z-20" dir="ltr">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-8 text-4xl md:text-6xl font-black uppercase text-white/90"
        >
          <span>WEB DESIGN ✦ SEO OPTIMIZATION ✦ DIGITAL MARKETING ✦ MOBILE APPS ✦ BRANDING ✦ </span>
          <span>WEB DESIGN ✦ SEO OPTIMIZATION ✦ DIGITAL MARKETING ✦ MOBILE APPS ✦ BRANDING ✦ </span>
          <span>WEB DESIGN ✦ SEO OPTIMIZATION ✦ DIGITAL MARKETING ✦ MOBILE APPS ✦ BRANDING ✦ </span>
        </motion.div>
      </div>

      {/* About Storytelling */}
      <section className="py-32 md:py-48 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10 w-full" dir={dir}>
        <h2 className="text-5xl md:text-[7vw] font-black leading-[0.9] tracking-tighter mb-12">
          <RevealText text={t('about.1')} />
          <RevealText text={t('about.2')} className="text-slate-500" />
          <RevealText text={t('about.3')} />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
          <div className="flex flex-col">
            <span className="text-7xl font-black text-blue-500 mb-4" dir="ltr">500+</span>
            <span className="text-lg text-slate-400 font-bold uppercase tracking-widest">{t('stats.projects')}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-7xl font-black text-blue-500 mb-4" dir="ltr">15+</span>
            <span className="text-lg text-slate-400 font-bold uppercase tracking-widest">{t('stats.experience')}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-7xl font-black text-blue-500 mb-4" dir="ltr">98%</span>
            <span className="text-lg text-slate-400 font-bold uppercase tracking-widest">{t('stats.satisfaction')}</span>
          </div>
        </div>
      </section>

      {/* Interactive Services */}
      <section className="py-24 md:py-32 relative bg-[#060913] border-y border-white/5 w-full">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-16 md:mb-24">
            <p className="text-blue-500 font-bold tracking-widest uppercase mb-4">{t('services.label')}</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">{t('services.title')}</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start relative">
            {/* Services List (Left on Desktop) */}
            <div className="w-full md:w-[55%] flex flex-col justify-center">
              {services.map((s, i) => (
                <div
                  key={i}
                  className={`group border-b border-white/10 py-6 lg:py-8 cursor-pointer transition-colors duration-500 ${
                    activeService === i ? 'text-white' : 'text-slate-600 hover:text-slate-400'
                  }`}
                  onMouseEnter={() => setActiveService(i)}
                  onClick={() => setActiveService(i)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tighter transition-all duration-500">
                      {s.title}
                    </h3>
                    <span className="text-lg md:text-xl font-bold font-mono ml-4">{s.num}</span>
                  </div>
                  
                  {/* Mobile Accordion Content & Desktop Description */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      activeService === i ? 'max-h-[800px] opacity-100 mt-4 md:mt-6' : 'max-h-0 opacity-0 mt-0'
                    }`}
                  >
                    <p className="text-lg md:text-xl text-slate-400 max-w-md" dir={dir}>
                      {s.desc}
                    </p>
                    
                    {/* Link to service details */}
                    <Link to={dir === 'rtl' ? `/ar/services/${s.slug}` : `/services/${s.slug}`} className="inline-flex items-center gap-2 mt-4 text-blue-500 font-bold hover:text-blue-400 transition-colors uppercase tracking-widest text-sm">
                      {dir === 'rtl' ? 'اكتشف المزيد' : 'Discover More'} {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </Link>

                    {/* Mobile Image (Hidden on Desktop) */}
                    <div className="md:hidden mt-8 w-full rounded-2xl overflow-hidden aspect-[4/3] relative">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Dynamic Image Area (Right on Desktop, Hidden on Mobile) */}
            <div className="hidden md:block md:w-[45%] sticky top-32 h-[600px] lg:h-[750px] rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/5">
              {/* Preload images implicitly by rendering them all, but hide non-active ones */}
              {services.map((s, i) => (
                <div 
                  key={i}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    activeService === i 
                      ? 'opacity-100 z-10 visible' 
                      : 'opacity-0 z-0 invisible'
                  }`}
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${
                      activeService === i ? 'scale-100' : 'scale-110'
                    }`}
                  />
                  {/* Subtle overlay to ensure the image sits well with the dark theme */}
                  <div className="absolute inset-0 bg-slate-950/10 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Portfolio Scroll */}
      <section ref={horizontalScrollRef} className="relative h-[300vh] bg-slate-950 w-full" dir="ltr">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div className="absolute top-12 md:top-24 left-6 md:left-12 z-20" dir={dir}>
            <p className="text-blue-500 font-bold tracking-widest uppercase mb-4">{t('portfolio.label')}</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">{t('portfolio.title')}</h2>
          </div>
          
          <div className="absolute top-12 md:top-24 right-6 md:right-12 z-20 flex items-center gap-4" dir={dir}>
            <button
              type="button"
              onClick={() => {
                if (horizontalScrollRef.current) {
                  const el = horizontalScrollRef.current as HTMLElement;
                  window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
                }
              }}
              aria-label="Previous Project"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md hover:bg-blue-600 hover:border-transparent text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (horizontalScrollRef.current) {
                  const el = horizontalScrollRef.current as HTMLElement;
                  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                }
              }}
              aria-label="Next Project"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md hover:bg-blue-600 hover:border-transparent text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>

            <Link to="/portfolio" className="hidden md:flex items-center gap-2 text-xl font-bold hover:text-blue-500 transition-colors magnetic ml-2" dir={dir}>
              {dir === 'rtl' ? <>{t('portfolio.viewAll')} <ArrowLeft className="w-6 h-6" /></> : <>{t('portfolio.viewAll')} <ArrowUpRight className="w-6 h-6" /></>}
            </Link>
          </div>

          <motion.div style={{ x }} className="flex gap-12 px-6 md:px-12 pt-32 w-max">
            {portfolio.map((p, i) => (
              <a 
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-[85vw] md:w-[60vw] h-[50vh] md:h-[65vh] shrink-0 block cursor-pointer"
                data-cursor-text="VISIT"
              >
                <div className="w-full h-full bg-slate-900 rounded-3xl overflow-hidden relative mb-8 border border-white/5 shadow-2xl">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src={p.img} 
                    alt={p.name} 
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                      <p className="text-blue-400 uppercase tracking-widest text-sm font-bold mb-2">{p.cat}</p>
                      <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white group-hover:text-blue-400 transition-colors">{p.name}</h3>
                    </div>
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-transparent transition-all backdrop-blur-md bg-white/5">
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-blue-600 text-white relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-20 text-center" dir={dir}>{t('process.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12" dir={dir}>
            {[
              { num: '01', title: t('process.1.title'), desc: t('process.1.desc') },
              { num: '02', title: t('process.2.title'), desc: t('process.2.desc') },
              { num: '03', title: t('process.3.title'), desc: t('process.3.desc') }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <span className="text-8xl font-black text-white/20 mb-6" dir="ltr">{step.num}</span>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{step.title}</h3>
                <p className="text-blue-100 text-lg max-w-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}


export default function Home() {
  const { t, dir } = useLanguage();
  const [pageBlocks, setPageBlocks] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pages')
      .then(res => res.json())
      .then(pages => {
        const homePage = pages.find((p: any) => (p.slug === 'home' || p.slug === '') && p.status === 'published');
        if (homePage && homePage.blocks) {
          const parsedBlocks = typeof homePage.blocks === 'string' ? JSON.parse(homePage.blocks) : homePage.blocks;
          if (Array.isArray(parsedBlocks) && parsedBlocks.length > 0 && parsedBlocks[0].columns) {
            setPageBlocks(parsedBlocks);
          }
        }
      })
      .catch(err => console.error("Error fetching homepage blocks:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-950"></div>;

  if (pageBlocks.length > 0) {
    return (
      <div className="flex flex-col min-h-screen font-sans" dir={dir}>
        <DynamicPageRenderer blocks={pageBlocks} />
      </div>
    );
  }

  return <LegacyHome t={t} dir={dir} />;
}
