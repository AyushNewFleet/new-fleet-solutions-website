import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Laptop,
  Search,
  Smartphone,
  Tablet,
} from 'lucide-react';
import type { PackageOption } from '../data/nfsData';

interface HeroSectionProps {
  onOpenInquiry: (pkg?: PackageOption) => void;
}

type DeviceFocus = 'all' | 'desktop' | 'tablet' | 'mobile';

export default function HeroSection({ onOpenInquiry }: HeroSectionProps) {
  const [deviceFocus, setDeviceFocus] = useState<DeviceFocus>('all');
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-[#F3F5FC] via-[#F7F9FE] to-white pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/70"
    >
      {/* Subtle architectural grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(#CBD5E1 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Core Proposition */}
          <div className="lg:col-span-6 space-y-6">
            {/* Trust Statement (clean unboxed typographic strip, zero pills) */}
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#1B1A66] flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span>Modern Design</span>
              <span aria-hidden="true" className="text-[#6B78E8]">
                ·
              </span>
              <span>Mobile Responsive</span>
              <span aria-hidden="true" className="text-[#6B78E8]">
                ·
              </span>
              <span>SEO-Ready</span>
            </p>

            <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#10152C] leading-[1.08]">
              Websites That Build Trust. Designs That Drive Growth.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[56ch]">
              From professional business websites to powerful multi-page experiences, New
              Fleet Solutions helps businesses establish a strong digital presence with
              modern design, responsive development, and SEO-ready foundations.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onOpenInquiry()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#1B1A66] hover:bg-[#141352] rounded-xl shadow-sm transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B1A66]"
              >
                <span>Get Your Website Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#1B1A66] bg-white hover:bg-[#F3F5FC] border border-slate-300 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B1A66]"
              >
                <span>Explore Our Services</span>
              </a>
            </div>

            {/* Quiet Pricing Anchor & Scope Summary */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="font-display text-xl font-bold text-[#10152C] tabular-nums">
                  $300
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Single-Page Website
                </div>
              </div>
              <div>
                <div className="font-display text-xl font-bold text-[#1B1A66] tabular-nums">
                  $600
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Multi-Page Website
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="font-display text-xl font-bold text-[#10152C]">
                  Included
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  On-Page SEO Setup
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Multi-Device Website Mockup Showcase */}
          <div className="lg:col-span-6">
            <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-lg p-4 sm:p-6">
              {/* Interactive Device Preview Switcher Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Globe className="w-4 h-4 text-[#1B1A66]" />
                  <span>Responsive Device Preview</span>
                </div>
                <div
                  role="group"
                  aria-label="Preview viewport mode"
                  className="inline-flex items-center gap-1 p-1 bg-[#F5F6FA] rounded-lg border border-slate-200/70"
                >
                  {(
                    [
                      { id: 'all', label: 'All' },
                      { id: 'desktop', label: 'Desktop', icon: Laptop },
                      { id: 'tablet', label: 'Tablet', icon: Tablet },
                      { id: 'mobile', label: 'Mobile', icon: Smartphone },
                    ] as const
                  ).map((item) => {
                    const active = deviceFocus === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDeviceFocus(item.id)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-white text-[#1B1A66] shadow-xs'
                            : 'text-slate-600 hover:text-[#10152C]'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Multi-Device Stage */}
              <div className="relative min-h-[340px] sm:min-h-[380px] flex items-center justify-center">
                {/* Desktop Mockup Frame */}
                {(deviceFocus === 'all' || deviceFocus === 'desktop') && (
                  <div
                    className={`w-full rounded-xl border border-slate-200 bg-white overflow-hidden shadow-md transition-transform duration-200 ${
                      deviceFocus === 'all' ? 'lg:mr-10' : ''
                    }`}
                  >
                    {/* Browser Chrome */}
                    <div className="bg-[#10152C] px-3.5 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-500/70" />
                      </div>
                      <div className="bg-white/10 text-white/80 text-[11px] px-3 py-0.5 rounded font-mono truncate max-w-[200px]">
                        https://yourbusiness.com
                      </div>
                      <span className="text-[10px] text-[#6B78E8] font-medium">
                        SSL Ready
                      </span>
                    </div>

                    {/* Desktop Preview Content */}
                    <div className="bg-white">
                      {/* Mini Nav */}
                      <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-[#1B1A66] flex items-center justify-center text-[8px] font-bold text-white">
                            N
                          </div>
                          <span className="text-[11px] font-bold text-[#10152C]">
                            YourBrand Inc.
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-slate-500">
                          <span>Services</span>
                          <span>About</span>
                          <span className="px-2.5 py-1 bg-[#1B1A66] text-white font-semibold rounded-md">
                            Contact
                          </span>
                        </div>
                      </div>

                      {/* Mini Hero Split with real generated studio image */}
                      <div className="p-4 grid grid-cols-12 gap-4 items-center bg-[#F3F5FC]/70">
                        <div className="col-span-7 space-y-2">
                          <div className="text-[10px] font-semibold text-[#1B1A66] tracking-wide">
                            Enterprise Ready Web Architecture
                          </div>
                          <div className="font-display text-sm sm:text-base font-extrabold text-[#10152C] leading-tight">
                            Professional Digital Presence Built for Growth.
                          </div>
                          <p className="text-[10px] text-slate-600 leading-relaxed">
                            Responsive pages, intuitive navigation, and on-page SEO
                            engineered for modern customers.
                          </p>
                          <div className="flex items-center gap-2 pt-1">
                            <span className="px-2.5 py-1 bg-[#1B1A66] text-white text-[10px] font-semibold rounded-md">
                              Get Quote
                            </span>
                            <span className="px-2.5 py-1 bg-white border border-slate-300 text-[#10152C] text-[10px] font-semibold rounded-md">
                              Our Work
                            </span>
                          </div>
                        </div>
                        <div className="col-span-5">
                          <div className="aspect-[16/10] rounded-lg overflow-hidden border border-slate-200 bg-[#1B1A66]/10">
                            {!heroImgFailed ? (
                              <img
                                src="/src/assets/images/hero_agency_studio_1795040100326.jpg"
                                alt="Modern digital agency workstation displaying responsive corporate website design"
                                referrerPolicy="no-referrer"
                                onError={() => setHeroImgFailed(true)}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-[#1B1A66] to-[#6B78E8] flex items-center justify-center p-2 text-white text-[10px] font-medium text-center">
                                Desktop Layout Preview
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Mini Service Grid */}
                      <div className="p-4 grid grid-cols-3 gap-2.5">
                        {[
                          { title: 'Custom Design', sub: 'Tailored to brand' },
                          { title: 'Responsive UI', sub: 'Mobile & tablet' },
                          { title: 'On-Page SEO', sub: 'Search indexed' },
                        ].map((item) => (
                          <div
                            key={item.title}
                            className="p-2.5 rounded-lg border border-slate-100 bg-[#F5F6FA]/70"
                          >
                            <div className="w-5 h-5 rounded bg-[#1B1A66]/10 mb-1.5 flex items-center justify-center">
                              <CheckCircle2 className="w-3 h-3 text-[#1B1A66]" />
                            </div>
                            <div className="text-[10px] font-semibold text-[#10152C] truncate">
                              {item.title}
                            </div>
                            <div className="text-[9px] text-slate-500 mt-0.5 truncate">
                              {item.sub}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tablet Preview */}
                {(deviceFocus === 'all' || deviceFocus === 'tablet') && (
                  <div
                    className={`${
                      deviceFocus === 'all'
                        ? 'hidden sm:block absolute -bottom-3 left-3 w-48 z-10'
                        : 'w-full max-w-[300px]'
                    } rounded-xl border-2 border-[#10152C] bg-white shadow-lg overflow-hidden`}
                  >
                    <div className="bg-[#10152C] px-2.5 py-1 flex items-center justify-between">
                      <span className="text-[9px] font-medium text-slate-300">
                        Tablet Layout · 768px
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6B78E8]" />
                    </div>
                    <div className="p-2.5 space-y-2">
                      <div className="aspect-[16/9] rounded bg-[#F3F5FC] border border-slate-200 overflow-hidden">
                        {!heroImgFailed ? (
                          <img
                            src="/src/assets/images/responsive_devices_desk_1795040102229.jpg"
                            alt="Responsive tablet and desktop layout synchronization"
                            referrerPolicy="no-referrer"
                            onError={() => setHeroImgFailed(true)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#1B1A66]" />
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="p-1.5 rounded bg-[#F5F6FA] border border-slate-100">
                          <div className="text-[8px] font-bold text-[#1B1A66]">
                            Single-Page
                          </div>
                          <div className="text-[9px] font-bold text-[#10152C] tabular-nums">
                            $300
                          </div>
                        </div>
                        <div className="p-1.5 rounded bg-[#F3F5FC] border border-[#1B1A66]/15">
                          <div className="text-[8px] font-bold text-[#1B1A66]">
                            Multi-Page
                          </div>
                          <div className="text-[9px] font-bold text-[#10152C] tabular-nums">
                            $600
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Preview */}
                {(deviceFocus === 'all' || deviceFocus === 'mobile') && (
                  <div
                    className={`${
                      deviceFocus === 'all'
                        ? 'hidden sm:block absolute -bottom-2 -right-2 w-36 z-20'
                        : 'w-full max-w-[220px]'
                    } rounded-2xl border-2 border-[#10152C] bg-white shadow-xl overflow-hidden`}
                  >
                    <div className="bg-[#10152C] px-3 py-1.5 flex items-center justify-center">
                      <div className="w-8 h-1 rounded-full bg-slate-600" />
                    </div>
                    <div className="p-2.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-3 h-3 rounded bg-[#1B1A66]" />
                        <div className="h-1.5 w-4 bg-slate-300 rounded-xs" />
                      </div>
                      <div className="p-2 rounded-lg bg-[#1B1A66] text-white space-y-1">
                        <div className="text-[9px] font-semibold leading-tight">
                          Mobile-First UI
                        </div>
                        <div className="h-1.5 w-full bg-white/30 rounded-xs" />
                        <div className="h-4 w-full bg-white text-[#1B1A66] text-[8px] font-bold rounded flex items-center justify-center mt-1">
                          Contact Now
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-4 rounded bg-[#F5F6FA] border border-slate-100 px-1.5 flex items-center gap-1">
                          <Search className="w-2.5 h-2.5 text-[#1B1A66]" />
                          <span className="text-[8px] text-slate-600">
                            SEO Meta Ready
                          </span>
                        </div>
                        <div className="h-4 rounded bg-[#F5F6FA] border border-slate-100 px-1.5 flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#1B1A66]" />
                          <span className="text-[8px] text-slate-600">
                            Click-to-Call
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Responsive Architecture Bar */}
              <div className="mt-6 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>Desktop · Tablet · Smartphone Breakpoints</span>
                <span className="font-medium text-[#1B1A66]">
                  Clean Semantic Markup
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
