import { Users, FileText, Activity, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'إجمالي المقالات', value: '45', icon: <FileText className="text-blue-500 w-6 h-6" /> },
    { label: 'الزيارات النشطة', value: '1,204', icon: <Activity className="text-green-500 w-6 h-6" /> },
    { label: 'الرسائل الجديدة', value: '12', icon: <MessageSquare className="text-orange-500 w-6 h-6" /> },
    { label: 'المستخدمين', value: '8', icon: <Users className="text-purple-500 w-6 h-6" /> },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">نظرة عامة</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 mb-1">{s.label}</p>
              <p className="text-2xl font-black text-slate-900">{s.value}</p>
            </div>
            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center">
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 mb-6">أحدث المقالات المضافة</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div>
                  <h3 className="text-sm font-bold text-slate-700">أفضل طرق تحسين محركات البحث في 2024</h3>
                  <p className="text-xs text-slate-500 mt-1">بواسطة: أحمد مصطفى</p>
                </div>
                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full">منشور</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 mb-6">أحدث الرسائل</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div>
                  <h3 className="text-sm font-bold text-slate-700">شركة الصفوة للعقارات</h3>
                  <p className="text-xs text-slate-500 mt-1">طلب استشارة تصميم موقع</p>
                </div>
                <span className="text-xs font-medium text-slate-400">منذ ساعتين</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
