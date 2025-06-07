import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';

declare global {
  interface Window {
    fakeLogin: () => void;
  }
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('fakeLoggedIn') === 'true');
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  // Expose a global function to trigger login from outside (for popup)
  React.useEffect(() => {
    window.fakeLogin = () => {
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
        setLoggedIn(true);
        localStorage.setItem('fakeLoggedIn', 'true');
        navigate('/');
      }, 1500);
    };
    // Listen for storage changes (cross-tab and same tab)
    const onStorage = () => {
      setLoggedIn(localStorage.getItem('fakeLoggedIn') === 'true');
    };
    window.addEventListener('storage', onStorage);
    return () => {
      delete window.fakeLogin;
      window.removeEventListener('storage', onStorage);
    };
  }, [navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">Wheels<span className="text-orange-500">Xchange</span></span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-blue-500">
                Home
              </Link>
              <Link to="/buy-car" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-blue-500 hover:text-gray-900">
                Buy Car
              </Link>
              <Link to="/sell-car" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-blue-500 hover:text-gray-900">
                Sell Car
              </Link>
              <Link to="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-blue-500 hover:text-gray-900">
                About Us
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {loggedIn ? (
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" className="px-2 py-1 text-xs" onClick={() => {
                  setLoggedIn(false);
                  localStorage.removeItem('fakeLoggedIn');
                  navigate('/login');
                }}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1">
          <Link to="/" className="block pl-3 pr-4 py-2 text-base font-medium text-blue-600 border-l-4 border-blue-500 bg-blue-50">
            Home
          </Link>
          <Link to="/buy-car" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
            Buy Car
          </Link>
          <Link to="/sell-car" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
            Sell Car
          </Link>
          <Link to="/about" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
            About Us
          </Link>
        </div>
        <div className="mt-4 px-4 flex flex-col space-y-2">
          {loggedIn ? (
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline" className="px-2 py-1 text-xs" onClick={() => {
                setLoggedIn(false);
                localStorage.removeItem('fakeLoggedIn');
                navigate('/login');
              }}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg px-8 py-6 text-center">
            <h3 className="text-xl font-semibold mb-2">{loggedIn ? 'Signed in' : 'Logged in'}</h3>
            <p className="text-gray-600">You have successfully {loggedIn ? 'signed in' : 'logged in'}!</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
