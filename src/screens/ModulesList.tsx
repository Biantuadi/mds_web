import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimerIcon, Search } from "lucide-react";
import { dataService } from "../services/dataService";
import Header from "../components/Header";

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

export const ModulesList = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [search, setSearch] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    dataService.getCurrentUser().then(setUser);
  }, []);

  useEffect(() => {
    if (user) {
      dataService.getModulePatient(user.id).then(setModules);
    }
  }, [user]);

  // Filtrage recherche et modules terminés
  const filteredModules = modules
    .filter(m =>
      m.titre.toLowerCase().includes(search.toLowerCase()) &&
      (showCompleted ? m.progression >= 100 : true)
    );

  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf1]">
      {/* Header */}
      <Header user={user}/>

      <div className="flex flex-col bg-[url(/bg_modules_list.png)] bg-cover bg-center w-full h-[80vh] ">
        {/* Fil d'ariane */}
        <div className="flex items-center gap-2 px-8 mt-4 text-sm text-[#75746f]">
          <button onClick={() => navigate(-1)} className="text-2xl text-[#ef7d4f] font-bold">&#60;</button>
          <span>Accueil &gt; Modules</span>
        </div>
        
        {/* Bloc principal */}
        <div className="relative w-full max-w-5xl mx-auto mt-8 rounded-3xl bg-white shadow-md px-8 py-8 min-h-[60vh]">
          {/* Titre + Recherche + Switch */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold font-[Quicksand]">Liste des modules</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
              <div className="flex items-center bg-[#f6f6f6] rounded-full px-4 py-2 w-full md:w-72 border border-[#e0e0e0]">
                <Search className="w-5 h-5 text-[#75746f] mr-2" />
                <input
                  type="text"
                  placeholder="Votre recherche . . ."
                  className="bg-transparent outline-none flex-1 text-[#75746f]"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-[#75746f] text-sm">
                <span>Afficher les modules terminés</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={showCompleted} onChange={() => setShowCompleted(v => !v)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#ef7d4f] transition"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
                </label>
              </div>
            </div>
          </div>
        
          {/* Liste des modules */}
          <div className="divide-y divide-[#ececec]">
            {filteredModules.length === 0 && (
              <div className="text-[#75746f] text-center py-8">Aucun module trouvé</div>
            )}
            {filteredModules.map(module => (
              <div
                key={module.id}
                className="relative flex items-center py-6 cursor-pointer hover:bg-[#f9f6f2] transition group"
                onClick={() => navigate(`/module/${module.id}`)}
              >
                {/* Badge terminé */}
                {module.progression >= 100 && (
                  <span className="absolute top-2 right-4 bg-[#4A5D4A] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    Terminé
                  </span>
                )}
                <img src={module.miniature || "/images/default-module.png"} alt={module.titre} className="w-16 h-16 rounded-xl object-cover mr-6 border border-[#ececec]" />
                <div className="flex-1 text-center">
                  <div className="text-lg font-[Quicksand] font-semibold group-hover:text-[#ef7d4f]">{module.titre}</div>
                  <div className="flex items-center justify-center gap-2 text-[#75746f] mt-1">
                    <TimerIcon className="w-5 h-5" />
                    <span>{module.duree_estimee ? `${module.duree_estimee} min` : ""}</span>
                    {module.progression > 0 && (
                      <span className="ml-4 text-xs text-[#ef7d4f]">{module.progression}% complété</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#fffbf1] py-2 text-center text-black text-sm font-[Quicksand] mt-8">
        Les Audacieuses Académie Ⓒ
      </footer>
    </div>
  );
}; 