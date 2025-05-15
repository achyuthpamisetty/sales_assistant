import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Dummy login logic
    if (email && password) {
      res.status(200).json({
        user: { isVerified: true },
        token: 'fake-jwt-token'
      });
    } else {
      res.status(400).json({ error: 'Missing email or password' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
