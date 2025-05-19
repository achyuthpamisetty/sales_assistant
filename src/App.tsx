```typescript
// Update the imports section to include the new Activities page
const Activities = lazy(() => import('./pages/Activities'));

// Add the new route inside the Routes component
<Route
  path="/activities"
  element={
    <ProtectedRoute>
      <Layout>
        <Activities />
      </Layout>
    </ProtectedRoute>
  }
/>
```