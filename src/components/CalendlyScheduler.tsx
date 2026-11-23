import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Globe,
  Video,
  X,
} from 'lucide-react';
import type { PackageOption } from '../data/nfsData';

interface CalendlySchedulerProps {
  initialPackage?: PackageOption;
  onBookedClose?: () => void;
}

const TIME_SLOTS = [
  '09:30 AM',
  '10:30 AM',
  '11:30 AM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM',
];

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'UTC', label: 'Coordinated Universal Time (UTC)' },
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function buildMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  return cells;
}

function getNextWeekday(from: Date): Date {
  const candidate = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1);
  while (candidate.getDay() === 0 || candidate.getDay() === 6) {
    candidate.setDate(candidate.getDate() + 1);
  }
  return candidate;
}

function formatIcsDate(date: Date, timeSlot: string): string {
  const [timePart, meridiem] = timeSlot.split(' ');
  const [rawH, rawM] = timePart.split(':').map(Number);
  let hours = rawH;
  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;

  const start = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    rawM,
    0
  );
  const pad = (n: number) => String(n).padStart(2, '0');
  const y = start.getFullYear();
  const m = pad(start.getMonth() + 1);
  const d = pad(start.getDate());
  const hh = pad(start.getHours());
  const mm = pad(start.getMinutes());
  return `${y}${m}${d}T${hh}${mm}00`;
}

