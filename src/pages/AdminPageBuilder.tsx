import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Save, Eye, Layout, Settings, Share2, Type, Plus, Monitor, Tablet, Smartphone, Undo, Redo, X, Trash2, Edit2 } from 'lucide-react';
import { useAuth } from '../lib/AuthContext.tsx';
import SEOPanel from '../components/admin/page-builder/SEOPanel.tsx';
import { RowData, ColumnData, ElementData, PageBuilderContextType } from '../lib/builder-types.ts';
import { ELEMENT_REGISTRY } from '../components/admin/page-builder/ElementRegistry.ts';
import { parseHtmlToBlocks } from '../lib/page-migrator.ts';
import { PageBuilderContext, WPRow, AddElementModal, ElementSettingsModal } from '../components/admin/page-builder/WPBakeryComponents.tsx';

export default function AdminPageBuilder() {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop'|'tablet'|'mobile'>('desktop');
  const [migrationState, setMigrationState] = useState<'none' | 'needs-import' | 'imported'>('none');
  const [showImportModal, setShowImportModal] = useState(false);
  
  const [pageData, setPageData] = useState<any>({
    title: '',
    slug: '',
    status: 'draft',
    language: 'ar',
    content: '',
  });

  const [rows, setRows] = useState<RowData[]>([]);
  const [seoData, setSeoData] = useState<any>({});
  
  const [activeTab, setActiveTab] = useState<'builder' | 'settings' | 'seo'>('builder');

  // Modals state
  const [isAddElementOpen, setIsAddElementOpen] = useState(false);
  const [addElementTarget, setAddElementTarget] = useState<{rowId: string, colId: string} | null>(null);
  
  const [isElementSettingsOpen, setIsElementSettingsOpen] = useState(false);
  const [editingElement, setEditingElement] = useState<{rowId: string, colId: string, el: ElementData} | null>(null);

  useEffect(() => {
    if (!isNew) {
      fetchPage();
    }
  }, [id]);

  const fetchPage = async () => {
    try {
      const res = await fetch(`/api/pages`);
      if (res.ok) {
        const pages = await res.json();
        const page = pages.find((p: any) => p.id === Number(id));
        if (page) {
          setPageData({
            title: page.title,
            slug: page.slug,
            status: page.status,
            language: page.language || 'ar',
            content: page.content, // legacy
          });
          
          let loadedRows: RowData[] = [];
          if (page.blocks) {
            let parsedBlocks = typeof page.blocks === 'string' ? JSON.parse(page.blocks) : page.blocks;
            
            // Migration: if it's the old flat structure, convert to Row -> Column -> Element
            if (parsedBlocks.length > 0 && !parsedBlocks[0].columns) {
               loadedRows = parsedBlocks.map((oldBlock: any) => {
                 return {
                   id: `row-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                   layout: '1/1',
                   settings: {},
                   columns: [
                     {
                       id: `col-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                       width: '1/1',
                       settings: {},
                       elements: [
                         {
                           id: oldBlock.id || `el-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                           type: oldBlock.type,
                           content: oldBlock.data || {},
                           settings: {}
                         }
                       ]
                     }
                   ]
                 }
               });
            } else {
               loadedRows = parsedBlocks;
            }
          }
          
          // Requirement 6: ONE-TIME MIGRATION if page builder data DOES NOT EXIST
          if (loadedRows.length === 0 && (page.content || page.slug === 'home')) {
            const migratedRows = parseHtmlToBlocks(page.content || '', page.slug);
            if (migratedRows.length > 0) {
              loadedRows = migratedRows;
              setMigrationState('imported');
              // Optionally trigger a silent save here, but as per requirement 8: 
              // "Only after publishing should the new Page Builder structure replace the old frontend output."
              // We just load it in the builder state.
            }
          }
          
          setRows(loadedRows);
          
          setSeoData({
            seoTitle: page.seoTitle,
            seoDescription: page.seoDescription,
            seoKeywords: page.seoKeywords,
            canonicalUrl: page.canonicalUrl,
            robotsMeta: page.robotsMeta,
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- BUILDER ACTIONS ---

  const addRow = () => {
    const newRow: RowData = {
      id: `row-${Date.now()}`,
      layout: '1/1',
      settings: {},
      columns: [
        {
          id: `col-${Date.now()}`,
          width: '1/1',
          settings: {},
          elements: []
        }
      ]
    };
    setRows([...rows, newRow]);
  };

  const updateRow = (id: string, data: any) => {
    setRows(rows.map(r => r.id === id ? { ...r, ...data } : r));
  };

  const removeRow = (id: string) => {
    if (confirm('Are you sure you want to delete this row and all its contents?')) {
      setRows(rows.filter(r => r.id !== id));
    }
  };

  const cloneRow = (id: string) => {
    const rowToClone = rows.find(r => r.id === id);
    if (!rowToClone) return;
    
    // Deep clone with new IDs
    const newRow = JSON.parse(JSON.stringify(rowToClone));
    newRow.id = `row-${Date.now()}`;
    newRow.columns.forEach((c: any) => {
      c.id = `col-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      c.elements.forEach((e: any) => {
        e.id = `el-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      });
    });
    
    const index = rows.findIndex(r => r.id === id);
    const newRows = [...rows];
    newRows.splice(index + 1, 0, newRow);
    setRows(newRows);
  };

  const moveRowUp = (id: string) => {
    const index = rows.findIndex(r => r.id === id);
    if (index > 0) {
      const newRows = [...rows];
      [newRows[index - 1], newRows[index]] = [newRows[index], newRows[index - 1]];
      setRows(newRows);
    }
  };

  const moveRowDown = (id: string) => {
    const index = rows.findIndex(r => r.id === id);
    if (index < rows.length - 1) {
      const newRows = [...rows];
      [newRows[index + 1], newRows[index]] = [newRows[index], newRows[index + 1]];
      setRows(newRows);
    }
  };

  const setColumnLayout = (rowId: string, layout: string) => {
    setRows(rows.map(r => {
      if (r.id !== rowId) return r;
      
      const widths = layout.split('+');
      let newColumns = [...r.columns];
      
      // Adjust columns array size to match layout
      while (newColumns.length < widths.length) {
        newColumns.push({
          id: `col-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          width: widths[newColumns.length],
          settings: {},
          elements: []
        });
      }
      if (newColumns.length > widths.length) {
        // Warning: losing elements if shrinking columns! For now just slice.
        newColumns = newColumns.slice(0, widths.length);
      }
      
      // Update widths
      newColumns = newColumns.map((c, i) => ({ ...c, width: widths[i] }));
      
      return { ...r, layout, columns: newColumns };
    }));
  };

  const openAddElement = (rowId: string, colId: string) => {
    setAddElementTarget({ rowId, colId });
    setIsAddElementOpen(true);
  };

  const handleAddElement = (type: string) => {
    if (!addElementTarget) return;
    
    const { rowId, colId } = addElementTarget;
    const def = ELEMENT_REGISTRY[type];
    
    const newElement: ElementData = {
      id: `el-${Date.now()}`,
      type,
      content: def ? { ...def.defaultContent } : {},
      settings: {}
    };

    setRows(rows.map(r => {
      if (r.id !== rowId) return r;
      return {
        ...r,
        columns: r.columns.map(c => {
          if (c.id !== colId) return c;
          return { ...c, elements: [...c.elements, newElement] };
        })
      };
    }));
    
    setIsAddElementOpen(false);
    setAddElementTarget(null);
  };

  const updateElement = (rowId: string, colId: string, elId: string, data: any) => {
    setRows(rows.map(r => {
      if (r.id !== rowId) return r;
      return {
        ...r,
        columns: r.columns.map(c => {
          if (c.id !== colId) return c;
          return {
            ...c,
            elements: c.elements.map(e => {
              if (e.id === elId) {
                // Handle both the old format (just content) and the new format ({ content, settings })
                if (data.content !== undefined && data.settings !== undefined) {
                  return { ...e, content: data.content, settings: data.settings };
                }
                return { ...e, content: data };
              }
              return e;
            })
          };
        })
      };
    }));
  };

  const removeElement = (rowId: string, colId: string, elId: string) => {
    setRows(rows.map(r => {
      if (r.id !== rowId) return r;
      return {
        ...r,
        columns: r.columns.map(c => {
          if (c.id !== colId) return c;
          return { ...c, elements: c.elements.filter(e => e.id !== elId) };
        })
      };
    }));
  };

  const cloneElement = (rowId: string, colId: string, elId: string) => {
    setRows(rows.map(r => {
      if (r.id !== rowId) return r;
      return {
        ...r,
        columns: r.columns.map(c => {
          if (c.id !== colId) return c;
          
          const elToClone = c.elements.find(e => e.id === elId);
          if (!elToClone) return c;
          
          const newEl = JSON.parse(JSON.stringify(elToClone));
          newEl.id = `el-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          
          const index = c.elements.findIndex(e => e.id === elId);
          const newElements = [...c.elements];
          newElements.splice(index + 1, 0, newEl);
          
          return { ...c, elements: newElements };
        })
      };
    }));
  };

  const moveElementUp = (rowId: string, colId: string, elId: string) => {
    setRows(rows.map(r => {
      if (r.id !== rowId) return r;
      return {
        ...r,
        columns: r.columns.map(c => {
          if (c.id !== colId) return c;
          const index = c.elements.findIndex(e => e.id === elId);
          if (index > 0) {
            const newElements = [...c.elements];
            [newElements[index - 1], newElements[index]] = [newElements[index], newElements[index - 1]];
            return { ...c, elements: newElements };
          }
          return c;
        })
      };
    }));
  };

  const moveElementDown = (rowId: string, colId: string, elId: string) => {
    setRows(rows.map(r => {
      if (r.id !== rowId) return r;
      return {
        ...r,
        columns: r.columns.map(c => {
          if (c.id !== colId) return c;
          const index = c.elements.findIndex(e => e.id === elId);
          if (index < c.elements.length - 1) {
            const newElements = [...c.elements];
            [newElements[index + 1], newElements[index]] = [newElements[index], newElements[index + 1]];
            return { ...c, elements: newElements };
          }
          return c;
        })
      };
    }));
  };

  const openElementSettings = (rowId: string, colId: string, el: ElementData) => {
    setEditingElement({ rowId, colId, el });
    setIsElementSettingsOpen(true);
  };

  const handleSaveElementSettings = (data: any) => {
    if (!editingElement) return;
    updateElement(editingElement.rowId, editingElement.colId, editingElement.el.id, data);
    setIsElementSettingsOpen(false);
    setEditingElement(null);
  };

  const builderContextValue: PageBuilderContextType = {
    rows,
    updateRow,
    removeRow,
    cloneRow,
    setColumnLayout,
    addElement: handleAddElement,
    updateElement,
    removeElement,
    cloneElement,
    moveRowUp,
    moveRowDown,
    moveElementUp,
    moveElementDown,
    openElementSettings,
    openAddElement
  };

  // --- SAVE ---

  const handleSave = async (statusOverride?: string) => {
    if (!token) return;
    setSaving(true);
    
    const payload = {
      ...pageData,
      status: statusOverride || pageData.status,
      blocks: rows, // Save the row structure as blocks
      ...seoData,
    };

    try {
      const url = isNew ? '/api/pages' : `/api/pages/${id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const savedPage = await res.json();
        if (isNew) {
          navigate(`/admin/pages/${savedPage.id}/edit`);
        }
      } else {
        alert('Failed to save page');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleManualImport = () => {
    if (confirm('Create backup before re-importing?\n\n(Clicking OK will immediately replace the builder content with the imported content. Save Draft afterwards if you wish to keep it.)')) {
      const migratedRows = parseHtmlToBlocks(pageData.content || '', pageData.slug);
      setRows(migratedRows);
      setMigrationState('imported');
      setShowImportModal(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <PageBuilderContext.Provider value={builderContextValue}>
      <div className="flex flex-col h-screen bg-slate-200 font-sans" dir="rtl">
        {/* WPBakery Style Top Bar */}
        <header className="bg-[#23282d] text-slate-300 h-14 flex items-center justify-between px-4 shrink-0 z-10 text-sm border-b border-slate-900">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin/pages')} className="flex items-center gap-2 hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" /> <span>Back to Pages</span>
            </button>
            <div className="w-px h-6 bg-slate-700 mx-2"></div>
            <input 
              type="text" 
              value={pageData.title}
              onChange={e => setPageData({...pageData, title: e.target.value})}
              placeholder="Page Title..."
              className="font-bold text-white bg-transparent border-none focus:outline-none focus:ring-0 placeholder-slate-500 w-64"
            />
            <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${pageData.status === 'published' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
              {pageData.status === 'published' ? 'PUBLISHED' : 'DRAFT'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-[#191e23] rounded-md overflow-hidden">
              <button onClick={() => setPreviewMode('desktop')} className={`p-2 hover:text-white ${previewMode === 'desktop' ? 'bg-blue-600 text-white' : ''}`}><Monitor className="w-4 h-4" /></button>
              <button onClick={() => setPreviewMode('tablet')} className={`p-2 hover:text-white ${previewMode === 'tablet' ? 'bg-blue-600 text-white' : ''}`}><Tablet className="w-4 h-4" /></button>
              <button onClick={() => setPreviewMode('mobile')} className={`p-2 hover:text-white ${previewMode === 'mobile' ? 'bg-blue-600 text-white' : ''}`}><Smartphone className="w-4 h-4" /></button>
            </div>
            
            <div className="flex bg-[#191e23] rounded-md overflow-hidden">
              <button className="p-2 hover:text-white"><Undo className="w-4 h-4" /></button>
              <button className="p-2 hover:text-white"><Redo className="w-4 h-4" /></button>
            </div>

            <div className="w-px h-6 bg-slate-700 mx-2"></div>

            <button className="px-3 py-1.5 hover:text-white flex items-center gap-2 border border-slate-700 rounded-md">
              <Eye className="w-4 h-4" /> Preview
            </button>
            <button 
              onClick={() => handleSave('draft')}
              disabled={saving}
              className="px-3 py-1.5 hover:text-white border border-slate-700 rounded-md disabled:opacity-50"
            >
              Save Draft
            </button>
            <button 
              onClick={() => handleSave('published')}
              disabled={saving}
              className="px-4 py-1.5 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 shadow-sm"
            >
              {saving ? 'Saving...' : 'Publish'}
            </button>
          </div>
        </header>

        {/* Main Workspace */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar: Outline Tree */}
          <aside className="w-72 bg-white border-l border-slate-300 shrink-0 flex flex-col shadow-sm z-20 border-r border-slate-200" dir="ltr">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Layout className="w-4 h-4 text-blue-600" /> Page Outline
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {rows.length === 0 ? (
                <div className="text-center text-slate-400 text-sm mt-10">No elements yet.</div>
              ) : (
                rows.map((row, rIndex) => (
                  <div key={row.id} className="text-sm">
                    <div className="font-bold text-slate-700 bg-slate-100 p-2 rounded border border-slate-200 mb-1 flex items-center justify-between group">
                      <span className="truncate">{row.settings?.name || `Row ${rIndex + 1}`}</span>
                      <button onClick={() => removeRow(row.id)} className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1"><Trash2 className="w-3 h-3" /></button>
                    </div>
                    <div className="pl-3 border-l-2 border-slate-100 ml-2 space-y-2 pb-1">
                      {row.columns.map((col, cIndex) => (
                        <div key={col.id}>
                          <div className="text-xs text-slate-500 mb-1">Column {cIndex + 1} ({col.width})</div>
                          <div className="pl-3 border-l border-slate-100 ml-1 space-y-1">
                            {col.elements.map((el, eIndex) => (
                              <div key={el.id} className="flex items-center justify-between bg-white border border-slate-100 p-1.5 rounded hover:border-blue-300 hover:bg-blue-50 cursor-pointer group transition-colors" onClick={() => openElementSettings(row.id, col.id, el)}>
                                <div className="flex items-center gap-2 truncate">
                                  <Type className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span className="text-xs truncate text-slate-700">{el.settings?.name || ELEMENT_REGISTRY[el.type]?.name || el.type}</span>
                                </div>
                                <Edit2 className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 shrink-0" />
                              </div>
                            ))}
                            <button onClick={() => openAddElement(row.id, col.id)} className="w-full text-left text-xs text-blue-600 hover:text-blue-800 p-1 flex items-center gap-1 opacity-50 hover:opacity-100">
                              <Plus className="w-3 h-3" /> Add Element
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>

          {/* Center: Canvas / Blocks */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center">
            
            <div className="w-full mb-4 flex gap-2">
              <button onClick={() => setActiveTab('builder')} className={`px-4 py-2 text-sm font-bold rounded-t-lg ${activeTab === 'builder' ? 'bg-white text-slate-800' : 'bg-slate-300 text-slate-600'}`}>Backend Editor</button>
              <button className="px-4 py-2 text-sm font-bold rounded-t-lg bg-slate-300 text-slate-600 opacity-50 cursor-not-allowed" title="Coming soon">Frontend Editor</button>
              <div className="flex-1 border-b-2 border-white"></div>
            </div>

            <div 
              className={`bg-white rounded-b-xl rounded-tr-xl shadow-lg w-full transition-all duration-300 flex flex-col min-h-[500px]`}
              style={{ 
                maxWidth: previewMode === 'desktop' ? '100%' : previewMode === 'tablet' ? '768px' : '375px',
                border: previewMode !== 'desktop' ? '12px solid #333' : 'none',
                borderRadius: previewMode !== 'desktop' ? '2rem' : '0 0.75rem 0.75rem 0.75rem'
              }}
            >
              <div className="p-6 flex-1 flex flex-col">
                {activeTab === 'builder' && (
                  <>
                    {migrationState === 'imported' && (
                      <div className="mb-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Share2 className="w-5 h-5 text-green-600" />
                          <div>
                            <h4 className="font-bold text-sm">Existing content imported successfully</h4>
                            <p className="text-xs text-green-700 opacity-80 mt-0.5">The current page content was automatically converted to blocks.</p>
                          </div>
                        </div>
                        <button onClick={() => setMigrationState('none')} className="text-sm font-bold text-green-700 hover:text-green-900 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-lg transition-colors">
                          Dismiss
                        </button>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      {rows.length === 0 ? (
                        <div className="text-center py-20 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 flex flex-col items-center justify-center h-full">
                          <Layout className="w-16 h-16 text-slate-300 mb-4" />
                          <h3 className="text-xl font-bold text-slate-700 mb-2">Welcome to WebWork Page Builder</h3>
                          <p className="text-slate-500 mb-6">Start building your page by adding a new row or importing an existing page.</p>
                          <div className="flex gap-4">
                            <button onClick={addRow} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md">
                              <Plus className="w-5 h-5" /> Add Row
                            </button>
                            {!isNew && (
                              <button onClick={() => setShowImportModal(true)} className="bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
                                <Share2 className="w-5 h-5" /> Import Existing Page
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 pb-20">
                          {rows.map((row, index) => (
                            <WPRow key={row.id} row={row} index={index} />
                          ))}
                          
                          <div className="mt-8 text-center">
                            <button onClick={addRow} className="inline-flex items-center gap-2 border-2 border-dashed border-slate-300 text-slate-500 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold transition-all">
                              <Plus className="w-5 h-5" /> Add Row
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: Settings Sidebar */}
          <aside className="w-[350px] bg-white border-l border-slate-300 shrink-0 flex flex-col shadow-xl z-20">
            <div className="flex border-b border-slate-200">
              <button 
                onClick={() => setActiveTab('settings')} 
                className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'settings' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
              >
                <Settings className="w-4 h-4 mx-auto mb-1" /> Page Settings
              </button>
              <button 
                onClick={() => setActiveTab('seo')} 
                className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'seo' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
              >
                <Share2 className="w-4 h-4 mx-auto mb-1" /> SEO Panel
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
              {activeTab === 'builder' && (
                <div className="text-center text-slate-400 py-12">
                  <p>Select settings or SEO tabs to manage page properties.</p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Page Slug (URL)</label>
                    <input type="text" value={pageData.slug} onChange={e => setPageData({...pageData, slug: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-left shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Language</label>
                    <select value={pageData.language} onChange={e => setPageData({...pageData, language: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option value="ar">العربية (Arabic)</option>
                      <option value="en">الإنجليزية (English)</option>
                    </select>
                  </div>
                  <div className="pt-6 border-t border-slate-200 flex flex-col gap-3">
                    <button className="w-full py-2.5 border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                      <Layout className="w-4 h-4" /> Save as Template
                    </button>
                    <button 
                      onClick={() => setShowImportModal(true)}
                      className="w-full py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" /> Import Existing Page
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <SEOPanel seoData={seoData} setSeoData={setSeoData} />
              )}
            </div>
          </aside>
        </div>

        {/* Modals */}
        <AddElementModal 
          isOpen={isAddElementOpen} 
          onClose={() => setIsAddElementOpen(false)} 
          onSelect={handleAddElement} 
        />
        
        <ElementSettingsModal 
          isOpen={isElementSettingsOpen} 
          onClose={() => setIsElementSettingsOpen(false)} 
          element={editingElement?.el || null}
          onSave={handleSaveElementSettings}
        />

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Import Existing Page Content</h2>
                <button onClick={() => setShowImportModal(false)} className="text-slate-400 hover:bg-slate-100 p-2 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="bg-amber-50 text-amber-800 p-4 rounded-xl mb-4 border border-amber-200">
                  <p className="font-bold mb-1">Warning</p>
                  <p className="text-sm">This will convert the existing page into the WebWork Page Builder structure. Your current live page will remain unchanged until you publish the new version.</p>
                </div>
                <p className="text-slate-600 mb-6">
                  The system will analyze the existing HTML and try to map it to the corresponding builder blocks. Sections that cannot be natively mapped will be preserved as Custom HTML blocks to prevent data loss.
                </p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setShowImportModal(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleManualImport} className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors">
                    <Share2 className="w-4 h-4" /> Import Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageBuilderContext.Provider>
  );
}
