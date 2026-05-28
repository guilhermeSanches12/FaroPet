interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white dark:bg-[#2A2018] rounded-2xl shadow-sm border border-gray-100 dark:border-[#3D2E22] ${className}`}>
      {children}
    </div>
  );
}
