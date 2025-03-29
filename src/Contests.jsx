import { useState } from "react";
import Main from "./components/Main.jsx";
import GoBackHeader from "./components/GoBackHeader.jsx";
import ContestCard from "./components/ContestsCards.jsx";
import { useRecoilValue } from "recoil";
import { selectedMatchId } from "./allSates.js";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function Contests() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedMatch =
    useAtomValue(selectedMatchId) || searchParams.get("matchId");

  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedMatch) {
      navigate("/");
      return;
    }
    async function loadAllContests() {
      console.log(selectedMatch);
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL +
            "/ipl/contests?matchId=" +
            selectedMatch,
        );
        const data = response.data;
        console.log(data.data.contests);
        setContests(data.data.contests);
      } catch (error) {
        console.error(error);
      }
    }
    loadAllContests();
  }, []);
  return (
    <Main>
      <div className="h-full w-full bg-white relative">
        <GoBackHeader lastScreen="contests" />
        <div className="overflow-scroll h-[90vh]">
          <div className="flex flex-col gap-2 p-4">
            <h2 className="font-medium text-lg">mega contests</h2>
            <div className="space-y-2">
              {contests["MEGA"]?.map((contest) => (
                <ContestCard
                  key={contest.contestId}
                  id={contest.contestId}
                  contestType={"mega"}
                  prizePool={contest.totalPrizePool}
                  entryFee={contest.entryFee}
                  filledSpots={contest.filledSpots}
                  totalSpots={contest.totalSpots}
                />
              ))}
            </div>
            <h2 className="font-medium text-lg mt-6">premium contests</h2>
            <div className="space-y-2">
              {contests["PREMIUM"]?.map((contest) => (
                <ContestCard
                  key={contest.contestId}
                  id={contest.contestId}
                  contestType={"premium"}
                  prizePool={contest.totalPrizePool}
                  entryFee={contest.entryFee}
                  filledSpots={contest.filledSpots}
                  totalSpots={contest.totalSpots}
                />
              ))}
            </div>

            <h2 className="font-medium text-lg mt-6">head-to-head contests</h2>
            <div className="space-y-2">
              {contests["HEAD_TO_HEAD"]?.map((contest) => (
                <ContestCard
                  key={contest.id}
                  id={contest.id}
                  contestType={"head_to_head"}
                  prizePool={contest.totalPrizePool}
                  entryFee={contest.entryFee}
                  filledSpots={contest.filledSpots}
                  totalSpots={contest.totalSpots}
                />
              ))}
            </div>

            <h2 className="font-medium text-lg mt-6">practice contests</h2>
            <div className="space-y-2">
              {contests["PRACTICE"]?.map((contest) => (
                <ContestCard
                  key={contest.id}
                  id={contest.id}
                  contestType={"practice"}
                  prizePool={contest.totalPrizePool}
                  entryFee={contest.entryFee}
                  filledSpots={contest.filledSpots}
                  totalSpots={contest.totalSpots}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Contests;
