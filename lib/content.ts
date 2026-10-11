export interface NavLink {
  label: string;
  href: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  iconName: "languages" | "checkCircle" | "copy" | "smartphone";
}

export interface PersonaItem {
  role: string;
  scenario: string;
  badge: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "FEATURES", href: "#features" },
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export const TRUST_COURTS = [
  "Supreme Court",
  "High Courts",
  "District Courts",
  "Tribunals",
  "Legal Aid Boards",
] as const;

export const HERO_CONTENT = {
  h1Prefix: "Understand any court order in ",
  h1Highlight: "simple English.",
  lead: "Upload dense court judgments, administrative orders, or legal summons and receive an instant, accurate translation in everyday language anyone can understand.",
  ctaPrimary: "Upload for Free",
  ctaSecondary: "Watch Video",
  dropzone: {
    tiles: ["ORDER", "PDF", "NOTICE"] as const,
    title: "Drag and drop your court document.",
    subtext: "Upload a PDF of an order or judgment.",
    button: "Select File",
    footnote: "PDF up to 20 MB • 100% Confidential",
  },
};

export const SPLIT_FEATURE_CONTENT = {
  h2Prefix: "Turn ",
  h2Highlight: "any court order",
  h2Suffix: " into plain words.",
  lead: "Dense legal language shouldn't stand between you and your rights. Upload any court document, summons, or decree and get an immediate breakdown in clear, human language.",
  primaryBtn: "Try it now",
  disabledBtn: "Mobile app soon",
  points: [
    { title: "Upload a PDF in seconds.", icon: "fileUp" },
    { title: "Read it in simple English.", icon: "bookOpen" },
    { title: "Copy or download the result.", icon: "copy" },
  ] as const,
  mockup: {
    title: "Recent Orders",
    items: [
      {
        name: "High_Court_Civil_Appeal_1042.pdf",
        status: "Completed",
        time: "2 min ago",
      },
      {
        name: "District_Court_Eviction_Notice.pdf",
        status: "Completed",
        time: "15 min ago",
      },
      {
        name: "Commercial_Tribunal_Award.pdf",
        status: "Simplifying",
        time: "Just now",
      },
    ],
    progressBar: "Simplifying... 75% complete",
  },
};

export const BENEFITS_CONTENT = {
  h2Prefix: "Built to be ",
  h2Highlight: "understood.",
  lead: "Court rulings affect real lives. We remove Latin phrases, labyrinthine citations, and legalese so you know exactly where you stand.",
  cta: "Start Simplifying",
  cards: [
    {
      id: "plain-language",
      title: "Plain Language",
      description:
        "Converts archaic legalese into clear, conversational English anyone can grasp without legal training.",
      badge: "FREE",
      iconName: "languages",
    },
    {
      id: "key-facts",
      title: "Key Facts at a Glance",
      description:
        "Highlights critical dates, compliance deadlines, monetary awards, and the judge's final holding.",
      iconName: "checkCircle",
    },
    {
      id: "copy-download",
      title: "Copy and Download",
      description:
        "Export plain text summaries directly to your clipboard or download clean .txt files in a single click.",
      iconName: "copy",
    },
    {
      id: "mobile-ready",
      title: "Works on Your Phone",
      description:
        "Fully optimized for mobile browsers so you can analyze urgent summons or notices on the go.",
      badge: "FREE",
      iconName: "smartphone",
    },
  ] as BenefitItem[],
};

export const RESULT_MANAGER_CONTENT = {
  h2: "Read the result the intuitive way.",
  lead: "Get instant clarity on who sued whom, what the court ruled, and what action must be taken next. Every summary is structured logically so you never miss an essential detail.",
  cta: "Create Your First Summary",
  mockup: {
    title: "Order Summary: Delhi High Court #2024/DEL/884",
    rows: [
      { label: "Case type", value: "Civil Writ Petition (Stay Granted)", color: "#78C6EC" },
      { label: "Parties", value: "Sharma & Ors. v. Municipal Corporation", color: "#5B4FD6" },
      { label: "Acts", value: "Sec 14, 18 Public Health Act 1956", color: "#78C6EC" },
      { label: "Outcome", value: "Demolition stayed pending final hearing", color: "#4CAF6A" },
    ],
    menu: [
      { label: "Copy summary", highlighted: false },
      { label: "Download .txt", highlighted: false },
      { label: "Show original", highlighted: false },
      { label: "Simplify more", highlighted: true },
      { label: "Print", highlighted: false },
    ],
  },
};

export const KEY_FACTS_CONTENT = {
  h2Prefix: "",
  h2Circle: "Key",
  h2Suffix: " facts. Just like that.",
  codeChip: "case-summary",
  leadBeforeCode: "Our analyzer automatically extracts the core parameters into a clean ",
  leadAfterCode: " block, separating dense statutes from what actually matters.",
  cta: "Start Simplifying",
  mockup: {
    backCard: {
      title: "Here's what the order says.",
      field1: "Petitioner granted 60 days relief.",
      field2: "No penalty accrued under Sec. 42.",
    },
    frontCard: {
      heading: "Case Summary",
      caseType: "Appellate Injunction",
      parties: "Tenant v. Commercial Landlord",
      outcome: "Eviction halted for 60 days",
      plainLine: "The tenant can stay on premises while structural repairs are completed.",
      buttons: ["Copy Summary", "Download"],
    },
  },
};

