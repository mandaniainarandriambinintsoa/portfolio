type SectionHeadingProps = {
  title: string;
  className?: string;
};

export default function SectionHeading({ title, className = "" }: SectionHeadingProps) {
  return (
    <div className={`flex items-center gap-4 mb-16 ${className}`}>
      <h2 className="text-4xl font-black italic tracking-tight">{title}</h2>
      <div className="h-1 flex-grow bg-gradient-to-r from-indigo-500 to-transparent" />
    </div>
  );
}
