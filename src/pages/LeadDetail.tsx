import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import { Mail, PhoneCall, Briefcase, Award, HelpCircle, ArrowLeft, Edit, FileText, UserCheck, Activity, Calendar, Star, Users, FilePlus, BarChart2, Bell } from 'lucide-react';

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

  // Automated Follow-ups state
  const [showFollowup, setShowFollowup] = useState(false);
  const [followupCount, setFollowupCount] = useState(2);
  const [followupTemplates, setFollowupTemplates] = useState([
    '',
    ''
  ]);
  const [followupDelay, setFollowupDelay] = useState(3);
  const [personalizingIdx, setPersonalizingIdx] = useState(null);

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
      // Pre-fill followup templates with personalized defaults
      setFollowupTemplates([
        `Hi ${lead.firstName},\n\nJust checking in after our last conversation. Let me know if you have any questions!\n\nBest,\n[Your Name]`,
        `Hi ${lead.firstName},\n\nWanted to touch base again. Is there a good time to connect this week?\n\nBest,\n[Your Name]`
      ]);
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

      {/* Automated Follow-ups with Personalized Email Writing */}
      <div className="bg-white rounded-xl shadow border p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Mail size={18} /> Automated Follow-ups
          </h2>
          <button
            className="text-blue-600 hover:underline text-sm"
            onClick={() => setShowFollowup(v => !v)}
          >
            {showFollowup ? 'Hide' : 'Setup'}
          </button>
        </div>
        {showFollowup && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Number of Follow-ups</label>
              <select
                className="ml-2 border rounded p-1"
                value={followupCount}
                onChange={e => {
                  const count = Number(e.target.value);
                  setFollowupCount(count);
                  setFollowupTemplates(prev => {
                    const arr = [...prev];
                    while (arr.length < count) arr.push('');
                    return arr.slice(0, count);
                  });
                }}
              >
                {[1, 2, 3].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Days Between Follow-ups</label>
              <input
                type="number"
                min={1}
                className="ml-2 border rounded p-1 w-20"
                value={followupDelay}
                onChange={e => setFollowupDelay(Number(e.target.value))}
              />
            </div>
            {Array.from({ length: followupCount }).map((_, idx) => (
              <div key={idx} className="mb-3">
                <label className="text-sm font-medium">Email {idx + 1}</label>
                {personalizingIdx === idx ? (
                  <textarea
                    className="w-full border rounded p-2 mt-1"
                    rows={5}
                    value={followupTemplates[idx]}
                    onChange={e => {
                      const arr = [...followupTemplates];
                      arr[idx] = e.target.value;
                      setFollowupTemplates(arr);
                    }}
                    onBlur={() => setPersonalizingIdx(null)}
                    autoFocus
                  />
                ) : (
                  <div
                    className="w-full border rounded p-2 mt-1 bg-slate-50 cursor-pointer whitespace-pre-wrap"
                    onClick={() => setPersonalizingIdx(idx)}
                    title="Click to personalize"
                  >
                    {followupTemplates[idx] || <span className="text-slate-400">Click to write personalized email...</span>}
                  </div>
                )}
              </div>
            ))}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => {
                alert(
                  `Scheduled ${followupCount} follow-up(s) for ${editFields.firstName} with ${followupDelay} day(s) between each.`
                );
              }}
            >
              Schedule Follow-ups
            </button>
          </div>
        )}
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

      {/* ...rest of your sections (score breakdown, insights, suggested emails, etc) ... */}
      {/* ... No changes needed below ... */}
    </div>
  );
};

export default LeadDetail;
