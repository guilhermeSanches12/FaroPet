interface BadgeProps {
  label: string;
  className?: string;
}

export function Badge({ label, className = "" }: BadgeProps) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
