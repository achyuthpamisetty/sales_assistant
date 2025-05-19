import React from 'react';
import { Sparkles } from 'lucide-react';

interface Insight {
  id: string;
  type: string;
  title: string;
  description: string;
}

interface InsightPanelProps {
  insights: Insight[];
  title: string;
}

const InsightPanel: React.FC<InsightPanelProps> = ({ insights, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center mb-4">
        <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      </div>
      
      <div className="space-y-4">
        {insights.map(insight => (
          <div 
            key={insight.id}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4"
          >
            <h3 className="font-medium text-gray-900 mb-1">{insight.title}</h3>
            <p className="text-sm text-gray-600">{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightPanel;