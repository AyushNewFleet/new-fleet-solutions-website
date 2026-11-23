import { useEffect, useState } from 'react';
import { Globe, Linkedin, Mail, Share2, X } from 'lucide-react';
import { NfsLogo } from './Navbar';

type InfoDocType = 'about' | 'privacy' | 'terms' | null;

export default function Footer() {
  const [activeDoc, setActiveDoc] = useState<InfoDocType>(null);

  useEffect(() => {
    if (!activeDoc) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDoc(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeDoc]);

  return (
    <>
      <footer className="bg-[#10152C] text-slate-300 border-t border-slate-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            {/* Brand & Intro */}
            <div className="md:col-span-5 space-y-4">
              <NfsLogo inverted />
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                New Fleet Solutions delivers modern, responsive, and SEO-ready website
                design and development services tailored for growing businesses,
                startups, and service organizations.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="#contact"
                  aria-label="Contact New Fleet Solutions via inquiry form"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-[#1B1A66] hover:border-[#6B78E8]/50 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="#top"
                  aria-label="New Fleet Solutions website"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-[#1B1A66] hover:border-[#6B78E8]/50 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  aria-label="New Fleet Solutions LinkedIn"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-[#1B1A66] hover:border-[#6B78E8]/50 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#websites"
                  aria-label="Explore New Fleet Solutions social integrations"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-[#1B1A66] hover:border-[#6B78E8]/50 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Services Column */}
            <div className="md:col-span-4 space-y-3">
              <h3 className="font-display text-sm font-bold text-white">
                Services &amp; Packages
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    Website Development Services
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Single-Page Website
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Multi-Page Website
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    Website Redesign
                  </a>
                </li>
                <li>
                  <a href="#seo" className="hover:text-white transition-colors">
                    On-Page SEO
                  </a>
                </li>
              </ul>
            </div>

            {/* Company & Legal Column */}
            <div className="md:col-span-3 space-y-3">
              <h3 className="font-display text-sm font-bold text-white">
                Company &amp; Legal
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveDoc('about')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveDoc('privacy')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveDoc('terms')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Terms &amp; Conditions
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>&copy; 2026 New Fleet Solutions. All rights reserved.</p>
            <p>Website Design &amp; Development Services</p>
          </div>
        </div>
      </footer>

      {/* Clean Info Modal for About Us / Privacy Policy / Terms & Conditions */}
      {activeDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10152C]/70 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveDoc(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden text-[#10152C]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-[#1B1A66] text-white flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">
                {activeDoc === 'about' && 'About New Fleet Solutions'}
                {activeDoc === 'privacy' && 'Privacy Policy'}
                {activeDoc === 'terms' && 'Terms & Conditions'}
              </h2>
              <button
                type="button"
                onClick={() => setActiveDoc(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-3 text-sm text-slate-600 leading-relaxed">
              {activeDoc === 'about' && (
                <>
                  <p>
                    New Fleet Solutions (NFS) provides structured, modern website design
                    and development services tailored for businesses that want reliable
                    digital execution without unnecessary complexity.
                  </p>
                  <p>
                    From streamlined $300 single-page websites to complete $600
                    multi-page business experiences, every build prioritizes responsive
                    layouts, clean brand presentation, and foundational on-page SEO.
                  </p>
                </>
              )}
              {activeDoc === 'privacy' && (
                <>
                  <p>
                    Information submitted through New Fleet Solutions inquiry forms
                    (including your name, business email, phone number, business name,
                    and project requirements) is used solely to review your request and
                    coordinate website development services.
                  </p>
                  <p>
                    We do not sell or rent contact information to third parties. You may
                    request deletion of your inquiry details at any time by contacting
                    our team.
                  </p>
                </>
              )}
              {activeDoc === 'terms' && (
                <>
                  <p>
                    Single-page ($300) and multi-page ($600) website packages cover
                    standard design, responsive development, and foundational on-page
                    SEO setup as outlined on this page.
                  </p>
                  <p>
                    Additional pages, custom software functionality, third-party
                    integrations, ongoing SEO campaigns, domain registration, and
                    hosting subscriptions are quoted and billed separately upon mutual
                    agreement.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
