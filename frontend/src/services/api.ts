const BASE_URL = "http://localhost:3000/api/v1";

// ── Token management ─────────────────────────────────────────────────────────

export function getToken(): string | null {
  return localStorage.getItem("faro_token");
}

export function setToken(token: string): void {
  localStorage.setItem("faro_token", token);
}

export function clearToken(): void {
  localStorage.removeItem("faro_token");
}

// ── Base fetch ────────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro na requisição" }));
    throw new Error(err.message ?? "Erro na requisição");
  }

  // 200 sem body (ex: DELETE retorna { message })
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export const authApi = {
  register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    cpf?: string;
  }) {
    return apiFetch<{ access_token: string; user: ApiUser }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  login(email: string, password: string) {
    return apiFetch<{ access_token: string; user: ApiUser }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
};

// ── Users ─────────────────────────────────────────────────────────────────────

export const usersApi = {
  getMe() {
    return apiFetch<ApiUser>("/users/me");
  },

  update(data: Partial<Omit<ApiUser, "id" | "email" | "createdAt" | "updatedAt">>) {
    return apiFetch<ApiUser>("/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

// ── Pets ──────────────────────────────────────────────────────────────────────

export const petsApi = {
  list() {
    return apiFetch<ApiPet[]>("/pets");
  },

  get(id: string) {
    return apiFetch<ApiPet>(`/pets/${id}`);
  },

  create(data: Omit<ApiPet, "id" | "userId" | "createdAt" | "updatedAt" | "deletedAt" | "isSynced">) {
    return apiFetch<ApiPet>("/pets", { method: "POST", body: JSON.stringify(data) });
  },

  update(id: string, data: Partial<Omit<ApiPet, "id" | "userId" | "createdAt" | "updatedAt" | "deletedAt" | "isSynced">>) {
    return apiFetch<ApiPet>(`/pets/${id}`, { method: "PUT", body: JSON.stringify(data) });
  },

  remove(id: string) {
    return apiFetch<{ message: string }>(`/pets/${id}`, { method: "DELETE" });
  },
};

// ── Vaccines ──────────────────────────────────────────────────────────────────

export const vaccinesApi = {
  listByPet(petId: string) {
    return apiFetch<ApiVaccine[]>(`/vaccines?petId=${petId}`);
  },

  create(data: Omit<ApiVaccine, "id" | "createdAt" | "updatedAt" | "deletedAt" | "isSynced" | "status">) {
    return apiFetch<ApiVaccine>("/vaccines", { method: "POST", body: JSON.stringify(data) });
  },

  update(id: string, data: Partial<Omit<ApiVaccine, "id" | "petId" | "createdAt" | "updatedAt" | "deletedAt" | "isSynced">>) {
    return apiFetch<ApiVaccine>(`/vaccines/${id}`, { method: "PUT", body: JSON.stringify(data) });
  },

  remove(id: string) {
    return apiFetch<{ message: string }>(`/vaccines/${id}`, { method: "DELETE" });
  },
};

// ── Medications ───────────────────────────────────────────────────────────────

export const medicationsApi = {
  listByPet(petId: string) {
    return apiFetch<ApiMedication[]>(`/medications?petId=${petId}`);
  },

  create(data: Omit<ApiMedication, "id" | "createdAt" | "updatedAt" | "deletedAt" | "isSynced">) {
    return apiFetch<ApiMedication>("/medications", { method: "POST", body: JSON.stringify(data) });
  },

  update(id: string, data: Partial<Omit<ApiMedication, "id" | "petId" | "createdAt" | "updatedAt" | "deletedAt" | "isSynced">>) {
    return apiFetch<ApiMedication>(`/medications/${id}`, { method: "PUT", body: JSON.stringify(data) });
  },

  remove(id: string) {
    return apiFetch<{ message: string }>(`/medications/${id}`, { method: "DELETE" });
  },
};

// ── Appointments ──────────────────────────────────────────────────────────────

export const appointmentsApi = {
  listByPet(petId: string) {
    return apiFetch<ApiAppointment[]>(`/appointments?petId=${petId}`);
  },

  create(data: Omit<ApiAppointment, "id" | "createdAt" | "updatedAt" | "deletedAt" | "isSynced">) {
    return apiFetch<ApiAppointment>("/appointments", { method: "POST", body: JSON.stringify(data) });
  },

  update(id: string, data: Partial<Omit<ApiAppointment, "id" | "petId" | "createdAt" | "updatedAt" | "deletedAt" | "isSynced">>) {
    return apiFetch<ApiAppointment>(`/appointments/${id}`, { method: "PUT", body: JSON.stringify(data) });
  },

  remove(id: string) {
    return apiFetch<{ message: string }>(`/appointments/${id}`, { method: "DELETE" });
  },
};

// ── Reminders ─────────────────────────────────────────────────────────────────

export const remindersApi = {
  listAll() {
    return apiFetch<ApiReminder[]>("/reminders/me");
  },

  listByPet(petId: string) {
    return apiFetch<ApiReminder[]>(`/reminders?petId=${petId}`);
  },

  create(data: Omit<ApiReminder, "id" | "createdAt" | "updatedAt" | "deletedAt" | "isSynced" | "isSent" | "isDismissed">) {
    return apiFetch<ApiReminder>("/reminders", { method: "POST", body: JSON.stringify(data) });
  },

  markRead(id: string) {
    return apiFetch<ApiReminder>(`/reminders/${id}/read`, { method: "PATCH" });
  },

  dismiss(id: string) {
    return apiFetch<ApiReminder>(`/reminders/${id}/dismiss`, { method: "PATCH" });
  },

  remove(id: string) {
    return apiFetch<{ message: string }>(`/reminders/${id}`, { method: "DELETE" });
  },
};

// ── Push Notifications ────────────────────────────────────────────────────────

export const pushApi = {
  getPublicKey() {
    return apiFetch<{ publicKey: string }>("/push/vapid-public-key");
  },

  subscribe(subscription: { endpoint: string; keys: { p256dh: string; auth: string }; userAgent?: string }) {
    return apiFetch<{ id: string }>("/push/subscribe", { method: "POST", body: JSON.stringify(subscription) });
  },

  unsubscribe(endpoint: string) {
    return apiFetch<{ message: string }>("/push/unsubscribe", { method: "DELETE", body: JSON.stringify({ endpoint }) });
  },

  sendTest() {
    return apiFetch<{ success: boolean; message: string }>("/push/test", { method: "POST" });
  },

  processReminders() {
    return apiFetch<{ processed: number; sent: number }>("/push/process", { method: "POST" });
  },
};

// ── Health Histories ──────────────────────────────────────────────────────────

export const healthHistoriesApi = {
  listByPet(petId: string) {
    return apiFetch<ApiHealthHistory[]>(`/health-histories?petId=${petId}`);
  },

  create(data: { petId: string; symptoms?: string; tutorNotes?: string; temperatureCelsius?: number; weightAtRecord?: number }) {
    return apiFetch<ApiHealthHistory>("/health-histories", { method: "POST", body: JSON.stringify(data) });
  },

  update(id: string, data: Partial<{ symptoms: string; tutorNotes: string; temperatureCelsius: number; weightAtRecord: number }>) {
    return apiFetch<ApiHealthHistory>(`/health-histories/${id}`, { method: "PUT", body: JSON.stringify(data) });
  },

  remove(id: string) {
    return apiFetch<{ message: string }>(`/health-histories/${id}`, { method: "DELETE" });
  },
};

// ── Adoptions ─────────────────────────────────────────────────────────────────

export const adoptionsApi = {
  list(filters?: { animalType?: string; state?: string; city?: string }) {
    const params = new URLSearchParams();
    if (filters?.animalType) params.set("animalType", filters.animalType);
    if (filters?.state) params.set("state", filters.state);
    if (filters?.city) params.set("city", filters.city);
    const qs = params.toString();
    return apiFetch<ApiAdoption[]>(`/adoptions${qs ? `?${qs}` : ""}`);
  },

  mine() {
    return apiFetch<ApiAdoption[]>("/adoptions/mine");
  },

  get(id: string) {
    return apiFetch<ApiAdoption>(`/adoptions/${id}`);
  },

  create(data: Omit<ApiAdoption, "id" | "userId" | "createdAt" | "updatedAt" | "deletedAt" | "status">) {
    return apiFetch<ApiAdoption>("/adoptions", { method: "POST", body: JSON.stringify(data) });
  },

  update(id: string, data: Partial<Omit<ApiAdoption, "id" | "userId" | "createdAt" | "updatedAt" | "deletedAt" | "status">>) {
    return apiFetch<ApiAdoption>(`/adoptions/${id}`, { method: "PUT", body: JSON.stringify(data) });
  },

  updateStatus(id: string, status: string) {
    return apiFetch<ApiAdoption>(`/adoptions/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
  },

  remove(id: string) {
    return apiFetch<{ message: string }>(`/adoptions/${id}`, { method: "DELETE" });
  },
};

// ── API Types ─────────────────────────────────────────────────────────────────

export interface ApiUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  cpf?: string;
  avatar?: string;
  city?: string;
  state?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiPet {
  id: string;
  userId: string;
  name: string;
  type: string;
  species?: string;
  breed?: string;
  gender: string;
  birthDate?: string;
  weight?: string;
  color?: string;
  microchipCode?: string;
  conditions?: string;
  notes?: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isSynced: boolean;
}

export interface ApiVaccine {
  id: string;
  petId: string;
  name: string;
  manufacturer?: string;
  recommendedAge?: string;
  dose?: number;
  dateTaken?: string;
  scheduledDate?: string;
  nextDose?: string;
  batchNumber?: string;
  clinic?: string;
  vet?: string;
  notes?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isSynced: boolean;
}

export interface ApiMedication {
  id: string;
  petId: string;
  name: string;
  dosage?: string;
  frequency: string;
  durationDays: number;
  startDate: string;
  endDate: string;
  fasting: boolean;
  type: string;
  reason: string;
  prescribedBy?: string;
  observations?: string;
  doses: { date: string; time: string; status: string }[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isSynced: boolean;
}

export interface ApiAppointment {
  id: string;
  petId: string;
  date: string;
  time: string;
  reason: string;
  location: string;
  vet?: string;
  hasMedication: boolean;
  medicationDetails?: string;
  observations?: string;
  diagnosis?: string;
  prescription?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isSynced: boolean;
}

export interface ApiReminder {
  id: string;
  petId: string;
  type: string;
  title: string;
  description?: string;
  remindAt: string;
  isSent: boolean;
  isDismissed: boolean;
  isRead: boolean;
  pushSentAt?: string;
  referenceId?: string;
  referenceTable?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isSynced: boolean;
}

export interface ApiHealthHistory {
  id: string;
  petId: string;
  recordedAt: string;
  symptoms?: string;
  tutorNotes?: string;
  temperatureCelsius?: string;
  weightAtRecord?: string;
  photos: { id: string; photoUrl: string; caption?: string; takenAt?: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiAdoption {
  id: string;
  userId: string;
  animalName?: string;
  animalType: string;
  breed?: string;
  gender: string;
  age?: string;
  size?: string;
  photo?: string;
  description: string;
  healthInfo?: string;
  vaccinationInfo?: string;
  requirements?: string;
  observations?: string;
  city: string;
  state: string;
  contactName: string;
  contactPhone?: string;
  contactWhatsapp?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
