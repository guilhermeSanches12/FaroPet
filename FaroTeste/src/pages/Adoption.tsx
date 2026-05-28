import { useState } from "react";
import { Plus, MapPin, Phone } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { BottomNav } from "@/components/layout/BottomNav";
import type { AdoptionPost } from "@/types";

const SPECIES_OPTIONS = [
  { value: "", label: "Todas" },
  { value: "dog", label: "Cachorro" },
  { value: "cat", label: "Gato" },
  { value: "bird", label: "Pássaro" },
  { value: "rabbit", label: "Coelho" },
  { value: "other", label: "Outro" },
];

const BR_STATES = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS",
  "MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

const ANIMAL_TYPE_LABELS: Record<string, string> = {
  dog: "Cachorro", cat: "Gato", bird: "Pássaro",
  rabbit: "Coelho", hamster: "Hamster", fish: "Peixe", other: "Animal",
};

function AdoptionCard({ animal, onView }: { animal: AdoptionPost; onView: () => void }) {
  const speciesLabel = ANIMAL_TYPE_LABELS[animal.animalType] ?? "Animal";
  const name = animal.animalName || speciesLabel;
  const phone = animal.contactPhone || animal.contact;
  const breedLine = animal.breed ? ` · ${animal.breed}` : "";

  return (
    <div
      onClick={onView}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-lg"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
    >
      {/* Photo */}
      <div className="w-full overflow-hidden bg-gray-100" style={{ height: 176 }}>
        {animal.photos?.[0] || animal.photo ? (
          <img
            src={animal.photos?.[0] || animal.photo}
            alt={name}
            className="w-full h-full object-cover block"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: "#FFF7ED" }}>
            <img src="/img/pawIcon.png" alt="" className="w-10 h-10 object-contain opacity-35" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: 14 }}>
        {/* Name row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="font-bold text-gray-900 truncate" style={{ fontSize: 15 }}>{name}</p>
            <p className="text-gray-400 mt-0.5" style={{ fontSize: 12 }}>{speciesLabel}{breedLine}</p>
          </div>
          {phone && (
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              onClick={e => e.stopPropagation()}
              title={phone}
              className="shrink-0 flex items-center justify-center rounded-full"
              style={{ width: 32, height: 32, background: "#F97316" }}
            >
              <Phone size={14} className="text-white" />
            </a>
          )}
        </div>

        {/* Chips */}
        {(animal.age || animal.gender || animal.size) && (
          <div className="flex flex-wrap gap-1 mt-2">
            {animal.age && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: "#FFF7ED", color: "#EA580C" }}>
                {animal.age}
              </span>
            )}
            {animal.gender && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: "#FEF3C7", color: "#7C3505" }}>
                {animal.gender}
              </span>
            )}
            {animal.size && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: "#F3F4F6", color: "#374151" }}>
                {animal.size}
              </span>
            )}
          </div>
        )}

        {/* Location */}
        {(animal.city || animal.state) && (
          <p className="flex items-center gap-1 mt-1.5 text-gray-400" style={{ fontSize: 11 }}>
            <MapPin size={11} className="shrink-0" style={{ color: "#F97316" }} />
            {[animal.city, animal.state].filter(Boolean).join(" – ")}
          </p>
        )}

        {/* Description */}
        {animal.description && (
          <p
            className="text-gray-500 mt-2 leading-relaxed overflow-hidden"
            style={{ fontSize: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } as React.CSSProperties}
          >
            {animal.description}
          </p>
        )}

        {/* Footer */}
        <div className="mt-3 pt-2.5 border-t border-gray-50">
          <span className="font-semibold" style={{ fontSize: 12, color: "#F97316" }}>Ver detalhes →</span>
        </div>
      </div>
    </div>
  );
}

export function Adoption() {
  const { adoption, navigate } = useApp();
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  const filtered = adoption.filter(a => {
    if (speciesFilter && a.animalType !== speciesFilter) return false;
    if (stateFilter && a.state !== stateFilter) return false;
    if (cityFilter) {
      const q = cityFilter.toLowerCase();
      if (!(a.city || "").toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const hasFilter = speciesFilter || stateFilter || cityFilter;

  return (
    <div className="bg-[#F4F4F0] dark:bg-[#1E1812] min-h-screen">
      {/* Header */}
      <div className="px-4 sm:px-5 lg:px-8 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Adoção</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Animais esperando um lar</p>
      </div>

      <main className="px-4 sm:px-5 lg:px-8 py-5 pb-28 lg:pb-10 max-w-5xl">

        {/* Filters + publish button */}
        <div className="flex flex-wrap gap-2 mb-5 items-end">
          {/* Species */}
          <div className="flex-1" style={{ minWidth: 120 }}>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Espécie</label>
            <select
              value={speciesFilter}
              onChange={e => setSpeciesFilter(e.target.value)}
              className="w-full border border-gray-200 dark:border-[#4A3828] rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-[#332820] dark:text-gray-200 focus:outline-none focus:border-[#F97316]"
            >
              {SPECIES_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* State */}
          <div className="flex-1" style={{ minWidth: 140 }}>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Estado</label>
            <select
              value={stateFilter}
              onChange={e => setStateFilter(e.target.value)}
              className="w-full border border-gray-200 dark:border-[#4A3828] rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-[#332820] dark:text-gray-200 focus:outline-none focus:border-[#F97316]"
            >
              <option value="">Todos os estados</option>
              {BR_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* City */}
          <div className="flex-1" style={{ minWidth: 120 }}>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Cidade</label>
            <input
              type="text"
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
              placeholder="Buscar cidade..."
              className="w-full border border-gray-200 dark:border-[#4A3828] rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-[#332820] dark:text-gray-200 focus:outline-none focus:border-[#F97316] transition-colors"
            />
          </div>

          {/* Publish button */}
          <button
            onClick={() => navigate("adoption-form")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white shrink-0 hover:opacity-90 transition-opacity"
            style={{ background: "#F97316" }}
          >
            <Plus size={16} strokeWidth={2.5} />
            Publicar
          </button>
        </div>

        {/* Result count */}
        {filtered.length > 0 && (
          <p className="text-xs text-gray-400 mb-4">
            {filtered.length} {filtered.length === 1 ? "animal encontrado" : "animais encontrados"}
          </p>
        )}

        {/* Grid or empty state */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: "#FFF7ED" }}>
              <img src="/img/pawIcon.png" alt="" className="w-10 h-10 object-contain opacity-50" />
            </div>
            <p className="text-base font-bold text-gray-700 dark:text-gray-300 mb-1">Nenhum animal encontrado</p>
            <p className="text-sm text-gray-400 mb-5">
              {hasFilter
                ? "Tente outros filtros ou publique um animal para adoção."
                : "Seja o primeiro a publicar um animal para adoção na sua região."}
            </p>
            <button
              onClick={() => navigate("adoption-form")}
              className="px-5 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
              style={{ background: "#F97316" }}
            >
              Publicar animal para adoção
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(a => (
              <AdoptionCard
                key={a.id}
                animal={a}
                onView={() => navigate("adoption-detail", a)}
              />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
