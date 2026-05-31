interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-card text-card-foreground rounded-2xl shadow-sm border border-border ${className}`}>
      {children}
    </div>
  );
}
