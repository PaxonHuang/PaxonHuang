import fm from 'front-matter';
import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export function getBlogPosts(): BlogPost[] {
  const contentDir = path.join(process.cwd(), 'src/content/blog');
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  const files = fs.readdirSync(contentDir);
  
  const posts = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const fullPath = path.join(contentDir, file);
      const rawModule = fs.readFileSync(fullPath, 'utf8');
      const { attributes, body } = fm<any>(rawModule);
      return {
        slug: attributes.slug || file.replace(/\.md$/, ''),
        title: attributes.title,
        date: attributes.date,
        category: attributes.category,
        tags: attributes.tags || [],
        excerpt: attributes.excerpt || '',
        content: body
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  return posts;
}
