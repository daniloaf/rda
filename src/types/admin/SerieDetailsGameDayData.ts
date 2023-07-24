import SerieDetailsGameDayPlayerStats from './SerieDetailsGameDayPlayerStats';
import SerieDetailsMatchData from './SerieDetailsMatchData';

export interface TeamPunishmentData {
  team: string;
  points: number;
  reason: string;
}

export default interface SerieDetailsGameDayData {
  _id: string;
  date: string;
  matches: Array<SerieDetailsMatchData>;
  playersStats: Array<SerieDetailsGameDayPlayerStats>;
  teamPunishments: Array<TeamPunishmentData>;
}
