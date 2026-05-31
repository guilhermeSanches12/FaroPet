import { createContext, useState, useEffect } from "react";
import type { AppContextType, AppUser, Pet, Vaccine, Appointment, Medication, AppNotification, AdoptionPost, Page } from "@/types";
import { getVaccineRule, addDays } from "@/utils/helpers";
import { MOCK_CLINICS } from "@/data/mockData";
import {
  authApi, usersApi, petsApi, vaccinesApi, appointmentsApi, medicationsApi, remindersApi, adoptionsApi,
  getToken, setToken, clearToken,
  type ApiPet, type ApiVaccine, type ApiAppointment, type ApiMedication, type ApiReminder, type ApiAdoption,
} from "@/services/api";
import { registerServiceWorker, subscribeToPush, sendSubscriptionToBackend, getPushPermission } from "@/services/push";

export const AppCtx = createContext<AppContextType>(null!);

// ── Mappers API → tipos frontend ─────────────────────────────────────────────

function apiPetToPet(p: ApiPet): Pet {
  return {
    id: p.id,
    name: p.name,
    type: (p.type ?? p.species ?? "other") as Pet["type"],
    breed: p.breed ?? "",
    gender: (p.gender ?? "male") as "male" | "female",
    birthDate: p.birthDate ?? "",
    weight: p.weight ? Number(p.weight) : undefined,
    conditions: p.conditions,
    notes: p.notes,
    photo: p.photo,
  };
}

function apiVaccineToVaccine(v: ApiVaccine): Vaccine {
  return {
    id: v.id,
    petId: v.petId,
    name: v.name,
    recommendedAge: v.recommendedAge ?? "",
    status: (v.status ?? "pending") as Vaccine["status"],
    dose: v.dose,
    dateTaken: v.dateTaken,
    scheduledDate: v.scheduledDate,
    nextDose: v.nextDose,
    clinic: v.clinic,
    vet: v.vet,
    batch: v.batchNumber,
    notes: v.notes,
  };
}

function apiAppointmentToAppointment(a: ApiAppointment): Appointment {
  return {
    id: a.id,
    petId: a.petId,
    date: a.date,
    time: a.time,
    reason: a.reason,
    location: a.location,
    vet: a.vet,
    hasMedication: a.hasMedication,
    medicationDetails: a.medicationDetails,
    observations: a.observations,
    diagnosis: a.diagnosis,
    prescription: a.prescription,
    status: (a.status ?? "scheduled") as Appointment["status"],
  };
}

function apiMedicationToMedication(m: ApiMedication): Medication {
  return {
    id: m.id,
    petId: m.petId,
    name: m.name,
    dosage: m.dosage,
    frequency: m.frequency,
    durationDays: m.durationDays,
    startDate: m.startDate,
    endDate: m.endDate,
    fasting: m.fasting,
    type: (m.type ?? "other") as Medication["type"],
    reason: m.reason,
    observations: m.observations,
    prescribedBy: m.prescribedBy,
    doses: (m.doses ?? []) as Medication["doses"],
  };
}

function apiReminderToNotification(r: ApiReminder): AppNotification {
  const typeMap: Record<string, AppNotification["type"]> = {
    vaccine: "vaccine", appointment: "appointment", medication: "medication",
  };
  return {
    id: r.id,
    title: r.title,
    body: r.description ?? "",
    type: typeMap[r.type] ?? "general",
    date: r.remindAt,
    read: r.isRead,
  };
}

