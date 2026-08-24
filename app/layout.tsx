import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';

export const metadata: Metadata = {
  metadataBase: new URL('https://solo-ledger.com'),
  title: {
    default: 'SoloLedger | Freelance Financial Software',
    template: '%s | SoloLedger',
  },
  description: 'Financial workspace and rate calculation engine for independent professionals.',
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
      <body className="antialiased bg-slate-100 text-slate-900 min-h-screen">
        <div className="flex min-h-screen w-full flex-col lg:flex-row">
          <Sidebar />
          <main className="flex-1 w-full min-w-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}