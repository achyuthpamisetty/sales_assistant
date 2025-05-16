import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { SalesforceProvider } from './context/SalesforceContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Auth pages
const AuthPage = lazy(() => import('./pages/auth/AuthPage'));

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
const OpportunityPipeline = lazy(() => import('./pages/OpportunityPipeline'));
const EmailComposer = lazy(() => import('./pages/EmailComposer'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const Permissions = lazy(() => import('./pages/admin/Permissions'));
const Integrations = lazy(() => import('./pages/admin/Integrations')); // 👈 NEW LINE

function App() {
  return (
    <AuthProvider>
      <SalesforceProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/leads"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Leads />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/leads/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <LeadDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/accounts"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Accounts />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/accounts/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AccountDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/contacts"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Contacts />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/contacts/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ContactDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/opportunities"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Opportunities />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/opportunities/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <OpportunityDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/pipeline"
              element={
                <ProtectedRoute>
                  <Layout>
                    <OpportunityPipeline />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/email-composer"
              element={
                <ProtectedRoute>
                  <Layout>
                    <EmailComposer />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UserManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/permissions"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Permissions />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/integrations" // 👈 NEW ROUTE
              element={
                <ProtectedRoute>
                  <Layout>
                    <Integrations />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </SalesforceProvider>
    </AuthProvider>
  );
}

export default App;
