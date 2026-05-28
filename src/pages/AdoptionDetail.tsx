import { ChevronLeft, MapPin, Phone, User, Syringe, ClipboardList, MessageCircle } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { BottomNav } from "@/components/layout/BottomNav";
import type { AdoptionPost } from "@/types";

const ANIMAL_TYPE_LABELS: Record<string, string> = {
  dog: "Cachorro", cat: "Gato", bird: "Pássaro",
  rabbit: "Coelho", hamster: "Hamster", fish: "Peixe", other: "Animal",
};

function InfoBlock({ title, text, icon: Icon }: { title: string; text: string; icon?: React.ElementType }) {
  return (
    <div className="bg-white dark:bg-[#2A2018] rounded-2xl border border-gray-100 dark:border-[#3D2E22] p-5 shadow-sm">
      {Icon ? (
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#FFF7ED" }}>
            <Icon size={16} style={{ color: "#F97316" }} />
          </div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        </div>
      ) : (
        <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">{title}</h2>
      )}
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{text}</p>
    </div>
  );
}

export function AdoptionDetail() {
  const { navigate, navData } = useApp();
  const animal = navData as AdoptionPost | null;

  if (!animal) {
    navigate("adoption");
    return null;
  }

  const speciesLabel = ANIMAL_TYPE_LABELS[animal.animalType] ?? "Animal";
  const name = animal.animalName || speciesLabel;
  const phone = animal.contactPhone || animal.contact;
  const whatsapp = animal.contactWhatsapp;
  const phoneRaw = (whatsapp || phone || "").replace(/\D/g, "");
  const locationStr = [animal.city, animal.state].filter(Boolean).join(", ");

  return (
    <div className="bg-[#F4F4F0] dark:bg-[#1E1812] min-h-screen pb-28 lg:pb-10">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="relative w-full" style={{ height: 260, background: "linear-gradient(145deg,#A3510F,#7C3505)" }}>
        {(animal.photos?.[0] || animal.photo) && (
          <img
            src={animal.photos?.[0] || animal.photo}
            alt={name}
            className="w-full h-full object-cover absolute inset-0"
          />
        )}
        {/* gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }}
        />

        {/* Mobile back */}
        <button
          onClick={() => navigate("adoption")}
          className="lg:hidden absolute top-12 left-5 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow"
          aria-label="Voltar"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>

        {/* Desktop back */}
        <button
          onClick={() => navigate("adoption")}
          className="hidden lg:flex absolute top-6 left-6 items-center gap-2 text-sm font-semibold text-white opacity-80 hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={16} />
          Todos os animais
        </button>

        {/* Name overlay */}
        <div className="absolute bottom-4 left-5 right-5">
          <h1 className="text-2xl font-bold text-white leading-tight">{name}</h1>
          <p className="text-sm text-white/80 mt-0.5">
            {speciesLabel}{animal.breed ? ` · ${animal.breed}` : ""}
          </p>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <main className="px-4 sm:px-5 lg:px-8 py-5 max-w-4xl">

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {animal.age && (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "#FFF7ED", color: "#EA580C" }}>
              {animal.age}
            </span>
          )}
          {animal.gender && (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "#FEF3C7", color: "#7C3505" }}>
              {animal.gender}
            </span>
          )}
          {animal.size && (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
              {animal.size}
            </span>
          )}
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100 text-amber-800">
            {speciesLabel}
          </span>
        </div>

        {/* Location */}
        {locationStr && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-5">
            <MapPin size={16} className="shrink-0" style={{ color: "#F97316" }} />
            <span className="font-medium">{locationStr}</span>
          </div>
        )}

        {/* Desktop 2-col / Mobile stacked */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-4 lg:space-y-0">

          {/* Left column */}
          <div className="space-y-4">
            {animal.description && (
              <InfoBlock title="Sobre" text={animal.description} />
            )}
            {animal.healthInfo && (
              <InfoBlock title="Saúde" text={animal.healthInfo} icon={ClipboardList} />
            )}
            {animal.vaccinationInfo && (
              <InfoBlock title="Vacinação" text={animal.vaccinationInfo} icon={Syringe} />
            )}
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {animal.requirements && (
              <InfoBlock title="Requisitos para adoção" text={animal.requirements} icon={ClipboardList} />
            )}

            {/* Contact card */}
            <div className="bg-white dark:bg-[#2A2018] rounded-2xl border border-gray-100 dark:border-[#3D2E22] p-5 shadow-sm">
              <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Responsável</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "#FFF7ED" }}>
                  <User size={20} style={{ color: "#F97316" }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{animal.contactName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{phone}</p>
                </div>
              </div>
              <div className="flex gap-3">
                {whatsapp && phoneRaw && (
                  <a
                    href={`https://wa.me/55${phoneRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl text-sm font-bold text-white text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    style={{ background: "#25D366" }}
                  >
                    <MessageCircle size={15} />
                    WhatsApp
                  </a>
                )}
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\D/g, "")}`}
                    className="flex-1 py-3 rounded-xl text-sm font-bold text-white text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    style={{ background: "#F97316" }}
                  >
                    <Phone size={15} />
                    Ligar
                  </a>
                )}
              </div>
            </div>

            {animal.observations && (
              <InfoBlock title="Observações" text={animal.observations} />
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
