import { Bell, Syringe, Calendar, Pill, X } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { Card } from "@/components/shared";
import { BackHeader } from "@/components/layout/BackHeader";
import { fmtDate } from "@/utils/helpers";
import type { AppNotification } from "@/types";

const typeColors: Record<AppNotification["type"], string> = {
  vaccine: "bg-blue-50 text-blue-500",
  appointment: "bg-purple-50 text-purple-500",
  medication: "bg-green-50 text-green-500",
  general: "bg-gray-100 text-gray-500",
};

const typeLabels: Record<AppNotification["type"], string> = {
  vaccine: "Vacina",
  appointment: "Consulta",
  medication: "Medicação",
  general: "Geral",
};

export function NotificationsPage() {
  const { navigate, notifications, markRead, markAllRead, deleteNotification } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BackHeader
        title="Notificações"
        onBack={() => navigate("home")}
        rightEl={
          <button onClick={markAllRead} className="text-primary text-xs font-medium">Ler tudo</button>
        }
      />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-2 pb-6">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Bell size={40} className="text-gray-200" />
            <p className="text-gray-400 text-sm">Sem notificações.</p>
          </div>
        ) : (
          notifications.map(n => (
            <Card
              key={n.id}
              className={`p-4 flex items-start gap-3 ${!n.read ? "border-l-4 border-primary" : ""}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[n.type]}`}>
                {n.type === "vaccine" && <Syringe size={16} />}
                {n.type === "appointment" && <Calendar size={16} />}
                {n.type === "medication" && <Pill size={16} />}
                {n.type === "general" && <Bell size={16} />}
              </div>
              <div className="flex-1" onClick={() => markRead(n.id)}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ${typeColors[n.type]}`}>
                    {typeLabels[n.type]}
                  </span>
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </div>
                <p className="text-sm font-semibold text-gray-800">{n.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{n.body}</p>
                <p className="text-xs text-gray-300 mt-1">{fmtDate(n.date)}</p>
              </div>
              <button onClick={() => deleteNotification(n.id)} className="text-gray-300 active:text-red-400 shrink-0">
                <X size={16} />
              </button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
