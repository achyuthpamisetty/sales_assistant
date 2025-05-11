import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import ObjectDetail from '../components/objects/ObjectDetail';

const LeadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { leads, loading, getObjectById } = useSalesforce();

  const lead = id ? getObjectById('leads', id) : null;

  const [insights, setInsights] = useState({
    gong: '',
    linkedin: '',
    zoominfo: '',
  });

  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!lead) return;

    const fetchInsights = async () => {
      const conversationSummary = `In the last few conversations, ${lead.name} discussed budget planning, highlighted interest in AI-driven tools, and expressed urgency around scaling their SDR team post-funding.`;

      const gongInsight = conversationSummary;
      const linkedinInsight = `${lead.name} shared a post about AI in sales.`;
      const zoominfoInsight = `${lead.company} recently raised Series B funding.`;

      setInsights({
        gong: gongInsight,
        linkedin: linkedinInsight,
        zoominfo: zoominfoInsight,
      });

      const email1 = `Hi ${lead.name},\n\nSaw your recent post on AI in sales—really insightful. I'd love to connect and share how we're helping similar companies post-Series B to scale their sales teams with AI-powered insights.\n\nBest,\n[Your Name]`;

      const email2 = `Hi ${lead.name},\n\nCongrats on your recent funding! Based on our last Gong call, I think we’re aligned on budget and timing. Ready to explore how we can partner?\n\nCheers,\n[Your Name]`;

      setEmailSuggestions([email1, email2]);
    };

    fetchInsights();
  }, [lead]);

  const sendEmail = async (emailContent: string) => {
    if (!lead?.email) return;

    try {
      const email = `From: "your-email@gmail.com"
To: ${lead.email}
Subject: Follow-up: ${lead.name}

${emailContent}`;

      const encodedMessage = btoa(email).replace(/\+/g, '-').replace(/\//g, '_');
      const accessToken = "YOUR_OAUTH_ACCESS_TOKEN";

      const res = await fetch('https://www.googleapis.com/upload/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raw: encodedMessage,
        }),
      });

      const response = await res.json();
      console.log('Email sent successfully:', response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  if (!lead) {
    return (
      <div className="p-6 text-gray-600">
        Lead not found. Please check the URL or try again later.
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-6">
        <ObjectDetail
          type="lead"
          data={lead}
          backPath="/leads"
          title="Leads"
          isLoading={loading}
        />
      </div>

      <div className="w-full lg:w-1/3 space-y-6">
        {/* Insights */}
        <div className="rounded-xl border p-6 shadow-sm bg-white space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Insights</h2>
          <ul className="space-y-2 text-slate-700 text-sm">
            <li><strong>Conversation Summary:</strong> {insights.gong}</li>
            <li><strong>LinkedIn:</strong> {insights.linkedin}</li>
            <li><strong>ZoomInfo:</strong> {insights.zoominfo}</li>
          </ul>
        </div>

        {/* Suggested Emails */}
        {emailSuggestions.length > 0 && (
          <div className="rounded-xl border p-6 shadow-sm bg-white space-y-4">
            <h2 className="text-xl font-semibold text-slate-800">Suggested Emails</h2>
            {emailSuggestions.map((email, idx) => (
              <div key={idx} className="border p-4 rounded bg-slate-50 text-sm whitespace-pre-wrap">
                {email}
                <button
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full"
                  onClick={() => sendEmail(email)}
                >
                  Send Email
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Activity Section */}
        <div className="rounded-xl border p-6 shadow-sm bg-white space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Activity</h2>
          {lead.activity && lead.activity.length > 0 ? (
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
              {lead.activity.map((act: string, idx: number) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 text-sm">No recent activity available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
