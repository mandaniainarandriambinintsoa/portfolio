import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import IconScoutIcon, {
  type IconScoutName,
} from "@/components/icons/IconScoutIcon";

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

const pricingIconMap: Record<string, IconScoutName> = {
  code: "code",
  deployed_code: "product",
  hub: "automation",
};

export default function Pricing({ dict }: { dict: PricingDict }) {
  return (
    <section id="pricing" aria-label={dict.title} className="max-w-6xl w-full mx-auto mb-16 md:mb-32 px-6">
      <SectionHeading title={dict.title} />
      <p className="-mt-5 mb-10 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
        {dict.subtitle}
      </p>

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
        {dict.lines.map((line) => {
          const colors = colorMap[line.color] || colorMap.indigo;
          const isExternal = line.example?.href.startsWith("http");
          const offer = line.tiers[0];
          return (
            <div key={line.title} className="pricing-line flex h-full flex-col gap-3">
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
                  className="group flex min-h-[72px] items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/10 hover:bg-white/[0.05]"
                >
                  <div className="flex flex-col min-w-0">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${colors.text}`}>
                      {line.example.label}
                    </span>
                    <span className="text-sm leading-snug text-slate-200">
                      {line.example.title}
                    </span>
                  </div>
                  <IconScoutIcon
                    name="arrowUpRight"
                    size={18}
                    className="shrink-0 text-slate-400 transition-colors group-hover:text-white"
                  />
                </Link>
              )}

              <GlassCard borderColor={colors.border} className="flex flex-1 flex-col">
                <div className="mb-8">
                  <IconScoutIcon
                    name={pricingIconMap[line.icon] ?? "product"}
                    size={28}
                    className={`mb-3 ${colors.icon}`}
                  />
                  <h3 className="font-bold text-lg mb-1">{line.title}</h3>
                  <p className="text-xs text-slate-400">{line.description}</p>
                </div>

                {offer && (
                  <div className="mt-auto border-t border-white/10 pt-6">
                    <div className="mb-2 flex items-baseline justify-between gap-3">
                      <span className={`text-xs font-semibold uppercase ${colors.text}`}>
                        {offer.name}
                      </span>
                      <span className="text-xs text-slate-400">{offer.delay}</span>
                    </div>
                    <div className="mb-3 text-3xl font-bold text-white">{offer.price}</div>
                    <p className="text-sm leading-relaxed text-slate-400">{offer.details}</p>
                  </div>
                )}
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
          <IconScoutIcon name="arrowRight" size={18} />
        </Link>
      </div>
    </section>
  );
}
