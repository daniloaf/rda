import { IGameDay } from "../models/gameDay";
import Serie, { ISerie } from "../models/serie";
import { ITeam } from "../models/team";
import GameDaySummaryData from "../types/GameDaySummaryData";

export const getGameDayRankings = async (gameDayId?: string) => {
  const gameDayQuery = gameDayId
    ? { "gameDays._id": gameDayId }
    : { gameDays: { $ne: [] } };
  const serie = await Serie.findOne(gameDayQuery)
    .populate([
      "gameDays.playersStats.player",
      "gameDays.matches.teamA.team",
      "gameDays.matches.teamB.team",
    ])
    .sort({
      startDate: -1,
    });

  if (!serie) {
    return {
      teamRanking: [],
      gameDayPlayerStats: [],
      gameDate: null,
      gameDayMatches: [],
    };
  }
  const gameDay = serie.gameDays.find((gd: IGameDay) => gd._id === gameDayId);

  const teamsStats: {
    [index: string]: {
      color: string;
      wins: number;
      draws: number;
      losses: number;
      score: number;
    };
  } = {};

  const playersTeams: {
    [index: string]: ITeam;
  } = {};
  for (const team of serie.teams) {
    for (const playerId of team.players) {
      playersTeams[playerId] = team;
    }
  }

  for (const match of gameDay.matches) {
    const { teamA, teamB } = match;
    if (!teamsStats[teamA.team._id])
      teamsStats[teamA.team._id] = {
        color: teamA.team.color,
        wins: 0,
        draws: 0,
        losses: 0,
        score: 0,
      };
    if (!teamsStats[teamB.team._id])
      teamsStats[teamB.team._id] = {
        color: teamB.team.color,
        wins: 0,
        draws: 0,
        losses: 0,
        score: 0,
      };

    const goalsDiff = match.teamA.goals - match.teamB.goals;
    if (goalsDiff > 0) {
      teamsStats[teamA.team._id].wins += 1;
      teamsStats[teamA.team._id].score += 3;
      teamsStats[teamB.team._id].losses += 1;
    } else if (goalsDiff < 0) {
      teamsStats[teamB.team._id].wins += 1;
      teamsStats[teamB.team._id].score += 3;
      teamsStats[teamA.team._id].losses += 1;
    } else {
      teamsStats[teamA.team._id].draws += 1;
      teamsStats[teamA.team._id].score += 1;
      teamsStats[teamB.team._id].draws += 1;
      teamsStats[teamB.team._id].score += 1;
    }
  }

  const playersStats = gameDay.playersStats.map((stats: any) => ({
    playerId: stats.player._id,
    nickname: stats.player.nickname,
    goals: stats.goals,
    assists: stats.assists,
    score: stats.score,
    yellowCards: stats.yellowCards,
    redCards: stats.redCards,
    teamColor: playersTeams[stats.player._id]?.color,
  }));

  const gameDayMatches = gameDay.matches.map((match: any) => ({
    teamA: { color: match.teamA.team.color, goals: match.teamA.goals },
    teamB: { color: match.teamB.team.color, goals: match.teamB.goals },
  }));

  return {
    teamRanking: Object.values(teamsStats).sort(
      (a, b) => b.score - a.score
    ),
    gameDayPlayerStats: playersStats,
    gameDate: gameDay.date.toISOString(),
    gameDayMatches: gameDayMatches,
  };
};

export const getPreviousGameDaysSummary = async () => {
  const series = (await Serie.find().sort({
    year: -1,
    month: -1,
    "gameDays.date": -1,
  })) as Array<ISerie>;

  const gameDays = series.reduce((gameDays, serie) => {
    if (!serie.gameDays?.length) return gameDays;

    gameDays.push(
      ...serie.gameDays.map((gd) => ({
        _id: gd._id,
        date: gd.date.toJSON(),
        year: serie.year,
        month: serie.month,
      }))
    );
    return gameDays;
  }, [] as Array<GameDaySummaryData>);

  return gameDays;
};
