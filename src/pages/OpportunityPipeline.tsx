import React from 'react';
import { useSalesforce } from '../context/SalesforceContext';
import { Briefcase, Calendar, User, Plus } from 'lucide-react';

const STAGES = [
  { key: 'Discovery', color: 'bg-blue-100', text: 'text-blue-800' },
  { key: 'Qualification', color: 'bg-yellow-100', text: 'text-yellow-800' },
  { key: 'Proposal', color: 'bg-indigo-100', text: 'text-indigo-800' },
  { key: 'Negotiation', color: 'bg-amber-100', text: 'text-amber-800' },
  { key: 'Closed Won', color: 'bg-green-100', text: 'text-green-800' },
  { key: 'Closed Lost', color: 'bg-red-100', text: 'text-red-800' },
];

// Your existing mockOpportunities here...

const OpportunityPipeline = () => {
  const opportunities = mockOpportunities;
  const loading = false;

  const grouped = STAGES.reduce((acc, stage) => {
    acc[stage.key] = opportunities.filter(opp => opp.stage === stage.key);
    return acc;
  }, {} as Record<string, any[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const totalValue = opportunities.reduce((sum, opp) => sum + opp.amount, 0);
  const avgDealSize = totalValue / opportunities.length || 0;
  const winRate = (opportunities.filter(opp => opp.stage === 'Closed Won').length / opportunities.length * 100) || 0;

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Pipeline Overview</h1>
          <p className="text-slate-500 text-sm">Track and manage your sales pipeline</p>
        </div>
        <button className="inline-flex items-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
          <Plus className="mr-1 h-4 w-4" /> Add Opportunity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-3">
          <h3 className="text-sm font-medium text-slate-500">Total Pipeline Value</h3>
          <p className="text-xl font-bold text-slate-900">${totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-3">
          <h3 className="text-sm font-medium text-slate-500">Average Deal Size</h3>
          <p className="text-xl font-bold text-slate-900">${avgDealSize.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-3">
          <h3 className="text-sm font-medium text-slate-500">Win Rate</h3>
          <p className="text-xl font-bold text-slate-900">{winRate.toFixed(1)}%</p>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1000px]">
          {STAGES.map(stage => (
            <div
              key={stage.key}
              className="flex-1 min-w-[260px] bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col"
            >
              <div className={`flex items-center justify-between px-3 py-2 border-b ${stage.color}`}>
                <span className={`font-semibold text-sm ${stage.text}`}>{stage.key}</span>
                <span className={`text-xs ${stage.text}`}>{grouped[stage.key]?.length || 0} Deals</span>
              </div>

              <div className="p-2 flex-1 overflow-y-auto space-y-2">
                {grouped[stage.key]?.map(opp => (
                  <div
                    key={opp.id}
                    className="relative group rounded-lg border border-slate-200 bg-slate-50 p-2 hover:bg-slate-100 transition cursor-pointer"
                  >
                    {/* Top Right Alert */}
                    <div className="absolute top-2 right-2 group relative">
                      <div className="h-4 w-4 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-[10px] font-bold">
                        !
                      </div>
                      <div className="absolute top-5 right-0 w-44 bg-white border border-slate-200 rounded shadow-md p-2 text-xs text-slate-700 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
                        <div className="font-semibold mb-1">No open activities</div>
                        <div className="flex flex-col gap-1">
                          <button className="text-primary-600 hover:underline text-left">New Task</button>
                          <button className="text-primary-600 hover:underline text-left">New Event</button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4 text-slate-400" />
                        <span className="font-medium text-slate-900 text-sm">{opp.name}</span>
                      </div>
                      <span className="text-sm text-primary-600">${opp.amount.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> <span>{opp.closeDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" /> <span>{opp.contactName}</span>
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="h-1.5 w-full bg-slate-200 rounded-full">
                        <div className="h-1.5 bg-primary-600 rounded-full" style={{ width: `${opp.probability}%` }} />
                      </div>
                      <div className="mt-1 text-xs text-right text-slate-500">{opp.probability}% Probability</div>
                    </div>
                  </div>
                ))}

                {(!grouped[stage.key] || grouped[stage.key].length === 0) && (
                  <div className="text-center py-2 text-xs text-slate-500">
                    No opportunities in this stage
                  </div>
                )}
              </div>

              <button className="text-xs text-primary-600 border-t border-slate-200 py-1.5 hover:bg-slate-100 transition">
                <Plus size={12} className="inline mr-1" /> Add Opportunity
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpportunityPipeline;
