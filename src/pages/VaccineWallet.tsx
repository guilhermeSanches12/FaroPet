import { Plus, Syringe, Edit2, Info } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { Card, Badge } from "@/components/shared";
import { BottomNav } from "@/components/layout/BottomNav";
import { fmtDate, STATUS_LABELS, STATUS_COLORS } from "@/utils/helpers";
import type { VaccineStatus } from "@/types";

export function VaccineWallet() {
  const { vaccines, pets, navigate } = useApp();
  const [selectedPet, setSelectedPet] = useState<string>("all");
  const [filter, setFilter] = useState<VaccineStatus | "all">("all");

  const filtered = vaccines.filter(v => {
    if (selectedPet !== "all" && v.petId !== selectedPet) return false;
    if (filter !== "all" && v.status !== filter) return false;
    return true;
  });

  return (
    <div className="flex flex-col bg-[#FFF8F0] min-h-screen pb-20 md:pb-6">
      <div className="bg-white border-b border-gray-100 px-5 pt-10 pb-4 md:pt-8">
        <div className="max-w-4xl mx-auto flex items-start justify-between">
          <div>
            <h1 className="font-bold text-2xl text-gray-900">Carteira de Vacinas</h1>
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <Info size={12} /> Informativo — confirme com seu veterinário.
            </p>
          </div>
          <button onClick={() => navigate("vaccine-form")} className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors">
            <Plus size={16} /> Registrar
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-5 pt-4">
      {/* Pet filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {[{ id: "all", name: "Todos" }, ...pets].map(p => (
          <button
            key={"id" in p ? p.id : p}
            onClick={() => setSelectedPet("id" in p ? p.id : p)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedPet === ("id" in p ? p.id : p) ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
          >
            {"name" in p ? p.name : "Todos"}
          </button>
        ))}
      </div>

      {/* Status filter */}
      <div className="flex gap-2 pb-3">
        {(["all", "pending", "scheduled", "taken"] as const).map(s => {
          const labels = { all: "Todas", pending: "Pendentes", scheduled: "Agendadas", taken: "Tomadas" };
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${filter === s ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              {labels[s]}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
        {filtered.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center py-16 gap-3 text-center">
            <Syringe size={40} className="text-gray-200" />
            <p className="text-gray-500 font-medium">Nenhuma vacina encontrada.</p>
            <p className="text-sm text-gray-400">Registre as vacinas do seu pet para acompanhar o histórico.</p>
          </div>
        ) : (
          filtered.map(v => {
            const pet = pets.find(p => p.id === v.petId);
            return (
              <Card key={v.id} className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <span className="inline-block text-[9px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-bold uppercase tracking-wide mb-1.5">
                      Vacina{v.dose ? ` · Dose ${v.dose}` : ""}
                    </span>
                    <h3 className="font-semibold text-gray-800">{v.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{pet?.name} · {v.recommendedAge}</p>
                    {v.dateTaken && <p className="text-xs text-gray-400">Tomada: {fmtDate(v.dateTaken)}</p>}
                    {v.scheduledDate && <p className="text-xs text-gray-400">Agendada: {fmtDate(v.scheduledDate)}</p>}
                    {v.nextDose && <p className="text-xs text-blue-500">Próxima dose: {fmtDate(v.nextDose)}</p>}
                  </div>
                  <Badge label={STATUS_LABELS[v.status]} className={STATUS_COLORS[v.status]} />
                </div>
                <button onClick={() => navigate("vaccine-form", v)} className="mt-3 text-xs text-primary font-medium flex items-center gap-1">
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
