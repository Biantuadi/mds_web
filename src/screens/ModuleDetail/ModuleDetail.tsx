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
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="bg-[url(/backgrounds-a.svg)] bg-[100%_100%] w-[1440px] min-h-screen">
        <div className="flex flex-col w-full items-center relative">
          {/* Header */}
          <div className="relative w-full h-[157px]">
            <div className="relative h-[157px]">
              <header className="flex flex-col w-full items-start gap-4 absolute top-0 left-0 bg-transparent">
                <div className="flex h-20 items-center justify-between px-8 py-0 relative self-stretch w-full bg-[#fffbf1] rounded-[0px_0px_16px_16px] overflow-hidden">
                  <div className="flex items-center gap-4">
                    <ChevronLeftIcon 
                      className="w-6 h-6 cursor-pointer" 
                      onClick={() => navigate(-1)} 
                    />
                    <div className="[font-family:'Quicksand',Helvetica] font-bold text-black text-lg">
                      {module.titre}
                    </div>
                  </div>

                  <div className="flex w-[242px] items-center justify-end gap-[30px] relative self-stretch">
                    <div className="flex items-center justify-between px-3.5 py-0 relative flex-1 self-stretch grow">
                      <div className="flex flex-col items-center justify-center gap-2.5 relative flex-1 self-stretch grow">
                        <BookIcon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              <div className="flex flex-col w-[318px] h-[154px] items-center justify-center gap-3.5 absolute top-[3px] left-[561px]">
                <div className="self-stretch h-[13px] [font-family:'Reef-Bold',Helvetica] font-bold text-2xl tracking-[2.40px] whitespace-nowrap relative text-black text-center leading-[normal]">
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
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col w-full max-w-[1200px] px-8 py-12 gap-8">
            {/* Module Image and Info */}
            <div className="flex gap-8">
              <Card className="flex-1 bg-[#fffbf1] rounded-2xl shadow-frame-drop-shadow overflow-hidden">
                <img
                  src="/home_imgs/vector-7-1.png"
                  alt={module.titre}
                  className="w-full h-[300px] object-cover"
                />
                <CardContent className="p-6 text-center">
                  <h2 className="text-3xl font-semibold text-[#ef7d4f] mb-4">
                    {module.titre}
                  </h2>
                  <div className="flex items-center justify-center gap-2">
                    <TimerIcon className="w-6 h-6" />
                    <span className="text-xl">2h30</span>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Card */}
              <Card className="w-[332px] bg-[#fffbf1] rounded-2xl shadow-frame-drop-shadow p-6 flex flex-col items-center justify-center">
                <div className="relative w-[166px] h-[166px] mb-4">
                  <img
                    className="w-full h-full"
                    alt="Progress"
                    src="/home_imgs/2.svg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-[#ef7d4f]">
                    1/4
                  </div>
                </div>
                <h3 className="text-3xl font-semibold text-[#ef7d4f] text-center">
                  Leçons terminées
                </h3>
              </Card>
            </div>

            {/* Lessons List */}
            <Card className="bg-[#fffbf1] rounded-2xl shadow-frame-drop-shadow">
              <CardContent className="p-6">
                <ScrollArea className="h-[400px]">
                  <div className="flex flex-col gap-4">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-4 bg-white rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              lesson.isCompleted ? "bg-[#ef7d4f]" : "bg-gray-300"
                            }`}
                          />
                          <span className="text-lg font-medium">
                            {lesson.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <TimerIcon className="w-5 h-5" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};