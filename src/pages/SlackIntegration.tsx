import React from 'react';
import { MessageSquare, CheckCircle2, XCircle } from 'lucide-react';

const SlackIntegration = () => {
  const isConnected = false; // Default set to false, i.e., Not Connected

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center space-x-4">
        <MessageSquare className="h-8 w-8 text-purple-600" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Slack Integration</h1>
          <p className="text-slate-600">Manage your Slack workspace connection.</p>
        </div>
      </div>

      <div className="mt-6 border rounded-lg p-4 bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-800">Status</h2>
            <p className="text-sm text-slate-600">
              {isConnected ? 'Slack is currently connected.' : 'Slack is not connected.'}
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

        <div className="mt-4">
          <button
            className={`text-sm px-4 py-2 rounded-md ${
              isConnected
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isConnected ? 'Manage Settings' : 'Connect to Slack'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlackIntegration;
