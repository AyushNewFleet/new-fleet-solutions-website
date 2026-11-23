import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';
import { CheckCircle2, Gauge, MonitorSmartphone, SearchCheck } from 'lucide-react';

interface StatItem {
  id: string;
  target: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
  detail: string;
  icon: 'MonitorSmartphone' | 'Gauge' | 'SearchCheck' | 'CheckCircle2';
}

const STATS: StatItem[] = [
  {
    id: 'responsive',
    target: 100,
    suffix: '%',
    label: 'Mobile Responsive',
    detail: 'Tested across desktop, tablet, and smartphone viewports.',
    icon: 'MonitorSmartphone',
  },
  {
    id: 'speed',
    target: 1.2,
    decimals: 1,
    prefix: '< ',
    suffix: 's',
    label: 'Fast Page Load Speed',
    detail: 'Lightweight semantic markup and compressed media assets.',
    icon: 'Gauge',
  },
  {
    id: 'seo',
    target: 14,
    suffix: ' Checks',
    label: 'SEO Optimized Structure',
    detail: 'Meta tags, clean URLs, XML sitemap, and robots.txt included.',
    icon: 'SearchCheck',
  },
  {
    id: 'industries',
    target: 12,
    suffix: ' Industries',
    label: 'Tailored Website Types',
    detail: 'Dedicated blueprints from corporate firms to e-commerce.',
    icon: 'CheckCircle2',
  },
];

const STAT_ICONS = {
  MonitorSmartphone,
  Gauge,
  SearchCheck,
  CheckCircle2,
};

function CountUpValue({
  target,
  decimals = 0,
  prefix = '',
  suffix,
  active,
}: {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  active: boolean;
}) {
  const [display, setDisplay] = useState<string>(
    decimals > 0 ? target.toFixed(decimals) : String(target)
  );
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!active || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setDisplay(decimals > 0 ? target.toFixed(decimals) : String(target));
      return;
    }

    const controls = animate(0, target, {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplay(
          decimals > 0
            ? latest.toFixed(decimals)
            : String(Math.round(latest))
        );
      },
      onComplete() {
        setDisplay(decimals > 0 ? target.toFixed(decimals) : String(target));
      },
    });

    return () => controls.stop();
  }, [active, target, decimals]);

  return (
    <span className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function PerformanceImpactBar() {
  const barRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(barRef, { once: true, amount: 0.25 });

  return (
    <section
      ref={barRef}
      aria-label="Performance Impact"
      className="bg-white border-b border-slate-200/80"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <h2 className="font-display text-xs font-semibold tracking-wider uppercase text-[#1B1A66]">
            Performance Impact
          </h2>
          <p className="text-xs text-slate-500">
            Built-in technical standards delivered with every NFS website
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 rounded-2xl border border-slate-200/90 bg-[#F5F6FA]/60">
          {STATS.map((stat) => {
            const Icon = STAT_ICONS[stat.icon];
            return (
              <div
                key={stat.id}
                className="p-5 sm:p-6 flex flex-col justify-between gap-2.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1B1A66] tabular-nums">
                    <CountUpValue
                      target={stat.target}
                      decimals={stat.decimals}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      active={isInView}
                    />
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/90 text-[#1B1A66] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="font-display text-sm font-bold text-[#10152C]">
                    {stat.label}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {stat.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
