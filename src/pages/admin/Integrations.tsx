import React, { useState } from 'react';
import salesforceLogo from '@/assets/salesforce-logo.png'; // Adjust path to your actual static asset

const Integrations = () => {
  const [salesforceEnv, setSalesforceEnv] = useState<'sandbox' | 'production' | ''>('');

  const handleConnect = () => {
    if (salesforceEnv) {
      alert(`Connecting to Salesforce ${salesforceEnv}`);
    } else {
      alert('Please select an environment');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        {/* Salesforce Logo */}
        <img
          src={salesforceLogo}
          alt="Salesforce"
          className="mx-auto w-24 h-24 mb-4"
        />

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Connect to Salesforce
        </h2>

        <select
          value={salesforceEnv}
          onChange={(e) => setSalesforceEnv(e.target.value as 'sandbox' | 'production')}
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Environment</option>
          <option value="sandbox">Sandbox</option>
          <option value="production">Production</option>
        </select>

        <button
          onClick={handleConnect}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default Integrations;
