import { CalendarIcon, BookIcon, UserIcon, HomeIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header({ user }: any) {
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction utilitaire pour savoir si l'onglet est actif
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header className="w-full bg-[#fffbf1] rounded-b-2xl shadow-md z-30 relative">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 md:px-8 py-4 gap-4 lg:gap-0 min-h-[100px]">
        
        {/* Section gauche - Salutation */}
        <div className="font-bold text-base md:text-lg text-black font-[Quicksand] order-1 lg:order-1">
          {user
            ? `BONJOUR ${user.prenom.toUpperCase()} ${user.nom.toUpperCase()}`
            : "BONJOUR"}
        </div>

        {/* Section centrale - Logo et titre */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-6">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="text-black text-center font-bold text-2xl tracking-[2.40px] font-['Reef-Bold',Helvetica] whitespace-nowrap">
              LES AUDACIEUSES ACADEMIE
            </div>
            <div className="flex items-center justify-center relative">
              <div className="relative w-[102px] h-24">
                <img
                  className="absolute inset-0 w-full h-auto"
                  alt="Ellipse"
                  src="/home_imgs/ellipse-8.svg"
                />
                <img
                  className="relative w-full h-auto z-10"
                  alt="Logo arc"
                  src="/home_imgs/logo-arc.svg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section centrale mobile - Logo et titre */}
        <div className="flex lg:hidden flex-col items-center justify-center gap-1 order-3 w-full">
          <div className="text-black text-center font-bold text-lg md:text-xl tracking-[1.5px] font-['Reef-Bold',Helvetica] whitespace-nowrap">
            LES AUDACIEUSES ACADEMIE
          </div>
          <div className="flex items-center justify-center relative">
            <div className="relative w-20 h-16 md:w-24 md:h-20">
              <img
                className="absolute inset-0 w-full h-auto"
                alt="Ellipse"
                src="/home_imgs/ellipse-8.svg"
              />
              <img
                className="relative w-full h-auto z-10"
                alt="Logo arc"
                src="/home_imgs/logo-arc.svg"
              />
            </div>
          </div>
        </div>

        {/* Section droite - Navigation */}
        <div className="flex items-center gap-4 md:gap-6 order-2 lg:order-3">
          <HomeIcon
            className={`w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-colors duration-200 hover:scale-110 ${
              isActive("/home") ? "text-[#ef7d4f]" : "text-gray-500 hover:text-[#ef7d4f]"
            }`}
            onClick={() => navigate("/home")}
          />

          <CalendarIcon
            className={`w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-colors duration-200 hover:scale-110 ${
              isActive("/appointments") ? "text-[#ef7d4f]" : "text-gray-500 hover:text-[#ef7d4f]"
            }`}
            onClick={() => navigate("/appointments")}
          />
          
          <BookIcon
            className={`w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-colors duration-200 hover:scale-110 ${
              isActive("/modules") ? "text-[#ef7d4f]" : "text-gray-500 hover:text-[#ef7d4f]"
            }`}
            onClick={() => navigate("/modules")}
          />
          
          <UserIcon
            className={`w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-colors duration-200 hover:scale-110 ${
              isActive("/profile") ? "text-[#ef7d4f]" : "text-gray-500 hover:text-[#ef7d4f]"
            }`}
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>
    </header>
  );
}