import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://solo-ledger.com'),
  title: {
    default: 'SoloLedger | Freelance Rate & Tax Calculator',
    template: '%s | SoloLedger',
  },
  description: 'Calculate your true freelance hourly rate, factor in self-employment taxes, and protect your margins.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}