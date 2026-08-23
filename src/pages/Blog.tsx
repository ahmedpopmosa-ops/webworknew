import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, ArrowRight, ArrowLeft, ArrowUpRight, 
  Search, Sparkles, BookOpen, Tag 
} from 'lucide-react';
import { blogPosts, BlogPostItem } from '../data/blogData.ts';
import { useLanguage } from '../lib/LanguageContext.tsx';

export default function Blog() {
  const { language, dir, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const isAr = language === 'ar';

  const categories = [
    { id: 'all', nameAr: 'جميع المقالات', nameEn: 'All Articles' },
    { id: 'web-design', nameAr: 'تصميم المواقع', nameEn: 'Web Design' },
    { id: 'seo', nameAr: 'تحسين محركات البحث SEO', nameEn: 'SEO' },
    { id: 'marketing', nameAr: 'التسويق الرقمي', nameEn: 'Digital Marketing' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.focusKeyword.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'web-design') return matchesSearch && post.category.en.includes('Web');
    if (selectedCategory === 'seo') return matchesSearch && post.category.en.includes('SEO');
    if (selectedCategory === 'marketing') return matchesSearch && post.category.en.includes('Marketing');
    return matchesSearch;
  });

  const featuredPost = blogPosts.find(p => p.featured) || blogPosts[0];

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 md:pt-36 pb-24 selection:bg-blue-600 selection:text-white" dir={dir}>
      
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-1/3 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-4 h-4" />
            {isAr ? "مدونة ويب وورك الرقمية" : "WEBWORK DIGITAL BLOG"}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tight uppercase mb-6"
          >
            {isAr ? "رؤى وأدلة النمو الرقمي" : "DIGITAL GROWTH INSIGHTS"}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed"
          >
            {isAr 
              ? "مقالات متخصصة وأدلة شاملة في تصميم المواقع، السيو، والتسويق الرقمي لمساعدتك على مضاعفة أرباحك وتصدر نتائج البحث."
              : "Expert insights, comprehensive guides, and proven strategies in web design, SEO, and digital marketing."}
          </motion.p>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <Link 
              to={isAr ? `/ar/blog/${featuredPost.slug}` : `/blog/${featuredPost.slug}`}
              className="group block relative rounded-3xl overflow-hidden bg-slate-900/80 border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 relative h-72 lg:h-[480px] overflow-hidden">
                  <img 
                    src={featuredPost.coverImage} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/80" />
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-blue-600 text-white font-bold text-xs uppercase px-3 py-1.5 rounded-full shadow-lg">
                      {isAr ? "مقال مميز" : "FEATURED"}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-bold text-blue-400 uppercase tracking-wider mb-4">
                      <span>{isAr ? featuredPost.category.ar : featuredPost.category.en}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>

                    <h2 className="text-2xl lg:text-4xl font-black text-white group-hover:text-blue-400 transition-colors leading-tight mb-4">
                      {featuredPost.title}
                    </h2>

                    <p className="text-slate-300 text-sm lg:text-base leading-relaxed line-clamp-4 mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={featuredPost.author.avatar} 
                        alt={featuredPost.author.name} 
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <div className="font-bold text-white text-sm">{featuredPost.author.name}</div>
                        <div className="text-slate-400 text-xs">{featuredPost.publishedAt}</div>
                      </div>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-blue-600 text-white flex items-center justify-center transition-all">
                      {dir === 'rtl' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-8 border-b border-white/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {isAr ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={isAr ? "ابحث في المقالات..." : "Search articles..."}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
            >
              <Link 
                to={isAr ? `/ar/blog/${post.slug}` : `/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-3xl overflow-hidden bg-slate-900/60 border border-white/10 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl"
              >
                <div className="relative h-56 overflow-hidden bg-slate-800">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs font-bold text-blue-400 px-3 py-1 rounded-full">
                    {isAr ? post.category.ar : post.category.en}
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.publishedAt}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors leading-snug mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm font-bold text-blue-400 group-hover:text-blue-300">
                    <span>{isAr ? "قراءة المقال كاملاً" : "Read Full Article"}</span>
                    {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty state if search returns nothing */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-white/10">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{isAr ? "لم نجد مقالات مطابقة" : "No articles found"}</h3>
            <p className="text-slate-400 text-sm">{isAr ? "جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً" : "Try different keywords or clear filters"}</p>
          </div>
        )}

      </div>

    </div>
  );
}
