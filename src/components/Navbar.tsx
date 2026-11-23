import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { PackageOption } from '../data/nfsData';

interface NavbarProps {
  onOpenInquiry: (pkg?: PackageOption) => void;
}

export function NfsLogo({ inverted = false }: { inverted?: boolean }) {
  return (
    <img
      src={
        inverted
          ? '/assets/aistudio/new_fleet_horizontal_w_6d60e94d.png'
          : '/assets/aistudio/new_fleet_horizontal__1__ef3ea5c9.png'
      }
      alt="New Fleet — Integrated Logistic Solutions"
      className={`${
        inverted ? 'h-10 sm:h-11' : 'h-8 sm:h-9'
      } w-auto object-contain select-none shrink-0`}
      decoding="async"
    />
  );
}

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Websites', href: '#websites' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar({ onOpenInquiry }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B1A66] rounded-md shrink-0"
          aria-label="New Fleet Solutions home"
        >
          <NfsLogo />
        </a>

        {/* Zone 2: Single-line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#1B1A66] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#1B1A66]/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B1A66]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenInquiry()}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#1B1A66] hover:bg-[#141352] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B1A66]"
          >
            Get Started
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#10152C] hover:bg-[#F3F5FC] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1B1A66]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-[#1B1A66] hover:bg-[#F3F5FC] rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#1B1A66] hover:bg-[#141352] rounded-lg transition-colors cursor-pointer"
            >
              Get Your Website Today
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
