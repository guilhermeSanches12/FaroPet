interface SelectProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  error?: string;
}

export function Select({ label, value, onChange, options, error }: SelectProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-all appearance-none
          ${error ? "border-red-400" : "border-gray-200 focus:border-primary"}`}
      >
        <option value="">Selecione...</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
