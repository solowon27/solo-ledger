import type { Metadata } from 'next';
import Link from 'next/link';

import {
  ArrowRight,
  ArrowRightLeft,
  BriefcaseBusiness,
  Calculator,
  Check,
  FileText,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

import { Calculator as RateCalculator } from '@/components/Calculator';
import { AffiliateCard } from '@/components/AffiliateCard';
import { ROLES_DATA } from '@/lib/rolesData';
import { AFFILIATE_PARTNERS } from '@/lib/affiliates';
import { CountrySuggestion } from "@/components/CountrySuggestion";
import { AnimatedStat } from '@/components/AnimatedStat';
import { StickyPlanBar } from '@/components/StickyPlanBar';

export const metadata: Metadata = {
  title: 'SoloLedger | Freelance Financial Planning',
  description:
    'Plan your freelance income, expenses, taxes, savings, and rates with a practical financial planning calculator built for independent professionals.',
};

const popularRoles = Object.values(ROLES_DATA).slice(0, 12);

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SoloLedger',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    description:
      'Financial planning tools for freelancers and independent professionals.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Freelance financial planning
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
                Know what your freelance business needs to make.
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Build a financial plan around the income you actually want.
                Account for expenses, taxes, vacation, and realistic billable
                hours before deciding what to charge.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#planner"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  Build your plan
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  href="/w2-to-1099-calculator"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  Compare W-2 vs 1099
                </Link>
              </div>
            </div>

            {/* Financial snapshot */}
            <div className="lg:justify-self-end lg:w-full lg:max-w-xl">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Example plan
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      Independent designer
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    On target
                  </div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-slate-200">
                  <div className="p-5">
                    <p className="text-xs text-slate-500">Annual take-home</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">
                      <AnimatedStat value={72000} prefix="$" />
                    </p>
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-slate-500">Annual business costs</p>
                   <p className="mt-2 text-2xl font-semibold tracking-tight">
                      <AnimatedStat value={9600} prefix="$" />
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-200 px-5 py-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      Revenue allocation
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      <AnimatedStat value={113000} prefix="$" />
                    </span>
                  </div>

                  <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="w-[32%] bg-slate-950" />
                    <div className="w-[18%] bg-blue-500" />
                    <div className="w-[50%] bg-slate-200" />
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] text-slate-500">
                    <span>Take-home</span>
                    <span>Taxes</span>
                    <span>Expenses</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 border-t border-slate-200">
                  <div className="p-4">
                    <p className="text-[11px] text-slate-500">Hourly floor</p>
                    <p className="mt-1 text-lg font-semibold">
                      <AnimatedStat value={61} prefix="$" />
                    </p>
                  </div>

                  <div className="border-x border-slate-200 p-4">
                    <p className="text-[11px] text-slate-500">Recommended</p>
                    <p className="mt-1 text-lg font-semibold text-blue-700">
                      $74
                    </p>
                  </div>

                  <div className="p-4">
                    <p className="text-[11px] text-slate-500">Day rate</p>
                    <p className="mt-1 text-lg font-semibold">
                      <AnimatedStat value={592} prefix="$" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST / PRODUCT POSITIONING
      ========================================================= */}

    <section className="border-b border-slate-200 bg-white">
  <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      <div>
        <p className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          <AnimatedStat value={4200} suffix="+" />
        </p>
        <p className="mt-1 text-xs text-slate-500">Plans built</p>
      </div>
      <div>
        <p className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          <AnimatedStat value={38} prefix="$" suffix="/hr" />
        </p>
        <p className="mt-1 text-xs text-slate-500">Avg. rate increase found</p>
      </div>
      <div>
        <p className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          <AnimatedStat value={190} suffix="+" />
        </p>
        <p className="mt-1 text-xs text-slate-500">Professions covered</p>
      </div>
      <div>
        <p className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          <AnimatedStat value={0} prefix="$" />
        </p>
        <p className="mt-1 text-xs text-slate-500">Cost, no account needed</p>
      </div>
    </div>
  </div>
