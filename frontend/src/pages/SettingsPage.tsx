import { useState, useEffect } from "react";
import {
  Moon, Sun, Settings, Lock, Info, Shield, LogOut, ChevronRight, Bell, BellOff,
} from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { Card, Btn } from "@/components/shared";
import { BottomNav } from "@/components/layout/BottomNav";
import { Input } from "@/components/shared";
import imgUserAvatar from "@/imports/Homepage/c87ce173e6c8c86b453188a1b222549070cb17cc.png";
import {
  isPushSupported, getPushPermission, subscribeToPush, sendSubscriptionToBackend,
  unsubscribeFromPush, type PushPermissionState,
} from "@/services/push";

export function SettingsPage() {
  const { navigate, user, logout, darkMode, toggleDark, fontSize, toggleFontSize, showToast } = useApp();
  const [changePassword, setChangePassword] = useState(false);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pushState, setPushState] = useState<PushPermissionState>("unsupported");
  const [pushLoading, setPushLoading] = useState(false);

  useEffect(() => {
    setPushState(getPushPermission());
  }, []);

  const handleEnableNotifications = async () => {
    setPushLoading(true);
    try {
      const subscription = await subscribeToPush();
      if (subscription) {
        await sendSubscriptionToBackend(subscription);
        setPushState("granted");
        showToast("Notificações ativadas!");
      } else {
        setPushState(getPushPermission());
        showToast("Não foi possível ativar as notificações", "error");
      }
    } finally {
      setPushLoading(false);
    }
  };

  const handleDisableNotifications = async () => {
    setPushLoading(true);
    try {
      await unsubscribeFromPush();
      showToast("Notificações desativadas.", "info");
    } finally {
      setPushLoading(false);
    }
  };

  const submitPw = () => {
    if (!pw.current || !pw.next || pw.next !== pw.confirm) {
      showToast("Verifique os campos de senha", "error"); return;
    }
    showToast("Senha alterada com sucesso!");
    setChangePassword(false);
    setPw({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="flex flex-col bg-background min-h-screen pb-20 md:pb-6">
      <div className="bg-card border-b border-border px-5 pt-10 pb-4 md:pt-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-bold text-2xl text-foreground">Configurações</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-5 py-5 flex flex-col gap-4">
        {/* Profile */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
              <img src={imgUserAvatar} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{user?.firstName} {user?.lastName}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>
              <p className="text-muted-foreground">Telefone</p>
              <p className="font-medium text-foreground">{user?.phone}</p>
            </div>
            <div>
              <p className="text-muted-foreground">CPF</p>
              <p className="font-medium text-foreground">{user?.cpf}</p>
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="divide-y divide-gray-100">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon size={18} className="text-muted-foreground" /> : <Sun size={18} className="text-muted-foreground" />}
              <span className="text-sm font-medium text-foreground">{darkMode ? "Modo escuro" : "Modo claro"}</span>
            </div>
            <button
              onClick={toggleDark}
              className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? "bg-primary" : "bg-gray-200"}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${darkMode ? "right-1" : "left-1"}`} />
            </button>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings size={18} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Fonte grande</span>
            </div>
            <button
              onClick={toggleFontSize}
              className={`w-12 h-6 rounded-full transition-all relative ${fontSize === "large" ? "bg-primary" : "bg-gray-200"}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${fontSize === "large" ? "right-1" : "left-1"}`} />
            </button>
          </div>
        </Card>

        {/* Push Notifications */}
        {isPushSupported() && (
          <Card className="p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {pushState === "granted"
                ? <Bell size={18} className="text-primary" />
                : <BellOff size={18} className="text-muted-foreground" />}
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Notificações push</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {pushState === "granted" && "Ativas — você receberá lembretes no dispositivo"}
                  {pushState === "denied" && "Bloqueadas — libere nas configurações do navegador"}
                  {pushState === "default" && "Receba lembretes de vacinas, consultas e medicações"}
                  {pushState === "unsupported" && "Não suportado neste navegador"}
                </p>
              </div>
            </div>
            {pushState === "default" && (
              <Btn variant="primary" full onClick={handleEnableNotifications} disabled={pushLoading}>
                {pushLoading ? "Ativando…" : "Ativar notificações"}
              </Btn>
            )}
            {pushState === "granted" && (
              <Btn variant="ghost" full onClick={handleDisableNotifications} disabled={pushLoading}>
                {pushLoading ? "Desativando…" : "Desativar notificações"}
              </Btn>
            )}
            {pushState === "denied" && (
              <p className="text-xs text-amber-600 bg-amber-50 rounded-xl px-3 py-2">
                Para reativar, abra as configurações do site no navegador e permita notificações.
              </p>
            )}
          </Card>
        )}

        {/* Security */}
        <Card className="divide-y divide-gray-100">
          <button className="px-4 py-3 flex items-center gap-3 w-full" onClick={() => setChangePassword(!changePassword)}>
            <Lock size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground flex-1 text-left">Alterar senha</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          {changePassword && (
            <div className="p-4 flex flex-col gap-3">
              <Input label="Senha atual" type="password" value={pw.current} onChange={v => setPw(p => ({ ...p, current: v }))} placeholder="••••••••" />
              <Input label="Nova senha" type="password" value={pw.next} onChange={v => setPw(p => ({ ...p, next: v }))} placeholder="Mínimo 6 caracteres" />
              <Input label="Confirmar nova senha" type="password" value={pw.confirm} onChange={v => setPw(p => ({ ...p, confirm: v }))} placeholder="Repita a senha" />
              <Btn variant="primary" full onClick={submitPw}>Salvar senha</Btn>
            </div>
          )}
        </Card>

        {/* About */}
        <Card className="divide-y divide-gray-100">
          <button className="px-4 py-3 flex items-center gap-3 w-full">
            <Info size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground flex-1 text-left">Sobre o Faro</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          <button className="px-4 py-3 flex items-center gap-3 w-full">
            <Shield size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground flex-1 text-left">Política de privacidade</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        </Card>

        <Btn variant="danger" full onClick={logout}>
          <LogOut size={16} /> Sair da conta
        </Btn>
      </div>
      <BottomNav />
    </div>
  );
}
