import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CheckCheck, Send, X } from 'lucide-react';
import type { PackageOption } from '../data/nfsData';

interface WhatsAppWidgetProps {
  onOpenInquiry: (pkg?: PackageOption) => void;
  onOpenCalendly: (pkg?: PackageOption) => void;
}

interface ChatMessage {
  id: string;
  sender: 'nfs' | 'user';
  text: string;
  time: string;
  suggestedPackage?: PackageOption;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'nfs',
    text: 'Hello! Welcome to New Fleet Solutions. Looking for a $300 Single-Page website, a $600 Multi-Page website, or a redesign?',
    time: 'Just now',
  },
];

const QUICK_TOPICS: Array<{
  label: string;
  prompt: string;
  reply: string;
  pkg?: PackageOption;
}> = [
  {
    label: '$300 Single-Page',
    prompt: 'I am interested in the $300 Single-Page Website package.',
    reply:
      'Great choice for startups and small businesses. The $300 Single-Page package includes custom responsive design, contact form, social links, and on-page SEO setup. Would you like to submit your business details now?',
    pkg: 'Single-Page Website ($300)',
  },
  {
    label: '$600 Multi-Page',
    prompt: 'Tell me about the $600 Multi-Page Website package.',
    reply:
      'Our $600 Multi-Page Website includes up to 5 standard pages (Home, About, Services, Contact, plus one additional page), mobile-responsive layout, and on-page SEO for all included pages. Ready to start your brief?',
    pkg: 'Multi-Page Website ($600)',
  },
  {
    label: 'Website Redesign',
    prompt: 'We need to modernize and redesign our current website.',
    reply:
      'We handle full website redesigns to bring outdated sites up to modern responsive and on-page SEO standards. Share your current URL or goals in our project inquiry form and our team will review it.',
    pkg: 'Custom / Consultation',
  },
];

function getReplyForInput(input: string): {
  reply: string;
  pkg?: PackageOption;
} {
  const lower = input.toLowerCase();
  if (lower.includes('300') || lower.includes('single')) {
    return {
      reply:
        'Our Single-Page Website starts at $300 and includes custom sections, mobile responsiveness, a contact form, and basic on-page SEO. Click below to submit your project brief.',
      pkg: 'Single-Page Website ($300)',
    };
  }
  if (lower.includes('600') || lower.includes('multi') || lower.includes('5 page')) {
    return {
      reply:
        'The Multi-Page Website starts at $600 and covers up to 5 standard pages with dedicated navigation, forms, and on-page SEO. You can start your project brief directly below.',
      pkg: 'Multi-Page Website ($600)',
    };
  }
  if (lower.includes('seo')) {
    return {
      reply:
        'Basic on-page SEO setup (meta titles, descriptions, H1-H3 structure, alt text, XML sitemap, and robots.txt) is included in both $300 and $600 packages.',
    };
  }
  if (lower.includes('domain') || lower.includes('host')) {
    return {
      reply:
        'Domain registration and hosting can be arranged separately depending on your project requirements. Let us know what you already have in the inquiry form.',
    };
  }
  return {
    reply:
      'Thanks for reaching out to New Fleet Solutions. To match you with the right package ($300 Single-Page or $600 Multi-Page) and schedule discovery, please share your requirements in our project brief.',
    pkg: 'Custom / Consultation',
  };
}

function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.77 14.02c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.13.11-1.83-.11-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.91-4.27-5.06-4.47-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37.2 0 .39 0 .56.01.18.01.43-.07.67.51.24.59.84 2.04.91 2.19.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.39-.44.52-.15.15-.3.31-.13.61.17.3.77 1.27 1.65 2.06 1.14 1.01 2.09 1.33 2.39 1.48.3.15.47.12.65-.07.18-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.34.07.13.07.72-.17 1.4z" />
    </svg>
  );
}

