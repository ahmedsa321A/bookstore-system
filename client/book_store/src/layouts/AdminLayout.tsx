import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  BookPlus,
  Edit,
  FileText,
  ShoppingBag,
  Menu,
  X,
  LogOut,
  BookOpen,
} from 'lucide-react';
import { LogoutModal } from '../components/LogoutModal';
import authService from '../api/authService';
import { logout } from '../store/slices/authSlice';
import { clearCart } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const menuItems = [
    { path: '/admin/add-book', label: 'Add New Book', icon: BookPlus },
    { path: '/admin/modify-books', label: 'Modify Books', icon: Edit },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { path: '/admin/reports', label: 'Reports', icon: FileText },
  ];

  const handleLogout = () => {
    setLogoutModalOpen(false);
    authService.logout();
    dispatch(logout());
    dispatch(clearCart());
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
            <span className="text-xl font-semibold">Admin Panel</span>
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
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
          <h2>Admin Panel</h2>
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

