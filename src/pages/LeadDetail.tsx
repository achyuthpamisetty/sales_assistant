import React from 'react';
import { Link } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import StatCard from '../components/dashboard/StatCard';
import OpportunityChart from '../components/dashboard/OpportunityChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import { Users, Briefcase, PhoneCall, TrendingUp, ArrowRight, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const { leads, accounts, contacts, opportunities, loading } = useSalesforce();

  // Add sample leads with all key fields for demo
  const sampleLeads = [
    { id: 'l1', firstName: 'Sarah', lastName: 'Parker', company: 'Acme Corp', phone: '+1 555-1234', email: 'sarah@example.com', salesforceUrl: 'https://your-instance.salesforce.com/l1', leadScore: 82 },
    { id: 'l2', firstName: 'Tom', lastName: 'Nguyen', company: 'Dev Solutions', phone: '+1 555-5678', email: 'tom@example.com', salesforceUrl: 'https://your-instance.salesforce.com/l2', leadScore: 91 },
    { id: 'l3', firstName: 'Olivia', lastName: 'Lee', company: 'HealthFirst', phone: '+1 555-8765', email: 'olivia@example.com', salesforceUrl: 'https://your-instance.salesforce.com/l3', leadScore: 78 },
    { id: 'l4', firstName: 'James', lastName: 'Patel', company: 'FinTech Ltd', phone: '+1 555-4321', email: 'james@example.com', salesforceUrl: 'https://your-instance.salesforce.com/l4', leadScore: 60 },
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
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

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

      {/* Chart and Task Section */}
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

      {/* Activities and Opportunities */}
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

      {/* High-Scoring Leads Section */}
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
