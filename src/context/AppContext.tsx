import { createContext, useState } from "react";
import type { AppContextType, AppUser, Pet, Vaccine, Appointment, Medication, AppNotification, AdoptionPost, Page } from "@/types";
import { uid, getVaccineRule, addDays } from "@/utils/helpers";
import {
  MOCK_USER, MOCK_PETS, MOCK_VACCINES, MOCK_APPOINTMENTS,
  MOCK_MEDICATIONS, MOCK_NOTIFICATIONS, DEMO_ADOPTION, MOCK_CLINICS,
} from "@/data/mockData";

export const AppCtx = createContext<AppContextType>(null!);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<Page>("landing");
  const [navData, setNavData] = useState<any>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [adoption, setAdoption] = useState<AdoptionPost[]>(DEMO_ADOPTION);
  const [toast, setToast] = useState<AppContextType["toast"]>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("faro-dark");
    const isDark = saved === "true";
    document.documentElement.classList.toggle("dark", isDark);
    return isDark;
  });
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal");

  const navigate = (p: Page, data?: any) => { setPage(p); setNavData(data ?? null); };

  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const login = (email: string, _pw: string) => {
    if (email === MOCK_USER.email || email.includes("@")) {
      if (email === MOCK_USER.email) {
        setUser(MOCK_USER);
        setPets(MOCK_PETS);
        setVaccines(MOCK_VACCINES);
        setAppointments(MOCK_APPOINTMENTS);
        setMedications(MOCK_MEDICATIONS);
        setNotifications(MOCK_NOTIFICATIONS);
      } else {
        const parts = email.split("@")[0].split(".");
        setUser({
          id: uid(),
          firstName: parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : "Usuário",
          lastName: parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : "",
          email, phone: "", cpf: "",
        });
      }
      navigate("home");
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setPets([]);
    setVaccines([]);
    setAppointments([]);
    setMedications([]);
    setNotifications([]);
    navigate("landing");
  };

  const register = (data: Partial<AppUser> & { password: string }) => {
    setUser({
      id: uid(), firstName: data.firstName ?? "", lastName: data.lastName ?? "",
      email: data.email ?? "", phone: data.phone ?? "", cpf: data.cpf ?? "",
    });
    navigate("pet-form");
  };

  const addPet = (p: Omit<Pet, "id">) => { setPets(prev => [...prev, { ...p, id: uid() }]); showToast("Pet adicionado!"); };
  const updatePet = (p: Pet) => { setPets(prev => prev.map(x => x.id === p.id ? p : x)); showToast("Pet atualizado!"); };
  const deletePet = (id: string) => { setPets(prev => prev.filter(x => x.id !== id)); showToast("Pet removido.", "info"); };

  function buildNextDose(allVaccines: Vaccine[], saved: Vaccine, allPets: Pet[]): Vaccine | null {
    if (saved.status !== "taken" || !saved.dateTaken) return null;
    const pet = allPets.find(p => p.id === saved.petId);
    if (!pet) return null;
    const rule = getVaccineRule(saved.name, pet.type);
    if (!rule) return null;
    const dosesTaken = allVaccines.filter(v => v.petId === saved.petId && v.name === saved.name && v.status === "taken").length;
    const hasPending = allVaccines.some(v => v.petId === saved.petId && v.name === saved.name && v.id !== saved.id && (v.status === "pending" || v.status === "scheduled"));
    if (hasPending) return null;
    if (dosesTaken < rule.totalDoses && rule.doseIntervalDays > 0) {
      return { id: uid(), petId: saved.petId, name: saved.name, recommendedAge: saved.recommendedAge,
        status: "scheduled", dose: dosesTaken + 1, scheduledDate: addDays(saved.dateTaken, rule.doseIntervalDays) };
    }
    if (dosesTaken >= rule.totalDoses && rule.boosterIntervalDays) {
      return { id: uid(), petId: saved.petId, name: saved.name, recommendedAge: saved.recommendedAge,
        status: "scheduled", dose: dosesTaken + 1, scheduledDate: addDays(saved.dateTaken, rule.boosterIntervalDays) };
    }
    return null;
  }

  const addVaccine = (v: Omit<Vaccine, "id">) => {
    const newV = { ...v, id: uid() };
    setVaccines(prev => {
      const withNew = [...prev, newV];
      const next = buildNextDose(withNew, newV, pets);
      return next ? [...withNew, next] : withNew;
    });
    showToast("Vacina registrada!");
  };
  const updateVaccine = (v: Vaccine) => {
    setVaccines(prev => {
      const updated = prev.map(x => x.id === v.id ? v : x);
      const next = buildNextDose(updated, v, pets);
      return next ? [...updated, next] : updated;
    });
    showToast("Vacina atualizada!");
  };
  const deleteVaccine = (id: string) => { setVaccines(prev => prev.filter(x => x.id !== id)); };

  const addAppointment = (a: Omit<Appointment, "id">) => { setAppointments(prev => [...prev, { ...a, id: uid() }]); showToast("Consulta agendada!"); };
  const updateAppointment = (a: Appointment) => { setAppointments(prev => prev.map(x => x.id === a.id ? a : x)); showToast("Consulta atualizada!"); };
  const deleteAppointment = (id: string) => { setAppointments(prev => prev.filter(x => x.id !== id)); };

  const addMedication = (m: Omit<Medication, "id" | "doses">) => {
    setMedications(prev => [...prev, { ...m, id: uid(), doses: [] }]);
    showToast("Medicação adicionada!");
  };
  const updateMedication = (m: Medication) => { setMedications(prev => prev.map(x => x.id === m.id ? m : x)); showToast("Medicação atualizada!"); };
  const deleteMedication = (id: string) => { setMedications(prev => prev.filter(x => x.id !== id)); };

  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const deleteNotification = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));

  const addAdoption = (a: Omit<AdoptionPost, "id">) => { setAdoption(prev => [...prev, { ...a, id: uid() }]); showToast("Publicado com sucesso!"); };

  const toggleDark = () => {
    setDarkMode(d => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("faro-dark", String(next));
      return next;
    });
  };
  const toggleFontSize = () => setFontSize(s => s === "normal" ? "large" : "normal");

  return (
    <AppCtx.Provider value={{
      page, navigate, navData, user, isLoggedIn: !!user,
      login, logout, register,
      pets, addPet, updatePet, deletePet,
      vaccines, addVaccine, updateVaccine, deleteVaccine,
      appointments, addAppointment, updateAppointment, deleteAppointment,
      medications, addMedication, updateMedication, deleteMedication,
      notifications, markRead, markAllRead, deleteNotification,
      adoption, addAdoption, clinics: MOCK_CLINICS,
      toast, showToast, darkMode, toggleDark, fontSize, toggleFontSize,
    }}>
      {children}
    </AppCtx.Provider>
  );
}
