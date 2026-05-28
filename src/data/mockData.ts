import type { AppUser, Pet, Vaccine, Appointment, Medication, AppNotification, AdoptionPost, Clinic } from "@/types";

import imgPetCard from "@/imports/Homepage/a1d05f4be6f4739c76797a250c9d1547d674f368.png";
import imgClinic1 from "@/imports/Homepage/2a9f487081e3fc497ff6dee5dabf7fd22d2e7d0b.png";
import imgClinic2 from "@/imports/Homepage/7ef32cf936cb5b763e5b68472de39ead4c1e4aa4.png";
import imgClinic3 from "@/imports/Homepage/7fb7e5fa4cbcc7f55de350b0bded5ce84a85ebc8.png";
import imgClinic4 from "@/imports/Homepage/a4c369e0f5a4330a875daf7205abcf52f5d3a6eb.png";
import imgClinic5 from "@/imports/Homepage/d05f82d2464181f4c87c7df9d44d17d80be31ead.png";
import imgClinic6 from "@/imports/Homepage/f0021328905960a0402983283d6417d0c134603b.png";

const today = new Date().toISOString().split("T")[0];

export const MOCK_USER: AppUser = {
  id: "u1", firstName: "Roberta", lastName: "Silva",
  email: "roberta@email.com", phone: "(11) 99999-1234", cpf: "123.456.789-00",
  city: "São Paulo", state: "SP",
};

export const MOCK_PETS: Pet[] = [
  { id: "p1", name: "Floquinho", type: "dog", breed: "Golden Retriever", gender: "male",
    birthDate: "2021-03-15", weight: 28, photo: imgPetCard },
  { id: "p2", name: "Mia", type: "cat", breed: "Siamesa", gender: "female",
    birthDate: "2022-07-20", weight: 4 },
];

export const MOCK_VACCINES: Vaccine[] = [
  { id: "v1", petId: "p1", name: "V8 Polivalente", recommendedAge: "6–8 semanas", status: "taken", dose: 1, dateTaken: "2021-05-20" },
  { id: "v1b", petId: "p1", name: "V8 Polivalente", recommendedAge: "6–8 semanas", status: "taken", dose: 2, dateTaken: "2021-06-10" },
  { id: "v1c", petId: "p1", name: "V8 Polivalente", recommendedAge: "6–8 semanas", status: "taken", dose: 3, dateTaken: "2021-07-01" },
  { id: "v2", petId: "p1", name: "Antirrábica", recommendedAge: "3 meses", status: "scheduled", dose: 1, scheduledDate: "2024-08-10" },
  { id: "v3", petId: "p1", name: "Gripe Canina", recommendedAge: "Anual", status: "pending", dose: 1 },
  { id: "v4", petId: "p2", name: "Tríplice Felina", recommendedAge: "8 semanas", status: "taken", dose: 1, dateTaken: "2022-09-10" },
  { id: "v4b", petId: "p2", name: "Tríplice Felina", recommendedAge: "8 semanas", status: "pending", dose: 2 },
  { id: "v5", petId: "p2", name: "FIV/FeLV", recommendedAge: "12 semanas", status: "scheduled", dose: 1, scheduledDate: "2024-09-01" },
  { id: "v6", petId: "p2", name: "Antirrábica Felina", recommendedAge: "3 meses", status: "pending", dose: 1 },
  { id: "v7", petId: "p1", name: "Leishmaniose", recommendedAge: "4 meses", status: "pending", dose: 1 },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: "a1", petId: "p1", date: "2024-08-15", time: "10:00", reason: "Consulta de rotina",
    location: "Clínica VetCare", vet: "Dra. Ana Lima", hasMedication: false, status: "scheduled" },
  { id: "a2", petId: "p2", date: "2024-07-10", time: "14:30", reason: "Vacinação",
    location: "PetSaúde", hasMedication: true, medicationDetails: "Vermífugo", status: "completed" },
  { id: "a3", petId: "p1", date: "2024-06-01", time: "09:00", reason: "Banho e tosa",
    location: "PetShop Amigo", hasMedication: false, status: "canceled" },
];

