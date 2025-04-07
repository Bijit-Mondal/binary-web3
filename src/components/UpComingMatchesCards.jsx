import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { selectedMatchId, selectedTeams } from "../allSates";

// Component to show team logo and name
const TeamLogo = ({ teamId, onRight = false }) => {
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
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL + `/ipl/contests/team?teamId=${teamId}`
        );
        if (response.status === 200) {
          setLogoUrl(response.data.data.team.logoUrl);
          setTeamName(response.data.data.team.teamName);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, [teamId]);

  if (loading) {
    return (
      <div className="bg-gray-200 w-12 h-12 rounded-full flex justify-center items-center">
        <Loader className="animate-spin" />
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
        <span className="font-semibold">
          {teamId?.split("_")[0]?.toUpperCase() || "ST"}
        </span>
      </div>
      <p className="text-base text-gray-800 mt-2">{teamName}</p>
    </div>
  );
};

// Component to render each match card
const MatchDetails = ({ team1, team2, id, index }) => {
  const navigate = useNavigate();
  const setSelectedMatch = useSetAtom(selectedMatchId);
  const setSelectedTeams = useSetAtom(selectedTeams);

  const isClickable = index < 2; // Only first two matches clickable

  const handleClick = () => {
    if (isClickable) {
      setSelectedMatch(id);
      setSelectedTeams([team1, team2]);
      navigate(`/contests?matchId=${id}&teams=${team1},${team2}`);
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-start bg-white p-4 rounded-lg w-full border px-6 ${
        isClickable ? "cursor-pointer" : "opacity-50"
      }`}
      onClick={handleClick}
    >
      <p className="text-xs text-gray-400">Indian T20 League</p>
      <div className="flex justify-between w-full mt-2">
        <TeamLogo teamId={team1} />
        <span className="text-sm font-semibold text-gray-700 self-center">vs</span>
        <TeamLogo teamId={team2} onRight={true} />
      </div>
    </div>
  );
};

// Main component to render all upcoming matches
const UpComingMatchesCards = ({ matches }) => {
  if (!Array.isArray(matches)) {
    return <p className="text-red-500 text-sm">Error: Matches data is not available.</p>;
  }

  if (matches.length === 0) {
    return <p className="text-gray-500 text-sm">No upcoming matches.</p>;
  }

  return (
    <div className="space-y-4">
      {matches.map((match, index) => (
        <MatchDetails
          key={match.id}
          team1={match.team1}
          team2={match.team2}
          id={match.id}
          index={index}
        />
      ))}
    </div>
  );
};

export default UpComingMatchesCards;
