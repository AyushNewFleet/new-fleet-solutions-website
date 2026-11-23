import { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  FileEdit,
  Globe2,
  Layout,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  PhoneCall,
  Search,
  Share2,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  ADVANTAGES,
  ON_PAGE_SEO_ITEMS,
  WEBSITE_FEATURES,
} from '../data/nfsData';

const FEATURE_ICONS = {
  MonitorSmartphone,
  Layout,
  Zap,
  Sparkles,
  Compass,
  Mail,
  PhoneCall,
  MessageCircle,
  Share2,
  MapPin,
  Lock,
  Globe2,
  BarChart3,
  Shield,
  FileEdit,
  ClipboardCheck,
};

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

type DashboardTab = 'architecture' | 'responsive' | 'seo';

export default function WhyAndFeatures() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('architecture');
  const [strategyImgFailed, setStrategyImgFailed] = useState(false);

  return (
    <>
      {/* SECTION 5: WHY CHOOSE NEW FLEET SOLUTIONS? */}
      <section className="py-20 lg:py-24 bg-[#F3F5FC]/70 border-y border-slate-200/70">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#1B1A66]">
              Why Choose New Fleet Solutions?
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10152C]">
              Why Businesses Choose NFS.
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Side: Illustrative Website Dashboard & Agency Preview */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: REVEAL_EASE }}
              className="lg:col-span-5 flex flex-col"
            >
              <div className="flex-1 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col justify-between gap-5">
                <div className="space-y-4">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <div className="font-display text-sm font-bold text-[#10152C]">
                        NFS Project Delivery Blueprint
                      </div>
                      <div className="text-xs text-slate-500">
                        Structured around business goals
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#1B1A66]">
                      Ready to Launch
                    </span>
                  </div>

                  {/* Interactive Tab Control */}
                  <div
                    role="group"
                    aria-label="Inspect NFS build blueprint"
                    className="grid grid-cols-3 gap-1 p-1 bg-[#F5F6FA] rounded-lg border border-slate-200/70"
                  >
                    {(
                      [
                        { id: 'architecture', label: 'Strategy' },
                        { id: 'responsive', label: 'Responsive' },
                        { id: 'seo', label: 'SEO Ready' },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-1.5 px-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                          activeTab === tab.id
                            ? 'bg-white text-[#1B1A66] shadow-xs'
                            : 'text-slate-600 hover:text-[#10152C]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Visual Content */}
                  {activeTab === 'architecture' && (
                    <div className="space-y-3">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-[#F5F6FA]">
                        {!strategyImgFailed ? (
                          <img
                            src="/src/assets/images/nfs_strategy_workspace_1795040101213.jpg"
                            alt="New Fleet Solutions team reviewing responsive website wireframes and layout architecture"
                            referrerPolicy="no-referrer"
                            onError={() => setStrategyImgFailed(true)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#1B1A66] text-white flex items-center justify-center p-6 text-center text-sm font-medium">
                            New Fleet Solutions Strategy & Design Studio
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-[#F5F6FA] border border-slate-200/60">
                          <div className="text-xs text-slate-500">Design Focus</div>
                          <div className="font-display text-sm font-bold text-[#10152C] mt-0.5">
                            Brand-Aligned UI
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#F5F6FA] border border-slate-200/60">
                          <div className="text-xs text-slate-500">Conversion</div>
                          <div className="font-display text-sm font-bold text-[#10152C] mt-0.5">
                            Clear CTA Paths
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'responsive' && (
                    <div className="space-y-3 bg-[#F5F6FA] p-4 rounded-xl border border-slate-200/70">
                      <div className="text-xs font-semibold text-[#10152C]">
                        Multi-Device Layout Verification
                      </div>
                      {[
                        { device: 'Desktop Wide', width: '1280px+', status: 'Fluid Grid' },
                        { device: 'Tablet Portrait', width: '768px', status: 'Adaptive Columns' },
                        { device: 'Mobile Viewport', width: '375px', status: 'Touch-Ready UI' },
                      ].map((row) => (
                        <div
                          key={row.device}
                          className="bg-white rounded-lg p-3 border border-slate-200/80 flex items-center justify-between gap-2"
                        >
                          <div>
                            <div className="text-xs font-semibold text-[#10152C]">
                              {row.device}
                            </div>
                            <div className="text-[11px] font-mono text-slate-500 tabular-nums">
                              {row.width}
                            </div>
                          </div>
                          <span className="text-xs font-medium text-[#1B1A66]">
                            {row.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'seo' && (
                    <div className="space-y-3 bg-[#F5F6FA] p-4 rounded-xl border border-slate-200/70">
                      <div className="text-xs font-semibold text-[#10152C]">
                        Included Technical Foundation
                      </div>
                      {[
                        'Semantic H1–H3 Heading Hierarchy',
                        'Custom Meta Title & Description Tags',
                        'XML Sitemap & Robots.txt Ready',
                        'Compressed Images & Alt Attributes',
                      ].map((check) => (
                        <div
                          key={check}
                          className="bg-white rounded-lg p-3 border border-slate-200/80 flex items-center gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#1B1A66] shrink-0" />
                          <span className="text-xs font-medium text-[#10152C]">
                            {check}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Transparent Packages: $300 &amp; $600</span>
                  <a
                    href="#pricing"
                    className="font-semibold text-[#1B1A66] hover:underline"
                  >
                    Compare Plans
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Six Key Advantages */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {ADVANTAGES.map((adv, idx) => (
                <motion.div
                  key={adv.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: (idx % 2) * 0.06,
                    ease: REVEAL_EASE,
                  }}
                  className="bg-white rounded-xl p-6 border border-slate-200/90 flex flex-col justify-between gap-3 hover:border-[#1B1A66]/35 transition-colors"
                >
                  <span className="font-mono text-xs font-semibold text-[#6B78E8] tabular-nums">
                    {adv.number}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#10152C] mb-1.5">
                      {adv.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: IMPORTANT WEBSITE FEATURES */}
      <section id="features" className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: REVEAL_EASE }}
            className="max-w-2xl mb-12 space-y-3"
          >
            <p className="text-xs font-semibold tracking-wider uppercase text-[#1B1A66]">
              Important Website Features
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10152C]">
              Powerful Features. Better Website Experiences.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WEBSITE_FEATURES.map((feat, idx) => {
              const Icon = FEATURE_ICONS[feat.iconName];
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.4,
                    delay: (idx % 4) * 0.05,
                    ease: REVEAL_EASE,
                  }}
                  className="group p-5 rounded-xl bg-[#F5F6FA]/70 border border-slate-200/80 hover:bg-white hover:border-[#1B1A66]/40 hover:shadow-sm transition-colors duration-150 space-y-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-[#1B1A66] group-hover:bg-[#1B1A66] group-hover:text-white group-hover:border-[#1B1A66] flex items-center justify-center transition-colors duration-150">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-sm font-bold text-[#10152C]">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feat.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: ON-PAGE SEO – INCLUDED WITH WEBSITE DEVELOPMENT */}
      <section
        id="seo"
        className="py-20 lg:py-24 bg-[#10152C] text-white relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 w-[520px] h-[520px] rounded-full bg-[#1B1A66]/50 blur-3xl -translate-y-1/3 translate-x-1/4"
        />

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Intro + Live Search Preview */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#6B78E8]">
                  On-Page SEO Included
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  More Than Beautiful Design. Built with SEO in Mind.
                </h2>
                <p className="text-base text-slate-300 leading-relaxed">
                  We don&apos;t just build websites that look good. We create
                  search-engine-friendly website foundations to help your business improve
                  its online visibility.
                </p>
              </div>

              {/* Search Result Snippet Preview Card */}
              <div className="bg-white rounded-xl p-5 text-[#10152C] shadow-lg space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-500 border-b border-slate-100 pb-2.5">
                  <Search className="w-3.5 h-3.5 text-[#1B1A66]" />
                  <span>Search Engine Listing Preview</span>
                </div>
                <div className="text-xs text-slate-500 font-mono truncate">
                  https://yourcompany.com/services
                </div>
                <div className="font-display text-base font-bold text-[#1B1A66] leading-snug">
                  Your Business Name | Professional Services &amp; Solutions
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Custom meta titles, clear descriptions, clean heading tags, and
                  compressed assets structured for search engine indexing.
                </p>
              </div>

              {/* Explicit Scope Clarification Note */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="font-semibold text-white">Note: </strong>
                On-page SEO setup is included in both website packages. Ongoing SEO
                campaigns, backlink building, advanced SEO, and guaranteed search
                rankings are not included.
              </div>
            </div>

            {/* Right 14 On-Page SEO Checklist Items */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: REVEAL_EASE }}
              className="lg:col-span-7"
            >
              <div className="bg-white/[0.04] border border-white/12 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <h3 className="font-display text-lg font-bold text-white">
                    14-Point On-Page SEO Foundation
                  </h3>
                  <span className="text-xs font-medium text-[#6B78E8]">
                    Included in Both Packages
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                  {ON_PAGE_SEO_ITEMS.map((item, idx) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-md bg-[#1B1A66] border border-[#6B78E8]/40 text-[#6B78E8] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <div className="text-sm text-slate-200 leading-snug">
                        <span className="font-mono text-[11px] text-slate-400 mr-1.5 tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
