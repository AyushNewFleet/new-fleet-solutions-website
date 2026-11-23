import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { WEBSITE_TYPES, type PackageOption } from './data/nfsData';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesAndTypes from './components/ServicesAndTypes';
import WhyAndFeatures from './components/WhyAndFeatures';
import PricingAndProcess from './components/PricingAndProcess';
import FaqAndContact from './components/FaqAndContact';
import InquiryModal from './components/InquiryModal';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import ScrollProgressBar from './components/ScrollProgressBar';
import CalendlyModal from './components/CalendlyScheduler';
import SeoHeadManager from './components/SeoHeadManager';
import PerformanceImpactBar from './components/PerformanceImpactBar';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageOption>(
    'Multi-Page Website ($600)'
  );
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<string>(
    'Corporate & Business Websites'
  );
  const [seoPackage, setSeoPackage] = useState<PackageOption | null>(null);
  const [seoWebsiteType, setSeoWebsiteType] = useState<string | null>(null);
  const [activeHash, setActiveHash] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pkgParam = params.get('package');
    if (pkgParam === 'single-page') {
      setSelectedPackage('Single-Page Website ($300)');
      setSeoPackage('Single-Page Website ($300)');
    } else if (pkgParam === 'multi-page') {
      setSelectedPackage('Multi-Page Website ($600)');
      setSeoPackage('Multi-Page Website ($600)');
    }

    const typeParam = params.get('type');
    if (typeParam) {
      const matched = WEBSITE_TYPES.find((t) => t.id === typeParam);
      if (matched) {
        setSelectedWebsiteType(matched.title);
        setSeoWebsiteType(matched.title);
      }
    }

    setActiveHash(window.location.hash);
    const onHashChange = () => {
      setActiveHash(window.location.hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function handleOpenInquiry(pkg?: PackageOption) {
    if (pkg) {
      setSelectedPackage(pkg);
      setSeoPackage(pkg);
      setSeoWebsiteType(null);
    }
    setModalOpen(true);
  }

  function handleOpenCalendly(pkg?: PackageOption) {
    if (pkg) {
      setSelectedPackage(pkg);
      setSeoPackage(pkg);
      setSeoWebsiteType(null);
    }
    setCalendlyOpen(true);
  }

  function handleSelectWebsiteType(websiteType: string) {
    setSelectedWebsiteType(websiteType);
    setSeoWebsiteType(websiteType);
    setSeoPackage(null);
    setModalOpen(true);
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#10152C]">
        <SeoHeadManager
          activePackage={seoPackage}
          activeWebsiteType={seoWebsiteType}
          activeHash={activeHash}
        />
        <ScrollProgressBar />
        <Navbar onOpenInquiry={handleOpenInquiry} />

        <main className="flex-1">
          <HeroSection onOpenInquiry={handleOpenInquiry} />

          <PerformanceImpactBar />

          <ServicesAndTypes onSelectWebsiteType={handleSelectWebsiteType} />

          <WhyAndFeatures />

          <PricingAndProcess
            onSelectPackage={handleOpenInquiry}
            onOpenCalendly={handleOpenCalendly}
          />

          <FaqAndContact
            onOpenInquiry={handleOpenInquiry}
            onOpenCalendly={handleOpenCalendly}
            selectedPackage={selectedPackage}
            selectedWebsiteType={selectedWebsiteType}
          />
        </main>

        <Footer />

        <InquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          selectedPackage={selectedPackage}
          selectedWebsiteType={selectedWebsiteType}
        />

        <CalendlyModal
          isOpen={calendlyOpen}
          onClose={() => setCalendlyOpen(false)}
          initialPackage={selectedPackage}
        />

        <WhatsAppWidget
          onOpenInquiry={handleOpenInquiry}
          onOpenCalendly={handleOpenCalendly}
        />
      </div>
    </MotionConfig>
  );
}
