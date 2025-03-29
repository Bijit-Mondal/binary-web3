import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const base_url = "http://localhost:3000/api/ipl";

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
      <p className="text-base text-gray-800 mt-2">{teamName}</p>
    </div>
  );
};

const MatchDetails = ({ team1, team2, logo1, logo2, matchTime }) => {
  const [timeRemaining, setTimeRemaining] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const updateTimer = () => {
      const now = moment();
      const matchMoment = moment(matchTime); // matchTime should be in ISO format
      const duration = moment.duration(matchMoment.diff(now));

      if (duration.asSeconds() <= 0) {
        setTimeRemaining("Match Started");
      } else {
        setTimeRemaining(`${duration.hours()}h ${duration.minutes()}m`);
      }
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [matchTime]);

  return (
    <div
      className="flex flex-col justify-center items-start bg-white p-4 rounded-lg w-full border px-6"
      onClick={() => navigate("/contests")}
    >
      <p className="text-xs text-gray-400">Indian T20 League</p>
      <div className="flex justify-between w-full mt-2">
        <TeamLogo teamName={team1} logoUrl={logo1} />
        vs
        <TeamLogo teamName={team1} onRight={true} />
      </div>
    </div>
  );
};

export default MatchDetails;
