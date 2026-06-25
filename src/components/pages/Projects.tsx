'use client';

import { PROJECTS, type Project, type ProjectHighlight } from '../../data';
import {
  Briefcase,
  ArrowUpRight,
  Cpu,
  Radio,
  Brain,
  Gauge,
  Battery,
  Wifi,
  Bluetooth,
  Layers,
  GitBranch,
  Activity,
  Zap,
  Shield,
  CheckCircle2,
  Github,
  ExternalLink,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ─── Icon map for featured project highlights ──────────────────────────────
const ICON_MAP = {
  cpu: Cpu,
  radio: Radio,
  brain: Brain,
  gauge: Gauge,
  battery: Battery,
  wifi: Wifi,
  bluetooth: Bluetooth,
  layers: Layers,
  'git-branch': GitBranch,
  activity: Activity,
  zap: Zap,
  shield: Shield,
} as const;

function HighlightCard({ h }: { h: ProjectHighlight }) {
  const Icon = ICON_MAP[h.icon] ?? Cpu;
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center border border-amber-200 dark:border-amber-800">
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 mb-1">
            {h.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {h.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function FeaturedProject({ p }: { p: Project }) {
  return (
    <article className="rounded-2xl border-2 border-slate-900 dark:border-primary-500 shadow-solid bg-white dark:bg-dark-900 overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-3 bg-slate-900 dark:bg-primary-950 text-slate-100 font-mono text-[11px] uppercase tracking-[0.15em]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500 text-slate-900 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
            FEATURED
          </span>
          {p.version && (
            <span className="px-2 py-0.5 rounded border border-slate-600 text-slate-300">
              {p.version}
            </span>
          )}
          {p.category && (
            <span className="hidden sm:inline text-slate-400">{p.category}</span>
          )}
        </div>
        {p.status && (
          <span className="inline-flex items-center gap-1.5 text-emerald-300">
            <CheckCircle2 size={12} />
            {p.status}
          </span>
        )}
      </div>

      {/* Title + problem statement */}
      <div className="px-5 sm:px-7 pt-6 pb-5 border-b border-dashed border-slate-300 dark:border-slate-700">
        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl leading-tight text-slate-900 dark:text-slate-50 mb-3">
          {p.name}
        </h2>
        {p.problem && (
          <blockquote className="border-l-2 border-amber-500 pl-4 italic text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {p.problem}
          </blockquote>
        )}
      </div>

      {/* Highlights */}
      {p.highlights && p.highlights.length > 0 && (
        <div className="px-5 sm:px-7 py-6 border-b border-slate-200 dark:border-slate-800">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-4">
            § Technical Highlights
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {p.highlights.map((h, i) => (
              <HighlightCard key={i} h={h} />
            ))}
          </div>
        </div>
      )}

      {/* Architecture + Metrics side-by-side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-px bg-slate-200 dark:bg-slate-800">
        {/* Architecture diagram */}
        {p.architecture && (
          <div className="lg:col-span-3 bg-white dark:bg-dark-900 px-5 sm:px-7 py-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
              <span>§ Architecture</span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-slate-300 dark:text-slate-600 normal-case tracking-normal">3-tier edge inference</span>
            </div>
            <pre className="text-[10px] sm:text-xs leading-[1.45] font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 sm:p-4 overflow-x-auto">
              <code>{p.architecture}</code>
            </pre>
          </div>
        )}

        {/* Metrics */}
        {p.metrics && p.metrics.length > 0 && (
          <div className="lg:col-span-2 bg-white dark:bg-dark-900 px-5 sm:px-7 py-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-3">
              § Key Metrics
            </div>
            <div className="grid grid-cols-2 gap-3">
              {p.metrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-3"
                >
                  <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                    {m.label}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
                      {m.value}
                    </span>
                    {m.unit && (
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {m.unit}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stack table */}
      {p.stack && p.stack.length > 0 && (
        <div className="px-5 sm:px-7 py-6 border-t border-slate-200 dark:border-slate-800">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-3">
            § Tech Stack
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {p.stack.map((s, i) => (
              <div key={i}>
                <div className="font-mono text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1.5 font-bold">
                  {s.category}
                </div>
                <ul className="space-y-1">
                  {s.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-xs text-slate-700 dark:text-slate-300 font-mono leading-relaxed flex items-start gap-1.5"
                    >
                      <span className="text-slate-400 dark:text-slate-600 mt-0.5">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA footer */}
      <div className="px-5 sm:px-7 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic">
          {p.desc}
        </p>
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-primary-500 text-white dark:text-slate-900 font-bold text-sm shadow-solid hover:shadow-solid-hover transition-all"
        >
          <Github size={16} />
          View on GitHub
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white dark:bg-dark-900 shadow-solid shadow-solid-hover rounded-2xl p-6 flex flex-col justify-between block"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {p.name}
          </h3>
          <span className="text-slate-400 group-hover:text-indigo-500 transition-colors">
            <ArrowUpRight size={20} />
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">{p.desc}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {p.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-bold border-2 border-slate-900 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Projects() {
  const { t } = useTranslation();

  const featured = PROJECTS.find((p) => p.featured);
  const standard = PROJECTS.filter((p) => !p.featured);

  return (
    <div className="space-y-12 pb-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Briefcase className="text-indigo-500" size={36} /> {t('projects.title')}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {t('projects.subtitle')}
        </p>
      </header>

      {featured && (
        <section aria-label="Featured project">
          <FeaturedProject p={featured} />
        </section>
      )}

      {standard.length > 0 && (
        <section aria-label="Other projects" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              § Other Projects
            </div>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            <div className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
              {String(standard.length).padStart(2, '0')} entries
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standard.map((p, i) => (
              <ProjectCard key={i} p={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
