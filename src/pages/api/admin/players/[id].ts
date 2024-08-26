import { NextApiRequest, NextApiResponse } from 'next';
import * as AdminServices from '../../../../services/admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const playerId = req.query.id as string;
    const data = req.body;

    const player = await AdminServices.updatePlayer(playerId, data);
    res.json(JSON.parse(JSON.stringify(player)));
  }
}
