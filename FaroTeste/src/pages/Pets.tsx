import { Plus, ChevronRight, Info, PawPrint } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { Card, Btn } from "@/components/shared";
import { BottomNav } from "@/components/layout/BottomNav";
import { calcAge, PET_TYPE_LABELS, petTypeInitial, petTypeBg } from "@/utils/helpers";
import type { PetType } from "@/types";

function PetAvatar({ type, photo, name }: { type: PetType; photo?: string; name: string }) {
  if (photo) return <img src={photo} alt={name} className="w-full h-full object-cover" />;
  const bg = petTypeBg(type);
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center gap-0.5 ${bg}`}>
      <PawPrint size={22} />
      <span className="text-[9px] font-bold uppercase tracking-wide">{petTypeInitial(type)}</span>
    </div>
  );
}

export function Pets() {
  const { pets, navigate } = useApp();

  return (
    <div className="flex flex-col bg-[#FFF8F0] min-h-screen pb-20 md:pb-6">
      <div className="bg-white border-b border-gray-100 px-5 pt-10 pb-4 md:pt-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="font-bold text-2xl text-gray-900">Meus Pets</h1>
          {pets.length < 3 && (
            <button
              onClick={() => navigate("pet-form")}
              className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
            >
              <Plus size={16} />
              Adicionar pet
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-5 py-6">
        {pets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
              <PawPrint size={40} className="text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-gray-700 text-lg">Nenhum pet cadastrado</h2>
              <p className="text-gray-400 text-sm mt-1 max-w-xs">
                Adicione seu primeiro pet para começar a gerenciar a saúde dele.
              </p>
            </div>
            <Btn variant="primary" onClick={() => navigate("pet-form")}>Adicionar pet</Btn>
          </div>
        ) : (
          <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3">
            {pets.map(p => (
              <button key={p.id} onClick={() => navigate("pet-detail", p)} className="text-left w-full group">
                <Card className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-orange-100 flex-shrink-0">
                    <PetAvatar type={p.type} photo={p.photo} name={p.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800">{p.name}</h3>
                    <p className="text-sm text-gray-500">{PET_TYPE_LABELS[p.type]} · {p.breed}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{calcAge(p.birthDate)} · {p.gender === "male" ? "Macho" : "Fêmea"}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
                </Card>
              </button>
            ))}

            {pets.length < 3 && (
              <button
                onClick={() => navigate("pet-form")}
                className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-10 flex flex-col items-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-colors"
              >
                <Plus size={24} strokeWidth={1.5} />
                <span className="text-sm font-medium">Adicionar pet</span>
              </button>
            )}
          </div>
        )}

        {pets.length >= 3 && (
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl p-3 mt-4">
            <Info size={16} className="text-orange-500 flex-shrink-0" />
            <p className="text-xs text-orange-700">Limite de 3 pets por conta atingido.</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
