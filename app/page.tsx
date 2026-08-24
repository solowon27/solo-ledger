import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BriefcaseBusiness,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  ArrowRightLeft,
  FileText,
} from 'lucide-react';
import { Calculator } from '@/components/Calculator';
import { AffiliateCard } from '@/components/AffiliateCard';
import { ROLES_DATA } from '@/lib/rolesData';
import { AFFILIATE_LINKS } from '@/lib/affiliates';

export const metadata: Metadata = {
  title: 'Rate Calculator | SoloLedger',
  description: 'Precision calculation engine for freelance hourly, daily, and project target rates.',
};

const popularRoles = Object.values(ROLES_DATA).slice(0, 12);

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SoloLedger Freelance Rate Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="min-h-screen w-full bg-slate-100/70 p-4 sm:p-6 lg:p-8 xl:p-10 space-y-6 sm:space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Application Header Bar */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:p-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
            <Zap className="h-3 w-3" />
            <span>Tax Planning Engine: 2026</span>
          </div>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Freelance Rate & Tax Calculator
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Calculate your hourly rates based on take-home goals, business overhead, and self-employment taxes.
          </p>
        </div>

        <div className="flex items-center">
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Instant Client Calculation
          </span>
        </div>
      </div>

      {/* Calculator Engine (Full-Bleed Card) */}
      <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs sm:p-6 lg:p-8">
        <Calculator />
      </div>

      {/* Utility Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/w2-to-1099-calculator"
          className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-blue-400 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ArrowRightLeft className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-blue-600" />
          </div>
          <h3 className="mt-4 text-sm font-black text-slate-900">W-2 vs. 1099 Salary Converter</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Factor in the 7.65% employer FICA tax and lost healthcare/PTO benefits.
          </p>
        </Link>

        <Link
          href="/invoice-generator"
          className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-emerald-400 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FileText className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-emerald-600" />
          </div>
          <h3 className="mt-4 text-sm font-black text-slate-900">PDF Invoice Generator</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Create, edit, and export client invoices with instant client-side PDF download.
          </p>
        </Link>
      </div>

      {/* Role Benchmarks: Expanded for wide screens */}
      <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-900">
              Industry Rate Benchmarks
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Pre-calculated financial models customized for your niche.
            </p>
          </div>
          <Link
            href="/rates"
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {popularRoles.map((role) => (
            <Link
              key={role.slug}
              href={`/rate/${role.slug}`}
              className="group flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition hover:border-blue-300 hover:bg-blue-50/50"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs">
                <BriefcaseBusiness className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1 truncate">
                <div className="truncate text-xs font-bold text-slate-800 group-hover:text-blue-700">
                  {role.title.replace('Freelance ', '')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Financial Infrastructure Recommendations */}
      <div className="space-y-3">
        <h2 className="text-base font-black text-slate-900">
          Recommended Banking & Accounting Infrastructure
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AffiliateCard
            category="Invoicing & Tax"
            badge="Top Pick"
            title="FreshBooks"
            description="Automate monthly invoicing, track expenses, and prepare for tax season."
            perk="Free 30-Day Trial"
            affiliateUrl={AFFILIATE_LINKS?.freshbooks || 'https://freshbooks.com'}
          />
          <AffiliateCard
            category="Global Business Banking"
            title="Wise Business"
            description="Receive client payments with zero exchange markups and multi-currency accounts."
            perk="Zero fee on first transfer"
            affiliateUrl={AFFILIATE_LINKS?.wise || 'https://wise.com'}
          />
          <AffiliateCard
            category="Compliance & Agreements"
            title="Deel"
            description="Generate compliant contractor agreements and manage international client contracts."
            perk="Free standard templates"
            affiliateUrl={AFFILIATE_LINKS?.deel || 'https://deel.com'}
          />
        </div>
      </div>
    </div>
  );
}