export default interface PlayerYearStats {
  id: number;
  year: number;
  goals: number;
  assists: number;
  score: number|string;
  attendance: number;
  yellowCards: number;
  redCards: number;
  wins: number;
  draws: number;
  losses: number;
}
