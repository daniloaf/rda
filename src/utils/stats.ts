export interface TeamStats {
  color: string
  wins: number
  draws: number
  losses: number
  score: number
}

export interface PlayerStats {
  playerId: string
  nickname: string
  teamColor: string
  goals: number
  assists: number
  totalScore: number
  numScores: number
  yellowCards: number
  redCards: number
}

export const calculateMatchScores = (match: any, teamsStats: { [index: string]: TeamStats }) => {
  const { teamA, teamB } = match

  if (!teamsStats[teamA.team._id])
    teamsStats[teamA.team._id] = {
      color: teamA.team.color,
      wins: 0,
      draws: 0,
      losses: 0,
      score: 0,
    }
  if (!teamsStats[teamB.team._id])
    teamsStats[teamB.team._id] = {
      color: teamB.team.color,
      wins: 0,
      draws: 0,
      losses: 0,
      score: 0,
    }

  const goalsDiff = match.teamA.goals - match.teamB.goals
  if (goalsDiff > 0) {
    teamsStats[teamA.team._id].wins += 1
    teamsStats[teamA.team._id].score += 3
    teamsStats[teamB.team._id].losses += 1
  } else if (goalsDiff < 0) {
    teamsStats[teamB.team._id].wins += 1
    teamsStats[teamB.team._id].score += 3
    teamsStats[teamA.team._id].losses += 1
  } else {
    teamsStats[teamA.team._id].draws += 1
    teamsStats[teamA.team._id].score += 1
    teamsStats[teamB.team._id].draws += 1
    teamsStats[teamB.team._id].score += 1
  }
}

export const calculatePlayerStats = (
  playerId: string,
  stats: any,
  teamColor: string,
  currentPlayersStats: { [index: string]: PlayerStats }
) => {
  if (!currentPlayersStats[playerId]) {
    currentPlayersStats[playerId] = {
      playerId: playerId,
      teamColor: teamColor,
      nickname: stats.player.nickname,
      goals: 0,
      assists: 0,
      totalScore: 0,
      numScores: 0,
      yellowCards: 0,
      redCards: 0,
    }
  }

  currentPlayersStats[playerId].goals += stats.goals
  currentPlayersStats[playerId].assists += stats.assists
  currentPlayersStats[playerId].totalScore += stats.score ?? 0
  currentPlayersStats[playerId].numScores++
  currentPlayersStats[playerId].yellowCards += stats.yellowCards
  currentPlayersStats[playerId].redCards += stats.redCards
}
