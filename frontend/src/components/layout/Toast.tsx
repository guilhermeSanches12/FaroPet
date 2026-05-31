import { useApp } from "@/hooks/useApp";

export function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  const colors = { success: "bg-green-500", error: "bg-red-500", info: "bg-blue-500" };
  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-white text-sm font-medium shadow-lg ${colors[toast.type]} max-w-xs text-center`}>
      {toast.msg}
    </div>
  );
}
