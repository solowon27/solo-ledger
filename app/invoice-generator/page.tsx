import type { Metadata } from 'next';
import Link from 'next/link';
import { InvoiceGenerator } from '@/components/InvoiceGenerator';
import { AffiliateCard } from '@/components/AffiliateCard';

export const metadata: Metadata = {
  title: 'Free Invoice Generator for Freelancers | Download PDF Instantly',
  description: 'Create and download free, professional PDF invoices in seconds. No signup or credit card required.',
  keywords: ['free invoice generator', 'freelance invoice maker pdf', 'instant contractor invoice'],
};

export default function InvoicePage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        <div>
          <Link href="/" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
            ← Back to Universal Rate Calculator
          </Link>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Free Freelance Invoice Generator
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Create, edit, and export clean PDF invoices instantly directly in your browser.
          </p>
        </div>

        <InvoiceGenerator />

        {/* Monetization / Automation Banner */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Tired of Making Manual Invoices Every Month?
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Automate recurring client billing, send late payment reminders, and accept credit cards directly with dedicated software:
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AffiliateCard
              category="Automated Billing"
              badge="Top Invoicing App"
              title="FreshBooks"
              description="Send automated recurring invoices, accept online card payments, and automatically reconcile bank statements."
              perk="Try Free for 30 Days"
              affiliateUrl="https://freshbooks.com"
            />
            <AffiliateCard
              category="Global Payouts"
              title="Wise Business"
              description="Attach international multi-currency bank accounts to your invoices to receive payments with zero conversion markup."
              perk="Zero fee on first transfer"
              affiliateUrl="https://wise.com"
            />
            <AffiliateCard
              category="Contractor Management"
              title="Deel"
              description="Automate full invoicing workflows and tax compliance for international and cross-border clients."
              perk="Free Standard Agreement Templates"
              affiliateUrl="https://deel.com"
            />
          </div>
        </div>
      </div>
    </main>
  );
}