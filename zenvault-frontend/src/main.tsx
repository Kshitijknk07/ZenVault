import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import ErrorBoundary from './Login/ErrorBoundary';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing Clerk publishable key. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.");
}

const Main = () => (
  <ClerkProvider publishableKey={publishableKey}>
    <SignedIn>
      <App />
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </ClerkProvider>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  </React.StrictMode>
);

export default Main;

