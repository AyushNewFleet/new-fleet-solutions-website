import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Code2,
  Compass,
  Eye,
  Globe,
  GraduationCap,
  HeartPulse,
  Home,
  Laptop,
  Layers,
  MapPin,
  Palette,
  RefreshCw,
  Rocket,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  Utensils,
  X,
} from 'lucide-react';
import {
  BENEFITS,
  SERVICES,
  WEBSITE_TYPES,
  type WebsiteTypeItem,
} from '../data/nfsData';

interface ServicesAndTypesProps {
  onSelectWebsiteType: (websiteType: string) => void;
}

const BENEFIT_ICONS = {
  ShieldCheck,
  Globe,
  TrendingUp,
};

const SERVICE_ICONS = {
  Palette,
  Code2,
  Building2,
  ShoppingBag,
  Target,
  RefreshCw,
};

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

const MOCKUP_DOMAINS: Record<WebsiteTypeItem['layoutVariant'], string> = {
  corporate: 'apexindustrial.com',
  startup: 'launchflow.io',
  ecommerce: 'moderncart.co',
  portfolio: 'marcusreed.design',
  professional: 'vanguardlegal.com',
  realestate: 'harborhomes.com',
  healthcare: 'clearviewclinic.com',
  logistics: 'northstarfreight.com',
  hospitality: 'bistrotable.com',
  education: 'summitacademy.edu',
  consulting: 'meridiangrowth.co',
  leadgen: 'fastquote-hq.com',
};

const RECOMMENDED_SECTIONS: Record<
  WebsiteTypeItem['layoutVariant'],
  {
    pages: string;
    shortPages: string;
    packageFit: string;
    shortPackage: string;
    heroHeadline: string;
    heroSubhead: string;
    ctaLabel: string;
    highlights: string[];
  }
