import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

const LandingPage = lazy(() => import('../pages/LandingPage').then(module => ({ default: module.LandingPage })));
const Login = lazy(() => import('../pages/Login').then(module => ({ default: module.Login })));
const Signup = lazy(() => import('../pages/Signup').then(module => ({ default: module.Signup })));
const Unauthorized = lazy(() => import('../pages/Unauthorized').then(module => ({ default: module.Unauthorized })));

export const publicRoutes = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/unauthorized', element: <Unauthorized /> },
  { path: '*', element: <Navigate to="/" replace /> },
];
