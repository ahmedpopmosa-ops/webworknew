import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext.tsx';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export default function Services() {
  const { t, language, dir } = useLanguage();
  const baseUrl = language === 'ar' ? '/ar' : '';
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    { id: 'web-design', title: t('services.1.title'), desc: t('services.1.desc'), num: '01', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop' },
    { id: 'digital-marketing', title: t('services.2.title'), desc: t('services.2.desc'), num: '02', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },
    { id: 'seo-optimization', title: t('services.3.title'), desc: t('services.3.desc'), num: '03', img: 'https://images.unsplash.com/photo-1572177191856-3cbde618072f?q=80&w=800&auto=format&fit=crop' },
    { id: 'mobile-apps', title: t('services.4.title'), desc: t('services.4.desc'), num: '04', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop' },
    { id: 'branding', title: t('services.5.title'), desc: t('services.5.desc'), num: '05', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop' },
    { id: 'motion-graphic', title: t('services.6.title'), desc: t('services.6.desc'), num: '06', img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop' },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase"
          >
            {t('services.title')}
          </motion.h1>
        </div>
        
        <div className="flex flex-col border-t border-white/10">
          {services.map((service, i) => (
            <Link 
              to={`${baseUrl}/services/${service.id}`} 
              key={i} 
              className="group block border-b border-white/10 py-10 md:py-16 transition-colors duration-500 hover:bg-white/5 relative z-10"
              onMouseEnter={() => setHoveredService(i)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-8">
                <div className="flex items-center gap-6">
                  <span className="text-xl md:text-2xl font-mono text-slate-500 group-hover:text-blue-500 transition-colors">{service.num}</span>
                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-slate-300 group-hover:text-white transition-colors duration-500">
                    {service.title}
                  </h3>
                </div>
                <p className="text-lg md:text-xl text-slate-400 max-w-md md:text-right group-hover:text-slate-300 transition-colors">
                  {service.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Hover Image Reveal */}
      <AnimatePresence>
        {hoveredService !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: mousePosition.x - 200, // Offset to center the 400px width
              y: mousePosition.y - 250, // Offset to center the 500px height
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
            className="fixed top-0 left-0 w-[400px] h-[500px] pointer-events-none z-0 hidden md:block rounded-3xl overflow-hidden"
          >
            <img 
              src={services[hoveredService].img} 
              alt={services[hoveredService].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
