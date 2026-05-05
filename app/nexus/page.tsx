'use client';

import { CLOUD_RESOURCES, TOOL_LINKS } from '../../src/data';
import { HardDrive, Download, Link as LinkIcon, ExternalLink, Network } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Nexus() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Network className="text-purple-500" size={36} /> {t('nexus.title')}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {t('nexus.subtitle')}
        </p>
      </header>

      {/* Cloud Resources Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
          <HardDrive className="text-blue-500" size={24} /> Cloud Drive Resources
        </h2>
        <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {CLOUD_RESOURCES.map((res, i) => (
              <div key={i} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-3 rounded-lg shrink-0">
                    <HardDrive size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{res.name}</h3>
                    <span className="text-sm font-mono text-slate-500 dark:text-slate-400">{res.size}</span>
                  </div>
                </div>
                <a href={res.link} className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors font-medium text-sm">
                  <Download size={16} /> {t('download')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="space-y-6 pt-6">
        <h2 className="text-2xl font-display font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
          <LinkIcon className="text-rose-500" size={24} /> Developer Links & Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOL_LINKS.map((tool, i) => (
            <a key={i} href={tool.url} target="_blank" rel="noopener noreferrer" className="group p-5 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-rose-500/50 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  {tool.name}
                </h3>
                <ExternalLink size={16} className="text-slate-400 group-hover:text-rose-500" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t(tool.descKey)}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
