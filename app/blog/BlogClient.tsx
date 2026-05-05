'use client';

import Link from 'next/link';
import type { BlogPost } from '../../src/blog';
import { Terminal, Search, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchSearch && matchTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Terminal className="text-primary-500" size={36} /> {t('blog.title')}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {t('blog.subtitle')}
        </p>
      </header>

      {/* Search and Tags Filters */}
      <div className="bg-white dark:bg-dark-900 shadow-solid rounded-xl p-4 sm:p-6 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search keywords in titles and content..." 
            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <Tag size={16} className="text-slate-500 mr-1" />
          <button 
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${selectedTag === null ? 'bg-primary-500 text-white shadow-solid shadow-solid-hover' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${selectedTag === tag ? 'bg-primary-500 text-white shadow-solid shadow-solid-hover' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-12 border-l-4 border-slate-900 dark:border-primary-500 ml-4 pl-8 relative mt-12">
        {filteredPosts.map(post => (
          <article key={post.slug} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[42px] top-1.5 w-5 h-5 bg-white dark:bg-dark-950 border-4 border-slate-900 dark:border-primary-500 rounded-full" />
            
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
              <time className="font-mono text-sm text-slate-500 dark:text-slate-400 shrink-0">{post.date}</time>
              <span className="text-xs font-mono font-bold text-primary-900 dark:text-primary-100 bg-primary-100 dark:bg-primary-900 px-2 py-0.5 rounded shrink-0 shadow-sm border border-primary-200 dark:border-primary-800">
                {post.category}
              </span>
            </div>
            
            <Link href={`/blog/${post.slug}`} className="block bg-white dark:bg-dark-900 shadow-solid shadow-solid-hover rounded-xl p-6 mt-4">
              <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4 text-base leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
        {filteredPosts.length === 0 && (
          <div className="text-slate-500 dark:text-slate-400 py-8">No posts found matching your criteria.</div>
        )}
      </div>
    </div>
  );
}
