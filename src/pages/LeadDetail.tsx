import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import {
  Mail, PhoneCall, Briefcase, Award, HelpCircle, ArrowLeft, Edit,
  FileText, UserCheck, Activity, Calendar, Star, Users, FilePlus, BarChart2, Bell
} from 'lucide-react';

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

  // Improved Insights state
  const [insights, setInsights] = useState({
    linkedin: '',
    funding: '',
    news: '',
    gong: '',
    tech: '',
    reviews: '',
  });
  const [insightsLoading, setInsightsLoading] = useState(false);

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

  // Improved Insights fetching
  useEffect(() => {
    if (!lead) return;
    setInsightsLoading(true);
    setTimeout(() => {
      setInsights({
        linkedin: `🔗 ${lead.company} featured in LinkedIn News: "${lead.company} expands into APAC market."`,
        funding: `💸 ${lead.company} raised $25M Series B funding from Sequoia Capital in March 2025.`,
        news: `📰 Forbes: "${lead.company} launches AI-powered sales platform" (May 2025)`,
        gong: `🎤 Gong transcript: "${lead.firstName} asked about onboarding speed and integration with Salesforce. Expressed urgency to deploy before Q3."`,
        tech: `🛠️ BuiltWith: ${lead.company} recently migrated to HubSpot and adopted Segment.`,
        reviews: `⭐ Glassdoor: Employee reviews highlight strong growth and focus on innovation.`,
      });
      setInsightsLoading(false);
    }, 1200);

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
