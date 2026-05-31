import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './hooks/useAuth';

/**
 * PrivateRoute — redirects unauthenticated users to /login.
 * Shows a minimal loading indicator while the auth state hydrates from localStorage.
 */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

/**
 * RoleDashboard — renders the correct dashboard based on the authenticated user's role.
 */
const RoleDashboard = () => {
  const { user } = useAuth();
  if (user?.role === 'buyer') return <BuyerDashboard />;
  return <FarmerDashboard />;
};

/**
 * PublicOnlyRoute — redirects already-logged-in users away from login/register pages.
 */
const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public landing page */}
              <Route path="/" element={<LandingPage />} />

              {/* Auth pages — redirect to dashboard if already logged in */}
              <Route path="/login"    element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
              <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />

              {/* Protected dashboard — role-aware */}
              <Route
                path="/dashboard"
                element={<PrivateRoute><RoleDashboard /></PrivateRoute>}
              />

              {/* Fallback: unknown paths go home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
