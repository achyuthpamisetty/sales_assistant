import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Zap,
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  Cloud,
  Video,
} from 'lucide-react';

// Constants for Salesforce OAuth
const SALESFORCE_CLIENT_ID = 'YOUR_SALESFORCE_CLIENT_ID';
const SALESFORCE_REDIRECT_URI = 'YOUR_REDIRECT_URI'; // e.g., http://localhost:3000/oauth/callback
const SALESFORCE_AUTH_URL = `https://login.salesforce.com/services/oauth2/authorize?response_type=token&client_id=${SALESFORCE_CLIENT_ID}&redirect_uri=${encodeURIComponent(SALESFORCE_REDIRECT_URI)}`;

// Salesforce connect handler
const handleSalesforceConnect = () => {
  window.location.href = SALESFORCE_AUTH_URL;
};

const integrations = [
  {
    id: '1',
    name: 'Salesforce',
    description: 'CRM data sync with full opportunity tracking.',
    icon: <Cloud className="h-6 w-6 text-blue-700" />,
    connected: false,
    onConnect: handleSalesforceConnect,
  },
  {
    id: '2',
    name: 'Gmail',
    description: 'Email tracking, sync and contact management.',
    icon: <Mail className="h-6 w-6 text-red-600" />,
    connected: true,
  },
  {
    id: '3',
    name: 'Zoom',
    description: 'Schedule and manage sales meetings easily.',
    icon: <Video className="h-6 w-6 text-blue-600" />,
    connected: false,
  },
  {
    id: '4',
    name: 'HubSpot',
    description: 'Sync contacts and log activities.',
    icon: <Zap className="h-6 w-6 text-orange-500" />,
    connected: false,
  },
  {
    id: '5',
    name: 'Slack',
    description: 'Instant team communication and deal updates.',
    icon: <MessageSquare className="h-6 w-6 text-purple-600" />,
    connected: true,
  },
  {
    id: '6',
    name: 'Calendly',
    description: 'Share availability and schedule demos.',
    icon: <Calendar className="h-6 w-6 text-emerald-600" />,
    connected: true,
  },
  {
    id: '7',
    name: 'Twilio',
    description: 'Automated calls and SMS for outbound engagement.',
    icon: <Phone className="h-6 w-6 text-red-600" />,
    connected: false,
  },
];

const Integrations = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">App Integrations</h1>
          <p className="text-slate-600 mb-4">
            Connect the tools your sales team already uses to streamline your workflow.
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Add New Integration
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="flex flex-col justify-between border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center space-x-3 mb-3">
                {integration.icon}
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{integration.name}</h2>
                  <p className="text-sm text-slate-500">{integration.description}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span
                className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
                  integration.connected
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {integration.connected ? (
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
              <button
                onClick={() => integration.onConnect?.()}
                className={`text-sm font-medium px-3 py-1.5 rounded-md transition ${
                  integration.connected
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={integration.connected}
              >
                {integration.connected ? 'Manage' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integrations;
