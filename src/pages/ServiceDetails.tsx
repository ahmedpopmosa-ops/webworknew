import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../lib/LanguageContext';
import { servicesData } from '../data/servicesData';
import { CheckCircle2, ChevronRight, Phone, Mail, ArrowRight, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  
  const service = id ? servicesData[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const isAr = language === 'ar';
  
  const title = isAr ? service.titleAr : service.titleEn;
  const desc = isAr ? service.descAr : service.descEn;
  const h1 = isAr ? service.h1Ar : service.h1En;
  const intro = isAr ? service.introAr : service.introEn;
  const benefits = isAr ? service.benefitsAr : service.benefitsEn;
  const whyUs = isAr ? service.whyUsAr : service.whyUsEn;

  // Schema Markup
  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map(faq => ({
      "@type": "Question",
      "name": isAr ? faq.qAr : faq.qEn,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": isAr ? faq.aAr : faq.aEn
      }
    }))
  };

  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": title,
    "provider": {
      "@type": "Organization",
      "name": "WEBWORK DIGITAL AGENCY",
      "url": "https://webwork-agency.com"
    },
    "description": desc,
    "areaServed": "Global",
    "url": `https://webwork-agency.com/services/${service.slug}`
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": isAr ? "الرئيسية" : "Home",
        "item": "https://webwork-agency.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": `https://webwork-agency.com/services/${service.slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pt-24 pb-20">
      <Helmet>
        <title>{title} | WEBWORK AGENCY</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={`https://webwork-agency.com/services/${service.slug}`} />
        <script type="application/ld+json">{JSON.stringify(schemaService)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-6 mb-8 text-sm text-slate-400 flex items-center gap-2">
        <Link to="/" className="hover:text-blue-500 transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
        <ChevronRight className="w-4 h-4 rtl:rotate-180" />
        <span className="text-slate-200">{title}</span>
      </div>

      <article className="max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">{h1}</h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light border-l-4 border-blue-600 pl-6 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-6">
            {desc}
          </p>
        </header>

        {/* Featured Image */}
        <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-16 relative">
          <img 
            src={service.img} 
            alt={title} 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="prose prose-invert prose-lg max-w-none">
          {/* Intro Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">{isAr ? `ما هو ${title}؟` : `What is ${title}?`}</h2>
            <div className="space-y-4">
              {intro.map((para, idx) => (
                <p key={idx} className="text-slate-300 leading-relaxed m-0">{para}</p>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">{isAr ? 'فوائد ومميزات الخدمة' : 'Service Benefits'}</h2>
            <div className="space-y-4">
              {benefits.map((para, idx) => (
                <p key={idx} className="text-slate-300 leading-relaxed m-0">{para}</p>
              ))}
            </div>
          </section>

          {/* Core Features */}
          <section className="mb-16 bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800">
            <h2 className="text-3xl font-bold mb-8">{isAr ? 'الخدمات الفرعية والتفاصيل' : 'Core Features & Details'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 m-0 text-slate-100">{isAr ? feature.titleAr : feature.titleEn}</h3>
                    <p className="text-slate-400 m-0 leading-relaxed text-base">{isAr ? feature.descAr : feature.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Work Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">{isAr ? 'كيف نعمل؟ (مراحل التنفيذ)' : 'Our Process (How We Work)'}</h2>
            <div className="space-y-6">
              {service.process.map((step, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-6 items-start bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                  <div className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shrink-0 text-center min-w-[100px]">
                    {isAr ? step.stepAr : step.stepEn}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 m-0 text-slate-100">{isAr ? step.titleAr : step.titleEn}</h3>
                    <p className="text-slate-300 m-0 leading-relaxed">{isAr ? step.descAr : step.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">{isAr ? 'لماذا تختارنا؟' : 'Why Choose Us?'}</h2>
            <div className="space-y-4">
              {whyUs.map((para, idx) => (
                <p key={idx} className="text-slate-300 leading-relaxed m-0">{para}</p>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">{isAr ? 'الأسئلة الشائعة (FAQ)' : 'Frequently Asked Questions (FAQ)'}</h2>
            <div className="space-y-6">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-xl font-bold mb-4">{isAr ? faq.qAr : faq.qEn}</h3>
                  <p className="text-slate-400 m-0 leading-relaxed">{isAr ? faq.aAr : faq.aEn}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Trust Signals & CTA */}
        <div className="mt-20 bg-gradient-to-br from-blue-900/40 to-slate-900 rounded-3xl p-8 md:p-12 border border-blue-500/20 text-center">
          <h2 className="text-3xl font-bold mb-4">{isAr ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            {isAr 
              ? 'تواصل معنا اليوم لمناقشة مشروعك والحصول على استشارة مجانية من خبراء WEBWORK.' 
              : 'Contact us today to discuss your project and get a free consultation from WEBWORK experts.'}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://wa.me/201117087647" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold transition-all w-full sm:w-auto justify-center shadow-lg shadow-emerald-950/40 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              {isAr ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
            </a>
            <a 
              href="mailto:info@webwork-eg.com" 
              className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-bold transition-all w-full sm:w-auto justify-center border border-slate-700"
            >
              <Mail className="w-5 h-5" />
              {isAr ? 'راسلنا: info@webwork-eg.com' : 'Email Us'}
            </a>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-800 text-slate-400 flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
            <span>WEBWORK DIGITAL AGENCY</span>
            <span className="hidden md:inline">•</span>
            <span>{isAr ? 'القاهرة، مصر' : 'Cairo, Egypt'}</span>
            <span className="hidden md:inline">•</span>
            <span>E-E-A-T Certified Experts</span>
          </div>
        </div>
      </article>
    </div>
  );
}
