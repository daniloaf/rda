import { IPlayerStats } from '../models/gameDay';
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

  const data = calculateSerieStats(latestSerie);
  return {
    currentTeamRanking: data.teamRanking,
    currentPlayersStats: data.playersStats,
    month: data.month,
  };
};

export const getSeriesSummaries = async () => {
  const series = await Serie.find()
    .populate([
      'gameDays.playersStats.player',
      'gameDays.matches.teamA.team',
      'gameDays.matches.teamB.team',
    ])
    .sort({
      year: -1,
      month: -1,
    });

  return series.map((serie) => {
    const currentTeamStats: { [index: string]: TeamStats } = {};
    const playersTeams: { [index: string]: ITeam } = {};

    for (const team of serie?.teams) {
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

    for (const gameDay of serie?.gameDays) {
      for (const match of gameDay.matches) {
        calculateMatchScores(match, currentTeamStats);
      }

      for (const stats of gameDay.playersStats) {
        const playerId = (stats.player as unknown as IPlayerStats)._id;
        calculatePlayerStats(playerId, stats, playersTeams[playerId]?.color, currentPlayersStats);
      }

      calculateGameDayPunishments(gameDay, currentTeamStats);
    }

    const champion = Object.values(currentTeamStats).sort((a, b) => b.score - a.score)[0];
    const topScorers = Object.values(currentPlayersStats).sort((a, b) => b.goals - a.goals);
    const topAssistants = Object.values(currentPlayersStats).sort((a, b) => b.assists - a.assists);
    const topCards = Object.values(currentPlayersStats).sort(
      (a, b) => b.yellowCards + b.redCards - (a.yellowCards + a.redCards)
    );

    return {
      _id: serie._id,
      year: serie.year,
      month: serie.month,
      champion,
      topScorers: topScorers.filter((p) => p.goals > 0 && p.goals === topScorers[0].goals),
      topAssistants: topAssistants.filter(
        (p) => p.assists > 0 && p.assists === topAssistants[0].assists
      ),
      topCards: topCards.filter(
        (p) =>
          p.yellowCards + p.redCards > 0 &&
          (p.yellowCards + p.redCards) === (topCards[0].yellowCards + topCards[0].redCards)
      ),
    };
  });
};

export const getSerieDetails = async (serieId: string) => {
  const serie = await Serie.findById(serieId).populate([
    'teams.players',
    'gameDays.playersStats.player',
  ]);
  return serie?.toJSON({ virtuals: true });
};

export const getSerieStats = async (serieId: string) => {
  const serie = await Serie.findById(serieId)
    .populate([
      'gameDays.playersStats.player',
      'gameDays.matches.teamA.team',
      'gameDays.matches.teamB.team',
    ])
    .sort({
      year: -1,
      month: -1,
    });

  if (!serie) {
    return {
      teamRanking: [],
      playersStats: [],
      month: null,
    };
  }

  return calculateSerieStats(serie);
};

function calculateSerieStats(latestSerie: any) {
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
    teamRanking: Object.values(currentTeamStats).sort((a, b) => b.score - a.score),
    playersStats: Object.values(currentPlayersStats).map((stats) => ({
      ...stats,
      score: (stats.totalScore / (stats.numScores || 1)).toFixed(2),
    })),
    month: latestSerie.month,
  };
}
