import React, { useState } from 'react';

const Integrations = () => {
  const [connectionType, setConnectionType] = useState(null);
  const [salesforceEnv, setSalesforceEnv] = useState(null);

  const handleConnect = () => {
    if (salesforceEnv) {
      alert(`Connecting to Salesforce ${salesforceEnv}`);
    } else {
      alert('Please select a Salesforce environment (Sandbox or Production)');
    }
  };

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Integrations</h1>
        <nav className="mt-6">
          <ul>
            <li>
              <button
                className={`w-full text-left py-2 px-4 rounded-lg ${
                  connectionType === 'salesforce' ? 'bg-blue-600' : 'bg-gray-700'
                }`}
                onClick={() => setConnectionType('salesforce')}
              >
                Connect to Salesforce
              </button>
            </li>
            {/* You can add more integration options here */}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {connectionType === 'salesforce' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Salesforce Integration</h2>
            <p className="text-sm text-slate-600">
              Select your Salesforce environment for integration.
            </p>

            {/* Environment Selection */}
            <div className="space-y-4">
              <button
                className={`w-full py-2 px-4 rounded-lg text-white ${
                  salesforceEnv === 'sandbox' ? 'bg-blue-500' : 'bg-gray-400'
                }`}
                onClick={() => setSalesforceEnv('sandbox')}
              >
                Sandbox
              </button>
              <button
                className={`w-full py-2 px-4 rounded-lg text-white ${
                  salesforceEnv === 'production' ? 'bg-blue-500' : 'bg-gray-400'
                }`}
                onClick={() => setSalesforceEnv('production')}
              >
                Production
              </button>
            </div>

            {/* Connect Button */}
            <button
              onClick={handleConnect}
              className="mt-6 w-full py-2 px-4 rounded-lg bg-green-600 text-white font-semibold"
            >
              Connect to {salesforceEnv ? salesforceEnv : 'Salesforce'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Integrations;
