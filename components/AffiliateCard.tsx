import React from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

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
  const initial = title.trim().charAt(0).toUpperCase();

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition-colors duration-150 hover:border-slate-300 hover:bg-slate-50/60"
    >
      {badge && (
        <span className="absolute right-3 top-3 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
          {badge}
        </span>
      )}

      {/* Header: mark + title/category */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
          {initial}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold text-slate-900">
            {title}
          </h3>
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            {category}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-[13px] leading-relaxed text-slate-500 line-clamp-2">
        {description}
      </p>

      {/* Divider */}
      <div className="mt-4 border-t border-slate-100" />

      {/* Footer: perk + link affordance */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="truncate text-[12px] font-medium text-slate-600">
            {perk}
          </span>
        </div>

        <span className="flex shrink-0 items-center gap-1 text-[12px] font-medium text-slate-400 transition-colors group-hover:text-indigo-600">
          Visit
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}
