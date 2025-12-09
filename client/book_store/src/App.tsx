import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AdminLayout } from './layouts/AdminLayout';
import { CustomerLayout } from './layouts/CustomerLayout';
import { AdminDashboardHome } from './pages/admin/AdminDashboardHome';
import { AddBook } from './pages/admin/AddBook';
import { ModifyBooks } from './pages/admin/ModifyBooks';
import { Orders } from './pages/admin/Orders';
import { Reports } from './pages/admin/Reports';
import { SearchBooks } from './pages/customer/SearchBooks';
import { BookDetails } from './pages/customer/BookDetails';
import { ShoppingCart } from './pages/customer/ShoppingCart';
import { Checkout } from './pages/customer/Checkout';
import { PastOrders } from './pages/customer/PastOrders';
import { EditProfile } from './pages/customer/EditProfile';
import type { Book } from './data/books';

interface CartItem extends Book {
  quantity: number;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (book: Book) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === book.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...book, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (bookId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === bookId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (bookId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== bookId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardHome />} />
          <Route path="add-book" element={<AddBook />} />
          <Route path="modify-books" element={<ModifyBooks />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Customer Routes */}
        <Route path="/customer" element={<CustomerLayout cartCount={cartCount} />}>
          <Route index element={<Navigate to="/customer/search" replace />} />
          <Route path="search" element={<SearchBooks onAddToCart={handleAddToCart} />} />
          <Route
            path="cart"
            element={
              <ShoppingCart
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            }
          />
          <Route
            path="checkout"
            element={<Checkout cartItems={cartItems} onClearCart={handleClearCart} />}
          />
          <Route path="orders" element={<PastOrders />} />
          <Route path="profile" element={<EditProfile />} />
        </Route>

        {/* Book Details - Outside layouts for flexibility */}
        <Route
          path="/book/:id"
          element={
            <div className="min-h-screen bg-secondary/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <BookDetails onAddToCart={handleAddToCart} />
              </div>
            </div>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
