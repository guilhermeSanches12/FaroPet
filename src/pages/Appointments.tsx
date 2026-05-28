import { useState } from "react";
import { Plus, Calendar, MapPin, Edit2 } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { Card, Badge, Btn } from "@/components/shared";
import { BottomNav } from "@/components/layout/BottomNav";
import { fmtDateParts, APT_STATUS_LABELS, APT_STATUS_COLORS } from "@/utils/helpers";

export function Appointments() {
  const { appointments, pets, navigate } = useApp();
  const [tab, setTab] = useState<"scheduled" | "history">("scheduled");

  const filtered = appointments.filter(a =>
    tab === "scheduled" ? a.status === "scheduled" : a.status !== "scheduled"
  );

  return (
    <div className="flex flex-col bg-[#FFF8F0] min-h-screen pb-20 md:pb-6">
      <div className="bg-white border-b border-gray-100 px-5 pt-10 pb-4 md:pt-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="font-bold text-2xl text-gray-900">Consultas</h1>
          <button onClick={() => navigate("appointment-form")} className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors">
            <Plus size={16} /> Agendar
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-5 pt-4">
      <div className="flex gap-2 mb-4">
        {[{ id: "scheduled", label: "Agendadas" }, { id: "history", label: "Histórico" }].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === t.id ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
        {filtered.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center py-16 gap-3 text-center">
            <Calendar size={40} className="text-gray-200" />
            <p className="text-gray-500 font-medium">Nenhuma consulta encontrada.</p>
            <Btn variant="primary" size="sm" onClick={() => navigate("appointment-form")}>Agendar consulta</Btn>
          </div>
        ) : (
          filtered.map(a => {
            const pet = pets.find(p => p.id === a.petId);
            const { day, month, weekday } = fmtDateParts(a.date);
            return (
              <Card key={a.id} className="p-4">
                <div className="flex items-start gap-3">
                  {/* Date block */}
                  <div className="w-14 shrink-0 flex flex-col items-center justify-center bg-purple-50 rounded-xl py-2.5 border border-purple-100">
                    <p className="text-[9px] text-purple-400 font-bold uppercase tracking-widest">{weekday}</p>
                    <p className="text-xl font-black text-purple-700 leading-tight">{day}</p>
                    <p className="text-[10px] text-purple-500 font-semibold uppercase">{month}</p>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="inline-block text-[9px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-bold uppercase tracking-wide">
                        Consulta
                      </span>
                      <Badge label={APT_STATUS_LABELS[a.status]} className={APT_STATUS_COLORS[a.status]} />
                    </div>
                    <h3 className="font-semibold text-gray-800 truncate">{a.reason}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{pet?.name} · às {a.time}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={11} className="text-gray-400 shrink-0" />
                      <span className="text-xs text-gray-400 truncate">{a.location}</span>
                    </div>
                    {a.vet && <p className="text-xs text-gray-400 mt-0.5">{a.vet}</p>}
                  </div>
                </div>
                <button onClick={() => navigate("appointment-form", a)} className="mt-3 text-xs text-primary font-medium flex items-center gap-1">
                  <Edit2 size={12} /> Editar
                </button>
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
