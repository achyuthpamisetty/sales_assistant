import React, { useState } from 'react';

// status options for dropdown
const statusOptions = ['Open', 'Working', 'Qualified', 'Unqualified', 'Converted'];

const LeadDetailSection = ({ lead, onSave }) => {
  const [fields, setFields] = useState({
    firstName: lead.firstName || '',
    lastName: lead.lastName || '',
    company: lead.company || '',
    email: lead.email || '',
    phone: lead.phone || '',
    leadScore: lead.leadScore || 0,
    status: lead.status || 'Open',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    if (onSave) {
      await onSave(fields);
    }
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-xl shadow border p-6 mb-6">
      <h2 className="font-semibold text-lg mb-4">Lead Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">First Name</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            value={fields.firstName}
            onChange={e => handleChange('firstName', e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Last Name</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            value={fields.lastName}
            onChange={e => handleChange('lastName', e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Company</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            value={fields.company}
            onChange={e => handleChange('company', e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded p-2 mt-1"
            value={fields.email}
            onChange={e => handleChange('email', e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            value={fields.phone}
            onChange={e => handleChange('phone', e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Lead Score</label>
          <input
            type="number"
            min={0}
            max={100}
            className="w-full border rounded p-2 mt-1"
            value={fields.leadScore}
            onChange={e => handleChange('leadScore', e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Status</label>
          <select
            className="w-full border rounded p-2 mt-1"
            value={fields.status}
            onChange={e => handleChange('status', e.target.value)}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Details'}
      </button>
    </div>
  );
};

export default LeadDetailSection;
