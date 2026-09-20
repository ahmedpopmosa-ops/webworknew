import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio.ts';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext.tsx';

export default function Portfolio() {
  const { t, dir } = useLanguage();
  const [items, setItems] = useState<any[]>(portfolioData);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        const dbItems = data.filter((item: any) => item.status === 'published');
        // Prepend DB items to static items
        setItems([...dbItems, ...portfolioData]);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-950 text-white pt-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="mb-20 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-500 font-bold tracking-widest uppercase mb-4"
          >
            {t('portfolio.page.label')}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase"
          >
            {t('portfolio.page.title')}
          </motion.h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-32" dir="ltr">
          {items.map((p, i) => (
            <motion.a 
              href={p.websiteUrl || p.url}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1 }}
              className="group relative cursor-pointer block"
              data-cursor-text="VISIT"
            >
              <div className="w-full aspect-[4/3] bg-slate-900 rounded-3xl overflow-hidden relative mb-6">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={p.image || p.img} 
                  alt={`Screenshot of ${p.title || p.name} website`}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-2 group-hover:text-blue-500 transition-colors">{p.title || p.name}</h3>
                  <p className="text-slate-400 uppercase tracking-widest text-xs font-bold">{p.category || p.cat}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-transparent transition-all">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
