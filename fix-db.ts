import { db } from './src/db/index.js';
import { pages } from './src/db/schema.js';
import { eq } from 'drizzle-orm';

async function run() {
  const allPages = await db.select().from(pages);
  for (const page of allPages) {
    if (page.blocks) {
      let blocks = page.blocks;
      if (typeof blocks === 'string') {
        blocks = JSON.parse(blocks);
      }
      if (Array.isArray(blocks)) {
        let changed = false;
        blocks.forEach(row => {
          row.columns?.forEach(col => {
            col.elements?.forEach(el => {
              if (el.content && el.content.content !== undefined && el.content.settings !== undefined) {
                console.log('Fixing element:', el.id);
                el.settings = el.content.settings;
                el.content = el.content.content;
                changed = true;
              }
            });
          });
        });
        
        if (changed) {
          console.log(`Updating page ${page.slug}...`);
          await db.update(pages).set({ blocks }).where(eq(pages.id, page.id));
        }
      }
    }
  }
  console.log('Done!');
}
run().catch(console.error);
