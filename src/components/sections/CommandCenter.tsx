import type { CSSProperties } from "react";

type CommandCenterNode = {
  label: string;
  sublabel: string;
};

type CommandCenterDict = {
  badge: string;
  title: string;
  caption: string;
  note: string;
  nodes: CommandCenterNode[];
};

// Visual style per node (icons + accent color). Labels come from the dict (i18n).
const NODE_STYLES = [
  {
    icon: "deployed_code",
    glow: "rgba(99, 102, 241, 0.55)",
    ring: "border-indigo-500/30 bg-indigo-600/10",
    iconColor: "text-indigo-300",
  },
  {
    icon: "psychology",
    glow: "rgba(16, 185, 129, 0.5)",
    ring: "border-emerald-500/30 bg-emerald-600/10",
    iconColor: "text-emerald-300",
  },
  {
    icon: "hub",
    glow: "rgba(59, 130, 246, 0.5)",
    ring: "border-blue-500/30 bg-blue-600/10",
    iconColor: "text-blue-300",
  },
  {
    icon: "database",
    glow: "rgba(168, 85, 247, 0.5)",
    ring: "border-purple-500/30 bg-purple-600/10",
    iconColor: "text-purple-300",
  },
] as const;

export default function CommandCenter({ dict }: { dict: CommandCenterDict }) {
  return (
    <section className="w-full max-w-5xl mx-auto mb-16 md:mb-32 px-6 relative z-10">
      <div className="glass-card rounded-2xl command-center-glow border-white/10 px-6 py-10 md:px-12 md:py-14">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            {dict.badge}
          </span>
          <h2 className="mt-4 text-xl md:text-2xl font-bold text-white max-w-2xl mx-auto leading-snug">
            {dict.title}
          </h2>
        </div>

        {/* Pipeline */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center">
          {dict.nodes.map((node, i) => {
            const style = NODE_STYLES[i % NODE_STYLES.length];
            return (
              <div key={node.label} className="contents">
                {i > 0 && (
                  <div className="flex items-center justify-center shrink-0" aria-hidden="true">
                    <span className="flow-v md:hidden" />
                    <span className="flow-h hidden md:block w-8 lg:w-14" />
                  </div>
                )}
                <div
                  className={`flow-node relative glass-card rounded-2xl border ${style.ring} px-5 py-5 flex md:flex-col items-center gap-4 md:gap-3 text-center w-full md:flex-1 min-w-0`}
                >
                  <span
                    className="flow-node-glow rounded-2xl"
                    style={
                      {
                        "--node-color": style.glow,
                        animationDelay: `${i * 0.9}s`,
                      } as CSSProperties
                    }
                  />
                  <div className={`relative shrink-0 w-12 h-12 rounded-xl border ${style.ring} flex items-center justify-center`}>
                    <span className={`material-symbols-outlined ${style.iconColor}`} aria-hidden="true">
                      {style.icon}
                    </span>
                  </div>
                  <div className="relative min-w-0">
                    <p className="font-semibold text-white text-sm">{node.label}</p>
                    <p className="text-slate-400 text-xs mt-0.5 leading-snug">{node.sublabel}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Caption */}
        <p className="text-center text-sm text-slate-400 mt-10 md:mt-12 max-w-2xl mx-auto leading-relaxed">
          {dict.caption}
        </p>

        {/* Note: each brick can be delivered on its own */}
        <p className="mt-5 mx-auto max-w-xl flex items-start justify-center gap-2 text-center text-xs text-slate-500">
          <span className="material-symbols-outlined text-emerald-400/70 text-sm leading-none mt-px shrink-0" aria-hidden="true">
            check_circle
          </span>
          <span>{dict.note}</span>
        </p>
      </div>
    </section>
  );
}
