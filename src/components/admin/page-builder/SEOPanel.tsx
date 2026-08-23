import { Globe, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SEOPanelProps {
  seoData: any;
  setSeoData: (data: any) => void;
}

export default function SEOPanel({ seoData, setSeoData }: SEOPanelProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSeoData({ ...seoData, [e.target.name]: e.target.value });
  };

  // Basic SEO Score Calculation (Mock)
  const calculateScore = () => {
    let score = 0;
    if (seoData.seoTitle && seoData.seoTitle.length > 40) score += 30;
    if (seoData.seoDescription && seoData.seoDescription.length > 120) score += 30;
    if (seoData.seoKeywords) score += 20;
    if (seoData.canonicalUrl) score += 20;
    return score;
  };
  
  const score = calculateScore();

  return (
    <div className="space-y-6">
      {/* SEO Score Indicator */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-slate-700">SEO Score</span>
          <span className={`text-lg font-black ${score >= 80 ? 'text-green-600' : score >= 50 ? 'text-orange-500' : 'text-red-500'}`}>
            {score}/100
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div className={`h-2 rounded-full ${score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-orange-400' : 'bg-red-500'}`} style={{ width: `${score}%` }}></div>
        </div>
      </div>

      {/* Google Search Preview */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4" /> Google Preview
        </h3>
        <div className="text-left font-sans" dir="ltr">
          <div className="text-sm text-slate-800 flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
            <div>
              <div className="text-xs font-medium text-slate-900">WebWork</div>
              <div className="text-[11px] text-slate-500">https://webwork-eg.com/{seoData.slug || 'page'}</div>
            </div>
          </div>
          <div className="text-blue-600 text-lg font-medium cursor-pointer hover:underline mb-1 truncate">
            {seoData.seoTitle || 'SEO Title Example - WebWork'}
          </div>
          <div className="text-sm text-slate-600 line-clamp-2">
            {seoData.seoDescription || 'Provide a compelling meta description here to encourage users to click through to your page from search engine results.'}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">SEO Title</label>
          <input
            type="text"
            name="seoTitle"
            value={seoData.seoTitle || ''}
            onChange={handleChange}
            placeholder="Max 60 characters"
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            maxLength={60}
          />
          <div className="text-xs text-slate-400 mt-1 flex justify-between">
            <span>Recommended: 50-60 characters</span>
            <span>{(seoData.seoTitle || '').length}/60</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Meta Description</label>
          <textarea
            name="seoDescription"
            value={seoData.seoDescription || ''}
            onChange={handleChange}
            placeholder="Max 160 characters"
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[100px]"
            maxLength={160}
          />
          <div className="text-xs text-slate-400 mt-1 flex justify-between">
            <span>Recommended: 150-160 characters</span>
            <span>{(seoData.seoDescription || '').length}/160</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Focus Keyword</label>
          <input
            type="text"
            name="seoKeywords"
            value={seoData.seoKeywords || ''}
            onChange={handleChange}
            placeholder="e.g. digital marketing agency"
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="pt-4 border-t border-slate-100">
          <label className="block text-sm font-bold text-slate-700 mb-2">Canonical URL</label>
          <input
            type="text"
            name="canonicalUrl"
            value={seoData.canonicalUrl || ''}
            onChange={handleChange}
            placeholder="https://... (Leave empty for auto)"
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Robots Meta</label>
          <select
            name="robotsMeta"
            value={seoData.robotsMeta || 'index, follow'}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="index, follow">Index, Follow (Default)</option>
            <option value="noindex, follow">Noindex, Follow</option>
            <option value="index, nofollow">Index, Nofollow</option>
            <option value="noindex, nofollow">Noindex, Nofollow</option>
          </select>
        </div>
      </div>
    </div>
  );
}
