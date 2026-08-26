import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, DollarSign, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Financial & Affiliate Disclaimer',
  description: 'Important financial advice disclaimers and FTC affiliate compensation disclosures for SoloLedger.',
  alternates: { canonical: '/disclaimer' },
};

export default function DisclaimerPage() {
  const lastUpdated = 'August 25, 2026';

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 md:p-14 shadow-xs">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Financial & Affiliate Disclaimer
        </h1>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Last Updated: {lastUpdated}
        </p>

        {/* Highlight Banner */}
        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-amber-900">
          <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600 mt-0.5" />
          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            SoloLedger is an independent financial modeling utility. The mathematical output produced by our calculators does not constitute certified public accounting (CPA), financial, legal, or investment advice.
          </p>
        </div>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-600">
          <section>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">1. Not Financial or Tax Advice</h2>
            </div>
            <p className="mt-2">
              The calculations, rates, deductions, and tax models (including Self-Employment Tax rates, income projections, and W-2 versus 1099 equivalents) generated on <Link href="/" className="text-blue-600 underline">solo-ledger.com</Link> are estimates designed solely for informational, educational, and general budgeting purposes.
            </p>
            <p className="mt-2">
              Tax rules vary widely based on your geographic location, business structure (Sole Proprietorship, Single-Member LLC, S-Corp), state-specific tax brackets, and local self-employment obligations. You should consult a licensed Certified Public Accountant (CPA), enrolled agent, or tax attorney before making final pricing, legal, or tax filing determinations.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">2. FTC Affiliate Compensation Disclosure</h2>
            </div>
            <p className="mt-2">
              In compliance with Federal Trade Commission (FTC) guidelines regarding endorsements and testimonials, please assume that certain links, recommendation cards, and banners across SoloLedger are affiliate links.
            </p>
            <p className="mt-2">
              If you click through an affiliate link (e.g., FreshBooks, Wise Business, Deel) and complete a sign-up or purchase, SoloLedger may receive monetary compensation, referral fees, or commissions from the merchant at <strong>no additional cost to you</strong>.
            </p>
            <p className="mt-2">
              Our editorial opinions and tool parameters are independent. We only recommend software platforms that provide genuine utility for independent professionals and solo business operators.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">3. Advertising Disclosure (Google AdSense)</h2>
            <p className="mt-2">
              SoloLedger displays third-party advertisements served by Google AdSense. These advertisements are labeled as &quot;Ads,&quot; &quot;Sponsored,&quot; or separated from our core calculation tools. SoloLedger does not explicitly endorse or guarantee the claims made in third-party advertisements displayed on the site.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}