'use client';

import React, { useState } from 'react';

// Logo imports
import salesforceLogo from '@/images/salesforce-logo.png';
import googleCalendarLogo from '@/images/google-calendar-logo.png';
import gmailLogo from '@/images/gmail-logo.png';
import outreachLogo from '@/images/outreach-logo.png';
import zoominfoLogo from '@/images/zoominfo-logo.png';

// Salesforce OAuth URL builder
const getSalesforceAuthUrl = (env: 'sandbox' | 'production') => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_SF_CLIENT_ID!;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_SF_REDIRECT_URI!;
  const domain = env === 'sandbox' ? 'test.salesforce.com' : 'login.salesforce.com';

  return `https://${domain}/services/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}`;
};

const Integrations = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [salesforceEnv, setSalesforceEnv] = useState<'sandbox' | 'production' | ''>('');

  const handleConnect = () => {
    if (selectedIntegration === 'salesforce') {
      if (!salesforceEnv) {
        alert('Please select an environment');
        return;
      }
      const authUrl = getSalesforceAuthUrl(salesforceEnv);
      window.location.href = authUrl;
    } else if (selectedIntegration) {
      alert(`Connecting to ${selectedIntegration}`);
    } else {
      alert('Please select an integration');
    }
  };

  const renderConnectionOptions = () => {
    switch (selectedIntegration) {
      case 'salesforce':
        return (
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
        );
      case 'google-calendar':
      case 'gmail':
      case 'outreach':
      case 'zoominfo':
        return <p>Connecting to {selectedIntegration.charAt(0).toUpperCase() + selectedIntegration.slice(1)}</p>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Integrations</h1>

        {/* Logos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {[
            { key: 'salesforce', label: 'Salesforce', logo: salesforceLogo },
            { key: 'google-calendar', label: 'Google Calendar', logo: googleCalendarLogo },
            { key: 'gmail', label: 'Gmail', logo: gmailLogo },
            { key: 'outreach', label: 'Outreach', logo: outreachLogo },
            { key: 'zoominfo', label: 'Zoominfo', logo: zoominfoLogo },
          ].map(({ key, label, logo }) => (
            <div
              key={key}
              className="text-center cursor-pointer"
              onClick={() => setSelectedIntegration(key)}
            >
              <img src={logo} alt={label} className="mx-auto w-24 h-24 mb-4" />
              <p className="text-sm font-semibold">{label}</p>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 mt-2">
                Connect
              </button>
            </div>
          ))}
        </div>

        {selectedIntegration ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-8">
            <h2 className="text-2xl font-bold mb-4">
              Connect to {selectedIntegration.charAt(0).toUpperCase() + selectedIntegration.slice(1)}
            </h2>

            {renderConnectionOptions()}

            <button
              onClick={handleConnect}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Connect
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-6">Select an integration from the options above.</p>
        )}
      </div>
    </div>
  );
};

export default Integrations;
