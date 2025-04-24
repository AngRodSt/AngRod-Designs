import { NextApiRequest, NextApiResponse } from 'next';
import recivedOrderEmail from '@/helpers/recivedOrderEmail';

//API To send the recived order email to the client
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body);
    try {
      await recivedOrderEmail({
        name: data.name as string,
        email: data.email as string,
        date: data.date as string,
        type: data.type as string,
      });
      return res
        .status(200)
        .json({ msg: 'Recived-email sent it successufully' });
    } catch (error) {
      return res.status(400).json({ msg: error });
    }
  }
}
