import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, CheckCircle2, Mail, Sparkles, Clock, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext.tsx';

interface WhatsAppContactFormProps {
  className?: string;
  defaultService?: string;
}

const SERVICES_OPTIONS = {
  ar: [
    'تصميم وتطوير المواقع الإلكترونية',
    'التسويق الرقمي وإدارة الإعلانات',
    'تحسين محركات البحث (SEO)',
    'تطوير تطبيقات الموبايل (iOS & Android)',
    'تصميم الهوية البصرية والبراندينج',
    'فيديوهات الموشن جرافيك والمونتاج',
    'استشارات واستراتيجيات التسويق',
    'صناعة وكتابة المحتوى التسويقي',
    'تصوير وجولات 360 الواقع الافتراضي',
    'استشارة عامة / خدمة أخرى'
  ],
  en: [
    'Web Design & Development',
    'Digital Marketing & Ads Management',
    'Search Engine Optimization (SEO)',
    'Mobile Apps Development (iOS & Android)',
    'Branding & Visual Identity',
    'Motion Graphics & Video Editing',
    'Marketing Strategy & Consulting',
    'Content Creation & Copywriting',
    '360 Virtual Tours & VR Experiences',
    'General Inquiry / Other Service'
  ]
};

const BUDGET_OPTIONS = {
  ar: [
    'لم يتم تحديد الميزانية بعد',
    'أقل من 15,000 ج.م',
    '15,000 - 30,000 ج.م',
    '30,000 - 60,000 ج.م',
    'أكثر من 60,000 ج.م'
  ],
  en: [
    'Not determined yet',
    'Under $500',
    '$500 - $1,500',
    '$1,500 - $3,500',
    'More than $3,500'
  ]
};

const WHATSAPP_PHONE = '201117087647';
const CONTACT_EMAIL = 'info@webwork-eg.com';

