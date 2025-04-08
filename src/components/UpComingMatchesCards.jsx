import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { selectedMatchId, selectedTeams } from "../allSates";
import TeamLogo from "./TeamLogo";

// Component to show team logo and name


// Component to render each match card
const MatchDetails = ({ team1, team2, id, index, formattedDate }) => {
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
      <p className="text-sm text-gray-600">{formattedDate}</p>
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
      {matches.map((match, index) => {
        // console.log('Match data:', match);
        return (
          <MatchDetails
            key={match.matchId || index}
            team1={match.homeTeamId}
            team2={match.awayTeamId}
            id={match.matchId}
            index={index}
            formattedDate={match.formattedDate}
          />
        );
      })}
    </div>
  );
};

export default UpComingMatchesCards;
