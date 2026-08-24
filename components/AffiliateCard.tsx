import React from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Star,
} from "lucide-react";

interface AffiliateCardProps {
  title: string;
  category: string;
  description: string;
  perk: string;
  affiliateUrl: string;
  badge?: string;
}

export function AffiliateCard({
  title,
  category,
  description,
  perk,
  affiliateUrl,
  badge,
}: AffiliateCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      {/* Top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500" />

      {/* Badge */}
      {badge && (
        <div className="absolute right-4 top-4 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-blue-700 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300">
            <Star className="h-3 w-3 fill-current" />
            {badge}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Category */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
            {category}
          </span>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-blue-950/40 dark:group-hover:text-blue-400">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-xl font-black tracking-tight text-zinc-950 dark:text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          {description}
        </p>

        {/* Perk */}
        <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Available offer
              </div>

              <p className="mt-0.5 text-xs font-semibold leading-5 text-emerald-900 dark:text-emerald-200">
                {perk}
              </p>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 dark:bg-white dark:text-zinc-950 dark:hover:bg-blue-500 dark:hover:text-white"
        >
          <span>Explore {title}</span>
          <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* Trust / disclosure */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
          <ShieldCheck className="h-3 w-3" />
          <span>Recommended tool · Sponsored link</span>
        </div>
      </div>
    </article>
  );
}