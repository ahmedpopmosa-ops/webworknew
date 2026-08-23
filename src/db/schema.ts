import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase UID
  email: text('email').notNull(),
  name: text('name'),
  role: text('role').default('admin').notNull(),
  photo: text('photo'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const pages = pgTable('pages', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  blocks: jsonb('blocks'), // For Gutenberg-like structured content
  language: text('language').default('ar').notNull(),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  seoKeywords: text('seo_keywords'),
  canonicalUrl: text('canonical_url'),
  robotsMeta: text('robots_meta').default('index, follow'),
  socialImage: text('social_image'),
  schemaData: jsonb('schema_data'),
  status: text('status').default('published').notNull(), // draft, published
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  icon: text('icon'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  status: text('status').default('published').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const portfolio = pgTable('portfolio', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  client: text('client'),
  category: text('category'),
  content: text('content'),
  image: text('image'),
  websiteUrl: text('website_url'),
  results: jsonb('results'),
  status: text('status').default('published').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  category: text('category'),
  authorId: integer('author_id').references(() => users.id),
  focusKeyword: text('focus_keyword'),
  seoScore: integer('seo_score'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  status: text('status').default('draft').notNull(),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  company: text('company'),
  service: text('service'),
  budget: text('budget'),
  message: text('message').notNull(),
  status: text('status').default('new').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
