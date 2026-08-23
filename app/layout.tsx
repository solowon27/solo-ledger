import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  metadataBase: new URL('https://solo-ledger.com'),
  title: {
    default: 'SoloLedger | Freelance Rate & Tax Calculator',
    template: '%s | SoloLedger',
  },
  description:
    'Calculate your true freelance hourly rate, factor in self-employment taxes, and protect your margins.',
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
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}