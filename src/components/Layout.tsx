'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Terminal, BookOpen, HardDrive, Briefcase, Zap, Moon, Sun, Globe } from 'lucide-react';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n'; // Ensure i18n is initialized

export default function Layout({ children, pathname = '/' }: { children: React.ReactNode, pathname?: string }) {
  const [isDark, setIsDark] = useState(false);
  const { t, i18n } = useTranslation();

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Terminal },
    { path: '/blog', label: t('nav.blog'), icon: BookOpen },
    { path: '/nexus', label: t('nav.nexus'), icon: HardDrive },
    { path: '/projects', label: t('nav.projects'), icon: Briefcase },
    { path: '/opportunities', label: t('nav.ops'), icon: Zap },
  ];

  useEffect(() => {
    if (document.documentElement.classList.contains('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-8 mt-4">
        <nav className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-dark-900 shadow-solid rounded-2xl p-4">
          <a href="/" className="flex items-center gap-2 group">
            <div className="bg-slate-900 dark:bg-primary-600 text-white p-2 rounded-lg group-hover:bg-primary-500 transition-colors shadow-sm">
              <Terminal size={24} />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white leading-none">Lapinex</h1>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">Tech_Nexus</span>
            </div>
          </a>
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
              const Icon = item.icon;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={clsx(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden",
                    isActive ? "text-primary-600 dark:text-primary-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-bg"
                      className="absolute inset-0 bg-primary-50 dark:bg-primary-900/20 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon size={16} />
                  <span className="hidden sm:inline">{item.label}</span>
                </a>
              );
            })}
            <div className="flex items-center ml-2 border-l border-slate-200 dark:border-slate-700 pl-2">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-semibold"
                aria-label="Toggle language"
              >
                <Globe size={18} /> {i18n.language === 'zh' ? 'EN' : '中文'}
              </button>
              <button
                onClick={toggleDark}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="w-full">
          {children}
        </div>
      </main>

      <footer className="w-full mt-24 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-slate-500 dark:text-slate-400 text-sm font-mono">
        <p>&copy; {new Date().getFullYear()} {t('footer.text')}</p>
        <p className="mt-2 text-xs">{t('footer.tags')}</p>
      </footer>
    </div>
  );
}
