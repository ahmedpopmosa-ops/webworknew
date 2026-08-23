import { GripVertical, Trash2, ChevronUp, ChevronDown, Copy } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface BlockEditorProps {
  block: any;
  updateBlock: (id: string, data: any) => void;
  removeBlock: (id: string) => void;
  moveUp?: () => void;
  moveDown?: () => void;
  isActive: boolean;
  onClick: () => void;
}

export default function BlockEditor({ block, updateBlock, removeBlock, isActive, onClick, moveUp, moveDown }: BlockEditorProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleFieldChange = (field: string, value: any) => {
    updateBlock(block.id, { ...block.data, [field]: value });
  };

  // Label map for block types
  const typeLabels: Record<string, string> = {
    hero: 'Hero Section',
    text: 'Text & Content',
    services: 'Services List',
    cta: 'Call to Action',
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl border-2 transition-all mb-4 overflow-hidden ${isActive ? 'border-blue-500 shadow-md' : 'border-slate-200 hover:border-slate-300'}`}
      onClick={onClick}
    >
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-3">
          <div {...attributes} {...listeners} className="text-slate-400 hover:text-slate-700 cursor-grab active:cursor-grabbing">
            <GripVertical className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-800 text-sm">{typeLabels[block.type] || block.type}</span>
        </div>
        <div className="flex items-center gap-2">
          {moveUp && (
            <button onClick={(e) => { e.stopPropagation(); moveUp(); }} className="text-slate-400 hover:text-slate-700 p-1">
              <ChevronUp className="w-4 h-4" />
            </button>
          )}
          {moveDown && (
            <button onClick={(e) => { e.stopPropagation(); moveDown(); }} className="text-slate-400 hover:text-slate-700 p-1">
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
          <div className="w-px h-4 bg-slate-300 mx-1"></div>
          <button onClick={(e) => { e.stopPropagation(); removeBlock(block.id); }} className="text-slate-400 hover:text-red-500 p-1">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isActive && (
        <div className="p-5 space-y-4">
          {/* Render different fields based on block type */}
          {block.type === 'hero' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Heading (H1)</label>
                <input type="text" value={block.data.heading || ''} onChange={e => handleFieldChange('heading', e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea value={block.data.description || ''} onChange={e => handleFieldChange('description', e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm min-h-[80px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Button Text</label>
                  <input type="text" value={block.data.primaryCtaText || ''} onChange={e => handleFieldChange('primaryCtaText', e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Button Link</label>
                  <input type="text" value={block.data.primaryCtaLink || ''} onChange={e => handleFieldChange('primaryCtaLink', e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-left" dir="ltr" />
                </div>
              </div>
            </>
          )}

          {block.type === 'text' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Heading</label>
                <input type="text" value={block.data.heading || ''} onChange={e => handleFieldChange('heading', e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rich Content</label>
                <textarea value={block.data.content || ''} onChange={e => handleFieldChange('content', e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm min-h-[150px]" />
              </div>
            </>
          )}

          {block.type === 'cta' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Call to Action Heading</label>
                <input type="text" value={block.data.heading || ''} onChange={e => handleFieldChange('heading', e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Button Text</label>
                  <input type="text" value={block.data.buttonText || ''} onChange={e => handleFieldChange('buttonText', e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Button URL</label>
                  <input type="text" value={block.data.buttonUrl || ''} onChange={e => handleFieldChange('buttonUrl', e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-left" dir="ltr" />
                </div>
              </div>
            </>
          )}

          {block.type === 'services' && (
             <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Section Title</label>
                <input type="text" value={block.data.heading || ''} onChange={e => handleFieldChange('heading', e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                <p className="text-xs text-slate-500 mt-2">Services items are automatically fetched from the Services database.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
}
