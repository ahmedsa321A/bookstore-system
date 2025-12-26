import { Navigate } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { AddBook } from '../pages/admin/AddBook';
import { ModifyBooks } from '../pages/admin/ModifyBooks';
import { Orders } from '../pages/admin/Orders';
import { Reports } from '../pages/admin/Reports';

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
