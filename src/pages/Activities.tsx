```typescript
import React, { useState } from 'react';
import { 
  MessageSquare, Phone, Calendar, FileText, Plus,
  Mail, Search, Filter, ChevronDown 
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  title: string;
  date: string;
  description: string;
  contact?: string;
  account?: string;
}

interface ActivityFormData {
  type: 'call' | 'email' | 'meeting' | 'note';
  title: string;
  description: string;
  contact: string;
  account: string;
  date: string;
}

const Activities = () => {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [activities] = useState<Activity[]>([
    {
      id: '1',
      type: 'call',
      title: 'Discovery Call with TechCorp',
      date: '2024-03-15 10:00 AM',
      description: 'Initial discussion about their needs and our solutions',
      contact: 'Sarah Thompson',
      account: 'TechCorp'
    },
    {
      id: '2',
      type: 'email',
      title: 'Follow-up Email',
      date: '2024-03-14 2:30 PM',
      description: 'Sent product specifications and pricing details',
      contact: 'John Davis',
      account: 'Innovate Inc'
    },
    // Add more activities as needed
  ]);

  const [formData, setFormData] = useState<ActivityFormData>({
    type: 'call',
    title: '',
    description: '',
    contact: '',
    account: '',
    date: new Date().toISOString().slice(0, 16)
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle activity creation logic here
    console.log('Creating activity:', formData);
    setShowAddActivity(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-5 w-5 text-green-500" />;
      case 'email': return <Mail className="h-5 w-5 text-blue-500" />;
      case 'meeting': return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'note': return <FileText className="h-5 w-5 text-amber-500" />;
      default: return <MessageSquare className="h-5 w-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Activities</h1>
          <p className="text-slate-500">Track and manage all sales activities</p>
        </div>
        <button
          onClick={() => setShowAddActivity(true)}
          className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Log Activity
        </button>
      </div>

      {/* Add Activity Modal */}
      {showAddActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Log New Activity</h2>
              <button 
                onClick={() => setShowAddActivity(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                >
                  <option value="call">Call</option>
                  <option value="email">Email</option>
                  <option value="meeting">Meeting</option>
                  <option value="note">Note</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Contact</label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Account</label>
                  <input
                    type="text"
                    value={formData.account}
                    onChange={(e) => setFormData({...formData, account: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Date & Time</label>
                <input
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddActivity(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
                >
                  Log Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search activities..."
            className="w-full pl-9 pr-4 py-2 rounded-md border border-slate-300"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md border border-slate-300 hover:bg-slate-50">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Activity List */}
      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-slate-200">
          {activities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-slate-100 p-2">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-slate-900">{activity.title}</h3>
                    <span className="text-sm text-slate-500">{activity.date}</span>
                  </div>
                  <p className="mt-1 text-slate-600">{activity.description}</p>
                  {(activity.contact || activity.account) && (
                    <div className="mt-2 flex items-center gap-2">
                      {activity.contact && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {activity.contact}
                        </span>
                      )}
                      {activity.account && (
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                          {activity.account}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;
```