type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  className?: string;
};

export default function SectionHeading({
  title,
  eyebrow,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-12 ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase text-indigo-300">
          {eyebrow}
        </p>
      )}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <span
          className="h-0.5 w-8 shrink-0 rounded-full bg-indigo-400 sm:w-10"
          aria-hidden="true"
        />
        <h2 className="min-w-0 text-2xl font-bold leading-tight text-white sm:text-3xl">
          {title}
        </h2>
      </div>
      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
