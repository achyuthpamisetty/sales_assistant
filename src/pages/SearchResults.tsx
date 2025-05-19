import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import { 
  Search, Globe, Mail, Phone, MapPin, Building, 
  UserPlus, Loader2, Users, Calendar, ChevronRight,
  Briefcase, MessageSquare
} from 'lucide-react';

interface ExternalResult {
  source: 'LinkedIn' | 'ZoomInfo';
  name: string;
  title: string;
  company: string;
  location?: string;
  email?: string;
  phone?: string;
  connections?: string;
  lastActive?: string;
  skills?: string[];
  insights?: string[];
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const { leads, accounts, contacts, opportunities } = useSalesforce();
  const [isSearching, setIsSearching] = useState(false);
  const [externalResults, setExternalResults] = useState<ExternalResult[]>([]);

  // Filter Salesforce data
  const filteredLeads = leads.filter(lead => 
    lead.name?.toLowerCase().includes(query.toLowerCase()) ||
    lead.company?.toLowerCase().includes(query.toLowerCase()) ||
    lead.email?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAccounts = accounts.filter(account =>
    account.name?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredOpportunities = opportunities.filter(opp =>
    opp.name?.toLowerCase().includes(query.toLowerCase())
  );

  const hasSalesforceResults = 
    filteredLeads.length > 0 || 
    filteredAccounts.length > 0 || 
    filteredContacts.length > 0 || 
    filteredOpportunities.length > 0;

  // Search external sources if no Salesforce results
  useEffect(() => {
    const searchExternalSources = async () => {
      if (!hasSalesforceResults && query) {
        setIsSearching(true);
        try {
          // Simulated API call delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Mock external results
          const results: ExternalResult[] = [
            {
              source: 'LinkedIn',
              name: query,
              title: 'Senior Software Engineer',
              company: 'Tech Innovations Inc',
              location: 'San Francisco Bay Area',
              connections: '500+',
              lastActive: '2 days ago',
              skills: ['JavaScript', 'React', 'Node.js', 'Cloud Architecture'],
              insights: [
                'Recently viewed job postings in AI/ML',
                'Engaged with cloud computing content',
                'Connected with 3 people from your network'
              ]
            },
            {
              source: 'ZoomInfo',
              name: query,
              title: 'Engineering Team Lead',
              company: 'Innovation Labs',
              email: 'user@example.com',
              phone: '(415) 555-0123',
              location: 'Greater San Francisco Area',
              insights: [
                'Company raised Series B funding',
                'Team growing by 25% this quarter',
                'Evaluating new tech stack'
              ]
            }
          ];
          
          setExternalResults(results);
        } catch (error) {
          console.error('Error searching external sources:', error);
        } finally {
          setIsSearching(false);
        }
      }
    };

    searchExternalSources();
  }, [query, hasSalesforceResults]);

  const handleAddLead = (result: ExternalResult) => {
    navigate('/leads/new', { 
      state: { 
        leadData: {
          name: result.name,
          title: result.title,
          company: result.company,
          email: result.email,
          phone: result.phone,
          source: result.source
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Search Results for "{query}"
          </h1>
          <p className="text-slate-500">
            Found matches across leads, accounts, opportunities, and contacts
          </p>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          <h2 className="font-semibold text-slate-900">AI Summary</h2>
        </div>
        <p className="text-slate-700">
          Based on the search for "{query}", we found {filteredLeads.length} leads, 
          {filteredAccounts.length} accounts, and {filteredOpportunities.length} opportunities. 
          {!hasSalesforceResults && externalResults.length > 0 && 
            " Found potential matches from external sources that could be valuable leads."}
        </p>
      </div>

      {/* External Results */}
      {isSearching ? (
        <div className="flex items-center justify-center py-12 bg-white rounded-lg shadow">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <span className="ml-3 text-slate-600">Searching external sources...</span>
        </div>
      ) : externalResults.length > 0 && !hasSalesforceResults && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-900">External Source Results</h2>
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {externalResults.map((result, index) => (
              <div key={index} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-slate-900">{result.name}</h3>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {result.source}
                      </span>
                    </div>
                    <p className="text-slate-600">
                      {result.title} at {result.company}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddLead(result)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                  >
                    <UserPlus className="h-4 w-4" />
                    Add as Lead
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    {result.email && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="h-4 w-4" />
                        {result.email}
                      </div>
                    )}
                    {result.phone && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="h-4 w-4" />
                        {result.phone}
                      </div>
                    )}
                    {result.location && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="h-4 w-4" />
                        {result.location}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {result.connections && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users className="h-4 w-4" />
                        {result.connections} connections
                      </div>
                    )}
                    {result.lastActive && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="h-4 w-4" />
                        Last active: {result.lastActive}
                      </div>
                    )}
                  </div>
                </div>

                {result.skills && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-slate-900 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.insights && (
                  <div className="mt-4 bg-blue-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-slate-900 mb-2">AI Insights</h4>
                    <ul className="space-y-1">
                      {result.insights.map((insight, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Salesforce Results */}
      {hasSalesforceResults && (
        <div className="space-y-6">
          {filteredLeads.length > 0 && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-slate-900">Matching Leads</h2>
                  </div>
                  <span className="text-sm text-slate-500">{filteredLeads.length} found</span>
                </div>
              </div>
              <div className="divide-y divide-slate-200">
                {filteredLeads.map(lead => (
                  <div key={lead.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-slate-900">{lead.name}</h3>
                        <p className="text-slate-600">{lead.company}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {lead.status}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="h-4 w-4" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="h-4 w-4" />
                          {lead.phone}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Building className="h-4 w-4" />
                          {lead.industry || 'Unknown Industry'}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="h-4 w-4" />
                          Created: {new Date(lead.createdDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar sections for Accounts, Contacts, and Opportunities */}
        </div>
      )}
    </div>
  );
};

export default SearchResults;