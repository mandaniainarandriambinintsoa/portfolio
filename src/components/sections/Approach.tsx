import SectionHeading from "@/components/ui/SectionHeading";

type ApproachDict = {
  title: string;
  heading: string;
  paragraphs: string[];
};

export default function Approach({ dict }: { dict: ApproachDict }) {
  return (
    <section id="approach" className="max-w-6xl w-full mx-auto mb-16 md:mb-32 px-6">
      <SectionHeading title={dict.title} />
      <div className="max-w-4xl">
        <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-10 leading-tight bg-gradient-to-r from-white via-indigo-100 to-violet-300 bg-clip-text text-transparent">
          {dict.heading}
        </h3>
        <div className="space-y-6 text-base md:text-lg text-slate-300 leading-relaxed">
          {dict.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
