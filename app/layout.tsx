import type { Metadata } from 'next';
import Script from 'next/script';

import './globals.css';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CountrySuggestion } from '@/components/CountrySuggestion';

export const metadata: Metadata = {
  metadataBase: new URL('https://solo-ledger.com'),

  title: {
    default: 'SoloLedger | Free Freelance Rate & Tax Calculator',
    template: '%s | SoloLedger',
  },

  description:
    'Free freelance rate calculator and financial workspace for independent professionals, contractors, and consultants.',

  alternates: {
    canonical: './',
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },

  openGraph: {
    title: 'SoloLedger | Free Freelance Rate & Tax Calculator',
    description:
      'Free freelance rate calculator and financial workspace for independent professionals, contractors, and consultants.',
    url: 'https://solo-ledger.com',
    siteName: 'SoloLedger',
    type: 'website',
  },

  other: {
    'impact-site-verification': 'c24b4646-597d-406e-a3cd-9f85467f7fa5',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 flex min-h-screen flex-col selection:bg-blue-200">
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5417333344144399"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        <Header />

        <CountrySuggestion />

        <main className="flex-1 w-full min-w-0 flex flex-col">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}