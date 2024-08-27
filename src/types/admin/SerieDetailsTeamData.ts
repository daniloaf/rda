import SerieDetailsPlayerData from './SerieDetailsPlayerData'

export default interface SerieDetailsTeamData {
  _id: string
  color: string
  players: Array<SerieDetailsPlayerData>
  captain: string
}
