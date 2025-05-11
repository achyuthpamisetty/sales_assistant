import React from 'react';
import { ChevronRight, Mail, Phone, Calendar, FileText } from 'lucide-react';

interface Activity {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note';
  title: string;
  date: string;
  description: string;
  contact?: string;
  account?: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-500" />;
      case 'call':
        return <Phone className="h-4 w-4 text-green-500" />;
      case 'meeting':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'note':
        return <FileText className="h-4 w-4 text-amber-500" />;
      default:
        return <FileText className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
      </div>
      <div className="divide-y">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="flex items-start p-4 hover:bg-slate-50 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
              {getIcon(activity.type)}
            </div>
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">{activity.title}</h3>
                <p className="text-xs text-slate-500">{activity.date}</p>
              </div>
              <p className="mt-1 text-sm text-slate-600">{activity.description}</p>
              {(activity.contact || activity.account) && (
                <div className="mt-2">
                  {activity.contact && (
                    <span className="mr-2 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                      {activity.contact}
                    </span>
                  )}
                  {activity.account && (
                    <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                      {activity.account}
                    </span>
                  )}
                </div>
              )}
            </div>
            <button 
              className="ml-2 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="border-t p-3">
        <button className="flex w-full items-center justify-center rounded-md bg-slate-100 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;