type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  noPadding?: boolean;
};

export default function GlassCard({
  children,
  className = "",
  borderColor = "",
  noPadding = false,
}: GlassCardProps) {
  return (
    <div className={`glass-card rounded-2xl ${noPadding ? "" : "p-6"} ${borderColor} ${className}`}>
      {children}
    </div>
  );
}
