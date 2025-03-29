import { atom } from "recoil";

export const selectedMatchId = atom({
  key: "selectedMatchId",
  default: null,
});

export const selectedTeamId = atom({
  key: "selectedTeamId",
  default: null,
});

export const selectedContestId = atom({
  key: "selectedContestId",
  default: null,
});

export const selectedPlayers = atom({
  key: "selectedPlayers",
  default: [],
});

export const selectedCaptainAndViceCaptain = atom({
  key: "selectedCaptainAndViceCaptain",
  default: [],
});


