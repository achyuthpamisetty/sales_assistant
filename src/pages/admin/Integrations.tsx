import React from 'react';
import { CheckCircle2, XCircle, Zap, Mail, MessageSquare, Phone, Calendar, Cloud, Video } from 'lucide-react';

const integrations = [
  {
    id: '1',
    name: 'Salesforce',
    description: 'CRM data sync with full opportunity tracking.',
    icon: <Cloud className="h-6 w-6 text-blue-700" />,
    connected: true,
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

// Rest of the component remains the same...
