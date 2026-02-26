type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

type StatsProps = {
  title: string;
  items: StatItem[];
};

export default function Stats({ title, items }: StatsProps) {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-sm font-mono tracking-[0.3em] text-white/60 mb-10 uppercase">
          {title}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-8 text-center border border-white/[0.06] group"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                <span className="stat-number" data-target={item.value}>
                  0
                </span>
                <span className="stat-suffix text-indigo-400">
                  {item.suffix}
                </span>
              </div>
              <p className="text-sm md:text-base text-white/70 font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
