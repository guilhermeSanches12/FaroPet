import { Syringe, Calendar, Pill, MapPin, PawPrint, Shield } from "lucide-react";
import { useApp } from "@/hooks/useApp";

const FEATURES = [
  {
    icon: Syringe,
    title: "Carteira de Vacinas",
    desc: "Registre e acompanhe todas as vacinas com lembretes automáticos de doses.",
  },
  {
    icon: Calendar,
    title: "Consultas",
    desc: "Agende consultas veterinárias e receba lembretes antes da data.",
  },
  {
    icon: Pill,
    title: "Medicações",
    desc: "Controle de doses, tratamentos e alertas de medicação diários.",
  },
  {
    icon: PawPrint,
    title: "Perfil do Pet",
    desc: "Histórico de saúde completo, organizado e acessível a qualquer momento.",
  },
  {
    icon: MapPin,
    title: "Clínicas Próximas",
    desc: "Encontre clínicas veterinárias e pet shops perto de você.",
  },
  {
    icon: Shield,
    title: "Adoção",
    desc: "Conecte animais que precisam de um lar a tutores responsáveis.",
  },
];

export function Landing() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
      {/* ─── Header ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <img src="/img/FaroLogo.png" alt="Faro" className="h-8 object-contain" />
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("login")}
              className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors px-4 py-2"
            >
              Entrar
            </button>
            <button
              onClick={() => navigate("register")}
              className="text-sm font-semibold text-white bg-primary px-5 py-2 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Criar conta
            </button>
          </div>
        </div>
      </header>

      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 py-16 md:py-24 flex flex-col md:flex-row md:items-center gap-12">
          {/* Text side */}
          <div className="md:flex-1">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <img src="/img/pawIcon.png" alt="" className="w-4 h-4 object-contain" style={{ filter: "invert(0.35) sepia(1) saturate(4) hue-rotate(360deg)" }} />
              <span className="text-primary text-xs font-semibold uppercase tracking-widest">Saúde Pet</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              A saúde do seu pet<br />
              <span className="text-primary">na palma da mão.</span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
              Vacinas, consultas, medicações e adoção — tudo organizado em um só lugar.
              Gratuito, sem anúncios, seus dados são seus.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("register")}
                className="flex-1 sm:flex-none bg-primary text-white font-bold py-4 px-8 rounded-2xl text-base shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
              >
                Criar conta grátis
              </button>
              <button
                onClick={() => navigate("login")}
                className="flex-1 sm:flex-none border-2 border-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-2xl text-base hover:border-primary hover:text-primary transition-colors"
              >
                Já tenho conta
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Comece agora — é grátis para sempre.
            </p>
          </div>

          {/* Visual side */}
          <div className="md:flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Central circle */}
              <div className="absolute inset-8 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/30">
                <img src="/img/FaroLogo.png" alt="Faro" className="w-40 object-contain" style={{ filter: "brightness(10)" }} />
              </div>
              {/* Orbit dots */}
              {[
                { top: "0%", left: "50%", delay: "0s", icon: Syringe },
                { top: "25%", left: "90%", delay: "0.2s", icon: Calendar },
                { top: "75%", left: "90%", delay: "0.4s", icon: Pill },
                { top: "100%", left: "50%", delay: "0.6s", icon: MapPin },
                { top: "75%", left: "10%", delay: "0.8s", icon: PawPrint },
                { top: "25%", left: "10%", delay: "1s", icon: Shield },
              ].map(({ top, left, icon: Icon }, i) => (
                <div
                  key={i}
                  className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-md flex items-center justify-center"
                  style={{ top, left }}
                >
                  <Icon size={20} className="text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Tudo que seu pet precisa</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Uma plataforma completa para cuidar da saúde e bem-estar do seu animal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#FFF8F0] rounded-2xl p-6 border border-orange-100">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────── */}
      <section className="bg-primary py-16">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <img src="/img/FaroLogo.png" alt="Faro" className="h-10 object-contain mx-auto mb-6" style={{ filter: "brightness(10)" }} />
          <h2 className="text-3xl font-black text-white mb-3">
            Pronto para cuidar melhor do seu pet?
          </h2>
          <p className="text-orange-100 mb-8">
            Junte-se a tutores que já garantem mais saúde e bem-estar para seus animais.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("register")}
              className="bg-white text-primary font-bold py-4 px-8 rounded-2xl text-base shadow-lg hover:bg-orange-50 transition-colors"
            >
              Criar conta grátis
            </button>
            <button
              onClick={() => navigate("login")}
              className="border-2 border-white/50 text-white font-semibold py-4 px-8 rounded-2xl text-base hover:border-white transition-colors"
            >
              Entrar na conta
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <img src="/img/FaroLogo.png" alt="Faro" className="h-6 object-contain opacity-60" />
          <p className="text-xs text-gray-400">© 2025 Faro. Todos os direitos reservados.</p>
          <button
            onClick={() => navigate("onboarding")}
            className="text-xs text-primary font-medium hover:underline"
          >
            Ver apresentação
          </button>
        </div>
      </footer>
    </div>
  );
}
