import { db } from "./src/db/index.ts";
import { pages } from "./src/db/schema.ts";

async function seed() {
  const all = await db.select().from(pages);
  if (all.length === 0) {
    await db.insert(pages).values([
      { title: 'الرئيسية', slug: 'home', content: 'محتوى الرئيسية', status: 'published' },
      { title: 'من نحن', slug: 'about', content: 'محتوى من نحن', status: 'published' },
      { title: 'اتصل بنا', slug: 'contact', content: 'محتوى اتصل بنا', status: 'published' },
    ]);
    console.log("Seeded pages");
  } else {
    console.log("Pages already exist");
  }
}
seed().catch(console.error).then(() => process.exit(0));
