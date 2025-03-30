import { useState, useEffect } from "react";
import Main from "./components/Main.jsx";
import GoBackHeader from "./components/GoBackHeader.jsx";
import ContestCard from "./components/ContestsCards.jsx";
import { Loader } from "lucide-react";
import PlayerCard from "./components/PlayerCards.jsx";
import CaptainCard from "./components/CaptainCards.jsx";
import { useAtom } from "jotai";
import { selectedPlayersAllStatesAtom } from "./allSates.js";

const convertName = (player) => {
  let nameArray = player.split("-");
  let firstName = nameArray[0];
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  let lastName = nameArray[1];
  lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  let name = firstName + " " + lastName;

  return name;
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

function CaptainSelection() {
  const [captainSelectionId, setCaptainSelectionId] = useState("");
  const [viceCaptainSelectionId, setViceCaptainSelectionId] = useState("");
  const [playersSelected, setPlayersSelected] = useState([]);

  const [selectedPlayersAllState, setSelectedPlayersAllState] = useAtom(
    selectedPlayersAllStatesAtom,
  );

  useEffect(() => {
    if (Object.keys(selectedPlayersAllState).length) {
      let allPlayers = selectedPlayersAllState.playerSelectionMap;
      let playersSelectedTemp = Object.keys(allPlayers);
      setPlayersSelected(playersSelectedTemp);
    } else {
      let selectedPlayersAllStateLocal = JSON.parse(
        localStorage.getItem("selectedPlayersAllState"),
      );
      if (selectedPlayersAllStateLocal) {
        let allPlayers = selectedPlayersAllStateLocal.playerSelectionMap;
        let playersSelectedTemp = Object.keys(allPlayers);
        setPlayersSelected(playersSelectedTemp);
        console.log(playersSelectedTemp);
      }
    }
  }, [selectedPlayersAllState]);

  return (
    <Main>
      <div className="h-full w-full bg-white relative">
        <GoBackHeader />
        <div className="flex justify-between w-full mt-2 p-4 text-2xl">
          you are almost there
        </div>
        <div className="overflow-scroll h-[72vh] space-y-2 p-4">
          <h2 className="my-4 font-medium text-lg">pick captains</h2>
          {playersSelected.map((player, index) => (
            <CaptainCard
              key={index}
              selectedCap={player == captainSelectionId}
              selectViceCap={player == viceCaptainSelectionId}
              onSelectToggleCap={() => {
                if (viceCaptainSelectionId == player) {
                  alert("You can't select a captain as vice captain");
                  return;
                }
                if (captainSelectionId == player) {
                  setCaptainSelectionId(null);
                } else if (captainSelectionId) {
                  alert("You can only select one captain");
                } else {
                  setCaptainSelectionId(player);
                }
              }}
              onSelectToggleViceCap={() => {
                if (captainSelectionId == player) {
                  alert("You can't select a captain as vice captain");
                  return;
                }
                if (viceCaptainSelectionId == player) {
                  setViceCaptainSelectionId(null);
                } else if (viceCaptainSelectionId) {
                  alert("You can only select one vice captain");
                } else {
                  setViceCaptainSelectionId(player);
                }
              }}
              playerName={convertName(player)}
            />
          ))}
        </div>
        <button className="w-full mt-4 p-4 box-border font-bold text-xl hover:bg-gray-100 transition-all cursor-pointer">
          submit
        </button>
      </div>
    </Main>
  );
}

export default CaptainSelection;
