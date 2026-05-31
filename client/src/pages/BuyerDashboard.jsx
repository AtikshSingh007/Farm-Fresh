import React, { useState, useEffect } from 'react';
import { Search, Filter, Package, RefreshCw, Loader2, ShoppingCart, MapPin } from 'lucide-react';
import { fetchApi } from '../utils/api';
import { useAuth } from '../hooks/useAuth';
import AlertBanner from '../components/AlertBanner';

const CATEGORIES = ['All', 'Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices', 'Oilseeds', 'Other'];

const BuyerDashboard = () => {
  const [listings, setListings]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [search, setSearch]         = useState('');
  const [category, setCategory]     = useState('All');
  const { user } = useAuth();

  const loadListings = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ status: 'available' });
      if (search)   params.append('cropName', search);
      const res = await fetchApi(`/listings?${params.toString()}`);
      setListings(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load marketplace listings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadListings(); }, []);

  const filtered = category === 'All'
    ? listings
    : listings.filter(l => l.category === category);

  const handleSearch = e => {
    e.preventDefault();
    loadListings();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Marketplace 🏪
        </h1>
        <p className="mt-1 text-slate-500">
          Browse fresh produce directly from verified farmers across India.
        </p>
      </div>

      {/* Search & filter bar */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search crop name…"
            className="input-base pl-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary shrink-0">
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
        <button
          type="button"
          onClick={() => { setSearch(''); setCategory('All'); loadListings(); }}
          className="btn-ghost shrink-0"
          title="Refresh listings"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </form>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              category === cat
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && <AlertBanner type="error" message={error} />}

      {loading ? (
        <div className="flex items-center justify-center py-24 gap-3">
          <Loader2 className="w-6 h-6 text-brand-600 animate-spin" />
          <span className="text-slate-500">Loading marketplace…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-1">No listings found</h3>
          <p className="text-slate-500 text-sm">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(item => (
            <div key={item._id || item.id} className="card p-5 hover:shadow-md transition-shadow duration-200 flex flex-col">
              {/* Crop header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{item.cropName}</h3>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{item.category}</span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-brand-600">₹{item.minimumPricePerKg}</p>
                  <p className="text-xs text-slate-500">per kg</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4 flex-grow">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Available Qty</span>
                  <span className="font-medium text-slate-800">{item.quantityAvailable} {item.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Harvest Date</span>
                  <span className="font-medium text-slate-800">
                    {new Date(item.expectedHarvestDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                {item.farmerId?.location?.address && (
                  <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{item.farmerId.location.address}</span>
                  </div>
                )}
                {item.farmerId?.name && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Farmer</span>
                    <span className="font-medium text-slate-800">{item.farmerId.name}</span>
                  </div>
                )}
              </div>

              {/* Action */}
              <button className="btn-primary w-full mt-auto">
                <ShoppingCart className="w-4 h-4" />
                <span>Request Quote</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
