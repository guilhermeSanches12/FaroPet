import { useEffect } from "react";
import { AppProvider } from "@/context/AppContext";
import { useApp } from "@/hooks/useApp";
import { Toast } from "@/components/layout/Toast";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { BottomNav } from "@/components/layout/BottomNav";

import { Landing } from "@/pages/Landing";
import { Onboarding } from "@/pages/auth/Onboarding";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";
import { HomeScreen } from "@/pages/HomeScreen";
import { Pets } from "@/pages/Pets";
import { PetForm } from "@/pages/PetForm";
import { PetDetail } from "@/pages/PetDetail";
import { VaccineWallet } from "@/pages/VaccineWallet";
import { VaccineForm } from "@/pages/VaccineForm";
import { Appointments } from "@/pages/Appointments";
import { AppointmentForm } from "@/pages/AppointmentForm";
import { Medications } from "@/pages/Medications";
import { MedicationForm } from "@/pages/MedicationForm";
import { Agenda } from "@/pages/Agenda";
import { NotificationsPage } from "@/pages/NotificationsPage";
import { Adoption } from "@/pages/Adoption";
import { AdoptionDetail } from "@/pages/AdoptionDetail";
import { AdoptionForm } from "@/pages/AdoptionForm";
import { Clinics } from "@/pages/Clinics";
import { SettingsPage } from "@/pages/SettingsPage";
import type { Page } from "@/types";

const AUTH_PAGES: Page[] = ["landing", "onboarding", "login", "register", "forgot"];

const APP_PAGES: Page[] = [
  "home", "pets", "pet-form", "pet-detail",
  "vaccines", "vaccine-form",
  "appointments", "appointment-form",
  "medications", "medication-form",
  "agenda", "notifications",
  "adoption", "adoption-detail", "adoption-form",
  "clinics", "settings",
];

function Router() {
  const { page, isLoggedIn, navigate } = useApp();
  const isAuth = AUTH_PAGES.includes(page);

  useEffect(() => {
    if (!isLoggedIn && !isAuth) navigate("login");
  }, [isLoggedIn, page]);

  if (isAuth) {
    return (
      <div className="min-h-screen bg-background">
        {page === "landing" && <Landing />}
        {page === "onboarding" && <Onboarding />}
        {page === "login" && <Login />}
        {page === "register" && <Register />}
        {page === "forgot" && <ForgotPassword />}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 md:ml-64 min-h-screen pb-16 md:pb-0">
        {page === "home" && <HomeScreen />}
        {page === "pets" && <Pets />}
        {page === "pet-form" && <PetForm />}
        {page === "pet-detail" && <PetDetail />}
        {page === "vaccines" && <VaccineWallet />}
        {page === "vaccine-form" && <VaccineForm />}
        {page === "appointments" && <Appointments />}
        {page === "appointment-form" && <AppointmentForm />}
        {page === "medications" && <Medications />}
        {page === "medication-form" && <MedicationForm />}
        {page === "agenda" && <Agenda />}
        {page === "notifications" && <NotificationsPage />}
        {page === "adoption" && <Adoption />}
        {page === "adoption-detail" && <AdoptionDetail />}
        {page === "adoption-form" && <AdoptionForm />}
        {page === "clinics" && <Clinics />}
        {page === "settings" && <SettingsPage />}
        {!APP_PAGES.includes(page) && <HomeScreen />}
      </div>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Toast />
      <Router />
    </AppProvider>
  );
}
