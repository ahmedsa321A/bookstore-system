import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Package,
  User,
  Menu,
  X,
  LogOut,
  BookOpen,
} from 'lucide-react';
import { LogoutModal } from '../components/LogoutModal';
import authService from '../api/authService';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';

interface CustomerLayoutProps {
  cartCount: number;
}

export function CustomerLayout({ cartCount }: CustomerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const menuItems = [
    { path: '/customer/search', label: 'Search Books', icon: Search },
    { path: '/customer/cart', label: 'Shopping Cart', icon: ShoppingCart, badge: cartCount },
    { path: '/customer/orders', label: 'Past Orders', icon: Package },
    { path: '/customer/profile', label: 'Edit Profile', icon: User },
  ];

  const handleLogout = () => {
    setLogoutModalOpen(false);
    authService.logout();
    dispatch(logout());
    setTimeout(() => {
      navigate('/');
    }, 1);
  };
  
  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:static lg:translate-x-0 inset-y-0 left-0 z-40 w-64 bg-primary text-white transition-transform duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            <span className="text-xl font-semibold">My Account</span>
          </div>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors relative ${
                  isActive ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute right-3 bg-destructive text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setLogoutModalOpen(true)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg w-full hover:bg-white/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-border p-4 flex items-center justify-between sticky top-0 z-20">
          <h2>My Account</h2>
          <button onClick={() => setSidebarOpen(true)} className="p-2">
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="flex-1 p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      <LogoutModal
        isOpen={logoutModalOpen}
        onConfirm={handleLogout}
        onCancel={() => setLogoutModalOpen(false)}
      />
    </div>
  );
}
