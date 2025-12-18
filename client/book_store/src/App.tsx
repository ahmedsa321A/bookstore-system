import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';

import { fetchCurrentUser } from './store/slices/authSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

import { adminRoutes } from './routes/adminRoutes';
import { customerRoutes } from './routes/customerRoutes';
import { publicRoutes } from './routes/routes';
import { BookDetails } from './pages/customer/BookDetails';

export default function App() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (loading) {
    return <Loading size="large" text="Loading..." color="#4A90E2" />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route) => (
          <Route key={route.path} {...route} />
        ))}

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRole="Admin" />}>
          <Route
            path={adminRoutes.path}
            element={adminRoutes.element}
          >
            {adminRoutes.children.map((child) => (
              <Route key={child.path ?? 'index'} {...child} />
            ))}
          </Route>
        </Route>

        {/* Customer Routes */}
        <Route element={<ProtectedRoute allowedRole="Customer" />}>
          <Route
            path={customerRoutes.path}
            element={customerRoutes.element}
          >
            {customerRoutes.children.map((child) => (
              <Route key={child.path ?? 'index'} {...child} />
            ))}
          </Route>
        </Route>

        {/* Book Details - Outside layouts for flexibility */}
        <Route element={<ProtectedRoute allowedRole="Customer" />}>
          <Route path="/book/:id" element={<div className="min-h-screen bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <BookDetails />
            </div>
          </div>}
          />
        </Route>
        
      </Routes>
    </Router>
  );
}
