import { TECH_STACK } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TechStack({ label }: { label: string }) {
  // Double the items for seamless loop
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="w-full mb-16 md:mb-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title={label} />
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050507] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050507] to-transparent z-10" />

        <div className="marquee-track" aria-hidden="true">
          {items.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="text-2xl md:text-3xl font-black text-white/40 whitespace-nowrap tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
