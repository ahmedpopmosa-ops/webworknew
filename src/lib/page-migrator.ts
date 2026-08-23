import { RowData, ColumnData, ElementData } from './builder-types.js';

export function parseHtmlToBlocks(html: string, pageSlug: string): RowData[] {
  const blocks: RowData[] = [];

  const createRow = (id: string, layout: string = '1/1', elements: ElementData[] = []): RowData => ({
    id: `row-${Date.now()}-${id}`,
    layout,
    settings: {},
    columns: [
      {
        id: `col-${Date.now()}-${id}-1`,
        width: '1/1',
        settings: {},
        elements
      }
    ]
  });

  // Specialized migration for Homepage based on the prompt requirements
  if (pageSlug === 'home' || pageSlug === '') {
    return [
      createRow('hero', '1/1', [{ id: `el-hero-${Date.now()}`, type: 'html', content: { html: '<section class="hero">\n  <h1>Build. Grow. Dominate.</h1>\n  <p>Hero Section Content</p>\n</section>' }, settings: {} }]),
      createRow('stats', '1/1', [{ id: `el-stats-${Date.now()}`, type: 'statistics', content: { number: '100', label: 'Results / Statistics' }, settings: {} }]),
      createRow('services', '1/1', [{ id: `el-services-${Date.now()}`, type: 'services', content: { layout: 'grid', columns: '3' }, settings: {} }]),
      createRow('portfolio', '1/1', [{ id: `el-portfolio-${Date.now()}`, type: 'caseStudies', content: { layout: 'grid', count: 3 }, settings: {} }]),
      createRow('before-after', '1/1', [{ id: `el-ba-${Date.now()}`, type: 'html', content: { html: '<div class="before-after">Before / After Slider</div>' }, settings: {} }]),
      createRow('how-we-work', '1/1', [{ id: `el-hww-${Date.now()}`, type: 'heading', content: { text: 'How We Work', level: 'h2' }, settings: {} }]),
      createRow('ai-growth', '1/1', [{ id: `el-ai-${Date.now()}`, type: 'heading', content: { text: 'AI / Digital Growth', level: 'h2' }, settings: {} }]),
      createRow('client-logos', '1/1', [{ id: `el-clients-${Date.now()}`, type: 'clients', content: {}, settings: {} }]),
      createRow('testimonials', '1/1', [{ id: `el-testi-${Date.now()}`, type: 'testimonials', content: { layout: 'slider' }, settings: {} }]),
      createRow('pricing', '1/1', [{ id: `el-pricing-${Date.now()}`, type: 'html', content: { html: '<div class="pricing">Pricing Tables</div>' }, settings: {} }]),
      createRow('blog', '1/1', [{ id: `el-blog-${Date.now()}`, type: 'html', content: { html: '<div class="blog">Latest Insights</div>' }, settings: {} }]),
      createRow('faq', '1/1', [{ id: `el-faq-${Date.now()}`, type: 'html', content: { html: '<div class="faq">Frequently Asked Questions</div>' }, settings: {} }]),
      createRow('cta', '1/1', [{ id: `el-cta-${Date.now()}`, type: 'button', content: { text: 'Start Your Project', style: 'primary' }, settings: {} }]),
    ];
  }

  // Generic HTML Parsing fallback
  if (!html || html.trim() === '') {
    return [];
  }

  // Very basic regex-based chunking just to handle random HTML content.
  // We'll wrap the entire existing content in a Custom HTML block if we can't be sure.
  blocks.push(createRow('legacy-content', '1/1', [
    {
      id: `el-${Date.now()}-legacy`,
      type: 'html',
      content: { html: html },
      settings: {}
    }
  ]));

  return blocks;
}
