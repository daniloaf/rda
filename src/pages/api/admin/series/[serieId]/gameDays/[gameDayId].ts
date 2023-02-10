import { NextApiRequest, NextApiResponse } from "next";
import * as AdminServices from "../../../../../../services/admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    console.log("QUERY", req.query);
    const serieId = req.query.serieId as string;
    const gameDayId = req.query.gameDayId as string;
    const data = req.body;

    const serie = await AdminServices.updateGameDay(serieId, gameDayId, data);
    res.json(JSON.parse(JSON.stringify(serie)));
  }
}
