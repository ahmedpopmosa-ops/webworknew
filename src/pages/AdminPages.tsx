import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Globe, ExternalLink } from 'lucide-react';
import { useAuth } from '../lib/AuthContext.tsx';
import { Link } from 'react-router-dom';

export default function AdminPages() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">إدارة الصفحات</h1>
          <p className="text-slate-500 text-sm">قم بإدارة محتوى الموقع وتصميم الصفحات وتحسين محركات البحث.</p>
        </div>
        <Link to="/admin/pages/new" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-5 h-5" /> إضافة صفحة جديدة
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-700">عنوان الصفحة</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-700">الرابط (Slug)</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-700">اللغة</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-700">الحالة</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-700 text-left">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">جاري التحميل...</td>
              </tr>
            ) : pages.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">لا توجد صفحات.</td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{page.title}</div>
                    {page.seoTitle && <div className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Globe className="w-3 h-3" /> تم تحسين SEO</div>}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-sm" dir="ltr">/{page.slug}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{page.language === 'en' ? 'English' : 'العربية'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${page.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                      {page.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end gap-3">
                    <Link to={`/admin/pages/${page.id}/edit`} className="text-slate-400 hover:text-blue-600 transition-colors" title="تعديل">
                      <Edit2 className="w-5 h-5" />
                    </Link>
                    <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors" title="عرض الصفحة">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <button className="text-slate-400 hover:text-red-600 transition-colors" title="حذف">
                      <Trash2 className="w-5 h-5" />
                    </button>
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
