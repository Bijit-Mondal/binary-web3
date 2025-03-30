import { atom } from "jotai";

export const selectedMatchId = atom(null);

export const selectedTeams = atom([]);

export const selectedContestId = atom({
  key: "selectedContestId",
  default: null,
});

export const selectedPlayersAllStatesAtom = atom({});

export const selectedCaptainAndViceCaptain = atom({
  key: "selectedCaptainAndViceCaptain",
  default: [],
});
