import { CalendarIcon, BookIcon, UserIcon, HomeIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header({ user }: any) {
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction utilitaire pour savoir si l'onglet est actif
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-8 py-4 bg-[#fffbf1] rounded-b-2xl shadow-md gap-2 md:gap-0  h-[100px] z-30">
      <div className="font-bold text-base md:text-lg text-black font-[Quicksand]">
        {user
          ? `BONJOUR ${user.prenom.toUpperCase()} ${user.nom.toUpperCase()}`
          : "BONJOUR"}
      </div>
      <div className="flex flex-col w-[318px] h-[154px] items-center justify-center gap-3.5 absolute top-[13px] left-[561px]">
        <div className="self-stretch h-[13px] [font-family:'Reef-Bold',Helvetica] font-bold text-2xl tracking-[2.40px] whitespace-nowrap relative text-black text-center leading-[normal] mb-3">
          LES AUDACIEUSES ACADEMIE
        </div>
        <div className="flex flex-col w-[102px] h-24 items-center gap-3.5 relative rounded-[50px] overflow-hidden">
          <img
            className="absolute w-[102px] h-[63px] top-0 left-0"
            alt="Ellipse"
            src="/home_imgs/ellipse-8.svg"
          />
          <img
            className="relative w-24 h-[60px]"
            alt="Logo arc"
            src="/home_imgs/logo-arc.svg"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <HomeIcon
          className={`w-6 h-6 cursor-pointer ${
            isActive("/home") ? "text-[#ef7d4f]" : "text-gray-500"
          }`}
          onClick={() => navigate("/home")}
        />

        <CalendarIcon
          className={`w-6 h-6 cursor-pointer ${
            isActive("/appointments") ? "text-[#ef7d4f]" : "text-gray-500"
          }`}
          onClick={() => navigate("/appointments")}
        />
        <BookIcon
          className={`w-6 h-6 cursor-pointer ${
            isActive("/modules") ? "text-[#ef7d4f]" : "text-gray-500"
          }`}
          onClick={() => navigate("/modules")}
        />
        <UserIcon
          className={`w-6 h-6 cursor-pointer ${
            isActive("/profile") ? "text-[#ef7d4f]" : "text-gray-500"
          }`}
          onClick={() => navigate("/profile")}
        />
      </div>
    </header>
  );
}
