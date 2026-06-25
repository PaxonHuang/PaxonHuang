// Shared type for client-side blog list components.
// Data is loaded server-side from Astro Content Collections in [slug].astro,
// /index.astro, and /blog/index.astro, then passed as this shape.

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
}
