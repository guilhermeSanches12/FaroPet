import {
  Home, PawPrint, Calendar, Settings, Bell,
  MapPin, Syringe, User, LogOut,
} from "lucide-react";
import { useApp } from "@/hooks/useApp";
import type { Page } from "@/types";

type NavItem = {
  id: string;
  label: string;
  icon?: React.ElementType;
  isPawImg?: boolean;
  badge?: number;
};

export function SidebarNav() {
  const { page, navigate, notifications, user, logout } = useApp();
  const unread = notifications.filter(n => !n.read).length;

  const items: NavItem[] = [
    { id: "home", label: "Início", icon: Home },
    { id: "pets", label: "Meus Pets", icon: PawPrint },
    { id: "vaccines", label: "Saúde", icon: Syringe },
    { id: "appointments", label: "Consultas", icon: Calendar },
    { id: "notifications", label: "Notificações", icon: Bell, badge: unread },
    { id: "adoption", label: "Adoção", isPawImg: true },
    { id: "clinics", label: "Clínicas", icon: MapPin },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#241C14] border-r border-gray-100 dark:border-[#3D2E22] fixed inset-y-0 left-0 z-20">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100 dark:border-[#3D2E22] flex items-center">
        <img src="/img/FaroLogo.png" alt="Faro" className="h-8 object-contain" />
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {items.map(item => {
          const active =
            page === item.id ||
            (item.id === "vaccines" && ["vaccines", "vaccine-form", "medications", "medication-form", "agenda"].includes(page)) ||
            (item.id === "appointments" && ["appointments", "appointment-form"].includes(page));
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id as Page)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative w-full text-left ${
                active
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#332820]"
              }`}
            >
              {item.isPawImg ? (
                <img
                  src="/img/pawIcon.png"
                  alt="Adoção"
                  className="w-[17px] h-[17px] object-contain shrink-0"
                  style={{
                    filter: active
                      ? "invert(0.45) sepia(1) saturate(6) hue-rotate(360deg)"
                      : "invert(0.4)",
                  }}
                />
              ) : Icon ? (
                <Icon size={17} className="shrink-0" />
              ) : null}
              {item.label}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="ml-auto w-5 h-5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100 dark:border-[#3D2E22]">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-[#3D2E22] flex items-center justify-center shrink-0">
            <User size={15} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{user?.firstName} {user?.lastName}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#332820] transition-colors"
        >
          <LogOut size={16} />
          Sair da conta
        </button>
      </div>
    </aside>
  );
}
