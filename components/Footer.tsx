import React from "react";
import Link from "next/link";

import { ROLES_DATA } from "@/lib/rolesData";
import { AFFILIATE_LINKS } from "@/lib/affiliates";

import {
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const rolesByCategory = Object.entries(ROLES_DATA).reduce(
    (acc, [key, data]) => {
      if (!acc[data.category]) {
        acc[data.category] = [];
      }

      acc[data.category].push({
        key,
        ...data,
      });

      return acc;
    },
    {} as Record<
      string,
      Array<{
        key: string;
        shortTitle: string;
        [k: string]: any;
      }>
    >
  );

  return (
    <footer className="w-full min-w-0 overflow-hidden border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto w-full max-w-7xl min-w-0 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        {/* =====================================================
            MAIN FOOTER GRID
        ====================================================== */}

        <div className="grid min-w-0 grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">

          {/* ===================================================
              BRAND
          ==================================================== */}

          <div className="min-w-0 sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex max-w-full items-center gap-2.5"
            >
              <img
                src="/logo.png"
                alt="SoloLedger"
                className="h-8 w-8 shrink-0 rounded-lg border border-white/10 bg-white/5 object-contain p-1"
              />

              <span className="truncate text-lg font-black tracking-tight text-white">
                Solo
                <span className="text-blue-500">
                  Ledger
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-md text-xs leading-6 text-slate-400">
              Precision financial tools, tax engines, and
              rate benchmarking software built specifically
              for freelancers, independent contractors, and
              solo consultants.
            </p>

            <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[11px] font-bold text-blue-400">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />

              <span className="truncate">
                100% Free · No Sign-Up
              </span>
            </div>
          </div>

          {/* ===================================================
              TOOLS
          ==================================================== */}

          <div className="min-w-0 lg:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-white">
              Tools
            </h3>

            <ul className="mt-4 space-y-2.5 text-xs font-medium">
              <FooterLink href="/">
                Rate Calculator
              </FooterLink>
              <FooterLink href="/w2-to-1099-calculator">
                W-2 vs. 1099
              </FooterLink>

              <FooterLink href="/invoice-generator">
                Invoice Maker
              </FooterLink>

              <FooterLink href="/project-pricing">
                Project Pricing
              </FooterLink>
            </ul>
          </div>

          {/* ===================================================
              TECH & CREATIVE
          ==================================================== */}

          <div className="min-w-0 lg:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-white">
              Tech & Creative
            </h3>

            <ul className="mt-4 space-y-2.5 text-xs font-medium">
              {(
                rolesByCategory[
                  "Engineering & Data"
                ] || []
              ).map((role) => (
                <RoleLink
                  key={role.key}
                  href={`/rate/${role.key}`}
                  title={`${role.shortTitle} Rates`}
                />
              ))}

              {(
                rolesByCategory[
                  "Design & Creative"
                ] || []
              ).map((role) => (
                <RoleLink
                  key={role.key}
                  href={`/rate/${role.key}`}
                  title={`${role.shortTitle} Rates`}
                />
              ))}
            </ul>
          </div>

          {/* ===================================================
              GROWTH & ADVISORY
          ==================================================== */}

          <div className="min-w-0 lg:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-white">
              Growth & Advisory
            </h3>

            <ul className="mt-4 space-y-2.5 text-xs font-medium">
              {(
                rolesByCategory[
                  "Writing & Marketing"
                ] || []
              ).map((role) => (
                <RoleLink
                  key={role.key}
                  href={`/rate/${role.key}`}
                  title={`${role.shortTitle} Rates`}
                />
              ))}

              {(
                rolesByCategory[
                  "Finance & Operations"
                ] || []
              ).map((role) => (
                <RoleLink
                  key={role.key}
                  href={`/rate/${role.key}`}
                  title={`${role.shortTitle} Rates`}
                />
              ))}
            </ul>
          </div>

          {/* ===================================================
              STACK & LEGAL
          ==================================================== */}

          <div className="min-w-0 lg:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-white">
              Stack & Legal
            </h3>

            <ul className="mt-4 space-y-2.5 text-xs font-medium">

              <AffiliateLink
                href={
                  AFFILIATE_LINKS?.freshbooks ||
                  "https://freshbooks.com"
                }
              >
                FreshBooks
              </AffiliateLink>

              <AffiliateLink
                href={
                  AFFILIATE_LINKS?.wise ||
                  "https://wise.com"
                }
              >
                Wise Business
              </AffiliateLink>

              <AffiliateLink
                href={
                  AFFILIATE_LINKS?.deel ||
                  "https://deel.com"
                }
              >
                Deel
              </AffiliateLink>

              <li className="!mt-4 border-t border-slate-800/80 pt-4">
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link
                  href="/disclaimer"
                  className="transition-colors hover:text-white"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* =====================================================
            COPYRIGHT
        ====================================================== */}

        <div className="mt-10 flex min-w-0 flex-col gap-5 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-start sm:justify-between">

          <p className="shrink-0">
            © {currentYear} SoloLedger. All rights reserved.
          </p>

          <p className="max-w-2xl text-[11px] leading-5 text-slate-500 sm:text-right">
            SoloLedger provides rate calculators, tax models,
            and comparison estimates for informational and
            planning purposes only. It is not tax, legal, or
            accounting advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* =============================================================
   ROLE LINK
============================================================= */

function RoleLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <li className="min-w-0">
      <Link
        href={href}
        title={title}
        className="block min-w-0 truncate transition-colors hover:text-white"
      >
        {title}
      </Link>
    </li>
  );
}

/* =============================================================
   FOOTER LINK
============================================================= */

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li className="min-w-0">
      <Link
        href={href}
        className="block min-w-0 truncate transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

/* =============================================================
   AFFILIATE LINK
============================================================= */

function AffiliateLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li className="min-w-0">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex max-w-full items-center gap-1 text-slate-300 transition-colors hover:text-white"
      >A
        <span className="truncate">
          {children}
        </span>

        <ExternalLink className="h-3 w-3 shrink-0 text-slate-500" />
      </a>
    </li>
  );
}