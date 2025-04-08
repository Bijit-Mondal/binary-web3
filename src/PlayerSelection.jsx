import { useState, useEffect } from "react";
import Main from "./components/Main.jsx";
import GoBackHeader from "./components/GoBackHeader.jsx";
import ContestCard from "./components/ContestsCards.jsx";
import { Loader } from "lucide-react";
import PlayerCard from "./components/PlayerCards.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { selectedPlayersAllStatesAtom, selectedTeams } from "./allSates.js";
import axios from "axios";

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
    console.log(teamId);
    const [loading, setLoading] = useState(true);
    const [teamName, setTeamName] = useState("Sample Team Name");
    const [logoUrl, setLogoUrl] = useState(
        "https://api.dicebear.com/8.x/micah/svg?seed=teamId"
    );
    useEffect(() => {
        const fetchLogo = async () => {
            if (!teamId) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                // console.log(teamId);
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL || "http://localhost:3000/api"}/ipl/contests/team?teamId=${teamId}`
                );
                // console.log(
                //   response.data,
                //   response.data.data.logoUrl,
                //   response.data.data.teamName,
                // );
                if (response.status === 200) {
                    setLogoUrl(response.data.data.team.logoUrl);
                    setTeamName(response.data.data.team.teamName);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching logo:", error);
            }
            setLoading(false);
        };

        fetchLogo();
    }, [teamId]);
    if (loading) {
        return (
            <div className="flex justify-center items-center bg-gray-200 w-12 h-12 rounded-full">
                <Loader className="animate-spin" />
            </div>
        );
    }

    return (
        <div className={`flex flex-col`}>
            <div
                className={`flex items-center gap-2 ${
                    onRight ? "justify-end" : ""
                }`}
            >
                <img
                    src={logoUrl}
                    alt={`${teamName} Logo`}
                    className="w-12 h-12 object-contain rounded-full"
                />
                <span className="font-semibold">
                    {teamId.split("_")[0].toUpperCase() || "ST"}
                </span>
            </div>
            <p
                className={`text-sm text-gray-800 mt-2 ${
                    onRight ? "text-right" : ""
                }`}
            >
                {numberOfPlayersSelected} players selected
            </p>
        </div>
    );
};

function PlayerSelection() {
    const [numberOfPlayersSelected, setNumberOfPlayersSelected] = useState(0);
    const [
        numberOfPlayerSelectedForTeamOne,
        setNumberOfPlayerSelectedForTeamOne,
    ] = useState(0);
    const [
        numberOfPlayerSelectedForTeamTwo,
        setNumberOfPlayerSelectedForTeamTwo,
    ] = useState(0);
    const [playerSelectionMap, setPlayerSelectionMap] = useState({});
    const [numberOfCreditsLeft, setNumberOfCreditsLeft] = useState(100);
    const [searchParam, setSearchParam] = useSearchParams();
    const selectedTeamsVal = searchParam.get("teams").split(",");
    const [playersTeamOne, setPlayersTeamOne] = useState({});
    const [playersTeamTwo, setPlayersTeamTwo] = useState({});

    if (!selectedTeamsVal.length) {
        navigate("/");
        return;
    }

    const [selectedPlayersAllState, setSelectedPlayersAllState] = useAtom(
        selectedPlayersAllStatesAtom
    );

    const navigate = useNavigate();

    const handleToggle = (data, teamTwo = false) => {
        let tempNextState = !playerSelectionMap[data.player.id];

        // check if already 11 players selected
        if (tempNextState && numberOfPlayersSelected == 11) {
            alert("Maximum players selected");
            return;
        }

        console.log(teamTwo, tempNextState);
        setNumberOfCreditsLeft(
            tempNextState
                ? numberOfCreditsLeft - data.player.baseCreditValue
                : numberOfCreditsLeft + data.player.baseCreditValue
        );
        setNumberOfPlayersSelected(
            tempNextState
                ? numberOfPlayersSelected + 1
                : numberOfPlayersSelected - 1
        );
        setPlayerSelectionMap({
            ...playerSelectionMap,
            [data.player.id]: !playerSelectionMap[data.player.id],
        });
        teamTwo
            ? setNumberOfPlayerSelectedForTeamTwo(
                  tempNextState
                      ? numberOfPlayerSelectedForTeamTwo + 1
                      : numberOfPlayerSelectedForTeamTwo - 1
              )
            : setNumberOfPlayerSelectedForTeamOne(
                  tempNextState
                      ? numberOfPlayerSelectedForTeamOne + 1
                      : numberOfPlayerSelectedForTeamOne - 1
              );
    };

    useEffect(() => {
        if (Object.keys(selectedPlayersAllState).length) {
            setPlayerSelectionMap(selectedPlayersAllState.playerSelectionMap);
            setNumberOfPlayersSelected(
                selectedPlayersAllState.numberOfPlayersSelected
            );
            setNumberOfPlayerSelectedForTeamOne(
                selectedPlayersAllState.numberOfPlayerSelectedForTeamOne
            );
            setNumberOfPlayerSelectedForTeamTwo(
                selectedPlayersAllState.numberOfPlayerSelectedForTeamTwo
            );
            setNumberOfCreditsLeft(selectedPlayersAllState.numberOfCreditsLeft);
        } else {
            let selectedPlayersAllStateLocal = JSON.parse(
                localStorage.getItem("selectedPlayersAllState")
            );
            if (selectedPlayersAllStateLocal) {
                setPlayerSelectionMap(
                    selectedPlayersAllStateLocal.playerSelectionMap
                );
                setNumberOfPlayersSelected(
                    selectedPlayersAllStateLocal.numberOfPlayersSelected
                );
                setNumberOfPlayerSelectedForTeamOne(
                    selectedPlayersAllStateLocal.numberOfPlayerSelectedForTeamOne
                );
                setNumberOfPlayerSelectedForTeamTwo(
                    selectedPlayersAllStateLocal.numberOfPlayerSelectedForTeamTwo
                );
                setNumberOfCreditsLeft(
                    selectedPlayersAllStateLocal.numberOfCreditsLeft
                );
            }
        }
    }, [selectedPlayersAllState]);

    useEffect(() => {
        async function loadAllPlayers() {
            try {
                const responseTeam1 = await axios.get(
                    `${import.meta.env.VITE_BASE_URL || "http://localhost:3000/api"}/ipl/teams/squad?teamId=${selectedTeamsVal[0]}`
                );
                const data = responseTeam1.data;
                console.log(data.data.squad);
                setPlayersTeamOne(data.data.squad);

                const responseTeam2 = await axios.get(
                    `${import.meta.env.VITE_BASE_URL || "http://localhost:3000/api"}/ipl/teams/squad?teamId=${selectedTeamsVal[1]}`
                );
                const data2 = responseTeam2.data;
                console.log(data2.data.squad);
                setPlayersTeamTwo(data2.data.squad);
            } catch (error) {
                console.error(error);
            }
        }
        loadAllPlayers();
    }, []);

    return (
        <Main>
            <div className="h-full w-full bg-white relative">
                <GoBackHeader lastScreen="select players" />
                <div className="flex justify-between w-full mt-2 p-4">
                    <TeamLogo
                        numberOfPlayersSelected={
                            numberOfPlayerSelectedForTeamOne
                        }
                        teamId={selectedTeamsVal[0]}
                        logoUrl={null}
                    />
                    <div className="flex flex-col justify-center items-center text-xs ml-4">
                        credits left
                        <div className="font-bold text-lg">
                            {numberOfCreditsLeft}
                        </div>
                    </div>
                    <TeamLogo
                        numberOfPlayersSelected={
                            numberOfPlayerSelectedForTeamTwo
                        }
                        teamId={selectedTeamsVal[1]}
                        onRight={true}
                    />
                </div>
                <div className="px-4 py-2 w-full box-border flex items-center">
                    <ProgressBar
                        progress={(numberOfPlayersSelected / 11) * 100}
                    />
                    <div className="flex text-xs shrink-0 ml-4">
                        {numberOfPlayersSelected} / 11 players
                    </div>
                </div>
                <div className="overflow-scroll h-[62vh] space-y-2 p-4">
                    <h2 className="my-4 font-medium text-lg">pick batsman</h2>
                    {playersTeamOne["BATSMAN"]?.map((data) => (
                        <PlayerCard
                            key={data.player.id}
                            playerName={data.player.name}
                            credits={data.player.baseCreditValue}
                            selected={playerSelectionMap[data.player.id]}
                            onSelectToggle={() => handleToggle(data)}
                        />
                    ))}
                    {playersTeamTwo["BATSMAN"]?.map((data) => (
                        <PlayerCard
                            key={data.player.id}
                            playerName={data.player.name}
                            credits={data.player.baseCreditValue}
                            selected={playerSelectionMap[data.player.id]}
                            onSelectToggle={() => handleToggle(data, true)}
                        />
                    ))}
                    <h2 className="my-4 font-medium text-lg">pick bowler</h2>
                    {playersTeamOne["BOWLER"]?.map((data) => (
                        <PlayerCard
                            key={data.player.id}
                            playerName={data.player.name}
                            credits={data.player.baseCreditValue}
                            selected={playerSelectionMap[data.player.id]}
                            onSelectToggle={() => handleToggle(data)}
                        />
                    ))}
                    {playersTeamTwo["BOWLER"]?.map((data) => (
                        <PlayerCard
                            key={data.player.id}
                            playerName={data.player.name}
                            credits={data.player.baseCreditValue}
                            selected={playerSelectionMap[data.player.id]}
                            onSelectToggle={() => handleToggle(data, true)}
                        />
                    ))}
                    <h2 className="my-4 font-medium text-lg">pick wk</h2>
                    {playersTeamOne["WICKET_KEEPER"]?.map((data) => (
                        <PlayerCard
                            key={data.player.id}
                            playerName={data.player.name}
                            credits={data.player.baseCreditValue}
                            selected={playerSelectionMap[data.player.id]}
                            onSelectToggle={() => handleToggle(data)}
                        />
                    ))}
                    {playersTeamTwo["WICKET_KEEPER"]?.map((data) => (
                        <PlayerCard
                            key={data.player.id}
                            playerName={data.player.name}
                            credits={data.player.baseCreditValue}
                            selected={playerSelectionMap[data.player.id]}
                            onSelectToggle={() => handleToggle(data, true)}
                        />
                    ))}
                    <h2 className="my-4 font-medium text-lg">
                        pick all rounders
                    </h2>
                    {playersTeamOne["ALL_ROUNDER"]?.map((data) => (
                        <PlayerCard
                            key={data.player.id}
                            playerName={data.player.name}
                            credits={data.player.baseCreditValue}
                            selected={playerSelectionMap[data.player.id]}
                            onSelectToggle={() => handleToggle(data)}
                        />
                    ))}
                    {playersTeamTwo["ALL_ROUNDER"]?.map((data) => (
                        <PlayerCard
                            key={data.player.id}
                            playerName={data.player.name}
                            credits={data.player.baseCreditValue}
                            selected={playerSelectionMap[data.player.id]}
                            onSelectToggle={() => handleToggle(data, true)}
                        />
                    ))}
                </div>
                <button
                    onClick={() => {
                        // save all progress
                        setSelectedPlayersAllState({
                            numberOfPlayersSelected,
                            numberOfPlayerSelectedForTeamOne,
                            numberOfPlayerSelectedForTeamTwo,
                            playerSelectionMap,
                            numberOfCreditsLeft,
                        });
                        localStorage.setItem(
                            "selectedPlayersAllState",
                            JSON.stringify({
                                numberOfPlayersSelected,
                                numberOfPlayerSelectedForTeamOne,
                                numberOfPlayerSelectedForTeamTwo,
                                playerSelectionMap,
                                numberOfCreditsLeft,
                            })
                        );
                        localStorage.setItem(
                            "finalData",
                            JSON.stringify({
                                matchId: searchParam.get("matchId"),
                                contestId: searchParam.get("contestId"),
                                players: Object.keys(playerSelectionMap)
                                    .filter((key) => playerSelectionMap[key])
                                    .map((key) => ({
                                        playerId: key,
                                        isCaptain: false,
                                        isViceCaptain: false,
                                    })),
                            })
                        );
                        navigate("/captainselection");
                    }}
                    disabled={numberOfPlayersSelected != 11}
                    className={`w-full mt-4 p-4 box-border font-bold text-xl hover:bg-gray-100 transition-all ${
                        numberOfPlayersSelected != 11
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                    }`}
                >
                    save
                </button>
            </div>
        </Main>
    );
}

export default PlayerSelection;
