import type { PetType, VaccineStatus, AppointmentStatus, VaccineRule } from "@/types";

export function uid() { return Math.random().toString(36).slice(2, 10); }

export function calcAge(birthDate: string) {
  const b = new Date(birthDate);
  const now = new Date();
  const years = now.getFullYear() - b.getFullYear();
  const months = now.getMonth() - b.getMonth();
  if (years === 0) return `${months < 0 ? 0 : months} meses`;
  return `${years} ano${years > 1 ? "s" : ""}`;
}

export function fmtDate(d?: string) {
  if (!d) return "--";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

export function fmtDateParts(d?: string): { day: string; month: string; weekday: string } {
  if (!d) return { day: "--", month: "--", weekday: "--" };
  const date = new Date(d + "T12:00:00");
  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: months[date.getMonth()],
    weekday: weekdays[date.getDay()],
  };
}

export function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr + "T12:00:00");
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

export function isOverdue(scheduledDate?: string): boolean {
  if (!scheduledDate) return false;
  return new Date(scheduledDate + "T12:00:00") < new Date();
}

export const PET_TYPE_LABELS: Record<PetType, string> = {
  dog: "Cachorro", cat: "Gato", bird: "Pássaro",
  fish: "Peixe", hamster: "Hamster", rabbit: "Coelho", other: "Outro",
};

export function petTypeInitial(type: PetType): string {
  const map: Record<PetType, string> = {
    dog: "Ca", cat: "Ga", bird: "Pá", fish: "Pe", hamster: "Ha", rabbit: "Co", other: "Ou",
  };
  return map[type] ?? "Ou";
}

export function petTypeBg(type: PetType): string {
  const map: Record<PetType, string> = {
    dog: "bg-amber-100 text-amber-700",
    cat: "bg-sky-100 text-sky-700",
    bird: "bg-teal-100 text-teal-700",
    fish: "bg-cyan-100 text-cyan-700",
    hamster: "bg-purple-100 text-purple-700",
    rabbit: "bg-pink-100 text-pink-700",
    other: "bg-gray-100 text-gray-600",
  };
  return map[type] ?? "bg-gray-100 text-gray-600";
}

export const STATUS_COLORS: Record<VaccineStatus, string> = {
  taken: "text-green-700 bg-green-50 border border-green-200",
  scheduled: "text-blue-700 bg-blue-50 border border-blue-200",
  pending: "text-orange-700 bg-orange-50 border border-orange-200",
  overdue: "text-red-700 bg-red-50 border border-red-200",
};

export const STATUS_LABELS: Record<VaccineStatus, string> = {
  taken: "Tomada", scheduled: "Agendada", pending: "Pendente", overdue: "Atrasada",
};

export const APT_STATUS_COLORS: Record<AppointmentStatus, string> = {
  scheduled: "text-blue-700 bg-blue-50 border border-blue-200",
  completed: "text-green-700 bg-green-50 border border-green-200",
  canceled: "text-red-700 bg-red-50 border border-red-200",
};

export const APT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  scheduled: "Agendada", completed: "Realizada", canceled: "Cancelada",
};

// ─── Vaccine Rules ──────────────────────────────────────────────────────────

export const VACCINE_RULES: VaccineRule[] = [
  // Dogs
  { name: "V8 Polivalente", species: ["dog"], totalDoses: 3, doseIntervalDays: 21, boosterIntervalDays: 365, recommendedAge: "6–8 semanas", notes: "3 doses com intervalo de 21 dias" },
  { name: "V10 Polivalente", species: ["dog"], totalDoses: 3, doseIntervalDays: 21, boosterIntervalDays: 365, recommendedAge: "6–8 semanas", notes: "3 doses com intervalo de 21 dias" },
  { name: "Antirrábica", species: ["dog"], totalDoses: 1, doseIntervalDays: 0, boosterIntervalDays: 365, recommendedAge: "3 meses", notes: "Reforço anual obrigatório" },
  { name: "Gripe Canina", species: ["dog"], totalDoses: 2, doseIntervalDays: 21, boosterIntervalDays: 365, recommendedAge: "3 meses", notes: "2 doses com intervalo de 21 dias" },
  { name: "Giárdia", species: ["dog"], totalDoses: 2, doseIntervalDays: 14, recommendedAge: "Qualquer idade", notes: "2 doses com intervalo de 14 dias" },
  { name: "Leishmaniose", species: ["dog"], totalDoses: 3, doseIntervalDays: 21, boosterIntervalDays: 365, recommendedAge: "4 meses", notes: "3 doses com intervalo de 21 dias" },
  // Cats
  { name: "Tríplice Felina", species: ["cat"], totalDoses: 3, doseIntervalDays: 21, boosterIntervalDays: 365, recommendedAge: "8 semanas", notes: "3 doses com intervalo de 21 dias" },
  { name: "Quádrupla Felina", species: ["cat"], totalDoses: 3, doseIntervalDays: 21, boosterIntervalDays: 365, recommendedAge: "8 semanas", notes: "3 doses com intervalo de 21 dias" },
  { name: "FIV/FeLV", species: ["cat"], totalDoses: 3, doseIntervalDays: 21, recommendedAge: "12 semanas", notes: "3 doses com intervalo de 21 dias" },
  { name: "Antirrábica Felina", species: ["cat"], totalDoses: 1, doseIntervalDays: 0, boosterIntervalDays: 365, recommendedAge: "3 meses", notes: "Reforço anual obrigatório" },
  // Both
  { name: "Vermífugo", species: ["dog", "cat", "rabbit", "bird", "other"], totalDoses: 1, doseIntervalDays: 0, boosterIntervalDays: 180, recommendedAge: "Qualquer idade", notes: "Reforço a cada 6 meses" },
];

export function getVaccineOptionsBySpecies(species: PetType | string): { value: string; label: string }[] {
  const rules = VACCINE_RULES.filter(r => r.species.includes(species as PetType));
  if (rules.length === 0) {
    return [
      { value: "Antirrábica", label: "Antirrábica" },
      { value: "Vermífugo", label: "Vermífugo" },
    ];
  }
  return rules.map(r => ({ value: r.name, label: r.name }));
}

export function getVaccineRule(name: string, species: string): VaccineRule | undefined {
  return VACCINE_RULES.find(r => r.name === name && r.species.includes(species as PetType));
}

// Legacy: kept for backward compatibility
export const VACCINE_OPTIONS = [
  { value: "V8 Polivalente", label: "V8 Polivalente" },
  { value: "V10 Polivalente", label: "V10 Polivalente" },
  { value: "Antirrábica", label: "Antirrábica" },
  { value: "Gripe Canina", label: "Gripe Canina" },
  { value: "Giárdia", label: "Giárdia" },
  { value: "Tríplice Felina", label: "Tríplice Felina" },
  { value: "Quádrupla Felina", label: "Quádrupla Felina" },
  { value: "FIV/FeLV", label: "FIV/FeLV" },
  { value: "Leishmaniose", label: "Leishmaniose" },
  { value: "Vermífugo", label: "Vermífugo" },
];
