import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import IconScoutIcon, {
  type IconScoutName,
} from "@/components/icons/IconScoutIcon";

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
                <div>
                  <IconScoutIcon
                    name={pricingIconMap[line.icon] ?? "product"}
                    size={28}
                    className={`mb-3 ${colors.icon}`}
                  />
                  <h3 className="font-bold text-lg mb-1">{line.title}</h3>
                  <p className="text-xs text-slate-400">{line.description}</p>
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-2xl border border-indigo-400/15 bg-indigo-400/[0.04] px-6 py-6 sm:flex-row sm:px-8">
        <div className="text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
            {dict.tjm_label}
          </span>
          <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
            <span className="text-2xl font-bold text-white">{dict.tjm_value}</span>
            <span className="text-sm text-slate-400">{dict.tjm_note}</span>
          </div>
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
