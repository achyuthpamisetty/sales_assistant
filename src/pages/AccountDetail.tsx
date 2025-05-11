import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import ObjectDetail from '../components/objects/ObjectDetail';
import { Mail, PhoneCall, Briefcase, Users, FileText, FilePlus, Globe, Edit, ArrowLeft, HelpCircle } from 'lucide-react';

const industryOptions = ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Other'];

const AccountDetail = () => {
  const { id } = useParams();
  const { accounts, loading, getObjectById, updateAccount } = useSalesforce();

  const account = id ? getObjectById('accounts', id) : null;

  // Editable fields
  const [editFields, setEditFields] = useState({
    name: '',
    owner: '',
    type: '',
    industry: '',
    website: '',
    employees: '',
    tags: '',
  });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Insights and score
  const [insights, setInsights] = useState({ gong: '', linkedin: '', zoominfo: '' });
  const [accountScore, setAccountScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState([]);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Demo data
  const activities = [
    { type: 'call', date: '2025-05-09', desc: 'QBR call with Sarah' },
    { type: 'email', date: '2025-05-10', desc: 'Sent renewal proposal' },
    { type: 'meeting', date: '2025-05-11', desc: 'Implementation kickoff' },
  ];
  const notes = [
    { user: 'Alice', date: '2025-05-10', text: 'Account is considering expansion.' },
    { user: 'Bob', date: '2025-05-11', text: 'Requested case studies.' },
  ];
  const attachments = [
    { file: 'QBR_Slides.pdf', url: '#', uploaded: '2025-05-10' },
    { file: 'Renewal_Proposal.docx', url: '#', uploaded: '2025-05-11' },
  ];
  const relatedContacts = [
    { name: 'Priya Patel', role: 'VP Sales', email: 'priya@company.com' },
    { name: 'James Lee', role: 'CTO', email: 'james@company.com' },
  ];
  const tasks = [
    { task: 'Send follow-up email', due: '2025-05-12', done: false },
    { task: 'Schedule QBR', due: '2025-05-13', done: false },
  ];

  const salesforceBaseUrl = "https://yourInstance.salesforce.com";
  const salesforceUrl = account ? `${salesforceBaseUrl}/${account.id}` : null;

  // Initialize editable fields
  useEffect(() => {
    if (account) {
      setEditFields({
        name: account.name || '',
        owner: account.owner || 'Unassigned',
        type: account.type || 'Customer',
        industry: account.industry || 'Technology',
        website: account.website || '',
        employees: account.employees || '',
        tags: account.tags || 'SaaS, AI',
      });
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      setInsightsLoading(true);
      const fetchInsights = async () => {
        try {
          const gongInsight = `Multiple stakeholders from ${account.name} discussed implementation timelines in the last QBR.`;
          const linkedinInsight = `${account.name} recently posted a job opening for a Revenue Operations Manager.`;
          const zoominfoInsight = `${account.name} expanded headcount by 25% in the last quarter.`;

          setInsights({
            gong: gongInsight,
            linkedin: linkedinInsight,
            zoominfo: zoominfoInsight,
          });

          let score = 0;
          const breakdown = [];
          if (gongInsight) { score += 30; breakdown.push({ label: 'Recent QBR', value: 30 }); }
          if (linkedinInsight) { score += 20; breakdown.push({ label: 'Active Hiring', value: 20 }); }
          if (zoominfoInsight) { score += 25; breakdown.push({ label: 'Headcount Growth', value: 25 }); }
          if (account.employees && account.employees > 1000) { score += 25; breakdown.push({ label: 'Large Company', value: 25 }); }

          setAccountScore(score);
          setScoreBreakdown(breakdown);
        } catch (err) {
          setError('Failed to load insights.');
        } finally {
          setInsightsLoading(false);
        }
      };
      fetchInsights();
    }
  }, [account]);

  const handleFieldChange = (field, value) => {
    setEditFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAccount(account.id, editFields);
      alert('Account updated!');
      setEditing(false);
    } catch (e) {
      alert('Failed to update account.');
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="p-8 text-slate-500">Loading account details...</div>;
  }

  if (!account) {
    return (
      <div className="p-6 text-gray-600">
        Account not found. Please check the URL or try again later.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-xl shadow border">
        <div>
          <Link to="/accounts" className="inline-flex items-center text-blue-600 hover:underline mb-2">
            <ArrowLeft className="mr-1" size={18}/> Back to Accounts
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <h1 className="text-2xl font-bold text-slate-900">{editFields.name}</h1>
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
            <span className="flex items-center gap-1"><Briefcase size={16}/> {editFields.type}</span>
            <span className="flex items-center gap-1"><Globe size={16}/> {editFields.website}</span>
            <span className="flex items-center gap-1"><Users size={16}/> Employees: {editFields.employees}</span>
            <span className="inline-flex rounded-full bg-violet-100 text-violet-800 text-xs px-2 py-1 ml-2">
              Owner: {editFields.owner}
            </span>
            <span className="inline-flex rounded-full bg-slate-100 text-slate-800 text-xs px-2 py-1 ml-2">
              Industry: {editFields.industry}
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

      {/* Editable Account Details */}
      {editing && (
        <div className="bg-white rounded-xl shadow border p-6">
          <h2 className="font-semibold text-lg mb-4">Edit Account Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Account Name</label>
              <input type="text" className="w-full border rounded p-2 mt-1" value={editFields.name} onChange={e => handleFieldChange('name', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Owner</label>
              <input type="text" className="w-full border rounded p-2 mt-1" value={editFields.owner} onChange={e => handleFieldChange('owner', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Type</label>
              <input type="text" className="w-full border rounded p-2 mt-1" value={editFields.type} onChange={e => handleFieldChange('type', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Industry</label>
              <select className="w-full border rounded p-2 mt-1" value={editFields.industry} onChange={e => handleFieldChange('industry', e.target.value)}>
                {industryOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Website</label>
              <input type="url" className="w-full border rounded p-2 mt-1" value={editFields.website} onChange={e => handleFieldChange('website', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Employees</label>
              <input type="number" min={0} className="w-full border rounded p-2 mt-1" value={editFields.employees} onChange={e => handleFieldChange('employees', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Tags</label>
              <input type="text" className="w-full border rounded p-2 mt-1" value={editFields.tags} onChange={e => handleFieldChange('tags', e.target.value)} />
            </div>
          </div>
          <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Details'}
          </button>
        </div>
      )}

      {/* Account Score & Breakdown */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h3 className="text-lg font-semibold text-slate-800">Account Score</h3>
        <p className="text-sm text-slate-600 mb-2">
          <strong>Score: </strong>{accountScore} / 100
        </p>
        <div className="w-full bg-gray-300 rounded-full h-2 mb-3">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${accountScore}%` }}></div>
        </div>
        <ul className="list-disc list-inside text-sm text-slate-700">
          {scoreBreakdown.map((item, idx) => (
            <li key={idx}>{item.label} <span className="text-xs text-slate-500 ml-2">+{item.value}</span></li>
          ))}
        </ul>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-3">Insights</h2>
        {error && <p className="text-red-600">{error}</p>}
        {insightsLoading ? (
          <div className="text-center text-slate-500">Loading insights...</div>
        ) : (
          <div className="space-y-3">
            <div className="border rounded-lg p-4 bg-slate-50">
              <h3 className="font-medium text-slate-700 mb-1">🔊 Gong</h3>
              <p className="text-sm text-slate-600">{insights.gong}</p>
            </div>
            <div className="border rounded-lg p-4 bg-slate-50">
              <h3 className="font-medium text-slate-700 mb-1">💼 LinkedIn</h3>
              <p className="text-sm text-slate-600">{insights.linkedin}</p>
            </div>
            <div className="border rounded-lg p-4 bg-slate-50">
              <h3 className="font-medium text-slate-700 mb-1">📊 ZoomInfo</h3>
              <p className="text-sm text-slate-600">{insights.zoominfo}</p>
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

      {/* Related Contacts */}
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

      {/* Tasks for this Account */}
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
          <li>2025-05-10: Type updated to Customer</li>
          <li>2025-05-09: Account created by Bob</li>
        </ul>
      </div>

      {/* Resource Center */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2"><HelpCircle size={18}/> Resource Center</h2>
        <ul className="list-disc list-inside text-sm text-slate-700">
          <li><a href="#" className="text-blue-600 hover:underline">Account Management Guide</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">CRM Video Tutorials</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Contact Support</a></li>
        </ul>
      </div>
    </div>
  );
};

export default AccountDetail;
