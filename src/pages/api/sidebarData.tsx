import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../services/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  
  res.json({
    currentTeamRanking: [
      {
        color: "Azul",
        score: 9,
        victories: 3,
        draws: 0,
        losses: 0,
      },
      {
        color: "Laranja",
        score: 4,
        victories: 1,
        draws: 1,
        losses: 2,
      },
      {
        color: "Branco",
        score: 1,
        victories: 0,
        draws: 1,
        losses: 3,
      },
    ],

    currentGameDayPlayerStats: [
      {
        playerId: "1",
        nickname: "Gordão",
        goals: 1,
        assists: 1,
        score: 1,
        victories: 1,
        draws: 1,
        losses: 1,
      },
      {
        playerId: "2",
        nickname: "Vieira",
        goals: 1,
        assists: 1,
        score: 1,
        victories: 1,
        draws: 1,
        losses: 1,
      },
      {
        playerId: "3",
        nickname: "Zé",
        goals: 1,
        assists: 1,
        score: 1,
        victories: 1,
        draws: 1,
        losses: 1,
      },
    ],
  });
}
