import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Calculator } from "@/components/Calculator";
import {
  getCountryBySlug,
  getCountrySlugs,
} from "@/lib/countries";

interface CountryPageProps {
  params: Promise<{
    country: string;
  }>;
}

export function generateStaticParams() {
  return getCountrySlugs().map((country) => ({
    country,
  }));
}

export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const { country: slug } = await params;

  const country = getCountryBySlug(slug);

  if (!country) {
    return {};
  }

  return {
    title: country.seo.title,
    description: country.seo.description,
    alternates: {
      canonical: `/${country.slug}/freelance-calculator`,
    },
    openGraph: {
      title: country.seo.title,
      description: country.seo.description,
      type: "website",
    },
  };
}

export default async function CountryCalculatorPage({
  params,
}: CountryPageProps) {
  const { country: slug } = await params;

  const country = getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Calculator country={country} />
      </div>
    </main>
  );
}