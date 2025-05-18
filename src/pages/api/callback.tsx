import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function SalesforceCallback() {
  const router = useRouter();

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const code = router.query.code as string;
      if (!code) return;  // Wait until code is available

      try {
        const res = await axios.post('/api/salesforce/token', { code });
        const { access_token, instance_url } = res.data;

        // Optionally store tokens or fetch data here

        router.push(`/integrations?success=true`);
      } catch (err) {
        console.error('Token exchange failed', err);
      }
    };

    exchangeCodeForToken();
  }, [router.query.code]);

  return <div>Connecting to Salesforce...</div>;
}