export function CalendlyScheduler({
  initialPackage = 'Multi-Page Website ($600)',
  onBookedClose,
}: CalendlySchedulerProps) {
  const externalCalendlyUrl = (
    import.meta.env.VITE_CALENDLY_URL as string | undefined
  )?.trim();

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const defaultSelected = useMemo(() => getNextWeekday(today), [today]);

  const [viewYear, setViewYear] = useState(defaultSelected.getFullYear());
  const [viewMonth, setViewMonth] = useState(defaultSelected.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(defaultSelected);
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  const [timezone, setTimezone] = useState<string>('America/New_York');
  const [step, setStep] = useState<'datetime' | 'details' | 'confirmed'>('datetime');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pkg, setPkg] = useState<PackageOption>(initialPackage);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    setPkg(initialPackage);
  }, [initialPackage]);

  if (externalCalendlyUrl) {
    const separator = externalCalendlyUrl.includes('?') ? '&' : '?';
    const embedSrc = `${externalCalendlyUrl}${separator}hide_gdpr_banner=1&primary_color=1b1a66`;
    return (
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <iframe
          title="Schedule a discovery call with New Fleet Solutions on Calendly"
          src={embedSrc}
          className="w-full h-[640px] border-0"
        />
      </div>
    );
  }

  const monthCells = buildMonthDays(viewYear, viewMonth);
  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  function isDateSelectable(date: Date): boolean {
    const day = date.getDay();
    if (day === 0 || day === 6) return false;
    return date.getTime() > today.getTime();
  }

  function handlePrevMonth() {
    if (viewYear === today.getFullYear() && viewMonth <= today.getMonth()) return;
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function handleNextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function handleConfirmBooking(e: FormEvent) {
    e.preventDefault();
    const nextErrors: { name?: string; email?: string } = {};
    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      nextErrors.email = 'Please enter a valid business email.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setBookingRef(`NFS-CAL-${Math.floor(100000 + Math.random() * 900000)}`);
    setStep('confirmed');
  }

  function handleDownloadIcs() {
    const startStamp = formatIcsDate(selectedDate, selectedTime);
    const [datePart, timePart] = startStamp.split('T');
    const hh = Number(timePart.slice(0, 2));
    const mm = Number(timePart.slice(2, 4)) + 15;
    const endH = hh + Math.floor(mm / 60);
    const endM = mm % 60;
    const endStamp = `${datePart}T${String(endH).padStart(2, '0')}${String(endM).padStart(2, '0')}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//New Fleet Solutions//Website Discovery Call//EN',
      'BEGIN:VEVENT',
      `UID:${bookingRef}@newfleetsolutions.com`,
      `DTSTART:${startStamp}`,
      `DTEND:${endStamp}`,
      'SUMMARY:15-Min Website Discovery Call - New Fleet Solutions',
      `DESCRIPTION:Package interest: ${pkg}. Reference: ${bookingRef}.`,
      'ORGANIZER;CN=New Fleet Solutions:mailto:developer@newfleetsolutions.com',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nfs-discovery-call-${bookingRef}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const canGoPrev = !(
    viewYear === today.getFullYear() && viewMonth <= today.getMonth()
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs grid md:grid-cols-12">
      {/* Left Host / Event Details Column */}
      <div className="md:col-span-5 bg-[#F3F5FC]/70 border-b md:border-b-0 md:border-r border-slate-200/80 p-6 flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#1B1A66]">
              New Fleet Solutions
            </span>
            <span className="text-[11px] font-medium text-slate-500">
              Calendly Scheduling
            </span>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold text-[#10152C]">
              15-Min Website Discovery Call
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Meet with our website team to review your business goals, compare the
              $300 Single-Page and $600 Multi-Page packages, and map out launch steps.
            </p>
          </div>

          <div className="space-y-2.5 pt-2 text-xs text-slate-700">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#1B1A66] shrink-0" />
              <span>15 minutes</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Video className="w-4 h-4 text-[#1B1A66] shrink-0" />
              <span>Web conferencing details provided upon confirmation</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#1B1A66] shrink-0" />
              <span>
                {TIMEZONES.find((tz) => tz.value === timezone)?.label ?? timezone}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200/80 text-xs text-slate-500">
          Selected Slot:{' '}
          <span className="font-semibold text-[#10152C]">
            {selectedDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}{' '}
            · {selectedTime}
          </span>
        </div>
      </div>

      {/* Right Interactive Calendar / Form / Confirmation Column */}
      <div className="md:col-span-7 p-6">
        {step === 'datetime' && (
          <div className="space-y-5">
            {/* Month Header & Controls */}
            <div className="flex items-center justify-between">
              <h4 className="font-display text-sm font-bold text-[#10152C]">
                {monthLabel}
              </h4>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={!canGoPrev}
                  aria-label="Previous month"
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#F3F5FC] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  aria-label="Next month"
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#F3F5FC] cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div>
              <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                {WEEKDAYS.map((day) => (
                  <div
                    key={day}
                    className="text-[11px] font-semibold text-slate-400 py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {monthCells.map((cell, idx) => {
                  if (!cell) {
                    return <div key={`empty-${idx}`} className="h-9" />;
                  }
                  const selectable = isDateSelectable(cell);
                  const isSelected =
                    cell.getFullYear() === selectedDate.getFullYear() &&
                    cell.getMonth() === selectedDate.getMonth() &&
                    cell.getDate() === selectedDate.getDate();

                  return (
                    <button
                      key={cell.toISOString()}
                      type="button"
                      disabled={!selectable}
                      onClick={() => setSelectedDate(cell)}
                      className={`h-9 rounded-lg text-xs font-semibold tabular-nums transition-colors ${
                        isSelected
                          ? 'bg-[#1B1A66] text-white shadow-xs cursor-pointer'
                          : selectable
                            ? 'bg-[#F3F5FC]/70 text-[#1B1A66] hover:bg-[#1B1A66]/15 cursor-pointer'
                            : 'text-slate-300 cursor-not-allowed'
                      }`}
                    >
                      {cell.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timezone + Slots */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#10152C]">
                  Available Times
                </span>
                <select
                  aria-label="Select timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-[#F5F6FA] text-[#10152C] focus:outline-none focus:border-[#1B1A66]"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const active = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-2 rounded-lg text-xs font-semibold tabular-nums border transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#1B1A66] text-white border-[#1B1A66]'
                          : 'bg-white text-[#1B1A66] border-slate-200 hover:border-[#1B1A66]'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep('details')}
              className="w-full py-3 px-5 rounded-xl bg-[#1B1A66] hover:bg-[#141352] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Continue with {selectedTime}
            </button>
          </div>
        )}

        {step === 'details' && (
          <form onSubmit={handleConfirmBooking} noValidate className="space-y-4">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <div className="text-xs font-semibold text-[#1B1A66]">
                  {formattedDate}
                </div>
                <div className="text-xs text-slate-500 tabular-nums">
                  {selectedTime} ·{' '}
                  {TIMEZONES.find((tz) => tz.value === timezone)?.label}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep('datetime')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#10152C] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label
                  htmlFor="cal-name"
                  className="block text-xs font-semibold text-[#10152C] mb-1"
                >
                  Full Name <span className="text-[#1B1A66]">*</span>
                </label>
                <input
                  id="cal-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="Jordan Taylor"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none ${
                    errors.name
                      ? 'border-red-600'
                      : 'border-slate-300 focus:border-[#1B1A66]'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cal-email"
                  className="block text-xs font-semibold text-[#10152C] mb-1"
                >
                  Business Email <span className="text-[#1B1A66]">*</span>
                </label>
                <input
                  id="cal-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="jordan@company.com"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none ${
                    errors.email
                      ? 'border-red-600'
                      : 'border-slate-300 focus:border-[#1B1A66]'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cal-pkg"
                  className="block text-xs font-semibold text-[#10152C] mb-1"
                >
                  Package Interest
                </label>
                <select
                  id="cal-pkg"
                  value={pkg}
                  onChange={(e) => setPkg(e.target.value as PackageOption)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#1B1A66]"
                >
                  <option value="Single-Page Website ($300)">
                    Single-Page Website ($300)
                  </option>
                  <option value="Multi-Page Website ($600)">
                    Multi-Page Website ($600)
                  </option>
                  <option value="Custom / Consultation">
                    Custom / Website Redesign
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="cal-notes"
                  className="block text-xs font-semibold text-[#10152C] mb-1"
                >
                  Discussion Notes (Optional)
                </label>
                <textarea
                  id="cal-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share your website goals or questions..."
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#1B1A66]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-5 rounded-xl bg-[#1B1A66] hover:bg-[#141352] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Confirm Discovery Call
            </button>
          </form>
        )}

        {step === 'confirmed' && (
          <div
            role="status"
            aria-live="polite"
            className="py-4 text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#1B1A66] text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display text-lg font-bold text-[#10152C]">
                Discovery Call Scheduled
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                A calendar summary for <strong>{name}</strong> has been prepared for{' '}
                <span className="font-medium text-[#10152C]">{email}</span>.
              </p>
            </div>

            <div className="bg-[#F5F6FA] rounded-xl border border-slate-200/80 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking ID</span>
                <span className="font-mono font-semibold text-[#1B1A66] tabular-nums">
                  {bookingRef}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date &amp; Time</span>
                <span className="font-semibold text-[#10152C] tabular-nums">
                  {formattedDate} · {selectedTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Topic</span>
                <span className="font-medium text-[#10152C]">{pkg}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-[#1B1A66] hover:bg-[#141352] text-white rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Calendar Invite (.ics)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep('datetime');
                  setName('');
                  setEmail('');
                  setNotes('');
                }}
                className="px-4 py-2.5 text-xs font-semibold text-[#1B1A66] bg-[#F3F5FC] hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
              >
                Schedule Another
              </button>
              {onBookedClose && (
                <button
                  type="button"
                  onClick={onBookedClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-[#10152C] cursor-pointer"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: PackageOption;
}

export default function CalendlyModal({
  isOpen,
  onClose,
  initialPackage,
}: CalendlyModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10152C]/70 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendly-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#1B1A66] px-6 py-4 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-[#CBD5FF]" />
            <h2 id="calendly-modal-title" className="font-display text-lg font-bold">
              Schedule a Discovery Call
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close scheduling modal"
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 bg-[#F5F6FA]">
          <CalendlyScheduler
            initialPackage={initialPackage}
            onBookedClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}
