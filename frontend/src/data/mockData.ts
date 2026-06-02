import type { Clinic } from "@/types";

export const MOCK_CLINICS: Clinic[] = [
  { id: "c1", name: "VetCare Centro", distance: "0.8 km", address: "Rua das Flores, 123", phone: "(11) 3333-1111", rating: 4.8, image: "https://placehold.co/400x300/FF8000/FFFFFF?text=VetCare+Centro", hours: "Seg–Sex: 8h–19h · Sáb: 8h–13h" },
  { id: "c2", name: "PetSaúde", distance: "1.2 km", address: "Av. Paulista, 456", phone: "(11) 3333-2222", rating: 4.5, image: "https://placehold.co/400x300/FF8000/FFFFFF?text=PetSaude", hours: "Seg–Sex: 7h–20h · Sáb: 9h–15h" },
  { id: "c3", name: "Clínica Animal Care", distance: "2.0 km", address: "Rua Augusta, 789", phone: "(11) 3333-3333", rating: 4.7, image: "https://placehold.co/400x300/FF8000/FFFFFF?text=Animal+Care", hours: "Seg–Sáb: 8h–18h · Dom: Emergências" },
  { id: "c4", name: "VetAmigo", distance: "2.5 km", address: "Rua Oscar Freire, 321", phone: "(11) 3333-4444", rating: 4.3, image: "https://placehold.co/400x300/FF8000/FFFFFF?text=VetAmigo", hours: "Seg–Sex: 9h–18h" },
  { id: "c5", name: "PetClínica SP", distance: "3.1 km", address: "Rua Haddock Lobo, 555", phone: "(11) 3333-5555", rating: 4.6, image: "https://placehold.co/400x300/FF8000/FFFFFF?text=PetClinica+SP", hours: "Seg–Sex: 8h–20h · Sáb: 8h–14h" },
  { id: "c6", name: "Hospital Veterinário", distance: "4.0 km", address: "Av. Rebouças, 888", phone: "(11) 3333-6666", rating: 4.9, image: "https://placehold.co/400x300/FF8000/FFFFFF?text=Hospital+Vet", hours: "24 horas — Emergências" },
];