import React from 'react';
import { useSalesforce } from '../context/SalesforceContext';
import { Briefcase, DollarSign, Calendar, User, Tag, Plus } from 'lucide-react';

const STAGES = [
  { key: 'Needs Analysis', color: 'bg-slate-100', text: 'text-slate-800' },
  { key: 'Qualification', color: 'bg-yellow-100', text: 'text-yellow-800' },
  { key: 'Negotiation', color: 'bg-amber-100', text: 'text-amber-800' },
  { key: 'Proposal', color: 'bg-indigo-100', text: 'text-indigo-800' },
  { key: 'Closed Won', color: 'bg-green-100', text: 'text-green-800' },
  { key: 'Closed Lost', color: 'bg-red-100', text: 'text-red-800' },
];

const getStageColor = (stage) => {
  const found = STAGES.find(s => s.key === stage);
  return found ? `${found.color} ${found.text}` : 'bg-slate-100 text-slate-800';
};

const OpportunitiesPipeline = () => {
  const { opportunities, loading } = useSalesforce();

  // Group opportunities by stage
  const grouped = {};
  STAGES.forEach(stage => grouped[stage.key] = []);
  opportunities.forEach(opp => {
    if (grouped[opp.stage]) grouped[opp.stage].push(opp);
    else grouped[opp.stage] = [opp];
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Opportunities Pipeline</h1>
          <p className="text-slate-500">Visualize, track, and manage your sales pipeline</p>
        </div>
        <button className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          New Opportunity
        </button>
      </div>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[900px]">
          {STAGES.map(stage => (
            <div
              key={stage.key}
              className="flex-1 min-w-[270px] bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col"
            >
              <div className={`flex items-center justify-between px-4 py-3 border-b ${stage.color}`}>
                <span className={`font-semibold ${stage.text}`}>{stage.key}</span>
                <span className={`text-xs ${stage.text}`}>{grouped[stage.key].length} Contacts</span>
              </div>
              <button
                className="flex items-center justify-center gap-1 text-xs text-primary-600 border-b border-slate-200 py-2 hover:bg-slate-100 transition"
                onClick={() => alert(`Add contact to ${stage.key}`)}
              >
                <Plus size={14} /> Add Contact
              </button>
              <div className="flex-1 px-2 py-2 space-y-3 overflow-y-auto min-h-[80px]">
                {grouped[stage.key].length === 0 && (
                  <div className="text-xs text-slate-400 text-center py-4">No opportunities</div>
                )}
                {grouped[stage.key].map(opp => (
                  <div
                    key={opp.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3 shadow-sm space-y-1 hover:bg-slate-100 transition"
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-slate-400" />
                      <span className="font-semibold text-slate-900">{opp.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <DollarSign className="h-3 w-3" />
                      <span>${opp.amount.toLocaleString()}</span>
                      <Calendar className="h-3 w-3 ml-2" />
                      <span>{opp.closeDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <User className="h-3 w-3" />
                      <span>{opp.contactName}</span>
                      <Tag className="h-3 w-3 ml-2" />
                      <span>{opp.type}</span>
                    </div>
                    <div className="mt-1">
                      <div className="h-1 w-full rounded-full bg-slate-200">
                        <div
                          className="h-1 rounded-full bg-primary-600"
                          style={{ width: `${opp.probability}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-right text-slate-400">{opp.probability}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesPipeline;
