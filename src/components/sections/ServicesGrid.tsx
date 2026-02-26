import GlassCard from "@/components/ui/GlassCard";

type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  slug: string;
  color: string;
};

const colorMap: Record<string, { icon: string; border: string }> = {
  indigo: { icon: "text-indigo-400", border: "border-service-indigo" },
  emerald: { icon: "text-emerald-400", border: "border-service-emerald" },
  blue: { icon: "text-blue-400", border: "border-service-blue" },
  purple: { icon: "text-purple-400", border: "border-service-purple" },
};

export default function ServicesGrid({
  items,
}: {
  items: ServiceItem[];
}) {
  return (
    <section id="services" aria-label="Services" className="max-w-6xl w-full mx-auto mb-16 md:mb-32 px-6">
      <h2 className="sr-only">Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((service) => {
          const colors = colorMap[service.color] || colorMap.indigo;
          return (
            <GlassCard
              key={service.slug}
              borderColor={colors.border}
            >
              <span
                className={`material-symbols-outlined ${colors.icon} mb-4 text-3xl block`}
              >
                {service.icon}
              </span>
              <h3 className="font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-slate-400">{service.description}</p>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
