import { PlayerStats, TeamStats } from '../utils/stats'
import PlayerData from './players'

export interface TeamPunishmentData {
  team: string
  points: number
  reason: string
}

export interface SerieDetailsPlayerData {
  _id: string
  nickname: string
  position: string
}

export interface SerieDetailsGameDayPlayerStats {
  player: PlayerData
  goals: number
  assists: number
  score: number
  yellowCards: number
  redCards: number
}

export interface SerieDetailsMatchTeamData {
  team: string
  goals: number
  goalkeeper?: PlayerData
}

export interface SerieDetailsMatchData {
  teamA: SerieDetailsMatchTeamData
  teamB: SerieDetailsMatchTeamData
}

export interface SerieDetailsGameDayData {
  _id: string
  date: string
  matches: SerieDetailsMatchData[]
  playersStats: SerieDetailsGameDayPlayerStats[]
  teamPunishments: TeamPunishmentData[]
}

export interface SerieSummaryData {
  _id: string
  year: number
  month: number
  champion: TeamStats
  topScorers: PlayerStats[]
  topAssistants: PlayerStats[]
  topCards: PlayerStats[]
}

export interface SerieDetailsTeamData {
  _id: string
  color: string
  players: SerieDetailsPlayerData[]
}

export interface SerieDetailsData {
  _id: string
  month: number
  year: number
  startDate: string
  endDate?: string
  teams: SerieDetailsTeamData[]
  gameDays: SerieDetailsGameDayData[]
}
