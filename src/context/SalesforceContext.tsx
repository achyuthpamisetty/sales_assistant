import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockSalesforceData } from '../services/mockData';

interface SalesforceContextType {
  leads: any[];
  accounts: any[];
  contacts: any[];
  opportunities: any[];
  products: any[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  getObjectById: (objectType: string, id: string) => any;
}

const SalesforceContext = createContext<SalesforceContextType | undefined>(undefined);

export const useSalesforce = () => {
  const context = useContext(SalesforceContext);
  if (!context) {
    throw new Error('useSalesforce must be used within a SalesforceProvider');
  }
  return context;
};

interface SalesforceProviderProps {
  children: ReactNode;
}

export const SalesforceProvider: React.FC<SalesforceProviderProps> = ({ children }) => {
  const [data, setData] = useState({
    leads: [],
    accounts: [],
    contacts: [],
    opportunities: [],
    products: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSalesforceData = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an actual API call to Salesforce
      // For demo purposes, we'll use mock data with a delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(mockSalesforceData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch Salesforce data. Please try again later.');
      console.error('Salesforce data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getObjectById = (objectType: string, id: string) => {
    const objects = data[objectType as keyof typeof data] || [];
    return objects.find((obj: any) => obj.id === id) || null;
  };

  useEffect(() => {
    fetchSalesforceData();
  }, []);

  const value = {
    ...data,
    loading,
    error,
    refreshData: fetchSalesforceData,
    getObjectById,
  };

  return <SalesforceContext.Provider value={value}>{children}</SalesforceContext.Provider>;
};