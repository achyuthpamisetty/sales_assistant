import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  error?: string;
  details?: any;
  [key: string]: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' });
  }

  const { code } = req.body;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid authorization code' });
  }

  const clientId = process.env.VITE_SF_CLIENT_ID;
  const clientSecret = process.env.VITE_SF_CLIENT_SECRET;
  const redirectUri = process.env.VITE_SF_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return res.status(500).json({ error: 'Server configuration error: missing Salesforce environment variables' });
  }

  const tokenUrl = 'https://login.salesforce.com/services/oauth2/token';

  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
  });

  try {
    const response = await axios.post(tokenUrl, data.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return res.status(200).json(response.data);
  } catch (error: any) {
    return res.status(500).json({
      error: 'Token exchange failed',
      details: error.response?.data || error.message || 'Unknown error',
    });
  }
}
