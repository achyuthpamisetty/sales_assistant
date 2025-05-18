import React, { useState, useEffect } from 'react';
import { Search, Sparkles, UserPlus, ExternalLink, Building, Mail, Phone, MapPin } from 'lucide-react';
import { useSalesforce } from '../../context/SalesforceContext';

interface SearchResult {
  id?: string;
  type: 'salesforce' | 'linkedin' | 'zoominfo';
  name: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
  location?: string;
  insights?: string[];
  source: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const { leads, contacts, accounts } = useSalesforce();

  const searchSalesforce = (term: string) => {
    const searchRegex = new RegExp(term, 'i');
    const sfResults: SearchResult[] = [];

    // Search leads
    leads.forEach(lead => {
      if (
        searchRegex.test(lead.name) ||
        searchRegex.test(lead.company) ||
        searchRegex.test(lead.email)
      ) {
        sfResults.push({
          id: lead.id,
          type: 'salesforce',
          name: lead.name,
          title: lead.title,
          company: lead.company,
          email: lead.email,
          phone: lead.phone,
          insights: [
            'Recently viewed pricing page',
            'Engaged with email campaign',
            'Connected on LinkedIn'
          ],
          source: 'Salesforce'
        });
      }
    });

    return sfResults;
  };

  const searchExternalSources = async (term: string): Promise<SearchResult[]> => {
    // Simulated external API calls
    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
      {
        type: 'linkedin',
        name: 'Sarah Thompson',
        title: 'VP of Sales',
        company: 'TechCorp Inc',
        location: 'San Francisco, CA',
        insights: [
          'Recently changed roles',
          'Company growing rapidly',
          'Active in tech community'
        ],
        source: 'LinkedIn Sales Navigator'
      },
      {
        type: 'zoominfo',
        name: 'Michael Chen',
        title: 'CTO',
        company: 'Innovation Labs',
        email: 'michael.chen@innovationlabs.com',
        phone: '(415) 555-0123',
        location: 'Boston, MA',
        insights: [
          'Company raised Series B',
          'Expanding tech team',
          'Looking for new solutions'
        ],
        source: 'ZoomInfo'
      }
    ].filter(result => 
      result.name.toLowerCase().includes(term.toLowerCase()) ||
      result.company?.toLowerCase().includes(term.toLowerCase())
    );
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setShowResults(true);

    // Search Salesforce first
    const sfResults = searchSalesforce(searchTerm);
    
    // If no Salesforce results, search external sources
    let allResults = sfResults;
    if (sfResults.length === 0) {
      const externalResults = await searchExternalSources(searchTerm);
      allResults = [...sfResults, ...externalResults];
    }

    setResults(allResults);
    setIsSearching(false);
  };

  const handleAddLead = (result: SearchResult) => {
    // Here you would implement the logic to add the lead to Salesforce
    alert(`Adding ${result.name} as a new lead`);
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="w-full max-w-2xl space-y-6">
          <h1 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Search across your sales data
          </h1>
          <p className="text-center text-slate-600">
            Find leads, contacts, accounts, and opportunities in one place
          </p>

          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center rounded-full border border-slate-300 bg-white shadow-sm">
              <div className="flex items-center px-4 text-slate-500">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, company, or email..."
                className="w-full py-3 pr-12 text-lg text-slate-800 focus:outline-none rounded-r-full"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-primary-600"
                title="Search"
              >
                {isSearching ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-600 border-t-transparent"></div>
                ) : (
                  <Sparkles className="h-5 w-5" />
                )}
              </button>
            </div>
          </form>

          {showResults && (
            <div className="mt-8 space-y-4">
              {results.length === 0 ? (
                <div className="text-center text-slate-600">
                  {isSearching ? 'Searching...' : 'No results found'}
                </div>
              ) : (
                results.map((result, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-slate-900">{result.name}</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                            {result.source}
                          </span>
                        </div>
                        {result.title && (
                          <p className="text-sm text-slate-600 flex items-center gap-1">
                            <Building className="h-4 w-4" /> {result.title} at {result.company}
                          </p>
                        )}
                        {result.email && (
                          <p className="text-sm text-slate-600 flex items-center gap-1">
                            <Mail className="h-4 w-4" /> {result.email}
                          </p>
                        )}
                        {result.phone && (
                          <p className="text-sm text-slate-600 flex items-center gap-1">
                            <Phone className="h-4 w-4" /> {result.phone}
                          </p>
                        )}
                        {result.location && (
                          <p className="text-sm text-slate-600 flex items-center gap-1">
                            <MapPin className="h-4 w-4" /> {result.location}
                          </p>
                        )}
                      </div>
                      {result.type !== 'salesforce' && (
                        <button
                          onClick={() => handleAddLead(result)}
                          className="flex items-center gap-1 rounded-md bg-primary-600 px-3 py-1.5 text-sm text-white hover:bg-primary-700 transition-colors"
                        >
                          <UserPlus className="h-4 w-4" />
                          Add as Lead
                        </button>
                      )}
                    </div>

                    {result.insights && result.insights.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">AI Insights</h4>
                        <ul className="space-y-1">
                          {result.insights.map((insight, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-slate-600 flex items-center gap-1"
                            >
                              <Sparkles className="h-3 w-3 text-primary-600" />
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-600">
            <span>Try:</span>
            <button className="hover:text-primary-600 hover:underline">"Sarah Thompson at TechCorp"</button>
            <span>•</span>
            <button className="hover:text-primary-600 hover:underline">"VP of Sales in San Francisco"</button>
            <span>•</span>
            <button className="hover:text-primary-600 hover:underline">"Companies using AI"</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;