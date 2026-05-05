'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BackButton() {
  const { t } = useTranslation();
  return (
    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 shadow-solid shadow-solid-hover px-4 py-2 rounded-lg bg-white dark:bg-dark-900">
      <ArrowLeft size={16} /> {t('back')}
    </Link>
  );
}
