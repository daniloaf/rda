import { NextApiRequest, NextApiResponse } from "next";
import * as PlayerServices from "../../../../../services/player";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, year } = req.query as { id: string; year: string };
  const { playerYearStats } = await PlayerServices.getPlayerYearStats(
    id,
    parseInt(year)
  );

  res.json(playerYearStats);
}
