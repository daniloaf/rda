export default interface GameDayPlayerStats {
  playerId: string
  nickname: string
  goals: number
  assists: number
  score: number | string
  yellowCards: number
  redCards: number
  teamColor: string
}
