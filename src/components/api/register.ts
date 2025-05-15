import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, name, company } = req.body;

    if (email && password && name && company) {
      res.status(200).json({ message: 'User registered successfully' });
    } else {
      res.status(400).json({ error: 'All fields are required' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
