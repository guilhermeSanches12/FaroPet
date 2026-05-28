import { useState } from "react";
import { Camera, PawPrint } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { Input, Select, Btn } from "@/components/shared";
import { BackHeader } from "@/components/layout/BackHeader";
import { calcAge, PET_TYPE_LABELS } from "@/utils/helpers";
import type { Pet, PetType } from "@/types";

export function PetForm() {
  const { navData, navigate, addPet, updatePet } = useApp();
  const editing = navData as Pet | null;

  const [form, setForm] = useState({
    name: editing?.name ?? "",
    type: (editing?.type ?? "dog") as PetType,
    breed: editing?.breed ?? "",
    gender: (editing?.gender ?? "male") as "male" | "female",
    birthDate: editing?.birthDate ?? "",
    weight: String(editing?.weight ?? ""),
    conditions: editing?.conditions ?? "",
    notes: editing?.notes ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    const errs: Record<string, string> = {};
    if (!form.name) errs.name = "Obrigatório";
    if (!form.breed) errs.breed = "Obrigatório";
    if (!form.birthDate) errs.birthDate = "Obrigatório";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const pet = {
      name: form.name, type: form.type, breed: form.breed,
      gender: form.gender, birthDate: form.birthDate,
      weight: form.weight ? Number(form.weight) : undefined,
      conditions: form.conditions || undefined, notes: form.notes || undefined,
    };
    if (editing) updatePet({ ...editing, ...pet });
    else addPet(pet);
    navigate("pets");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BackHeader title={editing ? "Editar pet" : "Novo pet"} onBack={() => navigate("pets")} />
      <div className="px-5 pb-10 flex flex-col gap-4">
        <div className="flex justify-center py-4">
          <div className="w-24 h-24 rounded-2xl bg-orange-100 border-2 border-dashed border-primary/40 flex flex-col items-center justify-center gap-1 cursor-pointer">
            <Camera size={24} className="text-primary" />
            <span className="text-xs text-primary font-medium">Foto</span>
          </div>
        </div>

        <Input label="Nome do pet" value={form.name} onChange={set("name")} placeholder="Ex: Floquinho" error={errors.name} />
        <Select
          label="Tipo de animal"
          value={form.type}
          onChange={v => setForm(f => ({ ...f, type: v as PetType }))}
          options={Object.entries(PET_TYPE_LABELS).map(([k, v]) => ({ value: k, label: v }))}
        />
        <Input label="Raça" value={form.breed} onChange={set("breed")} placeholder="Ex: Golden Retriever" error={errors.breed} />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Sexo</label>
          <div className="flex gap-3">
            {[{ v: "male", l: "Macho" }, { v: "female", l: "Fêmea" }].map(({ v, l }) => (
              <button
                key={v}
                onClick={() => setForm(f => ({ ...f, gender: v as "male" | "female" }))}
                className={`flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all ${form.gender === v ? "border-primary bg-primary/10 text-primary" : "border-gray-200 text-gray-500"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <Input label="Data de nascimento" type="date" value={form.birthDate} onChange={set("birthDate")} error={errors.birthDate} />
        {form.birthDate && <p className="text-xs text-gray-500 -mt-2">Idade calculada: {calcAge(form.birthDate)}</p>}
        <Input label="Peso (kg) — opcional" type="number" value={form.weight} onChange={set("weight")} placeholder="Ex: 12.5" />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Comorbidades — opcional</label>
          <textarea
            value={form.conditions}
            onChange={e => set("conditions")(e.target.value)}
            placeholder="Ex: Diabetes, alergia a frango..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-primary resize-none h-20"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Observações — opcional</label>
          <textarea
            value={form.notes}
            onChange={e => set("notes")(e.target.value)}
            placeholder="Notas adicionais..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-primary resize-none h-20"
          />
        </div>

        <Btn variant="primary" full size="lg" onClick={submit}>
          {editing ? "Salvar alterações" : "Cadastrar pet"}
        </Btn>
      </div>
    </div>
  );
}
