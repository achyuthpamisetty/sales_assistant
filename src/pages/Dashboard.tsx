import React from 'react';
import { Link } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import StatCard from '../components/dashboard/StatCard';
import OpportunityChart from '../components/dashboard/OpportunityChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import AiSuggestions from '../components/dashboard/AiSuggestions';
import TeamCollaboration from '../components/dashboard/TeamCollaboration';
import { Users, Briefcase, PhoneCall, TrendingUp, ArrowRight, DollarSign, Flame, Award, Calendar, Mail, HelpCircle, BarChart2 } from 'lucide-react';

// Dummy data for demonstration
const teamLeaderboard = [
  { name: 'Alice Johnson', deals: 15, revenue: 120000 },
  { name: 'Bob Smith', deals: 12, revenue: 95000 },
  { name: 'Priya Patel', deals: 10, revenue: 87000 },
];
const recentComms = [
  { type: 'email', who: 'Sarah Parker', when: 'Today, 9:15 AM', subject: 'Intro to SalesAI Pro' },
  { type: 'call', who: 'Tom Nguyen', when: 'Yesterday, 4:00 PM', subject: 'Follow-up Call' },
  { type: 'email', who: 'Olivia Lee', when: 'Yesterday, 11:30 AM', subject: 'Proposal Sent' },
];
const companyNews = [
  { headline: 'Acme Corp wins CRM Innovation Award 2025', url: '#' },
  { headline: 'Quarterly earnings exceed expectations', url: '#' },
];
const helpLinks = [
  { label: 'Getting Started Guide', url: '#' },
  { label: 'CRM Video Tutorials', url: '#' },
  { label: 'Contact Support', url: '#' },
];

