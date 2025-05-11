import React from 'react';
import EmailComposerComponent from '../components/email/EmailComposer';

const EmailComposer = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Email Composer</h1>
        <p className="text-slate-500">Create and send personalized emails to prospects and customers</p>
      </div>
      
      <EmailComposerComponent />
    </div>
  );
};

export default EmailComposer;