import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRightLeft, ShieldCheck } from 'lucide-react';
import { W2Calculator } from '@/components/W2Calculator';
import { AffiliateCard } from '@/components/AffiliateCard';
import { AFFILIATE_LINKS } from '@/lib/affiliates';

export const metadata: Metadata = {
  title: 'W2 to 1099 Calculator | Salary to Contractor Rate Converter',
  description: 'Convert your full-time W-2 corporate salary into an equivalent 1099 contractor hourly rate factoring in taxes, healthcare, 401(k), and PTO.',
  keywords: ['w2 to 1099 calculator', 'salary to hourly contractor converter', 'employee vs contractor pay'],
};

export default function W2To1099Page() {
  return (
    <div className="min-h-screen w-full bg-slate-100/70 p-4 sm:p-6 lg:p-8 xl:p-10 space-y-6 sm:space-y-8">
      
      {/* Top Application Header Bar */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:p-6">
        <div>
          <Link href="/" className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <ArrowRightLeft className="h-4 w-4" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              W-2 to 1099 Salary Converter
            </h1>
          </div>
          
          <p className="mt-2 max-w-2xl text-xs text-slate-500 sm:text-sm">
            Transitioning from full-time employment to contracting? Calculate your required 1099 billing rate to avoid taking a hidden pay cut.
          </p>
        </div>

        <div className="flex items-center">
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Includes FICA & Benefits
          </span>
        </div>
      </div>

      {/* Calculator Engine (Full-Bleed Card) */}
      <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs sm:p-6 lg:p-8">
        <W2Calculator />
      </div>

      {/* Affiliate Monetization Section */}
      <div className="w-full space-y-3">
        <h2 className="text-base font-black text-slate-900">
          Essential Infrastructure for Independent Contractors
        </h2>
        <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-500">
          When transitioning to a 1099 status, you need to manage your own compliance, invoicing, and tax write-offs. Here is the recommended toolkit.
        </p>
        
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AffiliateCard
            category="LLC Formation & Compliance"
            badge="Recommended"
            title="ZenBusiness"
            description="Form an LLC quickly to separate personal and business liabilities and write off self-employment taxes."
            perk="Official LLC formation service"
            affiliateUrl={AFFILIATE_LINKS?.zenbusiness || "https://zenbusiness.com"}
          />
          <AffiliateCard
            category="Contracting & Payroll"
            title="Deel"
            description="Onboard direct clients, generate compliant contractor agreements, and manage global invoicing."
            perk="Standard contract templates"
            affiliateUrl={AFFILIATE_LINKS?.deel || "https://deel.com"}
          />
          <AffiliateCard
            category="Accounting & Taxes"
            title="FreshBooks"
            description="Track write-offs for home office, electronics, and software subscriptions to lower your tax liability."
            perk="30-Day Free Trial"
            affiliateUrl={AFFILIATE_LINKS?.freshbooks || "https://freshbooks.com"}
          />
        </div>
      </div>

    </div>
  );
}