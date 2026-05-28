import { useState } from "react";
import { PawPrint, Syringe, Calendar, Pill, Heart, ArrowRight, Shield } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import imgOnboarding1 from "@/imports/IPhone1415ProMax1/9d970e908cdb7a8eb364682a4a93d77d40e1821d.png";
import imgOnboarding2 from "@/imports/IPhone1415ProMax2/3fa0f5d630db51095eac4adea238f9f1eee02484.png";
import imgOnboarding3 from "@/imports/IPhone1415ProMax3/133bc8adaaa6dcfebb92a7c5800af1dad4eef47f.png";

const FEATURES = [
  { icon: Syringe, color: "bg-blue-500", label: "Vacinas", desc: "Controle e alertas automáticos de doses" },
  { icon: Calendar, color: "bg-purple-500", label: "Consultas", desc: "Agendamento e histórico de visitas" },
  { icon: Pill, color: "bg-green-500", label: "Medicações", desc: "Lembretes e controle de tratamentos" },
  { icon: Heart, color: "bg-rose-500", label: "Adoção", desc: "Conecte animais a novos lares" },
];

function Slide1({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      {/* Background image layer */}
      <div className="absolute inset-0">
        <img src={imgOnboarding1} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0800]/80 via-[#1A0800]/50 to-[#1A0800]/95" />
      </div>

      {/* Large decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="text-white font-black select-none"
          style={{ fontSize: "clamp(100px, 40vw, 200px)", opacity: 0.06, letterSpacing: "-4px", lineHeight: 1 }}
        >
          FARO
        </span>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-end px-7 pb-6">
        {/* Brand mark top */}
        <div className="absolute top-14 left-7 flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
            <PawPrint size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Faro</span>
        </div>

        {/* Main text */}
        <div className="mb-8">
          <div className="inline-block bg-primary/20 border border-primary/30 rounded-full px-3 py-1 mb-4">
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">Saúde Pet</span>
          </div>
          <h1 className="text-white text-4xl font-black leading-tight mb-3">
            A saúde do seu pet, na palma da sua mão.
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            Vacinas, consultas, medicações e muito mais — organizados num só lugar.
          </p>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mb-6">
          <div className="h-1.5 w-6 rounded-full bg-primary" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onNext}
            className="w-full bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-base shadow-lg shadow-primary/30"
          >
            Começar <ArrowRight size={20} />
          </button>
          <button onClick={onSkip} className="text-white/60 text-sm font-medium py-2">
            Já tenho conta
          </button>
        </div>
      </div>
    </div>
  );
}

function Slide2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#FFF8F0] overflow-hidden">
      {/* Orange top band */}
      <div className="bg-primary pt-14 pb-8 px-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#b45309] rounded-bl-full opacity-40" />
        <div className="relative">
          <span className="text-orange-100/80 text-xs font-semibold uppercase tracking-widest">Recursos</span>
          <h2 className="text-white text-3xl font-black mt-1 leading-tight">
            Tudo que seu pet precisa.
          </h2>
        </div>
      </div>

      {/* Features grid */}
      <div className="flex-1 px-5 pt-6 pb-4 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map(({ icon: Icon, color, label, desc }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3 shadow-sm`}>
                <Icon size={20} className="text-white" />
              </div>
              <p className="font-bold text-gray-900 text-sm">{label}</p>
              <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Extra trust line */}
        <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-4 py-3 mt-4 border border-orange-100">
          <Shield size={16} className="text-primary shrink-0" />
          <p className="text-xs text-gray-600 font-medium">Gratuito. Sem anúncios. Seus dados são seus.</p>
        </div>

        {/* Dots & nav */}
        <div className="flex items-center justify-between mt-5">
          <div className="flex gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
            <div className="h-1.5 w-6 rounded-full bg-primary" />
            <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
          </div>
          <div className="flex gap-2">
            <button onClick={onBack} className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-semibold">
              Voltar
            </button>
            <button
              onClick={onNext}
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold flex items-center gap-1.5"
            >
              Próximo <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide3({ onRegister, onLogin }: { onRegister: () => void; onLogin: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={imgOnboarding3} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-[#6C3703]/95" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-[-60px] right-[-60px] w-48 h-48 bg-white/10 rounded-full" />
      <div className="absolute top-20 right-16 w-20 h-20 bg-white/10 rounded-full" />

      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-between px-7 pt-16 pb-8">
        {/* Top accent */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center">
            <PawPrint size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg">Faro</span>
        </div>

        {/* Main content */}
        <div>
          <p className="text-orange-200 text-sm font-semibold uppercase tracking-widest mb-3">Pronto para começar?</p>
          <h1 className="text-white text-4xl font-black leading-tight mb-4">
            Cuide do seu pet com carinho e tecnologia.
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            Junte-se a tutores que já garantem mais saúde e bem-estar para seus animais.
          </p>
        </div>

        {/* Dots & CTAs */}
        <div>
          <div className="flex gap-2 mb-6">
            <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <div className="h-1.5 w-6 rounded-full bg-white" />
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={onRegister}
              className="w-full bg-white text-primary font-bold py-4 rounded-2xl text-base shadow-lg"
            >
              Criar conta gratis
            </button>
            <button
              onClick={onLogin}
              className="w-full border-2 border-white/50 text-white font-bold py-4 rounded-2xl text-base"
            >
              Entrar na conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Onboarding() {
  const { navigate } = useApp();
  const [slide, setSlide] = useState(0);

  if (slide === 0) return <Slide1 onNext={() => setSlide(1)} onSkip={() => navigate("login")} />;
  if (slide === 1) return <Slide2 onNext={() => setSlide(2)} onBack={() => setSlide(0)} />;
  return (
    <Slide3
      onRegister={() => navigate("register")}
      onLogin={() => navigate("login")}
    />
  );
}
