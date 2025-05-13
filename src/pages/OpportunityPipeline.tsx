import React from 'react';
import { Briefcase, DollarSign, Calendar, User, Plus } from 'lucide-react';

const STAGES = [
  { key: 'Discovery', color: 'bg-blue-100', text: 'text-blue-800' },
  { key: 'Qualification', color: 'bg-yellow-100', text: 'text-yellow-800' },
  { key: 'Proposal', color: 'bg-indigo-100', text: 'text-indigo-800' },
  { key: 'Negotiation', color: 'bg-amber-100', text: 'text-amber-800' },
  { key: 'Closed Won', color: 'bg-green-100', text: 'text-green-800' },
  { key: 'Closed Lost', color: 'bg-red-100', text: 'text-red-800' },
];

// Mock data for demonstration
const MOCK_OPPORTUNITIES = [
  // Discovery (6)
  {
    id: '1',
    name: 'Acme Corp',
    stage: 'Discovery',
    amount: 5000,
    closeDate: '2025-06-01',
    probability: 20,
    contactName: 'Alice Johnson',
  },
  {
    id: '2',
    name: 'Beta Inc',
    stage: 'Discovery',
    amount: 8500,
    closeDate: '2025-06-05',
    probability: 25,
    contactName: 'Bob Smith',
  },
  {
    id: '3',
    name: 'Omega LLC',
    stage: 'Discovery',
    amount: 4200,
    closeDate: '2025-06-10',
    probability: 30,
    contactName: 'Charlie Brown',
  },
  {
    id: '4',
    name: 'Cloud Nine Co.',
    stage: 'Discovery',
    amount: 7300,
    closeDate: '2025-06-12',
    probability: 22,
    contactName: 'Diana Prince',
  },
  {
    id: '5',
    name: 'Nexus Solutions',
    stage: 'Discovery',
    amount: 6100,
    closeDate: '2025-06-20',
    probability: 18,
    contactName: 'Ethan Hunt',
  },
  {
    id: '6',
    name: 'BluePeak Partners',
    stage: 'Discovery',
    amount: 7800,
    closeDate: '2025-06-25',
    probability: 28,
    contactName: 'Felicity Smoak',
  },

  // Qualification (5)
  {
    id: '7',
    name: 'Delta Ventures',
    stage: 'Qualification',
    amount: 9000,
    closeDate: '2025-06-15',
    probability: 35,
    contactName: 'Grace Lee',
  },
  {
    id: '8',
    name: 'SolarGrid Systems',
    stage: 'Qualification',
    amount: 6500,
    closeDate: '2025-06-18',
    probability: 40,
    contactName: 'Henry Adams',
  },
  {
    id: '9',
    name: 'Hyperion Tech',
    stage: 'Qualification',
    amount: 7200,
    closeDate: '2025-06-22',
    probability: 38,
    contactName: 'Ivy Taylor',
  },
  {
    id: '10',
    name: 'Ascendix Inc',
    stage: 'Qualification',
    amount: 8000,
    closeDate: '2025-06-24',
    probability: 32,
    contactName: 'Jack Carter',
  },
  {
    id: '11',
    name: 'QuantumSoft',
    stage: 'Qualification',
    amount: 9100,
    closeDate: '2025-06-28',
    probability: 36,
    contactName: 'Karen Diaz',
  },

  // Proposal
  {
    id: '12',
    name: 'Zeta Solutions',
    stage: 'Proposal',
    amount: 12000,
    closeDate: '2025-07-01',
    probability: 50,
    contactName: 'Laura Kim',
  },

  // Negotiation
  {
    id: '13',
    name: 'Vision Corp',
    stage: 'Negotiation',
    amount: 15000,
    closeDate: '2025-07-10',
    probability: 60,
    contactName: 'Mike Ross',
  },

  // Closed Won
  {
    id: '14',
    name: 'Nova Enterprises',
    stage: 'Closed Won',
    amount: 20000,
    closeDate: '2025-05-01',
    probability: 100,
    contactName: 'Nancy Drew',
  },

  // Closed Lost
  {
    id: '15',
    name: 'Argo Industries',
    stage: 'Closed Lost',
    amount: 7000,
    closeDate: '2025-04-15',
    probability: 0,
    contactName: 'Oscar Wilde',
  },
];

const OpportunityPipeline = () => {
  const opportunities = MOCK_OPPORTUNITIES;

  const grouped = STAGES.reduce((acc, stage) => {
    acc[stage.key] = opportunities.filter((opp) => opp.stage === stage.key);
    return acc;
  }, {} as Record<string, typeof opportunities>);

  const totalValue = opportunities.reduce((sum, opp) => sum + opp.amount, 0);
  const avgDealSize = totalValue / opportunities.length || 0;
  const winRate =
    (opportunities.filter((opp) => opp.stage === 'Closed Won').length /
      opportunities.length) *
      100 || 0;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">Pipeline Overview</h1>
          <p className="text-sm text-slate-500">Track and manage your sales pipeline</p>
        </div>
        <button className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          Add Opportunity
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm text-slate-500">Total Pipeline Value</h3>
          <p className="text-xl font-bold text-slate-900">${totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm text-slate-500">Average Deal Size</h3>
          <p className="text-xl font-bold text-slate-900">${avgDealSize.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm text-slate-500">Win Rate</h3>
          <p className="text-xl font-bold text-slate-900">{winRate.toFixed(1)}%</p>
        </div>
      </div>

      {/* Pipeline */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1200px]">
          {STAGES.map((stage) => (
            <div
              key={stage.key}
              className="flex-1 min-w-[280px] bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col"
            >
              <div className={`flex items-center justify-between px-4 py-3 border-b ${stage.color}`}>
                <span className={`font-semibold ${stage.text}`}>{stage.key}</span>
                <span className={`text-xs ${stage.text}`}>
                  {grouped[stage.key]?.length || 0} Opportunities
                </span>
              </div>

              <div className="p-2 flex-1 overflow-y-auto space-y-2">
                {grouped[stage.key]?.map((opp) => (
                  <div
                    key={opp.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-slate-400" />
                        <span className="font-medium text-slate-900 text-sm">{opp.name}</span>
                      </div>
                      <span className="text-sm font-medium text-primary-600">
                        ${opp.amount.toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{opp.closeDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{opp.contactName}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="h-1.5 w-full bg-slate-200 rounded-full">
                        <div
                          className="h-1.5 bg-primary-600 rounded-full"
                          style={{ width: `${opp.probability}%` }}
                        />
                      </div>
                      <div className="mt-1 text-xs text-right text-slate-500">
                        {opp.probability}% Probability
                      </div>
                    </div>
                  </div>
                ))}
                {(!grouped[stage.key] || grouped[stage.key].length === 0) && (
                  <div className="text-center py-4 text-sm text-slate-500">
                    No opportunities in this stage
                  </div>
                )}
              </div>

              <button className="flex items-center justify-center gap-1 text-xs text-primary-600 border-t border-slate-200 py-2 hover:bg-slate-100 transition">
                <Plus size={14} /> Add Opportunity
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpportunityPipeline;
