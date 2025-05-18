import React, { useState } from 'react';

const SF_CLIENT_ID = import.meta.env.VITE_SF_CLIENT_ID;
const SF_REDIRECT_URI = import.meta.env.VITE_SF_REDIRECT_URI;

const Integrations = () => {
  const [connectionType, setConnectionType] = useState<'salesforce' | ''>('');
  const [salesforceEnv, setSalesforceEnv] = useState<'sandbox' | 'production' | ''>('');

const handleConnect = () => {
  if (!salesforceEnv) {
    alert('Please select a Salesforce environment');
    return;
  }

  // Force sandbox URL for Trailhead playground
  const baseUrl = 'https://test.salesforce.com';
const authUrl = `${baseUrl}/services/oauth2/authorize?response_type=code&client_id=${encodeURIComponent(SF_CLIENT_ID)}&redirect_uri=${encodeURIComponent(SF_REDIRECT_URI)}&scope=api%20refresh_token`;

window.location.href = authUrl;
};

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-6">Integrations</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-medium mb-4">CRM Connections</h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Select Integration</label>
            <select
              value={connectionType}
              onChange={(e) => setConnectionType(e.target.value as 'salesforce' | '')}
              className="mt-1 block w-full rounded border-gray-300"
            >
              <option value="">-- Select an integration --</option>
              <option value="salesforce">Salesforce</option>
            </select>
          </div>

          {connectionType === 'salesforce' && (
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Select Environment</label>
                <select
                  value={salesforceEnv}
                  onChange={(e) => setSalesforceEnv(e.target.value as 'sandbox' | 'production' | '')}
                  className="mt-1 block w-full rounded border-gray-300"
                >
                  <option value="">-- Select environment --</option>
                  <option value="sandbox">Sandbox</option>
                  <option value="production">Production</option>
                </select>
              </div>

              <button
                onClick={handleConnect}
                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Connect to Salesforce
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
