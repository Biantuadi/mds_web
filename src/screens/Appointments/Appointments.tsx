import React from "react";
import { CalendarIcon, ChevronLeftIcon, TimerIcon } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ScrollArea } from "../../components/ui/scroll-area";
import { mockNextSessions } from "../../data/mockData";

export const Appointments = (): JSX.Element => {
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
                    <ChevronLeftIcon className="w-6 h-6 cursor-pointer" onClick={() => window.history.back()} />
                    <div className="[font-family:'Quicksand',Helvetica] font-bold text-black text-lg">
                      RENDEZ-VOUS
                    </div>
                  </div>

                  <div className="flex w-[242px] items-center justify-end gap-[30px] relative self-stretch">
                    <div className="flex items-center justify-between px-3.5 py-0 relative flex-1 self-stretch grow">
                      <div className="flex flex-col items-center justify-center gap-2.5 relative flex-1 self-stretch grow">
                        <CalendarIcon className="w-6 h-6" />
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
            <Card className="bg-[#fffbf1] rounded-2xl shadow-frame-drop-shadow">
              <CardContent className="p-6">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="flex flex-col gap-6">
                    {mockNextSessions.map((session, index) => (
                      <div key={index} className="flex flex-col gap-2 pb-6 border-b border-gray-200 last:border-0">
                        <div className="flex items-center gap-2">
                          <Badge
                            className="w-2 h-2 p-0 rounded-full"
                            style={{ backgroundColor: "#ef7d4f" }}
                          />
                          <span className="[font-family:'Quicksand',Helvetica] font-semibold text-[#ef7d4f] text-base">
                            {session.date}
                          </span>
                          <span className="[font-family:'Quicksand',Helvetica] font-semibold text-[#ef7d4f] text-base">
                            {`${session.startTime} - ${session.endTime}`}
                          </span>
                        </div>
                        <h3 className="[font-family:'Quicksand',Helvetica] font-medium text-black text-lg">
                          {session.title}
                        </h3>
                        <p className="[font-family:'Quicksand',Helvetica] text-[#75746f] text-sm">
                          {session.description}
                        </p>
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