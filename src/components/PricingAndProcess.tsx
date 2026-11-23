import { motion } from 'motion/react';
import { ArrowRight, Calendar, Check, Minus } from 'lucide-react';
import {
  COMPARISON_ROWS,
  MULTI_PAGE_FEATURES,
  PROCESS_STEPS,
  SINGLE_PAGE_FEATURES,
  type PackageOption,
} from '../data/nfsData';

interface PricingAndProcessProps {
  onSelectPackage: (pkg: PackageOption) => void;
  onOpenCalendly: (pkg: PackageOption) => void;
}

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

export default function PricingAndProcess({
  onSelectPackage,
  onOpenCalendly,
}: PricingAndProcessProps) {
  return (
    <>
      {/* SECTION 8: SINGLE-PAGE VS MULTI-PAGE WEBSITE */}
      <section
        id="pricing"
        className="py-20 lg:py-24 bg-[#F5F6FA] border-y border-slate-200/70"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#1B1A66]">
              Transparent Packages
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10152C]">
              Choose the Right Website for Your Business.
            </h2>
            <p className="text-base text-slate-600">
              Clear, fixed starting packages built with responsive design and on-page
              SEO foundations included.
            </p>
          </div>

          {/* Side-by-Side Package Cards */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16 items-stretch">
            {/* PACKAGE 1: SINGLE-PAGE WEBSITE */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, ease: REVEAL_EASE }}
              className="bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-9 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Package 01
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#10152C]">
                      Single-Page Website
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-display text-4xl font-extrabold text-[#10152C] tabular-nums">
                      $300
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-600 mt-5 leading-relaxed">
                  Everything your business needs in one professionally designed page.
                </p>

                <div className="mt-4 p-4 rounded-xl bg-[#F5F6FA] border border-slate-200/70">
                  <div className="text-xs font-semibold text-[#10152C] mb-1">
                    Ideal For
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Startups, freelancers, small businesses, personal brands, and
                    businesses looking for a simple online presence.
                  </p>
                </div>

                <div className="mt-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    Included Features
                  </div>
                  <ul className="space-y-2.5">
                    {SINGLE_PAGE_FEATURES.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <Check className="w-4 h-4 text-[#1B1A66] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 space-y-2.5">
                <button
                  type="button"
                  onClick={() => onSelectPackage('Single-Page Website ($300)')}
                  className="w-full py-3.5 px-6 rounded-xl border-2 border-[#1B1A66] text-[#1B1A66] hover:bg-[#1B1A66] hover:text-white font-semibold text-sm sm:text-base transition-colors duration-150 inline-flex items-center justify-center gap-2 cursor-pointer tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B1A66]"
                >
                  <span>Get Started – $300</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCalendly('Single-Page Website ($300)')}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-slate-600 hover:text-[#1B1A66] hover:bg-[#F3F5FC] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Discovery Call (Calendly)</span>
                </button>
              </div>
            </motion.div>

            {/* PACKAGE 2: MULTI-PAGE WEBSITE (Subtle Premium Royal Blue Treatment) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: REVEAL_EASE }}
              className="bg-white rounded-2xl border-2 border-[#1B1A66] p-7 sm:p-9 shadow-md flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#1B1A66] mb-1">
                      Package 02 · Most Complete
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#10152C]">
                      Multi-Page Website
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-display text-4xl font-extrabold text-[#1B1A66] tabular-nums">
                      $600
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-600 mt-5 leading-relaxed">
                  A complete website experience with dedicated pages for your business,
                  services, and customers.
                </p>

                <div className="mt-4 p-4 rounded-xl bg-[#F3F5FC] border border-[#1B1A66]/15">
                  <div className="text-xs font-semibold text-[#1B1A66] mb-1">
                    Ideal For
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Growing businesses, professional companies, agencies, and
                    organizations requiring detailed information.
                  </p>
                </div>

                <div className="mt-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    Included Features
                  </div>
                  <ul className="space-y-2.5">
                    {MULTI_PAGE_FEATURES.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <Check className="w-4 h-4 text-[#1B1A66] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 space-y-2.5">
                <button
                  type="button"
                  onClick={() => onSelectPackage('Multi-Page Website ($600)')}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#1B1A66] hover:bg-[#141352] text-white font-semibold text-sm sm:text-base transition-colors duration-150 inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B1A66]"
                >
                  <span>Get Started – $600</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCalendly('Multi-Page Website ($600)')}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-slate-600 hover:text-[#1B1A66] hover:bg-[#F3F5FC] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Discovery Call (Calendly)</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Comparison Table */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="px-6 py-4 bg-[#10152C] text-white flex items-center justify-between">
              <h3 className="font-display text-base font-bold">
                Package Comparison
              </h3>
              <span className="text-xs text-slate-300">Side-by-Side Breakdown</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-[#F3F5FC]/60 text-xs font-semibold uppercase tracking-wider text-slate-600">
                    <th scope="col" className="py-3.5 px-6">
                      Feature
                    </th>
                    <th scope="col" className="py-3.5 px-6">
                      Single-Page
                    </th>
                    <th scope="col" className="py-3.5 px-6 text-[#1B1A66]">
                      Multi-Page
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {COMPARISON_ROWS.map((row) => (
                    <tr
                      key={row.feature}
                      className="hover:bg-[#F5F6FA]/70 transition-colors"
                    >
                      <td className="py-3.5 px-6 font-medium text-[#10152C]">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-6 text-slate-600 tabular-nums">
                        {row.singlePage === 'No' ? (
                          <span className="inline-flex items-center gap-1.5 text-slate-400">
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>No</span>
                          </span>
                        ) : (
                          row.singlePage
                        )}
                      </td>
                      <td className="py-3.5 px-6 font-semibold text-[#1B1A66] tabular-nums">
                        {row.multiPage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing Scope Clarification Note */}
          <p className="max-w-3xl mx-auto text-center text-xs sm:text-sm text-slate-500 mt-6 leading-relaxed">
            Additional pages, advanced functionality, premium integrations, hosting,
            domain registration, and third-party subscriptions may require separate
            charges.
          </p>
        </div>
      </section>

      {/* SECTION 9: HOW WE WORK */}
      <section id="process" className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 space-y-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#1B1A66]">
              How We Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10152C]">
              From Your Idea to a Live Website in Simple Steps.
            </h2>
          </div>

          <div className="relative">
            {/* Horizontal connecting line on desktop */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-7 left-6 right-6 h-px bg-slate-200"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
              {PROCESS_STEPS.map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.42,
                    delay: idx * 0.06,
                    ease: REVEAL_EASE,
                  }}
                  className="bg-[#F5F6FA]/70 rounded-xl p-6 border border-slate-200/80 lg:bg-white lg:border-slate-200/90 flex flex-col gap-4 relative"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#1B1A66] text-white font-mono text-base font-bold flex items-center justify-center tabular-nums shadow-xs relative z-10">
                    {item.step}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-bold text-[#10152C]">
                      {item.step} – {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
