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
    category: "Engineering & Data",
    defaultTakeHome: 95000,
    defaultExpenses: 6000,
    defaultBillableHours: 25,
    defaultVacationWeeks: 4,
    defaultTaxRate: 28,
    description: "Calculate your target freelance web development hourly rate, day rate, and annual revenue based on your desired take-home income, expenses, taxes, and billable capacity.",
    longDescription: "Whether you specialize in frontend development, backend engineering, full-stack applications, or modern JavaScript frameworks, your freelance rate needs to cover more than the hours you spend writing code. This calculator accounts for taxes, software, hardware, business expenses, vacation, and the non-billable work required to run a freelance development business.",
    commonServices: [
      "Frontend development",
      "Backend development",
      "Full-stack development",
      "API development",
      "Website maintenance",
      "Performance optimization",
    ],
    pricingModels: ["Hourly", "Daily", "Fixed project", "Monthly retainer", "Technical consulting"],
    toolsRecommended: ["FreshBooks", "Wise Business", "Deel"],
    seoKeywords: ["freelance web developer hourly rate", "web developer freelance rate", "freelance developer day rate"],
  },

  "ai-consultant": {
    slug: "ai-consultant",
    title: "Freelance AI & Automation Consultant",
    shortTitle: "AI Consultant",
    category: "Engineering & Data",
    defaultTakeHome: 150000,
    defaultExpenses: 12000,
    defaultBillableHours: 20,
    defaultVacationWeeks: 4,
    defaultTaxRate: 28,
    description: "Calculate your freelance AI consulting rate, accounting for API usage, model training time, and the high-value strategic impact of automation.",
    longDescription: "AI and automation consultants command premium rates due to specialized market demand. However, you also face higher overhead costs including API usage (OpenAI, Anthropic), cloud infrastructure, and continuous learning. Because engagements require heavy discovery and technical scoping, your realistic billable hours per week are often lower than traditional development.",
    commonServices: [
      "AI workflow automation",
      "Custom LLM integrations",
      "Data pipeline engineering",
      "Prompt engineering",
      "AI tool auditing",
      "Staff AI training",
    ],
    pricingModels: ["Hourly", "Project MVP", "Fractional CAIO Retainer", "Discovery Audit"],
    toolsRecommended: ["FreshBooks", "Deel"],
    seoKeywords: ["freelance ai consultant hourly rate", "ai automation freelance rates", "fractional caio pricing", "prompt engineer day rate"],
  },

  "ui-ux-designer": {
    slug: "ui-ux-designer",
    title: "Freelance UI/UX Designer",
    shortTitle: "UI/UX Designer",
    category: "Design & Creative",
    defaultTakeHome: 95000,
    defaultExpenses: 5000,
    defaultBillableHours: 25,
    defaultVacationWeeks: 4,
    defaultTaxRate: 28,
    description: "Find a profitable freelance UI/UX and product design rate based on your desired income, software costs, and realistic billable hours.",
    longDescription: "Product design requires deep user research, wireframing, prototyping, and client presentations—much of which can easily become unbilled scope creep. A sustainable UI/UX rate must account for your research time, Figma subscriptions, user testing platforms, and the strategic value your interfaces bring to a client's bottom line.",
    commonServices: [
      "User interface (UI) design",
      "User experience (UX) research",
      "Wireframing & Prototyping",
      "Design systems",
      "Usability testing",
      "App design",
    ],
    pricingModels: ["Hourly", "Project-based", "Day rate", "Design retainer"],
    toolsRecommended: ["FreshBooks", "Wise Business"],
    seoKeywords: ["freelance ui/ux designer hourly rate", "product designer freelance rate", "how much to charge for ui design"],
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
    description: "Calculate a sustainable freelance graphic design hourly rate and project pricing based on your income goals, expenses, taxes, and actual billable hours.",
    longDescription: "Freelance designers often spend significant time on revisions, client communication, proposals, and portfolio development that cannot always be billed directly. Your rate needs to account for that time as well as design software, hardware, fonts, and other business expenses.",
    commonServices: [
      "Brand identity",
      "Logo design",
      "Marketing design",
      "Social media graphics",
      "Presentation design",
      "Print design",
    ],
    pricingModels: ["Hourly", "Project-based", "Day rate", "Package pricing"],
    toolsRecommended: ["FreshBooks", "Wise Business"],
    seoKeywords: ["freelance graphic design hourly rate", "graphic designer freelance rate"],
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
    description: "Calculate your freelance video editing and motion design rate while accounting for equipment, software, taxes, and rendering time.",
    longDescription: "Video professionals have significantly higher operating costs than many other freelancers. Workstations, cameras, massive cloud storage, editing software, asset libraries, and render times all affect your business costs. This calculator helps you price your services around sustainable annual income.",
    commonServices: [
      "Video editing",
      "Short-form video",
      "YouTube editing",
      "Motion graphics",
      "Color grading",
      "Commercial editing",
    ],
    pricingModels: ["Hourly", "Day rate", "Per video", "Project-based", "Monthly retainer"],
    toolsRecommended: ["FreshBooks", "Wise Business", "Deel"],
    seoKeywords: ["freelance video editor hourly rate", "video editor day rate", "motion designer freelance rate"],
  },

  "copywriter": {
    slug: "copywriter",
    title: "Freelance Copywriter",
    shortTitle: "Copywriter",
    category: "Writing & Marketing",
    defaultTakeHome: 70000,
    defaultExpenses: 3000,
    defaultBillableHours: 20,
    defaultVacationWeeks: 4,
    defaultTaxRate: 28,
    description: "Find a profitable freelance copywriting rate based on your desired income, taxes, business expenses, and realistic billable writing hours.",
    longDescription: "Freelance writers rarely spend every working hour producing final copy. Research, interviews, SEO research, client meetings, revisions, pitching, and editing all consume time. This calculator helps convert your income goal into a rate that reflects the entire freelance business.",
    commonServices: [
      "Website copy",
      "Sales pages",
      "Email campaigns",
      "Blog writing",
      "SEO content",
      "Technical writing",
    ],
    pricingModels: ["Hourly", "Per word", "Per article", "Project-based", "Monthly retainer"],
    toolsRecommended: ["FreshBooks", "Deel"],
    seoKeywords: ["freelance copywriter hourly rate", "freelance writer rates", "copywriter freelance pricing"],
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
    description: "Calculate your freelance SEO consulting hourly rate, day rate, and revenue target based on your desired take-home income and operating costs.",
    longDescription: "SEO consultants often invest heavily in analytics platforms, keyword research software, reporting tools, and subscriptions. Because SEO work also includes research, reporting, meetings, strategy, and client management, your billable capacity may be much lower than your total working hours.",
    commonServices: [
      "Technical SEO",
      "SEO audits",
      "Keyword research",
      "Content strategy",
      "Local SEO",
      "Link building",
    ],
    pricingModels: ["Hourly", "Day rate", "SEO audit", "Monthly retainer", "Project-based"],
    toolsRecommended: ["FreshBooks", "Wise Business"],
    seoKeywords: ["freelance SEO consultant hourly rate", "SEO consultant freelance rates"],
  },

  "fractional-cfo": {
    slug: "fractional-cfo",
    title: "Fractional CFO & Business Consultant",
    shortTitle: "Fractional CFO",
    category: "Finance & Operations",
    defaultTakeHome: 180000,
    defaultExpenses: 8500,
    defaultBillableHours: 15,
    defaultVacationWeeks: 4,
    defaultTaxRate: 30,
    description: "Calculate your fractional CFO or financial consulting rate based on the high strategic value you provide and lower billable hour capacity.",
    longDescription: "Fractional executives and management consultants operate differently than standard freelancers. Because you are context-switching between multiple high-level strategic roles across different companies, billing 40 hours a week is impossible. Your rate must reflect a lower cap on billable hours (often 15-20 max) while accounting for professional liability insurance and financial modeling tools.",
    commonServices: [
      "Financial forecasting",
      "Cash flow management",
      "Fundraising strategy",
      "Profitability analysis",
      "M&A preparation",
      "Board reporting",
    ],
    pricingModels: ["Monthly Retainer", "Day rate", "Hourly consulting", "Performance equity"],
    toolsRecommended: ["FreshBooks", "Wise Business"],
    seoKeywords: ["fractional cfo hourly rate", "freelance financial consultant rate", "how much does a fractional cfo charge"],
  }
};