interface InputProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  rightEl?: React.ReactNode;
}

export function Input({ label, type = "text", value, onChange, placeholder, error, rightEl }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-all
            ${error ? "border-red-400" : "border-gray-200 focus:border-primary"}
            ${rightEl ? "pr-12" : ""}`}
        />
        {rightEl && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</div>}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
