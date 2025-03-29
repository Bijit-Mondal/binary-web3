import { useState, useEffect } from "react";
import Main from "./components/Main.jsx";
import GoBackHeader from "./components/GoBackHeader.jsx";
import ContestCard from "./components/ContestsCards.jsx";
import { Loader } from "lucide-react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full my-2">
      <div
        className="h-full bg-gray-500 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const TeamLogo = ({ teamId, numberOfPlayersSelected = 0, onRight = false }) => {
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState("Sample Team Name");
  const [logoUrl, setLogoUrl] = useState(
    "https://api.dicebear.com/8.x/micah/svg?seed=teamId",
  );
  useEffect(() => {
    const fetchLogo = async () => {
      if (!teamId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(base_url + `?teamId=${teamId}`);
        if (response.status === 200) {
          setLogoUrl(response.data.logoUrl);
          setTeamName(response.data.teamName);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
      setLoading(false);
    };

    fetchLogo();
  }, [logoUrl]);
  if (loading) {
    return (
      <div className="animate-spin bg-gray-200 w-12 h-12 rounded-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className={`flex flex-col`}>
      <div
        className={`flex items-center gap-2 ${onRight ? "justify-end" : ""}`}
      >
        <img
          src={logoUrl}
          alt={`${teamName} Logo`}
          className="w-12 h-12 object-contain rounded-full"
        />
        <span className="font-semibold">{teamId || "ST"}</span>
      </div>
      <p
        className={`text-sm text-gray-800 mt-2 ${onRight ? "text-right" : ""}`}
      >
        {numberOfPlayersSelected} players selected
      </p>
    </div>
  );
};

function PlayerSelection() {
  const [numberOfPlayersSelected, setNumberOfPlayersSelected] = useState(0);
  const [playerSelectionMap, setPlayerSelectionMap] = useState({});
  const [numberOfCreditsLeft, setNumberOfCreditsLeft] = useState(100);

  return (
    <Main>
      <div className="h-full w-full bg-white relative">
        <GoBackHeader lastScreen="select players" />
        <div className="flex justify-between w-full mt-2 p-4">
          <TeamLogo teamName={null} logoUrl={null} />
          <div className="flex flex-col justify-center items-center text-xs ml-4">
            credits left
            <div className="font-bold text-lg">{numberOfCreditsLeft}</div>
          </div>
          <TeamLogo teamName={null} onRight={true} />
        </div>
        <div className="px-4 py-2 w-full box-border flex items-center">
          <ProgressBar progress={10} />
          <div className="flex text-xs shrink-0 ml-4">0 / 11 players</div>
        </div>
        <div className="overflow-scroll h-[80vh]">
        
        </div>
      </div>
    </Main>
  );
}

export default PlayerSelection;
