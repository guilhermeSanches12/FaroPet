import { useState } from "react";
import { ChevronLeft, Edit2, Trash2, Syringe, Calendar, Pill, PawPrint, Weight, Venus, Mars, Cake } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { Card, Badge, Btn } from "@/components/shared";
import { BottomNav } from "@/components/layout/BottomNav";
import { calcAge, fmtDate, fmtDateParts, PET_TYPE_LABELS, STATUS_LABELS, STATUS_COLORS, petTypeInitial, petTypeBg } from "@/utils/helpers";
import type { Pet, PetType } from "@/types";

function PetHeroAvatar({ type, photo, name }: { type: PetType; photo?: string; name: string }) {
  if (photo) {
    return <img src={photo} alt={name} className="w-full h-full object-cover" />;
  }
  const bg = petTypeBg(type);
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center gap-3 ${bg}`}>
      <PawPrint size={56} className="opacity-60" />
      <span className="text-lg font-bold uppercase tracking-widest opacity-70">{petTypeInitial(type)}</span>
    </div>
  );
}

function InfoChip({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-white dark:bg-[#2A2018] rounded-2xl p-3 border border-gray-100 dark:border-[#3D2E22] shadow-sm">
      <Icon size={16} className="text-primary" />
      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">{label}</span>
      <span className="text-sm font-bold text-gray-800 dark:text-gray-200 text-center leading-tight">{value}</span>
    </div>
  );
}

export function PetDetail() {
  const { navData, navigate, deletePet, vaccines, appointments, medications } = useApp();
  const pet = navData as Pet;
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!pet) { navigate("pets"); return null; }

  const petVaccines = vaccines.filter(v => v.petId === pet.id);
  const pendingVaccines = petVaccines.filter(v => v.status !== "taken");
  const petApts = appointments.filter(a => a.petId === pet.id && a.status === "scheduled").slice(0, 3);
  const petMeds = medications.filter(m => m.petId === pet.id).slice(0, 3);

  const doDelete = () => { deletePet(pet.id); navigate("pets"); };

  return (
    <div className="flex flex-col bg-[#FFF8F0] dark:bg-[#1E1812] min-h-screen pb-24 md:pb-6">

      {/* ── Mobile hero / Desktop header ───────────────────────────────── */}
      <div className="relative">
        {/* Photo area */}
        <div className="w-full h-72 md:h-96 overflow-hidden bg-orange-100 dark:bg-[#2A2018] relative">
          <PetHeroAvatar type={pet.type} photo={pet.photo} name={pet.name} />
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Pet name on photo */}
          <div className="absolute bottom-5 left-5 right-16">
            <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">
              {PET_TYPE_LABELS[pet.type]}
            </p>
            <h1 className="text-white text-3xl font-black leading-tight drop-shadow-sm">{pet.name}</h1>
            <p className="text-white/70 text-sm mt-0.5">{pet.breed}</p>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate("pets")}
          className="absolute top-12 left-5 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/40 transition-colors"
        >
          <ChevronLeft size={22} className="text-white" />
        </button>

        {/* Action buttons */}
        <div className="absolute top-12 right-5 flex gap-2">
          <button
            onClick={() => navigate("pet-form", pet)}
            className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/40 transition-colors"
          >
            <Edit2 size={16} className="text-white" />
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500/70 transition-colors"
          >
            <Trash2 size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* ── Content area ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto w-full px-4 py-5">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Left: profile info ─────────────────────────────────────── */}
          <div className="lg:w-72 shrink-0 flex flex-col gap-4">

            {/* Stats chips */}
            <div className="grid grid-cols-3 gap-2">
              <InfoChip icon={Cake} label="Idade" value={calcAge(pet.birthDate)} />
              <InfoChip
                icon={pet.gender === "male" ? Mars : Venus}
                label="Sexo"
                value={pet.gender === "male" ? "Macho" : "Fêmea"}
              />
              <InfoChip icon={Weight} label="Peso" value={pet.weight ? `${pet.weight} kg` : "--"} />
            </div>

            {/* Birth date */}
            <Card className="px-4 py-3 flex items-center gap-3">
              <Cake size={16} className="text-primary shrink-0" />
              <div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">Data de nascimento</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{fmtDate(pet.birthDate)}</p>
              </div>
            </Card>

            {/* Conditions */}
            {pet.conditions && (
              <Card className="p-4">
                <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wide mb-1.5">Comorbidades</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{pet.conditions}</p>
              </Card>
            )}

            {/* Notes */}
            {pet.notes && (
              <Card className="p-4">
                <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wide mb-1.5">Observações</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{pet.notes}</p>
              </Card>
            )}

            {/* Edit button */}
            <Btn variant="primary" full onClick={() => navigate("pet-form", pet)}>
              <Edit2 size={15} /> Editar perfil
            </Btn>
          </div>

          {/* ── Right: health data ─────────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-5">

            {/* Vaccines */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900 dark:text-gray-100 text-base flex items-center gap-2">
                  <Syringe size={17} className="text-primary" /> Vacinas
                </h2>
                <button onClick={() => navigate("vaccines")} className="text-primary text-xs font-semibold hover:underline">
                  Ver todas ({petVaccines.length})
                </button>
              </div>

              {petVaccines.length === 0 ? (
                <Card className="p-5 flex flex-col items-center gap-2 text-center">
                  <Syringe size={28} className="text-gray-200 dark:text-gray-600" />
                  <p className="text-sm text-gray-400 dark:text-gray-500">Nenhuma vacina registrada.</p>
                  <button onClick={() => navigate("vaccine-form")} className="text-primary text-xs font-semibold hover:underline">
                    Registrar vacina
                  </button>
                </Card>
              ) : (
                <div className="flex flex-col gap-2">
                  {(pendingVaccines.length > 0 ? pendingVaccines : petVaccines).slice(0, 4).map(v => (
                    <Card key={v.id} className="px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-[#3D2E22] flex items-center justify-center shrink-0">
                        <Syringe size={14} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{v.name}</p>
                        {v.dose && <p className="text-xs text-gray-400 dark:text-gray-500">Dose {v.dose}</p>}
                      </div>
                      <Badge label={STATUS_LABELS[v.status]} className={STATUS_COLORS[v.status]} />
                    </Card>
                  ))}
                </div>
              )}
            </section>

            {/* Appointments */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900 dark:text-gray-100 text-base flex items-center gap-2">
                  <Calendar size={17} className="text-primary" /> Próximas consultas
                </h2>
                <button onClick={() => navigate("appointments")} className="text-primary text-xs font-semibold hover:underline">
                  Ver todas
                </button>
              </div>

              {petApts.length === 0 ? (
                <Card className="p-5 flex flex-col items-center gap-2 text-center">
                  <Calendar size={28} className="text-gray-200 dark:text-gray-600" />
                  <p className="text-sm text-gray-400 dark:text-gray-500">Nenhuma consulta agendada.</p>
                  <button onClick={() => navigate("appointment-form")} className="text-primary text-xs font-semibold hover:underline">
                    Agendar consulta
                  </button>
                </Card>
              ) : (
                <div className="flex flex-col gap-2">
                  {petApts.map(a => {
                    const { day, month, weekday } = fmtDateParts(a.date);
                    return (
                      <Card key={a.id} className="px-3 py-3 flex items-center gap-3">
                        <div className="w-14 shrink-0 flex flex-col items-center justify-center bg-orange-50 dark:bg-[#332820] rounded-xl py-2 border border-orange-100 dark:border-[#4A3828]">
                          <p className="text-[9px] text-orange-400 font-bold uppercase tracking-widest">{weekday}</p>
                          <p className="text-xl font-black text-orange-700 dark:text-orange-400 leading-tight">{day}</p>
                          <p className="text-[10px] text-orange-500 font-semibold uppercase">{month}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{a.reason}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">{a.time} · {a.location}</p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Medications */}
            {petMeds.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-gray-900 dark:text-gray-100 text-base flex items-center gap-2">
                    <Pill size={17} className="text-primary" /> Medicações
                  </h2>
                  <button onClick={() => navigate("medications")} className="text-primary text-xs font-semibold hover:underline">
                    Ver todas
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {petMeds.map(m => (
                    <Card key={m.id} className="px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-[#3D2E22] flex items-center justify-center shrink-0">
                        <Pill size={14} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{m.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{m.dosage} · {m.frequency}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* ── Delete confirmation modal ────────────────────────────────────── */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
          <div className="bg-white dark:bg-[#2A2018] w-full md:max-w-sm rounded-t-3xl md:rounded-3xl p-6 flex flex-col gap-4">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">Remover {pet.name}?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Esta ação não pode ser desfeita. Todos os dados do pet serão removidos.</p>
            <div className="flex gap-3">
              <Btn variant="ghost" full onClick={() => setConfirmDelete(false)}>Cancelar</Btn>
              <Btn variant="danger" full onClick={doDelete}>Remover</Btn>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
