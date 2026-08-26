export interface AffiliatePartner {
  id: string;
  name: string;
  category: 'Invoicing & Accounting' | 'Banking' | 'Taxes' | 'Contracts & Legal' | 'LLC Formation' | 'Payroll';
  url: string;
  description: string;
  perk: string;
  badge?: string;
}

export const AFFILIATE_LINKS: Record<string, string> = {
  // --- Invoicing, Bookkeeping & Accounting ---
  freshbooks: 'https://freshbooks.com',     // Impact / PartnerStack
  quickbooks: 'https://quickbooks.intuit.com', // CJ / Impact
  bonsai: 'https://hellobonsai.com',         // PartnerStack (Contracts + Invoices)
  
  // --- Freelance & Business Banking ---
  wise: 'https://wise.com',                 // Impact (Multi-currency payments)
  novo: 'https://banknovo.com',             // Impact (Free digital business checking)
  relay: 'https://relayfi.com',             // PartnerStack (Multiple checking accounts / Profit First)

  // --- Freelance Tax & Bookkeeping ---
  keeper: 'https://keepertax.com',           // PartnerStack (Auto-detects 1099 tax deductions)
  turbotax: 'https://turbotax.intuit.com',   // CJ (Self-Employed tax filing)

  // --- LLC Formation & Registered Agent ---
  zenbusiness: 'https://zenbusiness.com',   // Impact / ShareASale
  legalzoom: 'https://legalzoom.com',       // CJ / Impact
  northwest: 'https://northwestregisteredagent.com', // Direct affiliate

  // --- Payroll & Global Contractor Management ---
  deel: 'https://deel.com',                 // PartnerStack (Global contracts & payouts)
  gusto: 'https://gusto.com',               // PartnerStack / Impact (S-Corp & 1099 contractor payroll)
};

export const AFFILIATE_PARTNERS: Record<string, AffiliatePartner> = {
  freshbooks: {
    id: 'freshbooks',
    name: 'FreshBooks',
    category: 'Invoicing & Accounting',
    url: AFFILIATE_LINKS.freshbooks,
    description: 'Track billable hours, expense write-offs, and send professional invoices.',
    perk: '30-Day Free Trial',
    badge: 'Popular',
  },
  wise: {
    id: 'wise',
    name: 'Wise Business',
    category: 'Banking',
    url: AFFILIATE_LINKS.wise,
    description: 'Receive cross-border client payments with transparent exchange rates.',
    perk: 'Zero Hidden Fees',
    badge: 'Global',
  },
  novo: {
    id: 'novo',
    name: 'Novo Business Banking',
    category: 'Banking',
    url: AFFILIATE_LINKS.novo,
    description: 'Free FDIC-insured business checking built for freelancers and solo LLCs.',
    perk: 'Fee-Free Banking',
    badge: 'No Minimums',
  },
  keeper: {
    id: 'keeper',
    name: 'Keeper Tax',
    category: 'Taxes',
    url: AFFILIATE_LINKS.keeper,
    description: 'Automatically scan bank statements to uncover Schedule C tax deductions.',
    perk: 'Average $1,240 saved',
    badge: '1099 Tax Prep',
  },
  bonsai: {
    id: 'bonsai',
    name: 'Bonsai',
    category: 'Contracts & Legal',
    url: AFFILIATE_LINKS.bonsai,
    description: 'Vetted freelance contracts, e-signatures, client proposals, and invoicing.',
    perk: 'Free Starter Template',
  },
  gusto: {
    id: 'gusto',
    name: 'Gusto Payroll',
    category: 'Payroll',
    url: AFFILIATE_LINKS.gusto,
    description: 'Automate contractor 1099 filings and run payroll for solo S-Corporations.',
    perk: 'Free W-9 / 1099 filing',
    badge: 'S-Corp Ready',
  },
  zenbusiness: {
    id: 'zenbusiness',
    name: 'ZenBusiness',
    category: 'LLC Formation',
    url: AFFILIATE_LINKS.zenbusiness,
    description: 'Register your Single-Member LLC or obtain an official business EIN.',
    perk: '$0 + State Fee',
  },
  deel: {
    id: 'deel',
    name: 'Deel',
    category: 'Contracts & Legal',
    url: AFFILIATE_LINKS.deel,
    description: 'Generate international contractor agreements compliant in 150+ countries.',
    perk: 'Compliant W-8 / W-9',
  },
};