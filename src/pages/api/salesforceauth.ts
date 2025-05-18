import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { env } = req.query;

  // Use process.env, not import.meta.env in Next.js
  const clientId = process.env.NEXT_PUBLIC_SF_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_SF_REDIRECT_URI;

  const baseUrl = env === 'sandbox' ? 'https://test.salesforce.com' : 'https://login.salesforce.com';

  const url = `${baseUrl}/services/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=api refresh_token`;

  res.redirect(url);
}
