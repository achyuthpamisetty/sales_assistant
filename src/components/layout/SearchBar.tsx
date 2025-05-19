import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Navigate to search results page with query parameter
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
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
                <Sparkles className="h-5 w-5" />
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-600">
            <span>Try:</span>
            <button 
              onClick={() => setSearchTerm("Sarah Thompson at TechCorp")}
              className="hover:text-primary-600 hover:underline"
            >
              "Sarah Thompson at TechCorp"
            </button>
            <span>•</span>
            <button 
              onClick={() => setSearchTerm("VP of Sales in San Francisco")}
              className="hover:text-primary-600 hover:underline"
            >
              "VP of Sales in San Francisco"
            </button>
            <span>•</span>
            <button 
              onClick={() => setSearchTerm("Companies using AI")}
              className="hover:text-primary-600 hover:underline"
            >
              "Companies using AI"
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;