import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

const AdminLayout = lazy(() => import('../layouts/AdminLayout').then(module => ({ default: module.AdminLayout })));
const AddBook = lazy(() => import('../pages/admin/AddBook').then(module => ({ default: module.AddBook })));
const ModifyBooks = lazy(() => import('../pages/admin/ModifyBooks').then(module => ({ default: module.ModifyBooks })));
const Orders = lazy(() => import('../pages/admin/Orders').then(module => ({ default: module.Orders })));
const Reports = lazy(() => import('../pages/admin/Reports').then(module => ({ default: module.Reports })));

export const adminRoutes = {
    path: '/admin',
    element: <AdminLayout />,
    children: [
        { index: true, element: <Navigate to="add-book" replace /> },
        { path: 'add-book', element: <AddBook /> },
        { path: 'modify-books', element: <ModifyBooks /> },
        { path: 'orders', element: <Orders /> },
        { path: 'reports', element: <Reports /> },
    ],
};
