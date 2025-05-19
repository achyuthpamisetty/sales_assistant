import React from 'react';
import { MessageSquare } from 'lucide-react';

interface Transcript {
  id: string;
  date: string;
  type: string;
  summary: string;
  participants: string[];
}

interface TranscriptSummaryProps {
  transcript: Transcript;
}

const TranscriptSummary: React.FC<TranscriptSummaryProps> = ({ transcript }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <MessageSquare className="h-4 w-4 text-blue-600 mr-2" />
          <span className="font-medium text-gray-900">{transcript.type}</span>
        </div>
        <span className="text-sm text-gray-500">{transcript.date}</span>
      </div>
      
      <p className="text-sm text-gray-600 mb-2">{transcript.summary}</p>
      
      <div className="flex items-center space-x-2">
        {transcript.participants.map((participant, index) => (
          <span 
            key={index}
            className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
          >
            {participant}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TranscriptSummary;