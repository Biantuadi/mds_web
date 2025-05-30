import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dataService } from "../../services/dataService";
import Header from "../../components/Header";

interface ModuleDetail {
  id: number;
  titre: string;
  description: string;
  miniature: string;
  est_publie: number;
  est_gratuit: number;
  duree_estimee: number;
  createur: {
    prenom: string;
    nom: string;
  };
  contenu: Array<{
    id: number;
    module_id: number;
    bloc_id: number;
    contenu: string;
    url_ressource: string | null;
    ordre: number;
    metadata: any | null;
    type: 'titre' | 'texte' | 'liste' | 'image' | 'citation';
  }>;
}

export const ModuleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [module, setModule] = useState<ModuleDetail | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isValidated, setIsValidated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dataService.getCurrentUser().then(setUser);
  }, []);

  useEffect(() => {
    if (user && id) {
      const moduleId = parseInt(id, 10);
      
      if (isNaN(moduleId)) {
        setError("ID de module invalide");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      Promise.all([
        dataService.getModuleDetail(moduleId),
        dataService.getModulePatient(user.id)
      ]).then(([moduleDetail, patientModules]) => {
        console.log('Détails du module reçus:', moduleDetail);
        console.log('Modules du patient reçus:', patientModules);
        
        setModule(moduleDetail);
        const patientModule = patientModules.find((m: any) => m.module_id === moduleId);
        setIsValidated(patientModule?.progression >= 100 || false);
      }).catch(err => {
        console.error('Erreur lors du chargement du module:', err);
        setError(err.message);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [user, id]);

  const handleValidate = async () => {
    if (user && module) {
      try {
        await dataService.validateModule(module.id, user.id);
        setIsValidated(true);
      } catch (err) {
        console.error('Erreur lors de la validation du module:', err);
      }
    }
  };

  const renderContent = (contenu: ModuleDetail['contenu']) => {
    return contenu
      .sort((a, b) => a.ordre - b.ordre)
      .map((bloc) => {
        switch (bloc.type) {
          case 'titre':
            return (
              <h2 key={bloc.id} className="text-2xl font-bold text-[#ef7d4f] mb-4">
                {bloc.contenu}
              </h2>
            );
          case 'texte':
            return (
              <p key={bloc.id} className="mb-4 text-justify">
                {bloc.contenu}
              </p>
            );
          case 'liste':
            return (
              <ul key={bloc.id} className="mb-4 list-disc pl-6 text-[#75746f]">
                {bloc.contenu.split('\n').map((item, i) => (
                  <li key={i}>{item.replace(/^- /, "")}</li>
                ))}
              </ul>
            );
          case 'image':
            return (
              <div key={bloc.id} className="mb-4">
                <img
                  src={bloc.url_ressource || bloc.contenu}
                  alt={bloc.metadata?.caption || ""}
                  className="w-full rounded-lg"
                />
                {bloc.metadata?.caption && (
                  <p className="text-sm text-[#75746f] mt-2 text-center">
                    {bloc.metadata.caption}
                  </p>
                )}
              </div>
            );
          case 'citation':
            return (
              <div key={bloc.id} className="bg-[#eaeaea] rounded-xl px-4 py-2 text-[#75746f] mb-4 italic">
                {bloc.contenu}
              </div>
            );
          default:
            return null;
        }
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffbf1]">
        <div className="text-[#ef7d4f] text-xl">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffbf1]">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffbf1]">
        <div className="text-[#ef7d4f] text-xl">Module non trouvé</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf1]">
      {/* HEADER */}
      <Header user={user}/>

      {/* Fil d'ariane */}
      <div className="flex items-center gap-2 px-8 mt-4 text-sm text-[#75746f]">
        <button onClick={() => navigate(-1)} className="text-2xl text-[#ef7d4f] font-bold">&#60;</button>
        <span>
          Accueil &gt; Modules &gt; {module.titre}
        </span>
      </div>

      {/* Image du module */}
      <div className="w-full max-w-4xl mx-auto mt-4 rounded-t-3xl overflow-hidden shadow-md">
        <img
          src={module.miniature || "/images/default-module.png"}
          alt={module.titre}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Titre et sous-titre */}
      <div className="text-center mt-6">
        <h1 className="text-3xl font-bold">{module.titre}</h1>
        <p className="italic text-lg mt-2">{module.description}</p>
        <p className="text-sm text-[#75746f] mt-2">
          Créé par {module.createur.prenom} {module.createur.nom}
        </p>
      </div>

      {/* Contenu dynamique */}
      <div className="max-w-4xl mx-auto mt-6 px-4">
        {renderContent(module.contenu)}
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