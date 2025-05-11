import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import { Mail, PhoneCall, Briefcase, Edit, ArrowLeft } from 'lucide-react';

const ContactDetail = () => {
  const { id } = useParams();
  const { getObjectById, updateContact, loading } = useSalesforce();

  const contact = id ? getObjectById('contacts', id) : null;

  // Editable fields state
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    tags: '',
    owner: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (contact) {
      setFields({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        title: contact.title || '',
        company: contact.company || '',
        email: contact.email || '',
        phone: contact.phone || '',
        tags: contact.tags || '',
        owner: contact.owner || '',
      });
    }
  }, [contact]);

  const handleFieldChange = (field, value) => {
    setFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContact(contact.id, fields);
      alert('Contact updated!');
    } catch (e) {
      alert('Failed to update contact.');
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="p-8 text-slate-500">Loading contact details...</div>;
  }

  if (!contact) {
    return (
      <div className="p-6 text-gray-600">
        Contact not found. Please check the URL or try again later.
      </div>
    );
  }

  const salesforceBaseUrl = "https://yourInstance.salesforce.com";
  const salesforceUrl = `${salesforceBaseUrl}/${contact.id}`;

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Link to="/contacts" className="inline-flex items-center text-blue-600 hover:underline mb-2">
              <ArrowLeft className="mr-1" size={18}/> Back to Contacts
            </Link>
            <div className="flex items-center gap-2 mt-1">
              <h1 className="text-2xl font-bold text-slate-900">
                {fields.firstName} {fields.lastName}
              </h1>
              {salesforceUrl && (
                <a href={salesforceUrl} target="_blank" rel="noopener noreferrer" title="View in Salesforce">
                  <img
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/salesforce.svg"
                    alt="Salesforce"
                    className="w-5 h-5 ml-1 inline"
                  />
                </a>
              )}
            </div>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-1"
            onClick={handleSave}
            disabled={saving}
          >
            <Edit size={16}/> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
        {/* Always-visible editable fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">First Name</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={fields.firstName}
              onChange={e => handleFieldChange('firstName', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Last Name</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={fields.lastName}
              onChange={e => handleFieldChange('lastName', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={fields.title}
              onChange={e => handleFieldChange('title', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Company</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={fields.company}
              onChange={e => handleFieldChange('company', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded p-2 mt-1"
              value={fields.email}
              onChange={e => handleFieldChange('email', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={fields.phone}
              onChange={e => handleFieldChange('phone', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Tags</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={fields.tags}
              onChange={e => handleFieldChange('tags', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Owner</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={fields.owner}
              onChange={e => handleFieldChange('owner', e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* ...other sections like activities, notes, etc... */}
    </div>
  );
};

export default ContactDetail;
