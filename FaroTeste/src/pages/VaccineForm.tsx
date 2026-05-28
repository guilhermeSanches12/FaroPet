import { useState, useEffect } from "react";
import { useApp } from "@/hooks/useApp";
import { Input, Select, Btn } from "@/components/shared";
import { BackHeader } from "@/components/layout/BackHeader";
import { getVaccineOptionsBySpecies, getVaccineRule } from "@/utils/helpers";
import type { Vaccine } from "@/types";

export function VaccineForm() {
  const { navData, navigate, pets, vaccines, addVaccine, updateVaccine, deleteVaccine } = useApp();
  const editing = navData as Vaccine | null;

  const [petId, setPetId] = useState(editing?.petId ?? (pets[0]?.id ?? ""));
  const [vaccineName, setVaccineName] = useState(editing?.name ?? "");
  const [alreadyTaken, setAlreadyTaken] = useState(editing ? editing.status === "taken" : false);
  const [dateTaken, setDateTaken] = useState(editing?.dateTaken ?? "");
  const [scheduledDate, setScheduledDate] = useState(editing?.scheduledDate ?? "");
  const [clinic, setClinic] = useState(editing?.clinic ?? "");
  const [vet, setVet] = useState(editing?.vet ?? "");
  const [batch, setBatch] = useState(editing?.batch ?? "");
  const [notes, setNotes] = useState(editing?.notes ?? "");

  const selectedPet = pets.find(p => p.id === petId);
  const vaccineOptions = selectedPet ? getVaccineOptionsBySpecies(selectedPet.type) : [];
  const rule = selectedPet && vaccineName ? getVaccineRule(vaccineName, selectedPet.type) : null;

  const existingForVaccine = vaccines.filter(
    v => v.petId === petId && v.name === vaccineName && (!editing || v.id !== editing.id)
  );
  const dosesTaken = existingForVaccine.filter(v => v.status === "taken").length;
  const currentDose = editing?.dose ?? dosesTaken + 1;

  useEffect(() => {
    if (!editing) setVaccineName("");
  }, [petId]);

  const submit = () => {
    if (!petId || !vaccineName) return;
    const status = alreadyTaken ? "taken" : (scheduledDate ? "scheduled" : "pending");
    const vData: Omit<Vaccine, "id"> = {
      petId,
      name: vaccineName,
      recommendedAge: rule?.recommendedAge ?? "",
      status,
      dose: currentDose,
      dateTaken: alreadyTaken && dateTaken ? dateTaken : undefined,
      scheduledDate: !alreadyTaken && scheduledDate ? scheduledDate : undefined,
      clinic: clinic || undefined,
      vet: vet || undefined,
      batch: batch || undefined,
      notes: notes || undefined,
    };
    if (editing) updateVaccine({ ...editing, ...vData });
    else addVaccine(vData);
    navigate("vaccines");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0]">
      <BackHeader title={editing ? "Editar vacina" : "Registrar vacina"} onBack={() => navigate("vaccines")} />
      <div className="max-w-2xl mx-auto w-full px-5 pb-10 flex flex-col gap-5 pt-4">

        <Select
          label="Pet"
          value={petId}
          onChange={setPetId}
          options={pets.map(p => ({ value: p.id, label: p.name }))}
        />

        {vaccineOptions.length > 0 && (
          <Select
            label="Vacina"
            value={vaccineName}
            onChange={setVaccineName}
            options={[{ value: "", label: "Selecione a vacina..." }, ...vaccineOptions]}
          />
        )}

        {rule && (
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-xs text-orange-800">
            <p className="font-semibold">{rule.name}</p>
            {rule.recommendedAge && <p className="mt-0.5">Indicada para: {rule.recommendedAge}</p>}
            {rule.notes && <p className="mt-0.5">{rule.notes}</p>}
            <p className="font-medium mt-1">Dose {currentDose} de {rule.totalDoses}{rule.boosterIntervalDays ? " + reforços" : ""}</p>
          </div>
        )}

        <label className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-primary transition-colors">
          <input
            type="checkbox"
            checked={alreadyTaken}
            onChange={e => setAlreadyTaken(e.target.checked)}
            className="w-5 h-5 rounded accent-[#FF8000]"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">Vacina já foi tomada</p>
            <p className="text-xs text-gray-400">Marque se a vacina já foi aplicada</p>
          </div>
        </label>

        {alreadyTaken ? (
          <Input label="Data de aplicação" type="date" value={dateTaken} onChange={setDateTaken} />
        ) : (
          <Input label="Data agendada — opcional" type="date" value={scheduledDate} onChange={setScheduledDate} />
        )}

        <Input label="Clínica — opcional" value={clinic} onChange={setClinic} placeholder="Nome da clínica" />
        <Input label="Veterinário — opcional" value={vet} onChange={setVet} placeholder="Dr. Nome" />
        <Input label="Lote — opcional" value={batch} onChange={setBatch} placeholder="Número do lote" />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Observações — opcional</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-primary resize-none h-20"
          />
        </div>

        <Btn variant="primary" full size="lg" onClick={submit}>Salvar vacina</Btn>
        {editing && (
          <Btn variant="danger" full onClick={() => { deleteVaccine(editing.id); navigate("vaccines"); }}>
            Excluir vacina
          </Btn>
        )}
      </div>
    </div>
  );
}
