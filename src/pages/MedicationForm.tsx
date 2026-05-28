import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { Input, Select, Btn } from "@/components/shared";
import { BackHeader } from "@/components/layout/BackHeader";
import { fmtDate } from "@/utils/helpers";
import type { Medication, MedType } from "@/types";

export function MedicationForm() {
  const { navData, navigate, pets, addMedication, updateMedication, deleteMedication } = useApp();
  const editing = navData as Medication | null;

  const [form, setForm] = useState({
    petId: editing?.petId ?? (pets[0]?.id ?? ""),
    name: editing?.name ?? "",
    dosage: editing?.dosage ?? "",
    frequency: editing?.frequency ?? "24 horas",
    durationDays: String(editing?.durationDays ?? 7),
    startDate: editing?.startDate ?? "",
    fasting: editing?.fasting ?? false,
    type: (editing?.type ?? "pill") as MedType,
    reason: editing?.reason ?? "",
    observations: editing?.observations ?? "",
  });

  const set = (k: keyof typeof form) => (v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const endDate = form.startDate && form.durationDays
    ? new Date(new Date(form.startDate).getTime() + Number(form.durationDays) * 86400000).toISOString().split("T")[0]
    : "";

  const submit = () => {
    if (!form.petId || !form.name || !form.startDate || !form.reason) return;
    const data = { ...form, durationDays: Number(form.durationDays), endDate };
    if (editing) updateMedication({ ...editing, ...data });
    else addMedication(data);
    navigate("medications");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BackHeader title={editing ? "Editar medicação" : "Nova medicação"} onBack={() => navigate("medications")} />
      <div className="px-5 pb-10 flex flex-col gap-4">
        <Select label="Pet" value={form.petId} onChange={set("petId")} options={pets.map(p => ({ value: p.id, label: p.name }))} />
        <Input label="Nome da medicação" value={form.name} onChange={set("name")} placeholder="Ex: Nexgard" />
        <Input label="Dosagem — opcional" value={form.dosage} onChange={set("dosage")} placeholder="Ex: 1 comprimido" />
        <Select
          label="Tipo"
          value={form.type}
          onChange={v => setForm(f => ({ ...f, type: v as MedType }))}
          options={[
            { value: "pill", label: "Comprimido" },
            { value: "liquid", label: "Líquido" },
            { value: "injection", label: "Injeção" },
            { value: "topical", label: "Tópico" },
            { value: "other", label: "Outro" },
          ]}
        />
        <Input label="Frequência" value={form.frequency} onChange={set("frequency")} placeholder="Ex: A cada 8 horas, Diário" />
        <Input label="Duração (dias)" type="number" value={form.durationDays} onChange={set("durationDays")} placeholder="Ex: 7" />
        <Input label="Data de início" type="date" value={form.startDate} onChange={set("startDate")} />
        {endDate && <p className="text-xs text-gray-500 -mt-2">Término: {fmtDate(endDate)}</p>}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setForm(f => ({ ...f, fasting: !f.fasting }))}
            className={`w-12 h-6 rounded-full transition-all relative ${form.fasting ? "bg-primary" : "bg-gray-200"}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.fasting ? "right-1" : "left-1"}`} />
          </button>
          <label className="text-sm font-medium text-gray-700">Deve ser administrado em jejum</label>
        </div>
        <Input label="Motivo da medicação" value={form.reason} onChange={set("reason")} placeholder="Ex: Antipulgas" />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Observações — opcional</label>
          <textarea
            value={form.observations}
            onChange={e => set("observations")(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-primary resize-none h-20"
          />
        </div>
        <Btn variant="primary" full size="lg" onClick={submit}>Salvar medicação</Btn>
        {editing && (
          <Btn variant="danger" full onClick={() => { deleteMedication(editing.id); navigate("medications"); }}>Excluir medicação</Btn>
        )}
      </div>
    </div>
  );
}
