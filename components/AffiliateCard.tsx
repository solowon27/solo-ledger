import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface AffiliateCardProps {
  title: string;
  category: string;
  description: string;
  perk: string;
  affiliateUrl: string;
  badge?: string;
}

export function AffiliateCard({ title, category, description, perk, affiliateUrl, badge }: AffiliateCardProps) {
  return (
    <div className="relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {badge && (
        <span className="absolute -top-3 right-4 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white">
          {badge}
        </span>
      )}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {category}
        </span>
        <h3 className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-zinc-50 p-2 text-xs font-medium text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>{perk}</span>
        </div>
      </div>

      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        <span>Get Started</span>
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}