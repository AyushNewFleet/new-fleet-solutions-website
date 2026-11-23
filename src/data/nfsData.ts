export type PackageOption = 'Single-Page Website ($300)' | 'Multi-Page Website ($600)' | 'Custom / Consultation';

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: 'ShieldCheck' | 'Globe' | 'TrendingUp';
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  iconName: 'Palette' | 'Code2' | 'Building2' | 'ShoppingBag' | 'Target' | 'RefreshCw';
}

export interface WebsiteTypeItem {
  id: string;
  title: string;
  category: 'Business & Consulting' | 'Commerce & Growth' | 'Specialized Industries';
  description: string;
  accentColor: string;
  surfaceTint: string;
  layoutVariant:
    | 'corporate'
    | 'startup'
    | 'ecommerce'
    | 'portfolio'
    | 'professional'
    | 'realestate'
    | 'healthcare'
    | 'logistics'
    | 'hospitality'
    | 'education'
    | 'consulting'
    | 'leadgen';
}

export interface AdvantageItem {
  number: string;
  title: string;
  description: string;
}

export interface FeatureItem {
  title: string;
  detail: string;
  iconName:
    | 'MonitorSmartphone'
    | 'Layout'
    | 'Zap'
    | 'Sparkles'
    | 'Compass'
    | 'Mail'
    | 'PhoneCall'
    | 'MessageCircle'
    | 'Share2'
    | 'MapPin'
    | 'Lock'
    | 'Globe2'
    | 'BarChart3'
    | 'Shield'
    | 'FileEdit'
    | 'ClipboardCheck';
}

