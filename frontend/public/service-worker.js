const CACHE_NAME = "faropet-v1";
const API_CACHE_NAME = "faropet-api-v1";

// Assets para fazer cache no install
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/img/FaroLogo.png",
  "/img/iconWebLogo.png",
  "/img/pawIcon.png"
];

// ========================================
// INSTALL EVENT - Cache inicial de assets
// ========================================
self.addEventListener("install", (event) => {
  console.log("📦 [SW] Install event - Cacheando assets iniciais...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("✅ [SW] Assets cacheados com sucesso");
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((error) => {
        console.error("❌ [SW] Erro ao cachear assets:", error);
      })
  );

  // Force a ativação imediata
  self.skipWaiting();
});

// ========================================
// ACTIVATE EVENT - Limpar caches antigos
// ========================================
self.addEventListener("activate", (event) => {
  console.log("🚀 [SW] Activate event - Limpando caches antigos...");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
            console.log("🗑️ [SW] Removendo cache antigo:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // Tomar controle de todos os clientes
  self.clients.claim();
});

// ========================================
// FETCH EVENT - Cache estratégies
// ========================================
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Pular requests que não são GET
  if (request.method !== "GET") {
    return;
  }

  // Pular chrome extensions e dados URLs
  if (url.protocol === "chrome-extension:" || url.protocol === "data:") {
    return;
  }

  // ========== API CALLS: Network First ==========
  if (url.pathname.includes("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache a resposta se for sucesso
          if (response && response.status === 200 && response.type !== "error") {
            const responseClone = response.clone();
            caches.open(API_CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Se falhar, tenta usar cache
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              console.log("📦 [SW] Usando cache para API:", url.pathname);
              return cachedResponse;
            }
            // Se não tiver cache, retorna erro offline
            return new Response(
              JSON.stringify({
                error: "Você está offline e não há cache disponível",
              }),
              {
                status: 503,
                statusText: "Service Unavailable",
                headers: { "Content-Type": "application/json" },
              }
            );
          });
        })
    );
    return;
  }

  // ========== ASSETS: Cache First ==========
  event.respondWith(
    caches
      .match(request)
      .then((response) => {
        if (response) {
          console.log("💾 [SW] Usando cache:", url.pathname);
          return response;
        }

        return fetch(request)
          .then((response) => {
            // Cache assets bem-sucedidos
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // Fallback para offline
            if (request.destination === "document") {
              return caches.match("/index.html");
            }

            // Para imagens, retornar um placeholder
            if (request.destination === "image") {
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">' +
                  '<rect fill="#e0e0e0" width="100" height="100"/>' +
                  '<text x="50" y="50" text-anchor="middle" dy=".3em" fill="#999">Offline</text>' +
                  '</svg>',
                { headers: { "Content-Type": "image/svg+xml" } }
              );
            }

            return new Response("Recurso não disponível offline", {
              status: 503,
            });
          });
      })
      .catch(() => {
        // Último fallback
        if (request.destination === "document") {
          return caches.match("/index.html");
        }
      })
  );
});

// ========================================
// PUSH NOTIFICATIONS
// ========================================
self.addEventListener("push", (event) => {
  console.log("🔔 [SW] Push notification recebida");

  let notificationData = {
    title: "FaroPet",
    body: "Você tem um novo lembrete.",
    tag: "faropet-notification",
    url: "/notifications",
  };

  if (event.data) {
    try {
      notificationData = { ...notificationData, ...event.data.json() };
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      tag: notificationData.tag,
      data: {
        url: notificationData.url,
      },
      vibrate: [200, 100, 200],
      actions: [
        {
          action: "open",
          title: "Abrir",
        },
        {
          action: "close",
          title: "Fechar",
        },
      ],
    })
  );
});

// ========================================
// NOTIFICATION CLICK
// ========================================
self.addEventListener("notificationclick", (event) => {
  console.log("👆 [SW] Notificação clicada");

  event.notification.close();

  const url = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Procura janela já aberta
      for (const client of clientList) {
        if (client.url === new URL(url, self.location).href && "focus" in client) {
          console.log("📱 [SW] Focando em janela existente");
          return client.focus();
        }
      }
      // Abre nova janela
      console.log("📱 [SW] Abrindo nova janela");
      return clients.openWindow(url);
    })
  );
});

// ========================================
// NOTIFICATION CLOSE
// ========================================
self.addEventListener("notificationclose", (event) => {
  console.log("❌ [SW] Notificação fechada");
});

// ========================================
// MESSAGE EVENTS (Para comunicação com app)
// ========================================
self.addEventListener("message", (event) => {
  console.log("💬 [SW] Mensagem recebida:", event.data);

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CLEAR_CACHE") {
    caches.delete(CACHE_NAME).then(() => {
      console.log("🗑️ [SW] Cache limpo");
    });
  }
});

console.log("✅ Service Worker carregado com sucesso!");