export interface RoleProfile {
  slug: string;
  title: string;
  category: string;
  defaultTakeHome: number;
  defaultExpenses: number;
  defaultBillableHours: number;
  description: string;
  toolsRecommended: string[];
}

export const ROLES_DATA: Record<string, RoleProfile> = {
  'web-developer': {
    slug: 'web-developer',
    title: 'Freelance Web Developer',
    category: 'Engineering',
    defaultTakeHome: 95000,
    defaultExpenses: 6000,
    defaultBillableHours: 25,
    description: 'Calculate target hourly and day rates for freelance frontend, backend, and full-stack software engineers.',
    toolsRecommended: ['FreshBooks', 'Wise Business', 'Deel'],
  },
  'graphic-designer': {
    slug: 'graphic-designer',
    title: 'Freelance Graphic Designer',
    category: 'Design & Creative',
    defaultTakeHome: 65000,
    defaultExpenses: 4500,
    defaultBillableHours: 22,
    description: 'Determine billable rates for freelance brand designers, UI/UX illustrators, and visual artists.',
    toolsRecommended: ['FreshBooks', 'Wise Business'],
  },
  'copywriter': {
    slug: 'copywriter',
    title: 'Freelance Copywriter & Content Strategist',
    category: 'Writing & Marketing',
    defaultTakeHome: 70000,
    defaultExpenses: 3000,
    defaultBillableHours: 20,
    description: 'Pricing calculator tailored for direct-response copywriters, technical writers, and SEO editors.',
    toolsRecommended: ['FreshBooks', 'Deel'],
  },
  'seo-specialist': {
    slug: 'seo-specialist',
    title: 'Freelance SEO Consultant',
    category: 'Writing & Marketing',
    defaultTakeHome: 85000,
    defaultExpenses: 7000,
    defaultBillableHours: 25,
    description: 'Hourly rate benchmarks for technical SEOs, programmatic consultants, and link-building freelancers.',
    toolsRecommended: ['FreshBooks', 'Wise Business'],
  },
  'video-editor': {
    slug: 'video-editor',
    title: 'Freelance Video Editor & Motion Designer',
    category: 'Design & Creative',
    defaultTakeHome: 72000,
    defaultExpenses: 8000,
    defaultBillableHours: 24,
    description: 'Rate formulas factoring in high rendering hardware expenses, software subscriptions, and project turnarounds.',
    toolsRecommended: ['FreshBooks', 'Wise Business', 'Deel'],
  },
};
