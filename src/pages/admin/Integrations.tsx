import React, { useState } from 'react';

const Integrations = () => {
  const [connectionType, setConnectionType] = useState<'salesforce' | null>(null);
  const [salesforceEnv, setSalesforceEnv] = useState<'sandbox' | 'production' | null>(null);

  const handleConnect = () => {
    if (salesforceEnv) {
      // Redirect to your custom OAuth login handler
      const baseUrl =
        salesforceEnv === 'sandbox'
          ? 'https://test.salesforce.com'
          : 'https://login.salesforce.com';

      const authUrl = `${baseUrl}/services/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_SF_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        process.env.NEXT_PUBLIC_SF_REDIRECT_URI!
      )}&scope=api refresh_token`;

      window.location.href = authUrl;
    } else {
      alert('Please select a Salesforce environment');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Integrations</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-800 mb-4">CRM Connections</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Integration
            </label>
            <select
              value={connectionType || ''}
              onChange={(e) => setConnectionType(e.target.value as 'salesforce')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">-- Select an integration --</option>
              <option value="salesforce">Salesforce</option>
              {/* Add more options here as you expand */}
            </select>
          </div>

          {connectionType === 'salesforce' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Environment
                </label>
                <select
                  value={salesforceEnv || ''}
                  onChange={(e) => setSalesforceEnv(e.target.value as 'sandbox' | 'production')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">-- Select environment --</option>
                  <option value="sandbox">Sandbox</option>
                  <option value="production">Production</option>
                </select>
              </div>

              <button
                onClick={handleConnect}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
