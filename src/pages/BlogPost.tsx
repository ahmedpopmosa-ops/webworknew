import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, User, ArrowLeft, ArrowUpRight, Share2, 
  CheckCircle2, HelpCircle, ChevronDown, ChevronUp, Copy, 
  MessageSquare, Sparkles, BookOpen, Layers, ShieldCheck, 
  TrendingUp, Award, ExternalLink
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { blogPosts, BlogPostItem } from '../data/blogData.ts';
import { useLanguage } from '../lib/LanguageContext.tsx';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { language, dir, t } = useLanguage();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Find post by slug
  const post: BlogPostItem | undefined = blogPosts.find(p => p.slug === slug) || blogPosts[0];

  // If no post is found, fallback to the main post
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (post) {
      document.title = `${post.seoTitle} | Webwork`;
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', post.seoDescription);

      // Add Article & FAQ JSON-LD Schema
      const schemaScriptId = 'article-json-ld';
      let schemaScript = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = schemaScriptId;
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }

      const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "headline": post.h1,
            "description": post.seoDescription,
            "image": post.coverImage,
            "datePublished": "2026-08-22T08:00:00+02:00",
            "dateModified": "2026-08-22T08:00:00+02:00",
            "author": {
              "@type": "Organization",
              "name": "Webwork Digital Agency",
              "url": "https://webwork-eg.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Webwork",
              "logo": {
                "@type": "ImageObject",
                "url": "https://webwork-eg.com/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": post.canonicalUrl
            }
          },
          ...(post.faqs.length > 0 ? [{
            "@type": "FAQPage",
            "mainEntity": post.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }] : [])
        ]
      };

      schemaScript.textContent = JSON.stringify(schemaData);
    }
  }, [post, slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">المقال غير موجود</h1>
        <Link to="/blog" className="text-blue-400 hover:underline flex items-center gap-2">
          العودة للمدونة <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : post.canonicalUrl;
  const isAr = language === 'ar';

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white pt-28 md:pt-36 pb-24" dir={dir}>
      
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-96 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link to={isAr ? "/ar" : "/"} className="hover:text-blue-400 transition-colors">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <span className="text-slate-600">/</span>
          <Link to={isAr ? "/ar/blog" : "/blog"} className="hover:text-blue-400 transition-colors">
            {isAr ? "المدونة" : "Blog"}
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300 truncate max-w-[200px] md:max-w-md">{post.category.ar}</span>
        </nav>

        {/* Header Block */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4" />
            {post.category.ar}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2] mb-6">
            {post.h1}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl mb-8">
            {post.excerpt}
          </p>

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-white/10 text-sm">
            <div className="flex items-center gap-4">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-12 h-12 rounded-full object-cover border border-white/20 shadow-md"
              />
              <div>
                <div className="font-bold text-white text-base">{post.author.name}</div>
                <div className="text-slate-400 text-xs">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>{post.publishedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>{post.readTime}</span>
              </div>
              
              {/* Share buttons */}
              <div className="flex items-center gap-2 border-r md:border-r-0 md:border-l border-white/10 pr-4 md:pr-0 md:pl-4">
                <button 
                  onClick={handleCopyLink}
                  title="نسخ رابط المقال"
                  className="p-2 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-all text-slate-300"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {copied && (
                  <span className="text-xs text-green-400 font-bold animate-fade-in">تم النسخ!</span>
                )}
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-green-600 hover:text-white transition-all text-slate-300"
                  title="مشاركة عبر واتساب"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Hero Image */}
        <div className="relative rounded-3xl overflow-hidden mb-16 border border-white/10 aspect-[16/9] md:aspect-[21/9] shadow-2xl bg-slate-900">
          <img 
            src={post.coverImage} 
            alt={post.focusKeyword}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white/70">
            <span>الصورة التوضيحية: تصميم مواقع احترافية للشركات والمتاجر</span>
            <span className="bg-slate-950/80 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">WEBWORK AGENCY</span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Table of Contents & Quick Navigation (Sidebar) */}
          <aside className="lg:col-span-4 order-2 lg:order-1 space-y-8">
            
            {/* Quick Index Card */}
            <div className="sticky top-28 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 text-white font-black text-lg mb-4 pb-3 border-b border-white/10">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span>فهرس محتويات الدليل</span>
              </div>
              
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <a href="#why-needed" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    لماذا تحتاج شركتك إلى تصميم موقع احترافي؟
                  </a>
                </li>
                <li>
                  <a href="#ui-vs-ux" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    الفرق بين تصميم وتطوير المواقع (UX vs UI)
                  </a>
                </li>
                <li>
                  <a href="#steps" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    أهم خطوات تصميم موقع ناجح خطوة بخطوة
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    كم يبلغ سعر وتكلفة تصميم الموقع؟
                  </a>
                </li>
                <li>
                  <a href="#how-to-choose" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    كيف تختار أفضل شركة تصميم مواقع؟
                  </a>
                </li>
                <li>
                  <a href="#case-study" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    دراسة حالة واقعية ونتائج حقيقية
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    الأسئلة الشائعة (FAQ)
                  </a>
                </li>
              </ul>

              {/* Consultation Card */}
              <div className="mt-8 pt-6 border-t border-white/10 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 -mx-6 -mb-6 p-6 rounded-b-2xl">
                <div className="text-white font-bold text-base mb-2">تريد تصميم موقع فريد لشركتك؟</div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  فريقنا مستعد لدراسة فكرتك وتقديم عرض فني ومالي مخصص مجاناً.
                </p>
                <Link 
                  to="/contact" 
                  className="block text-center w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-lg shadow-blue-600/30"
                >
                  اطلب استشارة مجانية الآن
                </Link>
              </div>
            </div>

            {/* Target Keywords Highlights Badge Box */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">الكلمات الدلالية للمقال:</div>
              <div className="flex flex-wrap gap-2">
                {[
                  post.focusKeyword,
                  ...post.secondaryKeywords,
                  ...post.longTailKeywords
                ].map((kw, i) => (
                  <span key={i} className="text-xs bg-white/5 border border-white/10 text-slate-300 px-3 py-1 rounded-full">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

          </aside>

          {/* Article Text Content */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-12">
            
            {/* Custom Interactive Article Content Blocks */}
            <section className="text-lg md:text-xl text-slate-300 leading-relaxed space-y-6">
              <p>
                لم يعد وجود موقع إلكتروني ترفاً تسويقياً، بل أصبح الركيزة الأساسية لنمو أي نشاط تجاري في العصر الرقمي. إن عملية <strong className="text-white font-bold bg-blue-600/20 px-2 py-0.5 rounded">تصميم مواقع</strong> الإنترنت اليوم لا تقتصر على وضع نصوص وألوان منسقة، بل هي فن تحويل الزائر العادي إلى عميل مخلص ومشتري دائم. عندما يبحث عميلك المحتمل عن خدماتك عبر محركات البحث، فإن موقعك هو واجهة عملك الأولى ومقرك الرقمي المفتوح على مدار الساعة.
              </p>

              <p>
                في هذا الدليل الشامل، سنتعرف معاً على كل ما يخص <strong className="text-white font-bold">تصميم موقع الكتروني احترافي لشركات</strong>؛ بدءاً من فهم الفارق بين التصميم والبرمجة، مروراً بخطوات بناء منصة رقمية ناجحة ومعدلات التكلفة، وحتى اختيار <strong className="text-white font-bold text-blue-400">أفضل شركة تصميم مواقع في مصر</strong> والوطن العربي لتنفيذ رؤيتك بدقة واحترافية.
              </p>
            </section>

            {/* Inline Image 1 (Responsive Web Design) */}
            <div className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80" 
                alt="تصميم مواقع إلكترونية متجاوبة للشركات على مختلف الشاشات" 
                className="w-full h-auto object-cover max-h-[450px]"
              />
              <div className="p-4 bg-slate-900/90 text-xs text-slate-400 text-center border-t border-white/5">
                شكل 1: تصميم موقع متجاوب يمنح المستخدمين تجربة تصفح متكاملة عبر مختلف الشاشات
              </div>
            </div>

            {/* Section 1: Why Needed */}
            <section id="why-needed" className="space-y-6 pt-6">
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3 border-r-4 md:border-r-8 border-blue-500 pr-4">
                لماذا تحتاج شركتك إلى تصميم موقع الكتروني احترافي؟
              </h2>
              
              <p className="text-slate-300 leading-relaxed">
                في سوق مليء بالمنافسة الشرسة، يفقد النشاط التجاري الذي لا يمتلك حضوراً رقمياً قوياً أكثر من نصف عملائه المحتملين لصالح المنافسين. إليك أبرز الأسباب التي تجعل الاستثمار في <strong className="text-white">تصميم موقع الكتروني</strong> قراراً استراتيجياً لا غنى عنه:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">1. بناء المصداقية الفورية</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    أكثر من 75% من العملاء يحكمون على احترافية الشركة بناءً على تجربة تصفح موقعها وفقاً لأبحاث ستانفورد.
                  </p>
                </div>

                <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-green-600/20 text-green-400 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">2. مضاعفة المبيعات</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    أزرار CTA مدروسة ورحلة مستخدم انسيابية تزيد معدل التحويل إلى مكالمات وعروض أسعار مؤكدة.
                  </p>
                </div>

                <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">3. تصميم موقع متجاوب</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    توافق كامل 100% مع الهواتف الذكية لتقليل معدل الارتداد وتصدر نتائج محرك بحث جوجل.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: UX vs UI */}
            <section id="ui-vs-ux" className="space-y-6 pt-6">
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3 border-r-4 md:border-r-8 border-blue-500 pr-4">
                ما الفرق بين تصميم وتطوير المواقع؟ (UX vs UI والتطوير)
              </h2>

              <p className="text-slate-300 leading-relaxed">
                يخلط الكثير من أصحاب الأعمال بين مفهومي التصميم والبرمجة، لكن إدراك <strong className="text-white">الفرق بين تصميم وتطوير المواقع</strong> يساعدك في تحديد متطلبات مشروعك بدقة متناهية:
              </p>

              {/* Comparison Box */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900 border border-white/10 rounded-2xl p-6 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-white/10">
                <div className="pt-4 md:pt-0 md:px-4">
                  <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full uppercase">UX Design</span>
                  <h4 className="text-base font-bold text-white mt-3 mb-2">تجربة المستخدم</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    تخطيط مسار الزائر، وهندسة المعلومات، وضمان وصول المستخدم للمنتج أو الخدمة بأسرع وقت وأقل جهد.
                  </p>
                </div>

                <div className="pt-4 md:pt-0 md:px-4">
                  <span className="text-xs font-bold bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full uppercase">UI Design</span>
                  <h4 className="text-base font-bold text-white mt-3 mb-2">واجهة المستخدم</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    الجماليات البصرية؛ تناسق الألوان، اختيار الخطوط، تصميم الأزرار والأيقونات لتعكس الهوية باحترافية.
                  </p>
                </div>

                <div className="pt-4 md:pt-0 md:px-4">
                  <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full uppercase">Development</span>
                  <h4 className="text-base font-bold text-white mt-3 mb-2">التطوير والبرمجة</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    كتابة الأكواد النظيفة السريعة، ربط قواعد البيانات، وضمان أعلى معايير الحماية والاستقرار.
                  </p>
                </div>
              </div>
            </section>

            {/* Inline Image 2 (UX vs UI Illustration) */}
            <div className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&auto=format&fit=crop&q=80" 
                alt="الفرق بين تصميم تجربة المستخدم UX وواجهة المستخدم UI للمواقع" 
                className="w-full h-auto object-cover max-h-[450px]"
              />
              <div className="p-4 bg-slate-900/90 text-xs text-slate-400 text-center border-t border-white/5">
                شكل 2: التعاون بين مصممي واجهات المستخدم والمطورين لبناء مواقع عالية الكفاءة
              </div>
            </div>

            {/* Section 3: Steps */}
            <section id="steps" className="space-y-6 pt-6">
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3 border-r-4 md:border-r-8 border-blue-500 pr-4">
                أهم خطوات تصميم موقع ناجح خطوة بخطوة
              </h2>

              <p className="text-slate-300 leading-relaxed">
                لضمان خروج المشروع بأعلى جودة ممكنة، تتبع أي <strong className="text-white">شركة تصميم مواقع</strong> رائدة منهجية عمل علمية ومنظمة:
              </p>

              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "تحليل النشاط التجاري وتحديد الجمهور المستهدف",
                    desc: "دراسة دقيقة للمنافسين وسلوك العملاء لتحديد نقاط التميز والفرص التسويقية الذهبية."
                  },
                  {
                    step: "02",
                    title: "رسم المخطط الهيكلي (Wireframing & Prototyping)",
                    desc: "توزيع العناصر وأزرار التحويل داخل مسودات تفاعلية للتأكد من سلاسة تجربة الاستخدام."
                  },
                  {
                    step: "03",
                    title: "التصميم البصري المبتكر",
                    desc: "ابتكار واجهات فريدة متوافقة مع الهوية البصرية لعلامتك التجارية لترك انطباع لا ينسى."
                  },
                  {
                    step: "04",
                    title: "البرمجة وبناء لوحة التحكم",
                    desc: "تكويد الصفحات بأحدث تقنيات الويب وربطها بلوحة تحكم سلسة وسهلة باللغة العربية."
                  },
                  {
                    step: "05",
                    title: "اختبار الأداء والسرعة والتهيئة لـ SEO",
                    desc: "فحص سرعة التحميل وتأمين الموقع بشهادات الحماية SSL وتهيئة الميتا تاج لتصدر جوجل."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-blue-500/50 transition-all">
                    <span className="text-2xl font-black text-blue-500 font-mono">{item.step}</span>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inline Image 3 (Team collaboration) */}
            <div className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80" 
                alt="فريق أفضل شركة تصميم مواقع أثناء برمجة وتطوير موقع إلكتروني" 
                className="w-full h-auto object-cover max-h-[450px]"
              />
              <div className="p-4 bg-slate-900/90 text-xs text-slate-400 text-center border-t border-white/5">
                شكل 3: فريق تطوير وتصميم المواقع أثناء تنفيذ المشاريع واختبار الأداء
              </div>
            </div>

            {/* Section 4: Pricing */}
            <section id="pricing" className="space-y-6 pt-6">
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3 border-r-4 md:border-r-8 border-blue-500 pr-4">
                كم يبلغ سعر تصميم موقع إلكتروني؟ وما العوامل المحددة للتكلفة؟
              </h2>

              <p className="text-slate-300 leading-relaxed">
                السؤال الأكثر تكراراً لدى العملاء هو: <em className="text-blue-300">"كم تكلفة و<strong className="text-white">سعر تصميم موقع</strong>؟"</em>. في الحقيقة، تختلف الأسعار بناءً على عدة عوامل تقنية وتشغيلية أساسية:
              </p>

              <ul className="space-y-3 text-slate-300 list-disc list-inside">
                <li><strong className="text-white">نوع وحجم الموقع:</strong> موقع تعريفي لشركة يختلف عن متجر إلكتروني متكامل أو منصة خدمات ضخمة.</li>
                <li><strong className="text-white">التصميم المخصص مقابل القوالب:</strong> البرمجة والتصميم الفريد المخصص يمنح سرعة وحماية وأداء أعلى.</li>
                <li><strong className="text-white">التكامل والربط التقني:</strong> الربط مع بوابات الدفع، شركات الشحن، وأنظمة CRM والرسائل التلقائية.</li>
              </ul>

              {/* Callout quote */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/30">
                <div className="flex items-start gap-4">
                  <Award className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">نصيحة خبراء ويب وورك:</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      احرص دائماً على اختيار <strong className="text-white font-bold">شركة تصميم مواقع بأسعار مناسبة</strong> تضمن لك الأمان، وسرعة السيرفرات، والدعم الفني الحقيقي بعد التسليم، وتجنب العروض الرخيصة جداً التي تسبب مشاكل أمنية وبطء شديد.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: How to Choose */}
            <section id="how-to-choose" className="space-y-6 pt-6">
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3 border-r-4 md:border-r-8 border-blue-500 pr-4">
                كيف تختار أفضل شركة تصميم مواقع لمشروعك؟
              </h2>

              <p className="text-slate-300 leading-relaxed">
                عند البحث والمقارنة بين <strong className="text-white">عروض تصميم مواقع</strong> المتوفرة، احرص على مراجعة المعايير التالية:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm">سابقة الأعمال المتنوعة</div>
                    <div className="text-xs text-slate-400 mt-1">تصفح المشاريع السابقة الحية وتأكد من سرعة وسلاسة التصفح على هاتفك.</div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm">الخبرة في السيو التقني</div>
                    <div className="text-xs text-slate-400 mt-1">تأكد أن الموقع مهيأ برمجياً لمحركات البحث منذ اليوم الأول.</div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm">الدعم الفني والضمان</div>
                    <div className="text-xs text-slate-400 mt-1">توفر خدمة عملاء وصيانة دورية لضمان استقرار موقعك على مدار الساعة.</div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm">سهولة لوحة التحكم</div>
                    <div className="text-xs text-slate-400 mt-1">تدريب فريقك على إدارة وإضافة المقالات والمنتجات بدون الحاجة لمبرمج.</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Case Study */}
            <section id="case-study" className="space-y-6 pt-6">
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3 border-r-4 md:border-r-8 border-blue-500 pr-4">
                دراسة حالة: كيف ساعد تصميم موقع جديد شركة في مضاعفة مبيعاتها؟
              </h2>

              <p className="text-slate-300 leading-relaxed">
                كانت إحدى شركات المقاولات تعتمد بنسبة 90% على الإعلانات الممولة ووسائل التواصل، لكنها عانت من ضعف الثقة وصعوبة إغلاق المشاريع الكبرى.
              </p>

              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-blue-500/20 rounded-3xl p-8">
                <div className="text-xs font-black uppercase tracking-widest text-blue-400 mb-4">النتائج المحققة خلال 90 يوماً:</div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-4xl font-black text-white mb-1">+180%</div>
                    <div className="text-xs text-slate-300">زيادة في متوسط وقت البقاء</div>
                  </div>

                  <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-4xl font-black text-green-400 mb-1">+140%</div>
                    <div className="text-xs text-slate-300">زيادة في طلبات عروض الأسعار</div>
                  </div>

                  <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-4xl font-black text-blue-400 mb-1">-35%</div>
                    <div className="text-xs text-slate-300">انخفاض في تكلفة اكتساب العميل</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: FAQ Accordion */}
            <section id="faq" className="space-y-6 pt-6">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-blue-400" />
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  الأسئلة الشائعة حول تصميم مواقع الشركات
                </h2>
              </div>

              <div className="space-y-4">
                {post.faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div 
                      key={index} 
                      className="border border-white/10 rounded-2xl overflow-hidden bg-slate-900/60 transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-white hover:text-blue-400 transition-colors"
                      >
                        <span className="text-base md:text-lg">{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-blue-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 text-slate-300 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Internal Links & CTA Box */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden my-12">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl">
                <span className="text-xs font-black uppercase tracking-widest text-blue-200 mb-2 block">ابدأ نجاحك الرقمي اليوم</span>
                <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                  هل أنت مستعد لبناء موقع إلكتروني يعزز مبيعاتك؟
                </h3>
                <p className="text-blue-100 text-base mb-8 leading-relaxed">
                  تواصل مع خبراء ويب وورك اليوم لمناقشة أهدافك وبناء منصة رقمية حديثة تضعك في صدارة منافسيك.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/contact" 
                    className="bg-white text-slate-950 hover:bg-slate-100 font-bold px-8 py-3.5 rounded-full text-base transition-all transform hover:scale-105 shadow-lg"
                  >
                    اطلب عرض سعر مجاني
                  </Link>
                  <Link 
                    to="/portfolio" 
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-3.5 rounded-full text-base transition-all flex items-center gap-2"
                  >
                    شاهد سابقة أعمالنا <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Related Services Links for SEO Internal Linking */}
            <div className="pt-8 border-t border-white/10">
              <h4 className="text-lg font-bold text-white mb-4">خدمات ذات صلة قد تهمك:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link to="/services/web-design" className="p-4 rounded-xl bg-slate-900 border border-white/10 hover:border-blue-500 transition-all flex items-center justify-between text-sm font-bold text-slate-200 hover:text-blue-400">
                  <span>خدمات تصميم وتطوير المواقع</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link to="/services/seo-optimization" className="p-4 rounded-xl bg-slate-900 border border-white/10 hover:border-blue-500 transition-all flex items-center justify-between text-sm font-bold text-slate-200 hover:text-blue-400">
                  <span>خدمات تحسين محركات البحث SEO</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link to="/services/digital-marketing" className="p-4 rounded-xl bg-slate-900 border border-white/10 hover:border-blue-500 transition-all flex items-center justify-between text-sm font-bold text-slate-200 hover:text-blue-400">
                  <span>التسويق الرقمي وإدارة الحملات</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>

    </article>
  );
}
