type ClientLogoItem = {
  name: string;
  color: string;
};

type ClientLogosDict = {
  label: string;
  items: ClientLogoItem[];
};

const dotColorMap: Record<string, string> = {
  indigo: "bg-indigo-400",
  emerald: "bg-emerald-400",
  blue: "bg-blue-400",
  purple: "bg-purple-400",
};

export default function ClientLogos({ dict }: { dict: ClientLogosDict }) {
  return (
    <section
      aria-label={dict.label}
      className="max-w-6xl w-full mx-auto px-6 -mt-4 md:-mt-8 mb-12 md:mb-20"
    >
      <p className="text-center text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-6">
        {dict.label}
      </p>
      <div
        className="flex flex-wrap items-center justify-center"
        style={{ columnGap: "3rem", rowGap: "1.25rem" }}
      >
        {dict.items.map((item) => (
          <div
            key={item.name}
            className="flex items-center text-slate-300 hover:text-white transition-colors duration-300"
            style={{ gap: "0.625rem" }}
          >
            <span
              className={`inline-block w-2 h-2 rounded-full ${dotColorMap[item.color] || dotColorMap.indigo} opacity-80`}
              aria-hidden="true"
            />
            <span className="text-lg md:text-xl font-bold tracking-tight">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
