import { Home, PawPrint, Syringe, Settings } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import type { Page } from "@/types";

const NAV_ITEMS = [
  { id: "home", label: "Início", icon: "home" },
  { id: "pets", label: "Pets", icon: "paw" },
  { id: "adoption", label: "Adoção", icon: "img-paw" },
  { id: "vaccines", label: "Saúde", icon: "syringe" },
  { id: "settings", label: "Menu", icon: "settings" },
] as const;

function NavIcon({ icon, active }: { icon: string; active: boolean }) {
  const cls = `transition-colors ${active ? "text-white" : "text-gray-500"}`;
  if (icon === "home") return <Home size={22} className={cls} strokeWidth={active ? 2.5 : 2} />;
  if (icon === "paw") return <PawPrint size={22} className={cls} strokeWidth={active ? 2.5 : 2} />;
  if (icon === "syringe") return <Syringe size={22} className={cls} strokeWidth={active ? 2.5 : 2} />;
  if (icon === "settings") return <Settings size={22} className={cls} strokeWidth={active ? 2.5 : 2} />;
  if (icon === "img-paw") {
    return (
      <img
        src="/img/pawIcon.png"
        alt="Adoção"
        className="w-5 h-5 object-contain"
        style={{
          filter: active
            ? "brightness(100)"
            : "invert(0.4) sepia(0) saturate(1) hue-rotate(0deg)",
        }}
      />
    );
  }
  return null;
}

export function BottomNav() {
  const { page, navigate, notifications } = useApp();
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#1E1812] border-t border-gray-100 dark:border-[#3D2E22] shadow-lg">
      <nav className="flex items-stretch h-16">
        {NAV_ITEMS.map(item => {
          const active =
            page === item.id ||
            (item.id === "vaccines" && ["vaccines", "vaccine-form", "appointments", "appointment-form", "medications", "medication-form", "agenda"].includes(page));
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id as Page)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 relative transition-colors ${active ? "bg-primary/5 dark:bg-primary/10" : ""}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${active ? "bg-primary" : "bg-transparent"}`}>
                <NavIcon icon={item.icon} active={active} />
              </div>
              <span className={`text-[10px] font-medium leading-none ${active ? "text-primary" : "text-gray-400 dark:text-gray-500"}`}>
                {item.label}
              </span>
              {item.id === "settings" && unread > 0 && (
                <span className="absolute top-2 right-4 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#1E1812]" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
