import React from 'react';
import { AlertTriangle } from 'lucide-react';

const AlertBanner = ({ message, type = 'warning' }) => {
  if (!message) return null;

  const styles = {
    warning: 'bg-amber-100 text-amber-800 border-amber-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  };

  return (
    <div className={`flex items-center p-4 mb-4 border rounded-lg shadow-sm ${styles[type]}`}>
      <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default AlertBanner;
