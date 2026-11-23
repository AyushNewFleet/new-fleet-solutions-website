import type { PackageOption } from './nfsData';

export interface SeoMetaVariation {
  title: string;
  description: string;
}

export const DEFAULT_SEO: SeoMetaVariation = {
  title: 'Website Design & Development Services | New Fleet Solutions',
  description:
    'Get professional website design and development services from New Fleet Solutions. Affordable single-page websites starting at $300 and multi-page websites at $600, with responsive design and on-page SEO included.',
};

export const PACKAGE_SEO_VARIATIONS: Record<PackageOption, SeoMetaVariation> = {
  'Single-Page Website ($300)': {
    title: 'Single-Page Website Design ($300) | New Fleet Solutions',
    description:
      'Launch a custom, mobile-responsive single-page website for $300 with New Fleet Solutions. Includes sections, contact form, social integration, and on-page SEO.',
  },
  'Multi-Page Website ($600)': {
    title: 'Multi-Page Business Website ($600) | New Fleet Solutions',
    description:
      'Build a complete 5-page responsive business website for $600 with New Fleet Solutions. Includes custom homepage, service pages, contact forms, and on-page SEO.',
  },
  'Custom / Consultation': {
    title: 'Custom Website & Redesign Services | New Fleet Solutions',
    description:
      'Partner with New Fleet Solutions for custom website development, website redesigns, and tailored integrations built with responsive design and on-page SEO.',
  },
};

export const SECTION_SEO_VARIATIONS: Record<string, SeoMetaVariation> = {
  '#services': {
    title: 'Custom Website Development Services | New Fleet Solutions',
    description:
      'Explore custom website design, business websites, e-commerce stores, landing pages, and website redesign services from New Fleet Solutions.',
  },
  '#websites': {
    title: '12 Types of Websites We Build | New Fleet Solutions',
    description:
      'Discover corporate, startup, e-commerce, real estate, healthcare, logistics, hospitality, educational, and consulting websites built by New Fleet Solutions.',
  },
  '#features': {
    title: 'Responsive & SEO-Ready Website Features | New Fleet Solutions',
    description:
      'Every New Fleet Solutions website includes mobile responsiveness, fast loading, contact forms, click-to-call, WhatsApp integration, SSL readiness, and analytics.',
  },
  '#seo': {
    title: 'On-Page SEO Included With Web Design | New Fleet Solutions',
    description:
      'Get custom meta titles, descriptions, clean URLs, H1-H3 structure, alt text, XML sitemaps, and robots.txt included in both $300 and $600 website packages.',
  },
  '#pricing': {
    title: 'Website Pricing: $300 Single & $600 Multi | New Fleet Solutions',
    description:
      'Compare New Fleet Solutions website packages: $300 single-page websites and $600 multi-page websites with responsive design and foundational on-page SEO.',
  },
  '#process': {
    title: '5-Step Website Design Process | New Fleet Solutions',
    description:
      'From discovery and planning to responsive development, optimization, and launch, see how New Fleet Solutions takes your website live in five clear steps.',
  },
  '#faq': {
    title: 'Website Design & Pricing FAQ | New Fleet Solutions',
    description:
      'Find answers about website pricing ($300 and $600), single-page vs multi-page options, mobile responsiveness, included on-page SEO, and custom features.',
  },
  '#contact': {
    title: 'Start Your Website Project Today | New Fleet Solutions',
    description:
      'Submit your website project inquiry or schedule a 15-minute Calendly discovery call with New Fleet Solutions to launch your business website.',
  },
};

export const WEBSITE_TYPE_SEO_VARIATIONS: Record<string, SeoMetaVariation> = {
  'Corporate & Business Websites': {
    title: 'Corporate & Business Website Design | New Fleet Solutions',
    description:
      'Establish executive credibility online with corporate and business websites engineered by New Fleet Solutions for trust, clarity, and mobile responsiveness.',
  },
  'Startup Websites': {
    title: 'Startup Website Design & Launch Pages | New Fleet Solutions',
    description:
      'Launch your startup online with focused product storytelling, responsive layouts, and lead capture starting at $300 from New Fleet Solutions.',
  },
  'E-Commerce Websites': {
    title: 'E-Commerce Website Development Services | New Fleet Solutions',
    description:
      'Sell products online with custom e-commerce websites featuring product pages, shopping cart functionality, checkout integrations, and mobile-ready UX.',
  },
  'Portfolio & Personal Websites': {
    title: 'Portfolio & Personal Website Design | New Fleet Solutions',
    description:
      'Showcase your work, credentials, and contact pathways with clean, responsive portfolio and personal websites starting at $300 from New Fleet Solutions.',
  },
  'Professional Service Websites': {
    title: 'Professional Service Website Design | New Fleet Solutions',
    description:
      'Authoritative websites for legal, accounting, engineering, and advisory firms built by New Fleet Solutions with dedicated service pages and on-page SEO.',
  },
  'Real Estate Websites': {
    title: 'Real Estate Website Design & Development | New Fleet Solutions',
    description:
      'Present property listings, neighborhood highlights, Google Maps integration, and viewing inquiry forms with New Fleet Solutions real estate websites.',
  },
  'Healthcare & Medical Websites': {
    title: 'Healthcare & Medical Website Design | New Fleet Solutions',
    description:
      'Build patient trust with accessible clinic directories, practitioner bios, and mobile-friendly appointment request forms from New Fleet Solutions.',
  },
  'Logistics & Transportation Websites': {
    title: 'Logistics & Fleet Website Development | New Fleet Solutions',
    description:
      'Highlight fleet capabilities, coverage routes, and commercial freight quote forms with responsive logistics websites built by New Fleet Solutions.',
  },
  'Restaurant & Hospitality Websites': {
    title: 'Restaurant & Hospitality Web Design | New Fleet Solutions',
    description:
      'Attract diners and guests with curated menu pages, location maps, click-to-call, and reservation forms crafted by New Fleet Solutions.',
  },
  'Educational Websites': {
    title: 'Educational Website Design Services | New Fleet Solutions',
    description:
      'Organize course catalogs, curriculum pages, faculty profiles, and admissions inquiry forms with responsive educational websites from New Fleet Solutions.',
  },
  'Agency & Consulting Websites': {
    title: 'Agency & Consulting Website Design | New Fleet Solutions',
    description:
      'Present your consulting methodology, service matrices, and discovery call funnels with modern multi-page websites from New Fleet Solutions.',
  },
  'Lead Generation Landing Pages': {
    title: 'Lead Generation Landing Page Design | New Fleet Solutions',
    description:
      'Convert paid search and social ad traffic into qualified leads with high-converting single-page landing pages starting at $300 from New Fleet Solutions.',
  },
};
