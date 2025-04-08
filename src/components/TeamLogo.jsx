import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "lucide-react";

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
            `${import.meta.env.VITE_BASE_URL || "http://localhost:3000/api"}/ipl/contests/team?teamId=${teamId}`
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
        {/* <p className="text-base text-gray-800 mt-2">{teamName}</p> */}
      </div>
    );
  };



export default TeamLogo;