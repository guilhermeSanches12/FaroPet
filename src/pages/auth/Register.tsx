import { useState } from "react";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { Input, Select } from "@/components/shared";
import type { AppUser } from "@/types";

const BR_STATES = [
  { value: "AC", label: "AC" }, { value: "AL", label: "AL" }, { value: "AP", label: "AP" },
  { value: "AM", label: "AM" }, { value: "BA", label: "BA" }, { value: "CE", label: "CE" },
  { value: "DF", label: "DF" }, { value: "ES", label: "ES" }, { value: "GO", label: "GO" },
  { value: "MA", label: "MA" }, { value: "MT", label: "MT" }, { value: "MS", label: "MS" },
  { value: "MG", label: "MG" }, { value: "PA", label: "PA" }, { value: "PB", label: "PB" },
  { value: "PR", label: "PR" }, { value: "PE", label: "PE" }, { value: "PI", label: "PI" },
  { value: "RJ", label: "RJ" }, { value: "RN", label: "RN" }, { value: "RS", label: "RS" },
  { value: "RO", label: "RO" }, { value: "RR", label: "RR" }, { value: "SC", label: "SC" },
  { value: "SP", label: "SP" }, { value: "SE", label: "SE" }, { value: "TO", label: "TO" },
];

export function Register() {
  const { navigate, register } = useApp();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    city: "", state: "", password: "", confirm: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Obrigatório";
    if (!form.lastName.trim()) errs.lastName = "Obrigatório";
    if (!form.email || !form.email.includes("@")) errs.email = "E-mail inválido";
    if (!form.phone.trim()) errs.phone = "Obrigatório";
    if (!form.password || form.password.length < 6) errs.password = "Mínimo 6 caracteres";
    if (form.password !== form.confirm) errs.confirm = "Senhas não coincidem";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      city: form.city || undefined,
      state: form.state || undefined,
      cpf: "",
      password: form.password,
    } as Partial<AppUser> & { password: string });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-5 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate("login")}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <img src="/img/FaroLogo.png" alt="Faro" className="h-7 object-contain" />
        </div>
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full px-5 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900">Crie sua conta</h1>
          <p className="text-gray-500 text-sm mt-1">Grátis para sempre. Sem anúncios.</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <Input label="Nome" value={form.firstName} onChange={set("firstName")} placeholder="Nome" error={errors.firstName} />
            <Input label="Sobrenome" value={form.lastName} onChange={set("lastName")} placeholder="Sobrenome" error={errors.lastName} />
          </div>

          <Input label="E-mail" type="email" value={form.email} onChange={set("email")} placeholder="seu@email.com" error={errors.email} />
          <Input label="Telefone" type="tel" value={form.phone} onChange={set("phone")} placeholder="(11) 99999-9999" error={errors.phone} />

          {/* City + State */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Input label="Cidade — opcional" value={form.city} onChange={set("city")} placeholder="Sua cidade" />
            </div>
            <div className="w-28 shrink-0">
              <Select label="UF" value={form.state} onChange={set("state")} options={BR_STATES} />
            </div>
          </div>

          {/* Password */}
          <Input
            label="Senha"
            type={showPw ? "text" : "password"}
            value={form.password}
            onChange={set("password")}
            placeholder="Mínimo 6 caracteres"
            error={errors.password}
            rightEl={
              <button type="button" onClick={() => setShowPw(!showPw)} className="text-gray-400">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
          <Input
            label="Confirmar senha"
            type={showPw ? "text" : "password"}
            value={form.confirm}
            onChange={set("confirm")}
            placeholder="Repita a senha"
            error={errors.confirm}
          />

          <button
            onClick={submit}
            className="w-full bg-primary text-white font-bold py-4 rounded-2xl text-base shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors mt-2"
          >
            Criar conta
          </button>

          <p className="text-center text-sm text-gray-500">
            Já tem conta?{" "}
            <button onClick={() => navigate("login")} className="text-primary font-bold hover:underline">
              Entrar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
