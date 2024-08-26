import * as _ from 'lodash'
import * as dotenv from 'dotenv'

dotenv.config()

import Serie from '../models/serie'
import Player from '../models/player'
import Team, { ITeam } from '../models/team'
import { calculateMatchScores, TeamStats } from '../utils/stats'
import { calculateGameDayPunishments } from '../services/gameDay'
import { IMatch } from '../models/match'

const getData = async () => {
  const players = await Player.find({})
  console.log(`Found ${players.length} players`)
  const series = await Serie.find({ year: 2023, month: { $ne: 12 } })
    .populate(['gameDays.matches.teamA.team', 'gameDays.matches.teamB.team'])
    .sort({
      year: 1,
      month: 1,
    })
  console.log(`Found ${series.length} series`)
  const teams = await Team.find({})
  console.log(`Found ${teams.length} teams`)
  return { series, players, teams }
}

const generatePlayersStats = async (data: Awaited<ReturnType<typeof getData>>) => {
  const currentPlayersStats = _.keyBy(
    data.players.map((player) => ({
      id: player._id,
      nickname: player.nickname,
      attendance: 0,
      goals: 0,
      assists: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      totalScore: 0,
      yellowCards: 0,
      redCards: 0,
      cardPoints: 0,
      firstPlace: 0,
      secondPlace: 0,
      thirdPlace: 0,
      captainWins: 0,
    })),
    'id'
  )

  for (const serie of data.series) {
    const teamsStats = serie.teams.map((team) => ({
      id: team._id,
      color: team.color,
      wins: 0,
      draws: 0,
      losses: 0,
      score: 0,
      firstPlace: 0,
      secondPlace: 0,
      thirdPlace: 0,
    }))

    const currentTeamStats = _.keyBy(teamsStats, 'id')

    const playersTeams: { [index: string]: ITeam } = {}
    for (const team of serie?.teams) {
      for (const playerId of team.players) {
        playersTeams[playerId] = team
      }
    }

    for (const gameDay of serie.gameDays) {
      for (const playerStats of gameDay.playersStats) {
        const playerId = playerStats.player
        const playerStat = currentPlayersStats[playerId]
        playerStat.goals += playerStats.goals
        playerStat.assists += playerStats.assists
        playerStat.attendance += 1
        playerStat.yellowCards += playerStats.yellowCards ?? 0
        playerStat.redCards += playerStats.redCards ?? 0
        playerStat.cardPoints +=
          (playerStats.yellowCards ?? 0) * 4 + (playerStats.redCards ?? 0) * 10

        const playerTeam = serie.teams.find((team) => team.players.includes(playerId))
        for (const match of gameDay.matches) {
          const goalsDiff = match.teamA.goals - match.teamB.goals
          if ((match.teamA.team as ITeam)._id === playerTeam?._id) {
            if (goalsDiff > 0) {
              playerStat.wins += 1
              playerStat.totalScore += 3
            } else if (goalsDiff < 0) {
              playerStat.losses += 1
            } else {
              playerStat.draws += 1
              playerStat.totalScore += 1
            }
          } else if ((match.teamB.team as ITeam)._id === playerTeam?._id) {
            if (goalsDiff < 0) {
              playerStat.wins += 1
              playerStat.totalScore += 3
            } else if (goalsDiff > 0) {
              playerStat.losses += 1
            } else {
              playerStat.draws += 1
              playerStat.totalScore += 1
            }
          }
        }
      }

      for (const match of gameDay.matches) {
        calculateMatchScores(match, currentTeamStats)
      }
      calculateGameDayPunishments(gameDay, currentTeamStats)
    }

    const teamRanking = Object.values(currentTeamStats).sort((a, b) => b.score - a.score)
    const firstPlace = serie.teams.find((team) => team._id === teamRanking[0].id)!
    const secondPlace = serie.teams.find((team) => team._id === teamRanking[1].id)!
    const thirdPlace = serie.teams.find((team) => team._id === teamRanking[2].id)!

    if (firstPlace.captain) {
      currentPlayersStats[firstPlace.captain].captainWins += 1
    } else {
      console.log('No captain for team', serie.year, serie.month, firstPlace.color)
    }

    for (const player of firstPlace.players) {
      currentPlayersStats[player].firstPlace += 1
    }
    for (const player of secondPlace.players) {
      currentPlayersStats[player].secondPlace += 1
    }
    for (const player of thirdPlace.players) {
      currentPlayersStats[player].thirdPlace += 1
    }
  }

  return currentPlayersStats
}

