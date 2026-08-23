import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Globe, ExternalLink, X, Save } from 'lucide-react';
import { useAuth } from '../lib/AuthContext.tsx';

export default function AdminPortfolio() {
  const { token } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

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

  const handleDelete = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا العمل؟')) return;
    try {
      await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchItems();
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
        body: JSON.stringify({ title: currentItem.title, slug: currentItem.slug, category: currentItem.category, websiteUrl: currentItem.websiteUrl, image: currentItem.image, status: currentItem.status })
      });
      
      if (res.ok) {
        setIsEditing(false);
        setCurrentItem(null);
        fetchItems();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">سابقة الأعمال</h1>
          <p className="text-slate-500 text-sm">إدارة أعمالك ومشاريعك السابقة لعرضها في الموقع.</p>
        </div>
        <button 
          onClick={() => {
            setCurrentItem({ title: '', slug: '', category: 'E-Commerce', websiteUrl: '', image: '', status: 'published' });
            setIsEditing(true);
          }}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" /> إضافة عمل جديد
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-700">العمل</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-700">القسم</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-700">الرابط</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-700">الحالة</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-700 text-left">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">جاري التحميل...</td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">لا توجد أعمال مضافة، ابدأ بإضافة عمل جديد!</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="w-10 h-10 rounded object-cover border border-slate-200" />
                      )}
                      <div>
                        <div className="font-bold text-slate-900">{item.title}</div>
                        <div className="text-xs text-slate-400 font-mono" dir="ltr">{item.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{item.category}</td>
                  <td className="px-6 py-4">
                    {item.websiteUrl && (
                      <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-mono flex items-center gap-1" dir="ltr">
                        <ExternalLink className="w-3 h-3" /> رابط الموقع
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${item.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                      {item.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end gap-3">
                    <button onClick={() => { setCurrentItem(item); setIsEditing(true); }} className="text-slate-400 hover:text-blue-600 transition-colors" title="تعديل">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-red-600 transition-colors" title="حذف">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold">{currentItem?.id ? 'تعديل العمل' : 'إضافة عمل جديد'}</h2>
              <button onClick={() => { setIsEditing(false); setCurrentItem(null); }} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">اسم العمل</label>
                    <input
                      type="text"
                      required
                      value={currentItem.title}
                      onChange={(e) => {
                        const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        setCurrentItem({ ...currentItem, title: e.target.value, slug: currentItem.id ? currentItem.slug : slug });
                      }}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Slug (الرابط)</label>
                    <input
                      type="text"
                      required
                      value={currentItem.slug}
                      onChange={(e) => setCurrentItem({ ...currentItem, slug: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">القسم / التصنيف</label>
                    <input
                      type="text"
                      required
                      value={currentItem.category}
                      onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. E-Commerce"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">حالة النشر</label>
                    <select
                      value={currentItem.status}
                      onChange={(e) => setCurrentItem({ ...currentItem, status: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="published">منشور</option>
                      <option value="draft">مسودة</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">رابط الموقع (Website URL)</label>
                  <input
                    type="url"
                    value={currentItem.websiteUrl}
                    onChange={(e) => setCurrentItem({ ...currentItem, websiteUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                    dir="ltr"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">رابط الصورة (Image URL)</label>
                  <input
                    type="url"
                    value={currentItem.image}
                    onChange={(e) => setCurrentItem({ ...currentItem, image: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                    dir="ltr"
                    placeholder="https://..."
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    يمكنك استخدام خدمة مثل Thum.io لجلب لقطة شاشة: <code>https://image.thum.io/get/width/800/crop/800/maxAge/24/https://example.com</code>
                  </p>
                </div>

              </div>
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsEditing(false); setCurrentItem(null); }}
                  className="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-200 rounded-lg transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
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