export interface ComparisonRow {
  feature: string;
  singlePage: string;
  multiPage: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const BENEFITS: BenefitItem[] = [
  {
    id: 'credibility',
    title: 'Build Credibility',
    description: 'Create a strong first impression with a professional online presence.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'reach',
    title: 'Reach More Customers',
    description: 'Make your business accessible across devices and locations.',
    iconName: 'Globe',
  },
  {
    id: 'grow',
    title: 'Grow Your Business',
    description:
      'Turn website visitors into potential customers through strategic design and clear calls to action.',
    iconName: 'TrendingUp',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Custom Website Design',
    description:
      'Unique website layouts tailored to your brand, audience, and business goals.',
    iconName: 'Palette',
  },
  {
    number: '02',
    title: 'Website Development',
    description:
      'Modern, functional, and scalable websites built using suitable web technologies.',
    iconName: 'Code2',
  },
  {
    number: '03',
    title: 'Business Websites',
    description:
      'Professional websites for companies looking to establish credibility and attract customers.',
    iconName: 'Building2',
  },
  {
    number: '04',
    title: 'E-Commerce Websites',
    description:
      'Online stores with product pages, shopping cart functionality, and checkout integrations.',
    iconName: 'ShoppingBag',
  },
  {
    number: '05',
    title: 'Landing Page Development',
    description:
      'High-converting landing pages designed for advertising campaigns, lead generation, and promotions.',
    iconName: 'Target',
  },
  {
    number: '06',
    title: 'Website Redesign',
    description:
      'Transform outdated websites into modern, responsive, and user-friendly experiences.',
    iconName: 'RefreshCw',
  },
];

export const WEBSITE_TYPES: WebsiteTypeItem[] = [
  {
    id: 'corporate-business',
    title: 'Corporate & Business Websites',
    category: 'Business & Consulting',
    description:
      'Structured executive web presence engineered to communicate company capabilities and trust.',
    accentColor: '#1B1A66',
    surfaceTint: '#F3F5FC',
    layoutVariant: 'corporate',
  },
  {
    id: 'startup',
    title: 'Startup Websites',
    category: 'Commerce & Growth',
    description:
      'Focused product storytelling, early-adopter capture, and crisp feature hierarchy for new ventures.',
    accentColor: '#4F46E5',
    surfaceTint: '#EEF2FF',
    layoutVariant: 'startup',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Websites',
    category: 'Commerce & Growth',
    description:
      'Conversion-ready product catalogs, cart flows, and streamlined online checkout experiences.',
    accentColor: '#0F766E',
    surfaceTint: '#F0FDFA',
    layoutVariant: 'ecommerce',
  },
  {
    id: 'portfolio-personal',
    title: 'Portfolio & Personal Websites',
    category: 'Business & Consulting',
    description:
      'Editorial showcases highlighting selected case studies, credentials, and direct client inquiries.',
    accentColor: '#1E293B',
    surfaceTint: '#F8FAFC',
    layoutVariant: 'portfolio',
  },
  {
    id: 'professional-service',
    title: 'Professional Service Websites',
    category: 'Business & Consulting',
    description:
      'Authoritative digital presence for legal, accounting, engineering, and financial practices.',
    accentColor: '#1B1A66',
    surfaceTint: '#F3F5FC',
    layoutVariant: 'professional',
  },
  {
    id: 'real-estate',
    title: 'Real Estate Websites',
    category: 'Specialized Industries',
    description:
      'Property showcase grids, neighborhood highlights, and instant tour booking lead capture.',
    accentColor: '#9A3412',
    surfaceTint: '#FFF7ED',
    layoutVariant: 'realestate',
  },
  {
    id: 'healthcare-medical',
    title: 'Healthcare & Medical Websites',
    category: 'Specialized Industries',
    description:
      'Accessible clinic directories, practitioner bios, and patient appointment request pathways.',
    accentColor: '#0369A1',
    surfaceTint: '#F0F9FF',
    layoutVariant: 'healthcare',
  },
  {
    id: 'logistics-transportation',
    title: 'Logistics & Transportation Websites',
    category: 'Specialized Industries',
    description:
      'Fleet capability pages, route coverage summaries, and commercial freight quote forms.',
    accentColor: '#1D4ED8',
    surfaceTint: '#EFF6FF',
    layoutVariant: 'logistics',
  },
  {
    id: 'restaurant-hospitality',
    title: 'Restaurant & Hospitality Websites',
    category: 'Specialized Industries',
    description:
      'Curated menu displays, dining atmosphere previews, location maps, and table reservations.',
    accentColor: '#9F1239',
    surfaceTint: '#FFF1F2',
    layoutVariant: 'hospitality',
  },
  {
    id: 'educational',
    title: 'Educational Websites',
    category: 'Specialized Industries',
    description:
      'Course catalogs, program outlines, faculty profiles, and streamlined admissions inquiries.',
    accentColor: '#4338CA',
    surfaceTint: '#EEF2FF',
    layoutVariant: 'education',
  },
  {
    id: 'agency-consulting',
    title: 'Agency & Consulting Websites',
    category: 'Business & Consulting',
    description:
      'Service matrices, methodology breakdowns, and discovery call funnels for advisory firms.',
    accentColor: '#10152C',
    surfaceTint: '#F5F6FA',
    layoutVariant: 'consulting',
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation Landing Pages',
    category: 'Commerce & Growth',
    description:
      'Single-objective campaign pages engineered for paid search, social ads, and rapid form fills.',
    accentColor: '#6B78E8',
    surfaceTint: '#F3F5FC',
    layoutVariant: 'leadgen',
  },
];

export const ADVANTAGES: AdvantageItem[] = [
  {
    number: '01',
    title: 'Business-Focused Approach',
    description:
      'We understand your business goals and design websites around your requirements.',
  },
  {
    number: '02',
    title: 'Modern & Professional Design',
    description:
      'Clean, attractive, and engaging website experiences that represent your brand.',
  },
  {
    number: '03',
    title: 'Mobile-First Development',
    description:
      'Websites designed to work seamlessly across desktops, tablets, and smartphones.',
  },
  {
    number: '04',
    title: 'SEO-Ready Structure',
    description:
      'Search-engine-friendly website architecture and on-page SEO foundations.',
  },
  {
    number: '05',
    title: 'Affordable Pricing',
    description:
      'Professional website development packages designed to deliver value without unnecessary costs.',
  },
  {
    number: '06',
    title: 'Dedicated Support',
    description:
      'A reliable team to assist with your website development requirements and project coordination.',
  },
];

export const WEBSITE_FEATURES: FeatureItem[] = [
  {
    title: 'Fully Responsive Design',
    detail: 'Fluid grid architecture tested across desktop, tablet, and smartphone viewports.',
    iconName: 'MonitorSmartphone',
  },
  {
    title: 'Modern UI/UX',
    detail: 'Intuitive user journeys with clear typographic hierarchy and scannable sections.',
    iconName: 'Layout',
  },
  {
    title: 'Fast-Loading Pages',
    detail: 'Clean semantic markup and optimized assets for snappy page transitions.',
    iconName: 'Zap',
  },
  {
    title: 'Custom Branding & Design',
    detail: 'Cohesive color palettes, typography, and visual framing matched to your brand.',
    iconName: 'Sparkles',
  },
  {
    title: 'User-Friendly Navigation',
    detail: 'Predictable menus and anchor structure so visitors find answers quickly.',
    iconName: 'Compass',
  },
  {
    title: 'Contact Forms',
    detail: 'Validated inquiry forms routed directly to your business inbox.',
    iconName: 'Mail',
  },
  {
    title: 'Click-to-Call Integration',
    detail: 'One-tap mobile phone links to convert urgent prospects into immediate calls.',
    iconName: 'PhoneCall',
  },
  {
    title: 'WhatsApp Integration',
    detail: 'Direct messaging shortcuts for instant customer conversations.',
    iconName: 'MessageCircle',
  },
  {
    title: 'Social Media Integration',
    detail: 'Consistent brand links connecting LinkedIn, Instagram, Facebook, and X profiles.',
    iconName: 'Share2',
  },
  {
    title: 'Google Maps Integration',
    detail: 'Interactive location embeds and direction links for local business visits.',
    iconName: 'MapPin',
  },
  {
    title: 'SSL-Ready Configuration',
    detail: 'HTTPS-ready deployment setup to protect visitor data and build browser trust.',
    iconName: 'Lock',
  },
  {
    title: 'Cross-Browser Compatibility',
    detail: 'Consistent rendering across Chrome, Safari, Edge, and Firefox.',
    iconName: 'Globe2',
  },
  {
    title: 'Analytics Integration',
    detail: 'Ready for Google Analytics and Search Console tracking hooks.',
    iconName: 'BarChart3',
  },
  {
    title: 'Website Security Best Practices',
    detail: 'Clean dependency hygiene, sanitized inputs, and hardened form endpoints.',
    iconName: 'Shield',
  },
  {
    title: 'Easy Content Management (where applicable)',
    detail: 'Cleanly organized sections for straightforward copy and media updates.',
    iconName: 'FileEdit',
  },
  {
    title: 'Lead Generation Forms',
    detail: 'Conversion-focused quote and consultation forms positioned at key decision points.',
    iconName: 'ClipboardCheck',
  },
];

export const ON_PAGE_SEO_ITEMS: string[] = [
  'SEO-Friendly URL Structure',
  'Custom Meta Titles',
  'Meta Descriptions',
  'Heading Tag Optimization (H1, H2, H3)',
  'Image Alt Text Optimization',
  'Image Compression',
  'Keyword Placement (based on supplied target keywords)',
  'Internal Linking Structure',
  'XML Sitemap Setup',
  'Robots.txt Configuration',
  'Canonical Tags (where applicable)',
  'Mobile-Friendly Optimization',
  'Image and Content Optimization',
  'Basic Technical SEO Checks',
];

export const SINGLE_PAGE_FEATURES: string[] = [
  'One professionally designed page.',
  'Multiple content sections.',
  'Business introduction.',
  'Services overview.',
  'About section.',
  'Contact information.',
  'Contact form.',
  'Mobile-responsive design.',
  'Basic on-page SEO.',
  'Social media integration.',
  'Clear CTA sections.',
];

export const MULTI_PAGE_FEATURES: string[] = [
  'Up to 5 standard pages.',
  'Custom homepage design.',
  'About Us page.',
  'Services page.',
  'Contact Us page.',
  'One additional standard page.',
  'Dedicated content sections.',
  'Mobile-responsive design.',
  'Basic on-page SEO for included pages.',
  'Contact forms.',
  'Social media integration.',
  'Easy navigation.',
  'Clear CTA sections.',
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'Website Price', singlePage: '$300', multiPage: '$600' },
  { feature: 'Website Pages', singlePage: '1', multiPage: 'Up to 5' },
  { feature: 'Custom Design', singlePage: 'Yes', multiPage: 'Yes' },
  { feature: 'Mobile Responsive', singlePage: 'Yes', multiPage: 'Yes' },
  { feature: 'On-Page SEO', singlePage: 'Included', multiPage: 'Included' },
  { feature: 'Contact Form', singlePage: 'Included', multiPage: 'Included' },
  { feature: 'Social Integration', singlePage: 'Included', multiPage: 'Included' },
  { feature: 'Dedicated Service Pages', singlePage: 'No', multiPage: 'Yes' },
  { feature: 'Multi-Level Navigation', singlePage: 'No', multiPage: 'Yes' },
  { feature: 'Suitable For', singlePage: 'Small Businesses', multiPage: 'Growing Businesses' },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery',
    description:
      'We understand your business, goals, audience, and website requirements.',
  },
  {
    step: '02',
    title: 'Planning & Design',
    description:
      'We plan the website structure and create a design aligned with your brand.',
  },
  {
    step: '03',
    title: 'Development',
    description:
      'Our team builds your website with responsive layouts and required functionality.',
  },
  {
    step: '04',
    title: 'Review & Optimization',
    description:
      'We review the website, implement feedback, and check responsiveness and SEO foundations.',
  },
  {
    step: '05',
    title: 'Launch',
    description:
      'After final approval, we assist with publishing your website on the agreed hosting environment.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How much does a website cost?',
    answer:
      'Single-page websites start at $300, while multi-page websites start at $600.',
  },
  {
    question: 'What is the difference between a single-page and multi-page website?',
    answer:
      'A single-page website presents all major information on one scrolling page, while a multi-page website separates content into dedicated pages.',
  },
  {
    question: 'Are websites mobile-friendly?',
    answer: 'Yes. Both packages include responsive website design.',
  },
  {
    question: 'Is SEO included?',
    answer: 'Yes. Basic on-page SEO setup is included in both packages.',
  },
  {
    question: 'Can I request custom website features?',
    answer: 'Yes. Additional functionality can be discussed and quoted separately.',
  },
  {
    question: 'Do you provide website redesign services?',
    answer: 'Yes. We can modernize and redesign existing websites.',
  },
  {
    question: 'Do you provide domain and hosting?',
    answer:
      'Domain registration and hosting can be arranged separately, depending on the project requirements.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Contact our team, share your requirements, and we will help you select the right package.',
  },
];
