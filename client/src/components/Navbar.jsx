import React, { useState } from 'react';
import { Sprout, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  const roleBadgeColor = user?.role === 'farmer'
    ? 'bg-emerald-100 text-emerald-800'
    : 'bg-blue-100 text-blue-800';

  return (
    <nav className="bg-brand-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <Sprout className="w-7 h-7 text-emerald-300" />
            <span className="font-extrabold text-xl tracking-tight">Farm Fresh</span>
          </Link>

          {/* Desktop right side */}
          <div className="hidden sm:flex items-center space-x-3">
            {user ? (
              <>
                {/* Role badge */}
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${roleBadgeColor}`}>
                  {user.role === 'farmer' ? '🌾 Farmer' : '🏪 Buyer'}
                </span>

                {/* Dashboard link */}
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-600 text-white'
                        : 'text-emerald-100 hover:bg-brand-600 hover:text-white'
                    }`
                  }
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </NavLink>

                {/* User name */}
                <span className="text-sm text-emerald-200 font-medium hidden lg:block">
                  {user.name}
                </span>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 bg-brand-800 hover:bg-brand-900 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-emerald-100 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-brand-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-400 hover:bg-emerald-300 text-brand-900 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-brand-600 transition-colors"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-brand-800 border-t border-brand-600 px-4 py-4 space-y-2">
          {user ? (
            <>
              <div className="text-emerald-200 text-sm font-medium pb-2 border-b border-brand-600">
                {user.name} · <span className="capitalize">{user.role}</span>
              </div>
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-brand-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-brand-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-brand-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-lg text-sm font-semibold bg-emerald-400 text-brand-900 text-center"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
