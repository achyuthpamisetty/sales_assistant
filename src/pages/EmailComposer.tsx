import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

/* ---- Salesforce Context ---- */
const SalesforceContext = createContext(null);

const dummyProspects = [
  { id: 1, name: "Alice", email: "alice@example.com", status: "Open" },
  { id: 2, name: "Bob", email: "bob@example.com", status: "Closed" },
  { id: 3, name: "Charlie", email: "charlie@example.com", status: "Open" }
];

export const SalesforceProvider = ({ children }) => {
  const [prospects] = useState(dummyProspects);
  return (
    <SalesforceContext.Provider value={{ prospects }}>
      {children}
    </SalesforceContext.Provider>
  );
};

export const useSalesforce = () => useContext(SalesforceContext);

/* ---- Email Composer Component ---- */
const defaultTemplates = [
  `Hi [Name],\n\nI wanted to introduce you to [Product Name], a solution designed to [solve problem]. Let me know if you'd be open to a quick call!\n\nBest,\n[Your Name]`,
  `Hi [Name],\n\nJust checking in to see if you had a chance to review the previous email. I’d be happy to answer any questions.\n\nThanks,\n[Your Name]`,
  `Hi [Name],\n\nI understand things get busy-this will be my last follow-up. If you're interested in exploring [Product], feel free to reach out anytime.\n\nAll the best,\n[Your Name]`
];

const EmailComposerComponent = () => {
  const salesforce = useSalesforce();
  const prospects = salesforce?.prospects ?? [];

  const [sequenceCount, setSequenceCount] = useState(1);
  const [templates, setTemplates] = useState([...defaultTemplates]);
  const [delayDays, setDelayDays] = useState(3);
  const [scheduling, setScheduling] = useState(false);
  const [error, setError] = useState(null);

  // Keep templates array in sync with sequenceCount
  useEffect(() => {
    setTemplates((prev) => {
      const newTemplates = [...prev];
      while (newTemplates.length < sequenceCount) {
        newTemplates.push(defaultTemplates[newTemplates.length] || "");
      }
      return newTemplates.slice(0, sequenceCount);
    });
  }, [sequenceCount]);

  const updateTemplate = (index, content) => {
    setTemplates((prev) => {
      const newTemplates = [...prev];
      newTemplates[index] = content;
      return newTemplates;
    });
  };

  const handleScheduleEmails = async () => {
    setScheduling(true);
    setError(null);

    try {
      if (!Array.isArray(prospects)) throw new Error("Prospect data is not available.");

      const openProspects = prospects.filter(p => p.status === 'Open' && p.email);

      if (openProspects.length === 0) {
        setError("No open prospects with valid emails found.");
        return;
      }

      const payload = openProspects.map(prospect => ({
        prospectId: prospect.id,
        prospectEmail: prospect.email,
        sequence: templates.slice(0, sequenceCount),
        delayDays,
      }));

      // Simulate API call
      console.log("Scheduling emails for open prospects:", payload);

      alert(`Emails scheduled for ${openProspects.length} prospect(s).`);
    } catch (err) {
      console.error("Email scheduling failed:", err);
      setError(err.message || "Unknown error occurred");
    } finally {
      setScheduling(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Email Composer</h1>
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
          Error: {error}
        </div>
      )}

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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        {scheduling ? 'Scheduling...' : 'Schedule Emails for Open Prospects'}
      </button>
    </div>
  );
};

/* ---- App Component with Routing ---- */
function App() {
  return (
    <SalesforceProvider>
      <BrowserRouter>
        <nav style={{ margin: 16 }}>
          <Link to="/emails" style={{ marginRight: 8 }}>Email Composer</Link>
        </nav>
        <Routes>
          <Route path="/emails" element={<EmailComposerComponent />} />
          <Route path="*" element={<div style={{ padding: 16 }}>Welcome! Go to <Link to="/emails">Email Composer</Link></div>} />
        </Routes>
      </BrowserRouter>
    </SalesforceProvider>
  );
}

export default App;
