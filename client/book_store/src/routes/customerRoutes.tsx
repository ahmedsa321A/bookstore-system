import { Navigate } from 'react-router-dom';
import { SearchBooks } from '../pages/customer/SearchBooks';
import { ShoppingCart } from '../pages/customer/ShoppingCart';
import { PastOrders } from '../pages/customer/PastOrders';
import { EditProfile } from '../pages/customer/EditProfile';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { Checkout } from '../pages/customer/Checkout';

export const customerRoutes = {
    path: '/customer',
    element: <CustomerLayout/>,
    children: [
        { index: true, element: <Navigate to="search" replace /> },
        { path: 'search', element: <SearchBooks /> },
        { path: 'cart', element: <ShoppingCart /> },
        { path: 'checkout', element: <Checkout /> },
        { path: 'orders', element: <PastOrders /> },
        { path: 'profile', element: <EditProfile /> },
    ],
};
