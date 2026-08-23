import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator } from '@/components/Calculator';
import { AffiliateCard } from '@/components/AffiliateCard';
import { ROLES_DATA } from '@/lib/rolesData';

export const metadata: Metadata = {
  title: 'Freelance Rate & Tax Calculator | Find Your True Hourly Rate',
  description: 'Calculate your exact freelance hourly and day rate based on desired take-home salary, business expenses, and self-employment taxes.',
  keywords: ['freelance hourly rate calculator', 'contractor tax calculator', 'freelance pricing model'],
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Freelance Hourly Rate & Tax Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 dark:bg-zinc-950 sm:px-6 lg:px-8">
      {/* Structured SEO Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        {/* Hero Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Freelance Hourly Rate & Tax Calculator
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Stop guessing your rates. Calculate your real billing rate to cover self-employment taxes, business overhead, and time off.
          </p>
        </div>

        {/* Universal Tool */}
        <Calculator />

        {/* Industry Benchmarks Navigation */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Role-Specific Rate Benchmarks
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Explore pre-calculated tax and income models customized for your specialization:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.values(ROLES_DATA).map((role) => (
              <Link
                key={role.slug}
                href={`/rate/${role.slug}`}
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-800 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                {role.title} →
              </Link>
            ))}
          </div>
        </div>

        {/* Monetization Section */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Essential Tools for Freelance Financial Management
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Recommended software to track your write-offs, invoice clients, and save on banking fees.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AffiliateCard
              category="Invoicing & Accounting"
              badge="Top Pick"
              title="FreshBooks"
              description="Automated invoicing, expense tracking, and painless tax categorization built specifically for freelancers."
              perk="Free 30-Day Trial (No Credit Card)"
              affiliateUrl="https://freshbooks.com"
            />
            <AffiliateCard
              category="International Banking"
              title="Wise Business"
              description="Receive client payments from US, UK, and Europe with zero hidden exchange markup and ultra-low fees."
              perk="Zero fee on your first $600 transfer"
              affiliateUrl="https://wise.com"
            />
            <AffiliateCard
              category="Contracts & Compliance"
              title="Deel"
              description="Create compliant international freelance contracts, sign NDAs, and get paid instantly in 120+ currencies."
              perk="Instant standard contract generator"
              affiliateUrl="https://deel.com"
            />
          </div>
        </div>
      </div>
    </main>
  );
}