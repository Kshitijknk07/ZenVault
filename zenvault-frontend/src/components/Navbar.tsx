import { Menu, X, Shield, User, LogOut, HardDrive } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const isHomePage = location.pathname === '/';

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/80 backdrop-blur-md shadow-sm'
        : isHomePage
          ? 'bg-transparent'
          : 'bg-white'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${scrolled ? 'bg-accent text-white' : 'bg-accent/10 text-accent'} transition-all duration-300`}>
                  <Shield className="h-5 w-5" />
                </div>
                <span className="ml-2 text-xl font-bold">ZenVault</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-accent"
                >
                  Home
                </Link>
                <a
                  href="#features"
                  className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-accent"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-accent"
                >
                  Pricing
                </a>
                <a
                  href="#creator"
                  className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-accent"
                >
                  Creator
                </a>
                <a
                  href="#faq"
                  className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-accent"
                >
                  FAQ
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isSignedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center text-foreground hover:text-accent px-4 py-2 rounded-md text-sm font-medium mr-2 transition-all duration-200"
                  >
                    <HardDrive className="h-4 w-4 mr-1.5" />
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center text-foreground hover:text-accent px-4 py-2 rounded-md text-sm font-medium mr-2 transition-all duration-200"
                  >
                    <User className="h-4 w-4 mr-1.5" />
                    {user?.firstName || 'Profile'}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4 mr-1.5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="border border-border hover:border-accent/50 hover:text-accent px-4 py-2 rounded-md text-sm font-medium mr-3 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-accent hover:bg-accent/90 text-white px-5 py-2 rounded-md text-sm font-medium shadow-accent-sm hover:shadow-accent-glow transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-accent hover:bg-secondary focus:outline-none transition-all duration-200"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-accent hover:bg-secondary focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-4 rounded-md text-base font-medium hover:text-accent transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <a
            href="#features"
            className="block px-3 py-4 rounded-md text-base font-medium hover:text-accent transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="block px-3 py-4 rounded-md text-base font-medium hover:text-accent transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </a>
          <a
            href="#creator"
            className="block px-3 py-4 rounded-md text-base font-medium hover:text-accent transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Creator
          </a>
          <a
            href="#faq"
            className="block px-3 py-4 rounded-md text-base font-medium hover:text-accent transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </a>
        </div>
        <div className="pt-4 pb-3 border-t border-border">
          {isSignedIn ? (
            <div className="px-5 space-y-3">
              <Link
                to="/dashboard"
                className="flex items-center justify-center text-foreground hover:text-accent px-4 py-3 rounded-md text-base font-medium w-full transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <HardDrive className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="flex items-center justify-center text-foreground hover:text-accent px-4 py-3 rounded-md text-base font-medium w-full transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center bg-secondary hover:bg-secondary/80 text-foreground px-4 py-3 rounded-md text-base font-medium w-full transition-all duration-200"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="px-5 space-y-3">
              <Link
                to="/login"
                className="flex items-center justify-center border border-border hover:border-accent/50 hover:text-accent px-4 py-3 rounded-md text-base font-medium w-full transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center justify-center bg-accent hover:bg-accent/90 text-white px-4 py-3 rounded-md text-base font-medium w-full shadow-accent-sm hover:shadow-accent-glow transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;