import React from 'react';
import { useSalesforce } from '../context/SalesforceContext';
import ObjectList from '../components/objects/ObjectList';
import { Globe, MapPin, Building, Phone, Calendar, Users } from 'lucide-react';

const Accounts = () => {
  const { accounts, loading } = useSalesforce();
  
  const columns = [
    { 
      key: 'name', 
      title: 'Account Name' 
    },
    { 
      key: 'industry', 
      title: 'Industry',
      render: (account: any) => (
        <div className="flex items-center">
          <Building className="mr-1 h-4 w-4 text-slate-400" />
          <span>{account.industry}</span>
        </div>
      ) 
    },
    { 
      key: 'website', 
      title: 'Website',
      render: (account: any) => (
        <div className="flex items-center">
          <Globe className="mr-1 h-4 w-4 text-slate-400" />
          <span>{account.website}</span>
        </div>
      ) 
    },
    { 
      key: 'revenue', 
      title: 'Annual Revenue' 
    },
    { 
      key: 'employees', 
      title: 'Employees' 
    },
    { 
      key: 'address', 
      title: 'Address',
      render: (account: any) => (
        <div className="flex items-center">
          <MapPin className="mr-1 h-4 w-4 text-slate-400" />
          <span>{account.address.split(',')[0]}</span>
        </div>
      ) 
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (account: any) => {
        let bgColor = 'bg-slate-100 text-slate-800';
        
        switch (account.status) {
          case 'Customer':
            bgColor = 'bg-green-100 text-green-800';
            break;
          case 'Prospect':
            bgColor = 'bg-blue-100 text-blue-800';
            break;
          case 'Former Customer':
            bgColor = 'bg-amber-100 text-amber-800';
            break;
        }
        
        return (
          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${bgColor}`}>
            {account.status}
          </span>
        );
      }
    },
    { 
      key: 'createdDate', 
      title: 'Created Date',
      render: (account: any) => (
        <div className="flex items-center">
          <Calendar className="mr-1 h-4 w-4 text-slate-400" />
          <span>{account.createdDate}</span>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Accounts</h1>
          <p className="text-slate-500">Manage your customer and prospect accounts</p>
        </div>
        <button className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
          <Building className="mr-2 h-4 w-4" />
          Add New Account
        </button>
      </div>
      
      <ObjectList 
        title="Accounts"
        data={accounts}
        columns={columns}
        basePath="/accounts"
        isLoading={loading}
      />
    </div>
  );
};

export default Accounts;