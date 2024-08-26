import ActivePlayerData from './ActivePlayerData';

export default interface SerieDetailsMatchTeamData {
  team: string;
  goals: number;
  goalkeeper?: ActivePlayerData;
}
