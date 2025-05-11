import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { SalesforceProvider } from './context/SalesforceContext';

// Lazy loaded pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Leads = lazy(() => import('./pages/Leads'));
const LeadDetail = lazy(() => import('./pages/LeadDetail'));
const Accounts = lazy(() => import('./pages/Accounts'));
const AccountDetail = lazy(() => import('./pages/AccountDetail'));
const Contacts = lazy(() => import('./pages/Contacts'));
const ContactDetail = lazy(() => import('./pages/ContactDetail'));
const Opportunities = lazy(() => import('./pages/Opportunities'));
const OpportunityDetail = lazy(() => import('./pages/OpportunityDetail'));
const EmailComposer = lazy(() => import('./pages/EmailComposer'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const Permissions = lazy(() => import('./pages/admin/Permissions'));
const integrations = lazy(() => import('./pages/admin/Permissions'));

function App() {
  return (
    <SalesforceProvider>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/leads/:id" element={<LeadDetail />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/accounts/:id" element={<AccountDetail />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/contacts/:id" element={<ContactDetail />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/opportunities/:id" element={<OpportunityDetail />} />
            <Route path="/email-composer" element={<EmailComposer />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/permissions" element={<Permissions />} />
          </Routes>
        </Suspense>
      </Layout>
    </SalesforceProvider>
  );
}

export default App;