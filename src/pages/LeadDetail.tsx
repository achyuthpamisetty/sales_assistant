import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import { Mail, PhoneCall, Briefcase, Award, HelpCircle, ArrowLeft, ExternalLink } from 'lucide-react';

const LeadDetail = () => {
  const { id } = useParams();
  const { leads, loading, getObjectById, opportunities } = useSalesforce();

  const lead = id ? getObjectById('leads', id) : null;

  const [insights, setInsights] = useState({
    gong: '',
    linkedin: '',
    zoominfo: '',
  });

  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [sendingIdx, setSendingIdx] = useState(null);

  useEffect(() => {
    if (!lead) return;

    const fetchInsights = async () => {
      const conversationSummary = `In the last few conversations, ${lead.firstName} discussed budget planning, highlighted interest in AI-driven tools, and expressed urgency around scaling their SDR team post-funding.`;
      const gongInsight = conversationSummary;
      const linkedinInsight = `${lead.firstName} shared a post about AI in sales.`;
      const zoominfoInsight = `${lead.company} recently raised Series B funding.`;

      setInsights({
        gong: gongInsight,
        linkedin: linkedinInsight,
        zoominfo: zoominfoInsight,
      });

      const email1 = `Hi ${lead.firstName},\n\nSaw your recent post on AI in sales-really insightful. I'd love to connect and share how we're helping similar companies post-Series B to scale their sales teams with AI-powered insights.\n\nBest,\n[Your Name]`;

      const email2 = `Hi ${lead.firstName},\n\nCongrats on your recent funding! Based on our last Gong call, I think we’re aligned on budget and timing. Ready to explore how we can partner?\n\nCheers,\n[Your Name]`;

      setEmailSuggestions([email1, email2]);
    };

    fetchInsights();
  }, [lead]);

  const sendEmail = async (emailContent) => {
    if (!lead?.email) return;
    setSendingIdx(emailSuggestions.indexOf(emailContent));
    try {
      // Simulate sending...
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

  // Related opportunities for this lead
  const relatedOpps = (opportunities || []).filter(
    opp => opp.accountName === lead.company || opp.leadId === lead.id
  );

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Lead Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-xl shadow border">
        <div>
          <Link to="/leads" className="inline-flex items-center text-blue-600 hover:underline mb-2">
            <ArrowLeft className="mr-1" size={18}/> Back to Leads
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <h1 className="text-2xl font-bold text-slate-900">{lead.firstName} {lead.lastName}</h1>
            {lead.salesforceUrl && (
              <a href={lead.salesforceUrl} target="_blank" rel="noopener noreferrer" title="View in Salesforce">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" className="ml-1 inline">
                  <circle cx="16" cy="16" r="16" fill="#00A1E0"/>
                  <text x="16" y="22" textAnchor="middle" fontSize="15" fill="#fff" fontFamily="Arial, sans-serif">SF</text>
                </svg>
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-2 text-slate-700 text-sm">
            <span className="flex items-center gap-1"><Briefcase size={16}/> {lead.company}</span>
            <span className="flex items-center gap-1"><PhoneCall size={16}/> {lead.phone}</span>
            <span className="flex items-center gap-1"><Mail size={16}/> {lead.email}</span>
            <span className="inline-flex rounded-full bg-green-100 text-green-800 text-xs px-2 py-1 font-semibold ml-2">
              Score: {lead.leadScore ?? 0}
            </span>
            {lead.status && (
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ml-2 ${
                lead.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                lead.status === 'Working' ? 'bg-yellow-100 text-yellow-800' :
                'bg-slate-100 text-slate-800'
              }`}>
                {lead.status}
              </span>
            )}
          </div>
        </div>
        {/* Quick Actions */}
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
        </div>
      </div>

      {/* Stats & Goal Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow border p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-lg mb-1">Lead Stats</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between"><span>Opportunities:</span><span>{relatedOpps.length}</span></div>
            <div className="flex justify-between"><span>Last Activity:</span><span>{lead.lastActivity || 'N/A'}</span></div>
            <div className="flex justify-between"><span>Status:</span><span>{lead.status || 'N/A'}</span></div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-sm mb-1">Goal Progress</h3>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div className="bg-green-600 h-3 rounded-full text-right pr-2 text-white text-xs flex items-center justify-end"
                style={{ width: `${Math.min((lead.leadScore || 0), 100)}%` }}>
                {lead.leadScore ?? 0}%
              </div>
            </div>
            <span className="text-xs text-slate-500">Lead score goal: 100</span>
          </div>
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
      </div>

      {/* Activity Timeline & Related Opps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Activity */}
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
        {/* Related Opportunities */}
        <div className="bg-white rounded-xl shadow border p-6">
          <h2 className="font-semibold text-lg mb-2">Related Opportunities</h2>
          {relatedOpps.length > 0 ? (
            <ul className="divide-y">
              {relatedOpps.map(opp => (
                <li key={opp.id} className="py-2 flex justify-between items-center">
                  <div>
                    <Link to={`/opportunities/${opp.id}`} className="text-blue-700 font-semibold hover:underline">{opp.name}</Link>
                    <div className="text-xs text-slate-500">{opp.stage}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">${opp.amount?.toLocaleString() || 'N/A'}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 text-sm">No related opportunities found.</p>
          )}
        </div>
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
