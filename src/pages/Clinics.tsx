import { MapPin, Phone, Star, Clock } from "lucide-react";
import { useApp } from "@/hooks/useApp";
import { Card, Badge, Btn } from "@/components/shared";
import { BottomNav } from "@/components/layout/BottomNav";

export function Clinics() {
  const { clinics } = useApp();

  return (
    <div className="flex flex-col bg-[#FFF8F0] min-h-screen pb-20 md:pb-6">
      <div className="bg-white border-b border-gray-100 px-5 pt-10 pb-4 md:pt-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-bold text-2xl text-gray-900">Clínicas próximas</h1>
          <p className="text-sm text-gray-400 mt-0.5">Encontre clínicas veterinárias perto de você</p>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-5 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clinics.map(c => (
            <Card key={c.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-36 overflow-hidden">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 flex-1 pr-2">{c.name}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star size={13} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold text-gray-700">{c.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin size={12} className="text-primary shrink-0" />
                  <span className="text-xs text-gray-500 truncate">{c.address}</span>
                </div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Phone size={12} className="text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-400">{c.phone}</span>
                </div>
                {c.hours ? (
                  <div className="flex items-center gap-1.5 mb-3">
                    <Clock size={12} className="text-gray-400 shrink-0" />
                    <span className="text-xs text-gray-400">{c.hours}</span>
                  </div>
                ) : <div className="mb-2" />}
                <div className="flex items-center gap-2">
                  <Badge label={c.distance} className="text-primary bg-orange-50" />
                  <a href={`tel:${c.phone.replace(/\D/g, "")}`} className="flex-1">
                    <Btn variant="outline" size="sm" full onClick={() => {}}>
                      <Phone size={12} /> Ligar
                    </Btn>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
