import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and data practices for SoloLedger financial calculators and tools.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  const lastUpdated = 'August 25, 2026';

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 md:p-14 shadow-xs">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Last Updated: {lastUpdated}
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-600">
          <section>
            <h2 className="text-lg font-bold text-slate-900">1. Overview & Data Philosophy</h2>
            <p className="mt-2">
              SoloLedger (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) provides freelance financial calculation engines, rate estimators, and invoice generators at <Link href="/" className="text-blue-600 underline">solo-ledger.com</Link>. We respect your privacy. Our interactive calculators operate predominantly client-side in your browser; we do not store, sell, or harvest your proprietary income data, client names, or financial calculations on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">2. Information We Collect Automatically</h2>
            <p className="mt-2">
              When you access our platform, standard non-identifying telemetry may be logged automatically by our hosting provider (Vercel) and analytics tools, including:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Device and browser information (User-Agent, screen resolution, operating system).</li>
              <li>Referring website, pages visited, and timestamps.</li>
              <li>General geographic location (country or city level derived from IP address).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">3. Cookies, Web Beacons & Advertising Partners</h2>
            <p className="mt-2">
              We partner with third-party advertising networks and affiliate tracking platforms to support the continuous free operation of this site:
            </p>
            <div className="mt-3 space-y-3">
              <p>
                <strong>Google AdSense & DoubleClick:</strong> Google uses cookies (such as the DART cookie) to serve ads to our users based on their visits to this and other websites. You may opt out of personalized advertising by visiting the <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Ads Settings</a> page.
              </p>
              <p>
                <strong>Affiliate Link Tracking:</strong> When you click third-party partner links (e.g., FreshBooks, Wise, Deel), our affiliate partners (including Impact and PartnerStack) may deploy tracking cookies on your browser to attribute referrals and calculate qualified commission payouts. These cookies operate under the privacy policies of the respective merchant networks.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">4. European Economic Area (EEA), UK & Swiss User Rights (GDPR)</h2>
            <p className="mt-2">
              For visitors in the EEA, UK, and Switzerland, we deploy an IAB TCF v2.2–compliant Consent Management Platform (CMP) through Google to collect, manage, and record explicit consent regarding the use of cookies and personal data for ad personalization. You may adjust your consent choices at any time through your browser settings or on-site privacy controls.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">5. California Consumer Privacy Act (CCPA / CPRA)</h2>
            <p className="mt-2">
              If you are a California resident, you have the right to know what personal data is collected, request deletion, and opt out of the &quot;sale&quot; or &quot;sharing&quot; of your personal data as defined under California law. SoloLedger does not sell personal user information directly for monetary consideration.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">6. Contact Information</h2>
            <p className="mt-2">
              For questions regarding this Privacy Policy or our operational practices, please reach out via our contact channels at <span className="font-semibold text-slate-800">solowon29@gmail.com</span>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}