import { useState } from "react";
import { useApp } from "@/hooks/useApp";
import { Input, Select, Btn } from "@/components/shared";
import { BackHeader } from "@/components/layout/BackHeader";
import type { Appointment, AppointmentStatus } from "@/types";

export function AppointmentForm() {
  const { navData, navigate, pets, addAppointment, updateAppointment, deleteAppointment } = useApp();
  const editing = navData as Appointment | null;

  const [form, setForm] = useState({
    petId: editing?.petId ?? (pets[0]?.id ?? ""),
    date: editing?.date ?? "",
    time: editing?.time ?? "",
    reason: editing?.reason ?? "",
    location: editing?.location ?? "",
    vet: editing?.vet ?? "",
    hasMedication: editing?.hasMedication ?? false,
    medicationDetails: editing?.medicationDetails ?? "",
    observations: editing?.observations ?? "",
    status: (editing?.status ?? "scheduled") as AppointmentStatus,
  });

  const set = (k: keyof typeof form) => (v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.petId || !form.date || !form.reason || !form.location) return;
    if (editing) updateAppointment({ ...editing, ...form });
    else addAppointment(form);
    navigate("appointments");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BackHeader title={editing ? "Editar consulta" : "Nova consulta"} onBack={() => navigate("appointments")} />
      <div className="px-5 pb-10 flex flex-col gap-4">
        <Select label="Pet" value={form.petId} onChange={set("petId")} options={pets.map(p => ({ value: p.id, label: p.name }))} />
        <Input label="Data" type="date" value={form.date} onChange={set("date")} />
        <Input label="Horário" type="time" value={form.time} onChange={set("time")} />
        <Input label="Motivo da consulta" value={form.reason} onChange={set("reason")} placeholder="Ex: Consulta de rotina" />
        <Input label="Local / Clínica" value={form.location} onChange={set("location")} placeholder="Nome da clínica" />
        <Input label="Veterinário — opcional" value={form.vet} onChange={set("vet")} placeholder="Dr. Nome" />
        <Select
          label="Status"
          value={form.status}
          onChange={v => setForm(f => ({ ...f, status: v as AppointmentStatus }))}
          options={[
            { value: "scheduled", label: "Agendada" },
            { value: "completed", label: "Realizada" },
            { value: "canceled", label: "Cancelada" },
          ]}
        />
        <div className="flex items-center gap-3">
          <button
            onClick={() => setForm(f => ({ ...f, hasMedication: !f.hasMedication }))}
            className={`w-12 h-6 rounded-full transition-all relative ${form.hasMedication ? "bg-primary" : "bg-gray-200"}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.hasMedication ? "right-1" : "left-1"}`} />
          </button>
          <label className="text-sm font-medium text-gray-700">Medicação prescrita</label>
        </div>
        {form.hasMedication && (
          <Input label="Detalhes da medicação" value={form.medicationDetails} onChange={set("medicationDetails")} placeholder="Nome e dosagem" />
        )}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Observações — opcional</label>
          <textarea
            value={form.observations}
            onChange={e => set("observations")(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-primary resize-none h-20"
          />
        </div>
        <Btn variant="primary" full size="lg" onClick={submit}>Salvar consulta</Btn>
        {editing && (
          <Btn variant="danger" full onClick={() => { deleteAppointment(editing.id); navigate("appointments"); }}>Excluir consulta</Btn>
        )}
      </div>
    </div>
  );
}
