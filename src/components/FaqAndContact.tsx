import { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { FAQ_ITEMS, type PackageOption } from '../data/nfsData';
import { ProjectInquiryForm } from './InquiryModal';
import { CalendlyScheduler } from './CalendlyScheduler';

interface FaqAndContactProps {
  onOpenInquiry: (pkg?: PackageOption) => void;
  onOpenCalendly: (pkg?: PackageOption) => void;
  selectedPackage: PackageOption;
  selectedWebsiteType: string;
}

export default function FaqAndContact({
  onOpenInquiry,
  onOpenCalendly,
  selectedPackage,
  selectedWebsiteType,
}: FaqAndContactProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [ctaBgFailed, setCtaBgFailed] = useState(false);
  const [contactTab, setContactTab] = useState<'form' | 'calendly'>('form');

  return (
    <>
      {/* SECTION 10: FREQUENTLY ASKED QUESTIONS */}
      <section
        id="faq"
        className="py-20 lg:py-24 bg-[#F5F6FA] border-t border-slate-200/70"
      >
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#1B1A66]">
              Frequently Asked Questions
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10152C]">
              Common Questions Answered.
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.question}
                  className="bg-white rounded-xl border border-slate-200/90 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F3F5FC]/40 transition-colors focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1B1A66]"
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-[#10152C]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#1B1A66] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-3 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 11: FINAL CALL TO ACTION */}
      <section className="relative py-20 lg:py-24 bg-[#1B1A66] text-white overflow-hidden">
        {/* Background generated architectural image + measured contrast scrim */}
        {!ctaBgFailed && (
          <img
            src="/src/assets/images/cta_royal_architecture_1795040100957.jpg"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            onError={() => setCtaBgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#10152C]/90 via-[#1B1A66]/85 to-[#1B1A66]/75"
        />

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
                Ready to Build a Website That Works for Your Business?
              </h2>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-[54ch]">
                Let&apos;s create a professional online presence that reflects your
                brand, connects with your audience, and supports your business growth.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenInquiry()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold bg-white text-[#1B1A66] hover:bg-[#F3F5FC] rounded-xl shadow-md transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Start Your Website Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCalendly()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Talk to Our Team</span>
                </button>
              </div>
            </div>

            {/* Subtle Website Mockup Illustration in Background/Right */}
            <div className="lg:col-span-5 hidden sm:block" aria-hidden="true">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
                <div className="bg-white rounded-xl overflow-hidden text-[#10152C]">
                  <div className="bg-[#10152C] px-3 py-2 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-500" />
                      <span className="w-2 h-2 rounded-full bg-slate-500" />
                      <span className="w-2 h-2 rounded-full bg-slate-500" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-300">
                      launch-ready.newfleetsolutions.com
                    </span>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-28 bg-[#1B1A66] rounded-xs" />
                      <div className="h-6 w-20 bg-[#1B1A66] rounded-md" />
                    </div>
                    <div className="p-4 rounded-xl bg-[#F3F5FC] space-y-2">
                      <div className="h-3.5 w-4/5 bg-[#10152C] rounded-xs" />
                      <div className="h-2.5 w-full bg-slate-300 rounded-xs" />
                      <div className="h-2.5 w-2/3 bg-slate-300 rounded-xs" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg border border-slate-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1B1A66]" />
                        <span className="text-xs font-semibold">Mobile Ready</span>
                      </div>
                      <div className="p-3 rounded-lg border border-slate-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1B1A66]" />
                        <span className="text-xs font-semibold">On-Page SEO</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED PROJECT INQUIRY & LEAD CAPTURE SECTION */}
      <section id="contact" className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#1B1A66]">
                Start Your Project
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10152C]">
                Tell Us About Your Website Requirements.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Share your business details, choose the package that fits your scope,
                and our team will coordinate with you to plan and launch your website.
              </p>

              <div className="pt-2 space-y-4 border-t border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F3F5FC] text-[#1B1A66] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      Direct Coordination
                    </div>
                    <div className="text-sm font-semibold text-[#10152C]">
                      Dedicated Project Discovery &amp; Review
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F3F5FC] text-[#1B1A66] flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      Book a Discovery Call
                    </div>
                    <div className="text-sm font-semibold text-[#10152C]">
                      15-Min Calendly Consultation Available
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F3F5FC] text-[#1B1A66] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      Clear Pricing
                    </div>
                    <div className="text-sm font-semibold text-[#10152C] tabular-nums">
                      $300 Single-Page · $600 Multi-Page
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {/* Segmented Toggle: Project Form vs Calendly Discovery Call */}
              <div
                role="tablist"
                aria-label="Choose how to contact New Fleet Solutions"
                className="inline-flex items-center gap-1 p-1 bg-[#F5F6FA] rounded-xl border border-slate-200/80"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={contactTab === 'form'}
                  onClick={() => setContactTab('form')}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    contactTab === 'form'
                      ? 'bg-[#1B1A66] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#10152C]'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Project Inquiry Form</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={contactTab === 'calendly'}
                  onClick={() => setContactTab('calendly')}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    contactTab === 'calendly'
                      ? 'bg-[#1B1A66] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#10152C]'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Call (Calendly)</span>
                </button>
              </div>

              {contactTab === 'form' ? (
                <div className="bg-[#F5F6FA] rounded-2xl border border-slate-200/90 p-6 sm:p-8">
                  <ProjectInquiryForm
                    initialPackage={selectedPackage}
                    initialWebsiteType={selectedWebsiteType}
                  />
                </div>
              ) : (
                <CalendlyScheduler initialPackage={selectedPackage} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
