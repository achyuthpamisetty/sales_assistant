import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function SalesforceCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const code = searchParams.get('code');
      if (!code) return; // Wait until code is available

      try {
        const res = await axios.post('/api/salesforce/token', { code });
        const { access_token, instance_url } = res.data;

        // Optionally store tokens or fetch data here, e.g., localStorage

        navigate('/integrations?success=true');
      } catch (err) {
        console.error('Token exchange failed', err);
      }
    };

    exchangeCodeForToken();
  }, [searchParams, navigate]);

  return <div>Connecting to Salesforce...</div>;
}
