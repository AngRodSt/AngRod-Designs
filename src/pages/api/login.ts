import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/lib/dbConnect';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '@/modules/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();
  //POST method
  if (req.method === 'POST') {
    const data = req.body;

    const { email, password } = data;

    try {
      //Find the credential of the admin
      const user = await User.findOne({ email });
      if (!user)
        return res.status(401).json({ msg: 'User not found', error: true });

      //Verifying if the passwords match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ msg: 'Incorrect Password', error: true });

      //Saving the token in the cookis for the meddleware
      const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '15d' }
      );

      res.setHeader(
        'Set-Cookie',
        `UserToken=${token}; Path=/; HttpOnly; SameSite=Lax`
      );
      return res.status(200).json({ msg: 'Bienvenido Admin' });
    } catch (error) {
      return res.status(401).json({
        msg:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }
}
