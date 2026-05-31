import { ChevronLeft, MapPin, Phone, User, Syringe, ClipboardList, MessageCircle, Pencil, CheckCircle } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { BottomNav } from "@/components/layout/BottomNav";
import { adoptionsApi } from "@/services/api";
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

const STATUS_LABELS: Record<string, string> = {
  available: "Disponível",
  in_process: "Em processo",
  adopted: "Adotado",
};
const STATUS_NEXT: Record<string, string> = {
  available: "in_process",
  in_process: "adopted",
};
const STATUS_COLORS: Record<string, string> = {
  available: "bg-green-100 text-green-700",
  in_process: "bg-yellow-100 text-yellow-700",
  adopted: "bg-gray-200 text-gray-500",
};

export function AdoptionDetail() {
  const { navigate, navData, user, showToast, adoption, updateAdoption } = useApp();
  const animal = navData as AdoptionPost | null;

  if (!animal) {
    navigate("adoption");
    return null;
  }

  // Keep in sync with adoption state (in case status was updated)
  const current = adoption.find(a => a.id === current.id) ?? animal;
  const isOwner = !!user && user.id === current.userId;

  const handleStatusChange = async () => {
    const next = STATUS_NEXT[current.status];
    if (!next) return;
    try {
      await adoptionsApi.updateStatus(current.id, next);
      updateAdoption({ ...current, status: next as AdoptionPost["status"] });
      showToast("Status atualizado!");
    } catch { showToast("Erro ao atualizar status", "error"); }
  };

  const speciesLabel = ANIMAL_TYPE_LABELS[current.animalType] ?? "Animal";
  const name = current.animalName || speciesLabel;
  const phone = current.contactPhone || current.contact;
  const whatsapp = current.contactWhatsapp;
  const phoneRaw = (whatsapp || phone || "").replace(/\D/g, "");
  const locationStr = [current.city, current.state].filter(Boolean).join(", ");

  return (
    <div className="bg-[#F4F4F0] dark:bg-[#1E1812] min-h-screen pb-28 lg:pb-10">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="relative w-full" style={{ height: 260, background: "linear-gradient(145deg,#A3510F,#7C3505)" }}>
        {(current.photos?.[0] || current.photo) && (
          <img
            src={current.photos?.[0] || current.photo}
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
            {speciesLabel}{current.breed ? ` · ${current.breed}` : ""}
          </p>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <main className="px-4 sm:px-5 lg:px-8 py-5 max-w-4xl">

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {current.age && (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "#FFF7ED", color: "#EA580C" }}>
              {current.age}
            </span>
          )}
          {current.gender && (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "#FEF3C7", color: "#7C3505" }}>
              {current.gender}
            </span>
          )}
          {current.size && (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
              {current.size}
            </span>
          )}
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100 text-amber-800">
            {speciesLabel}
          </span>
        </div>

        {/* Status badge + owner actions */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${STATUS_COLORS[current.status] ?? "bg-gray-100 text-gray-500"}`}>
            {STATUS_LABELS[current.status] ?? current.status}
          </span>
          {isOwner && (
            <>
              <button
                onClick={() => navigate("adoption-form", current)}
                className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 border border-orange-200 bg-orange-50 px-3 py-1.5 rounded-full hover:bg-orange-100 transition-colors"
              >
                <Pencil size={12} /> Editar
              </button>
              {STATUS_NEXT[current.status] && (
                <button
                  onClick={handleStatusChange}
                  className="flex items-center gap-1.5 text-xs font-semibold text-green-700 border border-green-200 bg-green-50 px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors"
                >
                  <CheckCircle size={12} /> Marcar como "{STATUS_LABELS[STATUS_NEXT[current.status]]}"
                </button>
              )}
            </>
          )}
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
            {current.description && (
              <InfoBlock title="Sobre" text={current.description} />
            )}
            {current.healthInfo && (
              <InfoBlock title="Saúde" text={current.healthInfo} icon={ClipboardList} />
            )}
            {current.vaccinationInfo && (
              <InfoBlock title="Vacinação" text={current.vaccinationInfo} icon={Syringe} />
            )}
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {current.requirements && (
              <InfoBlock title="Requisitos para adoção" text={current.requirements} icon={ClipboardList} />
            )}

            {/* Contact card */}
            <div className="bg-white dark:bg-[#2A2018] rounded-2xl border border-gray-100 dark:border-[#3D2E22] p-5 shadow-sm">
              <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Responsável</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "#FFF7ED" }}>
                  <User size={20} style={{ color: "#F97316" }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{current.contactName}</p>
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

            {current.observations && (
              <InfoBlock title="Observações" text={current.observations} />
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
