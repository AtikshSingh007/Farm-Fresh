import React from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

/**
 * AlertBanner — displays contextual alert messages.
 * @param {string}  message — text to display
 * @param {'warning'|'error'|'info'|'success'} type — visual style
 */
const AlertBanner = ({ message, type = 'warning' }) => {
  if (!message) return null;

  const config = {
    warning: {
      wrapper: 'bg-amber-50  border-amber-300  text-amber-800',
      icon:    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />,
    },
    error: {
      wrapper: 'bg-red-50    border-red-300    text-red-800',
      icon:    <XCircle      className="w-4 h-4 text-red-500   flex-shrink-0 mt-0.5" />,
    },
    info: {
      wrapper: 'bg-blue-50   border-blue-300   text-blue-800',
      icon:    <Info         className="w-4 h-4 text-blue-500  flex-shrink-0 mt-0.5" />,
    },
    success: {
      wrapper: 'bg-emerald-50 border-emerald-300 text-emerald-800',
      icon:    <CheckCircle  className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />,
    },
  };

  const { wrapper, icon } = config[type] ?? config.warning;

  return (
    <div className={`flex items-start gap-3 px-4 py-3 mb-4 border rounded-lg text-sm font-medium ${wrapper}`} role="alert">
      {icon}
      <p>{message}</p>
    </div>
  );
};

export default AlertBanner;
