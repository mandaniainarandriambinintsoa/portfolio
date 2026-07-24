import Link from "next/link";
import { Fragment } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

type ApproachDict = {
  title: string;
  heading: string;
  paragraphs: string[];
};

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderParagraph(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    const [, anchor, href] = match;
    parts.push(
      <Link
        key={key++}
        href={href}
        className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-300/40 hover:decoration-indigo-200/70 transition-colors"
      >
        {anchor}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }
  return parts;
}

export default function Approach({ dict }: { dict: ApproachDict }) {
  return (
    <section id="approach" className="max-w-6xl w-full mx-auto mb-16 md:mb-32 px-6">
      <SectionHeading title={dict.title} />
      <div className="max-w-4xl">
        <h3 className="approach-headline text-xl font-extrabold tracking-tight mb-10 leading-tight bg-gradient-to-r from-white via-indigo-100 to-violet-300 bg-clip-text text-transparent break-words sm:text-2xl md:text-4xl">
          {dict.heading}
        </h3>
        <div className="space-y-6 text-base md:text-lg text-slate-300 leading-relaxed">
          {dict.paragraphs.map((p, i) => (
            <p key={i}>{renderParagraph(p)}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
