import { Navigate } from 'react-router-dom';

import { LandingPage } from '../pages/LandingPage';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { Unauthorized } from '../pages/Unauthorized';

export const publicRoutes = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/unauthorized', element: <Unauthorized /> },
  { path: '*', element: <Navigate to="/" replace /> },
];
