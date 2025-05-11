import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import { Mail, PhoneCall, Briefcase, Award, HelpCircle, ArrowLeft, Edit, FileText, UserCheck, Activity, Calendar, Star, Users, FilePlus, BarChart2, Bell, ExternalLink } from 'lucide-react';

const statusOptions = ['Open', 'Working', 'Qualified', 'Unqualified', 'Converted'];

const LeadDetail = () => {
  const { id } = useParams();
  const { leads, loading, getObjectById, updateLead } = useSalesforce();

  const lead = id ? getObjectById('leads', id) : null;

  // Editable fields state
  const [editFields, setEditFields] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    leadScore: 0,
    status: '',
    salesforceUrl: '',
    owner: '',
    source: '',
    tags: '',
    notes: '',
  });

  const [insights, setInsights] = useState({
    gong: '',
    linkedin: '',
    zoominfo: '',
  });

  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [sendingIdx, setSendingIdx] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // Dummy data for demo features
  const activityTimeline = [
    { type: 'call', date: '2025-05-09', desc: 'Intro call with Sarah' },
    { type: 'email', date: '2025-05-10', desc: 'Sent product deck' },
    { type: 'meeting', date: '2025-05-11', desc: 'Demo scheduled' },
  ];
  const notes = [
    { user: 'Alice', date: '2025-05-10', text: 'Lead is very interested in AI.' },
    { user: 'Bob', date: '2025-05-11', text: 'Asked for pricing details.' },
  ];
  const attachments = [
    { file: 'Product_Deck.pdf', url: '#', uploaded: '2025-05-10' },
    { file: 'Contract_Draft.docx', url: '#', uploaded: '2025-05-11' },
  ];
  const tasks = [
    { task: 'Send follow-up email', due: '2025-05-12', done: false },
    { task: 'Schedule next call', due: '2025-05-13', done: false },
  ];
  const leadScoreBreakdown = [
    { label: 'Opened 3 emails', value: 15 },
    { label: 'Attended demo', value: 30 },
    { label: 'Visited pricing page', value: 20 },
    { label: 'Replied to email', value: 17 },
  ];
  const notifications = [
    { icon: <Bell size={16} />, text: 'New activity logged today' },
    { icon: <Bell size={16} />, text: 'Lead score increased by 5' },
  ];
  const relatedContacts = [
    { name: 'Priya Patel', role: 'VP Sales', email: 'priya@company.com' },
    { name: 'James Lee', role: 'CTO', email: 'james@company.com' },
  ];

  // Initialize editable fields when lead loads
  useEffect(() => {
    if (lead) {
      setEditFields({
        firstName: lead.firstName || '',
        lastName: lead.lastName || '',
        company: lead.company || '',
        email: lead.email || '',
        phone: lead.phone || '',
        leadScore: lead.leadScore || 0,
        status: lead.status || 'Open',
        salesforceUrl: lead.salesforceUrl || '',
        owner: lead.owner || 'Unassigned',
        source: lead.source || 'Web',
        tags: lead.tags || 'AI, SaaS',
        notes: lead.notes || '',
      });
    }
  }, [lead]);

  useEffect(() => {
    if (!lead) return;
    setInsights({
      gong: `Recent calls: ${lead.firstName} discussed budget and AI tools.`,
      linkedin: `${lead.firstName} shared a post about AI in sales.`,
      zoominfo: `${lead.company} recently raised Series B funding.`,
    });
    setEmailSuggestions([
      `Hi ${lead.firstName},\n\nSaw your recent post on AI in sales-really insightful. Let's connect!\n\nBest,\n[Your Name]`,
      `Hi ${lead.firstName},\n\nCongrats on your recent funding! Ready to explore how we can partner?\n\nCheers,\n[Your Name]`
    ]);
  }, [lead]);

  const handleFieldChange = (field, value) => {
    setEditFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateLead(lead.id, editFields);
      alert('Lead details updated!');
      setShowEdit(false);
    } catch (e) {
      alert('Failed to update lead.');
    }
    setSaving(false);
  };

  const sendEmail = async (emailContent) => {
    if (!lead?.email) return;
    setSendingIdx(emailSuggestions.indexOf(emailContent));
    try {
      await new Promise(res => setTimeout(res, 1200));
      alert(`Email sent to ${lead.email}`);
    } catch (error) {
      alert('Error sending email');
    } finally {
      setSendingIdx(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-slate-500">Loading lead details...</div>;
  }

  if (!lead) {
    return (
      <div className="p-6 text-gray-600">
        Lead not found. Please check the URL or try again later.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8">

      {/* 1. Lead Header with Salesforce Link, Owner, Status, Score, Tags */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-xl shadow border">
        <div>
          <Link to="/leads" className="inline-flex items-center text-blue-600 hover:underline mb-2">
            <ArrowLeft className="mr-1" size={18}/> Back to Leads
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <h1 className="text-2xl font-bold text-slate-900">{editFields.firstName} {editFields.lastName}</h1>
            {editFields.salesforceUrl && (
              <a href={editFields.salesforceUrl} target="_blank" rel="noopener noreferrer" title="View in Salesforce">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" className="ml-1 inline">
                  <circle cx="16" cy="16" r="16" fill="#00A1E0"/>
                  <text x="16" y="22" textAnchor="middle" fontSize="15" fill="#fff" fontFamily="Arial, sans-serif">SF</text>
                </svg>
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-2 text-slate-700 text-sm">
            <span className="flex items-center gap-1"><Briefcase size={16}/> {editFields.company}</span>
            <span className="flex items-center gap-1"><PhoneCall size={16}/> {editFields.phone}</span>
            <span className="flex items-center gap-1"><Mail size={16}/> {editFields.email}</span>
            <span className="inline-flex rounded-full bg-green-100 text-green-800 text-xs px-2 py-1 font-semibold ml-2">
              Score: {editFields.leadScore}
            </span>
            {editFields.status && (
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ml-2 ${
                editFields.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                editFields.status === 'Working' ? 'bg-yellow-100 text-yellow-800' :
                editFields.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                editFields.status === 'Unqualified' ? 'bg-red-100 text-red-800' :
                'bg-slate-100 text-slate-800'
              }`}>
                {editFields.status}
              </span>
            )}
            <span className="inline-flex rounded-full bg-violet-100 text-violet-800 text-xs px-2 py-1 ml-2">
              Owner: {editFields.owner}
            </span>
            <span className="inline-flex rounded-full bg-slate-100 text-slate-800 text-xs px-2 py-1 ml-2">
              Source: {editFields.source}
            </span>
            <span className="inline-flex rounded-full bg-orange-100 text-orange-800 text-xs px-2 py-1 ml-2">
              Tags: {editFields.tags}
            </span>
          </div>
        </div>
        {/* 2. Quick Actions */}
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-1">
            <PhoneCall size={16}/> Log Call
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-1">
            <Mail size={16}/> Send Email
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center gap-1">
            <Award size={16}/> Add Note
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-1" onClick={() => setShowEdit(v => !v)}>
            <Edit size={16}/> {showEdit ? 'Cancel' : 'Edit'}
          </button>
        </div>
      </div>

      {/* 3. Notifications/Alerts */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 flex items-center gap-4 shadow-sm">
        {notifications.map((n, i) => (
          <div key={i} className="flex items-center gap-2 text-yellow-800 text-sm">{n.icon}{n.text}</div>
        ))}
      </div>

      {/* 4. Editable Lead Details Form */}
      {showEdit && (
        <div className="bg-white rounded-xl shadow border p-6">
          <h2 className="font-semibold text-lg mb-4">Edit Lead Details</h2>
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
              <label className="text-sm font-medium">Lead Score</label>
              <input type="number" min={0} max={100} className="w-full border rounded p-2 mt-1" value={editFields.leadScore} onChange={e => handleFieldChange('leadScore', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <select className="w-full border rounded p-2 mt-1" value={editFields.status} onChange={e => handleFieldChange('status', e.target.value)}>
                {statusOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Salesforce URL</label>
              <input type="url" className="w-full border rounded p-2 mt-1" value={editFields.salesforceUrl} onChange={e => handleFieldChange('salesforceUrl', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Owner</label>
              <input type="text" className="w-full border rounded p-2 mt-1" value={editFields.owner} onChange={e => handleFieldChange('owner', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Source</label>
              <input type="text" className="w-full border rounded p-2 mt-1" value={editFields.source} onChange={e => handleFieldChange('source', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Tags</label>
              <input type="text" className="w-full border rounded p-2 mt-1" value={editFields.tags} onChange={e => handleFieldChange('tags', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <textarea className="w-full border rounded p-2 mt-1" value={editFields.notes} onChange={e => handleFieldChange('notes', e.target.value)} />
            </div>
          </div>
          <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Details'}
          </button>
        </div>
      )}

      {/* 5. Lead Score Breakdown */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><Star size={18}/> Lead Score Breakdown</h2>
        <ul className="list-disc list-inside text-sm text-slate-700">
          {leadScoreBreakdown.map((item, idx) => (
            <li key={idx}>{item.label} <span className="text-xs text-slate-500 ml-2">+{item.value}</span></li>
          ))}
        </ul>
      </div>

      {/* 6. Insights */}
      <div className="bg-white rounded-xl shadow border p-6 flex flex-col gap-3">
        <h2 className="font-semibold text-lg mb-1">Insights</h2>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li><strong>Conversation Summary:</strong> {insights.gong}</li>
          <li><strong>LinkedIn:</strong> {insights.linkedin}</li>
          <li><strong>ZoomInfo:</strong> {insights.zoominfo}</li>
        </ul>
      </div>

      {/* 7. Suggested Emails */}
      <div className="bg-white rounded-xl shadow border p-6 flex flex-col gap-3">
        <h2 className="font-semibold text-lg mb-1">Suggested Emails</h2>
        {emailSuggestions.map((email, idx) => (
          <div key={idx} className="border p-3 rounded bg-slate-50 text-sm whitespace-pre-wrap mb-2">
            {email}
            <button className="mt-3 bg-blue-600 text-white py-1 px-3 rounded-full text-xs flex items-center gap-1"
              onClick={() => sendEmail(email)}
              disabled={sendingIdx === idx}
            >
              {sendingIdx === idx ? 'Sending...' : <><Mail size={14}/> Send Email</>}
            </button>
          </div>
        ))}
      </div>

      {/* 8. Activity Timeline */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><Activity size={18}/> Activity Timeline</h2>
        <ul className="divide-y">
          {activityTimeline.map((act, idx) => (
            <li key={idx} className="py-2 flex items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{act.type}</span>
              <span className="text-xs text-slate-500">{act.date}</span>
              <span className="text-sm">{act.desc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 9. Notes & Comments */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><FileText size={18}/> Notes & Comments</h2>
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

      {/* 10. Attachments */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><BarChart2 size={18}/> Attachments</h2>
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

      {/* 11. Tasks for this Lead */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><Calendar size={18}/> Tasks</h2>
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

      {/* 12. Related Contacts */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><Users size={18}/> Related Contacts</h2>
        <ul className="space-y-2">
          {relatedContacts.map((c, idx) => (
            <li key={idx} className="flex flex-col">
              <span className="font-semibold">{c.name}</span>
              <span className="text-xs text-slate-500">{c.role}</span>
              <span className="text-xs text-blue-600">{c.email}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 13. Audit Log */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><UserCheck size={18}/> Audit Log</h2>
        <ul className="list-disc list-inside text-sm text-slate-700">
          <li>2025-05-11: Owner changed to Alice</li>
          <li>2025-05-10: Status updated to Qualified</li>
          <li>2025-05-09: Lead created by Bob</li>
        </ul>
      </div>

      {/* 14. Lead Conversion Button */}
      <div className="bg-white rounded-xl shadow border p-6 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><UserCheck size={18}/> Convert Lead</h2>
          <p className="text-sm text-slate-700">Ready to convert this lead to an opportunity or account?</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 text-lg font-bold">Convert Lead</button>
      </div>

      {/* 15. Resource Center */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><HelpCircle size={18}/> Resource Center</h2>
        <ul className="list-disc list-inside text-sm text-slate-700">
          <li><a href="#" className="text-blue-600 hover:underline">Lead Nurturing Guide</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">CRM Video Tutorials</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Contact Support</a></li>
        </ul>
      </div>
    </div>
  );
};

export default LeadDetail;
