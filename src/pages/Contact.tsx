import { motion } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext.tsx';
import WhatsAppContactForm from '../components/WhatsAppContactForm.tsx';
import { Mail, MessageCircle, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const { language, dir } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-16 flex flex-col" dir={dir}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs md:text-sm font-bold uppercase tracking-widest mb-6"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isAr ? 'تواصل معنا مباشرة' : 'Get In Touch'}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6"
          >
            {isAr ? 'ابدأ مشروعك مع WEBWORK' : "Let's Start Your Project"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed"
          >
            {isAr 
              ? 'تواصل معنا مباشرة عبر الواتساب أو البريد الإلكتروني لمناقشة فكرتك وتحويلها إلى واقع رقمي مبهر.' 
              : 'Connect with our team directly via WhatsApp or email to discuss your digital transformation.'}
          </motion.p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <a
            href="https://wa.me/201117087647"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900/60 border border-emerald-500/30 hover:border-emerald-500 p-8 rounded-3xl transition-all group hover:bg-slate-900 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">{isAr ? 'واتساب مباشر' : 'Direct WhatsApp'}</h3>
            <p className="text-slate-400 text-sm mb-4">{isAr ? 'محادثة فورية وسريعة مع فريقنا' : 'Fast instant chat with our specialists'}</p>
            <span className="text-emerald-400 font-bold text-sm inline-flex items-center gap-1 group-hover:underline">
              {isAr ? 'ابدأ المحادثة الآن ←' : 'Start Chatting Now →'}
            </span>
          </a>

          <a
            href="mailto:info@webwork-eg.com"
            className="bg-slate-900/60 border border-white/10 hover:border-blue-500 p-8 rounded-3xl transition-all group hover:bg-slate-900 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">{isAr ? 'البريد الإلكتروني' : 'Email Us'}</h3>
            <p className="text-slate-400 text-sm mb-4" dir="ltr">info@webwork-eg.com</p>
            <span className="text-blue-400 font-bold text-sm inline-flex items-center gap-1 group-hover:underline">
              {isAr ? 'أرسل رسالة بريدية ←' : 'Send an Email →'}
            </span>
          </a>

          <div className="bg-slate-900/60 border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-300 mb-6">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">{isAr ? 'المقر الرئيسي' : 'Headquarters'}</h3>
            <p className="text-slate-400 text-sm mb-4">{isAr ? 'القاهرة، جمهورية مصر العربية' : 'Cairo, Egypt'}</p>
            <span className="text-slate-500 text-sm inline-flex items-center gap-1">
              <Clock className="w-4 h-4" /> {isAr ? 'متاحون 24/7' : 'Available 24/7'}
            </span>
          </div>
        </div>

        {/* The WhatsApp Form */}
        <WhatsAppContactForm className="py-8" />
      </div>
    </div>
  );
}
