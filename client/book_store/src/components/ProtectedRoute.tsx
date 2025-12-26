// src/components/ProtectedRoute.tsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../store/store';
import Loading from './Loading';

interface ProtectedRouteProps {
  allowedRole: 'ADMIN' | 'CUSTOMER';
  redirectTo?: string;
}

const ProtectedRoute = ({ allowedRole, redirectTo = '/login' }: ProtectedRouteProps) => {
    const { user, isAuthenticated,loading} = useSelector((state: RootState) => state.auth);

  // Still fetching user from backend
  if (loading) return <Loading size="large" text="Loading..." color="#4A90E2" />;

  // Not logged in
  if (!isAuthenticated || !user) return <Navigate to={redirectTo} replace />;

  // Logged in but wrong role
  if (user.Role !== allowedRole) return <Navigate to="/unauthorized" replace />;

  // Authorized
  return <Outlet />;
};

export default ProtectedRoute;



