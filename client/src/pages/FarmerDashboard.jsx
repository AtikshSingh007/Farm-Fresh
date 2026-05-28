import React, { useState } from 'react';
import { Package, TrendingUp, DollarSign, PlusCircle } from 'lucide-react';
import AlertBanner from '../components/AlertBanner';

const FarmerDashboard = () => {
  const [activeListings, setActiveListings] = useState([
    { id: 1, cropName: 'Tomatoes', quantity: 50, unit: 'kg', price: 15, status: 'available' },
    { id: 2, cropName: 'Onions', quantity: 100, unit: 'quintals', price: 1200, status: 'pooling' }
  ]);

  // Simulating a condition where market price falls below minimum
  const marketPrices = {
    'Tomatoes': 12, // Market is 12, but minimum might be 15
  };

  const isDistressSale = activeListings.some(listing => 
    marketPrices[listing.cropName] && marketPrices[listing.cropName] < listing.price
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Farmer Dashboard</h1>
          <p className="mt-1 text-slate-500">Manage your produce, monitor sales, and track local market trends.</p>
        </div>
        <button className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
          <PlusCircle className="w-5 h-5" />
          <span>New Listing</span>
        </button>
      </div>

      {isDistressSale && (
        <AlertBanner 
          type="error" 
          message="🚨 Market Alert: Local Mandi prices for Tomatoes have fallen below your minimum listing price. We are actively routing bulk buyers to your listing to prevent a distress sale."
        />
      )}

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start space-x-4">
          <div className="bg-brand-100 p-3 rounded-lg">
            <Package className="w-6 h-6 text-brand-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Listings</p>
            <p className="text-2xl font-bold text-slate-900">{activeListings.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Views</p>
            <p className="text-2xl font-bold text-slate-900">1,204</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start space-x-4">
          <div className="bg-amber-100 p-3 rounded-lg">
            <DollarSign className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Offers</p>
            <p className="text-2xl font-bold text-slate-900">3</p>
          </div>
        </div>
      </div>

      {/* Active Listings Table */}
      <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Your Produce Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Crop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price/Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {activeListings.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.cropName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.quantity} {item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">₹{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
