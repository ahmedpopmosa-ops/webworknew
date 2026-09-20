export interface DefaultPortfolioItem {
  id?: number;
  slug: string;
  title: string;
  category: string;
  websiteUrl: string;
  image: string;
  status: string;
}

export interface DefaultPageItem {
  id?: number;
  slug: string;
  title: string;
  content: string;
  blocks?: any;
  language: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
  robotsMeta?: string;
  status: string;
}

export const defaultPortfolioList: DefaultPortfolioItem[] = [
  // E-Commerce
  {
    slug: 'clh-egypt',
    title: 'CLH Egypt',
    category: 'E-Commerce',
    websiteUrl: 'https://clh-eg.com/',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'safa-lighting',
    title: 'Safa Lighting',
    category: 'E-Commerce',
    websiteUrl: 'https://safalighting.com',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'seraj-bright',
    title: 'Seraj Bright',
    category: 'E-Commerce',
    websiteUrl: 'https://serajbright.com/',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'elsafainc',
    title: 'El Safa Inc',
    category: 'E-Commerce',
    websiteUrl: 'https://elsafainc.com/',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'jolie-gold',
    title: 'Jolie Gold',
    category: 'E-Commerce',
    websiteUrl: 'https://joliegoldeg.com/',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'chongwei-electric',
    title: 'Chongwei Electric',
    category: 'E-Commerce',
    websiteUrl: 'https://chongwei-electric.com/',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  // Corporate & Marketing
  {
    slug: 'catchy-adv',
    title: 'Catchy Adv',
    category: 'Corporate / Agency',
    websiteUrl: 'https://catchy-adv.com/',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'happymotorhomes',
    title: 'Happy Motorhomes',
    category: 'Travel & Vehicles',
    websiteUrl: 'https://happymotorhomes.net/',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'verdanza',
    title: 'Verdanza',
    category: 'Corporate',
    websiteUrl: 'https://verdanza.net',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'true-for-training',
    title: 'True for Training',
    category: 'Education',
    websiteUrl: 'https://truefortraining.com',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'hp-clinics',
    title: 'HP Clinics',
    category: 'Healthcare',
    websiteUrl: 'https://hp-clinics.com/',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'softprimes',
    title: 'SoftPrimes',
    category: 'Tech & Software',
    websiteUrl: 'https://softprimes.com/',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'galala-challenge',
    title: 'Galala Challenge',
    category: 'Sports & Events',
    websiteUrl: 'https://galalachallenge.com/',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'ironstar-egypt',
    title: 'Ironstar Egypt',
    category: 'Sports & Events',
    websiteUrl: 'https://ironstaregypt.powerridesports.com/',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'nexara',
    title: 'Nexara',
    category: 'Corporate',
    websiteUrl: 'https://nexara-sa.com/',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'saraya-marketing',
    title: 'Saraya Marketing',
    category: 'Marketing',
    websiteUrl: 'https://sarayamarketing.com/',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'xpert',
    title: 'Xpert',
    category: 'Corporate',
    websiteUrl: 'https://xperteg.com/',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'different-mep',
    title: 'Different MEP',
    category: 'Engineering',
    websiteUrl: 'https://different-mep.com/',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'control-tech-sa',
    title: 'Control Tech SA',
    category: 'Engineering & Tech',
    websiteUrl: 'https://controltech-sa.com/',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'power-ride-sports',
    title: 'Power Ride Sports',
    category: 'Sports & Fitness',
    websiteUrl: 'http://powerridesports.com/',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'control-tech-ent',
    title: 'Control Tech ENT',
    category: 'Engineering',
    websiteUrl: 'https://controltech-ent.com/',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'discover-egypt-tour',
    title: 'Discover Egypt Tour',
    category: 'Tourism',
    websiteUrl: 'http://discoveregypttour.com/',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'cepurity',
    title: 'Cepurity',
    category: 'Corporate',
    websiteUrl: 'https://cepurity.com/',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'etqan',
    title: 'Etqan',
    category: 'NGO / Corporate',
    websiteUrl: 'https://etqan.org/',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'qapool',
    title: 'QaPool',
    category: 'Tech & Service',
    websiteUrl: 'https://qapool.com/',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'wow-me-clinics',
    title: 'Wow Me Clinics',
    category: 'Healthcare',
    websiteUrl: 'https://www.wowmeclinics.com/',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'taqa-noor',
    title: 'Taqa Noor',
    category: 'Energy',
    websiteUrl: 'https://taqanoor.com/',
    image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'egyptian-spanish',
    title: 'Egyptian Spanish SEO',
    category: 'SEO & Marketing',
    websiteUrl: 'https://egyptianspanish.com/',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'bremco',
    title: 'Bremco',
    category: 'Engineering / Construction',
    websiteUrl: 'https://bremcoeg.com/',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'sun-laser-cnc',
    title: 'Sun Laser CNC',
    category: 'Industrial',
    websiteUrl: 'https://sunlasercnc.com/',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  },
  {
    slug: 'tti-eg',
    title: 'TTI EG',
    category: 'Tech / Corporate',
    websiteUrl: 'http://ttieg.com/',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    status: 'published'
  }
];

export const defaultPagesList: DefaultPageItem[] = [
  {
    slug: 'home',
    title: 'الرئيسية',
    language: 'ar',
    content: 'محتوى الصفحة الرئيسية',
    seoTitle: 'WEBWORK | وكالة التسويق الرقمي وتصميم المواقع',
    seoDescription: 'نحن نبني تجارب رقمية استثنائية تحقق نتائج ملموسة. تصميم مواقع، تسويق رقمي، وتطبيقات ذكية.',
    status: 'published'
  },
  {
    slug: 'about',
    title: 'من نحن',
    language: 'ar',
    content: 'محتوى صفحة من نحن',
    seoTitle: 'من نحن | WEBWORK Agency',
    seoDescription: 'تعرف على قصة WEBWORK وفريق الخبراء المبدعين في البرمجة والتسويق.',
    status: 'published'
  },
  {
    slug: 'services',
    title: 'الخدمات',
    language: 'ar',
    content: 'محتوى صفحة الخدمات',
    seoTitle: 'خدماتنا | WEBWORK Digital Solutions',
    seoDescription: 'استكشف باقة خدماتنا المتكاملة من تطوير الويب والتسويق وتحسين محركات البحث وتطبيقات الموبايل.',
    status: 'published'
  },
  {
    slug: 'portfolio',
    title: 'سابقة الأعمال',
    language: 'ar',
    content: 'محتوى سابقة الأعمال',
    seoTitle: 'سابقة الأعمال والمشاريع | WEBWORK',
    seoDescription: 'تصفح أكثر من 30 مشروعاً ناجحاً نفذناها لعملائنا في مختلف القطاعات حول العالم.',
    status: 'published'
  },
  {
    slug: 'blog',
    title: 'المدونة',
    language: 'ar',
    content: 'محتوى المدونة والمقالات',
    seoTitle: 'مدونة WEBWORK | مقالات في التسويق والتطوير والـ SEO',
    seoDescription: 'أحدث المقالات والنصائح الاحترافية في عالم التقنية، السيو، والتسويق الرقمي.',
    status: 'published'
  },
  {
    slug: 'contact',
    title: 'اتصل بنا',
    language: 'ar',
    content: 'محتوى صفحة اتصل بنا',
    seoTitle: 'اتصل بنا | ابدأ مشروعك مع WEBWORK',
    seoDescription: 'تواصل مع فريقنا اليوم للحصول على استشارة مجانية وبدء رحلة نجاحك الرقمية.',
    status: 'published'
  },
  // Service detail pages
  {
    slug: 'services/web-design',
    title: 'خدمة تصميم المواقع الإلكترونية',
    language: 'ar',
    content: 'تصميم مواقع عصرية متجاوبة وسريعة.',
    seoTitle: 'تصميم مواقع احترافية | WEBWORK',
    seoDescription: 'نصمم مواقع إلكترونية جذابة وسريعة تزيد من مبيعاتك وتظهر علامتك التجارية بأفضل صورة.',
    status: 'published'
  },
  {
    slug: 'services/digital-marketing',
    title: 'خدمة التسويق الرقمي',
    language: 'ar',
    content: 'خطط تسويق رقمي متكاملة.',
    seoTitle: 'التسويق الرقمي الشامل | WEBWORK',
    seoDescription: 'حملات تسويقية متكاملة تستهدف جمهورك بدقة وتضاعف العائد على الاستثمار.',
    status: 'published'
  },
  {
    slug: 'services/seo-optimization',
    title: 'خدمة تحسين محركات البحث (SEO)',
    language: 'ar',
    content: 'تصدر الصفحة الأولى على جوجل.',
    seoTitle: 'خدمات سيو احترافية (SEO) | تصدر نتائج جوجل',
    seoDescription: 'استراتيجيات سيو مدروسة لبناء الروابط وتحسين الكلمات المفتاحية وزيادة الزيارات المجانية.',
    status: 'published'
  },
  {
    slug: 'services/mobile-apps',
    title: 'خدمة تطوير تطبيقات الموبايل',
    language: 'ar',
    content: 'تطبيقات iOS و Android فائقة الأداء.',
    seoTitle: 'تطوير تطبيقات الجوال | WEBWORK',
    seoDescription: 'برمجة وتطوير تطبيقات أندرويد وآيفون بأحدث التقنيات وأفضل تجربة مستخدم.',
    status: 'published'
  },
  {
    slug: 'services/branding',
    title: 'خدمة التصميم الجرافيكي والهوية التجارية',
    language: 'ar',
    content: 'بناء هويات بصرية لا تُنسى.',
    seoTitle: 'تصميم الهوية التجارية والبراندينج | WEBWORK',
    seoDescription: 'تصميم شعارات وهوية بصرية كاملة تعكس قوة واحترافية علامتك التجارية.',
    status: 'published'
  },
  {
    slug: 'services/motion-graphic',
    title: 'خدمة الموشن جرافيك والأنيميشن',
    language: 'ar',
    content: 'فيديوهات موشن جرافيك إبداعية.',
    seoTitle: 'إنتاج فيديوهات موشن جرافيك | WEBWORK',
    seoDescription: 'فيديوهات رسوم متحركة وموشن جرافيك احترافية تشرح فكرتك وتجذب عملاءك.',
    status: 'published'
  },
  {
    slug: 'services/marketing-strategy',
    title: 'خدمة استراتيجيات التسويق',
    language: 'ar',
    content: 'استراتيجيات نمو مبنية على البيانات.',
    seoTitle: 'استشارات واستراتيجيات التسويق | WEBWORK',
    seoDescription: 'خطط تسويقية مبنية على تحليل دقيق للسوق والمنافسين لتحقيق نمو مستدام.',
    status: 'published'
  },
  {
    slug: 'services/content-creation',
    title: 'خدمة صناعة المحتوى والكتابة الإبداعية',
    language: 'ar',
    content: 'محتوى مقنع وجذاب يحول الزوار إلى عملاء.',
    seoTitle: 'صناعة وكتابة المحتوى التسويقي | WEBWORK',
    seoDescription: 'كتابة محتوى إبداعي للمواقع ومنصات التواصل الاجتماعي يعزز ولاء العملاء.',
    status: 'published'
  },
  {
    slug: 'services/media-buying',
    title: 'خدمة الإعلانات الممولة (Media Buying & SEM)',
    language: 'ar',
    content: 'إدارة الحملات الإعلانية على جوجل ومنصات التواصل.',
    seoTitle: 'إدارة الحملات الإعلانية الممولة | WEBWORK',
    seoDescription: 'إدارة حملات Google Ads و Meta Ads بأعلى عائد وأقل تكلفة للاكتساب.',
    status: 'published'
  },
  {
    slug: 'services/email-marketing',
    title: 'خدمة التسويق بالبريد الإلكتروني',
    language: 'ar',
    content: 'حملات بريد إلكتروني تفاعلية ومؤتمتة.',
    seoTitle: 'التسويق عبر البريد الإلكتروني | WEBWORK',
    seoDescription: 'أتمتة الرسائل البريدية وزيادة المبيعات من خلال حملات مخصصة لجمهورك.',
    status: 'published'
  },
  {
    slug: 'services/360-vr',
    title: 'خدمة الواقع الافتراضي والجولات التفاعلية 360',
    language: 'ar',
    content: 'جولات افتراضية 360 درجة وتقنيات الواقع الافتراضي.',
    seoTitle: 'تصوير وجولات 360 درجة والواقع الافتراضي | WEBWORK',
    seoDescription: 'تجارب غامرة بتقنية 360 درجة لمعارضك ومشاريعك العقارية والتجارية.',
    status: 'published'
  }
];
