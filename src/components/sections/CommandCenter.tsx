export default function CommandCenter({
  fileName,
}: {
  fileName: string;
}) {
  return (
    <section className="w-full max-w-5xl mx-auto mb-16 md:mb-32 px-6 relative z-10">
      <div className="glass-card rounded-2xl overflow-hidden command-center-glow border-white/10 flex flex-col md:flex-row md:h-[450px]">
        {/* Sidebar icons */}
        <div className="hidden md:flex w-16 border-r border-white/10 flex-col items-center py-6 gap-6 bg-black/20">
          <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30">
            <span className="material-symbols-outlined text-indigo-400 text-xl">
              terminal
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-600/20 flex items-center justify-center border border-emerald-500/30">
            <span className="material-symbols-outlined text-emerald-400 text-xl">
              account_tree
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-white/5">
            <span className="material-symbols-outlined text-slate-400 text-xl">
              database
            </span>
          </div>
          <div className="mt-auto mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-800/50" />
          </div>
        </div>

        {/* Code editor */}
        <div className="flex-1 code-gradient p-6 md:p-8 font-mono text-sm overflow-hidden">
          <div className="flex items-center gap-2 mb-6 md:mb-8 opacity-60">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="ml-4 text-xs">{fileName}</span>
          </div>
          <div className="space-y-2 text-sm md:text-base">
            <p>
              <span className="text-pink-400">import</span>
              {" { automation } "}
              <span className="text-pink-400">from</span>{" "}
              <span className="text-emerald-400">&apos;@manda/core&apos;</span>;
            </p>
            <p>
              <span className="text-pink-400">export default async function</span>{" "}
              <span className="text-blue-400">orchestrate</span>() {"{"}
            </p>
            <p className="pl-4 text-slate-400">
              {"// Initialize high-scale workflow"}
            </p>
            <p className="pl-4">
              <span className="text-pink-400">const</span> pipeline ={" "}
              <span className="text-pink-400">await</span> automation.start({"{"}
            </p>
            <p className="pl-8">
              trigger: <span className="text-emerald-400">&apos;WEBHOOK_V2&apos;</span>,
            </p>
            <p className="pl-8">
              nodes: [<span className="text-emerald-400">&apos;AI_PARSER&apos;</span>,{" "}
              <span className="text-emerald-400">&apos;DB_SYNC&apos;</span>],
            </p>
            <p className="pl-8">
              scaling: <span className="text-indigo-400">true</span>
            </p>
            <p className="pl-4">{"}"});</p>
            <p className="pl-4">
              <span className="text-pink-400">return</span> pipeline.status();
            </p>
            <p>{"}"}</p>
          </div>
        </div>

        {/* Pipeline cards */}
        <div className="w-full md:w-96 border-t md:border-t-0 md:border-l border-white/10 bg-black/40 p-6 md:p-8 flex flex-col justify-center gap-8 md:gap-10 relative overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-6 h-full w-full">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-r border-white/20" />
              ))}
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-8 md:gap-10">
            {/* Webhook */}
            <div className="flex items-center gap-4 glass-card p-4 rounded-xl border-indigo-500/30 shadow-lg shadow-indigo-500/10">
              <div className="w-10 h-10 bg-indigo-500 rounded flex items-center justify-center text-xs font-bold shrink-0">
                WEB
              </div>
              <div>
                <p className="font-bold text-white text-xs">Webhook Receiver</p>
                <p className="text-slate-400 text-xs">Listening for events...</p>
              </div>
            </div>

            {/* AI Agent */}
            <div className="flex items-center gap-4 glass-card p-4 rounded-xl border-emerald-500/30 ml-0 md:ml-8 shadow-lg shadow-emerald-500/10">
              <div className="w-10 h-10 bg-emerald-500 rounded flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-sm">smart_toy</span>
              </div>
              <div>
                <p className="font-bold text-white text-xs">AI Agent Logic</p>
                <p className="text-emerald-400 text-xs">Processing Context</p>
              </div>
            </div>

            {/* Vector DB */}
            <div className="flex items-center gap-4 glass-card p-4 rounded-xl border-blue-500/30 shadow-lg shadow-blue-500/10">
              <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-sm">storage</span>
              </div>
              <div>
                <p className="font-bold text-white text-xs">Vector Database</p>
                <p className="text-slate-400 text-xs">Syncing 1.2k records</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
