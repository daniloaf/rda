import Serie from "../models/serie";
import { ITeam } from "../models/team";

export const getCurrentSerieStats = async () => {
  const latestSerie = await Serie.findOne()
    .populate([
      "gameDays.playersStats.player",
      "gameDays.matches.teamA.team",
      "gameDays.matches.teamB.team",
    ])
    .sort({
      startDate: -1,
    });

  const playersTeams: {
    [index: string]: ITeam;
  } = {};
  for (const team of latestSerie.teams) {
    for (const playerId of team.players) {
      playersTeams[playerId] = team;
    }
  }

  const currentTeamStats: {
    [index: string]: {
      color: string;
      wins: number;
      draws: number;
      losses: number;
      score: number;
    };
  } = {};

  const currentPlayersStats: {
    [index: string]: {
      nickname: string;
      teamColor: string;
      goals: number;
      assists: number;
      totalScore: number;
      numScores: number;
    };
  } = {};

  for (const gameDay of latestSerie.gameDays) {
    for (const match of gameDay.matches) {
      const { teamA, teamB } = match;
      if (!currentTeamStats[teamA.team._id])
        currentTeamStats[teamA.team._id] = {
          color: teamA.team.color,
          wins: 0,
          draws: 0,
          losses: 0,
          score: 0,
        };
      if (!currentTeamStats[teamB.team._id])
        currentTeamStats[teamB.team._id] = {
          color: teamB.team.color,
          wins: 0,
          draws: 0,
          losses: 0,
          score: 0,
        };

      const goalsDiff = match.teamA.goals - match.teamB.goals;
      if (goalsDiff > 0) {
        currentTeamStats[teamA.team._id].wins += 1;
        currentTeamStats[teamA.team._id].score += 3;
        currentTeamStats[teamB.team._id].losses += 1;
      } else if (goalsDiff < 0) {
        currentTeamStats[teamB.team._id].wins += 1;
        currentTeamStats[teamB.team._id].score += 3;
        currentTeamStats[teamA.team._id].losses += 1;
      } else {
        currentTeamStats[teamA.team._id].draws += 3;
        currentTeamStats[teamA.team._id].score += 1;
        currentTeamStats[teamB.team._id].draws += 3;
        currentTeamStats[teamB.team._id].score += 1;
      }
    }

    for (const stats of gameDay.playersStats) {
      const playerId = stats.player._id;
      if (!currentPlayersStats[playerId])
        currentPlayersStats[playerId] = {
          teamColor: playersTeams[playerId].color,
          nickname: stats.player.nickname,
          goals: 0,
          assists: 0,
          totalScore: 0,
          numScores: 0,
        };

      currentPlayersStats[playerId].goals += stats.goals;
      currentPlayersStats[playerId].assists += stats.assists;
      currentPlayersStats[playerId].totalScore += stats.score;
      currentPlayersStats[playerId].numScores++;
    }
  }

  return {
    currentTeamRanking: Object.values(currentTeamStats).sort(
      (a, b) => b.score - a.score
    ),
    currentPlayersStats: Object.values(currentPlayersStats).map((stats) => ({
      ...stats,
      score: stats.totalScore / stats.numScores,
    })),
    month: latestSerie.month,
  };
};
