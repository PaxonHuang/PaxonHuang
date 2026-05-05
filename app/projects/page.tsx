'use client';

import { PROJECTS } from '../../src/data';
import { Briefcase, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Projects() {
  const { t } = useTranslation();

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Briefcase className="text-indigo-500" size={36} /> {t('projects.title')}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {t('projects.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <a key={i} href={project.link} target="_blank" rel="noopener noreferrer" className="group bg-white dark:bg-dark-900 shadow-solid shadow-solid-hover rounded-2xl p-6 flex flex-col justify-between block">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.name}
                </h3>
                <span className="text-slate-400 group-hover:text-indigo-500 transition-colors">
                  <ArrowUpRight size={20} />
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                {project.desc}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs font-bold border-2 border-slate-900 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
