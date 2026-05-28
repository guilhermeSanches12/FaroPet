export type Page =
  | "landing" | "onboarding" | "login" | "register" | "forgot"
  | "home" | "pets" | "pet-form" | "pet-detail"
  | "vaccines" | "vaccine-form"
  | "appointments" | "appointment-form"
  | "medications" | "medication-form"
  | "agenda" | "notifications" | "adoption" | "adoption-detail" | "adoption-form"
  | "clinics" | "settings";

export type PetType = "dog" | "cat" | "bird" | "fish" | "hamster" | "rabbit" | "other";
export type VaccineStatus = "pending" | "taken" | "scheduled" | "overdue";
export type AppointmentStatus = "scheduled" | "completed" | "canceled";
export type MedType = "pill" | "liquid" | "injection" | "topical" | "other";
export type AdoptionStatus = "available" | "in_process" | "adopted";

export interface VaccineRule {
  name: string;
  species: PetType[];
  totalDoses: number;
  doseIntervalDays: number;
  boosterIntervalDays?: number;
  recommendedAge?: string;
  notes?: string;
}

export interface AppUser {
  id: string; firstName: string; lastName: string;
  email: string; phone: string; cpf: string; avatar?: string;
  city?: string; state?: string;
}

export interface Pet {
  id: string; name: string; type: PetType; breed: string;
  gender: "male" | "female"; birthDate: string; weight?: number;
  conditions?: string; notes?: string; photo?: string;
}

export interface Vaccine {
  id: string; petId: string; name: string; recommendedAge: string;
  status: VaccineStatus; dose?: number;
  dateTaken?: string; scheduledDate?: string;
  clinic?: string; vet?: string; batch?: string; notes?: string; nextDose?: string;
}

export interface Appointment {
  id: string; petId: string; date: string; time: string;
  reason: string; location: string; vet?: string;
  hasMedication: boolean; medicationDetails?: string;
  observations?: string; status: AppointmentStatus;
}

export interface Medication {
  id: string; petId: string; name: string; dosage?: string;
  frequency: string; durationDays: number; startDate: string;
  endDate: string; fasting: boolean; type: MedType;
  reason: string; observations?: string;
  doses: { date: string; time: string; status: "taken" | "skipped" | "pending" }[];
}

export interface AppNotification {
  id: string; title: string; body: string;
  type: "vaccine" | "appointment" | "medication" | "general";
  date: string; read: boolean;
}

export interface AdoptionPost {
  id: string;
  animalName?: string;
  animalType: string;
  breed?: string;
  gender: string;
  age: string;
  size?: string;
  photo?: string;
  photos?: string[];
  description: string;
  city: string;
  state: string;
  contactName: string;
  contact: string;
  contactPhone?: string;
  contactWhatsapp?: string;
  status: AdoptionStatus;
  healthInfo?: string;
  vaccinationInfo?: string;
  requirements?: string;
  observations?: string;
}

export interface Clinic {
  id: string; name: string; distance: string; address: string;
  phone: string; rating: number; image: string; hours?: string;
}

export interface AppContextType {
  page: Page; navigate: (p: Page, data?: any) => void; navData: any;
  user: AppUser | null; isLoggedIn: boolean;
  login: (email: string, pw: string) => boolean;
  logout: () => void;
  register: (data: Partial<AppUser> & { password: string }) => void;
  pets: Pet[]; addPet: (p: Omit<Pet, "id">) => void;
  updatePet: (p: Pet) => void; deletePet: (id: string) => void;
  vaccines: Vaccine[]; addVaccine: (v: Omit<Vaccine, "id">) => void;
  updateVaccine: (v: Vaccine) => void; deleteVaccine: (id: string) => void;
  appointments: Appointment[]; addAppointment: (a: Omit<Appointment, "id">) => void;
  updateAppointment: (a: Appointment) => void; deleteAppointment: (id: string) => void;
  medications: Medication[]; addMedication: (m: Omit<Medication, "id" | "doses">) => void;
  updateMedication: (m: Medication) => void; deleteMedication: (id: string) => void;
  notifications: AppNotification[]; markRead: (id: string) => void;
  markAllRead: () => void; deleteNotification: (id: string) => void;
  adoption: AdoptionPost[]; addAdoption: (a: Omit<AdoptionPost, "id">) => void;
  clinics: Clinic[];
  toast: { msg: string; type: "success" | "error" | "info" } | null;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
  darkMode: boolean; toggleDark: () => void;
  fontSize: "normal" | "large"; toggleFontSize: () => void;
}
