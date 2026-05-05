import { getBlogPosts } from '../../../src/blog';
import type { Metadata } from 'next';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import { Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import BackButton from '../../../src/components/BackButton';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const posts = getBlogPosts();
  const post = posts.find(p => p.slug === slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Lapinex Tech Blog`,
    description: post.excerpt,
    keywords: post.tags,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const posts = getBlogPosts();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Generate table of contents
  const matches = Array.from(post.content.matchAll(/(?:^|\n)(#{1,3})\s+([^\n]+)/g));
  const toc = matches.map(match => {
    const level = match[1].length;
    const title = match[2].replace(/\r$/, '').trim();
    const id = title.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/(^-|-$)/g, '');
    return { level, title, id };
  });

  return (
    <div className="flex flex-col lg:flex-row gap-12 relative items-start max-w-6xl mx-auto py-8 px-4">
      <article className="flex-1 min-w-0">
        <BackButton />
        
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <time className="font-mono text-sm text-slate-500 flex items-center gap-1"><Clock size={14} /> {post.date}</time>
            <span className="text-xs font-mono font-bold text-primary-900 dark:text-primary-100 bg-primary-100 dark:bg-primary-900 px-2 py-1 rounded shadow-sm border border-primary-200 dark:border-primary-800">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 dark:text-white leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs font-bold bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full shadow-solid">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert prose-headings:font-black prose-a:font-bold prose-a:text-primary-600 dark:prose-a:text-primary-400">
          <Markdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeSlug]}
          >
            {post.content}
          </Markdown>
        </div>
      </article>

      {toc.length > 0 && (
        <aside className="sticky top-24 w-full lg:w-64 shrink-0 hidden lg:block bg-white dark:bg-dark-900 shadow-solid rounded-xl p-6">
          <h3 className="font-display font-black text-lg text-slate-900 dark:text-white mb-4 border-b-2 border-slate-200 dark:border-slate-800 pb-2">Table of Contents</h3>
          <ul className="space-y-2 text-sm max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {toc.map((heading, i) => (
              <li key={i} style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}>
                <a 
                  href={`#${heading.id}`} 
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors block py-1 font-bold"
                >
                  {heading.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
