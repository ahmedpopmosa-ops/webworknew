import { useState, useEffect } from 'react';
import { Users, FileText, Layers, Briefcase, MessageSquare, ArrowUpRight, Sparkles, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pages: 17,
    portfolio: 31,
    posts: 6,
    leads: 12
  });

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        if (data) setStats(data);
      })
      .catch(console.error);
  }, []);

  const statCards = [
    { label: 'إجمالي الصفحات', value: stats.pages, icon: <Layers className="text-blue-500 w-6 h-6" />, link: '/admin/pages', color: 'blue' },
    { label: 'سابقة الأعمال (المشاريع)', value: stats.portfolio, icon: <Briefcase className="text-emerald-500 w-6 h-6" />, link: '/admin/portfolio', color: 'emerald' },
    { label: 'المقالات والأخبار', value: stats.posts, icon: <FileText className="text-purple-500 w-6 h-6" />, link: '/admin/ai-writer', color: 'purple' },
    { label: 'الرسائل والطلبات', value: stats.leads, icon: <MessageSquare className="text-amber-500 w-6 h-6" />, link: '/admin/leads', color: 'amber' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold border border-blue-500/30 inline-block mb-3">
            WEBWORK CMS v2.0
          </span>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">مرحباً بك في لوحة تحكم WEBWORK</h1>
          <p className="text-slate-300 text-sm max-w-xl">
            يمكنك من هنا إدارة كافة صفحات الموقع، سابقة الأعمال (31+ مشروع)، كتابة مقالات السيو بالذكاء الاصطناعي، ومتابعة رسائل العملاء.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            to="/admin/pages/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30"
          >
            <Plus className="w-4 h-4" /> صفحة جديدة
          </Link>
          <Link
            to="/admin/ai-writer"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-purple-600/30"
          >
            <Sparkles className="w-4 h-4" /> كاتب المقالات AI
          </Link>
        </div>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((s, i) => (
          <Link 
            key={i} 
            to={s.link} 
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex items-center justify-between group"
          >
            <div>
              <p className="text-xs font-bold text-slate-400 mb-1">{s.label}</p>
              <p className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{s.value}</p>
            </div>
            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              {s.icon}
            </div>
          </Link>
        ))}
      </div>

      {/* Shortcuts & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Pages */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-black text-slate-800">أبرز صفحات الموقع</h2>
            <Link to="/admin/pages" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              عرض الكل <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { title: 'الرئيسية (Home)', slug: '/home', lang: 'AR' },
              { title: 'من نحن (About Us)', slug: '/about', lang: 'AR' },
              { title: 'الخدمات (11 خدمة كاملة)', slug: '/services', lang: 'AR' },
              { title: 'سابقة الأعمال (Portfolio)', slug: '/portfolio', lang: 'AR' },
              { title: 'اتصل بنا (Contact Us)', slug: '/contact', lang: 'AR' },
            ].map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{p.title}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">{p.slug}</p>
                </div>
                <span className="px-2.5 py-1 bg-white text-slate-600 text-xs font-bold rounded-lg border border-slate-200">
                  {p.lang}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Portfolio */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-black text-slate-800">أحدث مشاريع سابقة الأعمال</h2>
            <Link to="/admin/portfolio" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              عرض كل الـ 31 مشروع <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { name: 'CLH Egypt', cat: 'E-Commerce', url: 'https://clh-eg.com/' },
              { name: 'Safa Lighting', cat: 'E-Commerce', url: 'https://safalighting.com' },
              { name: 'Catchy Adv', cat: 'Corporate / Agency', url: 'https://catchy-adv.com/' },
              { name: 'Happy Motorhomes', cat: 'Travel & Vehicles', url: 'https://happymotorhomes.net/' },
              { name: 'SoftPrimes', cat: 'Tech & Software', url: 'https://softprimes.com/' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{item.name}</h3>
                  <span className="text-xs text-slate-400">{item.cat}</span>
                </div>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-blue-600 hover:underline font-mono"
                  dir="ltr"
                >
                  {item.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
