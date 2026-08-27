export interface CountryConfig {
  slug: string;
  code: string;
  name: string;
  flag: string;

  currency: string;
  currencySymbol: string;
  locale: string;

  /**
   * Starting effective tax-rate assumption.
   * This is NOT an official tax calculation.
   */
  defaultTaxRate: number;

  /**
   * Relative cost-of-living index.
   * 100 = baseline.
   *
   * This is used as a pricing-market adjustment,
   * not as a tax calculation.
   */
  costOfLivingIndex: number;

  seo: {
    title: string;
    description: string;
  };
}

export const COUNTRIES: Record<string, CountryConfig> = {
  us: {
    slug: "us",
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    currency: "USD",
    currencySymbol: "$",
    locale: "en-US",
    defaultTaxRate: 28,
    costOfLivingIndex: 100,
    seo: {
      title: "Freelance Rate Calculator USA | SoloLedger",
      description:
        "Calculate the freelance hourly rate, monthly revenue, and annual income you need to reach your take-home goal in the United States.",
    },
  },

  ca: {
    slug: "ca",
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    currencySymbol: "CA$",
    locale: "en-CA",
    defaultTaxRate: 30,
    costOfLivingIndex: 85,
    seo: {
      title: "Freelance Rate Calculator Canada | SoloLedger",
      description:
        "Calculate the freelance hourly rate, monthly revenue, and annual income you need to reach your take-home goal in Canada.",
    },
  },

  uk: {
    slug: "uk",
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    currencySymbol: "£",
    locale: "en-GB",
    defaultTaxRate: 25,
    costOfLivingIndex: 80,
    seo: {
      title: "Freelance Rate Calculator UK | SoloLedger",
      description:
        "Calculate the freelance hourly rate, monthly revenue, and annual income you need to reach your take-home goal in the United Kingdom.",
    },
  },

  au: {
    slug: "au",
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    currency: "AUD",
    currencySymbol: "A$",
    locale: "en-AU",
    defaultTaxRate: 27,
    costOfLivingIndex: 85,
    seo: {
      title: "Freelance Rate Calculator Australia | SoloLedger",
      description:
        "Calculate the freelance hourly rate, monthly revenue, and annual income you need to reach your take-home goal in Australia.",
    },
  },

  nz: {
    slug: "nz",
    code: "NZ",
    name: "New Zealand",
    flag: "🇳🇿",
    currency: "NZD",
    currencySymbol: "NZ$",
    locale: "en-NZ",
    defaultTaxRate: 25,
    costOfLivingIndex: 80,
    seo: {
      title: "Freelance Rate Calculator New Zealand | SoloLedger",
      description:
        "Calculate the freelance hourly rate, monthly revenue, and annual income you need to reach your take-home goal in New Zealand.",
    },
  },

  de: {
    slug: "de",
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    currency: "EUR",
    currencySymbol: "€",
    locale: "de-DE",
    defaultTaxRate: 30,
    costOfLivingIndex: 75,
    seo: {
      title: "Freelance Rate Calculator Germany | SoloLedger",
      description:
        "Calculate the freelance hourly rate, monthly revenue, and annual income you need to reach your take-home goal in Germany.",
    },
  },

  fr: {
    slug: "fr",
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    currency: "EUR",
    currencySymbol: "€",
    locale: "fr-FR",
    defaultTaxRate: 30,
    costOfLivingIndex: 75,
    seo: {
      title: "Freelance Rate Calculator France | SoloLedger",
      description:
        "Calculate the freelance hourly rate, monthly revenue, and annual income you need to reach your take-home goal in France.",
    },
  },
};

export const DEFAULT_COUNTRY = COUNTRIES.us;

export function getCountryBySlug(
  slug: string
): CountryConfig | null {
  return COUNTRIES[slug.toLowerCase()] ?? null;
}

export function getCountrySlugs(): string[] {
  return Object.keys(COUNTRIES);
}