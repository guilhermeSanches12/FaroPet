import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { Btn } from "@/components/shared";

export function Login() {
  const { navigate, login, showToast } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    const errs: Record<string, string> = {};
    if (!email) errs.email = "Informe o e-mail";
    else if (!email.includes("@")) errs.email = "E-mail inválido";
    if (!password) errs.password = "Informe a senha";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (!login(email, password)) showToast("E-mail ou senha inválidos", "error");
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col md:flex-row">
      {/* Desktop brand side */}
      <div className="hidden md:flex flex-col items-center justify-center w-2/5 bg-primary relative overflow-hidden">
        <div className="absolute top-[-80px] right-[-80px] w-64 h-64 bg-white/10 rounded-full" />
        <div className="absolute bottom-[-60px] left-[-60px] w-48 h-48 bg-white/10 rounded-full" />
        <div className="relative z-10 flex flex-col items-center gap-6 px-12 text-center">
          <img src="/img/FaroLogo.png" alt="Faro" className="w-48 object-contain" style={{ filter: "brightness(10)" }} />
          <p className="text-orange-100 text-lg leading-relaxed max-w-xs">
            A saúde do seu pet organizada e sempre ao alcance.
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile hero */}
        <div className="md:hidden relative bg-primary px-6 pt-16 pb-12 flex flex-col items-center overflow-hidden shrink-0">
          <div className="absolute top-[-40px] right-[-40px] w-40 h-40 bg-[#b45309] rounded-full opacity-40" />
          <div className="absolute bottom-[-20px] left-[-20px] w-28 h-28 bg-[#b45309] rounded-full opacity-30" />
          <div className="relative z-10 flex flex-col items-center">
            <img src="/img/FaroLogo.png" alt="Faro" className="h-12 object-contain mb-2" style={{ filter: "brightness(10)" }} />
            <p className="text-orange-100/80 text-sm mt-1 font-medium">Saúde do seu pet em primeiro lugar</p>
          </div>
        </div>

        {/* Mobile curved separator */}
        <div className="md:hidden bg-primary h-8 -mb-8 relative z-10">
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#FFF8F0] rounded-t-[32px]" />
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 pt-6 pb-10 md:max-w-md md:mx-auto md:w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-gray-900">Bem-vindo de volta</h2>
            <p className="text-gray-500 text-sm mt-1">Entre para continuar cuidando dos seus pets</p>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">E-mail</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  onKeyDown={e => e.key === "Enter" && submit()}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border text-sm bg-white outline-none transition-all font-medium ${errors.email ? "border-red-400" : "border-gray-200 focus:border-primary"}`}
                />
              </div>
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  onKeyDown={e => e.key === "Enter" && submit()}
                  className={`w-full pl-11 pr-12 py-3.5 rounded-2xl border text-sm bg-white outline-none transition-all font-medium ${errors.password ? "border-red-400" : "border-gray-200 focus:border-primary"}`}
                />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => { setEmail("roberta@email.com"); setPassword("123456"); setErrors({}); }}
                className="text-gray-400 text-xs hover:text-primary transition-colors"
              >
                Usar conta demo
              </button>
              <button onClick={() => navigate("forgot")} className="text-primary text-sm font-semibold">
                Esqueci minha senha
              </button>
            </div>
          </div>

          <button
            onClick={submit}
            className="w-full bg-primary text-white font-bold py-4 rounded-2xl text-base shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
          >
            Entrar
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs font-medium">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <Btn variant="outline" full size="lg" onClick={() => navigate("register")}>
            Criar conta grátis
          </Btn>

          <button onClick={() => navigate("landing")} className="mt-4 text-gray-400 text-sm text-center hover:text-gray-600 transition-colors">
            ← Voltar para o início
          </button>
        </div>
      </div>
    </div>
  );
}
