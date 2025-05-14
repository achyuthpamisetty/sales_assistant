import React, { useState } from 'react';

const Integrations = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [salesforceEnv, setSalesforceEnv] = useState<'sandbox' | 'production' | ''>('');
  
  const handleConnect = () => {
    if (selectedIntegration === 'salesforce' && salesforceEnv) {
      alert(`Connecting to Salesforce ${salesforceEnv}`);
    } else if (selectedIntegration && !salesforceEnv) {
      alert(`Connecting to ${selectedIntegration}`);
    } else {
      alert('Please select an environment');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-4">Integrations</h1>
        <ul>
          <li>
            <button
              onClick={() => setSelectedIntegration('salesforce')}
              className={`w-full text-left py-2 px-4 rounded-lg ${selectedIntegration === 'salesforce' ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              Salesforce
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedIntegration('google-calendar')}
              className={`w-full text-left py-2 px-4 rounded-lg ${selectedIntegration === 'google-calendar' ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              Google Calendar
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedIntegration('gmail')}
              className={`w-full text-left py-2 px-4 rounded-lg ${selectedIntegration === 'gmail' ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              Gmail
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedIntegration('outreach')}
              className={`w-full text-left py-2 px-4 rounded-lg ${selectedIntegration === 'outreach' ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              Outreach
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedIntegration('zoominfo')}
              className={`w-full text-left py-2 px-4 rounded-lg ${selectedIntegration === 'zoominfo' ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              Zoominfo
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {selectedIntegration ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">
              {`Connect to ${selectedIntegration.charAt(0).toUpperCase() + selectedIntegration.slice(1)}`}
            </h2>

            {selectedIntegration === 'salesforce' && (
              <div>
                <p className="text-gray-600 mb-4">Select the environment you want to connect to:</p>
                <select
                  value={salesforceEnv}
                  onChange={(e) => setSalesforceEnv(e.target.value as 'sandbox' | 'production')}
                  className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Environment</option>
                  <option value="sandbox">Sandbox</option>
                  <option value="production">Production</option>
                </select>
              </div>
            )}

            <button
              onClick={handleConnect}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Connect
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
