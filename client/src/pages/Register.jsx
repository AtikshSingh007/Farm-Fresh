import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { fetchApi } from '../utils/api';
import AlertBanner from '../components/AlertBanner';
import { Sprout, Phone, Lock, User, MapPin, Loader2, Eye, EyeOff } from 'lucide-react';

const ROLES = [
  {
    value: 'farmer',
    label: '🌾 Farmer',
    desc: 'I grow crops and want to sell directly to bulk buyers',
  },
  {
    value: 'buyer',
    label: '🏪 Bulk Buyer',
    desc: 'I represent a restaurant, retailer, or food processor',
  },
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    role: 'farmer',
    address: '',
  });
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleChange = e =>
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    if (!/^\+?[0-9]{10,15}$/.test(formData.phone.trim())) {
      return setError('Please enter a valid phone number (10–15 digits).');
    }

    setIsLoading(true);
    try {
      const payload = {
        name:     formData.name.trim(),
        phone:    formData.phone.trim(),
        password: formData.password,
        role:     formData.role,
        location: {
          type: 'Point',
          coordinates: [78.9629, 20.5937], // Default: India center; replaced by geolocation in prod
          address: formData.address.trim() || 'India',
        },
      };

      const data = await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (data.success) {
        login(data.data);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-start justify-center py-12 px-4"
      style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)' }}
    >
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <Sprout className="w-7 h-7 text-emerald-600" />
          <span className="font-extrabold text-2xl text-slate-900">Farm Fresh</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Create your account</h2>
          <p className="text-slate-500 text-sm mb-6">Join 10,000+ farmers and buyers. Free forever.</p>

          {error && <AlertBanner message={error} type="error" />}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">I am a…</label>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map(({ value, label, desc }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData(f => ({ ...f, role: value }))}
                    className={`p-3 rounded-xl border-2 text-left transition-all duration-150 ${
                      formData.role === value
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <p className={`font-semibold text-sm ${formData.role === value ? 'text-brand-700' : 'text-slate-700'}`}>
                      {label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-tight">{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="input-base pl-10"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="reg-phone" className="block text-sm font-medium text-slate-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="reg-phone"
                  name="phone"
                  type="text"
                  required
                  placeholder="e.g. 9876543210"
                  className="input-base pl-10"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-slate-700 mb-1">
                Password <span className="text-slate-400 font-normal">(min 6 characters)</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="reg-password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  required
                  minLength={6}
                  placeholder="Create a password"
                  className="input-base pl-10 pr-10"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
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

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">
                Location / Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="e.g. Nashik, Maharashtra"
                  className="input-base pl-10"
                  value={formData.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 text-base mt-2"
            >
              {isLoading
                ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Creating account…</span></>
                : 'Create Free Account'
              }
            </button>

            <p className="text-center text-xs text-slate-400">
              By registering, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 font-semibold hover:text-brand-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
