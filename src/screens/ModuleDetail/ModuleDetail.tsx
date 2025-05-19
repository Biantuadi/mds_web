import { useNavigate } from "react-router-dom";
import { CalendarIcon, BookIcon, UserIcon } from "lucide-react";

export const ModuleDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf1]">
      {/* Header */}
      <header className="flex items-center justify-between w-full px-8 py-4 bg-[#fffbf1] rounded-b-2xl shadow-md">
        <div className="font-bold text-lg text-black font-[Quicksand]">BONJOUR PAULINE</div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold tracking-widest font-[Reef-Bold] text-black">LES AUDACIEUSES ACADEMIE</div>
          <img src="/home_imgs/logo-arc.svg" alt="Logo arc" className="h-12 mt-2" />
        </div>
        <div className="flex items-center gap-6">
          <CalendarIcon className="w-6 h-6 cursor-pointer" onClick={() => navigate('/appointments')} />
          <BookIcon className="w-6 h-6 cursor-pointer" />
          <UserIcon className="w-6 h-6 cursor-pointer" />
        </div>
      </header>

      {/* Fil d'ariane */}
      <div className="flex items-center gap-2 px-8 mt-4 text-sm text-[#75746f]">
        <button onClick={() => navigate(-1)} className="text-2xl text-[#ef7d4f] font-bold">&#60;</button>
        <span>Accueil &gt; Modules &gt; Arbre de Vie #345</span>
      </div>

      {/* Image du module */}
      <div className="w-full max-w-4xl mx-auto mt-4 rounded-t-3xl overflow-hidden shadow-md">
        <img src="/img/arbre.jpg" alt="Arbre de Vie" className="w-full h-64 object-cover" />
      </div>

      {/* Titre et sous-titre */}
      <div className="text-center mt-6">
        <h1 className="text-3xl font-bold">Arbre de Vie</h1>
        <p className="italic text-lg mt-2">"Module se focalisant sur les racines de ses ancêtres"</p>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto mt-6 px-4">
        <p className="mb-4 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. <span className="text-[#ef7d4f] font-semibold">Pellentesque sit amet</span> sapien fringilla, mattis ligula consectetur, ultrices mauris.
        </p>
        <p className="mb-4 text-justify">
          Nullam et interdum justo. Proin eleifend metus ac lacus sodales, vel egestas metus auctor. Praesent turpis purus, venenatis id maximus nec, cursus nec eros. Nullam dapibus euismod porttitor. Mauris varius ipsum ut placerat blandit. Sed venenatis orci pretium magna interdum, in feugiat ipsum interdum. Nulla imperdiet ultricies tortor. Vestibulum semper ex orci, in viverra lacus iaculis et. Aenean a rhoncus leo, vitae hendrerit dolor. Morbi non scelerisque dolor, sed scelerisque nulla. Aenean mollis viverra arcu, in maximus leo lacinia in. Proin malesuada at dui vel lobortis. Donec non nunc velit. In ac tempus ipsum, vel ullamcorper est. Vestibulum gravida elementum velit, ac pretium justo viverra at. Sed purus enim, imperdiet nec justo vitae, accumsan congue mauris.
        </p>
        <p className="mb-4 text-justify">
          Maecenas vitae mattis tellus. Nullam <span className="font-bold">quis imperdiet augue</span>. Vestibulum auctor ornare leo, non suscipit magna interdum eu.
        </p>
        <ul className="mb-4 list-none">
          <li className="flex items-center gap-2"><span className="text-[#75746f]">&#9632;</span> Sapien fringilla</li>
          <li className="flex items-center gap-2"><span className="text-[#75746f]">&#9632;</span> Pellentesque sit amet sapien</li>
          <li className="flex items-center gap-2"><span className="text-[#75746f]">&#9632;</span> Aliquam</li>
          <li className="flex items-center gap-2"><span className="text-[#75746f]">&#9632;</span> Non suscipit magna interdum eu</li>
          <li className="flex items-center gap-2"><span className="text-[#75746f]">&#9632;</span> Maximus ante fermentum</li>
        </ul>
        <ul className="mb-4 list-disc pl-6 text-[#75746f]">
          <li>Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales.</li>
        </ul>
        <div className="bg-[#eaeaea] rounded-xl px-4 py-2 text-[#75746f] mb-4">
          Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.
        </div>
      </div>

      {/* Bouton */}
      <div className="flex justify-end max-w-4xl mx-auto mt-8 px-4">
        <button className="bg-[#ef7d4f] text-white rounded-xl px-8 py-3 font-semibold shadow-md hover:bg-[#d96a3b] transition">
          Valider le module
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#fffbf1] py-2 text-center text-black text-sm font-[Quicksand] mt-8">
        Les Audacieuses Académie Ⓒ
      </footer>
    </div>
  );
}; 