import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.body;

  // You can optionally support sandbox here by passing env param in req.body or query
  // For now, keep production token URL to match your current auth flow
  const tokenUrl = 'https://login.salesforce.com/services/oauth2/token';

  // Use process.env for secrets (server-side)
  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: process.env.SF_CLIENT_ID!,
    client_secret: process.env.SF_CLIENT_SECRET!,
    redirect_uri: process.env.SF_REDIRECT_URI!
  });

  try {
    const response = await axios.post(tokenUrl, data.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: 'Token exchange failed', details: err.response?.data || err.message });
  }
}
