import { Outlet, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext.tsx';
import { LayoutDashboard, FileText, Settings, LogOut, PenTool, Image, Users, MessageSquare } from 'lucide-react';

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
  if (!user) return <Navigate to="/admin/login" />;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-slate-100 flex flex-col shrink-0">
        <div className="h-20 flex items-center justify-center border-b border-slate-100 shrink-0">
          <span className="text-xl font-black text-slate-900 tracking-tighter">WEBWORK <span className="text-blue-600 font-bold">CMS</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 font-bold text-sm transition-colors">
            <LayoutDashboard className="w-5 h-5" /> الرئيسية
          </Link>
          <Link to="/admin/ai-writer" className="flex items-center gap-3 px-3 py-2 text-blue-600 bg-blue-50 border border-blue-100 rounded-lg font-bold text-sm transition-colors">
            <PenTool className="w-5 h-5" /> الكاتب الذكي (AI)
          </Link>
          <Link to="/admin/pages" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 font-bold text-sm transition-colors">
            <FileText className="w-5 h-5" /> الصفحات
          </Link>
          <Link to="/admin/portfolio" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 font-bold text-sm transition-colors">
            <Image className="w-5 h-5" /> سابقة الأعمال
          </Link>
          <Link to="/admin/leads" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 font-bold text-sm transition-colors">
            <MessageSquare className="w-5 h-5" /> الرسائل
          </Link>
          <Link to="/admin/users" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 font-bold text-sm transition-colors">
            <Users className="w-5 h-5" /> المستخدمين
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 font-bold text-sm transition-colors">
            <Settings className="w-5 h-5" /> الإعدادات
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-100 shrink-0">
          <button onClick={logout} className="flex items-center justify-center gap-2 px-3 py-2.5 text-white bg-slate-900 rounded-lg hover:bg-slate-800 w-full font-bold text-sm transition-colors">
            <LogOut className="w-4 h-4" /> تسجيل خروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
