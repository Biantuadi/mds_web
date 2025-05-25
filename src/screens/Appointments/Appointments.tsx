import  { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ScrollArea } from "../../components/ui/scroll-area";
import { dataService } from "../../services/dataService";
import Header from "../../components/Header";

interface User {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  competences: string;
  emploi_actuel: string;
  emploi_vise: string;
  experience: string;
  notes: string;
  image_profil: string;
  photo: string;
  date_inscription: string;
}

interface RendezVous {
  id: number;
  patient_id: number;
  psychologue_id: number;
  date_heure: string;
  duree: number;
  type: string;
  notes: string;
  statut: string;
  date_creation: string;
}

export const Appointments = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([]);

  useEffect(() => {
    dataService.getCurrentUser().then(setUser);
  }, []);

  useEffect(() => {
    if (user) {
      dataService.getRendezVous(user.id).then(setRendezVous);
    }
  }, [user]);

  // Helpers pour formatage
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
  const formatTime = (iso: string, duree: number) => {
    const start = new Date(iso);
    const end = new Date(start.getTime() + duree * 60000);
    return `${start.getHours().toString().padStart(2, "0")}:${start.getMinutes().toString().padStart(2, "0")} - ${end.getHours().toString().padStart(2, "0")}:${end.getMinutes().toString().padStart(2, "0")}`;
  };

  // Rendez-vous à venir (date future)
  const rdvAVenir = [...rendezVous]
    .filter(rdv => new Date(rdv.date_heure) > new Date())
    .sort((a, b) => new Date(a.date_heure).getTime() - new Date(b.date_heure).getTime());

  return (
    <div className="bg-transparent flex flex-row justify-center ">
      <div className="bg-[url(/bg_modules_list.png)] bg-[100%_100%] w-[100vw] min-h-screen bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col w-full items-center relative">
          {/* Header */}
          <Header user={user} />

          {/* Main Content */}
          <div className="flex flex-col w-full max-w-[1200px] px-8 py-12 gap-8">
            <Card className="bg-[#fffbf1] rounded-2xl shadow-frame-drop-shadow">
              <CardContent className="p-6">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="flex flex-col gap-6">
                    {rdvAVenir.length === 0 && (
                      <div className="text-[#75746f] text-center">Aucun rendez-vous à venir</div>
                    )}
                    {rdvAVenir.map((rdv, index) => (
                      <div key={index} className="flex flex-col gap-2 pb-6 border-b border-gray-200 last:border-0">
                        <div className="flex items-center gap-2">
                          <Badge
                            className="w-2 h-2 p-0 rounded-full"
                            style={{ backgroundColor: "#ef7d4f" }}
                          />
                          <span className="[font-family:'Quicksand',Helvetica] font-semibold text-[#ef7d4f] text-base">
                            {formatDate(rdv.date_heure)}
                          </span>
                          <span className="[font-family:'Quicksand',Helvetica] font-semibold text-[#ef7d4f] text-base">
                            {formatTime(rdv.date_heure, rdv.duree)}
                          </span>
                          <span className="ml-2 text-xs text-[#75746f]">{rdv.type}</span>
                        </div>
                        <h3 className="[font-family:'Quicksand',Helvetica] font-medium text-black text-lg">
                          {rdv.notes || "Rendez-vous"}
                        </h3>
                        <p className="[font-family:'Quicksand',Helvetica] text-[#75746f] text-sm">
                          Statut : {rdv.statut}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};