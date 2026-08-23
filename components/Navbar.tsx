import Link from 'next/link';
import { Calculator, ArrowRightLeft, FileText } from 'lucide-react';

export function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Solo<span className="text-blue-600">Ledger</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-zinc-600 transition hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
          >
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">Rate Calculator</span>
          </Link>
          <Link
            href="/w2-to-1099-calculator"
            className="flex items-center gap-1.5 text-zinc-600 transition hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
          >
            <ArrowRightLeft className="h-4 w-4" />
            <span className="hidden sm:inline">W-2 vs. 1099</span>
          </Link>
          <Link
            href="/invoice-generator"
            className="flex items-center gap-1.5 text-zinc-600 transition hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Invoice Maker</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}