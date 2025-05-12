import React, { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

// --- Replace with your real Slack Bot/User OAuth token ---
const SLACK_TOKEN = "xoxb-your-token"; // Store securely, never commit to repo!

const fetchSlackMessages = async (channelId) => {
  // For demo, return dummy data. For real, use the fetch below.
  // See: https://api.slack.com/messaging/retrieving
  /*
  const res = await fetch(`https://slack.com/api/conversations.history?channel=${channelId}&limit=10`, {
    headers: { Authorization: `Bearer ${SLACK_TOKEN}` }
  });
  const data = await res.json();
  return data.messages || [];
  */
  return [
    { ts: "1715500001.000100", user: "U123", text: "Hello team! Let's sync at 3pm.", time: "Today, 10:15 AM" },
    { ts: "1715499001.000200", user: "U234", text: "Reminder: Submit your reports.", time: "Yesterday, 4:22 PM" },
    { ts: "1715498001.000300", user: "U345", text: "Welcome @Priya to the channel!", time: "Yesterday, 11:30 AM" },
  ];
};

const SlackPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your Slack channel ID
  const channelId = "C0123456789";

  useEffect(() => {
    setLoading(true);
    fetchSlackMessages(channelId).then((msgs) => {
      setMessages(msgs);
      setLoading(false);
    });
  }, [channelId]);

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <MessageSquare size={24} /> Recent Slack Messages
      </h1>
      {loading ? (
        <div className="text-slate-500">Loading...</div>
      ) : (
        <ul className="divide-y">
          {messages.map((msg) => (
            <li key={msg.ts} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">User {msg.user}</span>
                  <span className="ml-2 text-xs text-slate-500">{msg.time}</span>
                  <div className="text-slate-700">{msg.text}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 text-right">
        <a href="https://slack.com/app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          View in Slack
        </a>
      </div>
    </div>
  );
};

export default SlackPage;
