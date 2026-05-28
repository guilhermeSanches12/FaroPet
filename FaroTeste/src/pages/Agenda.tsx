import { Calendar } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { Card, Badge } from "@/components/shared";
import { BottomNav } from "@/components/layout/BottomNav";
import { fmtDateParts } from "@/utils/helpers";

type AgendaItem = {
  id: string; date: string; time?: string; type: string;
  title: string; petName: string; status: string;
};

export function Agenda() {
  const { vaccines, appointments, medications, pets } = useApp();
  const [view, setView] = useState<"today" | "week" | "all">("today");

  const todayStr = new Date().toISOString().split("T")[0];

  const items: AgendaItem[] = [
    ...vaccines.filter(v => v.status === "scheduled" && v.scheduledDate).map(v => ({
      id: v.id, date: v.scheduledDate!, type: "Vacina", title: v.name,
      petName: pets.find(p => p.id === v.petId)?.name ?? "", status: "Agendada",
    })),
    ...appointments.filter(a => a.status === "scheduled").map(a => ({
      id: a.id, date: a.date, time: a.time, type: "Consulta", title: a.reason,
      petName: pets.find(p => p.id === a.petId)?.name ?? "", status: "Agendada",
    })),
    ...medications.flatMap(m =>
      m.doses.filter(d => d.status === "pending").map((d, i) => ({
        id: `${m.id}-${i}`, date: d.date, time: d.time, type: "Medicação", title: m.name,
        petName: pets.find(p => p.id === m.petId)?.name ?? "", status: "Pendente",
      }))
    ),
  ].sort((a, b) => a.date.localeCompare(b.date));

  const filtered = items.filter(item => {
    if (view === "today") return item.date === todayStr;
    if (view === "week") {
      const itemDate = new Date(item.date);
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() + 7);
      return itemDate >= new Date(todayStr) && itemDate <= weekEnd;
    }
    return true;
  });

  return (
    <div className="flex flex-col bg-[#FFF8F0] min-h-screen pb-20 md:pb-6">
      <div className="bg-white border-b border-gray-100 px-5 pt-10 pb-4 md:pt-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-bold text-2xl text-gray-900">Agenda</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-5 pt-4">
        <div className="flex gap-2 mb-4">
          {[{ id: "today", label: "Hoje" }, { id: "week", label: "7 dias" }, { id: "all", label: "Tudo" }].map(t => (
            <button
              key={t.id}
              onClick={() => setView(t.id as typeof view)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${view === t.id ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
          {filtered.length === 0 ? (
            <div className="col-span-2 flex flex-col items-center justify-center py-16 gap-3 text-center">
              <Calendar size={40} className="text-gray-200" />
              <p className="text-gray-500 font-medium">Nenhum evento para este período.</p>
              <p className="text-sm text-gray-400">Agende vacinas ou consultas para vê-las aqui.</p>
            </div>
          ) : (
            filtered.map(item => {
              const { day, month, weekday } = fmtDateParts(item.date);
              return (
                <Card key={item.id} className="p-3 flex items-center gap-3">
                  <div className="w-14 shrink-0 flex flex-col items-center justify-center bg-orange-50 rounded-xl py-2 border border-orange-100">
                    <p className="text-[9px] text-orange-400 font-bold uppercase tracking-widest">{weekday}</p>
                    <p className="text-xl font-black text-orange-700 leading-tight">{day}</p>
                    <p className="text-[10px] text-orange-500 font-semibold uppercase">{month}</p>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[9px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-bold uppercase tracking-wide mb-1 border border-orange-100">
                      {item.type}
                    </span>
                    <p className="font-semibold text-gray-800 text-sm truncate">{item.title}</p>
                    <p className="text-xs text-gray-400">
                      {item.petName}{item.time ? ` · ${item.time}` : ""}
                    </p>
                  </div>

                  <Badge label={item.status} className="text-orange-600 bg-orange-50 shrink-0" />
                </Card>
              );
            })
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
