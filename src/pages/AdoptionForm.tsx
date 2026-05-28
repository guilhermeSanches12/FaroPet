import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { BottomNav } from "@/components/layout/BottomNav";

const BR_STATES = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS",
  "MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

const BREEDS: Record<string, string[]> = {
  dog: ["SRD (Sem raça definida)","Labrador Retriever","Golden Retriever","Poodle","Shih Tzu","Bulldog","Pastor Alemão","Rottweiler","Yorkshire Terrier","Beagle","Outro"],
  cat: ["SRD (Sem raça definida)","Gato Persa","Gato Siamês","Maine Coon","Ragdoll","British Shorthair","Outro"],
  bird: ["SRD (Sem raça definida)","Calopsita","Periquito","Canário","Papagaio","Outro"],
  rabbit: ["SRD (Sem raça definida)","Angorá","Holland Lop","Outro"],
  other: ["SRD (Sem raça definida)","Outro"],
};

const fieldCls = "w-full border border-gray-200 rounded-xl px-3 py-3.5 text-sm bg-gray-50 focus:outline-none focus:border-[#F97316] transition-colors";

export function AdoptionForm() {
  const { navigate, addAdoption } = useApp();
  const [form, setForm] = useState({
    animalName: "", animalType: "", breed: "", gender: "",
    age: "", size: "", description: "", healthInfo: "",
    vaccinationInfo: "", requirements: "",
    city: "", state: "",
    contactName: "", contactPhone: "", contactWhatsapp: "",
    observations: "",
    status: "available" as const,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.animalName.trim()) errs.animalName = "Obrigatório";
    if (!form.animalType) errs.animalType = "Selecione a espécie";
    if (!form.gender) errs.gender = "Selecione o gênero";
    if (!form.description.trim()) errs.description = "Informe uma descrição";
    if (!form.city.trim()) errs.city = "Informe a cidade";
    if (!form.state) errs.state = "Selecione o estado";
    if (!form.contactName.trim()) errs.contactName = "Informe o responsável";
    if (!form.contactPhone.trim() && !form.contactWhatsapp.trim()) errs.contactPhone = "Informe telefone ou WhatsApp";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    addAdoption({
      animalName: form.animalName,
      animalType: form.animalType,
      breed: form.breed || undefined,
      gender: form.gender,
      age: form.age || "",
      size: form.size || undefined,
      description: form.description,
      healthInfo: form.healthInfo || undefined,
      vaccinationInfo: form.vaccinationInfo || undefined,
      requirements: form.requirements || undefined,
      city: form.city,
      state: form.state,
      contactName: form.contactName,
      contact: form.contactPhone || form.contactWhatsapp,
      contactPhone: form.contactPhone || undefined,
      contactWhatsapp: form.contactWhatsapp || undefined,
      observations: form.observations || undefined,
      status: "available",
    });
    navigate("adoption");
  };

  const breedOptions = BREEDS[form.animalType] || [];

  return (
    <div className="bg-[#F4F4F0] dark:bg-[#1E1812] min-h-screen">
      {/* Sticky header */}
      <div className="bg-white dark:bg-[#241C14] border-b border-gray-100 dark:border-[#3D2E22] shadow-sm sticky top-0 z-40">
        <div className="flex items-center px-4 lg:px-8 py-4">
          <button
            onClick={() => navigate("adoption")}
            className="lg:hidden w-9 h-9 rounded-full bg-gray-100 dark:bg-[#332820] flex items-center justify-center shrink-0 mr-3"
            aria-label="Voltar"
          >
            <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-gray-100">Publicar para Adoção</h1>
            <p className="text-xs text-gray-400 hidden lg:block">Ajude um animal a encontrar um lar</p>
          </div>
        </div>
      </div>

      <main className="px-4 sm:px-5 lg:px-8 py-6 pb-28 lg:pb-10 max-w-2xl lg:max-w-3xl space-y-5">

        {/* Animal info */}
        <div className="bg-white dark:bg-[#2A2018] rounded-2xl border border-gray-100 dark:border-[#3D2E22] p-5 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">Informações do animal</h2>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Nome *</label>
            <input type="text" value={form.animalName} onChange={set("animalName")} placeholder="Nome do animal" className={fieldCls} />
            {errors.animalName && <p className="text-xs text-red-500 mt-1">{errors.animalName}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Espécie *</label>
              <select value={form.animalType} onChange={set("animalType")} className={fieldCls}>
                <option value="" disabled>Selecione</option>
                <option value="dog">Cachorro</option>
                <option value="cat">Gato</option>
                <option value="bird">Pássaro</option>
                <option value="rabbit">Coelho</option>
                <option value="other">Outro</option>
              </select>
              {errors.animalType && <p className="text-xs text-red-500 mt-1">{errors.animalType}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Gênero *</label>
              <select value={form.gender} onChange={set("gender")} className={fieldCls}>
                <option value="" disabled>Selecione</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
              {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Raça</label>
            <select value={form.breed} onChange={set("breed")} className={fieldCls} disabled={!form.animalType}>
              <option value="">{form.animalType ? "SRD (Sem raça definida)" : "Selecione a espécie primeiro"}</option>
              {breedOptions.filter(b => b !== "SRD (Sem raça definida)").map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Idade</label>
              <input type="text" value={form.age} onChange={set("age")} placeholder="Ex: 2 anos" className={fieldCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Porte</label>
              <select value={form.size} onChange={set("size")} className={fieldCls}>
                <option value="">Selecione</option>
                <option value="Pequeno">Pequeno</option>
                <option value="Médio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Descrição *</label>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={4}
              placeholder="Conte sobre a personalidade, comportamento e história do animal..."
              className={`${fieldCls} resize-none`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>
        </div>

        {/* Health & vaccination */}
        <div className="bg-white dark:bg-[#2A2018] rounded-2xl border border-gray-100 dark:border-[#3D2E22] p-5 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">Saúde e vacinação</h2>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Informações de saúde</label>
            <textarea
              value={form.healthInfo}
              onChange={set("healthInfo")}
              rows={3}
              placeholder="Condições de saúde, se é castrado(a), tratamentos em andamento..."
              className={`${fieldCls} resize-none`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Vacinação</label>
            <textarea
              value={form.vaccinationInfo}
              onChange={set("vaccinationInfo")}
              rows={2}
              placeholder="Vacinas aplicadas, carteirinha, etc..."
              className={`${fieldCls} resize-none`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
              Requisitos para adoção <span className="font-normal text-gray-400">(opcional)</span>
            </label>
            <textarea
              value={form.requirements}
              onChange={set("requirements")}
              rows={2}
              placeholder="Lar com espaço, não ter outros pets, etc..."
              className={`${fieldCls} resize-none`}
            />
          </div>
        </div>

        {/* Location */}
        <div className="bg-white dark:bg-[#2A2018] rounded-2xl border border-gray-100 dark:border-[#3D2E22] p-5 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">Localização</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Cidade *</label>
              <input type="text" value={form.city} onChange={set("city")} placeholder="Sua cidade" className={fieldCls} />
              {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Estado *</label>
              <select value={form.state} onChange={set("state")} className={fieldCls}>
                <option value="" disabled>Selecione</option>
                {BR_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-[#2A2018] rounded-2xl border border-gray-100 dark:border-[#3D2E22] p-5 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">Contato</h2>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Seu nome *</label>
            <input type="text" value={form.contactName} onChange={set("contactName")} placeholder="Nome do responsável" className={fieldCls} />
            {errors.contactName && <p className="text-xs text-red-500 mt-1">{errors.contactName}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Telefone</label>
              <input type="tel" value={form.contactPhone} onChange={set("contactPhone")} placeholder="(11) 9 9999-9999" className={fieldCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">WhatsApp</label>
              <input type="tel" value={form.contactWhatsapp} onChange={set("contactWhatsapp")} placeholder="(11) 9 9999-9999" className={fieldCls} />
            </div>
          </div>
          {errors.contactPhone && <p className="text-xs text-red-500 -mt-2">{errors.contactPhone}</p>}

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
              Observações finais <span className="font-normal text-gray-400">(opcional)</span>
            </label>
            <textarea
              value={form.observations}
              onChange={set("observations")}
              rows={2}
              placeholder="Qualquer informação adicional..."
              className={`${fieldCls} resize-none`}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            onClick={() => navigate("adoption")}
            className="flex-1 py-3.5 text-center rounded-xl text-sm font-semibold border border-gray-200 dark:border-[#4A3828] text-gray-600 dark:text-gray-400 bg-white dark:bg-[#2A2018] hover:bg-gray-50 dark:hover:bg-[#332820]"
          >
            Cancelar
          </button>
          <button
            onClick={submit}
            className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-sm"
            style={{ background: "#F97316" }}
          >
            Publicar para adoção
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
