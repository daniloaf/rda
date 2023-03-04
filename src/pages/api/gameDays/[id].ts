import { NextApiRequest, NextApiResponse } from "next";
import * as GameDayServices from "../../../services/gameDay";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const data = await GameDayServices.getGameDayRankings(id);
  res.json(data);
}
