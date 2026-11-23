import { useEffect, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  MessageSquare,
  Send,
  X,
} from 'lucide-react';
import { WEBSITE_TYPES, type PackageOption } from '../data/nfsData';
import { CalendlyScheduler } from './CalendlyScheduler';

export interface InquiryFormValues {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  websiteType: string;
  selectedPackage: PackageOption;
  requirements: string;
}

interface InquiryFormProps {
  initialPackage?: PackageOption;
  initialWebsiteType?: string;
  compact?: boolean;
  onSuccessClose?: () => void;
}

export function ProjectInquiryForm({
  initialPackage = 'Multi-Page Website ($600)',
  initialWebsiteType = 'Corporate & Business Websites',
  compact = false,
  onSuccessClose,
}: InquiryFormProps) {
  const [form, setForm] = useState<InquiryFormValues>({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    websiteType: initialWebsiteType,
    selectedPackage: initialPackage,
    requirements: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormValues, string>>>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      selectedPackage: initialPackage,
      websiteType: initialWebsiteType,
    }));
  }, [initialPackage, initialWebsiteType]);

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof InquiryFormValues, string>> = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid business email address.';
    }
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!form.phone.trim() || phoneDigits.length < 7) {
      nextErrors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }
    if (!form.businessName.trim()) {
      nextErrors.businessName = 'Please enter your business or organization name.';
    }
    if (!form.requirements.trim() || form.requirements.trim().length < 10) {
      nextErrors.requirements =
        'Please share a brief description of your project requirements (at least 10 characters).';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const referenceCode = `NFS-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(referenceCode);
  }

  if (submittedRef) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-[#F3F5FC] border border-[#1B1A66]/20 rounded-xl p-6 sm:p-8 text-center space-y-4"
      >
        <div className="w-12 h-12 rounded-full bg-[#1B1A66] text-white flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-1.5">
          <h3 className="font-display text-xl font-bold text-[#10152C]">
            Project Inquiry Received
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-[#10152C]">{form.name}</strong>. Our
            team has logged your request for{' '}
            <strong className="text-[#10152C]">{form.businessName}</strong> (
            <span className="font-medium text-[#1B1A66]">{form.selectedPackage}</span>
            ) and will reach out to <span className="font-medium">{form.email}</span>.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4 text-left text-xs space-y-1.5 max-w-md mx-auto">
          <div className="flex justify-between">
            <span className="text-slate-500">Inquiry Reference</span>
            <span className="font-mono font-semibold text-[#1B1A66] tabular-nums">
              {submittedRef}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Website Category</span>
            <span className="font-medium text-[#10152C]">{form.websiteType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Package Selected</span>
            <span className="font-medium text-[#10152C]">{form.selectedPackage}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setSubmittedRef(null);
              setForm({
                name: '',
                email: '',
                phone: '',
                businessName: '',
                websiteType: initialWebsiteType,
                selectedPackage: initialPackage,
                requirements: '',
              });
            }}
            className="px-4 py-2 text-xs font-semibold text-[#1B1A66] bg-white border border-slate-300 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            Submit Another Request
          </button>
          {onSuccessClose && (
            <button
              type="button"
              onClick={onSuccessClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1B1A66] hover:bg-[#141352] rounded-lg cursor-pointer"
            >
              Done
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className={`grid ${compact ? 'sm:grid-cols-2' : 'md:grid-cols-2'} gap-4`}>
        {/* Full Name */}
        <div>
          <label
            htmlFor={compact ? 'modal-name' : 'contact-name'}
            className="block text-xs font-semibold text-[#10152C] mb-1.5"
          >
            Your Name <span className="text-[#1B1A66]">*</span>
          </label>
          <input
            id={compact ? 'modal-name' : 'contact-name'}
            type="text"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            placeholder="Alex Morgan"
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#10152C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B1A66]/20 ${
              errors.name
                ? 'border-red-600 focus:border-red-600'
                : 'border-slate-300 focus:border-[#1B1A66]'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Business Email */}
        <div>
          <label
            htmlFor={compact ? 'modal-email' : 'contact-email'}
            className="block text-xs font-semibold text-[#10152C] mb-1.5"
          >
            Business Email <span className="text-[#1B1A66]">*</span>
          </label>
          <input
            id={compact ? 'modal-email' : 'contact-email'}
            type="email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            placeholder="alex@company.com"
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#10152C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B1A66]/20 ${
              errors.email
                ? 'border-red-600 focus:border-red-600'
                : 'border-slate-300 focus:border-[#1B1A66]'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor={compact ? 'modal-phone' : 'contact-phone'}
            className="block text-xs font-semibold text-[#10152C] mb-1.5"
          >
            Phone Number <span className="text-[#1B1A66]">*</span>
          </label>
          <input
            id={compact ? 'modal-phone' : 'contact-phone'}
            type="tel"
            value={form.phone}
            onChange={(e) => {
              setForm({ ...form, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: undefined });
            }}
            placeholder="+1 (555) 234-5678"
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#10152C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B1A66]/20 ${
              errors.phone
                ? 'border-red-600 focus:border-red-600'
                : 'border-slate-300 focus:border-[#1B1A66]'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Business Name */}
        <div>
          <label
            htmlFor={compact ? 'modal-business' : 'contact-business'}
            className="block text-xs font-semibold text-[#10152C] mb-1.5"
          >
            Business Name <span className="text-[#1B1A66]">*</span>
          </label>
          <input
            id={compact ? 'modal-business' : 'contact-business'}
            type="text"
            value={form.businessName}
            onChange={(e) => {
              setForm({ ...form, businessName: e.target.value });
              if (errors.businessName) setErrors({ ...errors, businessName: undefined });
            }}
            placeholder="Northstar Logistics LLC"
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#10152C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B1A66]/20 ${
              errors.businessName
                ? 'border-red-600 focus:border-red-600'
                : 'border-slate-300 focus:border-[#1B1A66]'
            }`}
          />
          {errors.businessName && (
            <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.businessName}</span>
            </p>
          )}
        </div>

        {/* Website Type */}
        <div>
          <label
            htmlFor={compact ? 'modal-type' : 'contact-type'}
            className="block text-xs font-semibold text-[#10152C] mb-1.5"
          >
            Website Type
          </label>
          <select
            id={compact ? 'modal-type' : 'contact-type'}
            value={form.websiteType}
            onChange={(e) => setForm({ ...form, websiteType: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-[#10152C] focus:outline-none focus:border-[#1B1A66] focus:ring-2 focus:ring-[#1B1A66]/20"
          >
            {WEBSITE_TYPES.map((type) => (
              <option key={type.id} value={type.title}>
                {type.title}
              </option>
            ))}
            <option value="Website Redesign">Website Redesign</option>
            <option value="Custom Project">Custom Website Project</option>
          </select>
        </div>

        {/* Selected Package */}
        <div>
          <label
            htmlFor={compact ? 'modal-package' : 'contact-package'}
            className="block text-xs font-semibold text-[#10152C] mb-1.5"
          >
            Selected Package
          </label>
          <select
            id={compact ? 'modal-package' : 'contact-package'}
            value={form.selectedPackage}
            onChange={(e) =>
              setForm({
                ...form,
                selectedPackage: e.target.value as PackageOption,
              })
            }
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-[#10152C] focus:outline-none focus:border-[#1B1A66] focus:ring-2 focus:ring-[#1B1A66]/20"
          >
            <option value="Single-Page Website ($300)">
              Single-Page Website ($300)
            </option>
            <option value="Multi-Page Website ($600)">
              Multi-Page Website ($600)
            </option>
            <option value="Custom / Consultation">Custom / Need Consultation</option>
          </select>
        </div>
      </div>

      {/* Project Requirements */}
      <div>
        <label
          htmlFor={compact ? 'modal-requirements' : 'contact-requirements'}
          className="block text-xs font-semibold text-[#10152C] mb-1.5"
        >
          Project Requirements <span className="text-[#1B1A66]">*</span>
        </label>
        <textarea
          id={compact ? 'modal-requirements' : 'contact-requirements'}
          rows={compact ? 3 : 4}
          value={form.requirements}
          onChange={(e) => {
            setForm({ ...form, requirements: e.target.value });
            if (errors.requirements) setErrors({ ...errors, requirements: undefined });
          }}
          placeholder="Tell us about your business, target pages or sections, and any reference preferences..."
          className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#10152C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B1A66]/20 ${
            errors.requirements
              ? 'border-red-600 focus:border-red-600'
              : 'border-slate-300 focus:border-[#1B1A66]'
          }`}
        />
        {errors.requirements && (
          <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.requirements}</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-[#1B1A66] hover:bg-[#141352] text-white font-semibold text-sm sm:text-base transition-colors duration-150 inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B1A66]"
      >
        <Send className="w-4 h-4" />
        <span>Submit Website Project Inquiry</span>
      </button>
    </form>
  );
}

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: PackageOption;
  selectedWebsiteType: string;
  initialTab?: 'form' | 'calendly';
}

export default function InquiryModal({
  isOpen,
  onClose,
  selectedPackage,
  selectedWebsiteType,
  initialTab = 'form',
}: InquiryModalProps) {
  const [activeTab, setActiveTab] = useState<'form' | 'calendly'>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10152C]/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      onClick={onClose}
    >
      <div
        className={`w-full ${
          activeTab === 'calendly' ? 'max-w-3xl' : 'max-w-2xl'
        } bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-8 transition-all duration-150`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#1B1A66] px-6 py-5 text-white flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-[#CBD5FF]">
              New Fleet Solutions · {selectedPackage}
            </div>
            <h2
              id="inquiry-modal-title"
              className="font-display text-xl font-bold mt-0.5"
            >
              Start Your Website Project
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project inquiry modal"
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher: Project Form vs Calendly Discovery Call */}
        <div className="px-6 pt-4 pb-0 border-b border-slate-200 bg-[#F5F6FA]">
          <div
            role="tablist"
            aria-label="Get Started options"
            className="inline-flex items-center gap-1 p-1 bg-white rounded-t-xl border border-b-0 border-slate-200/80"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'form'}
              onClick={() => setActiveTab('form')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'form'
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
              aria-selected={activeTab === 'calendly'}
              onClick={() => setActiveTab('calendly')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'calendly'
                  ? 'bg-[#1B1A66] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#10152C]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Call (Calendly)</span>
            </button>
          </div>
        </div>

        <div className={`p-6 sm:p-7 ${activeTab === 'calendly' ? 'bg-[#F5F6FA]' : 'bg-white'}`}>
          {activeTab === 'form' ? (
            <ProjectInquiryForm
              initialPackage={selectedPackage}
              initialWebsiteType={selectedWebsiteType}
              compact
              onSuccessClose={onClose}
            />
          ) : (
            <CalendlyScheduler
              initialPackage={selectedPackage}
              onBookedClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
