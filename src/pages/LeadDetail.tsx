import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import { Mail, PhoneCall, Briefcase, Award, HelpCircle, ArrowLeft } from 'lucide-react';

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
  });

  const [insights, setInsights] = useState({
    gong: '',
    linkedin: '',
    zoominfo: '',
  });

  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [sendingIdx, setSendingIdx] = useState(null);
  const [saving, setSaving] = useState(false);

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
      });
    }
  }, [lead]);

  useEffect(() => {
    if (!lead) return;
    const fetchInsights = async () => {
      const conversationSummary = `In the last few conversations, ${lead.firstName} discussed budget planning, highlighted interest in AI-driven tools, and expressed urgency around scaling their SDR team post-funding.`;
      setInsights({
        gong: conversationSummary,
        linkedin: `${lead.firstName} shared a post about AI in sales.`,
        zoominfo: `${lead.company} recently raised Series B funding.`,
      });

      setEmailSuggestions([
        `Hi ${lead.firstName},\n\nSaw your recent post on AI in sales-really insightful. I'd love to connect and share how we're helping similar companies post-Series B to scale their sales teams with AI-powered insights.\n\nBest,\n[Your Name]`,
        `Hi ${lead.firstName},\n\nCongrats on your recent funding! Based on our last Gong call, I think we’re aligned on budget and timing. Ready to explore how we can partner?\n\nCheers,\n[Your Name]`
      ]);
    };
    fetchInsights();
  }, [lead]);

  const handleFieldChange = (field, value) => {
    setEditFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // updateLead should be implemented in your context/provider
      await updateLead(lead.id, editFields);
      alert('Lead details updated!');
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
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Lead Header */}
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
                'bg-slate-100 text-slate-800'
              }`}>
                {editFields.status}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Lead Details (Editable) */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-4">Lead Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">First Name</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={editFields.firstName}
              onChange={e => handleFieldChange('firstName', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Last Name</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={editFields.lastName}
              onChange={e => handleFieldChange('lastName', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Company</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={editFields.company}
              onChange={e => handleFieldChange('company', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded p-2 mt-1"
              value={editFields.email}
              onChange={e => handleFieldChange('email', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              value={editFields.phone}
              onChange={e => handleFieldChange('phone', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Lead Score</label>
            <input
              type="number"
              min={0}
              max={100}
              className="w-full border rounded p-2 mt-1"
              value={editFields.leadScore}
              onChange={e => handleFieldChange('leadScore', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              className="w-full border rounded p-2 mt-1"
              value={editFields.status}
              onChange={e => handleFieldChange('status', e.target.value)}
            >
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Salesforce URL</label>
            <input
              type="url"
              className="w-full border rounded p-2 mt-1"
              value={editFields.salesforceUrl}
              onChange={e => handleFieldChange('salesforceUrl', e.target.value)}
            />
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

      {/* Insights */}
      <div className="bg-white rounded-xl shadow border p-6 flex flex-col gap-3">
        <h2 className="font-semibold text-lg mb-1">Insights</h2>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li><strong>Conversation Summary:</strong> {insights.gong}</li>
          <li><strong>LinkedIn:</strong> {insights.linkedin}</li>
          <li><strong>ZoomInfo:</strong> {insights.zoominfo}</li>
        </ul>
      </div>

      {/* Suggested Emails */}
      <div className="bg-white rounded-xl shadow border p-6 flex flex-col gap-3">
        <h2 className="font-semibold text-lg mb-1">Suggested Emails</h2>
        {emailSuggestions.map((email, idx) => (
          <div key={idx} className="border p-3 rounded bg-slate-50 text-sm whitespace-pre-wrap mb-2">
            {email}
            <button
              className="mt-3 bg-blue-600 text-white py-1 px-3 rounded-full text-xs flex items-center gap-1"
              onClick={() => sendEmail(email)}
              disabled={sendingIdx === idx}
            >
              {sendingIdx === idx ? 'Sending...' : <><Mail size={14}/> Send Email</>}
            </button>
          </div>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="font-semibold text-lg mb-2">Activity</h2>
        {lead.activity && lead.activity.length > 0 ? (
          <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
            {lead.activity.map((act, idx) => (
              <li key={idx}>{act}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 text-sm">No recent activity available.</p>
        )}
      </div>

      {/* Resource Center */}
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