export const FEATURE_TABS_CONTENT = {
  eyebrow: "FLEXIBLE MODES",
  h2: "Designed for everyone.",
  tabs: [
    {
      id: "everyone",
      label: "For everyone",
      title: "Simple clarity without law school.",
      description:
        "Designed from the ground up for individuals, families, and business owners dealing with confusing legal paperwork.",
      points: [
        "Plain-language translation in seconds",
        "No account or credit card required",
        "Runs securely right in your web browser",
        "100% confidential document processing",
      ],
    },
    {
      id: "developers",
      label: "For developers",
      title: "Programmatic document simplification.",
      description:
        "Integrate our plain-language court order parser directly into your legal research pipeline or client portal.",
      points: [
        "REST API endpoint for bulk court orders",
        "Standardized JSON case metadata extraction",
        "Webhooks for asynchronous order processing",
        "Zero retention policy for confidential legal data",
      ],
    },
  ],
};

export const HOW_IT_WORKS_CONTENT: {
  eyebrow: string;
  h2: string;
  steps: StepItem[];
} = {
  eyebrow: "HOW IT WORKS",
  h2: "Three simple steps to clarity.",
  steps: [
    {
      step: "01",
      title: "Upload Court Document",
      description:
        "Drag and drop your court order, judgment, or notice PDF. Up to 20 MB supported with zero account sign-up required.",
    },
    {
      step: "02",
      title: "Instant Simplification",
      description:
        "Our specialized AI extracts the core judgment, rewrites dense procedural legalese into everyday English, and isolates key deadlines.",
    },
    {
      step: "03",
      title: "Understand & Take Action",
      description:
        "Review the plain-English holding, copy the verified summary to your clipboard, or download a clean text file for your records.",
    },
  ],
};

export const PERSONA_CARDS_CONTENT: {
  eyebrow: string;
  h2: string;
  personas: PersonaItem[];
} = {
  eyebrow: "WHO IT HELPS",
  h2: "Clarity for all stakeholders.",
  personas: [
    {
      role: "Citizens & Petitioners",
      scenario:
        "Understand critical notice deadlines, compliance orders, and court holdings without paying high hourly fees just to decipher the paperwork.",
      badge: "Illustrative example",
    },
    {
      role: "Legal Researchers & Paralegals",
      scenario:
        "Quickly scan through dozens of 50-page appellate decrees to isolate the operative holdings, statutory citations, and procedural outcomes in seconds.",
      badge: "Illustrative example",
    },
    {
      role: "Journalists & Advocates",
      scenario:
        "Rapidly interpret newly published high court rulings on public interest litigation and report the true factual outcome to the public accurately.",
      badge: "Illustrative example",
    },
  ],
};

export const FAQ_CONTENT: {
  eyebrow: string;
  h2: string;
  items: FaqItem[];
} = {
  eyebrow: "FREQUENTLY ASKED QUESTIONS",
  h2: "Common questions, direct answers.",
  items: [
    {
      id: "faq-1",
      question: "Is this considered official legal advice?",
      answer:
        "No. Legal Aid provides automated plain-language translation for informational and educational purposes only. It is not legal counsel. You should always consult a licensed attorney for specific legal decisions or representation.",
    },
    {
      id: "faq-2",
      question: "What types of court documents are supported?",
      answer:
        "You can upload judgments, interim orders, summons, eviction notices, and tribunal rulings in standard PDF format up to 20 MB. Our models recognize both civil and criminal procedural formats.",
    },
    {
      id: "faq-3",
      question: "Is my uploaded document private and secure?",
      answer:
        "Yes, absolutely. We operate under a strict ephemeral processing model. Your uploaded documents are analyzed in memory and immediately discarded. We never store, resell, or train public AI models on your files.",
    },
    {
      id: "faq-4",
      question: "Is there any cost to use Legal Aid?",
      answer:
        "Legal Aid is completely free to use. There are no subscriptions, paywalls, or credit card requirements. Anyone with a web browser can simplify court documents instantly.",
    },
    {
      id: "faq-5",
      question: "How does it handle archaic Latin maxims and complex statutes?",
      answer:
        "Our engine is specially prompted to unpack common Latin legal doctrine (such as prima facie, certiorari, res judicata) and long statutory references into direct, conversational English explanations.",
    },
  ],
};

export const FINAL_CTA_CONTENT = {
  h2: "Simplify your first document.",
  subtitle:
    "Upload any court order or judgment PDF and see the difference plain English makes in under ten seconds.",
  button: "Select File →",
};

export const FOOTER_CONTENT = {
  brand: "Legal Aid",
  tagline: "Translating court documents into plain English everyone can understand.",
  productLinks: [
    { label: "Analyze Document", href: "/analyze" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Supported Courts", href: "#" },
  ],
  resourceLinks: [
    { label: "FAQ", href: "#faq" },
    { label: "Legal Glossary", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  legalNotice:
    "Legal Aid is a text-simplification tool for informational purposes only. It does not provide legal advice, legal representation, or establish an attorney-client relationship.",
  copyright: `© ${new Date().getFullYear()} Legal Aid. All rights reserved.`,
  disclaimer: "For information only. Not legal advice.",
};
