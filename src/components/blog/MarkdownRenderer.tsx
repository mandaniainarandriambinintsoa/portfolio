"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

type MarkdownRendererProps = {
  content: string;
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300 prose-strong:text-white prose-code:text-indigo-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-blockquote:border-indigo-500 prose-blockquote:bg-white/2 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-li:text-slate-300 prose-th:text-slate-200 prose-td:text-slate-300 prose-table:border-collapse prose-th:border prose-th:border-white/10 prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-white/10 prose-td:px-4 prose-td:py-2 prose-img:rounded-xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
