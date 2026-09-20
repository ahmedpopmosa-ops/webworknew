import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Globe, ExternalLink, Search, RefreshCw, Layers, CheckCircle } from 'lucide-react';
import { useAuth } from '../lib/AuthContext.tsx';
import { Link } from 'react-router-dom';

export default function AdminPages() {
  const { token } = useAuth();
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [seeding, setSeeding] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pages');
      if (res.ok) {
        const data = await res.json();
        setPages(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch('/api/admin/seed-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        showToast(data.message || 'تمت تهيئة الصفحات بنجاح!');
        fetchPages();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSeeding(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الصفحة؟')) return;
    try {
      await fetch(`/api/pages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPages(prev => prev.filter(p => p.id !== id));
      showToast('تم حذف الصفحة بنجاح');
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPages = pages.filter(p => {
    const matchesSearch = (p.title || '').toLowerCase().includes(search.toLowerCase()) || 
                          (p.slug || '').toLowerCase().includes(search.toLowerCase());
    const matchesLang = langFilter === 'all' || p.language === langFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesLang && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-xl z-50 flex items-center gap-2 text-sm font-bold animate-bounce">
          <CheckCircle className="w-5 h-5" />
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">إدارة الصفحات</h1>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-full border border-blue-100">
              {pages.length} صفحة
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">قم بإدارة محتوى الموقع وتصميم الصفحات وتحسين محركات البحث SEO.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm border border-slate-200"
            title="تهيئة واستيراد كافة صفحات وخدمات الموقع"
          >
            <RefreshCw className={`w-4 h-4 ${seeding ? 'animate-spin' : ''}`} />
            {seeding ? 'جاري التهيئة...' : 'تهيئة كافة الصفحات'}
          </button>
          <Link 
            to="/admin/pages/new" 
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm text-sm"
          >
            <Plus className="w-5 h-5" /> إضافة صفحة جديدة
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم أو الرابط..."
            className="w-full pl-4 pr-10 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={langFilter}
            onChange={(e) => setLangFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-slate-700"
          >
            <option value="all">كل اللغات</option>
            <option value="ar">العربية (AR)</option>
            <option value="en">English (EN)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-slate-700"
          >
            <option value="all">كل الحالات</option>
            <option value="published">منشور</option>
            <option value="draft">مسودة</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">عنوان الصفحة</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">الرابط (Slug)</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">اللغة</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">الحالة</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase text-left">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-2">
                    <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
                    <span>جاري تحميل الصفحات...</span>
                  </div>
                </td>
              </tr>
            ) : filteredPages.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-3">
                    <Layers className="w-10 h-10 text-slate-300" />
                    <p className="font-bold text-slate-700">لا توجد صفحات مطابقة للبحث</p>
                    <button
                      onClick={handleSeed}
                      className="text-xs bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-100 transition-colors"
                    >
                      استيراد كافة الصفحات الافتراضية
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredPages.map((page) => (
                <tr key={page.id || page.slug} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{page.title}</div>
                    {page.seoTitle ? (
                      <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                        <Globe className="w-3 h-3" /> SEO مهيأ: {page.seoTitle.slice(0, 40)}...
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Globe className="w-3 h-3" /> جاهز للتهيئة
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs" dir="ltr">/{page.slug}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-bold">
                      {page.language === 'en' ? 'English (EN)' : 'العربية (AR)'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${page.status === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                      {page.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/admin/pages/${page.id || page.slug}/edit`} 
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                        title="تعديل بالـ Page Builder"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <a 
                        href={`/${page.slug === 'home' ? '' : page.slug}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" 
                        title="معاينة الصفحة الحية"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button 
                        onClick={() => handleDelete(page.id)} 
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" 
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
