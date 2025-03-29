import { atom } from "recoil";

const selectedTeamId = atom({
  key: "selectedTeamId",
  default: null,
});

const selectedContestId = atom({
  key: "selectedContestId",
  default: null,
});

const selectedPlayers = atom({
  key: "selectedPlayers",
  default: [],
});

const selectedCaptainAndViceCaptain = atom({
  key: "selectedCaptainAndViceCaptain",
  default: [],
});


