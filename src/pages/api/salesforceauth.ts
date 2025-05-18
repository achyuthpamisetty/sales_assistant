import express from 'express';

const app = express();

app.get('/api/salesforce/oauth', (req, res) => {
  const env = req.query.env as string | undefined;

  // Use environment variables from process.env (make sure they are defined)
  const clientId = process.env.VITE_SF_CLIENT_ID;
  const redirectUri = process.env.VITE_SF_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(500).json({ error: 'Missing Salesforce client ID or redirect URI in env variables' });
  }

  const baseUrl = env === 'sandbox' ? 'https://test.salesforce.com' : 'https://login.salesforce.com';

  const url = `${baseUrl}/services/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=api refresh_token`;

  return res.redirect(url);
});

// Export your app or start the server somewhere else
export default app;
