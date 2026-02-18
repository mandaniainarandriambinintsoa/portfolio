export default function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        published
          ? "bg-green-500/10 text-green-400 border border-green-500/20"
          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
      }`}
    >
      {published ? "Publié" : "Brouillon"}
    </span>
  );
}
