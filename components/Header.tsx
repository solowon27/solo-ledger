'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Calculator,
  ArrowRightLeft,
  FileText,
  Target,
  BriefcaseBusiness,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

import { ROLES_DATA } from '@/lib/rolesData';

const navItems = [
  {
    name: 'Rate Calculator',
    href: '/',
    icon: Calculator,
  },
  {
    name: 'W-2 vs 1099',
    href: '/w2-to-1099-calculator',
    icon: ArrowRightLeft,
  },
  {
    name: 'Project Pricing',
    href: '/project-pricing',
    icon: Target,
  },
  {
    name: 'Invoice Maker',
    href: '/invoice-generator',
    icon: FileText,
  },
];

export function Header() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [benchmarksOpen, setBenchmarksOpen] = useState(false);

  // Prevent page scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  // Close desktop dropdown when navigating
  useEffect(() => {
    setBenchmarksOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 font-black tracking-tight text-slate-900"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Calculator className="h-4 w-4" />
          </div>

          <div className="text-lg leading-none">
            Solo<span className="text-blue-600">Ledger</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-slate-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />

                {item.name}
              </Link>
            );
          })}

          {/* Desktop Benchmarks Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setBenchmarksOpen(true)}
            onMouseLeave={() => setBenchmarksOpen(false)}
          >
            {/* Benchmarks Button */}
            <button
              type="button"
              aria-expanded={benchmarksOpen}
              className={`group flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition-all ${
                benchmarksOpen
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <BriefcaseBusiness
                className={`h-4 w-4 ${
                  benchmarksOpen
                    ? 'text-slate-600'
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />

              Benchmarks

              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                  benchmarksOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown */}
            {benchmarksOpen && (
              <div className="absolute right-0 top-full z-50 w-[480px] pt-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10">
                  <div className="mb-3 px-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Select your profession
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(ROLES_DATA).map(([slug, data]) => (
                      <Link
                        key={slug}
                        href={`/rate/${slug}`}
                        onClick={() => setBenchmarksOpen(false)}
                        className="flex min-w-0 items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                      >
                        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />

                        <span className="truncate">
                          {data.shortTitle}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="absolute left-0 top-16 h-[calc(100vh-4rem)] w-full overflow-y-auto border-t border-slate-200 bg-white pb-20 md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            <div className="mb-2 px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
              Workspace Tools
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-slate-400'
                    }`}
                  />

                  {item.name}
                </Link>
              );
            })}

            {/* Mobile Benchmarks */}
            <div className="mb-2 mt-4 px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
              Industry Benchmarks
            </div>

            <div className="flex flex-col gap-1">
              {Object.entries(ROLES_DATA).map(([slug, data]) => (
                <Link
                  key={slug}
                  href={`/rate/${slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  <BriefcaseBusiness className="h-4 w-4 shrink-0 text-slate-300" />

                  <span>{data.shortTitle}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
