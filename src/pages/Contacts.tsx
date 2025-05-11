import React from 'react';
import { useSalesforce } from '../context/SalesforceContext';
import ObjectList from '../components/objects/ObjectList';
import { Mail, Phone, Calendar, Briefcase, User } from 'lucide-react';

const Contacts = () => {
  const { contacts, loading } = useSalesforce();
  
  const columns = [
    { 
      key: 'fullName', 
      title: 'Name',
      render: (contact: any) => (
        <div className="flex items-center">
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">
            <span>{contact.firstName[0]}{contact.lastName[0]}</span>
          </div>
          <span>{contact.firstName} {contact.lastName}</span>
        </div>
      )
    },
    { 
      key: 'title', 
      title: 'Title',
      render: (contact: any) => (
        <div className="flex items-center">
          <User className="mr-1 h-4 w-4 text-slate-400" />
          <span>{contact.title}</span>
        </div>
      )
    },
    { 
      key: 'accountName', 
      title: 'Account',
      render: (contact: any) => (
        <div className="flex items-center">
          <Briefcase className="mr-1 h-4 w-4 text-slate-400" />
          <span>{contact.accountName}</span>
        </div>
      )
    },
    { 
      key: 'email', 
      title: 'Email',
      render: (contact: any) => (
        <div className="flex items-center">
          <Mail className="mr-1 h-4 w-4 text-slate-400" />
          <span>{contact.email}</span>
        </div>
      )
    },
    { 
      key: 'phone', 
      title: 'Phone',
      render: (contact: any) => (
        <div className="flex items-center">
          <Phone className="mr-1 h-4 w-4 text-slate-400" />
          <span>{contact.phone}</span>
        </div>
      )
    },
    { 
      key: 'lastActivity', 
      title: 'Last Activity',
      render: (contact: any) => (
        <div className="flex items-center">
          <Calendar className="mr-1 h-4 w-4 text-slate-400" />
          <span>{contact.lastActivity}</span>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
          <p className="text-slate-500">Manage your customer and prospect contacts</p>
        </div>
        <button className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
          <User className="mr-2 h-4 w-4" />
          Add New Contact
        </button>
      </div>
      
      <ObjectList 
        title="Contacts"
        data={contacts}
        columns={columns}
        basePath="/contacts"
        isLoading={loading}
      />
    </div>
  );
};

export default Contacts;