export default function WhatsAppContactForm({ className = '', defaultService }: WhatsAppContactFormProps) {
  const { language, dir } = useLanguage();
  const isAr = language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService || (isAr ? SERVICES_OPTIONS.ar[0] : SERVICES_OPTIONS.en[0]),
    budget: isAr ? BUDGET_OPTIONS.ar[0] : BUDGET_OPTIONS.en[0],
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [error, setError] = useState('');

  const services = isAr ? SERVICES_OPTIONS.ar : SERVICES_OPTIONS.en;
  const budgets = isAr ? BUDGET_OPTIONS.ar : BUDGET_OPTIONS.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError(isAr ? 'برجاء إدخال الاسم' : 'Please enter your name');
      return;
    }

    if (!formData.phone.trim()) {
      setError(isAr ? 'برجاء إدخال رقم الهاتف أو الواتساب' : 'Please enter your phone/WhatsApp number');
      return;
    }

    // Build the WhatsApp message
    const messageLines = [
      isAr ? '🚀 *طلب مشروع جديد من موقع WEBWORK*' : '🚀 *New Project Inquiry from WEBWORK website*',
      '━━━━━━━━━━━━━━━━━━━━',
      `${isAr ? '👤 *الاسم:*' : '👤 *Name:*'} ${formData.name.trim()}`,
      `${isAr ? '📱 *الهاتف / الواتساب:*' : '📱 *Phone:*'} ${formData.phone.trim()}`,
      formData.email.trim() ? `${isAr ? '✉️ *البريد:*' : '✉️ *Email:*'} ${formData.email.trim()}` : null,
      `${isAr ? '💼 *الخدمة المطلوبة:*' : '💼 *Service:*'} ${formData.service}`,
      formData.budget ? `${isAr ? '💰 *الميزانية المقترحة:*' : '💰 *Budget:*'} ${formData.budget}` : null,
      formData.message.trim() 
        ? `${isAr ? '📝 *تفاصيل المشروع:*' : '📝 *Project Details:*'}\n${formData.message.trim()}` 
        : (isAr ? '📝 *ملاحظة:* أرغب في الاستفسار والبدء بمشروعي معكم.' : '📝 *Note:* I want to discuss and start my project with you.'),
      '━━━━━━━━━━━━━━━━━━━━',
      isAr ? '🌐 تم الإرسال من موقع webwork-eg.com' : '🌐 Sent from webwork-eg.com'
    ].filter(Boolean);

    const fullMessage = messageLines.join('\n');
    const targetUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(fullMessage)}`;
    setWhatsappUrl(targetUrl);
    setSubmitted(true);

    // Save lead to database in background
    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || 'client@whatsapp.direct',
          service: formData.service,
          budget: formData.budget,
          message: formData.message.trim() || 'Direct WhatsApp Inquiry',
          company: ''
        })
      }).catch(err => console.warn('Background lead capture error:', err));
    } catch {
      // Non-blocking
    }

    // Open WhatsApp directly
    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // If blocked by browser, the user can click the button
    }
  };

  return (
    <section 
      id="contact-form" 
      className={`py-24 bg-slate-950 text-white relative overflow-hidden ${className}`}
      dir={dir}
    >
      {/* Background Lighting Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs md:text-sm font-bold uppercase tracking-widest mb-6">
            <MessageCircle className="w-4 h-4" />
            <span>{isAr ? 'تواصل فوري ومباشر على الواتساب' : 'Instant WhatsApp Response'}</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-tight mb-6">
            {isAr ? (
              <>ابدأ مشروعك معنا <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">اليوم</span></>
            ) : (
              <>Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Extraordinary</span></>
            )}
          </h2>

          <p className="text-slate-400 text-base md:text-xl leading-relaxed">
            {isAr 
              ? 'املأ النموذج أدناه وسيتم نقلك مباشرة إلى محادثتنا على واتساب لمناقشة تفاصيل مشروعك واستلام عرض السعر فوراً.'
              : 'Fill out the form below and connect directly with our team on WhatsApp to discuss your project and receive an immediate quote.'}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl relative">
          
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-3xl font-bold mb-4">
                {isAr ? 'تم تجهيز رسالتك بنجاح!' : 'Your Message is Ready!'}
              </h3>
              
              <p className="text-slate-300 max-w-lg mb-8 text-lg leading-relaxed">
                {isAr 
                  ? 'تم فتح الواتساب لبدء المحادثة مباشرة مع فريقنا. إذا لم تفتح المحادثة تلقائياً على جهازك، اضغط على الزر الأخضر أدناه:'
                  : 'WhatsApp has been opened to connect directly with our team. If it did not open automatically, click the button below:'}
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-6 h-6" />
                <span>{isAr ? 'فتح المحادثة على واتساب الآن' : 'Open WhatsApp Chat Now'}</span>
                {dir === 'rtl' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </a>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm text-slate-400 hover:text-white transition-colors underline"
              >
                {isAr ? 'إرسال طلب مشروع آخر' : 'Submit another project inquiry'}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    {isAr ? 'الاسم بالكامل' : 'Full Name'} <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isAr ? 'مثال: أحمد محمود' : 'e.g. John Doe'}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-base"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    {isAr ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'} <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={isAr ? 'مثال: 01117087647' : 'e.g. +20 111 708 7647'}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-base"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    {isAr ? 'البريد الإلكتروني (اختياري)' : 'Email Address (Optional)'}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-base"
                    dir="ltr"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    {isAr ? 'الخدمة المطلوبة' : 'Required Service'} <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-base"
                  >
                    {services.map((srv, idx) => (
                      <option key={idx} value={srv} className="bg-slate-900 text-white">
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget Selector */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  {isAr ? 'الميزانية التقريبية للمشروع' : 'Estimated Project Budget'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {budgets.map((b, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`px-3 py-2.5 rounded-xl text-xs md:text-sm font-semibold border transition-all text-center ${
                        formData.budget === b
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950/60 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  {isAr ? 'تفاصيل المشروع أو الفكرة' : 'Project Details or Idea'}
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    isAr 
                      ? 'اشرح لنا بإيجاز فكرة موقعك أو أهداف حملتك التسويقية...' 
                      : 'Tell us briefly about your goals, features needed, or timeline...'
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-base resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-6">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-lg px-10 py-4 rounded-2xl transition-all shadow-xl shadow-emerald-950/60 hover:scale-[1.02] active:scale-98"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>{isAr ? 'إرسال إلى واتساب مباشرة' : 'Send via WhatsApp Now'}</span>
                  <Send className="w-5 h-5 opacity-90" />
                </button>

                <div className="flex items-center gap-6 text-xs md:text-sm text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    {isAr ? 'رد فوري خلال دقائق' : 'Fast Response'}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {isAr ? 'بياناتك في سرية تامة' : '100% Confidential'}
                  </span>
                </div>
              </div>
            </form>
          )}

          {/* Quick Direct Contacts Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>{isAr ? 'قنوات التواصل الرسمية لوكالة WEBWORK:' : 'Official WEBWORK Communication Channels:'}</span>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <a 
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                dir="ltr"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{CONTACT_EMAIL}</span>
              </a>

              <a 
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'محادثة مباشرة على واتساب' : 'Direct WhatsApp Chat'}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
