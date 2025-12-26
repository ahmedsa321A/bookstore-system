import { BookOpen, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { books } from '../types/book';
import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';

const categories = [
  { name: 'Science', icon: '🔬', color: 'bg-blue-100' },
  { name: 'Art', icon: '🎨', color: 'bg-purple-100' },
  { name: 'Religion', icon: '📿', color: 'bg-amber-100' },
  { name: 'History', icon: '📜', color: 'bg-green-100' },
  { name: 'Geography', icon: '🌍', color: 'bg-cyan-100' },
];

export function LandingPage() {
  const featuredBooks = books.filter((book) => book.featured).slice(0, 6);
  const state = useAppSelector((state) => state.auth); 
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated) {
      const role = state.user?.Role;
      if (role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (role === 'CUSTOMER') {
        navigate('/customer/search');
      }
    }
  }
  , [state]);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(33, 84, 130, 0.9), rgba(33, 84, 130, 0.85)), url('https://images.unsplash.com/photo-1566314748563-31d8ce08123b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwbGlicmFyeSUyMHNoZWxmfGVufDF8fHx8MTc2NDk2MzEwMHww&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <BookOpen className="h-20 w-20" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Welcome to Our Online Bookstore
            </h1>
            <p className="text-xl sm:text-2xl mb-10 text-white/90">
              Discover, explore, and purchase thousands of books across all categories. Your next
              great read awaits!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-lg hover:bg-secondary transition-colors cursor-pointer"
              >
                <LogIn className="h-5 w-5 cursor-pointer" />
                Login
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary transition-colors"
              >
                <UserPlus className="h-5 w-5" />
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-4">Browse by Category</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore our diverse collection of books organized by category
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-lg p-6 sm:p-8 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-4xl sm:text-5xl mb-3">{category.icon}</div>
                <h3>{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Featured Books</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked selections from our collection
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {featuredBooks.map((book) => (
              <div
                key={book.isbn}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-3/4 overflow-hidden bg-secondary/20">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm mb-2">
                    {book.category}
                  </span>
                  <h4 className="mb-1 line-clamp-2">{book.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{book.authors[0]}</p>
                  <p className="text-primary">${book.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Login to Shop
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-8 w-8" />
                <span className="text-xl font-semibold">BookStore</span>
              </div>
              <p className="text-white/80">
                Your trusted partner for quality books and excellent service.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/80">
            <p>&copy; 2025 BookStore Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