const generateGeneralStats = (data: Awaited<ReturnType<typeof getData>>) => {
  let totalSeries = 0
  let totalGameDays = 0
  let totalMatches = 0
  let totalGoals = 0
  let totalPlayersGoals = 0
  let totalAssists = 0
  let totalYellowCards = 0
  let totalRedCards = 0

  for (const serie of data.series) {
    totalSeries += 1
    totalGameDays += serie.gameDays.length
    for (const gameDay of serie.gameDays) {
      totalMatches += gameDay.matches.length
      for (const match of gameDay.matches) {
        totalGoals += match.teamA.goals + match.teamB.goals
      }
      for (const playerStats of gameDay.playersStats) {
        totalAssists += playerStats.assists
        totalPlayersGoals += playerStats.goals
        totalYellowCards += playerStats.yellowCards ?? 0
        totalRedCards += playerStats.redCards ?? 0
      }
    }
  }

  return {
    totalSeries,
    totalGameDays,
    totalMatches,
    totalGoals,
    totalPlayersGoals,
    totalAssists,
    totalYellowCards,
    totalRedCards,
  }
}

const generateTeamsStatsByColor = (data: Awaited<ReturnType<typeof getData>>) => {
  const teamsStats: { [index: string]: any } = {}

  for (const serie of data.series) {
    for (const team of serie.teams) {
      if (!teamsStats[team._id]) {
        teamsStats[team._id] = {
          color: team.color,
          wins: 0,
          draws: 0,
          losses: 0,
          score: 0,
          goalsScored: 0,
          goalsTaken: 0,
        }
      }
    }

    for (const gameDay of serie.gameDays) {
      for (const match of gameDay.matches as any[]) {
        calculateMatchScores(match, teamsStats)
        teamsStats[match.teamA.team._id].goalsScored += match.teamA.goals ?? 0
        teamsStats[match.teamA.team._id].goalsTaken += match.teamB.goals ?? 0
        teamsStats[match.teamB.team._id].goalsScored += match.teamB.goals ?? 0
        teamsStats[match.teamB.team._id].goalsTaken += match.teamA.goals ?? 0
      }
    }
  }

  const finalStats = Object.values(teamsStats).reduce((acc, team) => {
    if (!acc[team.color]) {
      acc[team.color] = {
        wins: 0,
        draws: 0,
        losses: 0,
        score: 0,
        goalsScored: 0,
        goalsTaken: 0,
      }
    }
    acc[team.color].wins += team.wins
    acc[team.color].draws += team.draws
    acc[team.color].losses += team.losses
    acc[team.color].score += team.score
    acc[team.color].goalsScored += team.goalsScored
    acc[team.color].goalsTaken += team.goalsTaken
    return acc
  }, {} as any)

  return finalStats
}

const sortPlayerStats = (playersStats: any, field: string, limit: number = 5) => {
  return _(playersStats)
    .values()
    .sortBy(field)
    .reverse()
    .take(limit)
    .map((player: any) => `${player.nickname} (${player[field]})`)
    .value()
}

const generateMaxStats = (data: Awaited<ReturnType<typeof getData>>) => {}

const main = async () => {
  const data = await getData()
  const playersStats = await generatePlayersStats(data)

  const stats = {
    topScorers: sortPlayerStats(playersStats, 'goals'),
    topAssists: sortPlayerStats(playersStats, 'assists'),
    topWins: sortPlayerStats(playersStats, 'wins'),
    topDraws: sortPlayerStats(playersStats, 'draws'),
    topLosses: sortPlayerStats(playersStats, 'losses'),
    topYellowCards: sortPlayerStats(playersStats, 'yellowCards'),
    topRedCards: sortPlayerStats(playersStats, 'redCards'),
    topCardPoints: sortPlayerStats(playersStats, 'cardPoints'),
    topAttendance: sortPlayerStats(playersStats, 'attendance'),
    topFirstPlace: sortPlayerStats(playersStats, 'firstPlace'),
    topSecondPlace: sortPlayerStats(playersStats, 'secondPlace', 30),
    topThirdPlace: sortPlayerStats(playersStats, 'thirdPlace', 30),
    captainWins: sortPlayerStats(playersStats, 'captainWins', 10),
    totalScore: sortPlayerStats(playersStats, 'totalScore'),
  }
  console.log(stats)

  const generalStats = generateGeneralStats(data)
  // console.log(generalStats);

  const teamStats = generateTeamsStatsByColor(data)
  // console.log(teamStats);

  // console.log(JSON.stringify(Object.values(playersStats)))

  // const allCaptains = data.teams.map(team => data.players.find(player => player._id === team.captain)?.nickname)
  // console.log(allCaptains)
}

main()
  .then(() => process.exit())
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
