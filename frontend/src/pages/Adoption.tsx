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
      className="bg-card text-card-foreground rounded-2xl border border-border overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-lg shadow-sm"
    >
      <div className="w-full h-44 overflow-hidden bg-muted">
        {animal.photos?.[0] || animal.photo ? (
          <img
            src={animal.photos?.[0] || animal.photo}
            alt={name}
            className="w-full h-full object-cover block"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-accent">
            <img src="/img/pawIcon.png" alt="" className="w-10 h-10 object-contain opacity-35" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="font-bold text-foreground text-[15px] truncate">{name}</p>
              {animal.status !== "available" && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${animal.status === "in_process" ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-500"}`}>
                  {animal.status === "in_process" ? "Em processo" : "Adotado"}
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-xs">{speciesLabel}{breedLine}</p>
          </div>
          {phone && (
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              onClick={e => e.stopPropagation()}
              title={phone}
              className="shrink-0 flex items-center justify-center rounded-full w-8 h-8 bg-primary"
            >
              <Phone size={14} className="text-white" />
            </a>
          )}
        </div>

        {(animal.age || animal.gender || animal.size) && (
          <div className="flex flex-wrap gap-1 mt-2">
            {animal.age && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-600">
                {animal.age}
              </span>
            )}
            {animal.gender && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                {animal.gender}
              </span>
            )}
            {animal.size && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {animal.size}
              </span>
            )}
          </div>
        )}

        {(animal.city || animal.state) && (
          <p className="flex items-center gap-1 mt-1.5 text-muted-foreground text-[11px]">
            <MapPin size={11} className="shrink-0 text-primary" />
            {[animal.city, animal.state].filter(Boolean).join(" – ")}
          </p>
        )}

        {animal.description && (
          <p className="text-muted-foreground text-xs mt-2 leading-relaxed line-clamp-2">
            {animal.description}
          </p>
        )}

        <div className="mt-3 pt-2.5 border-t border-border">
          <span className="font-semibold text-primary text-xs">Ver detalhes →</span>
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
    <div className="bg-background min-h-screen pb-20 md:pb-6">
      <div className="bg-card border-b border-border px-4 sm:px-5 lg:px-8 pt-10 pb-4 md:pt-8">
        <h1 className="text-2xl font-bold text-foreground">Adoção</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Animais esperando um lar</p>
      </div>

      <main className="px-4 sm:px-5 lg:px-8 py-5 pb-28 lg:pb-10 max-w-5xl">

        {/* Filters + publish button */}
        <div className="flex flex-wrap gap-2 mb-5 items-end">
          {/* Species */}
          <div className="flex-1" style={{ minWidth: 120 }}>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Espécie</label>
            <select
              value={speciesFilter}
              onChange={e => setSpeciesFilter(e.target.value)}
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-input-background text-foreground focus:outline-none focus:border-primary"
            >
              {SPECIES_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* State */}
          <div className="flex-1" style={{ minWidth: 140 }}>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Estado</label>
            <select
              value={stateFilter}
              onChange={e => setStateFilter(e.target.value)}
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-input-background text-foreground focus:outline-none focus:border-primary"
            >
              <option value="">Todos os estados</option>
              {BR_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* City */}
          <div className="flex-1" style={{ minWidth: 120 }}>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Cidade</label>
            <input
              type="text"
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
              placeholder="Buscar cidade..."
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-input-background text-foreground focus:outline-none focus:border-primary transition-colors"
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
          <p className="text-xs text-muted-foreground mb-4">
            {filtered.length} {filtered.length === 1 ? "animal encontrado" : "animais encontrados"}
          </p>
        )}

        {/* Grid or empty state */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-accent">
              <img src="/img/pawIcon.png" alt="" className="w-10 h-10 object-contain opacity-50" />
            </div>
            <p className="text-base font-bold text-foreground mb-1">Nenhum animal encontrado</p>
            <p className="text-sm text-muted-foreground mb-5">
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