const Dashboard = () => {
  const { leads, accounts, contacts, opportunities, loading } = useSalesforce();
  const userName = "John Doe"; // Replace with real user name if available

  // Add sample leads with leadScore and more fields
  const sampleLeads = [
    { id: 'l1', firstName: 'Sarah', lastName: 'Parker', email: 'sarah@example.com', company: 'Acme Corp', phone: '+1 555-1234', salesforceUrl: 'https://your-instance.salesforce.com/l1', leadScore: 82 },
    { id: 'l2', firstName: 'Tom', lastName: 'Nguyen', email: 'tom@example.com', company: 'Dev Solutions', phone: '+1 555-5678', salesforceUrl: 'https://your-instance.salesforce.com/l2', leadScore: 91 },
    { id: 'l3', firstName: 'Olivia', lastName: 'Lee', email: 'olivia@example.com', company: 'HealthFirst', phone: '+1 555-8765', salesforceUrl: 'https://your-instance.salesforce.com/l3', leadScore: 78 },
    { id: 'l4', firstName: 'James', lastName: 'Patel', email: 'james@example.com', company: 'FinTech Ltd', phone: '+1 555-4321', salesforceUrl: 'https://your-instance.salesforce.com/l4', leadScore: 60 },
  ];
  const leadsToUse = (leads.length === 0 ? sampleLeads : leads).map(lead => ({
    ...lead,
    leadScore: lead.leadScore ?? Math.floor(Math.random() * 50 + 50),
  }));

  const highScoringLeads = leadsToUse.filter(lead => lead.leadScore > 75);

  const totalRevenue = opportunities
    .filter(opp => opp.stage === 'Closed Won')
    .reduce((sum, opp) => sum + opp.amount, 11900);

  const recentActivities = [
    {
      id: '1',
      type: 'call',
      title: 'Call with David Chen',
      date: 'Today, 2:30 PM',
      description: 'Discussed technical requirements for platform upgrade',
      contact: 'David Chen',
      account: 'Cloudburst Technologies',
    },
    {
      id: '2',
      type: 'email',
      title: 'Email to Priya Patel',
      date: 'Today, 11:15 AM',
      description: 'Sent follow-up about product roadmap discussion',
      contact: 'Priya Patel',
      account: 'Cloudburst Technologies',
    },
    {
      id: '3',
      type: 'meeting',
      title: 'Contract Review Meeting',
      date: 'Yesterday',
      description: 'Reviewed terms with legal team and purchasing',
      contact: 'Robert Johnson',
      account: 'Summit Financial Group',
    },
    {
      id: '4',
      type: 'note',
      title: 'New Lead Qualification',
      date: '2 days ago',
      description: 'Emma Williams shows high interest in data management solutions',
      contact: 'Emma Williams',
      account: 'HealthFirst Technologies',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-slate-200"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="h-96 animate-pulse rounded-lg bg-slate-200"></div>
          <div className="h-96 animate-pulse rounded-lg bg-slate-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* 1. Personalized Welcome */}
      <div className="flex items-center gap-4 py-2">
        <span className="text-2xl">👋</span>
        <h1 className="text-2xl font-bold text-slate-900">Good morning, {userName}!</h1>
      </div>

      {/* 2. Quick Actions */}
      <div className="flex gap-3 flex-wrap">
        <Link to="/leads/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          <Users size={18} /> Add Lead
        </Link>
        <Link to="/opportunities/new" className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition">
          <Briefcase size={18} /> New Opportunity
        </Link>
        <Link to="/activities/new" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
          <PhoneCall size={18} /> Log Activity
        </Link>
        <Link to="/import" className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
          <BarChart2 size={18} /> Import Data
        </Link>
      </div>

      {/* 3. Reminders & Alerts */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 flex items-center gap-4 shadow-sm">
        <span className="text-yellow-600 text-xl"><Flame /></span>
        <div>
          <p className="font-semibold">Reminders</p>
          <ul className="list-disc list-inside text-sm text-yellow-800">
            <li>3 opportunities need follow-up today</li>
            <li>2 tasks are overdue</li>
            <li>New lead assigned: Emma Williams</li>
          </ul>
        </div>
      </div>

      {/* 4. Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toLocaleString()}`} 
          change={15.8} 
          icon={DollarSign} 
          color="bg-green-600"
        />
        <StatCard 
          title="Leads" 
          value={leads.length} 
          change={5.2}
          icon={Users} 
          color="bg-blue-600"
        />
        <StatCard 
          title="Accounts" 
          value={accounts.length} 
          change={2.3} 
          icon={Briefcase} 
          color="bg-indigo-600"
        />
        <StatCard 
          title="Contacts" 
          value={contacts.length} 
          change={-1.5} 
          icon={PhoneCall} 
          color="bg-violet-600"
        />
        <StatCard 
          title="Open Opportunities" 
          value={`$${(1750000).toLocaleString()}`} 
          change={12.5} 
          icon={TrendingUp} 
          color="bg-teal-600"
        />
      </div>

      {/* 5. AI Suggestions & Team Collaboration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AiSuggestions />
        <TeamCollaboration />
      </div>

      {/* 6. Recent Communications */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900 flex items-center gap-2"><Mail size={18}/> Recent Communications</h2>
        <ul className="divide-y">
          {recentComms.map((comm, idx) => (
            <li key={idx} className="py-2 flex justify-between items-center">
              <div>
                <span className="font-medium">{comm.who}</span>
                <span className="ml-2 text-xs text-slate-500">{comm.when}</span>
                <div className="text-sm text-slate-700">{comm.subject}</div>
              </div>
              <span className="text-xs text-slate-500">{comm.type === 'email' ? '📧' : '📞'}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 7. Activity Heatmap */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900 flex items-center gap-2"><Calendar size={18}/> Activity Heatmap</h2>
        <div className="flex gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
            <div key={day} className="flex flex-col items-center gap-1">
              <span className="text-xs text-slate-600">{day}</span>
              <div className="w-8 h-8 rounded bg-green-200 flex items-center justify-center font-bold text-green-800">
                {Math.floor(Math.random() * 10) + 1}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-1"># of logged activities per day</p>
      </div>

      {/* 8. Chart and Task Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OpportunityChart data={{
          labels: ['Discovery', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
          datasets: [
            {
              label: 'Value ($)',
              data: [320000, 250000, 525000, 475000, 180000],
              backgroundColor: 'rgba(7, 71, 166, 0.6)',
              borderColor: 'rgba(7, 71, 166, 1)',
              borderWidth: 1,
            },
          ],
        }} />
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Upcoming Tasks</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Follow up with Sarah Parker</p>
                <p className="text-sm text-slate-500">Tomorrow, 10:00 AM</p>
              </div>
              <span className="rounded-full bg-blue-100 text-blue-800 text-xs px-3 py-1 font-semibold">Call</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Send Proposal to Tom Nguyen</p>
                <p className="text-sm text-slate-500">Tomorrow, 2:00 PM</p>
              </div>
              <span className="rounded-full bg-green-100 text-green-800 text-xs px-3 py-1 font-semibold">Email</span>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/calendar" className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700">
              View all tasks
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 9. Company News & Resource Center (bottom) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Company News</h2>
          <ul className="list-disc list-inside text-sm text-slate-700">
            {companyNews.map((news, idx) => (
              <li key={idx}><a href={news.url} className="text-blue-600 hover:underline">{news.headline}</a></li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-slate-900 flex items-center gap-2"><HelpCircle size={18}/> Resource Center</h2>
          <ul className="list-disc list-inside text-sm text-slate-700">
            {helpLinks.map((hl, idx) => (
              <li key={idx}><a href={hl.url} className="text-blue-600 hover:underline">{hl.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
