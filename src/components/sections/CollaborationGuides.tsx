type GuideItem = {
  key: string;
  tag: string;
  title: string;
  description: string;
  pages: number;
  href: string;
  pdf: string;
};

type CollaborationGuidesProps = {
  badge: string;
  title: string;
  subtitle: string;
  readLabel: string;
  pdfLabel: string;
  pagesLabel: string;
  items: GuideItem[];
};

const accentMap: Record<string, { text: string; ring: string; glow: string }> = {
  site: {
    text: "text-indigo-400",
    ring: "border-indigo-400/30 hover:border-indigo-400/60",
    glow: "from-indigo-500/10",
  },
  saas: {
    text: "text-pink-400",
    ring: "border-pink-400/30 hover:border-pink-400/60",
    glow: "from-pink-500/10",
  },
  n8n: {
    text: "text-emerald-400",
    ring: "border-emerald-400/30 hover:border-emerald-400/60",
    glow: "from-emerald-500/10",
  },
};

export default function CollaborationGuides({
  badge,
  title,
  subtitle,
  readLabel,
  pdfLabel,
  pagesLabel,
  items,
}: CollaborationGuidesProps) {
  return (
    <section
      id="collaboration-guides"
      aria-label={title}
      className="max-w-6xl w-full mx-auto mb-16 md:mb-32 px-6"
    >
      <SectionHeading title={title} eyebrow={badge} description={subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => {
          const accent = accentMap[item.key] || accentMap.site;
          return (
            <div
              key={item.key}
              className={`guide-card group relative overflow-hidden glass-card rounded-2xl p-8 border ${accent.ring} transition-all duration-300 flex flex-col`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${accent.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                aria-hidden="true"
              />

              {/* Lien principal etire : toute la carte ouvre la version HTML du guide */}
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${readLabel} : ${item.title}`}
                className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              />

              <div className="relative z-10 flex items-center justify-end mb-6 pointer-events-none">
                <span className="text-xs font-mono tracking-[0.2em] text-white/60">
                  {item.tag}
                </span>
              </div>

              <h3 className="relative z-10 text-xl md:text-2xl font-bold text-white mb-3 tracking-tight pointer-events-none">
                {item.title}
              </h3>
              <p className="relative z-10 text-sm text-slate-400 leading-relaxed mb-6 flex-grow pointer-events-none">
                {item.description}
              </p>

              <div className="relative z-20 flex items-center justify-between pt-4 border-t border-white/5 pointer-events-none">
                <span className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-white/50 uppercase">
                  <IconScoutIcon name="document" size={20} />
                  {item.pages} {pagesLabel}
                </span>
                <div className="inline-flex items-center gap-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm font-medium ${accent.text} group-hover:gap-2.5 transition-all`}
                  >
                    {readLabel}
                    <IconScoutIcon name="arrowRight" size={16} />
                  </span>
                  <a
                    href={item.pdf}
                    download
                    aria-label={`${pdfLabel} : ${item.title}`}
                    className="pointer-events-auto inline-flex items-center gap-1 py-2 -my-2 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
                  >
                    <IconScoutIcon name="download" size={15} />
                    {pdfLabel}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
import IconScoutIcon from "@/components/icons/IconScoutIcon";
import SectionHeading from "@/components/ui/SectionHeading";