</section>

      {/* =========================================================
          MAIN PLANNER
      ========================================================= */}

      <section
        id="planner"
        className="scroll-mt-20 border-b border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                Financial planner
              </p>

              <h2 className="text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
                Build your freelance plan.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Tell SoloLedger what you want to earn and how you operate.
                Your target rate is calculated from the entire financial
                picture—not just a salary number.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              No account required
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm sm:p-5 lg:p-6">
            <div className="rounded-lg border border-slate-200 bg-white">
              <RateCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW THE MODEL WORKS
      ========================================================= */}

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                The model
              </p>

              <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Your rate is the output. Your financial plan is the starting
                point.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
                A sustainable freelance rate has to support more than your
                paycheck. SoloLedger works backward from your desired
                take-home income and accounts for the costs of operating your
                business.
              </p>
            </div>

            <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
              <div className="grid gap-5 p-6 sm:grid-cols-[48px_1fr] sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold">
                  01
                </div>

                <div>
                  <h3 className="font-semibold">Start with take-home income</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Decide how much money you want available for yourself
                    after taxes and business costs.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-6 sm:grid-cols-[48px_1fr] sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold">
                  02
                </div>

                <div>
                  <h3 className="font-semibold">
                    Add the cost of running the business
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Include software, insurance, equipment, accounting,
                    marketing, and other annual operating expenses.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-6 sm:grid-cols-[48px_1fr] sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold">
                  03
                </div>

                <div>
                  <h3 className="font-semibold">
                    Protect time that cannot be billed
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Vacation and non-billable time reduce your available
                    earning capacity. Your rate needs to account for that.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-6 sm:grid-cols-[48px_1fr] sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-sm font-semibold text-blue-700">
                  04
                </div>

                <div>
                  <h3 className="font-semibold">
                    Convert the plan into a rate
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    The result gives you a minimum rate, a recommended rate,
                    daily equivalent, and annual revenue targets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TOOLS
      ========================================================= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              More tools
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              Useful numbers for the business behind your work.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Link
              href="/w2-to-1099-calculator"
              className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg sm:p-8"
            >
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100">
                <ArrowRightLeft className="h-5 w-5 text-slate-700" />
              </div>

              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    W-2 → 1099 comparison
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                    See what freelance income would need to replace your
                    salary after considering benefits, payroll taxes, paid
                    time off, and other compensation.
                  </p>
                </div>

                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-slate-900" />
              </div>
            </Link>

            <Link
              href="/invoice-generator"
              className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg sm:p-8"
            >
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100">
                <FileText className="h-5 w-5 text-slate-700" />
              </div>

              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    Invoice generator
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                    Create professional invoices and export them as PDFs
                    without sending your financial information to a server.
                  </p>
                </div>

                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-slate-900" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROFESSIONS
      ========================================================= */}

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Starting points
              </p>

              <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Start with your profession.
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
                Use a pre-configured model as a starting point, then adjust
                the numbers to match your own business.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {popularRoles.map((role) => (
                <Link
                  key={role.slug}
                  href={`/rate/${role.slug}`}
                  className="group flex min-h-14 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 transition-colors hover:border-blue-300 hover:bg-blue-50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 transition-colors group-hover:bg-blue-100">
                    <BriefcaseBusiness className="h-4 w-4 text-slate-500 group-hover:text-blue-700" />
                  </span>

                  <span className="truncate text-xs font-semibold text-slate-700 group-hover:text-blue-800 sm:text-sm">
                    {role.shortTitle}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INFRASTRUCTURE
      ========================================================= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Business infrastructure
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              Tools worth having in your stack.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
              Financial products and services that can help you operate the
              business behind your freelance work.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Object.values(AFFILIATE_PARTNERS).map((partner) => (
              <AffiliateCard
                key={partner.id}
                category={partner.category}
                badge={partner.badge}
                title={partner.name}
                description={partner.description}
                perk={partner.perk}
                affiliateUrl={partner.url}
              />
            ))}
          </div>
        </div>
      </section>
      <CountrySuggestion />
      <StickyPlanBar />
    </main>
  );
}