function apiAdoptionToAdoptionPost(a: ApiAdoption): AdoptionPost {
  return {
    id: a.id,
    userId: a.userId,
    animalName: a.animalName,
    animalType: a.animalType,
    breed: a.breed,
    gender: a.gender,
    age: a.age ?? "",
    size: a.size,
    photo: a.photo,
    description: a.description,
    healthInfo: a.healthInfo,
    vaccinationInfo: a.vaccinationInfo,
    requirements: a.requirements,
    observations: a.observations,
    city: a.city,
    state: a.state,
    contactName: a.contactName,
    contact: a.contactPhone ?? a.contactWhatsapp ?? "",
    contactPhone: a.contactPhone,
    contactWhatsapp: a.contactWhatsapp,
    status: (a.status ?? "available") as AdoptionPost["status"],
  };
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<Page>("landing");
  const [navData, setNavData] = useState<any>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [adoption, setAdoption] = useState<AdoptionPost[]>([]);
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

  // Restaurar sessao ao montar
  useEffect(() => {
    const token = getToken();
    if (!token) return;
    usersApi.getMe()
      .then(apiUser => {
        setUser({ id: apiUser.id, firstName: apiUser.firstName, lastName: apiUser.lastName,
          email: apiUser.email, phone: apiUser.phone ?? "", cpf: apiUser.cpf ?? "",
          avatar: apiUser.avatar, city: apiUser.city, state: apiUser.state });
        return petsApi.list();
      })
      .then(apiPets => {
        setPets(apiPets.map(apiPetToPet));
        navigate("home");
        registerServiceWorker();
        remindersApi.listAll().then(rs => setNotifications(rs.map(apiReminderToNotification))).catch(() => {});
        adoptionsApi.list().then(as => setAdoption(as.map(apiAdoptionToAdoptionPost))).catch(() => {});
      })
      .catch(() => {
        clearToken();
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Auth ───────────────────────────────────────────────────────────────────

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await authApi.login(email, password);
      setToken(res.access_token);
      setUser({ id: res.user.id, firstName: res.user.firstName, lastName: res.user.lastName,
        email: res.user.email, phone: res.user.phone ?? "", cpf: res.user.cpf ?? "",
        avatar: res.user.avatar, city: res.user.city, state: res.user.state });
      const apiPets = await petsApi.list();
      setPets(apiPets.map(apiPetToPet));
      navigate("home");
      registerServiceWorker().then(async () => {
        if (getPushPermission() === "granted") {
          const subscription = await subscribeToPush();
          if (subscription) await sendSubscriptionToBackend(subscription);
        }
      });
      remindersApi.listAll().then(rs => setNotifications(rs.map(apiReminderToNotification))).catch(() => {});
      adoptionsApi.list().then(as => setAdoption(as.map(apiAdoptionToAdoptionPost))).catch(() => {});
      return true;
    } catch (err: any) {
      showToast(err.message ?? "E-mail ou senha inválidos", "error");
      return false;
    }
  };

  const logout = () => {
    clearToken();
    setUser(null);
    setPets([]); setVaccines([]); setAppointments([]); setMedications([]); setNotifications([]); setAdoption([]);
    navigate("landing");
  };

  const register = async (data: Partial<AppUser> & { password: string }) => {
    try {
      const res = await authApi.register({
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        email: data.email ?? "",
        password: data.password,
        phone: data.phone,
        cpf: data.cpf,
      });
      setToken(res.access_token);
      setUser({ id: res.user.id, firstName: res.user.firstName, lastName: res.user.lastName,
        email: res.user.email, phone: res.user.phone ?? "", cpf: res.user.cpf ?? "",
        avatar: res.user.avatar, city: res.user.city, state: res.user.state });
      navigate("pet-form");
    } catch (err: any) {
      showToast(err.message ?? "Erro ao criar conta", "error");
    }
  };

  // ── Pets ───────────────────────────────────────────────────────────────────

  const addPet = async (p: Omit<Pet, "id">) => {
    try {
      const created = await petsApi.create({ ...p, type: p.type });
      setPets(prev => [...prev, apiPetToPet(created)]);
      showToast("Pet adicionado!");
    } catch (err: any) { showToast(err.message ?? "Erro ao adicionar pet", "error"); }
  };

  const updatePet = async (p: Pet) => {
    try {
      const updated = await petsApi.update(p.id, { ...p, type: p.type });
      setPets(prev => prev.map(x => x.id === p.id ? apiPetToPet(updated) : x));
      showToast("Pet atualizado!");
    } catch (err: any) { showToast(err.message ?? "Erro ao atualizar pet", "error"); }
  };

  const deletePet = async (id: string) => {
    try {
      await petsApi.remove(id);
      setPets(prev => prev.filter(x => x.id !== id));
      showToast("Pet removido.", "info");
    } catch (err: any) { showToast(err.message ?? "Erro ao remover pet", "error"); }
  };

  const loadPetData = async (petId: string) => {
    try {
      const [apiVaccines, apiApts, apiMeds] = await Promise.all([
        vaccinesApi.listByPet(petId),
        appointmentsApi.listByPet(petId),
        medicationsApi.listByPet(petId),
      ]);
      setVaccines(prev => [...prev.filter(x => x.petId !== petId), ...apiVaccines.map(apiVaccineToVaccine)]);
      setAppointments(prev => [...prev.filter(x => x.petId !== petId), ...apiApts.map(apiAppointmentToAppointment)]);
      setMedications(prev => [...prev.filter(x => x.petId !== petId), ...apiMeds.map(apiMedicationToMedication)]);
    } catch (err: any) { showToast(err.message ?? "Erro ao carregar dados do pet", "error"); }
  };

  // ── Vaccines ───────────────────────────────────────────────────────────────

  async function buildNextDoseApi(saved: ApiVaccine, allVaccines: ApiVaccine[], allPets: Pet[]) {
    if (saved.status !== "taken" || !saved.dateTaken) return;
    const pet = allPets.find(p => p.id === saved.petId);
    if (!pet) return;
    const rule = getVaccineRule(saved.name, pet.type);
    if (!rule) return;
    const dosesTaken = allVaccines.filter(v => v.petId === saved.petId && v.name === saved.name && v.status === "taken").length;
    const hasPending = allVaccines.some(v => v.petId === saved.petId && v.name === saved.name && v.id !== saved.id && (v.status === "pending" || v.status === "scheduled"));
    if (hasPending) return;
    let nextDate: string | null = null;
    if (dosesTaken < rule.totalDoses && rule.doseIntervalDays > 0) {
      nextDate = addDays(saved.dateTaken, rule.doseIntervalDays);
    } else if (dosesTaken >= rule.totalDoses && rule.boosterIntervalDays) {
      nextDate = addDays(saved.dateTaken, rule.boosterIntervalDays);
    }
    if (!nextDate) return;
    await vaccinesApi.create({ petId: saved.petId, name: saved.name,
      recommendedAge: saved.recommendedAge, dose: dosesTaken + 1, scheduledDate: nextDate });
  }

  const addVaccine = async (v: Omit<Vaccine, "id">) => {
    try {
      const created = await vaccinesApi.create({
        petId: v.petId, name: v.name, recommendedAge: v.recommendedAge,
        dose: v.dose, dateTaken: v.dateTaken, scheduledDate: v.scheduledDate,
        nextDose: v.nextDose, clinic: v.clinic, vet: v.vet, batchNumber: v.batch, notes: v.notes,
      });
      const all = await vaccinesApi.listByPet(v.petId);
      await buildNextDoseApi(created, all, pets);
      const refreshed = await vaccinesApi.listByPet(v.petId);
      setVaccines(prev => [...prev.filter(x => x.petId !== v.petId), ...refreshed.map(apiVaccineToVaccine)]);
      showToast("Vacina registrada!");
    } catch (err: any) { showToast(err.message ?? "Erro ao registrar vacina", "error"); }
  };

  const updateVaccine = async (v: Vaccine) => {
    try {
      const updated = await vaccinesApi.update(v.id, {
        name: v.name, recommendedAge: v.recommendedAge, dose: v.dose,
        dateTaken: v.dateTaken, scheduledDate: v.scheduledDate, nextDose: v.nextDose,
        clinic: v.clinic, vet: v.vet, batchNumber: v.batch, notes: v.notes,
        status: v.status,
      });
      const all = await vaccinesApi.listByPet(v.petId);
      await buildNextDoseApi(updated, all, pets);
      const refreshed = await vaccinesApi.listByPet(v.petId);
      setVaccines(prev => [...prev.filter(x => x.petId !== v.petId), ...refreshed.map(apiVaccineToVaccine)]);
      showToast("Vacina atualizada!");
    } catch (err: any) { showToast(err.message ?? "Erro ao atualizar vacina", "error"); }
  };

  const deleteVaccine = async (id: string) => {
    try {
      const v = vaccines.find(x => x.id === id);
      await vaccinesApi.remove(id);
      setVaccines(prev => prev.filter(x => x.id !== id));
      if (v) {
        const refreshed = await vaccinesApi.listByPet(v.petId);
        setVaccines(prev => [...prev.filter(x => x.petId !== v.petId), ...refreshed.map(apiVaccineToVaccine)]);
      }
    } catch (err: any) { showToast(err.message ?? "Erro ao remover vacina", "error"); }
  };

  // ── Appointments ───────────────────────────────────────────────────────────

  const addAppointment = async (a: Omit<Appointment, "id">) => {
    try {
      const created = await appointmentsApi.create(a as any);
      setAppointments(prev => [...prev, apiAppointmentToAppointment(created)]);
      showToast("Consulta agendada!");
    } catch (err: any) { showToast(err.message ?? "Erro ao agendar consulta", "error"); }
  };

  const updateAppointment = async (a: Appointment) => {
    try {
      const updated = await appointmentsApi.update(a.id, a as any);
      setAppointments(prev => prev.map(x => x.id === a.id ? apiAppointmentToAppointment(updated) : x));
      showToast("Consulta atualizada!");
    } catch (err: any) { showToast(err.message ?? "Erro ao atualizar consulta", "error"); }
  };

  const deleteAppointment = async (id: string) => {
    try {
      await appointmentsApi.remove(id);
      setAppointments(prev => prev.filter(x => x.id !== id));
    } catch (err: any) { showToast(err.message ?? "Erro ao remover consulta", "error"); }
  };

  // ── Medications ────────────────────────────────────────────────────────────

  const addMedication = async (m: Omit<Medication, "id" | "doses">) => {
    try {
      const created = await medicationsApi.create({ ...m, doses: [] } as any);
      setMedications(prev => [...prev, apiMedicationToMedication(created)]);
      showToast("Medicação adicionada!");
    } catch (err: any) { showToast(err.message ?? "Erro ao adicionar medicação", "error"); }
  };

  const updateMedication = async (m: Medication) => {
    try {
      const updated = await medicationsApi.update(m.id, m as any);
      setMedications(prev => prev.map(x => x.id === m.id ? apiMedicationToMedication(updated) : x));
      showToast("Medicação atualizada!");
    } catch (err: any) { showToast(err.message ?? "Erro ao atualizar medicação", "error"); }
  };

  const deleteMedication = async (id: string) => {
    try {
      await medicationsApi.remove(id);
      setMedications(prev => prev.filter(x => x.id !== id));
    } catch (err: any) { showToast(err.message ?? "Erro ao remover medicação", "error"); }
  };

  // ── Notifications (backed by reminders API) ────────────────────────────────

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    remindersApi.markRead(id).catch(() => {});
  };

  const markAllRead = () => {
    setNotifications(prev => {
      prev.filter(n => !n.read).forEach(n => remindersApi.markRead(n.id).catch(() => {}));
      return prev.map(n => ({ ...n, read: true }));
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    remindersApi.dismiss(id).catch(() => {});
  };

  // ── Adoption ──────────────────────────────────────────────────────────────

  const addAdoption = async (a: Omit<AdoptionPost, "id">) => {
    try {
      const created = await adoptionsApi.create({
        animalName: a.animalName, animalType: a.animalType, breed: a.breed,
        gender: a.gender, age: a.age, size: a.size, photo: a.photo,
        description: a.description, healthInfo: a.healthInfo, vaccinationInfo: a.vaccinationInfo,
        requirements: a.requirements, observations: a.observations,
        city: a.city, state: a.state, contactName: a.contactName,
        contactPhone: a.contactPhone, contactWhatsapp: a.contactWhatsapp,
      });
      setAdoption(prev => [apiAdoptionToAdoptionPost(created), ...prev]);
      showToast("Publicado com sucesso!");
    } catch (err: any) { showToast(err.message ?? "Erro ao publicar", "error"); }
  };

  const updateAdoption = async (a: AdoptionPost) => {
    try {
      const updated = await adoptionsApi.update(a.id, {
        animalName: a.animalName, animalType: a.animalType, breed: a.breed,
        gender: a.gender, age: a.age, size: a.size, photo: a.photo,
        description: a.description, healthInfo: a.healthInfo, vaccinationInfo: a.vaccinationInfo,
        requirements: a.requirements, observations: a.observations,
        city: a.city, state: a.state, contactName: a.contactName,
        contactPhone: a.contactPhone, contactWhatsapp: a.contactWhatsapp,
      });
      setAdoption(prev => prev.map(x => x.id === a.id ? apiAdoptionToAdoptionPost(updated) : x));
      showToast("Post atualizado!");
    } catch (err: any) { showToast(err.message ?? "Erro ao atualizar", "error"); }
  };

  const deleteAdoption = async (id: string) => {
    try {
      await adoptionsApi.remove(id);
      setAdoption(prev => prev.filter(x => x.id !== id));
      showToast("Post removido.", "info");
    } catch (err: any) { showToast(err.message ?? "Erro ao remover", "error"); }
  };

  // ── UI preferences ────────────────────────────────────────────────────────

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
      pets, addPet, updatePet, deletePet, loadPetData,
      vaccines, addVaccine, updateVaccine, deleteVaccine,
      appointments, addAppointment, updateAppointment, deleteAppointment,
      medications, addMedication, updateMedication, deleteMedication,
      notifications, markRead, markAllRead, deleteNotification,
      adoption, addAdoption, updateAdoption, deleteAdoption, clinics: MOCK_CLINICS,
      toast, showToast, darkMode, toggleDark, fontSize, toggleFontSize,
    }}>
      {children}
    </AppCtx.Provider>
  );
}
