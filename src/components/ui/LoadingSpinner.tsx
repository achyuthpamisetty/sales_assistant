import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-primary-600"></div>
        <p className="mt-4 text-slate-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;