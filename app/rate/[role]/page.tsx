import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ROLES_DATA } from '@/lib/rolesData';
import { Calculator } from '@/components/Calculator';
import { AffiliateCard } from '@/components/AffiliateCard';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ role: string }>;
}

export async function generateStaticParams() {
  return Object.keys(ROLES_DATA).map((role) => ({
    role,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role } = await params;
  const data = ROLES_DATA[role];
  if (!data) return {};

  return {
    title: `${data.title} Hourly Rate & Tax Calculator (Benchmark)`,
    description: data.description,
    keywords: [`${role} hourly rate`, `${role} freelance pricing`, `${role} contract calculator`],
  };
}

export default async function RoleRatePage({ params }: PageProps) {
  const { role } = await params;
  const data = ROLES_DATA[role];

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        <div>
          <Link href="/" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
            ← Back to Universal Calculator
          </Link>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            {data.title} Rate Calculator
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
            {data.description} Pre-filled with baseline benchmarks for {data.title.toLowerCase()}s.
          </p>
        </div>

        {/* Pre-populated Calculator */}
        <Calculator
          initialValues={{
            targetNetIncome: data.defaultTakeHome,
            annualExpenses: data.defaultExpenses,
            billableHoursPerWeek: data.defaultBillableHours,
          }}
        />

        {/* Contextual Affiliate Monetization */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Recommended Tools for {data.title}s
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AffiliateCard
              category="Accounting & Invoicing"
              badge="Essential"
              title="FreshBooks"
              description="Automate recurring client invoices, track project hours, and claim software write-offs."
              perk="30-Day Free Trial"
              affiliateUrl="https://freshbooks.com"
            />
            <AffiliateCard
              category="Cross-Border Payments"
              title="Wise Business"
              description="Receive international client wires with mid-market exchange rates and minimal fees."
              perk="No transaction fees up to $600"
              affiliateUrl="https://wise.com"
            />
            <AffiliateCard
              category="Legal Contracts"
              title="Deel"
              description="Generate compliant independent contractor agreements and NDAs in seconds."
              perk="Free Standard Agreement Templates"
              affiliateUrl="https://deel.com"
            />
          </div>
        </div>
      </div>
    </main>
  );
}