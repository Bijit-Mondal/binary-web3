import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeamLogo = ({ teamId, onRight = false }) => {
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
        console.log(teamId);
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL + `/ipl/contests/team?teamId=${teamId}`,
        );
        console.log(
          response.data,
          response.data.data.logoUrl,
          response.data.data.teamName,
        );
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
  }, [logoUrl]);
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
          {teamId.split("_")[0].toUpperCase() || "ST"}
        </span>
      </div>
      <p className="text-base text-gray-800 mt-2">{teamName}</p>
    </div>
  );
};

const MatchDetails = ({ team1, team2 }) => {
  const [timeRemaining, setTimeRemaining] = useState("");
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-center items-start bg-white p-4 rounded-lg w-full border px-6"
      onClick={() => navigate("/contests")}
    >
      <p className="text-xs text-gray-400">Indian T20 League</p>
      <div className="flex justify-between w-full mt-2">
        <TeamLogo teamId={team1} />
        vs
        <TeamLogo teamId={team2} onRight={true} />
      </div>
    </div>
  );
};

export default MatchDetails;
