import { FilterQuery } from 'mongoose'
import { IGameDay } from '../models/gameDay'
import Player, { IPlayer } from '../models/player'
import Serie, { ISerie } from '../models/serie'
import { ITeam } from '../models/team'

export const getPlayerById = async (playerId: string) => {
  return Player.findById(playerId)
}

export const getPlayers = async (query: FilterQuery<IPlayer>) => {
  return Player.find(query).sort({ active: -1, nickname: 1 })
}

export const getPlayerStats = async (playerId: string) => {
  const series = (await Serie.find({ 'gameDays.playersStats.player': playerId })
    .populate(['gameDays.playersStats.player'])
    .sort({
      year: 1,
    })) as Array<ISerie>

  const playerStats: {
    [index: number]: {
      year: number
      attendance: number
      goals: number
      assists: number
      wins: number
      draws: number
      losses: number
      totalScore: number
      numScores: number
    }
  } = {}
  for (const serie of series) {
    if (!playerStats[serie.year]) {
      playerStats[serie.year] = {
        year: serie.year,
        attendance: 0,
        goals: 0,
        assists: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        totalScore: 0,
        numScores: 0,
      }
    }
    const yearStats = playerStats[serie.year]

    const playerTeam = serie.teams.find((team) => team.players.includes(playerId))

    for (const gameDay of serie.gameDays) {
      const playerStats = gameDay.playersStats.find((stats: any) => stats.player._id === playerId)

      yearStats.goals += playerStats?.goals || 0
      yearStats.assists += playerStats?.assists || 0
      yearStats.totalScore += playerStats?.score || 0
      yearStats.numScores += playerStats?.score ? 1 : 0
      yearStats.attendance += playerStats ? 1 : 0

      for (const match of gameDay.matches) {
        const goalsDiff = match.teamA.goals - match.teamB.goals
        if (match.teamA.team === playerTeam?._id || match.teamA.goalkeeper === playerId) {
          if (goalsDiff > 0) yearStats.wins += 1
          else if (goalsDiff < 0) yearStats.losses += 1
          else yearStats.draws += 1
        } else if (match.teamB.team === playerTeam?._id || match.teamB.goalkeeper === playerId) {
          if (goalsDiff < 0) yearStats.wins += 1
          else if (goalsDiff > 0) yearStats.losses += 1
          else yearStats.draws += 1
        }
      }
    }
  }

  return Object.values(playerStats).map((stats) => ({
    ...stats,
    score: (stats.totalScore / (stats.numScores || 1)).toFixed(2),
  }))
}

export const getPlayerYearStats = async (playerId: string, year: number) => {
  const series = (await Serie.find({ year }).sort({
    month: 1,
  })) as Array<ISerie>

  const playerYearStats: {
    [index: number]: {
      month: number
      attendance: number
      goals: number
      assists: number
      wins: number
      draws: number
      losses: number
      totalScore: number
      numScores: number
    }
  } = {}
  for (const serie of series) {
    if (!playerYearStats[serie.month]) {
      playerYearStats[serie.month] = {
        month: serie.month,
        attendance: 0,
        goals: 0,
        assists: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        totalScore: 0,
        numScores: 0,
      }
    }
    const playerTeam = serie.teams.find((team) => team.players.includes(playerId))

    for (const gameDay of serie.gameDays) {
      const playerStats = gameDay.playersStats.find((stats: any) => stats.player === playerId)

      playerYearStats[serie.month].goals += playerStats?.goals || 0
      playerYearStats[serie.month].assists += playerStats?.assists || 0
      playerYearStats[serie.month].totalScore += playerStats?.score || 0
      playerYearStats[serie.month].numScores += playerStats?.score ? 1 : 0
      playerYearStats[serie.month].attendance += playerStats ? 1 : 0

      for (const match of gameDay.matches) {
        const goalsDiff = match.teamA.goals - match.teamB.goals
        if (match.teamA.team === playerTeam?._id || match.teamA.goalkeeper === playerId) {
          if (goalsDiff > 0) playerYearStats[serie.month].wins += 1
          else if (goalsDiff < 0) playerYearStats[serie.month].losses += 1
          else playerYearStats[serie.month].draws += 1
        } else if (match.teamB.team === playerTeam?._id || match.teamB.goalkeeper === playerId) {
          if (goalsDiff < 0) playerYearStats[serie.month].wins += 1
          else if (goalsDiff > 0) playerYearStats[serie.month].losses += 1
          else playerYearStats[serie.month].draws += 1
        }
      }
    }
  }

  return {
    playerYearStats: Object.values(playerYearStats).map((stats) => ({
      ...stats,
      score: (stats.totalScore / (stats.numScores || 1)).toFixed(2),
    })),
  }
}

export const createPlayer = async ({
  fullName,
  nickname,
  position,
  birthdate,
  picture,
}: IPlayer) => {
  return Player.create({
    fullName,
    nickname,
    position,
    birthdate,
    picture,
  })
}

export const updatePlayer = async (
  playerId: string,
  { fullName, nickname, position, birthdate, picture, active }: IPlayer
) => {
  return Player.findByIdAndUpdate(
    playerId,
    {
      $set: { fullName, nickname, position, birthdate, picture, active },
    },
    { new: true }
  )
}
