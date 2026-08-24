'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calculator,
  ArrowRightLeft,
  FileText,
  BriefcaseBusiness,
  Menu,
  X,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { AFFILIATE_LINKS } from '@/lib/affiliates';

const navItems = [
  { name: 'Rate Calculator', href: '/', icon: Calculator, badge: 'Core' },
  { name: 'W-2 vs 1099', href: '/w2-to-1099-calculator', icon: ArrowRightLeft },
  { name: 'Invoice Maker', href: '/invoice-generator', icon: FileText },
  { name: 'Project Pricing', href: '/project-pricing', icon: BriefcaseBusiness },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md lg:hidden">
        <Link href="/" className="flex items-center gap-2 font-black tracking-tight text-slate-900">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
            <Calculator className="h-4 w-4" />
          </div>
          <span className="text-base">Solo<span className="text-blue-600">Ledger</span></span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Dimmed Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Desktop & Drawer Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-slate-50 transition-transform duration-200 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-6">
          <Link href="/" className="flex items-center gap-2.5 font-black tracking-tight text-slate-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Calculator className="h-4 w-4" />
            </div>
            <div>
              <div className="text-base leading-none font-black text-slate-900">
                Solo<span className="text-blue-600">Ledger</span>
              </div>
              <div className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                Financial Suite
              </div>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-200 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <div className="px-3 pb-2 text-[10px] font-black tracking-wider text-slate-400 uppercase">
            Workspace Tools
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                      : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[9px] font-black tracking-wider uppercase ${
                        isActive
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Pinned Bottom Partner Stack */}
        <div className="shrink-0 border-t border-slate-200 p-3">
          <div className="rounded-xl border border-blue-200/80 bg-blue-50/80 p-3.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-[10px] font-black tracking-wider text-blue-700 uppercase">
              <Sparkles className="h-3 w-3" />
              <span>Recommended Tool</span>
            </div>
            <p className="mt-1 text-xs font-bold text-slate-800">FreshBooks Invoicing</p>
            <p className="mt-0.5 text-[11px] text-slate-500">Track write-offs & get paid fast.</p>
            <a
              href={AFFILIATE_LINKS?.freshbooks || 'https://freshbooks.com'}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-2.5 flex items-center justify-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-700"
            >
              <span>30-Day Free Trial</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}