export default function WhatsAppWidget({
  onOpenInquiry,
  onOpenCalendly,
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState('');
  const [activePackage, setActivePackage] = useState<PackageOption>(
    'Multi-Page Website ($600)'
  );
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  function appendExchange(
    userText: string,
    replyText: string,
    pkg?: PackageOption
  ) {
    const nowLabel = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (pkg) {
      setActivePackage(pkg);
    }
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: userText,
        time: nowLabel,
      },
      {
        id: `nfs-${Date.now() + 1}`,
        sender: 'nfs',
        text: replyText,
        time: nowLabel,
        suggestedPackage: pkg,
      },
    ]);
  }

  function handleQuickTopic(topic: (typeof QUICK_TOPICS)[number]) {
    appendExchange(topic.prompt, topic.reply, topic.pkg);
  }

  function handleSend(e: FormEvent) {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    const { reply, pkg } = getReplyForInput(trimmed);
    setDraft('');
    appendExchange(trimmed, reply, pkg);
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-label="New Fleet Solutions Business Chat"
            className="w-[min(360px,calc(100vw-2.5rem))] bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#1B1A66] px-4 py-3.5 text-white flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-sm font-bold truncate">
                    New Fleet Solutions
                  </div>
                  <div className="text-[11px] text-[#CBD5FF] truncate">
                    Website Project Desk · Direct Inquiry
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close WhatsApp chat window"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Message Thread */}
            <div
              ref={scrollContainerRef}
              className="p-4 bg-[#F3F5FC] max-h-72 overflow-y-auto space-y-3"
            >
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                        isUser
                          ? 'bg-[#1B1A66] text-white rounded-br-xs'
                          : 'bg-white text-[#10152C] border border-slate-200/80 rounded-bl-xs'
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.suggestedPackage && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsOpen(false);
                            onOpenInquiry(msg.suggestedPackage);
                          }}
                          className="mt-2.5 w-full py-2 px-3 rounded-lg bg-[#F3F5FC] hover:bg-[#1B1A66] text-[#1B1A66] hover:text-white border border-[#1B1A66]/20 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>Start Project Brief</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="mt-1 px-1 flex items-center gap-1 text-[10px] text-slate-500">
                      <span>{msg.time}</span>
                      {isUser && <CheckCheck className="w-3 h-3 text-[#6B78E8]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Reply Prompts */}
            <div className="px-3.5 py-2.5 bg-white border-t border-slate-100 flex flex-wrap gap-1.5">
              {QUICK_TOPICS.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => handleQuickTopic(topic)}
                  className="px-2.5 py-1 text-[11px] font-semibold text-[#1B1A66] bg-[#F3F5FC] hover:bg-[#1B1A66] hover:text-white border border-[#1B1A66]/15 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  {topic.label}
                </button>
              ))}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <label htmlFor="nfs-whatsapp-input" className="sr-only">
                Message New Fleet Solutions
              </label>
              <input
                id="nfs-whatsapp-input"
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask about $300 / $600 plans..."
                className="flex-1 min-w-0 px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-[#F5F6FA] text-[#10152C] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#1B1A66]"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="w-9 h-9 rounded-lg bg-[#1B1A66] hover:bg-[#141352] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Footer Action to Open Full Contact Form or Calendly */}
            <div className="px-4 py-2.5 bg-[#10152C] text-white flex items-center justify-between gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenCalendly(activePackage);
                }}
                className="font-semibold text-[#CBD5FF] hover:text-white underline cursor-pointer whitespace-nowrap"
              >
                Book Call (Calendly)
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenInquiry(activePackage);
                }}
                className="font-semibold text-white hover:text-[#CBD5FF] underline cursor-pointer whitespace-nowrap"
              >
                Open Inquiry Form
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Bubble Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={
          isOpen
            ? 'Close WhatsApp business chat'
            : 'Open WhatsApp business chat with New Fleet Solutions'
        }
        className="w-14 h-14 rounded-full bg-[#1B1A66] hover:bg-[#141352] text-white shadow-lg border border-[#6B78E8]/40 flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B1A66]"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <WhatsAppIcon className="w-7 h-7" />
        )}
      </button>
    </div>
  );
}
