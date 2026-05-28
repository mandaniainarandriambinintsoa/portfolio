import JsonLd from "./JsonLd";

type Props = {
  content: string;
};

function extractFaqEntries(markdown: string): { question: string; answer: string }[] {
  const faqHeading = /^##\s+(faq|questions?\s+fr[eé]quentes?|frequently\s+asked\s+questions?)\b/im;
  const match = markdown.match(faqHeading);
  if (!match || match.index === undefined) return [];

  const after = markdown.slice(match.index + match[0].length);
  const nextH2 = after.search(/^##\s+(?!#)/m);
  const block = nextH2 === -1 ? after : after.slice(0, nextH2);

  const entries: { question: string; answer: string }[] = [];
  const itemRegex = /^###\s+(.+?)\s*$/gm;
  const indices: { question: string; index: number; end: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = itemRegex.exec(block)) !== null) {
    indices.push({ question: m[1].trim(), index: m.index, end: m.index + m[0].length });
  }

  for (let i = 0; i < indices.length; i++) {
    const current = indices[i];
    const nextStart = i + 1 < indices.length ? indices[i + 1].index : block.length;
    const answerRaw = block.slice(current.end, nextStart).trim();
    if (!answerRaw) continue;
    const answer = answerRaw
      .replace(/\[(.+?)\]\((.+?)\)/g, "$1")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/`(.+?)`/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    entries.push({ question: current.question, answer });
  }
  return entries;
}

export default function FaqJsonLdFromMarkdown({ content }: Props) {
  const entries = extractFaqEntries(content);
  if (entries.length === 0) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: entries.map((e) => ({
          "@type": "Question",
          name: e.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: e.answer,
          },
        })),
      }}
    />
  );
}
