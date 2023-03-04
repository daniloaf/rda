import ActivePlayerData from "./ActivePlayerData";

export default interface SerieDetailsGameDayPlayerStats {
  player: ActivePlayerData;
  goals: number;
  assists: number;
  score: number;
  yellowCards: number;
  redCards: number;
}
