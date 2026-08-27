"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Globe2,
  X,
} from "lucide-react";

import {
  getCountryBySlug,
  CountryConfig,
} from "@/lib/countries";

interface LocationResponse {
  country?: string;
}

export function CountrySuggestion() {
  const [country, setCountry] =
    useState<CountryConfig | null>(null);

  const [dismissed, setDismissed] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const alreadyDismissed =
      window.localStorage.getItem(
        "solo-ledger-country-suggestion-dismissed"
      );

    if (alreadyDismissed === "true") {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function detectCountry() {
      try {
        const response = await fetch(
          "/api/location",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          return;
        }

        const data =
          (await response.json()) as LocationResponse;

        if (
          cancelled ||
          !data.country
        ) {
          return;
        }

        const detectedCountry =
          getCountryBySlug(
            data.country.toLowerCase()
          );

        if (detectedCountry) {
          setCountry(
            detectedCountry
          );
        }
      } catch {
        // Location detection is optional.
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    detectCountry();

    return () => {
      cancelled = true;
    };
  }, []);

  if (
    loading ||
    !country ||
    dismissed
  ) {
    return null;
  }

  function dismiss() {
    window.localStorage.setItem(
      "solo-ledger-country-suggestion-dismissed",
      "true"
    );

    setDismissed(true);
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 sm:left-auto sm:right-6 sm:max-w-md">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss country suggestion"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex gap-3 pr-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
            {country.flag}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Globe2 className="h-3.5 w-3.5 text-blue-600" />

              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-600">
                Local calculator
              </span>
            </div>

            <h3 className="mt-1 text-sm font-black text-zinc-950">
              We noticed you&apos;re in{" "}
              {country.name}!
            </h3>

            <p className="mt-1 text-xs leading-5 text-zinc-500">
              Use the SoloLedger calculator customized for your local
              currency and market assumptions.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href={`/${country.slug}/freelance-calculator`}
            onClick={() => {
              window.localStorage.setItem(
                "solo-ledger-country-suggestion-dismissed",
                "true"
              );
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-black text-white transition hover:bg-zinc-800"
          >
            Use {country.name} Calculator
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={dismiss}
            className="rounded-xl border border-zinc-200 px-4 py-2.5 text-xs font-bold text-zinc-600 transition hover:bg-zinc-50"
          >
            Stay here
          </button>
        </div>
      </div>
    </div>
  );
}