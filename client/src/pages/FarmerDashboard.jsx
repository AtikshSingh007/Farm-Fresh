import React, { useState, useEffect } from 'react';
import {
  Package, TrendingUp, IndianRupee, PlusCircle,
  AlertTriangle, X, Loader2, Leaf, ChevronDown
} from 'lucide-react';
import AlertBanner from '../components/AlertBanner';
import { fetchApi } from '../utils/api';
import { useAuth } from '../hooks/useAuth';

/* ─── Simulated live Mandi prices (in a real app: fetched from an API) ─── */
const LIVE_MANDI_PRICES = { Tomatoes: 12, Onions: 8, Potatoes: 7 };

/* ─── Category options (must match Listing model enum) ─────────────────── */
const CATEGORIES = ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices', 'Oilseeds', 'Other'];

/* ─── New Listing Modal ──────────────────────────────────────────────────── */
const NewListingModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    cropName: '',
    category: 'Vegetables',
    quantityAvailable: '',
    unit: 'kg',
    minimumPricePerKg: '',
    expectedHarvestDate: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await fetchApi('/listings', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          quantityAvailable: Number(form.quantityAvailable),
          minimumPricePerKg: Number(form.minimumPricePerKg),
        }),
      });
      onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to create listing. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Close on backdrop click
  const handleBackdrop = e => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-emerald-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">New Produce Listing</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && <AlertBanner message={error} type="error" />}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Crop Name *</label>
              <input
                name="cropName"
                type="text"
                required
                placeholder="e.g. Tomatoes, Onions, Wheat"
                className="input-base"
                value={form.cropName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
              <div className="relative">
                <select
                  name="category"
                  required
                  className="input-base appearance-none pr-8"
                  value={form.category}
                  onChange={handleChange}
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Unit *</label>
              <div className="relative">
                <select
                  name="unit"
                  required
                  className="input-base appearance-none pr-8"
                  value={form.unit}
                  onChange={handleChange}
                >
                  <option value="kg">kg</option>
                  <option value="quintals">quintals</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Quantity *</label>
              <input
                name="quantityAvailable"
                type="number"
                required
                min="1"
                placeholder="e.g. 500"
                className="input-base"
                value={form.quantityAvailable}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Min Price / kg (₹) *</label>
              <input
                name="minimumPricePerKg"
                type="number"
                required
                min="0.01"
                step="0.01"
                placeholder="e.g. 18"
                className="input-base"
                value={form.minimumPricePerKg}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Expected Harvest Date *</label>
              <input
                name="expectedHarvestDate"
                type="date"
                required
                className="input-base"
                min={new Date().toISOString().split('T')[0]}
                value={form.expectedHarvestDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex-1"
            >
              {submitting
                ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Listing…</span></>
                : <><PlusCircle className="w-4 h-4" /><span>Create Listing</span></>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ─── Status badge helper ─────────────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const map = {
    available: 'badge-available',
    pooling:   'badge-pooling',
    sold:      'badge-sold',
    expired:   'badge-expired',
  };
  return <span className={map[status] || 'badge-sold'}>{status}</span>;
};

/* ─── Farmer Dashboard ───────────────────────────────────────────────────── */
const FarmerDashboard = () => {
  const [listings, setListings]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [fetchError, setFetchError]   = useState('');
  const [showModal, setShowModal]     = useState(false);
  const { user } = useAuth();

  /* Fetch this farmer's own listings from the dedicated endpoint */
  const loadListings = async () => {
    setLoading(true);
    setFetchError('');
    try {
      const response = await fetchApi('/listings/my');
      setListings(response.data || []);
    } catch (err) {
      setFetchError(err.message || 'Could not load your listings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadListings(); }, []);

  /* Distress sale check: any listing where the live market price < farmer's min price */
  const distressAlerts = listings.filter(l =>
    LIVE_MANDI_PRICES[l.cropName] !== undefined &&
    LIVE_MANDI_PRICES[l.cropName] < l.minimumPricePerKg
  );

  /* Analytics */
  const totalViews   = listings.reduce((s, l) => s + (l.analytics?.views  || 0), 0);
  const totalOffers  = listings.reduce((s, l) => s + (l.analytics?.offers || 0), 0);
  const activeCount  = listings.filter(l => l.status === 'available' || l.status === 'pooling').length;

  return (
    <>
      {showModal && (
        <NewListingModal
          onClose={() => setShowModal(false)}
          onSuccess={() => { setShowModal(false); loadListings(); }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="mt-1 text-slate-500">Manage your produce, track sales, and monitor market trends.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary shrink-0"
          >
            <PlusCircle className="w-5 h-5" />
            <span>New Listing</span>
          </button>
        </div>

        {/* Distress sale alerts */}
        {distressAlerts.length > 0 && (
          <div className="mb-6 space-y-2">
            {distressAlerts.map(l => (
              <AlertBanner
                key={l._id || l.id}
                type="error"
                message={`🚨 Market Alert: Local Mandi price for ${l.cropName} has dropped to ₹${LIVE_MANDI_PRICES[l.cropName]}/kg — below your minimum of ₹${l.minimumPricePerKg}/kg. We're routing bulk buyers to your listing now.`}
              />
            ))}
          </div>
        )}

        {/* Fetch error */}
        {fetchError && <AlertBanner type="error" message={fetchError} />}

        {/* ── Analytics Cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {[
            {
              label: 'Active Listings',
              value: loading ? '—' : activeCount,
              icon: Package,
              iconBg: 'bg-emerald-100',
              iconColor: 'text-emerald-600',
            },
            {
              label: 'Total Views',
              value: loading ? '—' : totalViews.toLocaleString(),
              icon: TrendingUp,
              iconBg: 'bg-blue-100',
              iconColor: 'text-blue-600',
            },
            {
              label: 'Pending Offers',
              value: loading ? '—' : totalOffers,
              icon: IndianRupee,
              iconBg: 'bg-amber-100',
              iconColor: 'text-amber-600',
            },
          ].map(({ label, value, icon: Icon, iconBg, iconColor }) => (
            <div key={label} className="card p-6 flex items-start gap-4">
              <div className={`p-3 rounded-xl flex-shrink-0 ${iconBg}`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Listings Table ──────────────────────────────────────────── */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Your Produce Inventory</h2>
            <span className="text-sm text-slate-400">{listings.length} listing{listings.length !== 1 ? 's' : ''}</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3">
              <Loader2 className="w-6 h-6 text-brand-600 animate-spin" />
              <span className="text-slate-500">Loading your listings…</span>
            </div>
          ) : listings.length === 0 ? (
            /* Empty state */
            <div className="text-center py-20 px-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">No listings yet</h3>
              <p className="text-slate-500 text-sm mb-6">
                Create your first produce listing and start receiving offers from bulk buyers.
              </p>
              <button onClick={() => setShowModal(true)} className="btn-primary">
                <PlusCircle className="w-4 h-4" />
                <span>Create Your First Listing</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50">
                  <tr>
                    {['Crop', 'Category', 'Quantity', 'Min Price', 'Harvest Date', 'Views', 'Status'].map(h => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {listings.map(item => {
                    const hasDistress =
                      LIVE_MANDI_PRICES[item.cropName] !== undefined &&
                      LIVE_MANDI_PRICES[item.cropName] < item.minimumPricePerKg;
                    return (
                      <tr key={item._id || item.id} className={`hover:bg-slate-50 transition-colors ${hasDistress ? 'bg-red-50/50' : ''}`}>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900">{item.cropName}</span>
                            {hasDistress && (
                              <AlertTriangle className="w-4 h-4 text-red-500" title="Distress sale risk" />
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-500">{item.category}</td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">
                          {item.quantityAvailable} {item.unit}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          ₹{item.minimumPricePerKg}/kg
                          {hasDistress && (
                            <span className="ml-1.5 text-xs text-red-500">
                              (Mandi: ₹{LIVE_MANDI_PRICES[item.cropName]})
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-500">
                          {new Date(item.expectedHarvestDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-500">
                          {item.analytics?.views ?? 0}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <StatusBadge status={item.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FarmerDashboard;
