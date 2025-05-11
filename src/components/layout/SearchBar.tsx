import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAISearching, setIsAISearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  const handleAISearch = () => {
    setIsAISearching(true);
    console.log('AI Searching for:', searchTerm);
    setTimeout(() => {
      setIsAISearching(false);
    }, 2000);
  };

  return (
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
              placeholder="Search anything..."
              className="w-full py-3 pr-12 text-lg text-slate-800 focus:outline-none rounded-r-full"
            />
            <button
              type="button"
              onClick={handleAISearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-primary-600"
              title="AI Search"
            >
              {isAISearching ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-600 border-t-transparent"></div>
              ) : (
                <Sparkles className="h-5 w-5" />
              )}
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-600">
          <span>Try:</span>
          <button className="hover:text-primary-600 hover:underline">"High-value opportunities"</button>
          <span>•</span>
          <button className="hover:text-primary-600 hover:underline">"Recent leads in tech"</button>
          <span>•</span>
          <button className="hover:text-primary-600 hover:underline">"Active accounts in California"</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
