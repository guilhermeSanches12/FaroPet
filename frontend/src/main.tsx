import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);

// ========================================
// REGISTRAR SERVICE WORKER PARA PWA
// ========================================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js", { scope: "/" })
      .then((registration) => {
        console.log("✅ Service Worker registrado com sucesso!");
        console.log("Escopo:", registration.scope);

        // Verificar atualizações do SW periodicamente
        setInterval(() => {
          registration.update();
        }, 60000); // A cada 1 minuto
      })
      .catch((error) => {
        console.error("❌ Erro ao registrar Service Worker:", error);
      });
  });
} else {
  console.warn("⚠️ Service Worker não é suportado neste navegador");
}

// ========================================
// SOLICITAR PERMISSÃO PARA NOTIFICAÇÕES
// ========================================
if ("Notification" in window && Notification.permission === "default") {
  // Pode solicitar após interação do usuário
  document.addEventListener("click", () => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, { once: true });
}