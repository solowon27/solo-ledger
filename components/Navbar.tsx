"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRightLeft,
  Calculator,
  ChevronDown,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  {
    href: "/",
    label: "Rate Calculator",
    icon: Calculator,
  },
  {
    href: "/w2-to-1099-calculator",
    label: "W-2 vs 1099",
    icon: ArrowRightLeft,
  },
  {
    href: "/invoice-generator",
    label: "Invoice Maker",
    icon: FileText,
  },
];

const roleLinks = [
  { href: "/rate/web-developer", label: "Web Developer" },
  { href: "/rate/graphic-designer", label: "Graphic Designer" },
  { href: "/rate/copywriter", label: "Copywriter" },
  { href: "/rate/seo-specialist", label: "SEO Specialist" },
  { href: "/rate/video-editor", label: "Video Editor" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rolesOpen, setRolesOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            BRAND
        ====================================================== */}

        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="group flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-sm font-black text-white shadow-sm transition-transform group-hover:scale-105 dark:bg-white dark:text-zinc-950">
            S
          </div>

          <div className="text-lg font-black tracking-tight text-zinc-950 dark:text-white">
            Solo<span className="text-blue-600">Ledger</span>
          </div>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                  active
                    ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}

          {/* Role benchmarks dropdown */}

          <div
            className="relative"
            onMouseEnter={() => setRolesOpen(true)}
            onMouseLeave={() => setRolesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setRolesOpen((current) => !current)}
              className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
            >
              Rate Benchmarks
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  rolesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {rolesOpen && (
              <div className="absolute right-0 top-full w-64 pt-2">
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl shadow-zinc-950/10 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="px-3 pb-2 pt-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
                      By profession
                    </p>
                  </div>

                  {roleLinks.map((role) => (
                    <Link
                      key={role.href}
                      href={role.href}
                      onClick={() => setRolesOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-blue-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-blue-400"
                    >
                      {role.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* =====================================================
            DESKTOP CTA
        ====================================================== */}

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-black text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
          >
            Calculate My Rate
          </Link>
        </div>

        {/* =====================================================
            MOBILE BUTTON
        ====================================================== */}

        <button
          type="button"
          aria-label={
            mobileOpen
              ? "Close navigation"
              : "Open navigation"
          }
          onClick={() =>
            setMobileOpen((current) => !current)
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 transition hover:bg-zinc-50 lg:hidden dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* =======================================================
          MOBILE NAVIGATION
      ======================================================== */}

      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 pb-5 pt-3 lg:hidden dark:border-zinc-800 dark:bg-zinc-950">
          <nav className="mx-auto max-w-7xl space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${
                    active
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                      : "text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-3">
              <div className="px-4 pb-2 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">
                Rate Benchmarks
              </div>

              {roleLinks.map((role) => (
                <Link
                  key={role.href}
                  href={role.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
                >
                  {role.label}
                </Link>
              ))}
            </div>

            <div className="pt-3">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white"
              >
                Calculate My Rate
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}