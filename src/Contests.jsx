import { useState } from "react";
import Main from "./components/Main.jsx";
import GoBackHeader from "./components/GoBackHeader.jsx";
import ContestCard from "./components/ContestsCards.jsx";

function Contests() {
  return (
    <Main>
      <div className="h-full w-full bg-white relative">
        <GoBackHeader lastScreen="contests" />
        <div className="overflow-scroll h-[90vh]">
          <div className="flex flex-col gap-2 p-4">
            <h2 className="font-medium text-lg">premium contests</h2>
            <div className="space-y-2">
              <ContestCard contestType={"premium"} prizePool={10000} />
            </div>

            <h2 className="font-medium text-lg mt-6">mega contests</h2>
            <div className="space-y-2">
              <ContestCard contestType={"mega"} prizePool={10000} />
              <ContestCard contestType={"mega"} prizePool={10000} />
            </div>

            <h2 className="font-medium text-lg mt-6">head-to-head contests</h2>
            <div className="space-y-2">
              <ContestCard contestType={"head_to_head"} prizePool={10000} />
              <ContestCard contestType={"head_to_head"} prizePool={10000} />
              <ContestCard contestType={"head_to_head"} prizePool={10000} />
            </div>

            <h2 className="font-medium text-lg mt-6">practice contests</h2>
            <div className="space-y-2">
              <ContestCard contestType={"practice"} prizePool={10000} />
              <ContestCard contestType={"practice"} prizePool={10000} />
              <ContestCard contestType={"practice"} prizePool={10000} />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Contests;
