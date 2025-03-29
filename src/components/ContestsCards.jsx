import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Loader } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Star } from "lucide-react";
import { Users } from "lucide-react";
import { TicketSlash } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { Crown } from "lucide-react";
import { Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const base_url = "http://localhost:3000/api/ipl";

const prizePollGuarantee = {
  premium: true,
  mega: true,
  head_to_head: false,
  practice: false,
};

const winChances = {
  premium: 0.8,
  mega: 0.6,
  head_to_head: 0.5,
  practice: 0.2,
};

const noOfTeams = {
  premium: 10,
  mega: 8,
  head_to_head: 2,
  practice: 2,
};

const entryCharge = {
  premium: 100,
  mega: 80,
  head_to_head: 20,
  practice: 0,
};

const getContestIcon = (contestType) => {
  switch (contestType) {
    case "premium":
      return <Sparkles />;
    case "mega":
      return <Star />;
    case "head_to_head":
      return <Users />;
    case "practice":
      return <TicketSlash />;
    default:
      return <CircleHelp />;
  }
};

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

const ContestCard = ({ contestType, prizePool }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-start bg-white p-4 rounded-lg w-full border px-6">
      <p className="text-xs text-gray-400">
        Prize Pool - {prizePollGuarantee[contestType] ? "Guaranteed" : ""}
      </p>
      <div className="flex justify-between w-full my-3">
        <div className="flex justify-between w-full items-center">
          <div className="flex justify-center items-center gap-4">
            {getContestIcon(contestType)} ${prizePool}
          </div>
          <button
            onClick={() => navigate("/playerselection")}
            className="bg-gray-100 text-gray-800 font-bold p-1 border border-gray-900 rounded cursor-pointer hover:bg-gray-300 transition-all"
          >
            {entryCharge[contestType]} FGT
          </button>
        </div>
      </div>
      <ProgressBar progress={Math.random() * 100} />
      <div className="flex w-full items-center mt-4 text-sm">
        <div className="flex justify-center items-center gap-1">
          <Crown className="w-4 h-4" /> {winChances[contestType]} % win
        </div>
        <div className="flex justify-center items-center gap-1 ml-3">
          <Flag className="w-4 h-4" /> {noOfTeams[contestType]} teams
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
