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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm">
      
      {/* Badge */}
      {badge && (
        <div className="absolute right-4 top-4 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/60 bg-blue-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-blue-700 shadow-xs">
            <Star className="h-3 w-3 fill-current" />
            {badge}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Category */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">
            {category}
          </span>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-lg font-black tracking-tight text-slate-900">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          {description}
        </p>

        {/* Perk */}
        <div className="mt-5 rounded-xl border border-emerald-100/80 bg-emerald-50/50 p-3">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            </div>

            <div>
              <div className="text-[9px] font-black uppercase tracking-wider text-emerald-700">
                Available offer
              </div>

              <p className="mt-0.5 text-xs font-bold leading-5 text-emerald-900">
                {perk}
              </p>
            </div>
          </div>
        </div>

        {/* Spacer to push CTA to bottom */}
        <div className="flex-1" />

        {/* CTA Button */}
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white shadow-xs transition-all duration-200 hover:bg-blue-600 hover:shadow-md hover:shadow-blue-600/20"
        >
          <span>Explore {title}</span>
          <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* Trust / disclosure */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] font-semibold text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Recommended partner</span>
        </div>
      </div>
    </article>
  );
}