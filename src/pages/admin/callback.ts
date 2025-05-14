// pages/api/salesforce/callback.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).send('Missing authorization code.');
  }

  try {
    const response = await axios.post(
      `${process.env.SF_LOGIN_URL}/services/oauth2/token`,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: process.env.NEXT_PUBLIC_SF_CLIENT_ID!,
        client_secret: process.env.SF_CLIENT_SECRET!,
        redirect_uri: process.env.NEXT_PUBLIC_SF_REDIRECT_URI!,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const data = response.data;
    // Optionally store access token in session or cookies
    return res.status(200).json({
      message: 'Salesforce connected successfully!',
      data,
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Salesforce OAuth failed.', error: error.response?.data || error.message });
  }
}
