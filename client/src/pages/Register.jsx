import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { fetchApi } from '../utils/api';
import AlertBanner from '../components/AlertBanner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    role: 'farmer',
    address: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        location: {
          type: 'Point',
          coordinates: [78.9629, 20.5937],
          address: formData.address,
        }
      };

      const data = await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      
      if (data.success) {
        login(data.data);
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md border border-slate-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            Create an account
          </h2>
        </div>
        {error && <AlertBanner message={error} type="error" />}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-sm font-medium text-slate-700">Full Name</label>
            <input
              name="name"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Phone Number</label>
            <input
              name="phone"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Role</label>
            <select
              name="role"
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="farmer">Farmer</option>
              <option value="buyer">Bulk Buyer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Address / Location</label>
            <input
              name="address"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:bg-brand-400"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
          <div className="text-center text-sm">
            <Link to="/login" className="font-medium text-brand-600 hover:text-brand-500">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
