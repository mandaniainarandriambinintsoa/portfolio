import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";

type PricingTier = {
  name: string;
  price: string;
  delay: string;
  details: string;
  featured?: boolean;
};

type PricingExample = {
  label: string;
  title: string;
  href: string;
};

type PricingLine = {
  icon: string;
  color: string;
  title: string;
  description: string;
  example?: PricingExample;
  tiers: PricingTier[];
};

type PricingDict = {
  title: string;
  subtitle: string;
  lines: PricingLine[];
  tjm_label: string;
  tjm_value: string;
  tjm_note: string;
  cta: string;
  cta_href: string;
};

const colorMap: Record<string, { icon: string; border: string; ring: string; text: string }> = {
  indigo: { icon: "text-indigo-400", border: "border-service-indigo", ring: "ring-indigo-400/40", text: "text-indigo-300" },
  emerald: { icon: "text-emerald-400", border: "border-service-emerald", ring: "ring-emerald-400/40", text: "text-emerald-300" },
  blue: { icon: "text-blue-400", border: "border-service-blue", ring: "ring-blue-400/40", text: "text-blue-300" },
  purple: { icon: "text-purple-400", border: "border-service-purple", ring: "ring-purple-400/40", text: "text-purple-300" },
};

export default function Pricing({ dict }: { dict: PricingDict }) {
  return (
    <section id="pricing" aria-label={dict.title} className="max-w-6xl w-full mx-auto mb-16 md:mb-32 px-6">
      <SectionHeading title={dict.title} />
      <p className="text-slate-400 max-w-2xl -mt-10 mb-12 text-base md:text-lg">
        {dict.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dict.lines.map((line) => {
          const colors = colorMap[line.color] || colorMap.indigo;
          const isExternal = line.example?.href.startsWith("http");
          return (
            <div key={line.title} className="pricing-line flex flex-col gap-3">
              {line.example && (
                <Link
                  href={line.example.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  data-ph-event="demo_opened"
                  data-ph-props={JSON.stringify({
                    pricing_line: line.title,
                    label: line.example.label,
                    title: line.example.title,
                    href: line.example.href,
                    external: isExternal,
                  })}
                  className={`group flex items-center justify-between gap-3 rounded-xl px-4 py-3 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-colors`}
                >
                  <div className="flex flex-col min-w-0">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${colors.text}`}>
                      {line.example.label}
                    </span>
                    <span className="text-sm text-slate-200 truncate">
                      {line.example.title}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              )}

              <GlassCard borderColor={colors.border} className="flex flex-col flex-grow">
                <div className="mb-6">
                  <span className={`material-symbols-outlined ${colors.icon} mb-3 text-3xl block`}>
                    {line.icon}
                  </span>
                  <h3 className="font-bold text-lg mb-1">{line.title}</h3>
                  <p className="text-xs text-slate-400">{line.description}</p>
                </div>

                <ul className="flex flex-col gap-3 flex-grow">
                  {line.tiers.map((tier) => (
                    <li
                      key={tier.name}
                      className={`rounded-xl p-4 border transition-colors ${
                        tier.featured
                          ? `bg-white/[0.04] border-white/10 ring-1 ${colors.ring}`
                          : "bg-white/[0.02] border-white/5"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <span className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}>
                          {tier.name}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                          {tier.delay}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">{tier.price}</div>
                      <p className="text-xs text-slate-400 leading-relaxed">{tier.details}</p>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-center md:text-left">
          <span className="text-sm text-slate-400">{dict.tjm_label}</span>
          <span className="text-lg font-bold gradient-text">{dict.tjm_value}</span>
          <span className="text-xs text-slate-400">{dict.tjm_note}</span>
        </div>
        <Link
          href={dict.cta_href}
          data-ph-event="cta_clicked"
          data-ph-props={JSON.stringify({ area: "pricing", cta_type: "contact", label: dict.cta, href: dict.cta_href })}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-transform hover:scale-[1.02]"
        >
          {dict.cta}
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
