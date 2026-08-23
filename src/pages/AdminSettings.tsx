import { useState } from 'react';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'WEBWORK',
    contactEmail: 'hello@webwork-eg.com',
    phoneNumber: '+20 123 456 789',
    address: 'Cairo, Egypt',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('تم حفظ الإعدادات بنجاح. سيتم تطبيق هذه التغييرات على قاعدة البيانات قريباً.');
    }, 1000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">إعدادات الموقع</h1>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" /> {loading ? 'جاري الحفظ...' : 'حفظ التعديلات'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">المعلومات الأساسية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">اسم الموقع / الشركة</label>
            <input type="text" name="siteName" value={settings.siteName} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني للتواصل</label>
            <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف</label>
            <input type="text" name="phoneNumber" value={settings.phoneNumber} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">العنوان</label>
            <input type="text" name="address" value={settings.address} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">روابط التواصل الاجتماعي</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">فيسبوك</label>
            <input type="url" name="facebookUrl" value={settings.facebookUrl} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-left" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">انستجرام</label>
            <input type="url" name="instagramUrl" value={settings.instagramUrl} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-left" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">لينكد إن</label>
            <input type="url" name="linkedinUrl" value={settings.linkedinUrl} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-left" dir="ltr" />
          </div>
        </div>
      </div>
    </div>
  );
}
