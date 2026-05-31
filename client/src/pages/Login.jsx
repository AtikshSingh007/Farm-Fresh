import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { fetchApi } from '../utils/api';
import AlertBanner from '../components/AlertBanner';
import { Sprout, Phone, Lock, Loader2, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [phone, setPhone]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const data = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phone: phone.trim(), password }),
      });
      if (data.success) {
        login(data.data);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)' }}>

      {/* Left panel — branding (hidden on mobile) */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 text-white"
        style={{ background: 'linear-gradient(160deg, #052e16 0%, #14532d 60%, #166534 100%)' }}
      >
        <div className="flex items-center gap-2">
          <Sprout className="w-7 h-7 text-emerald-400" />
          <span className="font-extrabold text-xl">Farm Fresh</span>
        </div>
        <div>
          <blockquote className="text-2xl font-semibold leading-snug text-white mb-4">
            "I got ₹18/kg for my onions — 4× what the Mandi offered."
          </blockquote>
          <p className="text-emerald-300 text-sm">— Ramesh Patel, Nashik Farmer</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[['10,000+', 'Farmers'], ['₹50 Cr+', 'Saved'], ['500+', 'Buyers'], ['28', 'States']].map(([v, l]) => (
            <div key={l} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <p className="text-2xl font-extrabold text-white">{v}</p>
              <p className="text-emerald-300 text-xs mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <Sprout className="w-7 h-7 text-emerald-600" />
            <span className="font-extrabold text-xl text-slate-900">Farm Fresh</span>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Welcome back</h2>
            <p className="text-slate-500 text-sm mb-6">Sign in to your account to continue</p>

            {error && <AlertBanner message={error} type="error" />}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="phone"
                    type="text"
                    required
                    placeholder="e.g. 9876543210"
                    className="input-base pl-10"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    required
                    placeholder="Your password"
                    className="input-base pl-10 pr-10"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    tabIndex={-1}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 text-base mt-2"
              >
                {isLoading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Signing in…</span></>
                  : 'Sign In'
                }
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-5">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-600 font-semibold hover:text-brand-700">
                Register free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
