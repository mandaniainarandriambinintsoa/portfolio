import FAQJsonLd from "@/components/seo/FAQJsonLd";
import IconScoutIcon from "@/components/icons/IconScoutIcon";
import SectionHeading from "@/components/ui/SectionHeading";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  title: string;
  items: FAQItem[];
};

export default function FAQ({ title, items }: FAQProps) {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <FAQJsonLd items={items} />

      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading title={title} />

        <div className="space-y-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="faq-item glass-card group rounded-lg border border-white/[0.06]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-5 sm:px-6 [&::-webkit-details-marker]:hidden">
                <span className="text-base md:text-lg font-medium text-white pr-4">
                  {item.question}
                </span>
                <span className="faq-icon flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors group-open:border-indigo-400/30 group-open:text-indigo-400">
                  <IconScoutIcon
                    name="plus"
                    size={18}
                    className="faq-icon-svg transition-transform duration-300 group-open:rotate-45"
                  />
                </span>
              </summary>
              <div className="faq-content px-5 pb-5 sm:px-6">
                <p className="text-white/70 leading-relaxed">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
