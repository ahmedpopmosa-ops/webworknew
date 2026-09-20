import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Globe, ExternalLink, X, Save, Search, RefreshCw, Briefcase, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../lib/AuthContext.tsx';

export default function AdminPortfolio() {
  const { token } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [seeding, setSeeding] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
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
        showToast(data.message || 'تمت تهيئة كافة أعمال الشركة بنجاح!');
        fetchItems();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSeeding(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا العمل من سابقة الأعمال؟')) return;
    try {
      await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setItems(prev => prev.filter(i => i.id !== id));
      showToast('تم حذف العمل بنجاح');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = currentItem.id ? 'PUT' : 'POST';
      const url = currentItem.id ? `/api/portfolio/${currentItem.id}` : '/api/portfolio';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          title: currentItem.title, 
          slug: currentItem.slug, 
          category: currentItem.category, 
          websiteUrl: currentItem.websiteUrl, 
          image: currentItem.image, 
          status: currentItem.status 
        })
      });
      
      if (res.ok) {
        setIsEditing(false);
        setCurrentItem(null);
        showToast(currentItem.id ? 'تم تعديل العمل بنجاح!' : 'تمت إضافة العمل بنجاح!');
        fetchItems();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Get unique categories for filter
  const categories = Array.from(new Set(items.map(i => i.category).filter(Boolean)));

  const filteredItems = items.filter(item => {
    const matchesSearch = (item.title || '').toLowerCase().includes(search.toLowerCase()) ||
                          (item.slug || '').toLowerCase().includes(search.toLowerCase()) ||
                          (item.websiteUrl || '').toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
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
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">سابقة الأعمال</h1>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-full border border-blue-100">
              {items.length} مشروع
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">إدارة المشاريع وقصص النجاح المعروضة في الموقع للعملاء.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm border border-slate-200"
            title="استيراد وتحديث كافة أعمال ومشاريع الشركة (31 مشروع)"
          >
            <RefreshCw className={`w-4 h-4 ${seeding ? 'animate-spin' : ''}`} />
            {seeding ? 'جاري الاستيراد...' : 'استيراد كافة أعمال الشركة (31+)'}
          </button>
          <button 
            onClick={() => {
              setCurrentItem({ title: '', slug: '', category: 'E-Commerce', websiteUrl: '', image: '', status: 'published' });
              setIsEditing(true);
            }}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm text-sm"
          >
            <Plus className="w-5 h-5" /> إضافة عمل جديد
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث عن مشروع أو رابط..."
            className="w-full pl-4 pr-10 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-slate-700"
          >
            <option value="all">كل الأقسام ({items.length})</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
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
              <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">اسم المشروع والعميل</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">القسم</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">رابط الموقع الحي</th>
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
                    <span>جاري تحميل سابقة الأعمال...</span>
                  </div>
                </td>
              </tr>
            ) : filteredItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-3">
                    <Briefcase className="w-10 h-10 text-slate-300" />
                    <p className="font-bold text-slate-700">لا توجد أعمال مطابقة</p>
                    <button
                      onClick={handleSeed}
                      className="text-xs bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-100 transition-colors"
                    >
                      استيراد 31 مشروعاً من أعمال الشركة
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id || item.slug} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                            onError={(e) => {
                              // Fallback on image error
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</div>
                        <div className="text-xs text-slate-400 font-mono" dir="ltr">/{item.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-bold">
                      {item.category || 'عام'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.websiteUrl ? (
                      <a 
                        href={item.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-mono bg-blue-50 px-2.5 py-1 rounded-md transition-colors" 
                        dir="ltr"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {item.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${item.status === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                      {item.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => { setCurrentItem(item); setIsEditing(true); }} 
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                        title="تعديل"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
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

      {/* Edit / Add Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-slate-900">{currentItem?.id ? 'تعديل بيانات العمل' : 'إضافة عمل جديد لسابقة الأعمال'}</h2>
              </div>
              <button 
                onClick={() => { setIsEditing(false); setCurrentItem(null); }} 
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">اسم العمل / العميل *</label>
                    <input
                      type="text"
                      required
                      value={currentItem.title || ''}
                      onChange={(e) => {
                        const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                        setCurrentItem({ 
                          ...currentItem, 
                          title: e.target.value, 
                          slug: currentItem.id ? currentItem.slug : slug 
                        });
                      }}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                      placeholder="e.g. CLH Egypt"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Slug (الرابط التعريفي) *</label>
                    <input
                      type="text"
                      required
                      value={currentItem.slug || ''}
                      onChange={(e) => setCurrentItem({ ...currentItem, slug: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs text-left"
                      dir="ltr"
                      placeholder="clh-egypt"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">القسم / التصنيف *</label>
                    <input
                      type="text"
                      required
                      value={currentItem.category || ''}
                      onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                      placeholder="E-Commerce, Corporate, Healthcare..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">حالة النشر</label>
                    <select
                      value={currentItem.status || 'published'}
                      onChange={(e) => setCurrentItem({ ...currentItem, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                    >
                      <option value="published">منشور (ظاهر للزوار)</option>
                      <option value="draft">مسودة (مخفي)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رابط الموقع الحي (Website URL)</label>
                  <input
                    type="url"
                    value={currentItem.websiteUrl || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, websiteUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-left font-mono"
                    dir="ltr"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رابط الصورة (Image URL)</label>
                  <input
                    type="url"
                    value={currentItem.image || ''}
                    onChange={(e) => setCurrentItem({ ...currentItem, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-left font-mono"
                    dir="ltr"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                {currentItem.image && (
                  <div className="mt-2">
                    <p className="text-xs text-slate-400 mb-1">معاينة الصورة:</p>
                    <img 
                      src={currentItem.image} 
                      alt="Preview" 
                      className="w-32 h-20 object-cover rounded-lg border border-slate-200" 
                    />
                  </div>
                )}

              </div>
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsEditing(false); setCurrentItem(null); }}
                  className="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors text-sm"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm shadow-sm"
                >
                  <Save className="w-4 h-4" /> حفظ العمل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
