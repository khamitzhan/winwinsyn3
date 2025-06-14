import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireSubscription?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requireAdmin = false, 
  requireSubscription = false 
}: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !user?.isAdmin) {
    return <Navigate to="/\" replace />;
  }

  if (requireSubscription && !user?.isSubscribed) {
    return <Navigate to="/deposit" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;