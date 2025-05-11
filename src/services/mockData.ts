export const mockSalesforceData = {
  leads: [
    {
      id: 'lead1',
      name: 'Sarah Thompson',
      company: 'Innovatech Solutions',
      title: 'CTO',
      email: 'sarah.thompson@innovatech.com',
      phone: '(415) 555-1234',
      status: 'Qualified',
      createdDate: '2023-10-10',
      score: 85,
      lastActivity: '2023-11-05',
      insights: {
        gongCalls: [
          { date: '2023-10-28', summary: 'Discussed pain points around current CRM system' },
          { date: '2023-11-02', summary: 'Presented solution, showed interest in enterprise plan' }
        ],
        linkedInNews: [
          { date: '2023-10-15', headline: 'Innovatech Solutions secures $5M in funding' },
          { date: '2023-11-01', headline: 'Innovatech expanding technology department' }
        ],
        zoomInfo: {
          companySize: '50-200 employees',
          industry: 'Software Development',
          revenue: '$10M-$50M',
          techStack: ['Salesforce', 'AWS', 'React', 'Node.js']
        }
      }
    },
    {
      id: 'lead2',
      name: 'Michael Rodriguez',
      company: 'Global Retail Partners',
      title: 'VP of Operations',
      email: 'michael.r@grpartners.com',
      phone: '(312) 555-6789',
      status: 'New',
      createdDate: '2023-11-01',
      score: 65,
      lastActivity: '2023-11-03',
      insights: {
        gongCalls: [
          { date: '2023-11-03', summary: 'Initial call, expressed interest in supply chain optimization' }
        ],
        linkedInNews: [
          { date: '2023-10-20', headline: 'Global Retail Partners announces new storefront strategy' }
        ],
        zoomInfo: {
          companySize: '1000+ employees',
          industry: 'Retail',
          revenue: '$100M-$500M',
          techStack: ['Oracle', 'Microsoft Dynamics', 'Shopify']
        }
      }
    },
    {
      id: 'lead3',
      name: 'Emma Williams',
      company: 'HealthFirst Technologies',
      title: 'Director of IT',
      email: 'emma.w@healthfirst.org',
      phone: '(617) 555-3456',
      status: 'Working',
      createdDate: '2023-09-15',
      score: 75,
      lastActivity: '2023-11-01',
      insights: {
        gongCalls: [
          { date: '2023-09-20', summary: 'Discussed HIPAA compliance needs for data management' },
          { date: '2023-10-05', summary: 'Technical deep dive with IT team' },
          { date: '2023-10-25', summary: 'Presented proposal, pending budget approval' }
        ],
        linkedInNews: [
          { date: '2023-10-10', headline: 'HealthFirst Technologies featured in Healthcare Innovation magazine' }
        ],
        zoomInfo: {
          companySize: '500-1000 employees',
          industry: 'Healthcare Technology',
          revenue: '$50M-$100M',
          techStack: ['Epic', 'Microsoft Azure', 'Tableau']
        }
      }
    }
  ],
  accounts: [
    {
      id: 'acct1',
      name: 'Cloudburst Technologies',
      website: 'cloudbursttech.com',
      industry: 'Information Technology',
      revenue: '$75M',
      employees: 450,
      address: '123 Tech Blvd, San Francisco, CA 94105',
      status: 'Customer',
      createdDate: '2022-05-15',
      contacts: ['contact1', 'contact2'],
      opportunities: ['opp1', 'opp2'],
      insights: {
        gongCalls: [
          { date: '2023-10-15', summary: 'Quarterly business review - plans to expand usage' },
          { date: '2023-11-01', summary: 'Technical support call regarding API integration' }
        ],
        linkedInNews: [
          { date: '2023-09-10', headline: 'Cloudburst Technologies opens new office in Austin' },
          { date: '2023-10-20', headline: 'Cloudburst announces partnership with Microsoft' }
        ],
        zoomInfo: {
          companySize: '250-500 employees',
          industry: 'Cloud Computing',
          revenue: '$50M-$100M',
          techStack: ['AWS', 'Kubernetes', 'Terraform']
        }
      }
    },
    {
      id: 'acct2',
      name: 'Summit Financial Group',
      website: 'summitfinancial.com',
      industry: 'Financial Services',
      revenue: '$1.2B',
      employees: 2800,
      address: '555 Finance Way, New York, NY 10004',
      status: 'Customer',
      createdDate: '2021-03-10',
      contacts: ['contact3', 'contact4'],
      opportunities: ['opp3'],
      insights: {
        gongCalls: [
          { date: '2023-09-05', summary: 'Contract renewal discussion' },
          { date: '2023-10-10', summary: 'Enterprise security feature planning' }
        ],
        linkedInNews: [
          { date: '2023-08-15', headline: 'Summit Financial Group reports record Q2 earnings' },
          { date: '2023-10-25', headline: 'Summit Financial appoints new CTO' }
        ],
        zoomInfo: {
          companySize: '1000+ employees',
          industry: 'Financial Services',
          revenue: '$1B-$5B',
          techStack: ['Salesforce Financial Services Cloud', 'Bloomberg Terminal', 'Oracle']
        }
      }
    },
    {
      id: 'acct3',
      name: 'GreenPath Sustainability',
      website: 'greenpathsustain.org',
      industry: 'Environmental Services',
      revenue: '$30M',
      employees: 175,
      address: '789 Eco Lane, Portland, OR 97204',
      status: 'Prospect',
      createdDate: '2023-07-22',
      contacts: ['contact5'],
      opportunities: ['opp4'],
      insights: {
        gongCalls: [
          { date: '2023-09-12', summary: 'Initial meeting with leadership team' },
          { date: '2023-10-20', summary: 'Demo of sustainability reporting features' }
        ],
        linkedInNews: [
          { date: '2023-10-05', headline: 'GreenPath Sustainability wins Environmental Impact award' }
        ],
        zoomInfo: {
          companySize: '100-250 employees',
          industry: 'Environmental Consulting',
          revenue: '$25M-$50M',
          techStack: ['Salesforce', 'Google Cloud Platform', 'Tableau']
        }
      }
    }
  ],
  contacts: [
    {
      id: 'contact1',
      firstName: 'David',
      lastName: 'Chen',
      title: 'CTO',
      accountId: 'acct1',
      accountName: 'Cloudburst Technologies',
      email: 'david.chen@cloudbursttech.com',
      phone: '(415) 555-7890',
      createdDate: '2022-05-15',
      lastActivity: '2023-10-28',
      insights: {
        gongCalls: [
          { date: '2023-10-15', summary: 'Discussed technical requirements for platform upgrade' },
          { date: '2023-10-28', summary: 'Review of integration timeline' }
        ],
        linkedInNews: [
          { date: '2023-09-30', headline: 'David Chen speaks at Cloud Computing Conference' }
        ],
        zoomInfo: {
          education: 'MS Computer Science, Stanford University',
          previousCompanies: ['Oracle', 'Salesforce'],
          interests: ['Cloud Architecture', 'Distributed Systems']
        }
      }
    },
    {
      id: 'contact2',
      firstName: 'Priya',
      lastName: 'Patel',
      title: 'VP of Product',
      accountId: 'acct1',
      accountName: 'Cloudburst Technologies',
      email: 'priya.patel@cloudbursttech.com',
      phone: '(415) 555-8901',
      createdDate: '2022-06-10',
      lastActivity: '2023-11-02',
      insights: {
        gongCalls: [
          { date: '2023-10-05', summary: 'Product roadmap discussion' },
          { date: '2023-11-02', summary: 'Feature prioritization for Q1 2024' }
        ],
        linkedInNews: [
          { date: '2023-10-15', headline: 'Priya Patel featured in Product Management Monthly' }
        ],
        zoomInfo: {
          education: 'MBA, UC Berkeley',
          previousCompanies: ['Google', 'Atlassian'],
          interests: ['Product Development', 'UX Design']
        }
      }
    },
    {
      id: 'contact3',
      firstName: 'Robert',
      lastName: 'Johnson',
      title: 'CFO',
      accountId: 'acct2',
      accountName: 'Summit Financial Group',
      email: 'r.johnson@summitfinancial.com',
      phone: '(212) 555-3456',
      createdDate: '2021-03-15',
      lastActivity: '2023-10-18',
      insights: {
        gongCalls: [
          { date: '2023-09-05', summary: 'Budget planning for 2024' },
          { date: '2023-10-18', summary: 'ROI analysis of platform investments' }
        ],
        linkedInNews: [
          { date: '2023-10-10', headline: 'Robert Johnson joins Financial Leadership Council' }
        ],
        zoomInfo: {
          education: 'MBA Finance, Wharton',
          previousCompanies: ['JPMorgan Chase', 'Deloitte'],
          interests: ['Financial Technology', 'Risk Management']
        }
      }
    }
  ],
  opportunities: [
    {
      id: 'opp1',
      name: 'Cloudburst Technologies - Platform Expansion',
      accountId: 'acct1',
      accountName: 'Cloudburst Technologies',
      amount: 250000,
      stage: 'Proposal',
      probability: 70,
      closeDate: '2023-12-15',
      type: 'Expansion',
      primaryContact: 'contact1',
      contactName: 'David Chen',
      products: ['product1', 'product3'],
      createdDate: '2023-09-01',
      lastActivity: '2023-11-01',
      insights: {
        gongCalls: [
          { date: '2023-09-20', summary: 'Technical requirements gathering' },
          { date: '2023-10-15', summary: 'ROI discussion with leadership team' },
          { date: '2023-11-01', summary: 'Proposal presentation' }
        ],
        linkedInNews: [
          { date: '2023-10-20', headline: 'Cloudburst Technologies announces plans for AI initiatives' }
        ],
        zoomInfo: {
          competitorActivity: 'Recently met with Oracle Cloud team',
          budgetCycle: 'Fiscal year ends December 31',
          decisionMakers: ['David Chen (CTO)', 'Sarah Liu (CEO)']
        }
      }
    },
    {
      id: 'opp2',
      name: 'Cloudburst Technologies - Support Renewal',
      accountId: 'acct1',
      accountName: 'Cloudburst Technologies',
      amount: 75000,
      stage: 'Negotiation',
      probability: 90,
      closeDate: '2023-11-30',
      type: 'Renewal',
      primaryContact: 'contact2',
      contactName: 'Priya Patel',
      products: ['product2'],
      createdDate: '2023-08-15',
      lastActivity: '2023-10-28',
      insights: {
        gongCalls: [
          { date: '2023-09-10', summary: 'Service review and satisfaction check' },
          { date: '2023-10-05', summary: 'Renewal terms discussion' },
          { date: '2023-10-28', summary: 'Final negotiation of contract terms' }
        ],
        linkedInNews: [],
        zoomInfo: {
          competitorActivity: 'None detected',
          budgetCycle: 'Fiscal year ends December 31',
          decisionMakers: ['Priya Patel (VP Product)', 'Alex Wong (Procurement)']
        }
      }
    },
    {
      id: 'opp3',
      name: 'Summit Financial - Security Suite Implementation',
      accountId: 'acct2',
      accountName: 'Summit Financial Group',
      amount: 450000,
      stage: 'Discovery',
      probability: 40,
      closeDate: '2024-02-28',
      type: 'New Business',
      primaryContact: 'contact3',
      contactName: 'Robert Johnson',
      products: ['product1', 'product4'],
      createdDate: '2023-10-10',
      lastActivity: '2023-11-02',
      insights: {
        gongCalls: [
          { date: '2023-10-15', summary: 'Initial security requirements gathering' },
          { date: '2023-11-02', summary: 'Technical deep dive with IT security team' }
        ],
        linkedInNews: [
          { date: '2023-10-25', headline: 'Summit Financial appoints new CISO' }
        ],
        zoomInfo: {
          competitorActivity: 'Evaluating Palo Alto Networks solution',
          budgetCycle: 'New fiscal year begins January 1',
          decisionMakers: ['Robert Johnson (CFO)', 'Jennifer Lee (CISO)']
        }
      }
    }
  ],
  products: [
    {
      id: 'product1',
      name: 'Enterprise Cloud Platform',
      code: 'ECP-100',
      family: 'Cloud Services',
      description: 'Comprehensive cloud computing platform with advanced security features',
      listPrice: 100000,
      active: true,
      features: [
        'Scalable cloud infrastructure',
        'Real-time monitoring',
        'Advanced security protocols',
        'Disaster recovery'
      ]
    },
    {
      id: 'product2',
      name: 'Premium Support Package',
      code: 'SUP-200',
      family: 'Support Services',
      description: '24/7 technical support with dedicated account representative',
      listPrice: 75000,
      active: true,
      features: [
        '24/7 technical support',
        'Dedicated account manager',
        'Quarterly business reviews',
        'Priority issue resolution'
      ]
    },
    {
      id: 'product3',
      name: 'Data Analytics Suite',
      code: 'DAS-300',
      family: 'Analytics',
      description: 'Comprehensive data analytics and visualization tools',
      listPrice: 150000,
      active: true,
      features: [
        'Real-time data processing',
        'Advanced visualization tools',
        'Predictive analytics',
        'Custom reporting'
      ]
    },
    {
      id: 'product4',
      name: 'Security Compliance Package',
      code: 'SEC-400',
      family: 'Security',
      description: 'Enterprise-grade security and compliance tools',
      listPrice: 200000,
      active: true,
      features: [
        'Automated compliance monitoring',
        'Threat detection and prevention',
        'Regular security audits',
        'Custom security policies'
      ]
    }
  ]
};