// pages/api/salesforce/auth.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientId = process.env.NEXT_PUBLIC_SF_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_SF_REDIRECT_URI;
  const loginUrl = process.env.SF_LOGIN_URL;

  const salesforceAuthUrl = `${loginUrl}/services/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  res.redirect(salesforceAuthUrl);
}
