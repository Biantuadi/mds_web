import {
  BookIcon,
  CalendarIcon,
  ChevronRightIcon,
  TimerIcon,
  UserIcon,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";

// Data for upcoming appointments
const upcomingAppointments = [
  {
    date: "24 janvier",
    time: "10:00 - 11:00",
    title: "Point mensuel",
    description:
      "Revoir avec Laurène les derniers modules + compléter fiche de résultats afin d'établie les plus grands axes d'améliorations. Il faudra préparer en amont une liste de plusiuers",
    color: "#7b677a",
  },
  {
    date: "27 janvier",
    time: "14:00 - 14:30",
    title: "Exercice oral",
    description:
      "Petit entrainement sur l'aisance à s'exprimer devant un certain",
    color: "#ef7d4f",
  },
  {
    date: "02 Mars",
    time: "09:15 - 12:00",
    title: "Bilan annuel",
    description:
      "Dans le cadre de la procédure, nous allons procéder à la reco",
    color: "#1c371c",
  },
  {
    date: "02 Mars",
    time: "09:15 - 12:00",
    title: "Bilan annuel",
    description:
      "Dans le cadre de la procédure, nous allons procéder à la reco",
    color: "#1c371c",
  },
];

// Data for modules
const modules = [
  { title: "Arbre de vie", duration: "1h" },
  { title: "Les autres et moi", duration: "45m" },
  { title: "La portée réelle", duration: "2h" },
  { title: "Les autres et moi", duration: "30m" },
  { title: "En avant ça grimpe", duration: "1h45" },
  { title: "Nom du module", duration: "1h45" },
];

export const Home = (): JSX.Element => {
  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="bg-[url(/backgrounds-a.svg)] bg-[100%_100%] w-[1440px] h-[1024px]">
        <div className="flex flex-col w-full items-center relative">
          <div className="relative w-full h-[157px]">
            <div className="relative h-[157px]">
              <header className="flex flex-col w-full items-start gap-4 absolute top-0 left-0 bg-transparent">
                <div className="flex h-20 items-center justify-between px-8 py-0 relative self-stretch w-full bg-[#fffbf1] rounded-[0px_0px_16px_16px] overflow-hidden">
                  <div className="flex flex-col w-[300px] items-start gap-2.5 relative">
                    <div className="inline-flex items-center gap-10 relative flex-[0_0_auto]">
                      <div className="relative w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-bold text-black text-lg text-center tracking-[0] leading-[normal]">
                        BONJOUR PAULINE
                      </div>
                    </div>
                  </div>

                  <div className="flex w-[242px] items-center justify-end gap-[30px] relative self-stretch">
                    <div className="flex items-center justify-between px-3.5 py-0 relative flex-1 self-stretch grow">
                      <div className="flex flex-col items-center justify-center gap-2.5 relative flex-1 self-stretch grow">
                        <CalendarIcon className="w-6 h-6" />
                      </div>

                      <div className="flex flex-col items-center justify-center gap-2.5 relative flex-1 self-stretch grow">
                        <BookIcon className="w-6 h-6" />
                      </div>

                      <div className="flex items-center justify-center gap-2.5 relative flex-1 self-stretch grow">
                        <UserIcon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start pl-8 pr-0 py-0 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-bold text-[#1c371c] text-sm tracking-[0] leading-[normal]">
                    {""}
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

          <div className="flex flex-col h-[843px] items-start justify-center gap-8 p-4 relative self-stretch w-full">
            <div className="flex items-start gap-8 relative flex-1 self-stretch w-full grow">
              {/* Upcoming Appointments Section */}
              <div className="flex flex-col w-[477px] items-start gap-2 relative self-stretch">
                <div className="flex items-center relative self-stretch w-full flex-[0_0_auto]">
                  <img
                    className="absolute w-[363px] h-[406px] top-[-73px] left-[-205px]"
                    alt="Vector"
                    src="/home_imgs/vector-2.svg"
                  />

                  <div className="relative w-[159px] mt-[-1.00px] [font-family:'Reef-Bold',Helvetica] font-bold text-[#fffbf1] text-2xl tracking-[0] leading-[normal]">
                    PROCHAINS RDV
                  </div>
                </div>

                <Card className="flex flex-col items-end p-2 relative flex-1 self-stretch w-full grow bg-[#fffbf1] rounded-2xl shadow-frame-drop-shadow">
                  <div className="inline-flex flex-col items-end relative flex-[0_0_auto]">
                    <ChevronRightIcon className="w-6 h-6" />
                  </div>

                  <CardContent className="p-0 w-full">
                    <ScrollArea className="h-full w-full">
                      <div className="gap-[18px] w-full flex-[0_0_auto] flex flex-col items-start relative self-stretch">
                        {upcomingAppointments.map((appointment, index) => (
                          <div
                            key={index}
                            className="w-full flex-[0_0_auto] flex flex-col items-start relative self-stretch"
                          >
                            <div className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto] rounded-[32px]">
                              <Badge
                                className="w-2 h-2 p-0 rounded-full"
                                style={{ backgroundColor: appointment.color }}
                              />
                              <div
                                className="relative w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-semibold text-[15px] text-center tracking-[0] leading-[normal]"
                                style={{ color: appointment.color }}
                              >
                                {appointment.date}
                              </div>
                              <div
                                className="relative w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-semibold text-[15px] text-center tracking-[0] leading-[normal]"
                                style={{ color: appointment.color }}
                              >
                                {appointment.time}
                              </div>
                            </div>
                            <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-medium text-black text-[15px] text-center tracking-[0] leading-[normal]">
                              {appointment.title}
                            </div>
                            <div className="relative self-stretch [font-family:'Quicksand',Helvetica] font-normal text-[#75746f] text-xs text-justify tracking-[0] leading-4 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                              {appointment.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Progression Section */}
              <div className="flex flex-col items-start gap-2 relative flex-1 self-stretch grow">
                <div className="inline-flex items-center relative flex-[0_0_auto]">
                  <img
                    className="absolute w-[213px] h-[231px] top-[-33px] left-[-47px]"
                    alt="Vector"
                    src="/home_imgs/vector.svg"
                  />

                  <div className="relative w-fit mt-[-1.00px] [font-family:'Reef-Bold',Helvetica] font-bold text-[#fffbf1] text-2xl tracking-[0] leading-[normal]">
                    PROGRESSION
                  </div>
                </div>

                <div className="items-start justify-between flex relative flex-1 self-stretch w-full grow">
                  <Card className="flex flex-col w-[332px] items-center justify-center gap-[15px] p-1 relative self-stretch bg-[#fffbf1] rounded-2xl shadow-frame-drop-shadow">
                    <CardContent className="p-0">
                      <div className="relative w-[166px] h-[166px] bg-[url(/2.svg)] bg-[100%_100%]">
                        <div className="relative w-[168px] h-[166px]">
                          <img
                            className="absolute w-[150px] h-[83px] top-[83px] left-4"
                            alt="Element"
                            src="/home_imgs/01.svg"
                          />

                          <div className="absolute w-[168px] h-[166px] top-0 left-0">
                            <div className="absolute w-[166px] h-[166px] top-0 left-0 [font-family:'Quicksand',Helvetica] font-semibold text-[#ef7d4f] text-4xl text-center tracking-[0] leading-[normal]">
                              2/6
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-semibold text-[#ef7d4f] text-[32px] text-center tracking-[0] leading-[normal]">
                        Modules terminés
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex flex-col w-[348.5px] items-center relative self-stretch ml-[-65px] rotate-90">
                    <ChevronRightIcon className="w-[72px] h-[72px] -rotate-90" />

                    <div className="relative self-stretch h-[66px] [font-family:'Quicksand',Helvetica] font-bold text-[#1c371c] text-[32px] text-center tracking-[0] leading-[normal]">
                      Module en cours
                    </div>
                  </div>

                  <Card className="inline-flex flex-col items-center relative self-stretch flex-[0_0_auto] ml-[-65px] bg-[#fffbf1] rounded-2xl overflow-hidden shadow-frame-drop-shadow">
                    <CardContent className="flex flex-col w-[348.5px] items-center gap-1.5 pt-0 pb-1 px-0 relative flex-1 grow">
                      <img
                        className="relative flex-1 self-stretch w-full grow object-cover"
                        alt="Vector"
                        src="/home_imgs/vector-7-1.png"
                      />

                      <div className="flex flex-col items-center justify-center gap-4 relative flex-1 self-stretch w-full grow rounded-[32px]">
                        <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-semibold text-[#ef7d4f] text-[32px] text-center tracking-[0] leading-[normal]">
                          Arbre de vie
                        </div>

                        <div className="flex h-7 items-center justify-center gap-4 px-8 py-0 relative self-stretch w-full">
                          <div className="flex w-[99px] items-center justify-center gap-2 relative mt-[-1.50px] mb-[-1.50px]">
                            <TimerIcon className="w-[31px] h-[31px]" />

                            <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-normal text-black text-2xl text-center tracking-[0] leading-5 whitespace-nowrap">
                              1h
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Last Consulted Modules Section */}
            <div className="flex items-start gap-8 relative flex-1 self-stretch w-full grow">
              <div className="gap-2 flex-1 grow flex flex-col items-start relative self-stretch">
                <div className="flex items-center relative self-stretch w-full flex-[0_0_auto]">
                  <img
                    className="absolute w-[425px] h-[374px] top-[-89px] left-[-126px]"
                    alt="Vector"
                    src="/home_imgs/vector-1.svg"
                  />

                  <div className="relative flex-1 mt-[-1.00px] [font-family:'Reef-Bold',Helvetica] font-bold text-[#fffbf1] text-2xl tracking-[0] leading-[normal]">
                    DERNIERS MODULES CONSULTÉS
                  </div>
                </div>

                <Card className="flex flex-col items-end gap-1 p-2 relative flex-1 self-stretch w-full grow bg-[#fffbf1] rounded-2xl overflow-hidden shadow-frame-drop-shadow">
                  <div className="flex items-center justify-end gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-normal text-[#4b4a47] text-base text-right tracking-[0.20px] leading-7 whitespace-nowrap">
                      Voir tout les modules
                    </div>
                    <ChevronRightIcon className="w-7 h-7" />
                  </div>

                  <CardContent className="p-0 w-full">
                    <ScrollArea className="w-full h-full">
                      <div className="flex items-center gap-4 px-0 py-2 relative flex-1 self-stretch w-full grow">
                        {modules.map((module, index) => (
                          <Card
                            key={index}
                            className="inline-flex flex-col items-start justify-center relative self-stretch flex-[0_0_auto] bg-[#fffbf1] rounded-2xl overflow-hidden shadow-frame-drop-shadow"
                          >
                            <CardContent className="flex flex-col w-[284.5px] items-center gap-1.5 pt-0 pb-1 px-0 relative flex-1 grow">
                              <img
                                className="relative flex-1 self-stretch w-full grow object-cover"
                                alt="Vector"
                                src="/home_imgs/vector-7-2.png"
                              />

                              <div className="flex flex-col items-center justify-center gap-4 relative flex-1 self-stretch w-full grow rounded-[32px]">
                                <div className="relative self-stretch [font-family:'Quicksand',Helvetica] font-semibold text-[#ef7d4f] text-[28px] text-center tracking-[0] leading-[normal]">
                                  {module.title}
                                </div>

                                <div className="flex h-7 items-center justify-center gap-4 px-8 py-0 relative self-stretch w-full">
                                  <div className="flex w-[99px] items-center justify-center gap-2 relative mt-[-1.50px] mb-[-1.50px]">
                                    <TimerIcon className="w-[31px] h-[31px]" />

                                    <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-normal text-black text-2xl text-center tracking-[0] leading-5 whitespace-nowrap">
                                      {module.duration}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <footer className="flex flex-col w-full h-[23px] items-start gap-2.5 relative bg-transparent">
            <div className="items-center gap-[214px] px-9 py-0 bg-[#fffbf1] flex relative flex-1 self-stretch w-full grow">
              <div className="flex flex-col w-[300px] items-start gap-2.5 relative">
                <div className="inline-flex items-center gap-10 relative flex-[0_0_auto]">
                  <div className="w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-normal text-[13px] tracking-[0] relative text-black text-center leading-[normal]">
                    Les Audacieuses Académie Ⓒ
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
