import { pushApi } from "./api";

export type PushPermissionState = "granted" | "denied" | "default" | "unsupported";

export function isPushSupported(): boolean {
  return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
}

export function getPushPermission(): PushPermissionState {
  if (!isPushSupported()) return "unsupported";
  return Notification.permission as PushPermissionState;
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!("serviceWorker" in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register("/service-worker.js");
    return reg;
  } catch (err) {
    console.error("[SW] Falha ao registrar:", err);
    return null;
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export async function subscribeToPush(): Promise<PushSubscription | null> {
  if (!isPushSupported()) return null;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const reg = await navigator.serviceWorker.ready;

  try {
    const { publicKey } = await pushApi.getPublicKey();
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });
    return subscription;
  } catch (err) {
    console.error("[Push] Falha ao criar subscription:", err);
    return null;
  }
}

export async function sendSubscriptionToBackend(subscription: PushSubscription): Promise<boolean> {
  const json = subscription.toJSON();
  const p256dh = json.keys?.p256dh;
  const auth = json.keys?.auth;

  if (!p256dh || !auth) return false;

  try {
    await pushApi.subscribe({
      endpoint: subscription.endpoint,
      keys: { p256dh, auth },
      userAgent: navigator.userAgent,
    });
    return true;
  } catch (err) {
    console.error("[Push] Falha ao salvar subscription:", err);
    return false;
  }
}

export async function unsubscribeFromPush(): Promise<boolean> {
  if (!("serviceWorker" in navigator)) return false;

  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (!sub) return true;

    await pushApi.unsubscribe(sub.endpoint);
    await sub.unsubscribe();
    return true;
  } catch (err) {
    console.error("[Push] Falha ao desinscrever:", err);
    return false;
  }
}

export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
  if (!("serviceWorker" in navigator)) return null;
  const reg = await navigator.serviceWorker.ready;
  return reg.pushManager.getSubscription();
}
