'use client';

import { OPPORTUNITIES } from '../../data';
import type { BlogPost } from '../../blog';
import { ArrowRight, Cpu, Shield, BrainCircuit, Code2, Github, QrCode, Linkedin, MonitorPlay, Twitter, MessageCircle, Send, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HomeClient({ recentPosts }: { recentPosts: BlogPost[] }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="space-y-6 pt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t('home.title.architecting')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-500">{t('home.title.silicon')}</span> {t('home.title.to')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-primary-600">{t('home.title.cloud')}</span>.
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          {t('home.subtitle')}
        </p>
        <p className="text-base text-slate-500 dark:text-slate-400 max-w-2xl">
          {t('home.intro')} <a href="https://github.com/PaxonHuang" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 dark:text-white hover:text-primary-600 flex items-center gap-1 inline-flex"><Github size={16} /> PaxonHuang</a>
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <a href="/blog" className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2">
            {t('home.btn.blog')} <ArrowRight size={18} />
          </a>
          <a href="/projects" className="px-6 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            {t('home.btn.projects')}
          </a>
        </div>
      </section>

      {/* Social Media Matrix */}
      <section className="bg-slate-100 dark:bg-dark-900 shadow-solid rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6">Social Matrix</h2>
        <div className="flex flex-wrap gap-4">
          <a href="https://www.linkedin.com/in/paxon-huang-31b3993b9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium group">
            <Linkedin size={18} className="text-[#0077b5] group-hover:scale-110 transition-transform" /> LinkedIn
          </a>
          <a href="https://space.bilibili.com/266272512" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium group">
            <MonitorPlay size={18} className="text-[#00a1d6] group-hover:scale-110 transition-transform" /> Bilibili
          </a>
          <a href="https://x.com/paxon_huang" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium group">
            <Twitter size={18} className="text-slate-900 dark:text-white group-hover:scale-110 transition-transform" /> X / Twitter
          </a>
          
          <div className="relative group cursor-pointer flex flex-col items-center">
             <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
               <MessageCircle size={18} className="text-[#07c160] group-hover:scale-110 transition-transform" /> WeChat: 胡忘年
             </div>
          </div>
          
          <div className="relative group cursor-pointer flex flex-col items-center">
             <a href="https://t.me/+m-XeMU8baN00YjE1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
               <Send size={18} className="text-[#24A1DE] group-hover:scale-110 transition-transform" /> Telegram Group
             </a>
             <div className="absolute top-12 left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-10 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 pointer-events-none">
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/+m-XeMU8baN00YjE1" alt="Telegram QR" className="w-32 h-32 rounded-lg" />
             </div>
          </div>

          <div className="relative group cursor-pointer flex flex-col items-center">
             <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
               <Users size={18} className="text-[#12b7f5] group-hover:scale-110 transition-transform" /> QQ Group: 1005804472
             </div>
             <div className="absolute top-12 left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-10 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 pointer-events-none">
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=mqqapi://card/show_pslcard?src_type=internal&version=1&uin=1005804472&card_type=group&source=qrcode" alt="QQ QR" className="w-32 h-32 rounded-lg" />
             </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Bento */}
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">{t('home.section.tech')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: t('tech.embedded'), icon: Cpu, desc: t('tech.desc.embedded') },
            { title: t('tech.cyber'), icon: Shield, desc: t('tech.desc.cyber') },
            { title: t('tech.ai'), icon: BrainCircuit, desc: t('tech.desc.ai') },
            { title: t('tech.fullstack'), icon: Code2, desc: t('tech.desc.fullstack') },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-dark-900 shadow-solid shadow-solid-hover rounded-2xl p-6">
              <div className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border-2 border-slate-200 dark:border-slate-700">
                <item.icon size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">{t('home.section.recent')}</h2>
          <a href="/blog" className="text-primary-600 dark:text-primary-400 text-sm font-bold hover:underline flex items-center gap-1">
            {t('home.viewall')} <ArrowRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map(post => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col justify-between bg-white dark:bg-dark-900 shadow-solid shadow-solid-hover rounded-2xl p-6">
              <div>
                <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mb-3 block">{post.date} &bull; {post.category}</div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{post.excerpt}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs font-bold border-2 border-slate-900 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded bg-slate-50 dark:bg-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Latest Ops */}
      <section className="space-y-6 border-t border-slate-200 dark:border-slate-800 pt-16">
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">{t('home.section.ops')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OPPORTUNITIES.map((opp, i) => (
            <a key={i} href={opp.url || '#'} target="_blank" rel="noopener noreferrer" className="bg-slate-50 dark:bg-slate-800 shadow-solid shadow-solid-hover rounded-xl p-5 block group">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/50 px-2 py-1 rounded border-2 border-teal-200 dark:border-teal-800 inline-block mb-3">
                {opp.type}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{opp.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{t(opp.descKey) || opp.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
