import Serie from '../models/serie';
import { ITeam } from '../models/team';
import { calculateMatchScores, calculatePlayerStats, PlayerStats, TeamStats } from '../utils/stats';
import { calculateGameDayPunishments } from './gameDay';

export const getCurrentSerieStats = async () => {
  const latestSerie = await Serie.findOne()
    .populate([
      'gameDays.playersStats.player',
      'gameDays.matches.teamA.team',
      'gameDays.matches.teamB.team',
    ])
    .sort({
      year: -1,
      month: -1,
    });

  if (!latestSerie) {
    return {
      currentTeamRanking: [],
      currentPlayersStats: [],
      month: null,
    };
  }

  const currentTeamStats: { [index: string]: TeamStats } = {};
  const playersTeams: { [index: string]: ITeam } = {};

  for (const team of latestSerie?.teams) {
    currentTeamStats[team._id] = {
      color: team.color,
      wins: 0,
      draws: 0,
      losses: 0,
      score: 0,
    };
    for (const playerId of team.players) {
      playersTeams[playerId] = team;
    }
  }

  const currentPlayersStats: { [index: string]: PlayerStats } = {};

  for (const gameDay of latestSerie?.gameDays) {
    for (const match of gameDay.matches) {
      calculateMatchScores(match, currentTeamStats);
    }

    for (const stats of gameDay.playersStats) {
      const playerId = stats.player._id;
      calculatePlayerStats(playerId, stats, playersTeams[playerId]?.color, currentPlayersStats);
    }

    calculateGameDayPunishments(gameDay, currentTeamStats);
  }

  return {
    currentTeamRanking: Object.values(currentTeamStats).sort((a, b) => b.score - a.score),
    currentPlayersStats: Object.values(currentPlayersStats).map((stats) => ({
      ...stats,
      score: (stats.totalScore / (stats.numScores || 1)).toFixed(2),
    })),
    month: latestSerie.month,
  };
};
