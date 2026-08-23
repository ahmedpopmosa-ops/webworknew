import { motion } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext.tsx';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20 flex flex-col items-center">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8"
        >
          {t('nav.contact')}
        </motion.h1>
        <p className="text-xl text-slate-400">Contact us at hello@webwork-eg.com</p>
      </div>
    </div>
  );
}
