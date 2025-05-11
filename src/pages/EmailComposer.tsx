import React, { useState } from 'react';
import { useSalesforce } from '../../context/SalesforceContext';

const defaultTemplates = [
  `Hi [Name],\n\nI wanted to introduce you to [Product Name], a solution designed to [solve problem]. Let me know if you'd be open to a quick call!\n\nBest,\n[Your Name]`,
  `Hi [Name],\n\nJust checking in to see if you had a chance to review the previous email. I’d be happy to answer any questions.\n\nThanks,\n[Your Name]`,
  `Hi [Name],\n\nI understand things get busy—this will be my last follow-up. If you're interested in exploring [Product], feel free to reach out anytime.\n\nAll the best,\n[Your Name]`
];

const EmailComposerComponent = () => {
  const { prospects } = useSalesforce(); // Assumes you have open prospects in your context
  const [sequenceCount, setSequenceCount] = useState(1);
  const [templates, setTemplates] = useState(defaultTemplates);
  const [delayDays, setDelayDays] = useState(3);
  const [scheduling, setScheduling] = useState(false);

  const updateTemplate = (index: number, content: string) => {
    const newTemplates = [...templates];
    newTemplates[index] = content;
    setTemplates(newTemplates);
  };

  const handleScheduleEmails = async () => {
    setScheduling(true);
    try {
      const openProspects = prospects?.filter(p => p.status === 'Open') || [];

      if (openProspects.length === 0) {
        alert("No open prospects found.");
        setScheduling(false);
        return;
      }

      const payload = openProspects.map(prospect => ({
        prospectId: prospect.id,
        prospectEmail: prospect.email,
        sequence: templates.slice(0, sequenceCount),
        delayDays,
      }));

      // Replace this with an actual API call to schedule emails
      console.log("Scheduling emails:", payload);

      alert(`Emails scheduled for ${openProspects.length} prospect(s).`);
    } catch (err) {
      console.error(err);
      alert("Error scheduling emails.");
    } finally {
      setScheduling(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-slate-700">Email Sequence Count</label>
        <select 
          value={sequenceCount} 
          onChange={(e) => setSequenceCount(Number(e.target.value))}
          className="rounded border border-slate-300 p-2 w-40"
        >
          <option value={1}>1 Email</option>
          <option value={2}>2 Emails</option>
          <option value={3}>3 Emails</option>
        </select>
      </div>

      {Array.from({ length: sequenceCount }).map((_, i) => (
        <div key={i} className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">Email {i + 1} Content</label>
          <textarea
            rows={6}
            value={templates[i]}
            onChange={(e) => updateTemplate(i, e.target.value)}
            className="w-full border rounded p-2 text-sm"
            placeholder={`Email ${i + 1} content...`}
          />
        </div>
      ))}

      {sequenceCount > 1 && (
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-slate-700">Delay between emails (in days)</label>
          <input
            type="number"
            min={1}
            value={delayDays}
            onChange={(e) => setDelayDays(Number(e.target.value))}
            className="w-40 border border-slate-300 rounded p-2"
          />
        </div>
      )}

      <button
        onClick={handleScheduleEmails}
        disabled={scheduling}
        className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors"
      >
        {scheduling ? 'Scheduling...' : 'Schedule Emails for Open Prospects'}
      </button>
    </div>
  );
};

export default EmailComposerComponent;
