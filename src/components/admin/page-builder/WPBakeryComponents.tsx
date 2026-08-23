import React, { createContext, useContext, useState } from 'react';
import { GripVertical, Trash2, Copy, Settings, Plus, Layout, Type, Image as ImageIcon, MousePointerClick, AlignLeft, Grid, Briefcase, BarChart, Users, MessageSquare, ChevronUp, ChevronDown, Check, X, Search, Edit2, Maximize2 } from 'lucide-react';
import { RowData, ColumnData, ElementData, PageBuilderContextType, ElementType } from '../../../lib/builder-types.js';
import { ELEMENT_REGISTRY, ELEMENT_CATEGORIES } from './ElementRegistry.js';

export const PageBuilderContext = createContext<PageBuilderContextType | null>(null);

export function useBuilder() {
  const context = useContext(PageBuilderContext);
  if (!context) throw new Error('useBuilder must be used within a PageBuilderProvider');
  return context;
}

// =====================================
// ROW COMPONENT
// =====================================
export function WPRow({ row, index }: { row: RowData, index: number }) {
  const { removeRow, cloneRow, setColumnLayout, moveRowUp, moveRowDown } = useBuilder();
  const [showLayouts, setShowLayouts] = useState(false);

  const layouts = [
    { label: '1/1', value: '1/1', icon: <div className="w-full h-3 bg-slate-300 rounded-sm"></div> },
    { label: '1/2 + 1/2', value: '1/2+1/2', icon: <div className="w-full h-3 flex gap-1"><div className="w-1/2 bg-slate-300 rounded-sm"></div><div className="w-1/2 bg-slate-300 rounded-sm"></div></div> },
    { label: '1/3 + 1/3 + 1/3', value: '1/3+1/3+1/3', icon: <div className="w-full h-3 flex gap-1"><div className="w-1/3 bg-slate-300 rounded-sm"></div><div className="w-1/3 bg-slate-300 rounded-sm"></div><div className="w-1/3 bg-slate-300 rounded-sm"></div></div> },
    { label: '1/4 + 1/4 + 1/4 + 1/4', value: '1/4+1/4+1/4+1/4', icon: <div className="w-full h-3 flex gap-1"><div className="w-1/4 bg-slate-300 rounded-sm"></div><div className="w-1/4 bg-slate-300 rounded-sm"></div><div className="w-1/4 bg-slate-300 rounded-sm"></div><div className="w-1/4 bg-slate-300 rounded-sm"></div></div> },
    { label: '2/3 + 1/3', value: '2/3+1/3', icon: <div className="w-full h-3 flex gap-1"><div className="w-2/3 bg-slate-300 rounded-sm"></div><div className="w-1/3 bg-slate-300 rounded-sm"></div></div> },
    { label: '1/3 + 2/3', value: '1/3+2/3', icon: <div className="w-full h-3 flex gap-1"><div className="w-1/3 bg-slate-300 rounded-sm"></div><div className="w-2/3 bg-slate-300 rounded-sm"></div></div> },
  ];

  return (
    <div className="bg-slate-50 border border-slate-300 rounded-lg mb-6 shadow-sm overflow-visible">
      {/* Row Header/Toolbar */}
      <div className="bg-slate-200 border-b border-slate-300 px-3 py-2 flex items-center justify-between group relative rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="cursor-grab text-slate-400 hover:text-slate-700 p-1"><GripVertical className="w-4 h-4" /></div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Row</span>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-md shadow-sm border border-slate-200 px-1 absolute left-1/2 -translate-x-1/2 -top-3">
           <button onClick={() => moveRowUp(row.id)} className="p-1.5 hover:text-blue-600 hover:bg-slate-50 rounded" title="Move Up"><ChevronUp className="w-3.5 h-3.5" /></button>
           <button onClick={() => moveRowDown(row.id)} className="p-1.5 hover:text-blue-600 hover:bg-slate-50 rounded" title="Move Down"><ChevronDown className="w-3.5 h-3.5" /></button>
           <div className="w-px h-3 bg-slate-200 mx-1"></div>
           <button onClick={() => setShowLayouts(!showLayouts)} className="p-1.5 hover:text-blue-600 hover:bg-slate-50 rounded" title="Layout"><Layout className="w-3.5 h-3.5" /></button>
           <button onClick={() => {}} className="p-1.5 hover:text-blue-600 hover:bg-slate-50 rounded" title="Row Settings"><Settings className="w-3.5 h-3.5" /></button>
           <button onClick={() => cloneRow(row.id)} className="p-1.5 hover:text-blue-600 hover:bg-slate-50 rounded" title="Clone Row"><Copy className="w-3.5 h-3.5" /></button>
           <button onClick={() => removeRow(row.id)} className="p-1.5 hover:text-red-600 hover:bg-slate-50 rounded" title="Delete Row"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {showLayouts && (
        <div className="bg-white border-b border-slate-300 p-3 grid grid-cols-3 gap-2">
           {layouts.map(l => (
             <button 
               key={l.value} 
               onClick={() => { setColumnLayout(row.id, l.value); setShowLayouts(false); }}
               className={`p-2 border rounded hover:border-blue-500 hover:bg-blue-50 transition-colors ${row.layout === l.value ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}
               title={l.label}
             >
               {l.icon}
             </button>
           ))}
        </div>
      )}

      {/* Row Columns Wrapper */}
      <div className="flex flex-wrap p-2 -mx-1">
        {row.columns.map((col, cIndex) => (
          <WPColumn key={col.id} rowId={row.id} column={col} />
        ))}
      </div>
    </div>
  );
}

// =====================================
// COLUMN COMPONENT
// =====================================
function WPColumn({ rowId, column }: { rowId: string, column: ColumnData }) {
  const { openAddElement } = useBuilder();
  
  // Convert custom widths to tailwind approximations for backend display
  const widthClassMap: Record<string, string> = {
    '1/1': 'w-full',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '2/3': 'w-2/3',
    '1/4': 'w-1/4',
    '3/4': 'w-3/4',
  };
  const widthClass = widthClassMap[column.width] || 'w-full';

  return (
    <div className={`${widthClass} px-1 mb-2`}>
      <div className="h-full border border-dashed border-slate-300 rounded-md bg-white p-2 min-h-[120px] flex flex-col relative group/col transition-colors hover:border-blue-400">
        <div className="absolute top-0 right-0 p-1 opacity-0 group-hover/col:opacity-100 transition-opacity bg-white border-b border-l border-slate-200 rounded-bl z-10 flex">
           <button className="p-1 hover:text-blue-600"><Edit2 className="w-3 h-3" /></button>
        </div>
        
        <div className="flex-1 space-y-2">
          {column.elements.map((el, eIndex) => (
            <WPElement key={el.id} rowId={rowId} colId={column.id} element={el} />
          ))}
        </div>
        
        <button 
          onClick={() => openAddElement(rowId, column.id)}
          className="mt-3 w-full py-3 border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50 rounded-md text-slate-400 hover:text-blue-500 flex flex-col items-center justify-center transition-all group/add"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 group-hover/add:bg-blue-100 flex items-center justify-center mb-1">
            <Plus className="w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
}

// =====================================
// ELEMENT COMPONENT
// =====================================
function WPElement({ rowId, colId, element }: { rowId: string, colId: string, element: ElementData }) {
  const { removeElement, cloneElement, moveElementUp, moveElementDown, openElementSettings } = useBuilder();
  const def = ELEMENT_REGISTRY[element.type] || { name: element.type, icon: Layout };
  const Icon = def.icon;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded shadow-sm group/el relative">
      {/* Element Toolbar (Hover) */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover/el:opacity-100 transition-opacity bg-green-500 rounded text-white flex items-center shadow-md z-20 overflow-hidden">
        <button onClick={() => openElementSettings(rowId, colId, element)} className="p-1.5 hover:bg-green-600" title="Edit"><Edit2 className="w-3 h-3" /></button>
        <button onClick={() => cloneElement(rowId, colId, element.id)} className="p-1.5 hover:bg-green-600 border-l border-green-600" title="Clone"><Copy className="w-3 h-3" /></button>
        <button onClick={() => moveElementUp(rowId, colId, element.id)} className="p-1.5 hover:bg-green-600 border-l border-green-600" title="Move Up"><ChevronUp className="w-3 h-3" /></button>
        <button onClick={() => moveElementDown(rowId, colId, element.id)} className="p-1.5 hover:bg-green-600 border-l border-green-600" title="Move Down"><ChevronDown className="w-3 h-3" /></button>
        <button onClick={() => removeElement(rowId, colId, element.id)} className="p-1.5 hover:bg-green-600 border-l border-green-600" title="Delete"><Trash2 className="w-3 h-3" /></button>
      </div>

      <div className="p-3 flex gap-3 items-center" onClick={(e) => { e.stopPropagation(); openElementSettings(rowId, colId, element); }}>
        <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center text-slate-500 shrink-0">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 truncate">
          <div className="text-xs font-bold text-slate-800">{def.name}</div>
          <div className="text-[10px] text-slate-500 truncate">
             {/* Simple preview of content if available */}
             {element.content?.text || element.content?.heading || element.content?.html || 'Hover to edit settings'}
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================
// ADD ELEMENT MODAL
// =====================================
export function AddElementModal({ isOpen, onClose, onSelect }: { isOpen: boolean, onClose: () => void, onSelect: (type: string) => void }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredElements = Object.entries(ELEMENT_REGISTRY).filter(([key, def]) => {
    const matchesCat = activeCategory === 'All' || def.category === activeCategory;
    const matchesSearch = def.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Add Element</h2>
          <button onClick={onClose} className="text-slate-400 hover:bg-slate-100 p-2 rounded-full"><X className="w-5 h-5" /></button>
        </div>
        
        <div className="flex border-b border-slate-100 bg-slate-50 p-2">
          <div className="flex overflow-x-auto gap-1 pb-1">
             {ELEMENT_CATEGORIES.map(cat => (
               <button 
                 key={cat} 
                 onClick={() => setActiveCategory(cat)}
                 className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
               >
                 {cat}
               </button>
             ))}
          </div>
          <div className="ml-auto relative w-64 shrink-0">
             <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input type="text" placeholder="Search elements..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-4 pr-10 py-1.5 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredElements.map(([type, def]) => {
              const Icon = def.icon;
              return (
                <button 
                  key={type} 
                  onClick={() => onSelect(type)}
                  className="bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md p-4 rounded-xl text-center transition-all group flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm group-hover:text-blue-700">{def.name}</div>
                    <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">{def.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================
// ELEMENT SETTINGS MODAL
// =====================================
export function ElementSettingsModal({ 
  isOpen, 
  onClose, 
  element, 
  onSave 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  element: ElementData | null,
  onSave: (data: any) => void 
}) {
  const [formData, setFormData] = useState<any>(element?.content || {});
  const [designData, setDesignData] = useState<any>(element?.settings || {});
  const [activeTab, setActiveTab] = useState('general');

  // Sync when element changes
  React.useEffect(() => {
    if (element) {
      setFormData(element.content || {});
      setDesignData(element.settings || {});
      setActiveTab('general');
    }
  }, [element]);

  if (!isOpen || !element) return null;
  const def = ELEMENT_REGISTRY[element.type] || { name: element.type };

  const handleSave = () => {
    onSave({ content: formData, settings: designData });
    onClose();
  };

  const isDynamic = ['services', 'caseStudies', 'statistics', 'testimonials', 'clients'].includes(element.type);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900">{def.name} Settings</h2>
            {designData.name && <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-medium">{designData.name}</span>}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:bg-slate-200 p-2 rounded-full"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex border-b border-slate-100 px-2 bg-slate-50">
           <button onClick={() => setActiveTab('general')} className={`px-6 py-3 text-sm font-bold border-b-2 ${activeTab === 'general' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>General</button>
           <button onClick={() => setActiveTab('design')} className={`px-6 py-3 text-sm font-bold border-b-2 ${activeTab === 'design' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>Design Options</button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 bg-white">
          {activeTab === 'general' && (
             <div className="space-y-6">
               {/* ELEMENT ADMIN NAME */}
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Admin Label (For Outline View)</label>
                 <input type="text" value={designData.name || ''} placeholder={def.name} onChange={e => setDesignData({...designData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50" />
               </div>

               {/* HTML BLOCK */}
               {element.type === 'html' && (
                 <div>
                   <div className="flex items-center justify-between mb-2">
                     <label className="block text-sm font-bold text-slate-700">HTML Code</label>
                     <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Syntax highlighting active</span>
                   </div>
                   <textarea 
                     value={formData.html || ''} 
                     onChange={e => setFormData({...formData, html: e.target.value})} 
                     className="w-full px-4 py-4 border border-slate-200 rounded-lg min-h-[400px] font-mono text-sm bg-slate-900 text-green-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                     dir="ltr"
                     spellCheck={false}
                   />
                   <p className="text-xs text-slate-500 mt-2">You can use standard HTML tags here. Avoid using unclosed tags.</p>
                 </div>
               )}

               {/* HEADING BLOCK */}
               {element.type === 'heading' && (
                 <>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Heading Text</label>
                     <input type="text" value={formData.text || ''} onChange={e => setFormData({...formData, text: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Tag Level</label>
                       <select value={formData.level || 'h2'} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                         <option value="h1">H1 (Main Title)</option><option value="h2">H2 (Section Title)</option><option value="h3">H3 (Subsection)</option><option value="h4">H4</option>
                       </select>
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Alignment</label>
                       <select value={formData.alignment || 'left'} onChange={e => setFormData({...formData, alignment: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                         <option value="left">Left</option><option value="center">Center</option><option value="right">Right</option>
                       </select>
                     </div>
                   </div>
                 </>
               )}

               {/* TEXT BLOCK */}
               {element.type === 'text' && (
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Content (Rich Text)</label>
                   <textarea value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg min-h-[200px] focus:ring-2 focus:ring-blue-500" />
                 </div>
               )}

               {/* BUTTON BLOCK */}
               {element.type === 'button' && (
                 <>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Button Text</label>
                       <input type="text" value={formData.text || ''} onChange={e => setFormData({...formData, text: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">URL Target</label>
                       <input type="text" value={formData.url || ''} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-left focus:ring-2 focus:ring-blue-500" dir="ltr" placeholder="/about-us" />
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Style</label>
                       <select value={formData.style || 'primary'} onChange={e => setFormData({...formData, style: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                         <option value="primary">Primary Solid</option><option value="secondary">Secondary Solid</option><option value="outline">Outline</option>
                       </select>
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Size</label>
                       <select value={formData.size || 'md'} onChange={e => setFormData({...formData, size: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                         <option value="sm">Small</option><option value="md">Medium</option><option value="lg">Large</option>
                       </select>
                     </div>
                   </div>
                 </>
               )}

               {/* IMAGE BLOCK */}
               {element.type === 'image' && (
                 <>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
                     <input type="text" value={formData.url || ''} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-left focus:ring-2 focus:ring-blue-500" dir="ltr" placeholder="https://..." />
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Alt Text (For SEO)</label>
                     <input type="text" value={formData.alt || ''} onChange={e => setFormData({...formData, alt: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                   </div>
                 </>
               )}

               {/* DYNAMIC ELEMENTS (Services, Portfolio, etc) */}
               {isDynamic && (
                 <div className="space-y-6">
                   <div className="bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-200 flex items-start gap-3">
                     <Layout className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                     <div>
                       <h4 className="font-bold mb-1">Dynamic Data Element</h4>
                       <p className="text-sm">This component automatically pulls records from your database. You can control its layout and filters below.</p>
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Layout Style</label>
                       <select value={formData.layout || 'grid'} onChange={e => setFormData({...formData, layout: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                         <option value="grid">Grid View</option>
                         <option value="slider">Carousel / Slider</option>
                         <option value="list">Vertical List</option>
                       </select>
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Items to Display</label>
                       <input type="number" min="1" max="20" value={formData.count || 3} onChange={e => setFormData({...formData, count: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                     </div>
                   </div>
                 </div>
               )}

               {/* FAQ BLOCK */}
               {element.type === 'faq' && (
                 <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">FAQ Editor</label>
                   <p className="text-sm text-slate-500 mb-4">Edit Q&A directly or import from database.</p>
                   <textarea 
                     value={JSON.stringify(formData.questions || [], null, 2)} 
                     onChange={e => {
                       try { setFormData({...formData, questions: JSON.parse(e.target.value)}); } catch(err) { /* ignore parse error while typing */ }
                     }} 
                     className="w-full px-4 py-4 border border-slate-200 rounded-lg min-h-[200px] font-mono text-sm bg-slate-900 text-green-400" 
                     dir="ltr"
                   />
                 </div>
               )}

               {/* LEGACY BLOCKS */}
               {element.type === 'legacy_hero' && (
                 <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Badge Text</label>
                       <input type="text" value={formData.badge || ''} onChange={e => setFormData({...formData, badge: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                     </div>
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Title Line 1</label>
                       <input type="text" value={formData.titleLine1 || ''} onChange={e => setFormData({...formData, titleLine1: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Title Line 2 (Blue)</label>
                       <input type="text" value={formData.titleLine2 || ''} onChange={e => setFormData({...formData, titleLine2: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Title Line 3</label>
                       <input type="text" value={formData.titleLine3 || ''} onChange={e => setFormData({...formData, titleLine3: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                     </div>
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                     <textarea value={formData.desc || ''} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full px-3 py-2 border rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Button 1 Text</label>
                       <input type="text" value={formData.btn1Text || ''} onChange={e => setFormData({...formData, btn1Text: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                       <input type="text" value={formData.btn1Url || ''} onChange={e => setFormData({...formData, btn1Url: e.target.value})} className="w-full px-3 py-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500" dir="ltr" placeholder="URL" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Button 2 Text</label>
                       <input type="text" value={formData.btn2Text || ''} onChange={e => setFormData({...formData, btn2Text: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                       <input type="text" value={formData.btn2Url || ''} onChange={e => setFormData({...formData, btn2Url: e.target.value})} className="w-full px-3 py-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500" dir="ltr" placeholder="URL" />
                     </div>
                   </div>
                 </div>
               )}

               {element.type === 'legacy_about' && (
                 <div className="space-y-4">
                   <div className="grid grid-cols-3 gap-4">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Title Line 1</label>
                       <input type="text" value={formData.title1 || ''} onChange={e => setFormData({...formData, title1: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Title Line 2 (Gray)</label>
                       <input type="text" value={formData.title2 || ''} onChange={e => setFormData({...formData, title2: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Title Line 3</label>
                       <input type="text" value={formData.title3 || ''} onChange={e => setFormData({...formData, title3: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                     </div>
                   </div>
                   <div className="grid grid-cols-3 gap-4 mt-4">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Stat 1 Number & Label</label>
                       <input type="text" value={formData.stat1Number || ''} onChange={e => setFormData({...formData, stat1Number: e.target.value})} className="w-full px-3 py-2 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500" />
                       <input type="text" value={formData.stat1Label || ''} onChange={e => setFormData({...formData, stat1Label: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Stat 2 Number & Label</label>
                       <input type="text" value={formData.stat2Number || ''} onChange={e => setFormData({...formData, stat2Number: e.target.value})} className="w-full px-3 py-2 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500" />
                       <input type="text" value={formData.stat2Label || ''} onChange={e => setFormData({...formData, stat2Label: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Stat 3 Number & Label</label>
                       <input type="text" value={formData.stat3Number || ''} onChange={e => setFormData({...formData, stat3Number: e.target.value})} className="w-full px-3 py-2 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500" />
                       <input type="text" value={formData.stat3Label || ''} onChange={e => setFormData({...formData, stat3Label: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                     </div>
                   </div>
                 </div>
               )}

               {['legacy_services', 'legacy_portfolio'].includes(element.type) && (
                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Badge / Label</label>
                     <input type="text" value={formData.label || ''} onChange={e => setFormData({...formData, label: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Main Title</label>
                     <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                   </div>
                   {element.type === 'legacy_portfolio' && (
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">View All Text</label>
                       <input type="text" value={formData.viewAllText || ''} onChange={e => setFormData({...formData, viewAllText: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                     </div>
                   )}
                 </div>
               )}

               {element.type === 'legacy_process' && (
                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Main Title</label>
                     <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                   </div>
                   {[1, 2, 3].map(step => (
                     <div key={step} className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                       <div>
                         <label className="block text-sm font-bold text-slate-700 mb-2">Step {step} Title</label>
                         <input type="text" value={formData[`step${step}Title`] || ''} onChange={e => setFormData({...formData, [`step${step}Title`]: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                       </div>
                       <div>
                         <label className="block text-sm font-bold text-slate-700 mb-2">Step {step} Description</label>
                         <textarea value={formData[`step${step}Desc`] || ''} onChange={e => setFormData({...formData, [`step${step}Desc`]: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                       </div>
                     </div>
                   ))}
                 </div>
               )}
             </div>
          )}

          {/* DESIGN OPTIONS TAB */}
          {activeTab === 'design' && (
             <div className="space-y-8">
               
               {/* Margin & Padding Visualization */}
               <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex justify-center">
                 <div className="relative bg-orange-100 p-8 border border-orange-300 rounded-lg text-center font-mono text-xs w-full max-w-sm">
                   <span className="absolute top-2 left-2 text-orange-600 font-bold">Margin</span>
                   <input type="text" placeholder="0" className="w-12 h-8 text-center absolute top-2 left-1/2 -translate-x-1/2 border rounded" value={designData.marginTop || ''} onChange={e => setDesignData({...designData, marginTop: e.target.value})} />
                   <input type="text" placeholder="0" className="w-12 h-8 text-center absolute bottom-2 left-1/2 -translate-x-1/2 border rounded" value={designData.marginBottom || ''} onChange={e => setDesignData({...designData, marginBottom: e.target.value})} />
                   <input type="text" placeholder="0" className="w-12 h-8 text-center absolute left-2 top-1/2 -translate-y-1/2 border rounded" value={designData.marginLeft || ''} onChange={e => setDesignData({...designData, marginLeft: e.target.value})} />
                   <input type="text" placeholder="0" className="w-12 h-8 text-center absolute right-2 top-1/2 -translate-y-1/2 border rounded" value={designData.marginRight || ''} onChange={e => setDesignData({...designData, marginRight: e.target.value})} />

                   <div className="relative bg-green-100 p-8 border border-green-300 rounded text-center">
                     <span className="absolute top-2 left-2 text-green-600 font-bold">Padding</span>
                     <input type="text" placeholder="0" className="w-12 h-8 text-center absolute top-2 left-1/2 -translate-x-1/2 border rounded" value={designData.paddingTop || ''} onChange={e => setDesignData({...designData, paddingTop: e.target.value})} />
                     <input type="text" placeholder="0" className="w-12 h-8 text-center absolute bottom-2 left-1/2 -translate-x-1/2 border rounded" value={designData.paddingBottom || ''} onChange={e => setDesignData({...designData, paddingBottom: e.target.value})} />
                     <input type="text" placeholder="0" className="w-12 h-8 text-center absolute left-2 top-1/2 -translate-y-1/2 border rounded" value={designData.paddingLeft || ''} onChange={e => setDesignData({...designData, paddingLeft: e.target.value})} />
                     <input type="text" placeholder="0" className="w-12 h-8 text-center absolute right-2 top-1/2 -translate-y-1/2 border rounded" value={designData.paddingRight || ''} onChange={e => setDesignData({...designData, paddingRight: e.target.value})} />

                     <div className="bg-white border border-slate-300 p-4 rounded shadow-sm text-slate-400 flex items-center justify-center">
                        Element Content
                     </div>
                   </div>
                 </div>
               </div>

               {/* Advanced Styling */}
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">Background</h3>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-xs font-bold text-slate-500 mb-1">Background Color</label>
                       <div className="flex gap-2">
                         <input type="color" value={designData.bgColor || '#ffffff'} onChange={e => setDesignData({...designData, bgColor: e.target.value})} className="w-10 h-10 p-1 border rounded" />
                         <input type="text" value={designData.bgColor || ''} placeholder="#ffffff or transparent" onChange={e => setDesignData({...designData, bgColor: e.target.value})} className="flex-1 px-3 py-2 border border-slate-200 rounded" dir="ltr" />
                       </div>
                     </div>
                   </div>
                 </div>

                 <div>
                   <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">Advanced Identifiers</h3>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-xs font-bold text-slate-500 mb-1">Element ID</label>
                       <input type="text" value={designData.elementId || ''} placeholder="my-section" onChange={e => setDesignData({...designData, elementId: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded font-mono text-sm" dir="ltr" />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-500 mb-1">Extra CSS Classes</label>
                       <input type="text" value={designData.cssClasses || ''} placeholder="text-center shadow-lg" onChange={e => setDesignData({...designData, cssClasses: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded font-mono text-sm" dir="ltr" />
                     </div>
                     {!element && (
                       <div className="flex items-center gap-2 mt-4">
                         <input type="checkbox" id="fullBleed" checked={designData.fullBleed || false} onChange={e => setDesignData({...designData, fullBleed: e.target.checked})} className="w-4 h-4 text-blue-600 rounded border-slate-300" />
                         <label htmlFor="fullBleed" className="text-sm font-bold text-slate-700">Full Bleed Width (Remove wrapper)</label>
                       </div>
                     )}
                   </div>
                 </div>
               </div>

             </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
           <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 bg-white border border-slate-300 rounded-lg transition-colors">Cancel</button>
           <button onClick={handleSave} className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors shadow-sm"><Check className="w-4 h-4"/> Save Changes</button>
        </div>
      </div>
    </div>
  );
}
