import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    'nav.login': 'Admin Login',
    'nav.startProject': 'Start Project',
    'hero.badge': 'AI-Powered Digital Agency',
    'hero.title.build': 'WE BUILD',
    'hero.title.digital': 'DIGITAL',
    'hero.title.experiences': 'EXPERIENCES',
    'hero.desc': 'We craft your digital presence to achieve real results. Web design, digital marketing, and smart applications for ambitious companies.',
    'hero.cta.start': 'Start Your Project',
    'hero.cta.portfolio': 'View Our Work',
    'stats.projects': 'Successful Projects',
    'stats.experience': 'Years Experience',
    'stats.satisfaction': 'Client Satisfaction',
    'services.label': 'Our Expertise',
    'services.title': 'Services',
    'services.1.title': 'WEB DESIGN',
    'services.1.desc': 'We build fast, responsive websites using the latest technologies.',
    'services.2.title': 'DIGITAL MARKETING',
    'services.2.desc': 'Integrated marketing plans to increase your sales.',
    'services.3.title': 'SEO OPTIMIZATION',
    'services.3.desc': 'Dominate Google results and multiply your traffic.',
    'services.4.title': 'MOBILE APPS',
    'services.4.desc': 'Professional iOS and Android applications.',
    'services.5.title': 'GRAPHIC DESIGN',
    'services.5.desc': 'Crafting memorable brand identities that stand out.',
    'services.6.title': 'MOTION GRAPHICS',
    'services.6.desc': 'Dynamic motion graphics and video animation.',
    'services.7.title': 'MARKETING STRATEGY',
    'services.7.desc': 'Data-driven marketing strategies for sustainable growth.',
    'services.8.title': 'CONTENT CREATION',
    'services.8.desc': 'Engaging, high-quality content that tells your story.',
    'services.9.title': 'MEDIA BUYING & SEM',
    'services.9.desc': 'Strategic ad placements and search engine marketing.',
    'services.10.title': 'EMAIL MARKETING',
    'services.10.desc': 'Targeted email campaigns that convert leads to customers.',
    'services.11.title': '360° VR EXPERIENCES',
    'services.11.desc': 'Immersive 360-degree virtual reality tours and interactive digital spaces.',
    'portfolio.label': 'Selected Works',
    'portfolio.title': 'Portfolio',
    'portfolio.viewAll': 'View All',
    'process.title': 'HOW WE WORK',
    'process.1.title': 'DISCOVER',
    'process.1.desc': 'We analyze your brand, audience, and goals to build a robust digital strategy.',
    'process.2.title': 'CREATE',
    'process.2.desc': 'Our designers and developers craft premium, scalable, and high-performance solutions.',
    'process.3.title': 'GROW',
    'process.3.desc': 'We launch and optimize through data-driven marketing and SEO for continuous growth.',
    'footer.talk': 'TALK.',
    'footer.desc': 'We craft ultra-modern digital experiences that drive growth, engagement, and results.',
    'footer.contact': 'Contact',
    'footer.socials': 'Socials',
    'footer.cairo': 'Cairo, Egypt',
    'footer.rights': '© 2024 WEBWORK DIGITAL AGENCY.',
    'footer.built': 'DESIGNED & BUILT WITH PASSION.',
    'about.1': 'WE ARE WEBWORK.',
    'about.2': 'YOUR PARTNER IN',
    'about.3': 'DIGITAL GROWTH.',
    'portfolio.page.title': 'Portfolio',
    'portfolio.page.label': 'Our Work'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.portfolio': 'أعمالنا',
    'nav.blog': 'المدونة',
    'nav.contact': 'تواصل معنا',
    'nav.dashboard': 'لوحة التحكم',
    'nav.logout': 'تسجيل خروج',
    'nav.login': 'دخول الإدارة',
    'nav.startProject': 'ابدأ مشروعك',
    'hero.badge': 'منصة مدعومة بالذكاء الاصطناعي',
    'hero.title.build': 'نصنع',
    'hero.title.digital': 'تجارب',
    'hero.title.experiences': 'رقمية',
    'hero.desc': 'نصنع حضورك الرقمي ليحقق نتائج حقيقية. تصميم مواقع، تسويق إلكتروني، وتطبيقات ذكية للشركات الطموحة.',
    'hero.cta.start': 'ابدأ مشروعك',
    'hero.cta.portfolio': 'شاهد أعمالنا',
    'stats.projects': 'مشروع ناجح',
    'stats.experience': 'سنة خبرة',
    'stats.satisfaction': 'رضا العملاء',
    'services.label': 'خبراتنا',
    'services.title': 'الخدمات',
    'services.1.title': 'تصميم المواقع',
    'services.1.desc': 'نصنع مواقع سريعة، متجاوبة ومبنية بأحدث التقنيات.',
    'services.2.title': 'التسويق الرقمي',
    'services.2.desc': 'خطط تسويقية متكاملة لزيادة مبيعاتك.',
    'services.3.title': 'تحسين محركات البحث',
    'services.3.desc': 'تصدر نتائج جوجل وضاعف زوار موقعك.',
    'services.4.title': 'تطبيقات الموبايل',
    'services.4.desc': 'تطبيقات iOS و Android احترافية.',
    'services.5.title': 'التصميم الجرافيكي',
    'services.5.desc': 'تصميم هويات تجارية مميزة تعلق في الأذهان.',
    'services.6.title': 'موشن جرافيك',
    'services.6.desc': 'فيديوهات موشن جرافيك ورسوم متحركة ديناميكية.',
    'services.7.title': 'استراتيجية التسويق',
    'services.7.desc': 'استراتيجيات تسويق مبنية على البيانات لتحقيق نمو مستدام.',
    'services.8.title': 'صناعة المحتوى',
    'services.8.desc': 'محتوى جذاب وعالي الجودة يروي قصة علامتك التجارية.',
    'services.9.title': 'شراء المساحات الإعلانية (SEM)',
    'services.9.desc': 'إدارة الحملات الإعلانية المدفوعة باحترافية.',
    'services.10.title': 'التسويق عبر البريد الإلكتروني',
    'services.10.desc': 'حملات بريد إلكتروني مستهدفة تحول العملاء المحتملين إلى مشترين.',
    'services.11.title': 'تجارب الواقع الافتراضي (360° VR)',
    'services.11.desc': 'جولات افتراضية تفاعلية وتجارب غامرة بتقنية 360 درجة لمساحاتك ومعارضك.',
    'portfolio.label': 'أعمال مختارة',
    'portfolio.title': 'سابقة الأعمال',
    'portfolio.viewAll': 'عرض الكل',
    'process.title': 'كيف نعمل',
    'process.1.title': 'نكتشف',
    'process.1.desc': 'نقوم بتحليل علامتك التجارية وجمهورك وأهدافك لبناء استراتيجية رقمية قوية.',
    'process.2.title': 'نبتكر',
    'process.2.desc': 'يصمم مطورونا حلولاً متميزة وقابلة للتطوير وعالية الأداء.',
    'process.3.title': 'ننمو',
    'process.3.desc': 'نطلق مشروعك ونحسنه من خلال التسويق المبني على البيانات للنمو المستمر.',
    'footer.talk': 'نتحدث.',
    'footer.desc': 'نصنع تجارب رقمية حديثة تدفع عجلة النمو والمشاركة والنتائج.',
    'footer.contact': 'تواصل معنا',
    'footer.socials': 'التواصل الاجتماعي',
    'footer.cairo': 'القاهرة، مصر',
    'footer.rights': '© 2024 وكالة وييب وورك الرقمية.',
    'footer.built': 'صُمم وطُور بشغف.',
    'about.1': 'نحن ويب وورك.',
    'about.2': 'شريكك في',
    'about.3': 'النمو الرقمي.',
    'portfolio.page.title': 'أعمالنا',
    'portfolio.page.label': 'مشاريعنا'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const isArabic = typeof window !== 'undefined' && window.location.pathname.startsWith('/ar');
  const [language, setLanguage] = useState<Language>(isArabic ? 'ar' : 'en');

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
