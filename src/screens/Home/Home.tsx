import {
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import  { useEffect, useState } from "react";
import { dataService } from "../../services/dataService";
import "./Home.scss";
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

interface Module {
  id: number;
  module_id: number;
  patient_id: number;
  date_assignation: string;
  progression: number;
  derniere_activite: string | null;
  titre: string;
  description: string;
  miniature: string;
  est_publie: number;
  est_gratuit: number;
  duree_estimee: number;
}

export const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [modulePatient, setModulePatient] = useState<Module[]>([]);
  const [rendezVous, setRendezVous] = useState<any[]>([]);

  useEffect(() => {
    console.log('🔄 Chargement des données utilisateur...');
    const loadUser = async () => {
      try {
        const userData = await dataService.getCurrentUser();
        console.log('✅ Données utilisateur reçues:', userData);
        if (userData) {
          setUser(userData);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('❌ Erreur lors du chargement des données utilisateur:', error);
        navigate('/login');
      }
    };
    
    loadUser();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      console.log('🔄 Chargement des données pour l\'utilisateur:', user.id);
      
      Promise.all([
        dataService.getModulePatient(user.id),
        dataService.getRendezVous(user.id),
        dataService.getModules()
      ]).then(([modulePatientData, rendezVousData, modulesData]) => {
        console.log('✅ Modules du patient reçus (détaillé):', JSON.stringify(modulePatientData, null, 2));
        console.log('✅ Rendez-vous reçus (détaillé):', JSON.stringify(rendezVousData, null, 2));
        console.log('✅ Modules reçus (détaillé):', JSON.stringify(modulesData, null, 2));
        
        setModulePatient(modulePatientData);
        setRendezVous(rendezVousData);
        setModules(modulesData);

        // Vérification des données après le setState
        console.log('📊 État après mise à jour:', {
          modulePatient: modulePatientData,
          modules: modulesData,
          modulesTermines: modulePatientData.filter((mp:any) => mp.progression >= 100).length,
          totalModules: modulePatientData.length,
          moduleEnCours: modulePatientData
            .filter((mp: any) => mp.progression < 100)
            .sort((a: any, b: any) => a.progression - b.progression)[0],
          modulesRecents: [...modulePatientData]
            .sort((a, b) => new Date(b.derniere_activite || 0).getTime() - new Date(a.derniere_activite || 0).getTime())
            .slice(0, 5)
        });
      }).catch(error => {
        console.error('❌ Erreur lors du chargement des données:', error);
      });
    }
  }, [user]);

  // Progression
  const modulesTermines = modulePatient.filter((mp) => mp.progression >= 100).length;
  const totalModules = modulePatient.length;
  const moduleEnCours = modulePatient
    .filter((mp) => mp.progression < 100)
    .sort((a, b) => a.progression - b.progression)[0];

  // Modules récents
  const modulesRecents = [...modulePatient]
    .sort((a, b) => new Date(b.derniere_activite || 0).getTime() - new Date(a.derniere_activite || 0).getTime())
    .slice(0, 5);

  // Rendez-vous à venir
  const rdvAVenir = [...rendezVous]
    .filter(rdv => new Date(rdv.date_heure) > new Date())
    .sort((a, b) => new Date(a.date_heure).getTime() - new Date(b.date_heure).getTime())
    .slice(0, 3);

  // Helper pour formatage date/heure
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
  const formatTime = (iso: string, duree: number) => {
    const start = new Date(iso);
    const end = new Date(start.getTime() + duree * 60000);
    return `${start.getHours().toString().padStart(2, "0")}:${start.getMinutes().toString().padStart(2, "0")} - ${end.getHours().toString().padStart(2, "0")}:${end.getMinutes().toString().padStart(2, "0")}`;
  };

  console.log('📊 État actuel:', {
    user,
    modulesTermines,
    totalModules,
    moduleEnCours,
    modulesRecents,
    rdvAVenir
  });

  return (
    <div className="min-h-screen min-w-full bg-[#fffbf1] flex flex-col">
      {/* HEADER */}
      <Header user={user}/>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center w-full bg-[url(/backgrounds-a.svg)] bg-cover bg-center pb-4">
        <div id="home-content" className="flex flex-row gap-8 w-full max-w-[1400px] mx-auto mt-8 flex-1 px-2 md:px-8">
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
                      <span className="font-semibold text-[15px]" style={{color: "#ef7d4f"}}>{formatTime(rdv.date_heure, rdv.duree_estimee)}</span>
                    </div>
                    <div className="font-medium text-black text-[15px]">{rdv.notes || "Rendez-vous"}</div>
                    <div className="text-xs text-[#75746f] truncate max-w-[90%]">{rdv.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PROGRESSION + MODULE EN COURS */}
          <div className="flex flex-col md:flex-row flex-1 gap-8 items-stretch">
            <div className="flex flex-col items-center justify-center flex-1 min-w-[220px]">
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
            <div className="flex flex-col items-center justify-center flex-1 min-w-[220px] mt-6 md:mt-0">
              <div className="flex flex-row items-center gap-2 mb-2">
                <ChevronRightIcon className="w-8 h-8 text-[#1c371c]" />
                <div className="bg-[#ef7d4f] rounded-br-2xl rounded-tl-2xl px-6 py-2 text-white font-bold text-xl font-[Reef-Bold] shadow-md">Module en cours</div>
              </div>
              <div className="bg-[#fffbf1] rounded-2xl shadow-md flex flex-col items-center p-4 w-full">
                {moduleEnCours ? (
                  <>
                    <img 
                      src={modules.find(m => m.module_id === moduleEnCours.module_id)?.miniature || "/images/default-module.png"} 
                      alt={modules.find(m => m.module_id === moduleEnCours.module_id)?.titre} 
                      className="rounded-t-2xl w-full h-40 object-cover mb-2" 
                    />
                    <div className="text-[#ef7d4f] text-2xl font-semibold font-[Quicksand] mb-1">
                      {modules.find(m => m.module_id === moduleEnCours.module_id)?.titre}
                    </div>
                    <div className="flex items-center gap-2 text-black text-lg">
                      <TimerIcon className="w-6 h-6" />
                      {modules.find(m => m.module_id === moduleEnCours.module_id)?.duree_estimee
                        ? `${modules.find(m => m.module_id === moduleEnCours.module_id)?.duree_estimee} min`
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
        <div className="w-full max-w-[1400px] mx-auto mt-8 flex-shrink-0 px-2 md:px-8">
          <div className="bg-[#ef7d4f] rounded-br-2xl rounded-tl-2xl px-4 md:px-6 py-2 text-white font-bold text-lg md:text-xl font-[Reef-Bold] shadow-md inline-block mb-2">DERNIERS MODULES CONSULTÉS</div>
          <div className="bg-[#fffbf1] rounded-2xl shadow-md p-2 md:p-4">
            <div className="flex items-center justify-end gap-2 mb-2">
              <span className="text-[#4b4a47] text-sm md:text-base cursor-pointer" onClick={() => navigate('/modules')}>Voir tout les modules</span>
              <ChevronRightIcon className="w-6 h-6 text-[#ef7d4f]" />
            </div>
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2">
              {modulesRecents.length === 0 && (
                <div className="text-[#75746f] text-center w-full py-4">Aucun module récent</div>
              )}
              {modulesRecents.map((module) => (
                <div
                  key={module.id}
                  className="relative min-w-[220px] max-w-[240px] bg-[#fffbf1] rounded-2xl shadow-md flex flex-col items-center cursor-pointer"
                  onClick={() => navigate(`/module/${module.id}`)}
                >
                  {module.progression >= 100 && (
                    <span className="absolute top-2 right-2 bg-[#4A5D4A] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      Terminé
                    </span>
                  )}
                  <img 
                    src={module.miniature || "/images/default-module.png"} 
                    alt={module.titre} 
                    className="rounded-t-2xl w-full h-28 object-cover" 
                  />
                  <div className="text-[#ef7d4f] text-xl font-semibold font-[Quicksand] mt-2 mb-1 text-center px-2">
                    {module.titre}
                  </div>
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
      <footer className="w-full bg-[#fffbf1] py-2 text-center text-black text-xs md:text-sm font-[Quicksand]">Les Audacieuses Académie Ⓒ</footer>
    </div>
  );
};