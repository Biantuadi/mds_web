// src/screens/Profile/Profile.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataService } from "../../services/dataService";
import { logoutUser } from "../../services/auth";
import { CalendarIcon, UserIcon } from "lucide-react";
import Header from "../../components/Header";
// import "./Profile.scss"; // Supposons que vous utiliserez un fichier SCSS pour le style

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

export const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("light"); // Placeholder
  const [fontSize, setFontSize] = useState(16); // Placeholder

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await dataService.getCurrentUser();
        if (userData) {
          setUser(userData);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données utilisateur:",
          error
        );
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffbf1]">
        <div>Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffbf1]">
        <div>Utilisateur non trouvé</div>
      </div>
    );
  }

  // Helper pour formater la date de naissance (si disponible)
  const formatBirthDate = (isoDate: string | undefined) => {
    if (!isoDate) return "Non spécifié";
    try {
      const date = new Date(isoDate);
      // Vérifier si la date est valide
      if (isNaN(date.getTime())) return "Date invalide";
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      console.error("Erreur de formatage de date:", e);
      return "Date invalide";
    }
  };

  return (
    <div className="min-h-screen min-w-full bg-[#fffbf1] flex flex-col ">
      {/* HEADER (réplique de Home.tsx pour l'instant) */}
      <Header user={user} />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center w-full bg-[url(/bg_modules_list.png)] bg-cover bg-center pb-4 overflow-hidden">
        {/* Fil d'ariane */}
        <div className="flex items-center gap-2 px-8 mt-4 text-sm text-[#75746f] w-full max-w-[1400px] mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-[#ef7d4f] font-bold"
          >
            &#60;
          </button>
          <span>Accueil &gt; Profil</span>
        </div>

        <div
          id="profile-content"
          className="flex flex-row gap-8 w-full max-w-[1400px] mx-auto mt-5 flex-1 px-2 md:px-8"
        >
          {/* Left Sidebar / Card */}
          <div className="flex flex-col w-[350px] h-full bg-[#fffbf1] rounded-2xl shadow-xl p-6">
            {/* Profile Picture and Name */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={
                  user.image_profil ||
                  user.photo ||
                  "/images/default-profile.png"
                } // Utiliser l'image de profil ou une image par défaut
                alt={`${user.prenom} ${user.nom}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#ef7d4f]"
              />
              <div className="text-2xl font-bold font-[Quicksand] text-black mt-4">
                {user.prenom} {user.nom}
              </div>
            </div>

            {/* User Info Details */}
            <div className="flex flex-col gap-3 text-black text-base font-[Quicksand] mb-6 border-b border-[#e0e0e0] pb-6">
              <div className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-[#75746f]" />
                <span>{user.competences || "Non spécifié"}</span>{" "}
                {/* Assumer que compétences est utilisé pour le genre ou un statut */}
              </div>
              {/* Assuming 'date_inscription' might be used for birth date if no specific field */}
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-[#75746f]" />
                <span>{formatBirthDate(user.date_inscription)}</span>
              </div>
              {/* Assuming emploi_actuel/vise or notes might contain address info */}
              {/* Placeholder as no explicit address field in interface */}
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#75746f]"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  {user.emploi_actuel ||
                    user.emploi_vise ||
                    "Adresse non spécifiée"}
                </span>{" "}
                {/* Utiliser un champ existant comme placeholder */}
              </div>

              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#75746f]"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#75746f]"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.95-3.95A19.79 19.79 0 0 1 2 16.18a2 2 0 0 1 2-2h3a2 2 0 0 0 2 2.18 15.92 15.92 0 0 0 1.62 7.34 2 2 0 0 0 2.18 2h3a2 2 0 0 0 2-2 19.79 19.79 0 0 0-3.07-8.63A19.5 19.5 0 0 0 10.05 4.05 19.79 19.79 0 0 0 16.18 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2z" />
                </svg>{" "}
                {/* Icone téléphone */}
                <span>{user.telephone || "Non spécifié"}</span>
              </div>
            </div>

            {/* Theme Switcher (Placeholder) */}
            <div className="flex flex-col gap-2 text-black font-[Quicksand] mb-6 border-b border-[#e0e0e0] pb-6">
              <div className="font-semibold text-lg">
                Thème de l'application
              </div>
              <div className="flex gap-4">
                <button
                  className={`px-6 py-2 rounded-full font-bold ${
                    theme === "light"
                      ? "bg-[#ef7d4f] text-white"
                      : "bg-[#e0e0e0] text-[#75746f]"
                  }`}
                  onClick={() => setTheme("light")}
                >
                  Light
                </button>
                <button
                  className={`px-6 py-2 rounded-full font-bold ${
                    theme === "dark"
                      ? "bg-[#ef7d4f] text-white"
                      : "bg-[#e0e0e0] text-[#75746f]"
                  }`}
                  onClick={() => setTheme("dark")}
                >
                  Dark
                </button>
              </div>
            </div>

            {/* Font Size Slider (Placeholder) */}
            <div className="flex flex-col gap-2 text-black font-[Quicksand] mb-6 border-b border-[#e0e0e0] pb-6">
              <div className="font-semibold text-lg">Taille des polices</div>
              <input
                type="range"
                min="12"
                max="20"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full h-2 bg-[#e0e0e0] rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: "#ef7d4f" }} // Couleur de la barre/curseur si supporté
              />
            </div>

            {/* Logout Button */}
            <button
              className="text-[#ef7d4f] font-bold text-lg font-[Quicksand] mt-auto"
              onClick={handleLogout}
            >
              Se déconnecter
            </button>
          </div>

          {/* Right Content Area (Empty as per mockup) */}
          <div className="flex-1">{/* This area remains empty */}</div>
        </div>
      </main>

      {/* FOOTER (réplique de Home.tsx) */}
      <footer className="w-full bg-[#fffbf1] py-2 text-center text-black text-xs md:text-sm font-[Quicksand]">
        Les Audacieuses Académie Ⓒ
      </footer>
    </div>
  );
};
