import { NextApiRequest, NextApiResponse } from 'next';
import * as AdminServices from '../../../../../services/admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const serieId = req.query.serieId as string;
    const data = req.body;

    const serie = await AdminServices.addGameDay(serieId, data);
    res.json(JSON.parse(JSON.stringify(serie)));
  }
}
