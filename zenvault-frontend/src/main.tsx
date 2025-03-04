import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
import ErrorBoundary from './Login/ErrorBoundary';
import './index.css';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_YourClerkPublishableKey';

if (!publishableKey || publishableKey === 'pk_test_YourClerkPublishableKey') {
  console.warn("Missing or default Clerk publishable key. Authentication features may not work correctly.");
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ClerkProvider publishableKey={publishableKey}>
        <App />
      </ClerkProvider>
    </ErrorBoundary>
  </React.StrictMode>
);