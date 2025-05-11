import React from 'react';
import { useSalesforce } from '../context/SalesforceContext';
import ObjectList from '../components/objects/ObjectList';
import { Briefcase, Calendar, DollarSign, BarChart, User, Tag } from 'lucide-react';

const Opportunities = () => {
  const { opportunities, loading } = useSalesforce();
  
  const columns = [
    { 
      key: 'name', 
      title: 'Opportunity Name' 
    },
    { 
      key: 'accountName', 
      title: 'Account',
      render: (opp: any) => (
        <div className="flex items-center">
          <Briefcase className="mr-1 h-4 w-4 text-slate-400" />
          <span>{opp.accountName}</span>
        </div>
      )
    },
    { 
      key: 'stage', 
      title: 'Stage',
      render: (opp: any) => {
        let bgColor = 'bg-slate-100 text-slate-800';
        
        switch (opp.stage) {
          case 'Discovery':
            bgColor = 'bg-blue-100 text-blue-800';
            break;
          case 'Proposal':
            bgColor = 'bg-indigo-100 text-indigo-800';
            break;
          case 'Negotiation':
            bgColor = 'bg-amber-100 text-amber-800';
            break;
          case 'Closed Won':
            bgColor = 'bg-green-100 text-green-800';
            break;
          case 'Closed Lost':
            bgColor = 'bg-red-100 text-red-800';
            break;
        }
        
        return (
          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${bgColor}`}>
            {opp.stage}
          </span>
        );
      }
    },
    { 
      key: 'amount', 
      title: 'Amount',
      render: (opp: any) => (
        <div className="flex items-center font-medium">
          <DollarSign className="mr-1 h-4 w-4 text-slate-400" />
          <span>{opp.amount.toLocaleString()}</span>
        </div>
      )
    },
    { 
      key: 'closeDate', 
      title: 'Close Date',
      render: (opp: any) => (
        <div className="flex items-center">
          <Calendar className="mr-1 h-4 w-4 text-slate-400" />
          <span>{opp.closeDate}</span>
        </div>
      )
    },
    { 
      key: 'probability', 
      title: 'Probability',
      render: (opp: any) => (
        <div className="flex items-center">
          <BarChart className="mr-1 h-4 w-4 text-slate-400" />
          <div className="w-full max-w-[100px]">
            <div className="h-2 w-full rounded-full bg-slate-200">
              <div 
                className="h-2 rounded-full bg-primary-600" 
                style={{ width: `${opp.probability}%` }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-right">{opp.probability}%</div>
          </div>
        </div>
      )
    },
    { 
      key: 'contactName', 
      title: 'Primary Contact',
      render: (opp: any) => (
        <div className="flex items-center">
          <User className="mr-1 h-4 w-4 text-slate-400" />
          <span>{opp.contactName}</span>
        </div>
      )
    },
    { 
      key: 'type', 
      title: 'Type',
      render: (opp: any) => (
        <div className="flex items-center">
          <Tag className="mr-1 h-4 w-4 text-slate-400" />
          <span>{opp.type}</span>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Opportunities</h1>
          <p className="text-slate-500">Track and manage your sales pipeline</p>
        </div>
        <button className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
          <DollarSign className="mr-2 h-4 w-4" />
          New Opportunity
        </button>
      </div>
      
      <ObjectList 
        title="Opportunities"
        data={opportunities}
        columns={columns}
        basePath="/opportunities"
        isLoading={loading}
      />
    </div>
  );
};

export default Opportunities;