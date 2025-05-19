import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, TimerIcon, BookIcon } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
import { mockModules } from "../../data/mockData";

export const ModuleDetail = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const module = mockModules.find((m) => m.id === Number(id));

  if (!module) {
    return <div>Module not found</div>;
  }

  const lessons = [
    {
      id: 1,
      title: "Introduction",
      duration: "15min",
      isCompleted: true,
    },
    {
      id: 2,
      title: "Les racines",
      duration: "30min",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Le tronc",
      duration: "45min",
      isCompleted: false,
    },
    {
      id: 4,
      title: "Les branches",
      duration: "1h",
      isCompleted: false,
    },
  ];

  return (
    <div className="bg-[#fffbf1] min-h-screen">
      {/* Header */}
      <header className="relative bg-[#fffbf1] h-[157px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)]">
        <div className="flex h-20 items-center justify-between px-8 py-0">
          <div className="flex items-center gap-4">
            <ChevronLeftIcon 
              className="w-6 h-6 cursor-pointer text-[#4A5D4A]" 
              onClick={() => navigate(-1)} 
            />
            <h1 className="font-['Quicksand'] font-bold text-[#4A5D4A] text-lg">
              {module.titre}
            </h1>
          </div>

          <div className="flex items-center gap-8">
            <BookIcon className="w-6 h-6 text-[#4A5D4A]" />
          </div>
        </div>

        {/* Logo Section */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-12">
          <div className="text-center">
            <h2 className="font-['Reef'] font-bold text-[#4A5D4A] text-2xl tracking-[2.4px] mb-2">
              LES AUDACIEUSES ACADEMIE
            </h2>
            <div className="relative w-[102px] h-[96px] mx-auto">
              <img
                className="absolute w-full h-[63px] top-0"
                alt="Ellipse"
                src="/home_imgs/ellipse-8.svg"
              />
              <img
                className="absolute w-24 h-[60px] top-4"
                alt="Logo arc"
                src="/home_imgs/logo-arc.svg"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-8 pt-16 pb-12">
        <div className="flex gap-8">
          {/* Module Card */}
          <Card className="flex-1 bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="relative h-[300px]">
              <img
                src="/home_imgs/vector-7-1.png"
                alt={module.titre}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            </div>
            <CardContent className="p-8 text-center">
              <h2 className="font-['Quicksand'] text-[32px] font-semibold text-[#ef7d4f] mb-6">
                {module.titre}
              </h2>
              <div className="flex items-center justify-center gap-4">
                <TimerIcon className="w-8 h-8 text-[#4A5D4A]" />
                <span className="font-['Quicksand'] text-2xl text-[#4A5D4A]">2h30</span>
              </div>
            </CardContent>
          </Card>

          {/* Progress Card */}
          <Card className="w-[332px] bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] p-8 flex flex-col items-center justify-center">
            <div className="relative w-[166px] h-[166px] mb-6">
              <img
                className="w-full h-full"
                alt="Progress"
                src="/home_imgs/2.svg"
              />
              <div className="absolute inset-0 flex items-center justify-center font-['Quicksand'] text-4xl font-semibold text-[#ef7d4f]">
                1/4
              </div>
            </div>
            <h3 className="font-['Quicksand'] text-[32px] font-semibold text-[#ef7d4f] text-center">
              Leçons terminées
            </h3>
          </Card>
        </div>

        {/* Lessons List */}
        <Card className="mt-8 bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]">
          <CardContent className="p-8">
            <ScrollArea className="h-[400px] pr-4">
              <div className="flex flex-col gap-4">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-6 bg-[#fffbf1] rounded-2xl cursor-pointer hover:bg-[#fff6e6] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          lesson.isCompleted ? "bg-[#ef7d4f]" : "bg-[#D9D9D9]"
                        }`}
                      />
                      <span className="font-['Quicksand'] text-lg font-medium text-[#4A5D4A]">
                        {lesson.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[#4A5D4A]">
                      <TimerIcon className="w-6 h-6" />
                      <span className="font-['Quicksand'] text-lg">{lesson.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};