import { Bell, Plus, Syringe, ArrowRight, Calendar, MapPin, PawPrint, Pill } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { Card } from "@/components/shared";
import { fmtDateParts, PET_TYPE_LABELS, petTypeInitial, petTypeBg, fmtDate } from "@/utils/helpers";
import imgUserAvatar from "@/imports/Homepage/c87ce173e6c8c86b453188a1b222549070cb17cc.png";
import type { PetType } from "@/types";

function PetAvatar({ type, photo, name }: { type: PetType; photo?: string; name: string }) {
  if (photo) return <img src={photo} alt={name} className="w-full h-full object-cover rounded-xl" />;
  const bg = petTypeBg(type);
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center rounded-xl gap-1 ${bg}`}>
      <PawPrint size={26} />
      <span className="text-[10px] font-bold uppercase tracking-wide">{petTypeInitial(type)}</span>
    </div>
  );
}

function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-bold text-gray-900 text-base">{title}</h2>
      {action && onAction && (
        <button onClick={onAction} className="text-primary text-xs font-semibold hover:underline">{action}</button>
      )}
    </div>
  );
}

export function HomeScreen() {
  const { user, navigate, pets, vaccines, appointments, medications, notifications, clinics } = useApp();
  const unread = notifications.filter(n => !n.read).length;
  const pendingVaccines = vaccines.filter(v => v.status === "pending");
  const scheduledVaccines = vaccines.filter(v => v.status === "scheduled");
  const upcomingAppointments = appointments.filter(a => a.status === "scheduled").slice(0, 3);
  const activeMeds = medications.slice(0, 3);

  const today = new Date();
  const dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const monthNames = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const todayLabel = `${dayNames[today.getDay()]}, ${today.getDate()} de ${monthNames[today.getMonth()]}`;

  return (
    <div className="flex flex-col bg-[#f8f9fa] min-h-screen">
      {/* ── Welcome Header ───────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 px-5 pt-10 pb-5 md:pt-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-100 shadow-sm shrink-0">
              <img src={imgUserAvatar} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-medium">{todayLabel}</p>
              <h1 className="text-xl font-black text-gray-900 leading-tight">
                Olá, {user?.firstName}!
              </h1>
              <p className="text-gray-500 text-xs font-medium">
                {pets.length > 0
                  ? `${pets.length} pet${pets.length > 1 ? "s" : ""} registrado${pets.length > 1 ? "s" : ""}`
                  : "Bem-vindo ao Faro"}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("notifications")}
            className="relative w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* ── Stats strip ──────────────────────────────────────────── */}
      {(pendingVaccines.length > 0 || scheduledVaccines.length > 0 || upcomingAppointments.length > 0) && (
        <div className="bg-white border-b border-gray-100 px-5 pb-4">
          <div className="max-w-6xl mx-auto flex flex-wrap gap-2 pt-1">
            {pendingVaccines.length > 0 && (
              <button onClick={() => navigate("vaccines")} className="flex items-center gap-2.5 bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5 hover:border-orange-300 transition-colors">
                <Syringe size={15} className="text-orange-500" />
                <div className="text-left">
                  <p className="text-[10px] text-orange-400 font-medium uppercase tracking-wide leading-none">Pendentes</p>
                  <p className="text-sm font-bold text-orange-700">{pendingVaccines.length} vacina{pendingVaccines.length > 1 ? "s" : ""}</p>
                </div>
              </button>
            )}
            {scheduledVaccines.length > 0 && (
              <button onClick={() => navigate("vaccines")} className="flex items-center gap-2.5 bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5 hover:border-orange-300 transition-colors">
                <Syringe size={15} className="text-orange-500" />
                <div className="text-left">
                  <p className="text-[10px] text-orange-400 font-medium uppercase tracking-wide leading-none">Agendadas</p>
                  <p className="text-sm font-bold text-orange-700">{scheduledVaccines.length} vacina{scheduledVaccines.length > 1 ? "s" : ""}</p>
                </div>
              </button>
            )}
            {upcomingAppointments.length > 0 && (
              <button onClick={() => navigate("appointments")} className="flex items-center gap-2.5 bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5 hover:border-orange-300 transition-colors">
                <Calendar size={15} className="text-orange-500" />
                <div className="text-left">
                  <p className="text-[10px] text-orange-400 font-medium uppercase tracking-wide leading-none">Consultas</p>
                  <p className="text-sm font-bold text-orange-700">{upcomingAppointments.length} agendada{upcomingAppointments.length > 1 ? "s" : ""}</p>
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-5 py-6">
        {/* Desktop: two-column grid; Mobile: single column */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Left column ───────────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Pets section */}
            <section>
              <SectionHeader
                title="Meus Pets"
                action={pets.length < 3 ? "Adicionar" : undefined}
                onAction={() => navigate("pet-form")}
              />
              {pets.length === 0 ? (
                <button
                  onClick={() => navigate("pet-form")}
                  className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-8 flex flex-col items-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-colors"
                >
                  <Plus size={24} strokeWidth={1.5} />
                  <span className="text-sm font-medium">Cadastrar primeiro pet</span>
                </button>
              ) : (
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {pets.map(p => (
                    <button
                      key={p.id}
                      onClick={() => navigate("pet-detail", p)}
                      className="flex-shrink-0 flex flex-col items-center bg-[#a6632f] rounded-2xl overflow-hidden shadow-sm w-32 h-40 relative hover:shadow-md transition-shadow active:scale-95 transition-transform"
                    >
                      <div className="w-full h-28 p-2 pb-0">
                        <PetAvatar type={p.type} photo={p.photo} name={p.name} />
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center w-full px-2">
                        <span className="text-sm font-bold text-white truncate max-w-full">{p.name}</span>
                        <span className="text-[10px] text-orange-200 font-medium">{PET_TYPE_LABELS[p.type]}</span>
                      </div>
                    </button>
                  ))}
                  {pets.length < 3 && (
                    <button
                      onClick={() => navigate("pet-form")}
                      className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-dashed border-gray-300 text-gray-400 flex items-center justify-center self-center hover:border-primary hover:text-primary transition-colors"
                    >
                      <Plus size={20} strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              )}
            </section>

            {/* Upcoming appointments */}
            {upcomingAppointments.length > 0 && (
              <section>
                <SectionHeader title="Próximas consultas" action="Ver todas" onAction={() => navigate("appointments")} />
                <div className="flex flex-col gap-3">
                  {upcomingAppointments.map(a => {
                    const pet = pets.find(p => p.id === a.petId);
                    const { day, month, weekday } = fmtDateParts(a.date);
                    return (
                      <Card key={a.id} className="p-3 flex items-center gap-3 border-none shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 shrink-0 flex flex-col items-center justify-center bg-purple-50 rounded-xl py-2.5 border border-purple-100">
                          <p className="text-[9px] text-purple-400 font-bold uppercase tracking-widest">{weekday}</p>
                          <p className="text-xl font-black text-purple-700 leading-tight">{day}</p>
                          <p className="text-[10px] text-purple-500 font-semibold uppercase">{month}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="inline-block text-[9px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-bold uppercase tracking-wide mb-1">Consulta</span>
                          <p className="text-sm font-bold text-gray-900 truncate">{a.reason}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-gray-500 font-medium">{a.time}</span>
                            {pet && <><span className="w-1 h-1 rounded-full bg-gray-300" /><span className="text-xs text-gray-400 truncate">{pet.name}</span></>}
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <MapPin size={10} className="text-gray-400 shrink-0" />
                            <span className="text-[11px] text-gray-400 truncate">{a.location}</span>
                          </div>
                        </div>
                        <button onClick={() => navigate("appointment-form", a)} className="shrink-0">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors">
                            <ArrowRight size={14} className="text-purple-600" />
                          </div>
                        </button>
                      </Card>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Medications */}
            {activeMeds.length > 0 && (
              <section>
                <SectionHeader title="Medicações ativas" action="Ver todas" onAction={() => navigate("medications")} />
                <div className="flex flex-col gap-2">
                  {activeMeds.map(m => {
                    const pet = pets.find(p => p.id === m.petId);
                    return (
                      <div key={m.id} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-100">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                          <Pill size={18} className="text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">{m.name}</p>
                          <p className="text-xs text-gray-400">{m.dosage} · {m.frequency}{pet ? ` · ${pet.name}` : ""}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* ── Right column ──────────────────────────────────────── */}
          <div className="lg:w-80 flex flex-col gap-6">

            {/* Vaccines section */}
            <section>
              <SectionHeader title="Próximas vacinas" action="Ver todas" onAction={() => navigate("vaccines")} />
              {vaccines.filter(v => v.status !== "taken").length === 0 ? (
                <div className="bg-white rounded-2xl p-5 border border-gray-100 text-center">
                  <Syringe size={28} className="text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Nenhuma vacina pendente.</p>
                  <button onClick={() => navigate("vaccine-form")} className="mt-2 text-xs text-primary font-semibold hover:underline">
                    Registrar vacina
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {vaccines.filter(v => v.status !== "taken").slice(0, 4).map(v => {
                    const pet = pets.find(p => p.id === v.petId);
                    return (
                      <div key={v.id} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("vaccine-form", v)}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-orange-100">
                          <Syringe size={16} className="text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{v.name}</p>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-orange-500">
                              {v.status === "scheduled" ? "Agendada" : "Pendente"}
                            </span>
                            {v.scheduledDate && <span className="text-[10px] text-gray-400">· {fmtDate(v.scheduledDate)}</span>}
                            {pet && <span className="text-[10px] text-gray-400">· {pet.name}</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <button
                    onClick={() => navigate("vaccines")}
                    className="w-full mt-1 text-center text-xs font-semibold text-primary border border-primary/30 bg-primary/5 py-2.5 rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    Ver carteira de vacinas completa
                  </button>
                </div>
              )}
            </section>

            {/* Clinics */}
            {clinics.length > 0 && (
              <section>
                <SectionHeader title="Clínicas próximas" action="Ver todas" onAction={() => navigate("clinics")} />
                <div className="flex flex-col gap-2">
                  {clinics.slice(0, 3).map(c => (
                    <div key={c.id} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-100">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                        <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{c.name}</p>
                        <div className="flex items-center gap-1">
                          <MapPin size={10} className="text-primary" />
                          <span className="text-xs text-gray-400">{c.distance}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        ★ {c.rating}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Quick actions */}
            <section>
              <SectionHeader title="Ações rápidas" />
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Novo pet", icon: PawPrint, page: "pet-form" as const, color: "bg-amber-50 text-amber-700" },
                  { label: "Vacina", icon: Syringe, page: "vaccine-form" as const, color: "bg-blue-50 text-blue-700" },
                  { label: "Consulta", icon: Calendar, page: "appointment-form" as const, color: "bg-purple-50 text-purple-700" },
                  { label: "Medicação", icon: Pill, page: "medication-form" as const, color: "bg-green-50 text-green-700" },
                ].map(({ label, icon: Icon, page, color }) => (
                  <button
                    key={label}
                    onClick={() => navigate(page)}
                    className={`${color} rounded-xl p-4 flex flex-col items-center gap-2 text-center hover:opacity-80 transition-opacity`}
                  >
                    <Icon size={20} />
                    <span className="text-xs font-semibold">{label}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
