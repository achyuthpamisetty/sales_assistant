import React, { useState } from 'react';
import { Salesforce } from 'lucide-react';  // Assuming you are using Lucide icons

const Integrations = () => {
  const [isConnected, setIsConnected] = useState(false); // Track connection state
  const [connectionType, setConnectionType] = useState<'Production' | 'Sandbox' | null>(null);

  const handleConnectToSalesforce = (type: 'Production' | 'Sandbox') => {
    setConnectionType(type);
    // Simulate connecting logic
    setIsConnected(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4">
        <Salesforce className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Salesforce Integration</h1>
          <p className="text-slate-600">Manage your Salesforce integration and connection.</p>
        </div>
      </div>

      <div className="mt-6 border rounded-lg p-4 bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-800">Connection Status</h2>
            <p className="text-sm text-slate-600">
              {isConnected
                ? `Salesforce is connected to ${connectionType} environment.`
                : 'Salesforce is not connected.'}
            </p>
          </div>
          <span
            className={`inline-flex items-center text-sm font-medium px-3 py-1.5 rounded-full ${
              isConnected
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {isConnected ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Connected
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 mr-1" />
                Not Connected
              </>
            )}
          </span>
        </div>

        {!isConnected && (
          <div className="mt-4">
            <p className="text-slate-600 mb-2">Choose your Salesforce environment to connect:</p>
            <div className="flex space-x-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => handleConnectToSalesforce('Production')}
              >
                Connect to Production
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => handleConnectToSalesforce('Sandbox')}
              >
                Connect to Sandbox
              </button>
            </div>
          </div>
        )}

        {isConnected && (
          <div className="mt-4">
            <button
              className="text-sm px-4 py-2 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              Manage Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Integrations;
