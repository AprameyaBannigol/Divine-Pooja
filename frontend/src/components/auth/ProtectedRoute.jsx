import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import LoadingSkeleton from '../feedback/LoadingSkeleton.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="py-16 max-w-xl mx-auto space-y-4">
        <LoadingSkeleton className="h-10 w-3/4 mx-auto rounded-xl" />
        <LoadingSkeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900">Access Denied</h2>
        <p className="text-sm text-stone-600">Your account role ({user?.role}) does not have permission to view this page.</p>
        <Navigate to="/" replace />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
