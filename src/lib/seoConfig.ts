export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  content: string;
  links: { href: string; text: string }[];
  lang: string;
  dir: string;
}

export const seoConfig: Record<string, SEOData> = {
  '/': {
    title: 'Webwork | Web Design, SEO & Digital Marketing Agency in Egypt',
    description: 'Webwork is a digital agency in Egypt delivering web design, SEO, digital marketing, branding and mobile app solutions that help ambitious businesses grow.',
    canonical: 'https://webwork-eg.com/',
    h1: 'We Build Digital Experiences',
    content: 'Webwork is a digital agency in Egypt delivering web design, SEO, digital marketing, branding and mobile app solutions that help ambitious businesses grow. We focus on results, user experience, and technical excellence.',
    links: [
      { href: '/services', text: 'Our Services' },
      { href: '/portfolio', text: 'Our Portfolio' },
      { href: '/contact', text: 'Contact Us' },
    ],
    lang: 'en',
    dir: 'ltr'
  },
  '/services': {
    title: 'Digital Services | Web Design, SEO & Marketing | Webwork',
    description: 'Explore Webwork digital services including web design, SEO optimization, digital marketing, branding, mobile apps and content creation in Egypt.',
    canonical: 'https://webwork-eg.com/services',
    h1: 'Digital Services That Drive Growth',
    content: 'Explore Webwork digital services including web design, SEO optimization, digital marketing, branding, mobile apps and content creation in Egypt. We provide end-to-end digital solutions for modern businesses.',
    links: [
      { href: '/services/web-design', text: 'Web Design' },
      { href: '/services/seo-optimization', text: 'SEO Optimization' },
      { href: '/services/digital-marketing', text: 'Digital Marketing' }
    ],
    lang: 'en',
    dir: 'ltr'
  },
  '/services/web-design': {
    title: 'Web Design Services in Egypt | Webwork',
    description: 'Custom, fast, and responsive web design and development services in Egypt. Build e-commerce and corporate websites that convert.',
    canonical: 'https://webwork-eg.com/services/web-design',
    h1: 'Web Design & Development',
    content: 'Custom, fast, and responsive web design and development services in Egypt. Build e-commerce and corporate websites that convert. We specialize in modern frameworks and scalable architectures.',
    links: [
      { href: '/services/seo-optimization', text: 'SEO Services' },
      { href: '/contact', text: 'Get a Quote' }
    ],
    lang: 'en',
    dir: 'ltr'
  },
  '/services/seo-optimization': {
    title: 'SEO Services in Egypt | Search Engine Optimization | Webwork',
    description: 'Grow qualified organic traffic with technical SEO, on-page optimization, local SEO and content strategies from Webwork in Egypt.',
    canonical: 'https://webwork-eg.com/services/seo-optimization',
    h1: 'SEO Optimization Services',
    content: 'Grow qualified organic traffic with technical SEO, on-page optimization, local SEO and content strategies from Webwork in Egypt. We help you rank higher on Google and reach your target audience effectively.',
    links: [
      { href: '/services/web-design', text: 'Web Design Services' },
      { href: '/contact', text: 'Start SEO Campaign' }
    ],
    lang: 'en',
    dir: 'ltr'
  },
  '/services/digital-marketing': {
    title: 'Digital Marketing Agency in Cairo | Webwork',
    description: 'Data-driven digital marketing, social media management, and performance ads to grow your business online in Egypt.',
    canonical: 'https://webwork-eg.com/services/digital-marketing',
    h1: 'Digital Marketing Solutions',
    content: 'Data-driven digital marketing, social media management, and performance ads to grow your business online in Egypt. Maximize your ROI with targeted campaigns.',
    links: [
      { href: '/portfolio', text: 'See Our Work' },
      { href: '/contact', text: 'Talk to an Expert' }
    ],
    lang: 'en',
    dir: 'ltr'
  },
  '/portfolio': {
    title: 'Our Portfolio | Web Design & Digital Projects | Webwork',
    description: 'View selected websites, e-commerce stores, branding projects and digital experiences created by Webwork for ambitious businesses.',
    canonical: 'https://webwork-eg.com/portfolio',
    h1: 'Selected Digital Work',
    content: 'View selected websites, e-commerce stores, branding projects and digital experiences created by Webwork for ambitious businesses. Our work speaks for itself.',
    links: [
      { href: '/services', text: 'View Services' },
      { href: '/contact', text: 'Start a Project' }
    ],
    lang: 'en',
    dir: 'ltr'
  },
  '/blog': {
    title: 'Digital Marketing & SEO Blog | Webwork',
    description: 'Practical insights about SEO, web design, digital marketing, e-commerce and online growth from the Webwork team.',
    canonical: 'https://webwork-eg.com/blog',
    h1: 'Digital Growth Insights',
    content: 'Practical insights about SEO, web design, digital marketing, e-commerce and online growth from the Webwork team. Stay updated with the latest digital trends.',
    links: [
      { href: '/blog/professional-web-design-services', text: 'Corporate Web Design Guide' },
      { href: '/services/seo-optimization', text: 'SEO Strategies' },
      { href: '/', text: 'Back to Home' }
    ],
    lang: 'en',
    dir: 'ltr'
  },
  '/blog/professional-web-design-services': {
    title: 'أفضل شركة تصميم مواقع | تصميم موقع الكتروني احترافي للشركات',
    description: 'هل تبحث عن تصميم مواقع احترافية؟ نقدم خدمات تصميم موقع الكتروني متجاوب وسريع بأفضل الأسعار لتعزيز مبيعاتك وتصدر نتائج محركات البحث. اطلب استشارتك الآن!',
    canonical: 'https://webwork-eg.com/blog/professional-web-design-services',
    h1: 'دليل تصميم مواقع الشركات: كيف تبني موقعاً احترافياً؟',
    content: 'دليل شامل حول تصميم موقع الكتروني احترافي للشركات، الفرق بين UI و UX، خطوات بناء منصة رقمية ناجحة، أسعار تصميم المواقع، وكيفية اختيار أفضل شركة تصميم مواقع في مصر.',
    links: [
      { href: '/services/web-design', text: 'Web Design Services' },
      { href: '/services/seo-optimization', text: 'SEO Services' },
      { href: '/portfolio', text: 'Our Portfolio' },
      { href: '/contact', text: 'Contact Us' }
    ],
    lang: 'ar',
    dir: 'rtl'
  },
  '/contact': {
    title: 'Contact Webwork | Start Your Digital Project',
    description: 'Contact Webwork in Cairo, Egypt to discuss web design, SEO, digital marketing, branding or mobile app projects.',
    canonical: 'https://webwork-eg.com/contact',
    h1: 'Start Your Digital Project',
    content: 'Contact Webwork in Cairo, Egypt to discuss web design, SEO, digital marketing, branding or mobile app projects. We are ready to help you grow.',
    links: [
      { href: '/services', text: 'Our Services' }
    ],
    lang: 'en',
    dir: 'ltr'
  },
  
  // ARABIC
  '/ar/': {
    title: 'ويب وورك | شركة تصميم مواقع، سيو وتسويق رقمي في مصر',
    description: 'ويب وورك هي وكالة رقمية في مصر تقدم حلول تصميم المواقع، تحسين محركات البحث، التسويق الرقمي، وتطبيقات الجوال لمساعدة الشركات الطموحة على النمو.',
    canonical: 'https://webwork-eg.com/ar/',
    h1: 'نحن نبني تجارب رقمية',
    content: 'ويب وورك هي وكالة رقمية في مصر تقدم حلول تصميم المواقع، تحسين محركات البحث، التسويق الرقمي، وتطبيقات الجوال لمساعدة الشركات الطموحة على النمو. نركز على النتائج وتجربة المستخدم.',
    links: [
      { href: '/ar/services', text: 'خدماتنا' },
      { href: '/ar/portfolio', text: 'أعمالنا' },
      { href: '/ar/contact', text: 'تواصل معنا' }
    ],
    lang: 'ar',
    dir: 'rtl'
  },
  '/ar/services': {
    title: 'الخدمات الرقمية | تصميم مواقع وتسويق رقمي | ويب وورك',
    description: 'اكتشف خدمات ويب وورك الرقمية بما في ذلك تصميم المواقع، تحسين محركات البحث، التسويق الرقمي وإنشاء المحتوى في مصر.',
    canonical: 'https://webwork-eg.com/ar/services',
    h1: 'خدمات رقمية تدفع نمو أعمالك',
    content: 'اكتشف خدمات ويب وورك الرقمية بما في ذلك تصميم المواقع، تحسين محركات البحث، التسويق الرقمي وإنشاء المحتوى في مصر. نقدم حلول رقمية متكاملة.',
    links: [
      { href: '/ar/services/web-design', text: 'تصميم المواقع' },
      { href: '/ar/services/seo-optimization', text: 'تحسين محركات البحث' },
      { href: '/ar/services/digital-marketing', text: 'التسويق الرقمي' }
    ],
    lang: 'ar',
    dir: 'rtl'
  },
  '/ar/services/seo-optimization': {
    title: 'خدمات تحسين محركات البحث SEO في مصر | ويب وورك',
    description: 'زيادة الزيارات العضوية المستهدفة من خلال خدمات السيو التقني، سيو الصفحات، والسيو المحلي من ويب وورك في مصر.',
    canonical: 'https://webwork-eg.com/ar/services/seo-optimization',
    h1: 'خدمات تحسين محركات البحث (SEO)',
    content: 'زيادة الزيارات العضوية المستهدفة من خلال خدمات السيو التقني، سيو الصفحات، والسيو المحلي من ويب وورك في مصر. نساعدك في تصدر نتائج بحث جوجل.',
    links: [
      { href: '/ar/services', text: 'الخدمات الأخرى' },
      { href: '/ar/contact', text: 'ابدأ حملة السيو' }
    ],
    lang: 'ar',
    dir: 'rtl'
  },
  '/ar/portfolio': {
    title: 'أعمالنا | تصميم مواقع ومشاريع رقمية | ويب وورك',
    description: 'شاهد مجموعة مختارة من المواقع الإلكترونية، المتاجر الإلكترونية، ومشاريع العلامات التجارية التي نفذتها ويب وورك.',
    canonical: 'https://webwork-eg.com/ar/portfolio',
    h1: 'أعمال رقمية مختارة',
    content: 'شاهد مجموعة مختارة من المواقع الإلكترونية، المتاجر الإلكترونية، ومشاريع العلامات التجارية التي نفذتها ويب وورك. أعمالنا تتحدث عن نفسها.',
    links: [
      { href: '/ar/services', text: 'تصفح خدماتنا' },
      { href: '/ar/contact', text: 'ابدأ مشروعك' }
    ],
    lang: 'ar',
    dir: 'rtl'
  },
  '/ar/blog': {
    title: 'مدونة التسويق الرقمي والسيو | ويب وورك',
    description: 'رؤى عملية ومقالات حول السيو، تصميم المواقع، التسويق الرقمي، والتجارة الإلكترونية من فريق ويب وورك.',
    canonical: 'https://webwork-eg.com/ar/blog',
    h1: 'رؤى وأفكار للنمو الرقمي',
    content: 'رؤى عملية ومقالات حول السيو، تصميم المواقع، التسويق الرقمي، والتجارة الإلكترونية من فريق ويب وورك. ابق على اطلاع بأحدث الاتجاهات.',
    links: [
      { href: '/ar/blog/professional-web-design-services', text: 'دليل تصميم مواقع الشركات' },
      { href: '/ar/services/seo-optimization', text: 'استراتيجيات السيو' },
      { href: '/ar/', text: 'العودة للرئيسية' }
    ],
    lang: 'ar',
    dir: 'rtl'
  },
  '/ar/blog/professional-web-design-services': {
    title: 'أفضل شركة تصميم مواقع | تصميم موقع الكتروني احترافي للشركات',
    description: 'هل تبحث عن تصميم مواقع احترافية؟ نقدم خدمات تصميم موقع الكتروني متجاوب وسريع بأفضل الأسعار لتعزيز مبيعاتك وتصدر نتائج محركات البحث. اطلب استشارتك الآن!',
    canonical: 'https://webwork-eg.com/ar/blog/professional-web-design-services',
    h1: 'دليل تصميم مواقع الشركات: كيف تبني موقعاً احترافياً؟',
    content: 'دليل شامل حول تصميم موقع الكتروني احترافي للشركات، الفرق بين UI و UX، خطوات بناء منصة رقمية ناجحة، أسعار تصميم المواقع، وكيفية اختيار أفضل شركة تصميم مواقع في مصر.',
    links: [
      { href: '/ar/services/web-design', text: 'خدمات تصميم المواقع' },
      { href: '/ar/services/seo-optimization', text: 'خدمات السيو' },
      { href: '/ar/portfolio', text: 'سابقة أعمالنا' },
      { href: '/ar/contact', text: 'تواصل معنا' }
    ],
    lang: 'ar',
    dir: 'rtl'
  },
  '/ar/contact': {
    title: 'تواصل مع ويب وورك | ابدأ مشروعك الرقمي',
    description: 'تواصل مع ويب وورك في القاهرة لمناقشة مشاريع تصميم المواقع، السيو، التسويق الرقمي أو تطبيقات الجوال.',
    canonical: 'https://webwork-eg.com/ar/contact',
    h1: 'ابدأ مشروعك الرقمي',
    content: 'تواصل مع ويب وورك في القاهرة لمناقشة مشاريع تصميم المواقع، السيو، التسويق الرقمي أو تطبيقات الجوال. نحن جاهزون لمساعدتك.',
    links: [
      { href: '/ar/services', text: 'خدماتنا' }
    ],
    lang: 'ar',
    dir: 'rtl'
  }
};
