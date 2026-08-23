import { useState } from 'react';
import { useAuth } from '../lib/AuthContext.tsx';
import { PenTool, Loader2, Save, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AIArticleGenerator() {
  const { token } = useAuth();
  const [keyword, setKeyword] = useState('');
  const [secondaryKeywords, setSecondaryKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const generateArticle = async () => {
    if (!keyword) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ keyword, secondaryKeywords })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      alert('حدث خطأ أثناء التوليد');
    }
    setLoading(false);
  };

  const saveArticle = async () => {
    if (!result) return;
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: result.title,
          slug: result.suggestedSlug,
          content: result.content,
          seoTitle: result.title,
          seoDescription: result.metaDescription,
          focusKeyword: keyword,
          seoScore: result.seoScore,
          status: 'draft'
        })
      });
      if (res.ok) alert('تم حفظ المقال بنجاح كمسودة');
    } catch(e) {
      alert('خطأ أثناء الحفظ');
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
          <PenTool className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">الكاتب الذكي (AI Writer)</h1>
          <p className="text-slate-500 mt-1">توليد مقالات متوافقة مع قواعد السيو</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">الكلمة المفتاحية الرئيسية (Focus Keyword)</label>
            <input 
              type="text" 
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="مثال: شركة تصميم مواقع في مصر"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">الكلمات المفتاحية الثانوية (اختياري)</label>
            <input 
              type="text"
              value={secondaryKeywords}
              onChange={e => setSecondaryKeywords(e.target.value)}
              placeholder="افصل بينها بفاصلة (،)" 
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
            />
          </div>
        </div>
        
        <button 
          onClick={generateArticle}
          disabled={loading || !keyword}
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
        >
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> جاري توليد المقال...</> : 'توليد المقال الآن'}
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50 p-6 flex justify-between items-center">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">النتيجة</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full font-bold text-sm">
                <CheckCircle className="w-4 h-4" /> SEO Score: {result.seoScore}/100
              </div>
              <button onClick={saveArticle} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                <Save className="w-4 h-4" /> حفظ كمسودة
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">SEO Title:</label>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium">{result.title}</div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Meta Description:</label>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium">{result.metaDescription}</div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">URL Slug:</label>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium dir-ltr text-left">/{result.suggestedSlug}</div>
            </div>
            <div className="border-t border-slate-200 pt-6 mt-6">
              <h1 className="text-3xl font-black mb-6 text-slate-900">{result.h1}</h1>
              <div className="prose prose-slate max-w-none prose-headings:font-black prose-p:leading-relaxed text-slate-800">
                <ReactMarkdown>{result.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
