import { atom } from "jotai";

export const selectedMatchId = atom(null);

export const selectedTeams = atom([]);

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
