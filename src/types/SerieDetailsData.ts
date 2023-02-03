import SerieDetailsTeamData from "./SerieDetailsTeamData";

export default interface SerieDetailsData {
  _id: string;
  month: number;
  year: number;
  startDate: string;
  endDate?: string;
  teams: Array<SerieDetailsTeamData>;
}
