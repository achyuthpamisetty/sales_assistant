import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react'; // or use any other icon library for the Salesforce logo

const Integrations = () => {
  const [isConnected, setIsConnected] = useState(false); // Track Salesforce connection state
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>(''); // Track environment selection

  const handleConnect = (env: string) => {
    setSelectedEnvironment(env);
    // Here, you would trigger your Salesforce OAuth flow depending on the selected environment.
    console.log(`Connecting to Salesforce ${env}`);
    // Simulate the OAuth flow or Salesforce integration logic here
    setIsConnected(true); // Set as connected for now to simulate
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center space-x-4">
        <MessageSquare className="h-8 w-8 text-blue-600" /> {/* Replace with Salesforce logo */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Salesforce Integration</h1>
          <p className="text-slate-600">Connect to your Salesforce account.</p>
        </div>
      </div>

      {!isConnected ? (
        <div className="mt-6 border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-800">Connect to Salesforce</h2>
              <p className="text-sm text-slate-600">Choose your environment:</p>
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => handleConnect('Production')}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Production
            </button>
            <button
              onClick={() => handleConnect('Sandbox')}
              className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
            >
              Sandbox
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-800">Connected to Salesforce</h2>
              <p className="text-sm text-slate-600">You are connected to the {selectedEnvironment} environment.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Integrations;
