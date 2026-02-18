import FAQJsonLd from "@/components/seo/FAQJsonLd";

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
        <h2 className="text-sm font-mono tracking-[0.3em] text-white/40 mb-10 uppercase">
          {title}
        </h2>

        <div className="space-y-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="faq-item glass-card rounded-2xl border border-white/[0.06] group"
            >
              <summary className="flex items-center justify-between cursor-pointer px-8 py-6 list-none [&::-webkit-details-marker]:hidden">
                <span className="text-base md:text-lg font-medium text-white pr-4">
                  {item.question}
                </span>
                <span className="faq-icon flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 transition-colors group-open:text-indigo-400 group-open:border-indigo-400/30">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="faq-icon-svg transition-transform duration-300 group-open:rotate-45"
                  >
                    <path
                      d="M7 1v12M1 7h12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="faq-content px-8 pb-6">
                <p className="text-white/50 leading-relaxed">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
