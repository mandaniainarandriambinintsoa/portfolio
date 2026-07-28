import IconScoutIcon, {
  type IconScoutName,
} from "@/components/icons/IconScoutIcon";
import SectionHeading from "@/components/ui/SectionHeading";

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

const NODE_STYLES: {
  icon: IconScoutName;
  ring: string;
  iconColor: string;
}[] = [
  {
    icon: "interface",
    ring: "border-indigo-400/25 bg-indigo-400/[0.07]",
    iconColor: "text-indigo-300",
  },
  {
    icon: "ai",
    ring: "border-emerald-400/25 bg-emerald-400/[0.07]",
    iconColor: "text-emerald-300",
  },
  {
    icon: "automation",
    ring: "border-sky-400/25 bg-sky-400/[0.07]",
    iconColor: "text-sky-300",
  },
  {
    icon: "data",
    ring: "border-violet-400/25 bg-violet-400/[0.07]",
    iconColor: "text-violet-300",
  },
];

export default function CommandCenter({ dict }: { dict: CommandCenterDict }) {
  return (
    <section className="relative z-10 mx-auto mb-16 w-full max-w-6xl px-6 md:mb-32">
      <SectionHeading title={dict.title} eyebrow={dict.badge} />

      <div className="flex flex-col items-stretch md:flex-row md:items-center">
        {dict.nodes.map((node, index) => {
          const style = NODE_STYLES[index % NODE_STYLES.length];

          return (
            <div key={node.label} className="contents">
              {index > 0 && (
                <div
                  className="flex shrink-0 items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="flow-v md:hidden" />
                  <span className="flow-h hidden w-6 md:block lg:w-10" />
                </div>
              )}
              <article className="flow-node flex min-h-36 w-full min-w-0 items-center gap-4 rounded-lg border border-white/[0.08] bg-white/[0.025] px-5 py-5 md:min-h-44 md:flex-1 md:flex-col md:items-start md:justify-between md:gap-5 md:px-6 md:py-6">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border ${style.ring} ${style.iconColor}`}
                >
                  <IconScoutIcon name={style.icon} size={25} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-white">
                    {node.label}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">
                    {node.sublabel}
                  </p>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 border-t border-white/[0.07] pt-6 md:grid-cols-[1.2fr_0.8fr] md:gap-10">
        <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {dict.caption}
        </p>
        <p className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-500">
          <IconScoutIcon
            name="check"
            size={18}
            className="mt-0.5 shrink-0 text-emerald-400"
          />
          <span>{dict.note}</span>
        </p>
      </div>
    </section>
  );
}
