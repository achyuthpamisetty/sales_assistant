import React, { createContext, useContext, useState, useEffect } from 'react';

interface SalesDataContextType {
  leads: any[];
  opportunities: any[];
  contacts: any[];
  accounts: any[];
  insights: any[];
  transcripts: any[];
}

const SalesDataContext = createContext<SalesDataContextType | undefined>(undefined);

export const useSalesData = () => {
  const context = useContext(SalesDataContext);
  if (!context) {
    throw new Error('useSalesData must be used within a SalesDataProvider');
  }
  return context;
};

export const SalesDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState({
    leads: [],
    opportunities: [],
    contacts: [],
    accounts: [],
    insights: [],
    transcripts: []
  });

  useEffect(() => {
    // Mock data for demonstration
    setData({
      leads: [
        {
          id: '1',
          name: 'Sarah Thompson',
          company: 'TechCorp Inc',
          email: 'sarah@techcorp.com',
          phone: '(415) 555-0123',
          status: 'Qualified',
          leadScore: 85,
          website: 'techcorp.com',
          industry: 'Technology',
          createdDate: '2024-01-15'
        }
      ],
      opportunities: [
        {
          id: '1',
          name: 'TechCorp Enterprise Deal',
          account: 'TechCorp Inc',
          stage: 'Negotiation',
          amount: '$250,000',
          probability: 75,
          closeDate: '2024-03-31'
        }
      ],
      contacts: [
        {
          id: '1',
          name: 'Sarah Thompson',
          title: 'CTO',
          company: 'TechCorp Inc',
          email: 'sarah@techcorp.com',
          phone: '(415) 555-0123'
        }
      ],
      accounts: [
        {
          id: '1',
          name: 'TechCorp Inc',
          industry: 'Technology',
          website: 'techcorp.com',
          phone: '(415) 555-0100',
          type: 'Customer',
          activeContacts: 3,
          openOpportunities: 2,
          numberOfEmployees: '1000-5000'
        }
      ],
      insights: [
        {
          id: '1',
          type: 'opportunity',
          title: 'Deal Momentum',
          description: 'TechCorp showing strong buying signals based on recent interactions'
        }
      ],
      transcripts: [
        {
          id: '1',
          date: '2024-01-20',
          type: 'Sales Call',
          summary: 'Initial discovery call with TechCorp team',
          participants: ['Sarah Thompson', 'Sales Rep']
        }
      ]
    });
  }, []);

  return (
    <SalesDataContext.Provider value={data}>
      {children}
    </SalesDataContext.Provider>
  );
};