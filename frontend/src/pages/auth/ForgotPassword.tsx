import { useState } from "react";
import { Lock, CheckCircle } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { Input, Btn } from "@/components/shared";
import { BackHeader } from "@/components/layout/BackHeader";

export function ForgotPassword() {
  const { navigate, showToast } = useApp();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!email || !email.includes("@")) { showToast("Informe um e-mail válido", "error"); return; }
    setSent(true);
    showToast("Link enviado para seu e-mail!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BackHeader title="Esqueci minha senha" onBack={() => navigate("login")} />
      <div className="flex-1 px-6 flex flex-col justify-center gap-6">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
          <Lock size={36} className="text-primary" />
        </div>
        {sent ? (
          <div className="text-center">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
            <h2 className="font-bold text-lg text-gray-800 mb-2">E-mail enviado!</h2>
            <p className="text-gray-500 text-sm">Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.</p>
            <button onClick={() => navigate("login")} className="mt-6 text-primary font-semibold text-sm">
              Voltar para o login
            </button>
          </div>
        ) : (
          <>
            <div>
              <h2 className="font-bold text-xl text-gray-800 mb-2">Redefinir senha</h2>
              <p className="text-gray-500 text-sm">Informe seu e-mail e enviaremos um link para redefinir sua senha.</p>
            </div>
            <Input label="E-mail" type="email" value={email} onChange={setEmail} placeholder="seu@email.com" />
            <Btn variant="primary" full size="lg" onClick={submit}>Enviar link</Btn>
          </>
        )}
      </div>
    </div>
  );
}
