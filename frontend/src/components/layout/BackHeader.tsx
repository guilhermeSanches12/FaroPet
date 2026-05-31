import { ChevronLeft } from "lucide-react";
import { useApp } from "@/hooks/useApp";

interface BackHeaderProps {
  title: string;
  onBack?: () => void;
  rightEl?: React.ReactNode;
}

export function BackHeader({ title, onBack, rightEl }: BackHeaderProps) {
  const { navigate } = useApp();
  return (
    <div className="sticky top-0 z-10 bg-background border-b border-border flex items-center justify-between px-4 sm:px-6 h-14">
      <button
        onClick={onBack ?? (() => navigate("home"))}
        className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0"
      >
        <ChevronLeft size={18} className="text-muted-foreground" />
      </button>
      <h1 className="font-semibold text-sm text-foreground truncate px-2">{title}</h1>
      <div className="w-9 flex justify-end shrink-0">{rightEl}</div>
    </div>
  );
}
