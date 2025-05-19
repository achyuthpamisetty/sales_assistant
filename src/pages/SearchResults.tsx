import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-600">
          Showing results for your search...
        </p>
      </div>
    </div>
  );
};

export default SearchResults;