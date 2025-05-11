import React from 'react';
import { 
  Headphones, 
  Linkedin, 
  Search, 
  ArrowRight, 
  Calendar, 
  User, 
  Building, 
  Phone,
  Briefcase,
  TrendingUp,
  Users,
  Mail,
  MapPin,
  Star,
  ChevronRight,
  Bell,
  MessageSquare,
  FileText,
  Target
} from 'lucide-react';

interface InsightProps {
  insights: {
    gongCalls?: Array<{ date: string; summary: string }>;
    linkedInNews?: Array<{ date: string; headline: string }>;
    zoomInfo?: {
      companySize?: string;
      industry?: string;
      revenue?: string;
      techStack?: string[];
      education?: string;
      previousCompanies?: string[];
      interests?: string[];
      competitorActivity?: string;
      budgetCycle?: string;
      decisionMakers?: string[];
    };
  };
  type: 'lead' | 'account' | 'contact' | 'opportunity';
  data: any;
}

const InsightPanel: React.FC<InsightProps> = ({ insights, type, data }) => {
  const renderAIInsights = () => {
    let insights = [];
    
    switch (type) {
      case 'lead':
        insights = [
          {
            title: 'Engagement Analysis',
            content: 'High engagement on LinkedIn posts about AI and machine learning. Shows strong interest in technology innovation.',
            icon: Target
          },
          {
            title: 'Communication Style',
            content: 'Prefers detailed technical discussions. Responds well to data-driven presentations.',
            icon: MessageSquare
          },
          {
            title: 'Decision Factors',
            content: 'Key focus on ROI and scalability. Budget approval process typically takes 2-3 weeks.',
            icon: FileText
          }
        ];
        break;
      case 'account':
        insights = [
          {
            title: 'Company Analysis',
            content: 'Growing technology adoption with recent investments in cloud infrastructure.',
            icon: Building
          },
          {
            title: 'Market Position',
            content: 'Leading player in their segment with 25% YoY growth. Expanding into new markets.',
            icon: TrendingUp
          },
          {
            title: 'Buying Patterns',
            content: 'Previous purchases focused on scalability and integration capabilities.',
            icon: Target
          }
        ];
        break;
      case 'contact':
        insights = [
          {
            title: 'Professional Background',
            content: '8+ years in technology leadership. Strong influence in purchase decisions.',
            icon: User
          },
          {
            title: 'Communication Preferences',
            content: 'Prefers email for initial contact. Available for calls Tuesday afternoons.',
            icon: MessageSquare
          },
          {
            title: 'Interest Areas',
            content: 'Actively engaged in digital transformation and cloud migration projects.',
            icon: Target
          }
        ];
        break;
      case 'opportunity':
        insights = [
          {
            title: 'Deal Analysis',
            content: 'Similar deals closed in 45 days on average. Key success factor: early technical validation.',
            icon: TrendingUp
          },
          {
            title: 'Stakeholder Map',
            content: 'Three key decision makers identified. CTO has final sign-off authority.',
            icon: Users
          },
          {
            title: 'Competitive Position',
            content: 'Our solution ranks higher in security and scalability - key requirements.',
            icon: Target
          }
        ];
        break;
    }

    return (
      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="mb-4 font-medium text-slate-900">AI Insights</h3>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="rounded-lg border border-slate-200 p-3 hover:bg-slate-50">
              <div className="flex items-center">
                <insight.icon className="h-5 w-5 text-primary-600" />
                <h4 className="ml-2 font-medium text-slate-800">{insight.title}</h4>
              </div>
              <p className="mt-2 text-sm text-slate-600">{insight.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEmailSuggestions = () => {
    const suggestions = [];
    
    switch (type) {
      case 'lead':
        suggestions.push({
          subject: 'Customized Solution for Your AI Implementation',
          body: 'Based on your interest in AI and machine learning, I wanted to share how our platform can accelerate your innovation initiatives...',
          context: 'Triggered by recent LinkedIn activity about AI projects'
        });
        break;
      case 'account':
        suggestions.push({
          subject: 'Scaling Your Cloud Infrastructure',
          body: 'Following your recent cloud investments, I thought you'd be interested in how we've helped similar companies optimize their infrastructure...',
          context: 'Based on recent technology investments'
        });
        break;
      case 'contact':
        suggestions.push({
          subject: 'Digital Transformation Partnership',
          body: 'Given your leadership in technology transformation, I wanted to share some insights from similar projects we've supported...',
          context: 'Aligned with current digital transformation focus'
        });
        break;
      case 'opportunity':
        suggestions.push({
          subject: 'Technical Validation Next Steps',
          body: 'To help move forward with the security and scalability evaluation, I've prepared a detailed comparison of our solution...',
          context: 'Based on current deal stage and requirements'
        });
        break;
    }

    return (
      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium text-slate-900">AI Email Suggestions</h3>
          <span className="text-xs text-slate-500">Updated 5 mins ago</span>
        </div>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary-600" />
                  <h4 className="ml-2 font-medium text-slate-800">{suggestion.subject}</h4>
                </div>
                <button className="rounded-md bg-primary-600 px-3 py-1 text-xs font-medium text-white hover:bg-primary-700">
                  Use Template
                </button>
              </div>
              <p className="mt-2 text-sm text-slate-600">{suggestion.body}</p>
              <p className="mt-2 text-xs text-slate-500">Context: {suggestion.context}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Keep existing render functions (renderLinkedInSection, renderPersonLinkedIn, etc.)
  // ... [Previous code remains unchanged]

  if (!data) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 text-center text-slate-600">
        No data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold text-slate-900">Insights</h2>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 gap-6">
            {renderAIInsights()}
            {renderEmailSuggestions()}
            {type === 'lead' && renderLeadScore()}
            {renderLinkedInSection()}
            
            {/* Existing sections remain unchanged */}
            {/* ... [Rest of the component remains the same] */}
          </div>
        </div>
      </div>
      
      {/* Next Steps Section remains unchanged */}
      {/* ... [Rest of the component remains the same] */}
    </div>
  );
};

export default InsightPanel;