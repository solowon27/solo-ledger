import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar,
  CheckCircle2,
  DollarSign,
  HelpCircle,
  Percent,
  Receipt,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { TaxCalculator } from '@/components/TaxCalculator';
import { AffiliateCard } from '@/components/AffiliateCard';
import { AFFILIATE_LINKS } from '@/lib/affiliates';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Free Freelance Tax Calculator (2026) | Self-Employment Tax Estimator',
  description:
    'Free 1099 freelance tax calculator. Estimate your self-employment tax (15.3% FICA), federal income tax, and quarterly estimated tax payments instantly with no sign-up.',
  keywords: [
    'free freelance tax calculator',
    'self employment tax calculator',
    '1099 tax calculator',
    'freelance quarterly tax estimator',
    'how much to set aside for freelance taxes',
    'contractor tax calculator 2026',
  ],
  alternates: {
    canonical: '/free-freelance-tax-calculator',
  },
  openGraph: {
    title: 'Free Freelance Tax Calculator (2026) | SoloLedger',
    description:
      'Instantly calculate your 15.3% self-employment tax, net take-home pay, and quarterly tax reserves.',
    url: 'https://solo-ledger.com/free-freelance-tax-calculator',
    type: 'website',
  },
};

const faqs = [
  {
    q: 'How much should a freelancer set aside for taxes?',
    a: 'A solid rule of thumb is to set aside 25% to 30% of your net freelance income (gross revenue minus business expenses). This covers the 15.3% federal self-employment tax (FICA) plus your standard federal and state income tax brackets.',
  },
  {
    q: 'What is the 1099 self-employment tax rate?',
    a: 'The self-employment tax rate is 15.3%. This consists of 12.4% for Social Security (applied up to the annual wage cap) and 2.9% for Medicare (with no income limit). Because you are both employer and employee, you pay the full amount, but you can deduct the employer-equivalent half (7.65%) on your Form 1040.',
  },
  {
    q: 'When are quarterly estimated taxes due?',
    a: 'Quarterly estimated taxes are typically due on four deadlines every year: Q1 is due April 15, Q2 is due June 15, Q3 is due September 15, and Q4 is due January 15 of the following year.',
  },
  {
    q: 'Can I deduct business expenses to lower my freelance taxes?',
    a: 'Yes. Self-employment tax and income taxes are calculated on your net profit, not your gross revenue. Deductible business expenses include software subscriptions, home office deductions, hardware, web hosting, internet, and health insurance premiums.',
  },
];

export default function FreeFreelanceTaxCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Free Freelance Tax Calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: 'https://solo-ledger.com/free-freelance-tax-calculator',
        description:
          'Free self-employment tax calculator to estimate federal, state, FICA, and quarterly tax burdens for 1099 contractors.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen w-full bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* =====================================================
          HERO (High-Converting Header)
      ====================================================== */}
      <section className="relative w-full border-b border-slate-200 bg-slate-50 px-6 py-16 md:px-12 lg:px-24">
        <div className="max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            100% Free · No Sign-Up Required
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Free Freelance <br className="hidden sm:block" />
            <span className="text-blue-600">Tax Calculator (2026)</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Estimate your self-employment tax (15.3% FICA), calculate your net take-home pay, and budget for quarterly estimated IRS payments without spreadsheets.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Includes 15.3% SE Tax
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Schedule C expense deductions
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Live quarterly payment estimate
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          CALCULATOR SECTION
      ====================================================== */}
      <section className="w-full border-b border-slate-200 px-6 py-16 md:px-12 lg:px-24">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Calculate your 1099 tax burden
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Enter your gross revenue and deductible operating costs to see your estimated federal, state, and self-employment tax breakdown.
          </p>
        </div>

        <TaxCalculator />
      </section>

        {/* High-Intent In-Feed Ad Banner */}
      <section className="w-full max-w-5xl mx-auto px-6">
        <AdBanner dataAdSlot="1234567890" />
      </section>
      
      {/* =====================================================
          HOW FREELANCE TAXES WORK (Educational SEO Content)
      ====================================================== */}
      <section className="w-full border-b border-slate-200 bg-slate-50 px-6 py-16 md:px-12 lg:px-24">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            How 1099 Freelance Taxes Work
          </h2>
          <p className="mt-4 text-slate-600">
            When you transition from a W-2 employee to a 1099 contractor, taxes are no longer withheld from your paychecks automatically. You become responsible for both portions of FICA taxes.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Percent className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-black text-slate-900">Self-Employment (SE) Tax</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                <strong>15.3%</strong> total (12.4% for Social Security + 2.9% for Medicare) calculated on 92.35% of your net business earnings.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <DollarSign className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-black text-slate-900">Income Taxes</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Federal and state progressive income tax brackets applied to your adjusted gross income after deducting business write-offs.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-black text-slate-900">Quarterly Deadlines</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                If you expect to owe over $1,000 in taxes, the IRS requires quarterly estimated payments in April, June, September, and January.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FREQUENTLY ASKED QUESTIONS (FAQ Schema Matched)
      ====================================================== */}
      <section className="w-full border-b border-slate-200 px-6 py-16 md:px-12 lg:px-24">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600">
            <HelpCircle className="h-4 w-4" />
            <span>Got Questions?</span>
          </div>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Freelance Tax FAQs
          </h2>

          <div className="mt-8 space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition-colors hover:bg-slate-50"
              >
                <h3 className="text-base font-bold text-slate-900">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TAX & INVOICING TOOLS
      ====================================================== */}
      <section className="w-full bg-slate-50 px-6 py-16 md:px-12 lg:px-24">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Tools to Track Write-Offs & Invoicing
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Keep your business write-offs organized automatically to lower your taxable net profit.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AffiliateCard
            category="Tax & Expense Tracking"
            badge="Top Pick"
            title="FreshBooks"
            description="Track tax write-offs, log receipt expenses automatically, and generate Schedule C reports."
            perk="Free 30-Day Trial"
            affiliateUrl={AFFILIATE_LINKS?.freshbooks || 'https://freshbooks.com'}
          />
          <AffiliateCard
            category="Global Payments"
            title="Wise Business"
            description="Keep multi-currency payments organized with transparent exchange rates for cross-border taxes."
            perk="Zero fee on first transfer"
            affiliateUrl={AFFILIATE_LINKS?.wise || 'https://wise.com'}
          />
          <AffiliateCard
            category="Contractor Compliance"
            title="Deel"
            description="Automate W-9 / W-8BEN collection and generate IRS 1099-NEC forms seamlessly."
            perk="Free compliance templates"
            affiliateUrl={AFFILIATE_LINKS?.deel || 'https://deel.com'}
          />
        </div>
      </section>
    </main>
  );
}