import React from 'react';
import { useSalesforce } from '../context/SalesforceContext';
import ObjectList from '../components/objects/ObjectList';
import { Mail, Phone, Calendar, Users, ArrowUp, ArrowDown } from 'lucide-react';

const Leads = () => {
  const { leads, loading } = useSalesforce();

  const columns = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'salesforceLink',
      title: '',
      render: (lead: any) => (
        <a
          href={`https://your-instance.salesforce.com/${lead.id}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in Salesforce"
          className="inline-flex items-center hover:opacity-80"
        >
          <img
            src="https://cdn.worldvectorlogo.com/logos/salesforce-2.svg"
            alt="Salesforce"
            className="h-5 w-5"
          />
        </a>
      ),
    },
    {
      key: 'company',
      title: 'Company',
    },
    {
      key: 'title',
      title: 'Title',
    },
    {
      key: 'email',
      title: 'Email',
      render: (lead: any) => (
        <div className="flex items-center">
          <Mail className="mr-1 h-4 w-4 text-slate-400" />
          <span>{lead.email}</span>
        </div>
      ),
    },
    {
      key: 'phone',
      title: 'Phone',
      render: (lead: any) => (
        <div className="flex items-center">
          <Phone className="mr-1 h-4 w-4 text-slate-400" />
          <span>{lead.phone}</span>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (lead: any) => {
        let bgColor = 'bg-slate-100 text-slate-800';

        switch (lead.status) {
          case 'New':
            bgColor = 'bg-blue-100 text-blue-800';
            break;
          case 'Working':
            bgColor = 'bg-amber-100 text-amber-800';
            break;
          case 'Qualified':
            bgColor = 'bg-green-100 text-green-800';
            break;
          case 'Unqualified':
            bgColor = 'bg-red-100 text-red-800';
            break;
        }

        return (
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${bgColor}`}
          >
            {lead.status}
          </span>
        );
      },
    },
    {
      key: 'score',
      title: 'Score',
      render: (lead: any) => {
        const score = lead.score;
        let textColor = 'text-slate-800';
        let icon = null;

        if (score >= 80) {
          textColor = 'text-success-600';
          icon = <ArrowUp className="mr-1 h-3 w-3 text-success-600" />;
        } else if (score >= 60) {
          textColor = 'text-amber-600';
        } else {
          textColor = 'text-error-600';
          icon = <ArrowDown className="mr-1 h-3 w-3 text-error-600" />;
        }

        return (
          <div className={`flex items-center font-medium ${textColor}`}>
            {icon}
            <span>{score}</span>
          </div>
        );
      },
    },
    {
      key: 'createdDate',
      title: 'Created Date',
      render: (lead: any) => (
        <div className="flex items-center">
          <Calendar className="mr-1 h-4 w-4 text-slate-400" />
          <span>{lead.createdDate}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-slate-500">Manage and track your sales leads</p>
        </div>
        <button className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
          <Users className="mr-2 h-4 w-4" />
          Add New Lead
        </button>
      </div>

      <ObjectList
        title="Leads"
        data={leads}
        columns={columns}
        basePath="/leads"
        isLoading={loading}
      />
    </div>
  );
};

export default Leads;
