interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  full?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

export function Btn({
  children, onClick, variant = "primary", size = "md",
  full = false, disabled = false, type = "button", className = "",
}: BtnProps) {
  const base = "font-semibold rounded-xl transition-all flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary text-white active:opacity-80",
    outline: "border-2 border-primary text-primary bg-transparent active:bg-orange-50",
    ghost: "text-gray-600 bg-gray-100 active:bg-gray-200",
    danger: "bg-red-500 text-white active:opacity-80",
  };
  const sizes = { sm: "px-3 py-2 text-xs", md: "px-5 py-3 text-sm", lg: "px-6 py-4 text-base" };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${full ? "w-full" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