> = {
  corporate: {
    pages: 'Home · About · Solutions · Leadership · Contact',
    shortPages: 'Home · About · Solutions · Contact',
    packageFit: 'Multi-Page Website ($600)',
    shortPackage: 'Multi-Page ($600)',
    heroHeadline: 'Enterprise Infrastructure Built for Scale',
    heroSubhead: 'Proven industrial engineering, ISO-certified delivery, and multi-region operations.',
    ctaLabel: 'Explore Solutions',
    highlights: [
      'Executive capability overview',
      'Trust credentials & metrics',
      'Direct business inquiry routing',
    ],
  },
  startup: {
    pages: 'Single Scrolling Launch Page or 5-Page Product Site',
    shortPages: 'Hero · Product Demo · Pricing · Waitlist',
    packageFit: 'Single-Page ($300) or Multi-Page ($600)',
    shortPackage: 'Single ($300) / Multi ($600)',
    heroHeadline: 'Ship Team Workflows 3x Faster',
    heroSubhead: 'Automate handoffs, track sprint velocity, and launch with live analytics.',
    ctaLabel: 'Start Free Trial',
    highlights: [
      'Clear product value proposition',
      'Interactive feature showcase',
      'Waitlist & demo capture form',
    ],
  },
  ecommerce: {
    pages: 'Home · Shop Catalog · Product Detail · Cart · Contact',
    shortPages: 'Shop · Collections · Cart · Checkout',
    packageFit: 'Multi-Page Website ($600) + Store Integrations',
    shortPackage: 'Multi-Page ($600) + Store',
    heroHeadline: 'Curated Workspace Essentials',
    heroSubhead: 'Thoughtfully crafted studio lighting, leather carry, and acoustic desk hardware.',
    ctaLabel: 'Shop Collection',
    highlights: [
      'Structured product showcase',
      'Cart & checkout flow readiness',
      'Mobile shopping optimization',
    ],
  },
  portfolio: {
    pages: 'Hero Intro · Selected Works · Bio · Testimonials · Contact',
    shortPages: 'Works · Case Studies · Bio · Contact',
    packageFit: 'Single-Page Website ($300)',
    shortPackage: 'Single-Page ($300)',
    heroHeadline: 'Brand Systems & Digital Products',
    heroSubhead: 'Independent creative direction and interface design for B2B technology teams.',
    ctaLabel: 'View Case Studies',
    highlights: [
      'Visual case study grid',
      'Clean typographic hierarchy',
      'Direct client booking form',
    ],
  },
  professional: {
    pages: 'Home · Practice Areas · Team · Insights · Consultation',
    shortPages: 'Practice Areas · Attorneys · Contact',
    packageFit: 'Multi-Page Website ($600)',
    shortPackage: 'Multi-Page ($600)',
    heroHeadline: 'Trusted Corporate Legal & Tax Counsel',
    heroSubhead: 'Decades of regulatory advisory, M&A structuring, and commercial compliance support.',
    ctaLabel: 'Book Consultation',
    highlights: [
      'Authoritative service breakdown',
      'Compliance & credentials framing',
      'Click-to-call & consultation form',
    ],
  },
  realestate: {
    pages: 'Home · Featured Listings · Neighborhoods · About · Contact',
    shortPages: 'Listings · Neighborhoods · Map · Tours',
    packageFit: 'Multi-Page Website ($600)',
    shortPackage: 'Multi-Page ($600)',
    heroHeadline: 'Find Signature Waterfront Homes',
    heroSubhead: 'Verified residential listings, architectural walkthroughs, and local advisor tours.',
    ctaLabel: 'Browse Listings',
    highlights: [
      'Property card & spec grid',
      'Google Maps location integration',
      'Instant viewing request form',
    ],
  },
  healthcare: {
    pages: 'Home · Services · Doctors · Patient Info · Appointments',
    shortPages: 'Care Services · Doctors · Booking',
    packageFit: 'Multi-Page Website ($600)',
    shortPackage: 'Multi-Page ($600)',
    heroHeadline: 'Patient-First Primary & Specialty Care',
    heroSubhead: 'Same-week clinic appointments, board-certified physicians, and transparent care.',
    ctaLabel: 'Book Appointment',
    highlights: [
      'Accessible clinic navigation',
      'Practitioner & hours directory',
      'Patient appointment request form',
    ],
  },
  logistics: {
    pages: 'Home · Fleet & Capabilities · Coverage · Safety · Quote',
    shortPages: 'Fleet · Lanes · Tracking · Freight Quote',
    packageFit: 'Multi-Page Website ($600)',
    shortPackage: 'Multi-Page ($600)',
    heroHeadline: 'Nationwide Freight & Fleet Dispatch',
    heroSubhead: 'Dedicated regional corridors, temperature-controlled haulage, and 99.4% on-time delivery.',
    ctaLabel: 'Request Rate Quote',
    highlights: [
      'Fleet & lane coverage presentation',
      'Fast freight quote request flow',
      'Mobile-ready dispatch contact',
    ],
  },
  hospitality: {
    pages: 'Home · Menu Highlights · Gallery · Hours & Map · Reserve',
    shortPages: 'Menu · Private Dining · Map · Reserve',
    packageFit: 'Single-Page ($300) or Multi-Page ($600)',
    shortPackage: 'Single ($300) / Multi ($600)',
    heroHeadline: 'Seasonal Kitchen & Reserve Cellar',
    heroSubhead: 'Wood-fired coastal plates, sommelier pairings, and evening courtyard seating.',
    ctaLabel: 'Reserve a Table',
    highlights: [
      'Curated menu & pricing layout',
      'Google Maps & click-to-call',
      'Table reservation inquiry',
    ],
  },
  education: {
    pages: 'Home · Programs · Curriculum · Faculty · Admissions',
    shortPages: 'Programs · Curriculum · Admissions',
    packageFit: 'Multi-Page Website ($600)',
    shortPackage: 'Multi-Page ($600)',
    heroHeadline: 'Accredited Career & Degree Tracks',
    heroSubhead: 'Structured cohort learning, hands-on capstone labs, and guided admissions.',
    ctaLabel: 'Apply for Fall 2026',
    highlights: [
      'Course catalog organization',
      'Faculty & campus highlights',
      'Student admissions inquiry form',
    ],
  },
  consulting: {
    pages: 'Home · Advisory Services · Approach · Case Results · Contact',
    shortPages: 'Services · Case Results · Discovery',
    packageFit: 'Multi-Page Website ($600)',
    shortPackage: 'Multi-Page ($600)',
    heroHeadline: 'Revenue Architecture for B2B Leaders',
    heroSubhead: 'Commercial diagnostics, go-to-market execution, and measurable pipeline growth.',
    ctaLabel: 'Schedule Discovery',
    highlights: [
      'Methodology & ROI storytelling',
      'Clear executive service tiers',
      'Discovery call lead capture',
    ],
  },
  leadgen: {
    pages: 'Focused Single-Page Campaign Funnel',
    shortPages: 'Offer Hero · Proof · Instant Quote Form',
    packageFit: 'Single-Page Website ($300)',
    shortPackage: 'Single-Page ($300)',
    heroHeadline: 'Get Your Custom Project Estimate in 24h',
    heroSubhead: 'High-intent campaign landing page engineered for paid search and immediate lead capture.',
    ctaLabel: 'Get Free Estimate',
    highlights: [
      'Ad-matched hero headline',
      'Above-the-fold lead capture form',
      'Conversion-focused CTA sections',
    ],
  },
};

const VARIANT_ICONS = {
  corporate: Building2,
  startup: Rocket,
  ecommerce: ShoppingBag,
  portfolio: Layers,
  professional: Scale,
  realestate: Home,
  healthcare: HeartPulse,
  logistics: Truck,
  hospitality: Utensils,
  education: GraduationCap,
  consulting: Compass,
  leadgen: Target,
} as const;

