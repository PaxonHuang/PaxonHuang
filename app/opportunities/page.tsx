'use client';

import { OPPORTUNITIES } from '../../src/data';
import { Zap, Server, Globe, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const iconMap: Record<string, React.ElementType> = {
  'VPS': Server,
  'eSIM': Globe,
  'AI Compute': Cpu
};

export default function Opportunities() {
  const { t } = useTranslation();

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Zap className="text-amber-500 fill-amber-500" size={36} /> {t('ops.title')}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {t('ops.subtitle')}
        </p>
      </header>

      <div className="grid gap-6">
        {OPPORTUNITIES.map((opp, i) => {
          const Icon = iconMap[opp.type] || Zap;
          return (
            <a key={i} href={opp.url || '#'} target="_blank" rel="noopener noreferrer" className="flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-dark-900 shadow-solid shadow-solid-hover rounded-2xl group block">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform border-2 border-amber-200 dark:border-amber-800">
                  <Icon size={32} />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                    {opp.type}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {opp.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {t(opp.descKey) || opp.desc}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
