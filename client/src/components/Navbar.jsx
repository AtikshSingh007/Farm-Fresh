import React from 'react';
import { Sprout, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-brand-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="w-8 h-8 text-brand-100" />
            <span className="font-bold text-xl tracking-tight">Farm Fresh</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm font-medium hidden sm:block">
                  Hello, {user.name} ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-brand-700 hover:bg-brand-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                className="flex items-center space-x-1 bg-brand-100 text-brand-900 hover:bg-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
