import React, { useEffect, useState } from "react";
import { Users, Trophy, FileText, MessageSquare } from "lucide-react";

const dummyLeaderboard = [
  { name: "Alice Johnson", deals: 15, revenue: 120000 },
  { name: "Bob Smith", deals: 12, revenue: 95000 },
  { name: "Priya Patel", deals: 10, revenue: 87000 },
];

const dummyWins = [
  { id: 1, text: "Closed $50k deal with Acme Corp", by: "Alice", when: "Today" },
  { id: 2, text: "Demo with HealthFirst was a success", by: "Priya", when: "Yesterday" },
];

const dummyDocs = [
  { id: 1, name: "Q2 Sales Playbook.pdf", url: "#" },
  { id: 2, name: "Pricing Sheet.xlsx", url: "#" },
];

const dummySlack = [
  { id: 1, user: "Alice", text: "Great job team on the Acme deal! 🎉", time: "10:15 AM" },
  { id: 2, user: "Bob", text: "@Priya Can you share the demo slides?", time: "09:47 AM" },
];

const TeamCollaboration = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [wins, setWins] = useState([]);
  const [docs, setDocs] = useState([]);
  const [slack, setSlack] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLeaderboard(dummyLeaderboard);
      setWins(dummyWins);
      setDocs(dummyDocs);
      setSlack(dummySlack);
      setLoading(false);
    }, 900);
  }, []);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm space-y-5">
      <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
        <Users size={18} /> Team Collaboration Highlights
      </h2>
      {loading ? <div className="text-slate-500">Loading team data...</div> : (
        <>
          <div>
            <h3 className="font-semibold mb-1 flex items-center gap-1"><Trophy size={16}/> Leaderboard</h3>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-600">
                  <th className="text-left py-1">Rep</th>
                  <th className="text-left py-1">Deals</th>
                  <th className="text-left py-1">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map(rep => (
                  <tr key={rep.name} className="border-t">
                    <td className="py-1">{rep.name}</td>
                    <td className="py-1">{rep.deals}</td>
                    <td className="py-1">${rep.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="font-semibold mb-1 flex items-center gap-1"><Trophy size={16}/> Recent Wins</h3>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
              {wins.map(win => (
                <li key={win.id}>{win.text} <span className="text-xs text-slate-500">({win.by}, {win.when})</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-1 flex items-center gap-1"><FileText size={16}/> Shared Documents</h3>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
              {docs.map(doc => (
                <li key={doc.id}>
                  <a href={doc.url} className="text-blue-600 hover:underline">{doc.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-1 flex items-center gap-1"><MessageSquare size={16}/> Recent Slack Messages</h3>
            <ul className="space-y-2">
              {slack.map(msg => (
                <li key={msg.id} className="border rounded p-2 bg-slate-50">
                  <div className="font-medium">{msg.user}</div>
                  <div className="text-xs text-slate-600">{msg.text}</div>
                  <div className="text-xs text-slate-400">{msg.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamCollaboration;
