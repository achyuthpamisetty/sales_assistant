import React from 'react';
import { Link } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import StatCard from '../components/dashboard/StatCard';
import OpportunityChart from '../components/dashboard/OpportunityChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import { Users, Briefcase, PhoneCall, TrendingUp, ArrowRight, DollarSign, Flame, Award, Calendar, Mail, HelpCircle, BarChart2 } from 'lucide-react';

// --- Recent Emails Component (inline for single file use) ---
const dummyEmails = [
  {
    id: "1",
    from: "Priya Patel <priya@acme.com>",
    subject: "Re: Demo Schedule Confirmation",
    date: "Today, 10:15 AM",
    snippet: "Looking forward to our call tomorrow. Let me know if you need anything else.",
    source: "Gmail",
  },
  {
    id: "2",
    from: "Tom Nguyen <tom@devsolutions.com>",
    subject: "Proposal Feedback",
    date: "Yesterday, 4:22 PM",
    snippet: "Thanks for sending the proposal. I have a few questions...",
    source: "Outlook",
  },
  {
    id: "3",
    from: "Olivia Lee <olivia@healthfirst.com>",
    subject: "Intro to SalesAI Pro",
    date: "Yesterday, 11:30 AM",
    snippet: "Excited to try your platform. Can you share more use cases?",
    source: "Gmail",
  },
];
const RecentEmails = () => (
  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
    <h2 className="mb-3 text-lg font-semibold text-slate-900 flex items-center gap-2">
      <Mail size={18} /> Recent Emails (Gmail/Outlook)
    </h2>
    <ul className="divide-y">
      {dummyEmails.map((email) => (
        <li key={email.id} className="py-3">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-medium">{email.from}</span>
              <span className="ml-2 text-xs text-slate-500">{email.date}</span>
              <div className="text-sm text-slate-700">{email.subject}</div>
              <div className="text-xs text-slate-500 truncate">{email.snippet}</div>
            </div>
            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
              email.source === "Gmail"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}>
              {email.source}
            </span>
          </div>
        </li>
      ))}
    </ul>
    <div className="mt-3 text-right">
      <a
        href="#"
        className="text-blue-600 text-sm hover:underline"
        title="View all emails"
      >
        View all emails
      </a>
    </div>
  </div>
);
// ------------------------------------------------------------

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

  const opportunityData = {
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
  };

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

      {/* 5. Pipeline Health/Funnel */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">Pipeline Health</h2>
          <div className="flex gap-4">
            {opportunityData.labels.map((stage, idx) => (
              <div key={stage} className="flex flex-col items-center">
                <div className="rounded-full bg-blue-100 text-blue-700 font-bold w-12 h-12 flex items-center justify-center mb-1">
                  {opportunityData.datasets[0].data[idx] / 1000}k
                </div>
                <span className="text-xs text-slate-600">{stage}</span>
              </div>
            ))}
          </div>
        </div>
        {/* 6. Goal Tracking */}
        <div className="flex-1">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">Goal Progress</h2>
          <p className="text-sm text-slate-600 mb-1">Q2 Revenue Goal: $2,000,000</p>
          <div className="w-full bg-slate-200 rounded-full h-4">
            <div className="bg-green-600 h-4 rounded-full text-right pr-2 text-white text-xs flex items-center justify-end"
              style={{ width: `${Math.min((totalRevenue / 2000000) * 100, 100)}%` }}>
              {Math.round((totalRevenue / 2000000) * 100)}%
            </div>
          </div>
        </div>
      </div>

  

     
      {/* 9. Activity Heatmap (Demo) */}
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

      {/* 9b. Recent Emails (Gmail/Outlook) */}
      <RecentEmails />

      {/* 10. Company News & Resource Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* Existing: Chart and Task Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OpportunityChart data={opportunityData} />
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

      {/* Existing: Activities and Opportunities */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity activities={recentActivities} />
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Opportunities</h2>
          </div>
          <div className="divide-y">
            {opportunities.slice(0, 3).map(opp => (
              <Link key={opp.id} to={`/opportunities/${opp.id}`} className="block p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{opp.name}</p>
                    <p className="text-sm text-slate-500">{opp.accountName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${opp.amount.toLocaleString()}</p>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      opp.stage === 'Proposal' ? 'bg-blue-100 text-blue-800' :
                      opp.stage === 'Negotiation' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {opp.stage}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <div className="w-full rounded-full bg-slate-200">
                    <div
                      className="rounded-full bg-primary-600 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
                      style={{ width: `${opp.probability}%` }}
                    >
                      {opp.probability}%
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="border-t p-3">
            <Link to="/opportunities" className="flex w-full items-center justify-center rounded-md bg-slate-100 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
              View All Opportunities
            </Link>
          </div>
        </div>
      </div>

      {/* Improved High-Scoring Leads Section */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold text-slate-900">High-Scoring Leads</h2>
        </div>
        <div className="divide-y">
          {highScoringLeads.length > 0 ? (
            highScoringLeads.slice(0, 3).map(lead => (
              <div key={lead.id} className="block p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-base">{lead.firstName} {lead.lastName}</span>
                      {lead.salesforceUrl && (
                        <a
                          href={lead.salesforceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View in Salesforce"
                          className="inline-flex items-center"
                        >
                          {/* Salesforce logo SVG */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" className="ml-1">
                            <circle cx="16" cy="16" r="16" fill="#00A1E0"/>
                            <text x="16" y="22" textAnchor="middle" fontSize="15" fill="#fff" fontFamily="Arial, sans-serif">SF</text>
                          </svg>
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-slate-500">{lead.company}</p>
                    <p className="text-sm text-slate-500">{lead.phone}</p>
                    <p className="text-sm text-slate-500">{lead.email}</p>
                  </div>
                  <div className="text-right min-w-[90px]">
                    <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                      Score: {lead.leadScore}
                    </span>
                    <div className="mt-2 w-full rounded-full bg-slate-200 h-2">
                      <div
                        className="rounded-full bg-green-600 h-2"
                        style={{ width: `${lead.leadScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-slate-600 text-sm">No high-scoring leads found.</div>
          )}
        </div>
        <div className="border-t p-3">
          <Link
            to="/leads"
            className="flex w-full items-center justify-center rounded-md bg-slate-100 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
          >
            View All Leads
          </Link>
          
              {/* 7. Team Leaderboard */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900 flex items-center gap-2"><Award size={18}/> Top Performers</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-600">
              <th className="text-left py-1">Rep</th>
              <th className="text-left py-1">Deals</th>
              <th className="text-left py-1">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {teamLeaderboard.map(rep => (
              <tr key={rep.name} className="border-t">
                <td className="py-1">{rep.name}</td>
                <td className="py-1">{rep.deals}</td>
                <td className="py-1">${rep.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
