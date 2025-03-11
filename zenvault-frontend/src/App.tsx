import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Creator from './components/Creator';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import Profile from './Login/Profile';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { userApi } from './lib/api';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background text-foreground font-jakarta">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

const App = () => {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (isSignedIn && userId && user) {
      const syncUserWithBackend = async () => {
        try {
          const primaryEmail = user.primaryEmailAddress?.emailAddress;
          const name = user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim();
          await userApi.createClerkUser(userId, primaryEmail, name);
        } catch (error) {
          console.error('Error syncing user with backend:', error);
        }
      };

      syncUserWithBackend();
    }
  }, [isSignedIn, userId, user]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <div className="bg-grid">
              <Hero />
              <Features />
              <Pricing />
              <Creator />
              <FAQ />
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;