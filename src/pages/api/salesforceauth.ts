// pages/api/salesforce/auth.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { env } = req.query;

  const clientId = process.env.SF_CLIENT_ID;
  const redirectUri = process.env.SF_REDIRECT_URI;

  const baseUrl = env === 'sandbox' ? 'https://test.salesforce.com' : 'https://login.salesforce.com';

  const url = `${baseUrl}/services/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=api refresh_token`;

  res.redirect(url);
}
