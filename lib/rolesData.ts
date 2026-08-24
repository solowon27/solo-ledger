export interface RoleProfile {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;

  defaultTakeHome: number;
  defaultExpenses: number;
  defaultBillableHours: number;
  defaultVacationWeeks: number;
  defaultTaxRate: number;

  description: string;
  longDescription: string;

  commonServices: string[];
  pricingModels: string[];

  toolsRecommended: string[];

  seoKeywords: string[];
}

export const ROLES_DATA: Record<string, RoleProfile> = {
  "web-developer": {
    slug: "web-developer",
    title: "Freelance Web Developer",
    shortTitle: "Web Developer",
    category: "Engineering",

    defaultTakeHome: 95000,
    defaultExpenses: 6000,
    defaultBillableHours: 25,
    defaultVacationWeeks: 4,
    defaultTaxRate: 28,

    description:
      "Calculate your target freelance web development hourly rate, day rate, and annual revenue based on your desired take-home income, expenses, taxes, and billable capacity.",

    longDescription:
      "Whether you specialize in frontend development, backend engineering, full-stack applications, WordPress, or modern JavaScript frameworks, your freelance rate needs to cover more than the hours you spend writing code. This calculator accounts for taxes, software, hardware, business expenses, vacation, and the non-billable work required to run a freelance development business.",

    commonServices: [
      "Frontend development",
      "Backend development",
      "Full-stack development",
      "WordPress development",
      "API development",
      "Website maintenance",
      "Technical consulting",
      "Performance optimization",
    ],

    pricingModels: [
      "Hourly",
      "Daily",
      "Fixed project",
      "Monthly retainer",
      "Technical consulting",
    ],

    toolsRecommended: [
      "FreshBooks",
      "Wise Business",
      "Deel",
    ],

    seoKeywords: [
      "freelance web developer hourly rate",
      "web developer freelance rate",
      "freelance developer day rate",
      "freelance web developer salary",
      "how much should a freelance web developer charge",
    ],
  },

  "graphic-designer": {
    slug: "graphic-designer",
    title: "Freelance Graphic Designer",
    shortTitle: "Graphic Designer",
    category: "Design & Creative",

    defaultTakeHome: 65000,
    defaultExpenses: 4500,
    defaultBillableHours: 22,
    defaultVacationWeeks: 4,
    defaultTaxRate: 28,

    description:
      "Calculate a sustainable freelance graphic design hourly rate and project pricing based on your income goals, expenses, taxes, and actual billable hours.",

    longDescription:
      "Freelance designers often spend significant time on revisions, client communication, proposals, research, administration, and portfolio development that cannot always be billed directly. Your rate needs to account for that time as well as design software, hardware, fonts, stock assets, insurance, and other business expenses.",

    commonServices: [
      "Brand identity",
      "Logo design",
      "UI design",
      "Marketing design",
      "Social media graphics",
      "Presentation design",
      "Print design",
      "Illustration",
    ],

    pricingModels: [
      "Hourly",
      "Project-based",
      "Day rate",
      "Design retainer",
      "Package pricing",
    ],

    toolsRecommended: [
      "FreshBooks",
      "Wise Business",
    ],

    seoKeywords: [
      "freelance graphic design hourly rate",
      "graphic designer freelance rate",
      "freelance designer day rate",
      "how much should a freelance graphic designer charge",
      "freelance graphic designer pricing",
    ],
  },

  "copywriter": {
    slug: "copywriter",
    title: "Freelance Copywriter & Content Strategist",
    shortTitle: "Copywriter",
    category: "Writing & Marketing",

    defaultTakeHome: 70000,
    defaultExpenses: 3000,
    defaultBillableHours: 20,
    defaultVacationWeeks: 4,
    defaultTaxRate: 28,

    description:
      "Find a profitable freelance copywriting rate based on your desired income, taxes, business expenses, and realistic billable writing hours.",

    longDescription:
      "Freelance writers rarely spend every working hour producing final copy. Research, interviews, SEO research, client meetings, revisions, pitching, editing, and project management all consume time. This calculator helps convert your income goal into a rate that reflects the entire freelance business.",

    commonServices: [
      "Website copy",
      "Sales pages",
      "Email campaigns",
      "Blog writing",
      "SEO content",
      "Technical writing",
      "Product descriptions",
      "Content strategy",
    ],

    pricingModels: [
      "Hourly",
      "Per word",
      "Per article",
      "Project-based",
      "Monthly retainer",
    ],

    toolsRecommended: [
      "FreshBooks",
      "Deel",
    ],

    seoKeywords: [
      "freelance copywriter hourly rate",
      "freelance writer rates",
      "copywriter freelance pricing",
      "freelance content writer hourly rate",
      "how much should a freelance copywriter charge",
    ],
  },

  "seo-specialist": {
    slug: "seo-specialist",
    title: "Freelance SEO Consultant",
    shortTitle: "SEO Specialist",
    category: "Writing & Marketing",

    defaultTakeHome: 85000,
    defaultExpenses: 7000,
    defaultBillableHours: 25,
    defaultVacationWeeks: 4,
    defaultTaxRate: 28,

    description:
      "Calculate your freelance SEO consulting hourly rate, day rate, and revenue target based on your desired take-home income and operating costs.",

    longDescription:
      "SEO consultants often invest heavily in analytics platforms, keyword research software, reporting tools, AI tools, subscriptions, and other services. Because SEO work also includes research, reporting, meetings, strategy, and client management, your billable capacity may be much lower than your total working hours.",

    commonServices: [
      "Technical SEO",
      "SEO audits",
      "Keyword research",
      "Content strategy",
      "Local SEO",
      "Programmatic SEO",
      "Link building",
      "SEO consulting",
    ],

    pricingModels: [
      "Hourly",
      "Day rate",
      "SEO audit",
      "Monthly retainer",
      "Project-based",
    ],

    toolsRecommended: [
      "FreshBooks",
      "Wise Business",
    ],

    seoKeywords: [
      "freelance SEO consultant hourly rate",
      "SEO consultant freelance rates",
      "freelance SEO pricing",
      "SEO consultant day rate",
      "how much should an SEO consultant charge",
    ],
  },

  "video-editor": {
    slug: "video-editor",
    title: "Freelance Video Editor & Motion Designer",
    shortTitle: "Video Editor",
    category: "Design & Creative",

    defaultTakeHome: 72000,
    defaultExpenses: 8000,
    defaultBillableHours: 24,
    defaultVacationWeeks: 4,
    defaultTaxRate: 28,

    description:
      "Calculate your freelance video editing and motion design rate while accounting for equipment, software, taxes, vacation, and non-billable production time.",

    longDescription:
      "Video professionals can have significantly higher operating costs than many other freelancers. Workstations, cameras, storage, editing software, plugins, rendering, asset libraries, and project management all affect your actual business costs. This calculator helps you price your services around sustainable annual income rather than simply copying an hourly market rate.",

    commonServices: [
      "Video editing",
      "Short-form video",
      "YouTube editing",
      "Motion graphics",
      "Color grading",
      "Commercial editing",
      "Social media video",
      "Animation",
    ],

    pricingModels: [
      "Hourly",
      "Day rate",
      "Per video",
      "Project-based",
      "Monthly retainer",
    ],

    toolsRecommended: [
      "FreshBooks",
      "Wise Business",
      "Deel",
    ],

    seoKeywords: [
      "freelance video editor hourly rate",
      "freelance video editing rates",
      "video editor day rate",
      "motion designer freelance rate",
      "how much should a freelance video editor charge",
    ],
  },
};