import { NextApiRequest, NextApiResponse } from "next";
import * as SerieServices from "../../services/serie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { currentTeamRanking, currentPlayersStats } =
    await SerieServices.getCurrentSerieStats();

  res.json({
    currentTeamRanking,
    currentPlayersStats,
  });
}
