import React, { useEffect, useState } from 'react';
import { RowData, ColumnData, ElementData } from '../lib/builder-types.ts';
import { ELEMENT_REGISTRY } from './admin/page-builder/ElementRegistry.ts';
import { portfolioData } from '../data/portfolio.ts';
import { LegacyAnimatedHero, LegacyAboutStats, LegacyInteractiveServices, LegacyHorizontalPortfolio, LegacyProcess } from './legacy/LegacyBlocks.tsx';

function renderElement(el: ElementData) {
  if (el.type === 'legacy_hero') return <LegacyAnimatedHero content={el.content} settings={el.settings} />;
  if (el.type === 'legacy_about') return <LegacyAboutStats content={el.content} settings={el.settings} />;
  if (el.type === 'legacy_services') return <LegacyInteractiveServices content={el.content} settings={el.settings} />;
  if (el.type === 'legacy_portfolio') return <LegacyHorizontalPortfolio content={el.content} settings={el.settings} />;
  if (el.type === 'legacy_process') return <LegacyProcess content={el.content} settings={el.settings} />;

  if (el.type === 'heading') {
    const Tag = (el.content?.level || 'h2') as any;
    return <Tag className={`text-4xl font-bold mb-4 text-${el.content?.alignment || 'left'} ${el.settings?.cssClasses || ''}`} id={el.settings?.elementId}>{el.content?.text}</Tag>;
  }
  
  if (el.type === 'text') {
    return <div className={`text-slate-600 mb-4 ${el.settings?.cssClasses || ''}`} id={el.settings?.elementId}>{el.content?.content}</div>;
  }
  
  if (el.type === 'button') {
    const styleClass = el.content?.style === 'outline' ? 'border-2 border-blue-600 text-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700';
    return (
      <a href={el.content?.url || '#'} className={`inline-flex px-8 py-4 font-bold rounded-full transition-colors ${styleClass} ${el.settings?.cssClasses || ''}`} id={el.settings?.elementId}>
        {el.content?.text}
      </a>
    );
  }
  
  if (el.type === 'image') {
    return <img src={el.content?.url} alt={el.content?.alt || ''} className={`w-full rounded-xl ${el.settings?.cssClasses || ''}`} id={el.settings?.elementId} />;
  }
  
  if (el.type === 'html') {
    return <div dangerouslySetInnerHTML={{ __html: el.content?.html || '' }} className={el.settings?.cssClasses} id={el.settings?.elementId} />;
  }

  // Handle dynamics as placeholders for now, in a real app these would be full components
  if (['services', 'caseStudies', 'statistics', 'testimonials', 'clients'].includes(el.type)) {
     return (
       <div className={`p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center ${el.settings?.cssClasses || ''}`} id={el.settings?.elementId}>
         <h3 className="text-xl font-bold text-slate-800 mb-2">Dynamic Element: {ELEMENT_REGISTRY[el.type]?.name}</h3>
         <p className="text-slate-500">This section is dynamically loaded from the database.</p>
       </div>
     );
  }

  return <div>Unknown Element: {el.type}</div>;
}

function renderColumn(col: ColumnData) {
  const widthClassMap: Record<string, string> = {
    '1/1': 'w-full',
    '1/2': 'w-full md:w-1/2',
    '1/3': 'w-full md:w-1/3',
    '2/3': 'w-full md:w-2/3',
    '1/4': 'w-full md:w-1/4',
    '3/4': 'w-full md:w-3/4',
  };
  
  return (
    <div key={col.id} className={`${widthClassMap[col.width] || 'w-full'} p-4`}>
      {col.elements.map(el => (
        <React.Fragment key={el.id}>
          {renderElement(el)}
        </React.Fragment>
      ))}
    </div>
  );
}


export default function DynamicPageRenderer({ blocks }: { blocks: RowData[] }) {
  if (!blocks || blocks.length === 0) return null;
  
  return (
    <div className="dynamic-page">
      {blocks.map(row => (
        <section 
          key={row.id} 
          className={`${row.settings?.fullBleed ? '' : 'py-12'} ${row.settings?.cssClasses || ''}`}
          id={row.settings?.elementId}
          style={{
            backgroundColor: row.settings?.bgColor,
            paddingTop: row.settings?.paddingTop,
            paddingBottom: row.settings?.paddingBottom,
            marginTop: row.settings?.marginTop,
            marginBottom: row.settings?.marginBottom,
          }}
        >
          {row.settings?.fullBleed ? (
            <div className="flex flex-wrap w-full">
              {row.columns.map(col => renderColumn(col))}
            </div>
          ) : (
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-wrap -mx-4">
                {row.columns.map(col => renderColumn(col))}
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
