// components/SalesforceConnect.ts

export const getSalesforceAuthUrl = (env: 'sandbox' | 'production') => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_SF_CLIENT_ID!;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_SF_REDIRECT_URI!;
  const domain = env === 'sandbox' ? 'test.salesforce.com' : 'login.salesforce.com';

  return `https://${domain}/services/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}`;
};
