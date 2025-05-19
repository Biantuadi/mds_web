import {
  BookIcon,
  CalendarIcon,
  ChevronRightIcon,
  TimerIcon,
  UserIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { dataService } from "../../services/dataService";

// Data for upcoming appointments
const upcomingAppointments = [
  {
    date: "24 janvier",
    time: "10:00 - 11:00",
    title: "Point mensuel",
    description:
      "Revoir avec Laurène les derniers modules + compléter fiche de résultats afin d'établie les plus grands axes d'améliorations. Il faudra préparer en amont une liste de plusiuers",
    color: "#7b677a",
  },
  {
    date: "27 janvier",
    time: "14:00 - 14:30",
    title: "Exercice oral",
    description:
      "Petit entrainement sur l'aisance à s'exprimer devant un certain",
    color: "#ef7d4f",
  },
  {
    date: "02 Mars",
    time: "09:15 - 12:00",
    title: "Bilan annuel",
    description:
      "Dans le cadre de la procédure, nous allons procéder à la reco",
    color: "#1c371c",
  },
  {
    date: "02 Mars",
    time: "09:15 - 12:00",
    title: "Bilan annuel",
    description:
      "Dans le cadre de la procédure, nous allons procéder à la reco",
    color: "#1c371c",
  },
];

export const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [modulePatient, setModulePatient] = useState<any[]>([]);
  const [rendezVous, setRendezVous] = useState<any[]>([]);

  useEffect(() => {
    dataService.getCurrentUser().then(setUser);
  }, []);

  useEffect(() => {
    if (user) {
      dataService.getModulePatient(user.id).then(setModulePatient);
      dataService.getRendezVous(user.id).then(setRendezVous);
      dataService.getModules().then(setModules);
    }
  }, [user]);

  // Progression
  const modulesTermines = modulePatient.filter(mp => mp.progression >= 100).length;
  const totalModules = modulePatient.length;
  const moduleEnCours = modulePatient
    .filter(mp => mp.progression < 100)
    .sort((a, b) => a.progression - b.progression)[0];

  // Modules récents
  const modulesRecents = [...modulePatient]
    .sort((a, b) => new Date(b.derniere_activite).getTime() - new Date(a.derniere_activite).getTime())
    .slice(0, 5)
    .map(mp => modules.find(m => m.id === mp.module_id))
    .filter(Boolean);

  // Rendez-vous à venir
  const rdvAVenir = [...rendezVous]
  .filter(rdv => new Date(rdv.date_heure) > new Date())
  .sort((a, b) => new Date(a.date_heure).getTime() - new Date(b.date_heure).getTime())
  .slice(0, 3); 

  console.log(rdvAVenir);

  // Helper pour formatage date/heure
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
  const formatTime = (iso: string, duree: number) => {
    const start = new Date(iso);
    const end = new Date(start.getTime() + duree * 60000);
    return `${start.getHours().toString().padStart(2, "0")}:${start.getMinutes().toString().padStart(2, "0")} - ${end.getHours().toString().padStart(2, "0")}:${end.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen min-w-full bg-[#fffbf1] flex flex-col">
      {/* HEADER */}
      <header className="flex items-center justify-between w-full px-8 py-4 bg-[#fffbf1] rounded-b-2xl shadow-md">
        <div className="font-bold text-lg text-black font-[Quicksand]">
          {user ? `BONJOUR ${user.prenom.toUpperCase()}` : "BONJOUR"}
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold tracking-widest font-[Reef-Bold] text-black">LES AUDACIEUSES ACADEMIE</div>
          <img src="/home_imgs/logo-arc.svg" alt="Logo arc" className="h-12 mt-2" />
        </div>
        <div className="flex items-center gap-6">
          <CalendarIcon className="w-6 h-6 cursor-pointer" onClick={() => navigate('/appointments')} />
          <BookIcon className="w-6 h-6 cursor-pointer" onClick={() => navigate('/modules')} />
          <UserIcon className="w-6 h-6 cursor-pointer" />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col justify-center items-center w-full bg-[url(/backgrounds-a.svg)] bg-[100%_100%] bg-no-repeat bg-cover bg-center pb-4">
        <div className="flex flex-row gap-8 w-full max-w-[1400px] mx-auto mt-8 flex-1">
          {/* PROCHAINS RDV */}
          <div className="flex flex-col w-[350px] h-full">
            <div className="bg-[#ef7d4f] rounded-br-2xl rounded-tl-2xl px-6 py-2 text-white font-bold text-xl font-[Reef-Bold] shadow-md">PROCHAINS RDV</div>
            <div className="bg-[#fffbf1] rounded-2xl shadow-md p-4 flex-1 mt-2 flex flex-col relative cursor-pointer" onClick={() => navigate('/appointments')}>
              <button className="absolute top-4 right-4 text-[#ef7d4f] hover:text-[#1c371c]" onClick={e => {e.stopPropagation();navigate('/appointments')}}>
                <ChevronRightIcon className="w-6 h-6" />
              </button>
              <div className="flex flex-col gap-4 mt-2 overflow-y-auto max-h-[350px] pr-2">
                {rdvAVenir.length === 0 && (
                  <div className="text-[#75746f] text-center">Aucun rendez-vous à venir</div>
                )}
                {rdvAVenir.map((rdv, idx) => (
                  <div key={idx} className="flex flex-col gap-1 border-b last:border-b-0 pb-2 last:pb-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{background: "#ef7d4f"}}></span>
                      <span className="font-semibold text-[15px]" style={{color: "#ef7d4f"}}>{formatDate(rdv.date_heure)}</span>
                      <span className="font-semibold text-[15px]" style={{color: "#ef7d4f"}}>{formatTime(rdv.date_heure, rdv.duree)}</span>
                    </div>
                    <div className="font-medium text-black text-[15px]">{rdv.notes || "Rendez-vous"}</div>
                    <div className="text-xs text-[#75746f] truncate max-w-[90%]">{rdv.statut}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PROGRESSION + MODULE EN COURS */}
          <div className="flex flex-1 gap-8 items-stretch">
            <div className="flex flex-col items-center justify-center flex-1 min-w-[320px]">
              <div className="bg-[#ef7d4f] rounded-br-2xl rounded-tl-2xl px-6 py-2 text-white font-bold text-xl font-[Reef-Bold] shadow-md mb-2">PROGRESSION</div>
              <div className="bg-[#fffbf1] rounded-2xl shadow-md flex flex-col items-center justify-center p-6 w-full">
                <div className="relative flex items-center justify-center mb-2">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" stroke="#eee" strokeWidth="12" fill="none" />
                    <circle cx="60" cy="60" r="54" stroke="#ef7d4f" strokeWidth="12" fill="none"
                      strokeDasharray="339.292"
                      strokeDashoffset={totalModules ? 339.292 - (modulesTermines / totalModules) * 339.292 : 339.292}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-3xl font-bold text-[#ef7d4f]">{modulesTermines}/{totalModules}</span>
                </div>
                <div className="text-[#ef7d4f] text-2xl font-semibold font-[Quicksand]">Modules terminés</div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 min-w-[320px]">
              <div className="flex flex-row items-center gap-2 mb-2">
                <ChevronRightIcon className="w-8 h-8 text-[#1c371c]" />
                <div className="bg-[#ef7d4f] rounded-br-2xl rounded-tl-2xl px-6 py-2 text-white font-bold text-xl font-[Reef-Bold] shadow-md">Module en cours</div>
              </div>
              <div className="bg-[#fffbf1] rounded-2xl shadow-md flex flex-col items-center p-4 w-full">
                {moduleEnCours ? (
                  <>
                    <img src={modules.find(m => m.id === moduleEnCours.module_id)?.miniature || "/images/default-module.png"} alt={modules.find(m => m.id === moduleEnCours.module_id)?.titre} className="rounded-t-2xl w-full h-40 object-cover mb-2" />
                    <div className="text-[#ef7d4f] text-2xl font-semibold font-[Quicksand] mb-1">
                      {modules.find(m => m.id === moduleEnCours.module_id)?.titre}
                    </div>
                    <div className="flex items-center gap-2 text-black text-lg">
                      <TimerIcon className="w-6 h-6" />
                      {modules.find(m => m.id === moduleEnCours.module_id)?.duree_estimee
                        ? `${modules.find(m => m.id === moduleEnCours.module_id)?.duree_estimee} min`
                        : ""}
                    </div>
                  </>
                ) : (
                  <div className="text-[#75746f]">Aucun module en cours</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* DERNIERS MODULES CONSULTÉS */}
        <div className="w-full max-w-[1400px] mx-auto mt-8 flex-shrink-0">
          <div className="bg-[#ef7d4f] rounded-br-2xl rounded-tl-2xl px-6 py-2 text-white font-bold text-xl font-[Reef-Bold] shadow-md inline-block mb-2">DERNIERS MODULES CONSULTÉS</div>
          <div className="bg-[#fffbf1] rounded-2xl shadow-md p-4">
            <div className="flex items-center justify-end gap-2 mb-2">
              <span className="text-[#4b4a47] text-base cursor-pointer" onClick={() => navigate('/modules')}>Voir tout les modules</span>
              <ChevronRightIcon className="w-6 h-6 text-[#ef7d4f]" />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {modulesRecents.map((module, idx) => (
                <div
                  key={idx}
                  className="min-w-[220px] max-w-[240px] bg-[#fffbf1] rounded-2xl shadow-md flex flex-col items-center cursor-pointer"
                  onClick={() => navigate(`/module/${module.id}`)}
                >
                  <img src={module.miniature || "/images/default-module.png"} alt={module.titre} className="rounded-t-2xl w-full h-28 object-cover" />
                  <div className="text-[#ef7d4f] text-xl font-semibold font-[Quicksand] mt-2 mb-1 text-center px-2">{module.titre}</div>
                  <div className="flex items-center gap-2 text-black text-base mb-2">
                    <TimerIcon className="w-5 h-5" />
                    {module.duree_estimee ? `${module.duree_estimee} min` : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#fffbf1] py-2 text-center text-black text-sm font-[Quicksand]">Les Audacieuses Académie Ⓒ</footer>
    </div>
  );
};