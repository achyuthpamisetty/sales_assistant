import React from 'react';
import { useSalesforce } from '../context/SalesforceContext';
import { Briefcase, DollarSign, Calendar, User, Tag, Plus } from 'lucide-react';

const STAGES = [
  { key: 'Discovery', color: 'bg-blue-100', text: 'text-blue-800' },
  { key: 'Qualification', color: 'bg-yellow-100', text: 'text-yellow-800' },
  { key: 'Proposal', color: 'bg-indigo-100', text: 'text-indigo-800' },
  { key: 'Negotiation', color: 'bg-amber-100', text: 'text-amber-800' },
  { key: 'Closed Won', color: 'bg-green-100', text: 'text-green-800' },
  { key: 'Closed Lost', color: 'bg-red-100', text: 'text-red-800' },
];

const OpportunityPipeline = () => {
  const { opportunities, loading } = useSalesforce();

  const grouped = STAGES.reduce((acc, stage) => {
    acc[stage.key] = opportunities.filter(opp => opp.stage === stage.key);
    return acc;
  }, {} as Record<string, any[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const totalValue = opportunities.reduce((sum, opp) => sum + opp.amount, 0);
  const avgDealSize = totalValue / opportunities.length || 0;
  const winRate = (opportunities.filter(opp => opp.stage === 'Closed Won').length / opportunities.length * 100) || 0;

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Pipeline Overview</h1>
          <p className="text-sm text-slate-500">Manage opportunities by sales stage</p>
        </div>
        <button className="inline-flex items-center rounded-md bg-primary-600 px-3 py-1.5 text-sm text-white hover:bg-primary-700">
          <Plus className="mr-1 h-4 w-4" />
          Add
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-md shadow p-3 text-sm">
          <div className="text-slate-500">Total Pipeline Value</div>
          <div className="text-lg font-bold text-slate-800">${totalValue.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-md shadow p-3 text-sm">
          <div className="text-slate-500">Avg. Deal Size</div>
          <div className="text-lg font-bold text-slate-800">${avgDealSize.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-md shadow p-3 text-sm">
          <div className="text-slate-500">Win Rate</div>
          <div className="text-lg font-bold text-slate-800">{winRate.toFixed(1)}%</div>
        </div>
      </div>

      {/* Pipeline */}
      <div className="overflow-x-auto">
        <div className="flex gap-3 min-w-[1000px]">
          {STAGES.map(stage => (
            <div
              key={stage.key}
              className="w-[240px] bg-white rounded-lg border shadow-sm flex flex-col"
            >
              <div className={`px-3 py-2 border-b text-sm font-semibold ${stage.color} ${stage.text}`}>
                {stage.key} <span className="float-right text-xs font-normal">{grouped[stage.key]?.length || 0}</span>
              </div>

              <div className="p-2 space-y-2 overflow-y-auto max-h-[400px]">
                {grouped[stage.key]?.map(opp => (
                  <div
                    key={opp.id}
                    className="rounded-md border bg-slate-50 p-2 hover:bg-slate-100 cursor-pointer"
                  >
                    <div className="flex justify-between items-center text-sm font-medium text-slate-800">
                      <span className="truncate">{opp.name}</span>
                      <span className="text-primary-600 text-xs">${opp.amount.toLocaleString()}</span>
                    </div>

                    <div className="text-xs text-slate-500 mt-1 space-y-1">
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
                      <div className="text-right text-xs text-slate-400 mt-0.5">
                        {opp.probability}%
                      </div>
                    </div>
                  </div>
                ))}

                {(!grouped[stage.key] || grouped[stage.key].length === 0) && (
                  <div className="text-center text-xs text-slate-400 py-4">No opportunities</div>
                )}
              </div>

              <button className="text-xs text-primary-600 border-t border-slate-200 py-2 hover:bg-slate-50">
                <Plus size={12} className="inline-block mr-1" />
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpportunityPipeline;
