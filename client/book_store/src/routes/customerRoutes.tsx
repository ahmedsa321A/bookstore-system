import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

const SearchBooks = lazy(() => import('../pages/customer/SearchBooks').then(module => ({ default: module.SearchBooks })));
const ShoppingCart = lazy(() => import('../pages/customer/ShoppingCart').then(module => ({ default: module.ShoppingCart })));
const PastOrders = lazy(() => import('../pages/customer/PastOrders').then(module => ({ default: module.PastOrders })));
const EditProfile = lazy(() => import('../pages/customer/EditProfile').then(module => ({ default: module.EditProfile })));
const CustomerLayout = lazy(() => import('../layouts/CustomerLayout').then(module => ({ default: module.CustomerLayout })));
const Checkout = lazy(() => import('../pages/customer/Checkout').then(module => ({ default: module.Checkout })));

export const customerRoutes = {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
        { index: true, element: <Navigate to="search" replace /> },
        { path: 'search', element: <SearchBooks /> },
        { path: 'cart', element: <ShoppingCart /> },
        { path: 'checkout', element: <Checkout /> },
        { path: 'orders', element: <PastOrders /> },
        { path: 'profile', element: <EditProfile /> },
    ],
};
