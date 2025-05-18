import React, { useState, useEffect } from 'react';
import { Search, Sparkles, UserPlus, ExternalLink, Building, Mail, Phone, MapPin, X } from 'lucide-react';
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

interface LeadForm {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
  industry?: string;
  numberOfEmployees?: string;
  annualRevenue?: string;
  leadSource: string;
  notes?: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [leadForm, setLeadForm] = useState<LeadForm>({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    numberOfEmployees: '',
    annualRevenue: '',
    leadSource: '',
    notes: ''
  });
  
  const { leads, contacts, accounts } = useSalesforce();

  const searchSalesforce = (term: string) => {
    const searchRegex = new RegExp(term, 'i');
    const sfResults: SearchResult[] = [];

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
    setSelectedResult(result);
    setLeadForm({
      name: result.name || '',
      title: result.title || '',
      company: result.company || '',
      email: result.email || '',
      phone: result.phone || '',
      website: '',
      industry: '',
      numberOfEmployees: '',
      annualRevenue: '',
      leadSource: result.source,
      notes: ''
    });
    setShowLeadForm(true);
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would implement the actual lead creation logic
      console.log('Creating lead:', leadForm);
      setShowLeadForm(false);
      setSelectedResult(null);
      // Show success message
      alert('Lead created successfully!');
    } catch (error) {
      console.error('Error creating lead:', error);
      alert('Error creating lead. Please try again.');
    }
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

          {showLeadForm && selectedResult && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Create New Lead</h2>
                    <button
                      onClick={() => setShowLeadForm(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateLead} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Name</label>
                        <input
                          type="text"
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Title</label>
                        <input
                          type="text"
                          value={leadForm.title}
                          onChange={(e) => setLeadForm({...leadForm, title: e.target.value})}
                          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Company</label>
                        <input
                          type="text"
                          value={leadForm.company}
                          onChange={(e) => setLeadForm({...leadForm, company: e.target.value})}
                          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Email</label>
                        <input
                          type="email"
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Phone</label>
                        <input
                          type="tel"
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Website</label>
                        <input
                          type="url"
                          value={leadForm.website}
                          onChange={(e) => setLeadForm({...leadForm, website: e.target.value})}
                          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Industry</label>
                        <select
                          value={leadForm.industry}
                          onChange={(e) => setLeadForm({...leadForm, industry: e.target.value})}
                          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                        >
                          <option value="">Select Industry</option>
                          <option value="Technology">Technology</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Finance">Finance</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Retail">Retail</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Number of Employees</label>
                        <input
                          type="text"
                          value={leadForm.numberOfEmployees}
                          onChange={(e) => setLeadForm({...leadForm, numberOfEmployees: e.target.value})}
                          placeholder="e.g., 100-500"
                          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Annual Revenue</label>
                        <input
                          type="text"
                          value={leadForm.annualRevenue}
                          onChange={(e) => setLeadForm({...leadForm, annualRevenue: e.target.value})}
                          placeholder="e.g., $1M - $5M"
                          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Lead Source</label>
                        <input
                          type="text"
                          value={leadForm.leadSource}
                          onChange={(e) => setLeadForm({...leadForm, leadSource: e.target.value})}
                          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Notes</label>
                      <textarea
                        value={leadForm.notes}
                        onChange={(e) => setLeadForm({...leadForm, notes: e.target.value})}
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                        placeholder="Add any additional notes or context about this lead..."
                      />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setShowLeadForm(false)}
                        className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
                      >
                        Create Lead
                      </button>
                    </div>
                  </form>
                </div>
              </div>
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