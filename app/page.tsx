import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowRightLeft,
  BriefcaseBusiness,
  Calculator as CalcIcon,
  ChevronRight,
  FileText,
  Sparkles,
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
    <main className="min-h-screen w-full bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* =====================================================
          HERO SECTION (Centered, Grid Pattern, Overlap)
      ====================================================== */}
      <section className="relative w-full overflow-hidden border-b border-slate-200 bg-slate-50 px-6 pb-48 pt-24 md:px-12 lg:px-24 lg:pb-64 lg:pt-32">
        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Soft radial glow */}
        <div className="absolute -top-24 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]"></div>

        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            2026 Tax Planning Engine
          </div>
          
          <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Engineer your <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">freelance rate.</span>
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
            Input your financial goals, business overhead, and tax assumptions to instantly generate mathematically sound hourly, daily, and project rates.
          </p>
        </div>
      </section>

      {/* =====================================================
          CALCULATOR SECTION (Negative margin for overlap)
      ====================================================== */}
      <section className="relative z-10 w-full px-6 md:px-12 lg:px-24">
        {/* The negative margin pulls the calculator up over the hero section */}
        <div className="-mt-32 mb-20 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/50 sm:p-10">
          <Calculator />
        </div>
      </section>

      {/* =====================================================
          WORKSPACE TOOLS SECTION (Sleek side-by-side cards)
      ====================================================== */}
      <section className="w-full border-t border-slate-200 bg-slate-50 px-6 py-24 md:px-12 lg:px-24">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Workspace Toolkit
            </h2>
            <p className="mt-3 text-slate-600">
              Purpose-built utilities for independent professionals.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/w2-to-1099-calculator"
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <ArrowRightLeft className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900">W-2 to 1099 Converter</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Transitioning to freelance? Calculate the true equivalent rate by factoring in the 7.65% employer FICA tax burden and lost benefits.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-600">
              Compare rates <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/invoice-generator"
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900">PDF Invoice Generator</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Create, format, and export professional client invoices instantly. Everything generates locally in your browser for immediate PDF download.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-600">
              Draft an invoice <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* =====================================================
          INDUSTRY BENCHMARKS (Pill Chip Design)
      ====================================================== */}
      <section className="w-full border-t border-slate-200 bg-white px-6 py-24 md:px-12 lg:px-24">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Industry Benchmarks
          </h2>
          <p className="mt-3 text-slate-600">
            Select your niche to load a pre-configured financial model based on typical industry billable hours, expenses, and standard target incomes.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {popularRoles.map((role) => (
            <Link
              key={role.slug}
              href={`/rate/${role.slug}`}
              className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-3 pr-5 transition-all hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm transition-colors group-hover:bg-blue-100">
                <BriefcaseBusiness className="h-3.5 w-3.5 text-slate-500 group-hover:text-blue-600" />
              </div>
              <span className="text-sm font-bold text-slate-700 transition-colors group-hover:text-blue-800">
                {role.title.replace('Freelance ', '')}
              </span>
            </Link>
          ))}
          
          <Link
            href="/rates"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800"
          >
            View all models
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* =====================================================
          RECOMMENDED INFRASTRUCTURE (Clean Cards)
      ====================================================== */}
      <section className="w-full border-t border-slate-200 bg-slate-50 px-6 py-24 md:px-12 lg:px-24">
        <div className="mb-12">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Financial Infrastructure
          </h2>
          <p className="mt-3 text-slate-600">
            The banking, accounting, and compliance platforms we trust to run the back-office.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AffiliateCard
            category="Invoicing & Tax"
            badge="Essential"
            title="FreshBooks"
            description="Automate monthly invoicing, track expenses seamlessly, and prepare for tax season without spreadsheets."
            perk="Free 30-Day Trial"
            affiliateUrl={AFFILIATE_LINKS?.freshbooks || 'https://freshbooks.com'}
          />
          <AffiliateCard
            category="Global Business Banking"
            title="Wise Business"
            description="Receive client payments domestically or internationally with zero exchange markups and multi-currency accounts."
            perk="Zero fee on first transfer"
            affiliateUrl={AFFILIATE_LINKS?.wise || 'https://wise.com'}
          />
          <AffiliateCard
            category="Compliance & Agreements"
            title="Deel"
            description="Generate compliant contractor agreements instantly and manage international client contracts safely."
            perk="Free standard templates"
            affiliateUrl={AFFILIATE_LINKS?.deel || 'https://deel.com'}
          />
        </div>
      </section>
    </main>
  );
}