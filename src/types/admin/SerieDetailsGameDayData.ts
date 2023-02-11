import SerieDetailsGameDayPlayerStats from "./SerieDetailsGameDayPlayerStats";
import SerieDetailsMatchData from "./SerieDetailsMatchData";

export default interface SerieDetailsGameDayData {
  _id: string;
  date: string;
  matches: Array<SerieDetailsMatchData>;
  playersStats: Array<SerieDetailsGameDayPlayerStats>;
}
