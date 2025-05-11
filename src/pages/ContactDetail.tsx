import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import { Mail, PhoneCall, Briefcase, Users, FileText, FilePlus, Edit, ArrowLeft, HelpCircle } from 'lucide-react';

const ContactDetail = () => {
  const { id } = useParams();
  const { contacts, loading, getObjectById, updateContact } = useSalesforce();

  const contact = id ? getObjectById('contacts', id) : null;

  // Editable fields
  const [editFields, setEditFields] = useState({
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

  // Demo data
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
      setEditFields({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        title: contact.title || '',
        company: contact.company || '',
        email: contact.email || '',
        phone: contact.phone || '',
        tags: contact.tags || 'AI, SaaS',
        owner: contact.owner || 'Unassigned',
      });
    }
  }, [contact]);

  const handleFieldChange = (field, value) => {
    setEditFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContact(contact.id, editFields);
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-xl shadow border">
        <div>
          <Link to="/contacts" className="inline-flex items-center text-blue-600 hover:underline mb-2">
            <ArrowLeft className="mr-1" size={18}/> Back to Contacts
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <h1 className="text-2xl font-bold text-slate-900">{editFields.firstName} {editFields.lastName}</h1>
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
          <div className="flex flex-wrap gap-3 mt-2 text-slate-700 text-sm">
            <span className="flex items-center gap-1"><Briefcase size={16}/> {editFields.company}</span>
            <span className="flex items-center gap-1"><Mail size={16}/> {editFields.email}</span>
            <span className="flex items-center gap-1"><PhoneCall size={16}/> {editFields.phone}</span>
            <span className="inline-flex rounded-full bg-violet-100 text-violet-800 text-xs px-2 py-1 ml-2">
              Owner: {editFields.owner}
            </span>
            <span className="inline-flex rounded-full bg-orange-100 text-orange-800 text-xs px-2 py-1 ml-2">
              Tags: {editFields.tags}
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-1" onClick={() => setEditing(v => !v)}>
            <Edit size={16}/> {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Editable Contact Details */}
      {editing && (
        <div className="bg-white rounded-xl shadow border p-6">
          <h2 className="font-semibold text-lg mb-4">Edit Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <input type="text" className="w-full border rounded p-2 mt-1" value={editFields.firstName} onChange={e => handleFieldChange('firstName', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input type="text" className="w-full border rounded p-2 mt-1" value={editFields.lastName} onChange={e => handleFieldChange('lastName', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Title</label>
              <input type="text" className="w-full border rounded p-2 mt-1" value={editFields.title} onChange={e => handleFieldChange('title', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Company</label>
              <input type="text" className="w-full border rounded p-2 mt-1" value={editFields.company} onChange={e => handleFieldChange('company', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" className="w-full border rounded p-2 mt-1" value={editFields.email} onChange={e => handleFieldChange('email', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <input type="text" className="w-full border rounded p-2 mt-1" value={editFields.phone} onChange={e => handleFieldChange('phone', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Tags</label>
              <input type="text" className="w-full border rounded p-2 mt-1" value={editFields.tags} onChange={e => handleFieldChange('tags', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Owner</label>
              <input type="text" className="w-full border rounded p-2 mt-1" value={editFields.owner} onChange={e => handleFieldChange('owner', e.target.value)} />
            </div>
          </div>
          <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Details'}
          </button>
        </div>
      )}

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
