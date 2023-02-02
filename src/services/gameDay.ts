import Serie from "../models/serie";
import { ITeam } from "../models/team";

export const getLatestGameDayRankings = async () => {
  const latestSerie = await Serie.findOne({ gameDays: { $ne: [] } })
    .populate([
      "gameDays.playersStats.player",
      "gameDays.matches.teamA.team",
      "gameDays.matches.teamB.team",
    ])
    .sort({
      startDate: -1,
    });
  const latestGameDay = latestSerie.gameDays.at(-1);

  const latestTeamStats: {
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
  for (const team of latestSerie.teams) {
    for (const playerId of team.players) {
      playersTeams[playerId] = team;
    }
  }

  for (const match of latestGameDay.matches) {
    const { teamA, teamB } = match;
    if (!latestTeamStats[teamA.team._id])
      latestTeamStats[teamA.team._id] = {
        color: teamA.team.color,
        wins: 0,
        draws: 0,
        losses: 0,
        score: 0,
      };
    if (!latestTeamStats[teamB.team._id])
      latestTeamStats[teamB.team._id] = {
        color: teamB.team.color,
        wins: 0,
        draws: 0,
        losses: 0,
        score: 0,
      };

    const goalsDiff = match.teamA.goals - match.teamB.goals;
    if (goalsDiff > 0) {
      latestTeamStats[teamA.team._id].wins += 1;
      latestTeamStats[teamA.team._id].score += 3;
      latestTeamStats[teamB.team._id].losses += 1;
    } else if (goalsDiff < 0) {
      latestTeamStats[teamB.team._id].wins += 1;
      latestTeamStats[teamB.team._id].score += 3;
      latestTeamStats[teamA.team._id].losses += 1;
    } else {
      latestTeamStats[teamA.team._id].draws += 3;
      latestTeamStats[teamA.team._id].score += 1;
      latestTeamStats[teamB.team._id].draws += 3;
      latestTeamStats[teamB.team._id].score += 1;
    }
  }

  const latestPlayersStats = latestGameDay.playersStats.map((stats: any) => ({
    playerId: stats.player._id,
    nickname: stats.player.nickname,
    goals: stats.goals,
    assists: stats.assists,
    score: stats.score,
    teamColor: playersTeams[stats.player._id].color,
  }));

  const latestGameDayMatches = latestGameDay.matches.map((match: any) => ({
    teamA: { color: match.teamA.team.color, goals: match.teamA.goals },
    teamB: { color: match.teamB.team.color, goals: match.teamB.goals },
  }));

  return {
    latestTeamRanking: Object.values(latestTeamStats).sort(
      (a, b) => b.score - a.score
    ),
    latestGameDayPlayerStats: latestPlayersStats,
    latestGameDate: latestGameDay.date.toISOString(),
    latestGameDayMatches,
  };
};
