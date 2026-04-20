type GuideItem = {
  key: string;
  tag: string;
  title: string;
  description: string;
  pages: number;
  href: string;
};

type CollaborationGuidesProps = {
  badge: string;
  title: string;
  subtitle: string;
  downloadLabel: string;
  pagesLabel: string;
  items: GuideItem[];
};

const iconMap: Record<string, string> = {
  site: "language",
  saas: "dashboard",
  n8n: "account_tree",
};

const accentMap: Record<string, { icon: string; ring: string; glow: string }> = {
  site: {
    icon: "text-indigo-400",
    ring: "border-indigo-400/30 hover:border-indigo-400/60",
    glow: "from-indigo-500/10",
  },
  saas: {
    icon: "text-pink-400",
    ring: "border-pink-400/30 hover:border-pink-400/60",
    glow: "from-pink-500/10",
  },
  n8n: {
    icon: "text-emerald-400",
    ring: "border-emerald-400/30 hover:border-emerald-400/60",
    glow: "from-emerald-500/10",
  },
};

export default function CollaborationGuides({
  badge,
  title,
  subtitle,
  downloadLabel,
  pagesLabel,
  items,
}: CollaborationGuidesProps) {
  return (
    <section
      id="collaboration-guides"
      aria-label={title}
      className="max-w-6xl w-full mx-auto mb-16 md:mb-32 px-6"
    >
      <div className="text-center mb-12 md:mb-16">
        <span className="inline-block text-xs font-mono tracking-[0.3em] text-indigo-400 uppercase mb-4 px-4 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-400/5">
          {badge}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          {title}
        </h2>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => {
          const accent = accentMap[item.key] || accentMap.site;
          const icon = iconMap[item.key] || "description";
          return (
            <a
              key={item.key}
              href={item.href}
              download
              className={`guide-card group relative overflow-hidden glass-card rounded-2xl p-8 border ${accent.ring} transition-all duration-300 flex flex-col`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${accent.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                aria-hidden="true"
              />

              <div className="relative z-10 flex items-center justify-between mb-6">
                <span
                  className={`material-symbols-outlined ${accent.icon} text-4xl`}
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <span className="text-xs font-mono tracking-[0.2em] text-white/40">
                  {item.tag}
                </span>
              </div>

              <h3 className="relative z-10 text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="relative z-10 text-sm text-slate-400 leading-relaxed mb-6 flex-grow">
                {item.description}
              </p>

              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs font-mono tracking-wider text-white/40 uppercase">
                  PDF · {item.pages} {pagesLabel}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-sm font-medium ${accent.icon} group-hover:gap-2.5 transition-all`}
                >
                  {downloadLabel}
                  <span
                    className="material-symbols-outlined text-base"
                    aria-hidden="true"
                  >
                    download
                  </span>
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
