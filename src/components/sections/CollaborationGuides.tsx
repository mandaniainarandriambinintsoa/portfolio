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

function PdfIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
        fill="#ef4444"
      />
      <path d="M14 2v6h6" fill="#fca5a5" />
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="700"
        fill="#fff"
        fontFamily="system-ui, sans-serif"
      >
        PDF
      </text>
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

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
                  <PdfIcon className="w-5 h-5" />
                  {item.pages} {pagesLabel}
                </span>
                <div className="inline-flex items-center gap-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm font-medium ${accent.text} group-hover:gap-2.5 transition-all`}
                  >
                    {readLabel}
                    <ArrowIcon className="w-4 h-4" />
                  </span>
                  <a
                    href={item.pdf}
                    download
                    aria-label={`${pdfLabel} : ${item.title}`}
                    className="pointer-events-auto inline-flex items-center gap-1 py-2 -my-2 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
                  >
                    <DownloadIcon className="w-3.5 h-3.5" />
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
