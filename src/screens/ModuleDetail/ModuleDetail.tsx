import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CalendarIcon, BookIcon, UserIcon } from "lucide-react";
import { dataService } from "../../services/dataService";

export const ModuleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [module, setModule] = useState<any>(null);
  const [contenuBlocs, setContenuBlocs] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    dataService.getCurrentUser().then(setUser);
  }, []);

  useEffect(() => {
    if (id) {
      dataService.getModuleById(Number(id)).then(setModule);
      dataService.getContenuBlocs(Number(id)).then(setContenuBlocs);
    }
  }, [id]);

  // Vérifie si le module est déjà validé
  useEffect(() => {
    if (user && id) {
      dataService.getModulePatient(user.id).then((list) => {
        const mp:any = list.find((mp: any) => mp.module_id === Number(id));
        setIsValidated(mp?.progression >= 100);
      });
    }
  }, [user, id]);

  const handleValidate = async () => {
    if (user && module) {
      await dataService.validateModule(module.id, user.id);
      setIsValidated(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf1]">
       {/* HEADER */}
       <header className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-8 py-4 bg-[#fffbf1] rounded-b-2xl shadow-md gap-2 md:gap-0">
        <div className="font-bold text-base md:text-lg text-black font-[Quicksand]">
          {user ? `BONJOUR ${user.prenom.toUpperCase()}` : "BONJOUR"}
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xl md:text-2xl font-bold tracking-widest font-[Reef-Bold] text-black">LES AUDACIEUSES ACADEMIE</div>
          <img src="/home_imgs/logo-arc.svg" alt="Logo arc" className="h-10 md:h-12 mt-2" />
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <CalendarIcon className="w-6 h-6 cursor-pointer" onClick={() => navigate('/appointments')} />
          <BookIcon className="w-6 h-6 cursor-pointer" onClick={() => navigate('/modules')} />
          <UserIcon className="w-6 h-6 cursor-pointer" />
        </div>
      </header>

      {/* Fil d'ariane */}
      <div className="flex items-center gap-2 px-8 mt-4 text-sm text-[#75746f]">
        <button onClick={() => navigate(-1)} className="text-2xl text-[#ef7d4f] font-bold">&#60;</button>
        <span>
          Accueil &gt; Modules &gt; {module ? module.titre : ""}
        </span>
      </div>

      {/* Image du module */}
      <div className="w-full max-w-4xl mx-auto mt-4 rounded-t-3xl overflow-hidden shadow-md">
        <img
          src={module?.miniature || "/images/default-module.png"}
          alt={module?.titre}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Titre et sous-titre */}
      <div className="text-center mt-6">
        <h1 className="text-3xl font-bold">{module?.titre}</h1>
        <p className="italic text-lg mt-2">{module?.description}</p>
      </div>

      {/* Contenu dynamique */}
      <div className="max-w-4xl mx-auto mt-6 px-4">
        {contenuBlocs
          .sort((a, b) => a.ordre - b.ordre)
          .map((bloc, idx) => {
            if (bloc.bloc_id === 1) { // titre
              return (
                <h2 key={idx} className="text-2xl font-bold text-[#ef7d4f] mb-4">{bloc.contenu}</h2>
              );
            }
            if (bloc.bloc_id === 2) { // texte
              return (
                <p key={idx} className="mb-4 text-justify">{bloc.contenu}</p>
              );
            }
            if (bloc.bloc_id === 4) { // liste
              return (
                <ul key={idx} className="mb-4 list-disc pl-6 text-[#75746f]">
                  {bloc.contenu.split('\n').map((item: string, i: number) =>
                    <li key={i}>{item.replace(/^- /, "")}</li>
                  )}
                </ul>
              );
            }
            if (bloc.bloc_id === 5) { // citation
              return (
                <div key={idx} className="bg-[#eaeaea] rounded-xl px-4 py-2 text-[#75746f] mb-4 italic">
                  {bloc.contenu}
                </div>
              );
            }
            // Ajoute d'autres types si besoin (image, etc.)
            return null;
          })}
      </div>

      {/* Bouton */}
      <div className="flex justify-end max-w-4xl mx-auto mt-8 px-4">
        <button
          className={`bg-[#ef7d4f] text-white rounded-xl px-8 py-3 font-semibold shadow-md transition ${
            isValidated ? "opacity-60 cursor-not-allowed" : "hover:bg-[#d96a3b]"
          }`}
          onClick={handleValidate}
          disabled={isValidated}
        >
          {isValidated ? "Module validé !" : "Valider le module"}
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#fffbf1] py-2 text-center text-black text-sm font-[Quicksand] mt-8">
        Les Audacieuses Académie Ⓒ
      </footer>
    </div>
  );
}; 