export const MOCK_MEDICATIONS: Medication[] = [
  { id: "m1", petId: "p1", name: "Nexgard", dosage: "1 comprimido", frequency: "30 dias",
    durationDays: 365, startDate: "2024-01-01", endDate: "2024-12-31",
    fasting: false, type: "pill", reason: "Antipulgas e carrapatos",
    doses: [{ date: today, time: "08:00", status: "pending" }] },
  { id: "m2", petId: "p2", name: "Drontal", dosage: "1/2 comprimido", frequency: "6 meses",
    durationDays: 180, startDate: "2024-01-15", endDate: "2024-07-15",
    fasting: true, type: "pill", reason: "Vermífugo",
    doses: [{ date: "2024-01-15", time: "08:00", status: "taken" }] },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: "n1", title: "Vacina próxima", body: "Antirrábica do Floquinho está agendada para 10/08.", type: "vaccine", date: today, read: false },
  { id: "n2", title: "Consulta amanhã", body: "Floquinho tem consulta amanhã às 10h na VetCare.", type: "appointment", date: today, read: false },
  { id: "n3", title: "Medicação hoje", body: "Dar Nexgard ao Floquinho hoje.", type: "medication", date: today, read: true },
  { id: "n4", title: "Vacina pendente", body: "Gripe Canina do Floquinho está pendente.", type: "vaccine", date: "2024-07-01", read: true },
];

export const DEMO_ADOPTION: AdoptionPost[] = [
  {
    id: "ad1", animalName: "Mel", animalType: "dog", breed: "Vira-lata",
    gender: "Fêmea", age: "2 anos", size: "Médio",
    description: "Muito carinhosa, dócil e acostumada com crianças. Vacinada e vermifugada.",
    healthInfo: "Vacinada, vermifugada e castrada.",
    city: "Cuiabá", state: "MT", contactName: "Responsável",
    contact: "(65) 99999-0001", contactPhone: "(65) 99999-0001",
    status: "available",
  },
  {
    id: "ad2", animalName: "Theo", animalType: "cat", breed: "SRD",
    gender: "Macho", age: "1 ano", size: "Pequeno",
    description: "Calmo, castrado e muito amigável. Ótimo para apartamento.",
    healthInfo: "Castrado e vacinado.",
    city: "Várzea Grande", state: "MT", contactName: "Responsável",
    contact: "(65) 99999-0002", contactPhone: "(65) 99999-0002",
    status: "available",
  },
  {
    id: "ad3", animalName: "Luna", animalType: "dog", breed: "Pinscher",
    gender: "Fêmea", age: "3 anos", size: "Pequeno",
    description: "Pequena, agitada e perfeita para apartamento. Cheia de energia e carinho.",
    city: "Chapada dos Guimarães", state: "MT", contactName: "Responsável",
    contact: "(65) 99999-0003", contactPhone: "(65) 99999-0003",
    status: "available",
  },
  {
    id: "ad4", animalName: "Bob", animalType: "dog", breed: "Labrador",
    gender: "Macho", age: "4 anos", size: "Grande",
    description: "Brincalhão, vacinado e muito sociável. Perfeito para famílias com espaço.",
    requirements: "Lar com quintal ou espaço amplo.",
    city: "Cuiabá", state: "MT", contactName: "Responsável",
    contact: "(65) 99999-0004", contactPhone: "(65) 99999-0004",
    status: "available",
  },
];

export const MOCK_CLINICS: Clinic[] = [
  { id: "c1", name: "VetCare Centro", distance: "0.8 km", address: "Rua das Flores, 123", phone: "(11) 3333-1111", rating: 4.8, image: imgClinic1, hours: "Seg–Sex: 8h–19h · Sáb: 8h–13h" },
  { id: "c2", name: "PetSaúde", distance: "1.2 km", address: "Av. Paulista, 456", phone: "(11) 3333-2222", rating: 4.5, image: imgClinic2, hours: "Seg–Sex: 7h–20h · Sáb: 9h–15h" },
  { id: "c3", name: "Clínica Animal Care", distance: "2.0 km", address: "Rua Augusta, 789", phone: "(11) 3333-3333", rating: 4.7, image: imgClinic3, hours: "Seg–Sáb: 8h–18h · Dom: Emergências" },
  { id: "c4", name: "VetAmigo", distance: "2.5 km", address: "Rua Oscar Freire, 321", phone: "(11) 3333-4444", rating: 4.3, image: imgClinic4, hours: "Seg–Sex: 9h–18h" },
  { id: "c5", name: "PetClínica SP", distance: "3.1 km", address: "Rua Haddock Lobo, 555", phone: "(11) 3333-5555", rating: 4.6, image: imgClinic5, hours: "Seg–Sex: 8h–20h · Sáb: 8h–14h" },
  { id: "c6", name: "Hospital Veterinário", distance: "4.0 km", address: "Av. Rebouças, 888", phone: "(11) 3333-6666", rating: 4.9, image: imgClinic6, hours: "24 horas — Emergências" },
];
