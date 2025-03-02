import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Login from './Login/Login';
import Profile from './Login/Profile';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-900 text-white">
    <Navbar />
    {children}
    <Footer />
  </div>
);

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
         
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Pricing />
              <Testimonials />
              <FAQ />
            </>
          } />
          
          
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
