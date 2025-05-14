import React, { useState } from 'react';

// Add your logo imports here
import salesforceLogo from '@/images/salesforce-logo.png';
import googleCalendarLogo from '@/images/google-calendar-logo.png';
import gmailLogo from '@/images/gmail-logo.png';
import outreachLogo from '@/images/outreach-logo.png';
import zoominfoLogo from '@/images/zoominfo-logo.png';

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
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Integrations</h1>

        {/* Logos with Connect buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div className="text-center cursor-pointer" onClick={() => setSelectedIntegration('salesforce')}>
            <img src={salesforceLogo} alt="Salesforce" className="mx-auto w-24 h-24 mb-4" />
            <p className="text-sm font-semibold">Salesforce</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 mt-2">
              Connect
            </button>
          </div>

          <div className="text-center cursor-pointer" onClick={() => setSelectedIntegration('google-calendar')}>
            <img src={googleCalendarLogo} alt="Google Calendar" className="mx-auto w-24 h-24 mb-4" />
            <p className="text-sm font-semibold">Google Calendar</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 mt-2">
              Connect
            </button>
          </div>

          <div className="text-center cursor-pointer" onClick={() => setSelectedIntegration('gmail')}>
            <img src={gmailLogo} alt="Gmail" className="mx-auto w-24 h-24 mb-4" />
            <p className="text-sm font-semibold">Gmail</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 mt-2">
              Connect
            </button>
          </div>

          <div className="text-center cursor-pointer" onClick={() => setSelectedIntegration('outreach')}>
            <img src={outreachLogo} alt="Outreach" className="mx-auto w-24 h-24 mb-4" />
            <p className="text-sm font-semibold">Outreach</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 mt-2">
              Connect
            </button>
          </div>

          <div className="text-center cursor-pointer" onClick={() => setSelectedIntegration('zoominfo')}>
            <img src={zoominfoLogo} alt="Zoominfo" className="mx-auto w-24 h-24 mb-4" />
            <p className="text-sm font-semibold">Zoominfo</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 mt-2">
              Connect
            </button>
          </div>
        </div>

        {selectedIntegration ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-8">
            <h2 className="text-2xl font-bold mb-4">
              {`Connect to ${selectedIntegration.charAt(0).toUpperCase() + selectedIntegration.slice(1)}`}
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
