import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
const SlackComponent: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const handleConnect = () => {
    // Simulate connecting to Slack
    setIsConnected(true);
    // Here you would typically handle the actual connection logic
  };
  return (
    <div className="p-6">
      {isConnected ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <h1 className="text-lg font-semibold text-green-800">Slack Connected!</h1>
          <p className="text-sm text-green-600">You are now connected to Slack. Enjoy seamless communication!</p>
        </div>
      ) : (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h1 className="text-lg font-semibold text-blue-800">Connect to Slack</h1>
          <p className="text-sm text-blue-600">Click the button below to connect your Slack account.</p>
          <button 
            onClick={handleConnect} 
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Connect to Slack
          </button>
        </div>
      )}
    </div>
  );
};
export default SlackComponent;
