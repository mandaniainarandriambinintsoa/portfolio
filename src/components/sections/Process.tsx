import SectionHeading from "@/components/ui/SectionHeading";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  color: string;
};

const colorMap: Record<string, string> = {
  indigo: "text-indigo-400",
  emerald: "text-emerald-400",
  blue: "text-blue-400",
};

export default function Process({
  title,
  steps,
}: {
  title: string;
  steps: ProcessStep[];
}) {
  return (
    <section id="process" className="max-w-6xl w-full mx-auto mb-16 md:mb-32 px-6">
      <SectionHeading title={title} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {steps.map((step) => (
          <div key={step.number} className="relative">
            <div className="text-8xl font-black text-white/5 absolute -top-8 -left-4 select-none">
              {step.number}
            </div>
            <div className="relative z-10">
              <h3
                className={`text-xl font-bold mb-4 ${
                  colorMap[step.color] || "text-indigo-400"
                }`}
              >
                {step.title}
              </h3>
              <p className="text-slate-400">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
