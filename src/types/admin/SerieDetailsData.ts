import SerieDetailsTeamData from "./SerieDetailsTeamData";
import SerieDetailsGameDayData from "./SerieDetailsGameDayData";

export default interface SerieDetailsData {
  _id: string;
  month: number;
  year: number;
  startDate: string;
  endDate?: string;
  teams: Array<SerieDetailsTeamData>;
  gameDays: Array<SerieDetailsGameDayData>
}
