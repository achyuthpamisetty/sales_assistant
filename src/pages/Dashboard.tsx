// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SalesforceProvider } from "./context/SalesforceContext";
import DashboardLayout from "./components/DashboardLayout";
import LeadsTab from "./components/LeadsTab";
import EmailComposerTab from "./components/EmailComposerTab";

export default function App() {
  return (
    <SalesforceProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="leads" replace />} />
            <Route path="leads" element={<LeadsTab />} />
            <Route path="email-composer" element={<EmailComposerTab />} />
          </Route>
        </Routes>
      </Router>
    </SalesforceProvider>
  );
}

// components/DashboardLayout.tsx
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const location = useLocation();
  const active = (path: string) => location.pathname.includes(path) ? "font-bold underline" : "";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-4">Salesforce Lead Dashboard</h1>
      <nav className="mb-6 space-x-4">
        <Link to="/leads" className={active("leads")}>Leads</Link>
        <Link to="/email-composer" className={active("email-composer")}>Email Composer</Link>
      </nav>
      <Outlet />
    </div>
  );
}

// components/LeadsTab.tsx
import React from "react";
import { useSalesforce } from "../context/SalesforceContext";
import { Card } from "@/components/ui/card";

export default function LeadsTab() {
  const { leads } = useSalesforce();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {leads.map((lead) => (
        <Card key={lead.id} className="p-4">
          <h3 className="font-semibold">{lead.name}</h3>
          <p>Email: {lead.email}</p>
          <p>Status: {lead.status}</p>
        </Card>
      ))}
    </div>
  );
}

// components/EmailComposerTab.tsx
import React, { useState } from "react";
import { useSalesforce } from "../context/SalesforceContext";
import EmailScheduler from "./EmailScheduler";
import { Card } from "@/components/ui/card";

export default function EmailComposerTab() {
  const { leads } = useSalesforce();
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const selectedLead = leads.find((lead) => lead.id === selectedLeadId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Select a Lead</h2>
        <ul className="space-y-1">
          {leads.map((lead) => (
            <li
              key={lead.id}
              className={`cursor-pointer p-2 rounded ${lead.id === selectedLeadId ? "bg-blue-100" : "hover:bg-gray-200"}`}
              onClick={() => setSelectedLeadId(lead.id)}
            >
              {lead.name}
            </li>
          ))}
        </ul>
      </Card>

      {selectedLead && (
        <Card className="p-4">
          <EmailScheduler lead={selectedLead} />
        </Card>
      )}
    </div>
  );
}

// components/EmailScheduler.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface EmailStep {
  delayDays: number;
  template: string;
}

export default function EmailScheduler({ lead }: { lead: { name: string; email: string } }) {
  const [steps, setSteps] = useState<EmailStep[]>([{ delayDays: 0, template: "" }]);

  const updateStep = (index: number, field: keyof EmailStep, value: string) => {
    const newSteps = [...steps];
    newSteps[index][field] = field === "delayDays" ? parseInt(value) : value;
    setSteps(newSteps);
  };

  const addStep = () => setSteps([...steps, { delayDays: 1, template: "" }]);
  const removeStep = (index: number) => setSteps(steps.filter((_, i) => i !== index));

  const handleSchedule = () => {
    console.log("Scheduling emails:", steps, "to", lead.email);
    alert(`Scheduled ${steps.length} emails for ${lead.name}`);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Schedule Emails for {lead.name}</h3>
      {steps.map((step, index) => (
        <div key={index} className="mb-4 space-y-2">
          <label className="block">
            Delay (days after previous): 
            <Input
              type="number"
              value={step.delayDays}
              onChange={(e) => updateStep(index, "delayDays", e.target.value)}
              min={0}
              className="mt-1"
            />
          </label>
          <label className="block">
            Email Template:
            <Textarea
              value={step.template}
              onChange={(e) => updateStep(index, "template", e.target.value)}
              rows={4}
              className="mt-1"
            />
          </label>
          {steps.length > 1 && (
            <Button variant="destructive" onClick={() => removeStep(index)}>Remove Step</Button>
          )}
        </div>
      ))}
      {steps.length < 3 && (
        <Button variant="outline" onClick={addStep}>Add Step</Button>
      )}
      <Button className="mt-4" onClick={handleSchedule}>Schedule Sequence</Button>
    </div>
  );
}

// context/SalesforceContext.tsx
import React, { createContext, useContext } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
}

const dummyLeads: Lead[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "New" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", status: "Contacted" },
  { id: "3", name: "Carol Lee", email: "carol@example.com", status: "Qualified" },
];

const SalesforceContext = createContext<{ leads: Lead[] }>({ leads: dummyLeads });

export const SalesforceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SalesforceContext.Provider value={{ leads: dummyLeads }}>
      {children}
    </SalesforceContext.Provider>
  );
};

export const useSalesforce = () => useContext(SalesforceContext);
