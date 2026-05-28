import { Plus, Pill, Edit2 } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { Card, Badge, Btn } from "@/components/shared";
import { BottomNav } from "@/components/layout/BottomNav";
import { fmtDate } from "@/utils/helpers";

export function Medications() {
  const { medications, pets, navigate } = useApp();

  return (
    <div className="flex flex-col bg-[#FFF8F0] min-h-screen pb-20 md:pb-6">
      <div className="bg-white border-b border-gray-100 px-5 pt-10 pb-4 md:pt-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="font-bold text-2xl text-gray-900">Medicações</h1>
          <button onClick={() => navigate("medication-form")} className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors">
            <Plus size={16} /> Adicionar
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-5 py-4 flex flex-col gap-3 md:grid md:grid-cols-2 md:items-start">
        {medications.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center py-16 gap-3 text-center">
            <Pill size={40} className="text-gray-200" />
            <p className="text-gray-500 font-medium">Nenhuma medicação cadastrada.</p>
            <p className="text-sm text-gray-400">Adicione medicações do seu pet para acompanhar os tratamentos.</p>
            <Btn variant="primary" size="sm" onClick={() => navigate("medication-form")}>Adicionar medicação</Btn>
          </div>
        ) : (
          medications.map(m => {
            const pet = pets.find(p => p.id === m.petId);
            const pendingDoses = m.doses.filter(d => d.status === "pending").length;
            return (
              <Card key={m.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="inline-block text-[9px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-bold uppercase tracking-wide mb-1.5">
                      Medicação
                    </span>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">{m.name}</h3>
                      <Badge label={m.type} className="text-gray-500 bg-gray-100 capitalize" />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{pet?.name} · {m.dosage}</p>
                    <p className="text-xs text-gray-400">Frequência: {m.frequency}</p>
                    <p className="text-xs text-gray-400">Até: {fmtDate(m.endDate)}</p>
                    {m.fasting && <p className="text-xs text-orange-500 font-medium mt-1">Em jejum</p>}
                  </div>
                  {pendingDoses > 0 && (
                    <Badge label={`${pendingDoses} pendente${pendingDoses > 1 ? "s" : ""}`} className="text-orange-600 bg-orange-50" />
                  )}
                </div>
                <button onClick={() => navigate("medication-form", m)} className="mt-3 text-xs text-primary font-medium flex items-center gap-1">
                  <Edit2 size={12} /> Editar
                </button>
              </Card>
            );
          })
        )}
      </div>
      <BottomNav />
    </div>
  );
}
