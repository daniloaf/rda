export interface SerieSummaryData {
  _id: string;
  month: number;
  year: number;
  startDate: string;
  endDate: string;
}

export interface SerieSummaryByYearData {
  [index: string]: Array<SerieSummaryData>;
}

export interface SerieDetailsPlayerData {
  _id: string;
  nickname: string;
}

export interface SerieDetailsTeamData {
  _id: string;
  color: string;
  players: Array<SerieDetailsPlayerData>;
}

export interface SerieDetailsData {
  _id: string;
  month: number;
  year: number;
  startDate: string;
  endDate?: string;
  teams: Array<SerieDetailsTeamData>;
}
