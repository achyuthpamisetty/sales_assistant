import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import { Mail, PhoneCall, Briefcase, Users, FileText, FilePlus, Edit, ArrowLeft, HelpCircle } from 'lucide-react';

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
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Demo data for activity, notes, etc.
  const activities = [
    { type: 'call', date: '2025-05-09', desc: 'Intro call with contact' },
    { type: 'email', date: '2025-05-10', desc: 'Sent intro email' },
    { type: 'meeting', date: '2025-05-11', desc: 'Demo scheduled' },
  ];
  const notes = [
    { user: 'Alice', date: '2025-05-10', text: 'Contact is decision maker.' },
    { user: 'Bob', date: '2025-05-11', text: 'Interested in AI features.' },
  ];
  const attachments = [
    { file: 'Bio.pdf', url: '#', uploaded: '2025-05-10' },
    { file: 'Demo_Slides.pptx', url: '#', uploaded: '2025-05-11' },
  ];
  const relatedAccounts = [
    { name: 'Acme Corp', role: 'Customer', website: 'acme.com' },
  ];
  const relatedLeads = [
    { name: 'Sarah Parker', company: 'Acme Corp' },
  ];
  const tasks = [
    { task: 'Send follow-up email', due: '2025-05-12', done: false },
    { task: 'Schedule next call', due: '2025-05-13', done: false },
  ];

  const salesforceBaseUrl = "https://yourInstance.salesforce.com";
  const salesforceUrl = contact ? `${salesforceBaseUrl}/${contact.id}` : null;

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

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContact(contact.id, fields);
      alert('Contact updated!');
      setEditing(false);
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

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Header and Details Section */}
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
          {!editing ? (
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-1"
              onClick={handleEdit}
            >
              <Edit size={16}/> Edit
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-1"
              onClick={handleSave}
              disabled={saving}
            >
              <Edit size={16}/> {saving ? 'Saving...' : 'Save'}
            </button>
          )}
        </div>
        {/* Details: view or edit mode */}
        {!editing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500">First Name</label>
              <div className="font-medium">{fields.firstName}</div>
            </div>
            <div>
              <label className="text-xs text-slate-500">Last Name</label>
              <div className="font-medium">{fields.lastName}</div>
            </div>
            <div>
              <label className="text-xs text-slate-500">Title</label>
              <div className="font-medium">{fields.title}</div>
            </div>
            <div>
              <label className="text-xs text-slate-500">Company</label>
              <div className="font-medium">{fields.company}</div>
            </div>
            <div>
              <label className="text-xs text-slate-500">Email</label>
              <div className="font-medium">{fields.email}</div>
            </div>
            <div>
              <label className="text-xs text-slate-500">Phone</label>
              <div className="font-medium">{fields.phone}</div>
            </div>
            <div>
              <label className="text-xs text-slate-500">Tags</label>
              <div className="font-medium">{fields.tags}</div>
            </div>
            <div>
              <label className="text-xs text-slate-500">Owner</label>
              <div className="font-medium">{fields.owner}</div>
            </div>
          </div>
        ) : (
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
        )}
      </div>

      {/* Activities */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-2">Recent Activities</h2>
        <ul className="divide-y">
          {activities.map((act, idx) => (
            <li key={idx} className="py-2 flex items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{act.type}</span>
              <span className="text-xs text-slate-500">{act.date}</span>
              <span className="text-sm">{act.desc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Notes & Attachments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow border p-6">
          <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><FileText size={18}/> Notes</h2>
          <ul className="space-y-2">
            {notes.map((note, idx) => (
              <li key={idx} className="border rounded p-2 bg-slate-50">
                <span className="font-semibold">{note.user}</span> <span className="text-xs text-slate-500">{note.date}</span>
                <div>{note.text}</div>
              </li>
            ))}
          </ul>
          <button className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"><FilePlus size={14}/> Add Note</button>
        </div>
        <div className="bg-white rounded-xl shadow border p-6">
          <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><FileText size={18}/> Attachments</h2>
          <ul className="space-y-2">
            {attachments.map((att, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <a href={att.url} className="text-blue-600 hover:underline">{att.file}</a>
                <span className="text-xs text-slate-500">uploaded {att.uploaded}</span>
              </li>
            ))}
          </ul>
          <button className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"><FilePlus size={14}/> Upload File</button>
        </div>
      </div>

      {/* Related Accounts & Leads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow border p-6">
          <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><Briefcase size={18}/> Related Accounts</h2>
          <ul className="space-y-2">
            {relatedAccounts.map((acc, idx) => (
              <li key={idx} className="flex flex-col">
                <span className="font-semibold">{acc.name}</span>
                <span className="text-xs text-slate-500">{acc.role}</span>
                <span className="text-xs text-blue-600">{acc.website}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow border p-6">
          <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><Users size={18}/> Related Leads</h2>
          <ul className="space-y-2">
            {relatedLeads.map((lead, idx) => (
              <li key={idx} className="flex flex-col">
                <span className="font-semibold">{lead.name}</span>
                <span className="text-xs text-slate-500">{lead.company}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tasks */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">Tasks</h2>
        <ul className="space-y-2">
          {tasks.map((t, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <input type="checkbox" checked={t.done} readOnly />
              <span className={t.done ? "line-through text-slate-400" : ""}>{t.task}</span>
              <span className="text-xs text-slate-500">Due {t.due}</span>
            </li>
          ))}
        </ul>
        <button className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"><FilePlus size={14}/> Add Task</button>
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">Audit Log</h2>
        <ul className="list-disc list-inside text-sm text-slate-700">
          <li>2025-05-11: Owner changed to Alice</li>
          <li>2025-05-10: Title updated to VP Sales</li>
          <li>2025-05-09: Contact created by Bob</li>
        </ul>
      </div>

      {/* Resource Center */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><HelpCircle size={18}/> Resource Center</h2>
        <ul className="list-disc list-inside text-sm text-slate-700">
          <li><a href="#" className="text-blue-600 hover:underline">Contact Management Guide</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">CRM Video Tutorials</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Contact Support</a></li>
        </ul>
      </div>
    </div>
  );
};

export default ContactDetail;