function WebsiteMiniMockup({ item }: { item: WebsiteTypeItem }) {
  const { layoutVariant, accentColor, surfaceTint } = item;
  const domain = MOCKUP_DOMAINS[layoutVariant];
  const VariantIcon = VARIANT_ICONS[layoutVariant];

  return (
    <div
      className="relative w-full aspect-[16/10] rounded-xl border border-slate-200/90 overflow-hidden flex flex-col shadow-xs transition-transform duration-200 group-hover:scale-[1.015]"
      style={{ backgroundColor: surfaceTint }}
      aria-hidden="true"
    >
      {/* Crisp Browser Chrome */}
      <div className="bg-white border-b border-slate-200/80 px-3 py-1.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        </div>
        <div className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-500 truncate max-w-[160px]">
          {domain}
        </div>
        <div
          className="w-4 h-4 rounded flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${accentColor}16`, color: accentColor }}
        >
          <VariantIcon className="w-2.5 h-2.5" />
        </div>
      </div>

      {/* High-Clarity Architectural UI Composition */}
      <div className="flex-1 p-3 flex flex-col justify-between gap-2 overflow-hidden">
        {/* Clean Nav Strip */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-xs"
              style={{ backgroundColor: accentColor }}
            />
            <span className="h-1.5 w-12 bg-slate-800/75 rounded-xs" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-4 bg-slate-300 rounded-xs" />
            <span className="h-1 w-4 bg-slate-300 rounded-xs" />
            <span
              className="h-2.5 w-8 rounded-xs"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </div>

        {/* 01. Corporate & Business */}
        {layoutVariant === 'corporate' && (
          <div className="flex-1 flex flex-col justify-between gap-2">
            <div className="bg-white rounded-lg p-2.5 border border-slate-200/80 flex items-center justify-between gap-2.5">
              <div className="space-y-1.5 flex-1">
                <div className="text-[10px] font-bold tracking-tight text-[#10152C] leading-tight">
                  Enterprise Operations
                </div>
                <div className="h-1.5 w-4/5 bg-slate-200 rounded-xs" />
                <div className="flex gap-1.5 pt-0.5">
                  <span
                    className="h-3 w-11 rounded-xs"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span className="h-3 w-9 rounded-xs bg-slate-100" />
                </div>
              </div>
              <div className="px-2.5 py-2 rounded-md bg-[#1B1A66]/8 border border-[#1B1A66]/15 text-center shrink-0">
                <div className="text-[11px] font-bold text-[#1B1A66] font-mono tabular-nums">
                  99.9%
                </div>
                <div className="text-[8px] font-medium text-slate-500">SLA</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {['Advisory', 'Systems', 'Global'].map((label) => (
                <div
                  key={label}
                  className="bg-white rounded-md px-2 py-1.5 border border-slate-200/80 text-[9px] font-semibold text-slate-700 truncate text-center"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 02. Startup */}
        {layoutVariant === 'startup' && (
          <div className="flex-1 bg-white rounded-lg p-2.5 border border-slate-200/80 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-[10px] font-bold text-[#10152C]">
                  Ship Workflows 3x Faster
                </div>
                <div className="text-[8.5px] text-slate-500">
                  Live sprint telemetry
                </div>
              </div>
              <span
                className="px-2 py-1 rounded text-[8.5px] font-semibold text-white shrink-0"
                style={{ backgroundColor: accentColor }}
              >
                Launch
              </span>
            </div>
            <div className="mt-1.5 rounded-md bg-indigo-50/75 border border-indigo-100 px-2 py-1.5 flex items-end justify-between gap-1.5 h-12">
              {[34, 50, 44, 68, 60, 84, 96].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-xs"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i >= 5 ? accentColor : '#A5B4FC',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* 03. E-Commerce */}
        {layoutVariant === 'ecommerce' && (
          <div className="grid grid-cols-3 gap-2 flex-1 items-stretch">
            {[
              { name: 'Desk Lamp', price: '$64' },
              { name: 'Carry Pack', price: '$128' },
              { name: 'Audio Dock', price: '$89' },
            ].map((prod) => (
              <div
                key={prod.name}
                className="bg-white rounded-md p-1.5 border border-slate-200/80 flex flex-col justify-between"
              >
                <div
                  className="h-10 rounded flex items-center justify-center"
                  style={{ backgroundColor: `${accentColor}14` }}
                >
                  <ShoppingBag
                    className="w-3.5 h-3.5"
                    style={{ color: accentColor }}
                  />
                </div>
                <div className="pt-1.5 space-y-0.5">
                  <div className="text-[8.5px] font-semibold text-slate-800 truncate">
                    {prod.name}
                  </div>
                  <div className="text-[9px] font-bold text-[#0F766E] font-mono tabular-nums">
                    {prod.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 04. Portfolio & Personal */}
        {layoutVariant === 'portfolio' && (
          <div className="flex-1 grid grid-cols-12 gap-2">
            <div className="col-span-5 bg-[#1E293B] text-white rounded-lg p-2.5 flex flex-col justify-between">
              <div className="text-[10px] font-bold leading-snug">
                Selected Works &apos;26
              </div>
              <div className="h-4 px-2 rounded bg-white text-[#1E293B] text-[8.5px] font-bold flex items-center justify-center w-fit">
                Index
              </div>
            </div>
            <div className="col-span-7 grid grid-rows-2 gap-1.5">
              <div className="bg-white rounded-md border border-slate-200/80 px-2.5 py-1.5 flex items-center justify-between">
                <span className="text-[9px] font-semibold text-slate-800">
                  01. Brand System
                </span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </div>
              <div className="bg-white rounded-md border border-slate-200/80 px-2.5 py-1.5 flex items-center justify-between">
                <span className="text-[9px] font-semibold text-slate-800">
                  02. Web Platform
                </span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </div>
        )}

        {/* 05. Professional Service */}
        {layoutVariant === 'professional' && (
          <div className="flex-1 bg-white rounded-lg p-2.5 border border-slate-200/80 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-100">
              <div className="text-[10px] font-bold text-[#10152C]">
                Legal &amp; Tax Counsel
              </div>
              <span
                className="px-2 py-0.5 rounded text-[8.5px] font-semibold text-white shrink-0"
                style={{ backgroundColor: accentColor }}
              >
                Consult
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2 rounded-md bg-[#F3F5FC] border border-slate-200/60">
                <div className="text-[9px] font-bold text-[#1B1A66]">
                  Practice Areas
                </div>
                <div className="h-1.5 w-4/5 bg-slate-300/80 rounded-xs mt-1.5" />
              </div>
              <div className="p-2 rounded-md bg-[#F3F5FC] border border-slate-200/60">
                <div className="text-[9px] font-bold text-[#1B1A66]">
                  Client Portal
                </div>
                <div className="h-1.5 w-3/4 bg-slate-300/80 rounded-xs mt-1.5" />
              </div>
            </div>
          </div>
        )}

        {/* 06. Real Estate */}
        {layoutVariant === 'realestate' && (
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="bg-white rounded-md px-2.5 py-1 border border-slate-200/80 flex items-center justify-between text-[8.5px] text-slate-500">
              <span className="truncate">Austin, TX · Waterfront</span>
              <span
                className="px-1.5 py-0.5 rounded text-white font-semibold shrink-0"
                style={{ backgroundColor: accentColor }}
              >
                Search
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1">
              {[
                { price: '$485k', meta: '3 bd · 2 ba' },
                { price: '$620k', meta: '4 bd · 3 ba' },
              ].map((home) => (
                <div
                  key={home.price}
                  className="bg-white rounded-md p-2 border border-slate-200/80 flex flex-col justify-between"
                >
                  <div
                    className="h-6 rounded flex items-center justify-center"
                    style={{ backgroundColor: `${accentColor}16` }}
                  >
                    <Home className="w-3 h-3" style={{ color: accentColor }} />
                  </div>
                  <div className="pt-1 flex items-baseline justify-between gap-1">
                    <span className="text-[9.5px] font-bold text-[#9A3412] font-mono tabular-nums">
                      {home.price}
                    </span>
                    <span className="text-[8px] text-slate-500">{home.meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 07. Healthcare & Medical */}
        {layoutVariant === 'healthcare' && (
          <div className="flex-1 grid grid-cols-12 gap-2">
            <div className="col-span-7 bg-white rounded-lg p-2.5 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-[#0369A1]">
                  Patient-First Care
                </div>
                <div className="text-[8.5px] text-slate-500 mt-0.5">
                  Primary &amp; Specialty
                </div>
              </div>
              <span
                className="px-2 py-1 rounded text-[8.5px] font-semibold text-white w-fit"
                style={{ backgroundColor: accentColor }}
              >
                Book Visit
              </span>
            </div>
            <div className="col-span-5 bg-white rounded-lg p-2 border border-slate-200/80 flex flex-col justify-center gap-1.5">
              {['09:30 AM', '11:15 AM'].map((slot) => (
                <div
                  key={slot}
                  className="px-2 py-1 rounded bg-sky-50 border border-sky-100 text-[8.5px] font-mono font-semibold text-[#0369A1] text-center tabular-nums"
                >
                  {slot}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 08. Logistics & Transportation */}
        {layoutVariant === 'logistics' && (
          <div className="flex-1 bg-white rounded-lg p-2.5 border border-slate-200/80 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold text-[#10152C]">
                Freight &amp; Fleet Network
              </div>
              <span
                className="px-2 py-0.5 rounded text-[8.5px] font-semibold text-white"
                style={{ backgroundColor: accentColor }}
              >
                Quote
              </span>
            </div>
            <div className="bg-blue-50/75 rounded-md border border-blue-100 px-2.5 py-2 flex items-center justify-between gap-2">
              <span className="text-[9.5px] font-mono font-bold text-[#1D4ED8]">
                CHI
              </span>
              <div className="flex-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
                <div className="flex-1 h-px border-t border-dashed border-[#1D4ED8]" />
                <Truck className="w-3.5 h-3.5 text-[#1D4ED8]" />
                <div className="flex-1 h-px border-t border-dashed border-[#1D4ED8]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
              </div>
              <span className="text-[9.5px] font-mono font-bold text-[#1D4ED8]">
                DAL
              </span>
            </div>
          </div>
        )}

        {/* 09. Restaurant & Hospitality */}
        {layoutVariant === 'hospitality' && (
          <div className="flex-1 grid grid-cols-12 gap-2">
            <div className="col-span-6 bg-[#9F1239] text-white rounded-lg p-2.5 flex flex-col justify-between">
              <div className="text-[10px] font-bold leading-snug">
                Seasonal Kitchen
              </div>
              <div className="px-2 py-1 rounded bg-white text-[#9F1239] text-[8.5px] font-bold w-fit">
                Reserve
              </div>
            </div>
            <div className="col-span-6 bg-white rounded-lg p-2 border border-slate-200/80 flex flex-col justify-between">
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                Chef Menu
              </div>
              {[
                { dish: 'Sea Bass', price: '$34' },
                { dish: 'Risotto', price: '$26' },
              ].map((row) => (
                <div
                  key={row.dish}
                  className="flex items-center justify-between text-[9px] border-b border-slate-100 last:border-0 pb-0.5"
                >
                  <span className="font-medium text-slate-700 truncate pr-1">
                    {row.dish}
                  </span>
                  <span className="font-bold font-mono text-[#9F1239] tabular-nums">
                    {row.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. Educational */}
        {layoutVariant === 'education' && (
          <div className="flex-1 flex flex-col justify-between gap-2">
            <div className="bg-white rounded-lg px-2.5 py-2 border border-slate-200/80 flex items-center justify-between">
              <div className="text-[10px] font-bold text-[#10152C]">
                2026 Degree Tracks
              </div>
              <span
                className="px-2 py-0.5 rounded text-[8.5px] font-semibold text-white"
                style={{ backgroundColor: accentColor }}
              >
                Enroll
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { title: 'Data Systems', count: '12 Modules' },
                { title: 'Business Ops', count: '8 Modules' },
              ].map((course) => (
                <div
                  key={course.title}
                  className="bg-white rounded-md p-2 border border-slate-200/80"
                >
                  <div className="text-[9px] font-bold text-[#4338CA] truncate">
                    {course.title}
                  </div>
                  <div className="text-[8px] text-slate-500 font-mono tabular-nums mt-0.5">
                    {course.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 11. Agency & Consulting */}
        {layoutVariant === 'consulting' && (
          <div className="flex-1 bg-[#10152C] text-white rounded-lg p-3 flex items-center justify-between gap-2.5">
            <div className="space-y-2 flex-1">
              <div className="text-[10px] font-bold leading-snug">
                Growth Strategy &amp; Brand Execution
              </div>
              <div className="px-2 py-1 rounded bg-[#6B78E8] text-white text-[8.5px] font-semibold inline-flex items-center">
                Book Discovery
              </div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-md px-2.5 py-2 text-center shrink-0">
              <div className="text-[11px] font-bold font-mono text-white tabular-nums">
                +140%
              </div>
              <div className="text-[8px] text-slate-300">Pipeline</div>
            </div>
          </div>
        )}

        {/* 12. Lead Generation Landing Pages */}
        {layoutVariant === 'leadgen' && (
          <div className="flex-1 grid grid-cols-12 gap-2 items-stretch">
            <div className="col-span-6 flex flex-col justify-center space-y-1">
              <div className="text-[10px] font-bold text-[#10152C] leading-snug">
                Custom Quote in 24 Hours
              </div>
              <div className="text-[8.5px] text-slate-500">
                Fast campaign lead capture
              </div>
            </div>
            <div className="col-span-6 bg-white rounded-lg p-2 border border-slate-200/90 flex flex-col justify-between gap-1.5">
              <div className="h-4 rounded bg-slate-100 px-1.5 flex items-center text-[8px] text-slate-400">
                Work Email
              </div>
              <div
                className="h-5 rounded text-white text-[8.5px] font-bold flex items-center justify-center"
                style={{ backgroundColor: accentColor }}
              >
                Get Quote
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hover Preview Cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#10152C]/75 via-[#10152C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-end justify-end px-3 pb-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white">
          <Eye className="w-3.5 h-3.5" />
          <span>Inspect Blueprint</span>
        </span>
      </div>
    </div>
  );
}

function ExpandedDesktopPreview({ item }: { item: WebsiteTypeItem }) {
  const { layoutVariant, accentColor, surfaceTint } = item;
  const domain = MOCKUP_DOMAINS[layoutVariant];
  const blueprint = RECOMMENDED_SECTIONS[layoutVariant];
  const VariantIcon = VARIANT_ICONS[layoutVariant];

  return (
    <div className="w-full max-w-[740px] mx-auto rounded-2xl border border-slate-200/95 bg-white shadow-xl overflow-hidden">
      {/* Desktop Browser Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        </div>
        <div className="flex-1 max-w-sm mx-auto px-3 py-1 rounded-md bg-slate-100 text-xs font-mono text-slate-600 text-center truncate">
          https://{domain}
        </div>
        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
          Desktop 1280px
        </span>
      </div>

      {/* Site Canvas */}
      <div className="p-5 sm:p-6 space-y-5" style={{ backgroundColor: surfaceTint }}>
        {/* Realistic Site Navbar */}
        <header className="bg-white rounded-xl border border-slate-200/80 px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: accentColor }}
            >
              <VariantIcon className="w-4 h-4" />
            </div>
            <span className="font-display text-sm font-bold text-[#10152C] truncate">
              {domain.split('.')[0].toUpperCase()}
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-5 text-xs font-medium text-slate-600">
            <span>Overview</span>
            <span>Services</span>
            <span>About</span>
          </nav>
          <div
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            {blueprint.ctaLabel}
          </div>
        </header>

        {/* Industry-Specific Main Hero + Module Split */}
        <div className="grid md:grid-cols-12 gap-4 items-stretch">
          <div className="md:col-span-7 bg-white rounded-xl border border-slate-200/80 p-5 flex flex-col justify-between gap-4">
            <div className="space-y-2.5">
              <div
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: accentColor }}
              >
                {item.category}
              </div>
              <h4 className="font-display text-xl sm:text-2xl font-bold text-[#10152C] leading-tight">
                {blueprint.heroHeadline}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {blueprint.heroSubhead}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white"
                style={{ backgroundColor: accentColor }}
              >
                {blueprint.ctaLabel}
              </span>
              <span className="px-4 py-2 rounded-lg text-xs font-semibold text-[#10152C] bg-slate-100">
                Learn More
              </span>
            </div>
          </div>

          {/* Right Industry Conversion Module */}
          <div className="md:col-span-5 bg-white rounded-xl border border-slate-200/80 p-4 flex flex-col justify-between">
            {layoutVariant === 'startup' && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#10152C]">
                    Weekly Activation
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-600 tabular-nums">
                    +38%
                  </span>
                </div>
                <div className="flex-1 rounded-lg bg-indigo-50/75 border border-indigo-100 p-3 flex items-end gap-2 min-h-[110px]">
                  {[35, 48, 42, 65, 58, 82, 96].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{
                        height: `${h}%`,
                        backgroundColor: i >= 5 ? accentColor : '#A5B4FC',
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            {layoutVariant === 'ecommerce' && (
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-[#10152C]">
                  Featured Catalog Items
                </div>
                {[
                  { name: 'Architectural Desk Lamp', price: '$64.00' },
                  { name: 'Minimalist Leather Pack', price: '$128.00' },
                  { name: 'Acoustic Studio Dock', price: '$89.00' },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#F0FDFA] border border-teal-100"
                  >
                    <span className="text-xs font-semibold text-slate-800 truncate pr-2">
                      {p.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0F766E] tabular-nums shrink-0">
                      {p.price}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {layoutVariant === 'healthcare' && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0369A1]">
                  <CalendarCheck className="w-4 h-4" />
                  <span>Available Clinic Slots</span>
                </div>
                {[
                  { time: 'Today · 09:30 AM', doc: 'Dr. Elena Rostova' },
                  { time: 'Today · 11:15 AM', doc: 'Dr. Marcus Vance' },
                  { time: 'Tomorrow · 02:00 PM', doc: 'Dr. Priya Nair' },
                ].map((slot) => (
                  <div
                    key={slot.time}
                    className="p-2 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-between text-xs"
                  >
                    <span className="font-mono font-semibold text-[#0369A1] tabular-nums">
                      {slot.time}
                    </span>
                    <span className="text-slate-600 truncate pl-2">{slot.doc}</span>
                  </div>
                ))}
              </div>
            )}

            {layoutVariant === 'realestate' && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#9A3412]">
                  <MapPin className="w-4 h-4" />
                  <span>Featured Properties</span>
                </div>
                {[
                  { addr: '412 Harbor Ridge Ct', price: '$485,000', spec: '3 bd · 2 ba' },
                  { addr: '880 Cedar Crest Blvd', price: '$620,000', spec: '4 bd · 3 ba' },
                ].map((home) => (
                  <div
                    key={home.addr}
                    className="p-2.5 rounded-lg bg-orange-50/70 border border-orange-100 space-y-0.5"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-[#10152C]">
                      <span>{home.addr}</span>
                      <span className="font-mono text-[#9A3412] tabular-nums">
                        {home.price}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">{home.spec}</div>
                  </div>
                ))}
              </div>
            )}

            {layoutVariant === 'logistics' && (
              <div className="space-y-3 my-auto">
                <div className="text-xs font-bold text-[#10152C]">
                  Active Corridor Dispatch
                </div>
                <div className="p-3 rounded-lg bg-blue-50/80 border border-blue-100 flex items-center justify-between gap-2">
                  <div className="text-center">
                    <div className="text-xs font-mono font-bold text-[#1D4ED8]">CHI</div>
                    <div className="text-[10px] text-slate-500">Origin</div>
                  </div>
                  <div className="flex-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                    <div className="flex-1 h-px border-t border-dashed border-[#1D4ED8]" />
                    <Truck className="w-4 h-4 text-[#1D4ED8]" />
                    <div className="flex-1 h-px border-t border-dashed border-[#1D4ED8]" />
                    <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-mono font-bold text-[#1D4ED8]">DAL</div>
                    <div className="text-[10px] text-slate-500">Hub</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded bg-slate-50 border border-slate-200/70">
                    <div className="text-xs font-mono font-bold text-[#10152C] tabular-nums">
                      99.4%
                    </div>
                    <div className="text-[10px] text-slate-500">On-Time Rate</div>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200/70">
                    <div className="text-xs font-mono font-bold text-[#10152C] tabular-nums">
                      48 States
                    </div>
                    <div className="text-[10px] text-slate-500">Coverage</div>
                  </div>
                </div>
              </div>
            )}

            {layoutVariant === 'hospitality' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#9F1239]">
                  <span>Evening Tasting Menu</span>
                  <Clock className="w-3.5 h-3.5" />
                </div>
                {[
                  { dish: 'Wood-Fired Sea Bass', price: '$34' },
                  { dish: 'Black Truffle Risotto', price: '$26' },
                  { dish: 'Roasted Heirloom Carrots', price: '$16' },
                ].map((row) => (
                  <div
                    key={row.dish}
                    className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0 text-xs"
                  >
                    <span className="font-medium text-slate-700">{row.dish}</span>
                    <span className="font-mono font-bold text-[#9F1239] tabular-nums">
                      {row.price}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {(layoutVariant === 'corporate' ||
              layoutVariant === 'portfolio' ||
              layoutVariant === 'professional' ||
              layoutVariant === 'education' ||
              layoutVariant === 'consulting' ||
              layoutVariant === 'leadgen') && (
              <div className="space-y-2.5 my-auto">
                <div className="text-xs font-bold text-[#10152C]">
                  {layoutVariant === 'leadgen'
                    ? 'Instant Quote Request'
                    : 'Key Page Modules'}
                </div>
                {layoutVariant === 'leadgen' ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-400">
                      Full Name · Company
                    </div>
                    <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-400">
                      Work Email
                    </div>
                    <div
                      className="py-2 rounded-lg text-center text-xs font-semibold text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      Get Instant Proposal
                    </div>
                  </div>
                ) : (
                  blueprint.highlights.map((pt) => (
                    <div
                      key={pt}
                      className="p-2.5 rounded-lg border border-slate-200/80 flex items-center gap-2 text-xs font-medium text-[#10152C]"
                      style={{ backgroundColor: surfaceTint }}
                    >
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: accentColor }}
                      />
                      <span>{pt}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom 3-Column Feature Strip */}
        <div className="grid grid-cols-3 gap-3">
          {blueprint.highlights.map((hl, index) => (
            <div
              key={hl}
              className="bg-white rounded-xl border border-slate-200/80 p-3 space-y-1"
            >
              <div
                className="font-mono text-[10px] font-bold tabular-nums"
                style={{ color: accentColor }}
              >
                0{index + 1}
              </div>
              <div className="text-xs font-semibold text-[#10152C] leading-snug">
                {hl}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type CategoryFilter =
  | 'All'
  | 'Business & Consulting'
  | 'Commerce & Growth'
  | 'Specialized Industries';

export default function ServicesAndTypes({
  onSelectWebsiteType,
}: ServicesAndTypesProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [previewItem, setPreviewItem] = useState<WebsiteTypeItem | null>(null);
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    if (!previewItem) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewItem(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [previewItem]);

  const filteredTypes =
    activeCategory === 'All'
      ? WEBSITE_TYPES
      : WEBSITE_TYPES.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* SECTION 2: INTRODUCTION – YOUR DIGITAL PRESENCE STARTS HERE */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#1B1A66]">
                Your Digital Presence Starts Here
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10152C] leading-tight">
                Your Business Deserves More Than Just a Website.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Your website is often the first interaction customers have with your
                business. At New Fleet Solutions, we create professional, user-friendly,
                and visually engaging websites that help businesses communicate their
                value, build credibility, and generate opportunities.
              </p>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-3 gap-5">
              {BENEFITS.map((benefit, idx) => {
                const Icon = BENEFIT_ICONS[benefit.iconName];
                return (
                  <motion.div
                    key={benefit.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.07,
                      ease: REVEAL_EASE,
                    }}
                    className="bg-[#F5F6FA] rounded-xl p-6 border border-slate-200/80 flex flex-col justify-between gap-4 hover:bg-white hover:border-[#1B1A66]/30 hover:shadow-sm transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-[#1B1A66] text-white flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-medium text-slate-400 tabular-nums">
                        0{idx + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#10152C] mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR WEBSITE DEVELOPMENT SERVICES */}
      <section
        id="services"
        className="py-20 lg:py-24 bg-[#F5F6FA] border-y border-slate-200/70"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: REVEAL_EASE }}
            className="max-w-2xl mb-12 space-y-3"
          >
            <p className="text-xs font-semibold tracking-wider uppercase text-[#1B1A66]">
              Our Website Development Services
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10152C]">
              Everything You Need to Build Your Online Presence.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, idx) => {
              const Icon = SERVICE_ICONS[service.iconName];
              return (
                <motion.article
                  key={service.number}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: (idx % 3) * 0.07,
                    ease: REVEAL_EASE,
                  }}
                  className="bg-white rounded-xl p-7 border border-slate-200/90 hover:border-[#1B1A66]/40 hover:shadow-md transition-shadow duration-150 flex flex-col justify-between gap-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-lg bg-[#F3F5FC] text-[#1B1A66] flex items-center justify-center border border-[#1B1A66]/10">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums">
                      {service.number}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-[#10152C]">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: TYPES OF WEBSITES WE BUILD */}
      <section id="websites" className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl space-y-3">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#1B1A66]">
                Types of Websites We Build
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10152C]">
                One Partner. Every Type of Website.
              </h2>
              <p className="text-base text-slate-600">
                Inspect any industry blueprint below to explore recommended page structure
                or launch your custom inquiry.
              </p>
            </div>

            {/* Interactive Segmented Category Filter (single horizontal row on sm+) */}
            <div
              role="group"
              aria-label="Filter website categories"
              className="inline-flex sm:flex-nowrap items-center gap-1 p-1 bg-[#F5F6FA] rounded-xl border border-slate-200/80 overflow-x-auto max-w-full shrink-0"
            >
              {(
                [
                  { id: 'All', label: 'All (12)' },
                  { id: 'Business & Consulting', label: 'Business & Consulting' },
                  { id: 'Commerce & Growth', label: 'Commerce & Growth' },
                  { id: 'Specialized Industries', label: 'Specialized Industries' },
                ] as const
              ).map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#1B1A66] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#10152C]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTypes.map((item, idx) => {
                const rec = RECOMMENDED_SECTIONS[item.layoutVariant];
                return (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.32,
                      delay: (idx % 3) * 0.04,
                      ease: REVEAL_EASE,
                    }}
                    className="group bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-[#1B1A66]/45 hover:shadow-lg transition-all duration-150 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewViewport('desktop');
                          setPreviewItem(item);
                        }}
                        aria-label={`Inspect ${item.title} blueprint`}
                        className="block w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B1A66] rounded-xl"
                      >
                        <WebsiteMiniMockup item={item} />
                      </button>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500">
                          <span className="truncate">
                            {item.category} ·{' '}
                            <span className="text-[#1B1A66] font-semibold">
                              {rec.shortPackage}
                            </span>
                          </span>
                          <span className="font-mono text-[11px] text-slate-400 tabular-nums shrink-0">
                            {String(
                              WEBSITE_TYPES.findIndex((w) => w.id === item.id) + 1
                            ).padStart(2, '0')}
                          </span>
                        </div>

                        <h3 className="font-display text-lg font-bold text-[#10152C] group-hover:text-[#1B1A66] transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          {item.description}
                        </p>

                        <p className="pt-1 text-xs font-mono text-slate-500 truncate">
                          {rec.shortPages}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewViewport('desktop');
                          setPreviewItem(item);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#10152C] cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B1A66]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Blueprint</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectWebsiteType(item.title)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B1A66] hover:text-[#141352] cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B1A66]"
                      >
                        <span>Request Website</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Interactive Website Blueprint Preview Modal */}
      <AnimatePresence>
        {previewItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10152C]/75 backdrop-blur-xs overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-modal-title"
            onClick={() => setPreviewItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: REVEAL_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-8"
            >
              {/* Modal Top Bar */}
              <div className="bg-[#10152C] px-6 py-4 text-white flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[#CBD5FF] font-mono">
                    {previewItem.category} · {MOCKUP_DOMAINS[previewItem.layoutVariant]}
                  </div>
                  <h3
                    id="preview-modal-title"
                    className="font-display text-lg font-bold mt-0.5"
                  >
                    {previewItem.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Prev / Next Blueprint Switcher */}
                  <div className="hidden sm:inline-flex items-center gap-1 mr-1">
                    <button
                      type="button"
                      onClick={() => {
                        const i = WEBSITE_TYPES.findIndex((w) => w.id === previewItem.id);
                        const prev =
                          WEBSITE_TYPES[
                            (i - 1 + WEBSITE_TYPES.length) % WEBSITE_TYPES.length
                          ];
                        setPreviewItem(prev);
                      }}
                      aria-label="Previous website type"
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const i = WEBSITE_TYPES.findIndex((w) => w.id === previewItem.id);
                        const next = WEBSITE_TYPES[(i + 1) % WEBSITE_TYPES.length];
                        setPreviewItem(next);
                      }}
                      aria-label="Next website type"
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div
                    role="group"
                    aria-label="Toggle desktop or mobile preview"
                    className="inline-flex items-center gap-1 p-1 bg-white/10 rounded-lg"
                  >
                    <button
                      type="button"
                      onClick={() => setPreviewViewport('desktop')}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md cursor-pointer transition-colors ${
                        previewViewport === 'desktop'
                          ? 'bg-white text-[#10152C]'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Laptop className="w-3.5 h-3.5" />
                      <span>Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewViewport('mobile')}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md cursor-pointer transition-colors ${
                        previewViewport === 'mobile'
                          ? 'bg-white text-[#10152C]'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPreviewItem(null)}
                    aria-label="Close layout preview"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-7 space-y-6 bg-[#F5F6FA]">
                <div className="flex justify-center">
                  {previewViewport === 'desktop' ? (
                    <ExpandedDesktopPreview item={previewItem} />
                  ) : (
                    <div className="w-[290px] rounded-[28px] border-4 border-[#10152C] bg-white shadow-xl overflow-hidden">
                      <div className="bg-[#10152C] px-4 py-2 flex items-center justify-center">
                        <div className="w-12 h-1 rounded-full bg-slate-600" />
                      </div>
                      <div
                        className="p-4 space-y-3"
                        style={{ backgroundColor: previewItem.surfaceTint }}
                      >
                        <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200/80">
                          <span className="text-[11px] font-mono text-slate-600 truncate">
                            {MOCKUP_DOMAINS[previewItem.layoutVariant]}
                          </span>
                          <span
                            className="w-2.5 h-2.5 rounded-xs shrink-0"
                            style={{ backgroundColor: previewItem.accentColor }}
                          />
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200/80 space-y-2.5">
                          <div
                            className="text-[10px] font-semibold uppercase tracking-wider"
                            style={{ color: previewItem.accentColor }}
                          >
                            {previewItem.title}
                          </div>
                          <div className="font-display text-sm font-bold text-[#10152C] leading-snug">
                            {RECOMMENDED_SECTIONS[previewItem.layoutVariant].heroHeadline}
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {RECOMMENDED_SECTIONS[previewItem.layoutVariant].heroSubhead}
                          </p>
                          <div
                            className="mt-2 py-2 px-3 rounded-lg text-white text-xs font-semibold text-center"
                            style={{ backgroundColor: previewItem.accentColor }}
                          >
                            {RECOMMENDED_SECTIONS[previewItem.layoutVariant].ctaLabel}
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          {RECOMMENDED_SECTIONS[previewItem.layoutVariant].highlights.map(
                            (itemPt) => (
                              <div
                                key={itemPt}
                                className="bg-white rounded-lg px-3 py-2 border border-slate-200/80 flex items-center gap-2 text-xs text-slate-700"
                              >
                                <CheckCircle2
                                  className="w-3.5 h-3.5 shrink-0"
                                  style={{ color: previewItem.accentColor }}
                                />
                                <span className="truncate">{itemPt}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recommended Structure Details */}
                <div className="bg-white rounded-xl border border-slate-200/90 p-5 grid sm:grid-cols-12 gap-5 items-center">
                  <div className="sm:col-span-7 space-y-2.5">
                    <div className="text-xs font-semibold text-[#1B1A66]">
                      Recommended Structure ·{' '}
                      {RECOMMENDED_SECTIONS[previewItem.layoutVariant].packageFit}
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      {RECOMMENDED_SECTIONS[previewItem.layoutVariant].pages}
                    </div>
                    <ul className="space-y-1.5 pt-1">
                      {RECOMMENDED_SECTIONS[previewItem.layoutVariant].highlights.map(
                        (pt) => (
                          <li
                            key={pt}
                            className="flex items-center gap-2 text-xs sm:text-sm text-[#10152C]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#1B1A66] shrink-0" />
                            <span>{pt}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="sm:col-span-5 flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        const title = previewItem.title;
                        setPreviewItem(null);
                        onSelectWebsiteType(title);
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-[#1B1A66] hover:bg-[#141352] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Build This Website</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewItem(null)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#F5F6FA] hover:bg-slate-200/70 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Continue Browsing
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
