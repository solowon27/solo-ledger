import type { Metadata } from 'next';
import Link from 'next/link';
import { W2Calculator } from '@/components/W2Calculator';
import { AffiliateCard } from '@/components/AffiliateCard';

export const metadata: Metadata = {
  title: 'W2 to 1099 Calculator | Salary to Contractor Rate Converter',
  description: 'Convert your full-time W-2 corporate salary into an equivalent 1099 contractor hourly rate factoring in taxes, healthcare, 401(k), and PTO.',
  keywords: ['w2 to 1099 calculator', 'salary to hourly contractor converter', 'employee vs contractor pay'],
};

export default function W2To1099Page() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        <div>
          <Link href="/" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
            ← Back to Universal Rate Calculator
          </Link>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            W-2 to 1099 Contractor Calculator
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Transitioning from full-time employment to contracting? Calculate your required 1099 billing rate to avoid taking a hidden pay cut.
          </p>
        </div>

        <W2Calculator />

        {/* Affiliate Monetization */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Essential Tools for Switching to 1099 Contracting
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AffiliateCard
              category="LLC Formation & Compliance"
              badge="Recommended"
              title="ZenBusiness"
              description="Form an LLC quickly to separate personal and business liabilities and write off self-employment taxes."
              perk="Official LLC formation service"
              affiliateUrl="https://zenbusiness.com"
            />
            <AffiliateCard
              category="Contracting & Payroll"
              title="Deel"
              description="Onboard direct clients, generate compliant contractor agreements, and manage global invoicing."
              perk="Standard contract templates"
              affiliateUrl="https://deel.com"
            />
            <AffiliateCard
              category="Accounting & Taxes"
              title="FreshBooks"
              description="Track write-offs for home office, electronics, and software subscriptions to lower your tax liability."
              perk="30-Day Free Trial"
              affiliateUrl="https://freshbooks.com"
            />
          </div>
        </div>
      </div>
    </main>
  );
}