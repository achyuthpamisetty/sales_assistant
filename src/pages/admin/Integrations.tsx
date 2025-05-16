import React, { useState } from 'react';

const Integrations = () => {
  const [connectionType, setConnectionType] = useState<'salesforce' | null>(null);
  const [salesforceEnv, setSalesforceEnv] = useState<'sandbox' | 'production' | null>(null);

  const handleConnect = () => {
    if (salesforceEnv) {
      alert(`Connecting to Salesforce ${salesforceEnv}`);
    } else {
      alert('Please select a Salesforce environment (Sandbox or Production)');
    }
  };

  return (
    <div className="flex h-full min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-4">Integrations</h1>
        <ul>
          <li>
            <button
              onClick={() => setConnectionType('salesforce')}
              className={`w-full text-left py-2 px-4 rounded-lg ${
                connectionType === 'salesforce' ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              Connect to Salesforce
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {connectionType === 'salesforce' ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2">Salesforce Integration</h2>
            <p className="text-gray-600 mb-4">Select the environment you want to connect to:</p>

            <div className="space-y-2">
              <button
                onClick={() => setSalesforceEnv('sandbox')}
                className={`w-full py-2 px-4 rounded-lg text-white ${
                  salesforceEnv === 'sandbox' ? 'bg-blue-500' : 'bg-gray-400'
                }`}
              >
                Sandbox
              </button>
              <button
                onClick={() => setSalesforceEnv('production')}
                className={`w-full py-2 px-4 rounded-lg text-white ${
                  salesforceEnv === 'production' ? 'bg-blue-500' : 'bg-gray-400'
                }`}
              >
                Production
              </button>
            </div>

            <button
              onClick={handleConnect}
              className="mt-6 w-full py-2 px-4 rounded-lg bg-green-600 text-white font-semibold"
            >
              Connect to {salesforceEnv ? salesforceEnv : 'Salesforce'}
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">Select an integration from the sidebar.</p>
        )}
      </div>
    </div>
  );
};

export default Integrations;
