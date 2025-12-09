import { BookCard } from '../components/BookCard';
import { books } from '../data/books';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Science', icon: '🔬' },
  { name: 'Art', icon: '🎨' },
  { name: 'Religion', icon: '📿' },
  { name: 'History', icon: '📜' },
  { name: 'Geography', icon: '🌍' },
];

export function Home() {
  const featuredBooks = books.filter((book) => book.featured);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(33, 84, 130, 0.85), rgba(33, 84, 130, 0.85)), url('https://images.unsplash.com/photo-1566314748563-31d8ce08123b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwbGlicmFyeSUyMHNoZWxmfGVufDF8fHx8MTc2NDk2MzEwMHww&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Discover Your Next Great Read
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-white/90">
              Explore thousands of books across all categories. From science to art, history to
              geography - we have it all.
            </p>
            <Link
              to="/customer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg hover:bg-secondary transition-colors"
            >
              Browse Books
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to="/customer"
                className="bg-white rounded-lg p-6 sm:p-8 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-4xl sm:text-5xl mb-3">{category.icon}</div>
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2>Featured Books</h2>
            <Link
              to="/customer"
              className="text-primary hover:underline flex items-center gap-2"
            >
              View All
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-6" />
          <h2 className="mb-4">Join Our Book Community</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Sign up today and get exclusive access to special offers, book recommendations, and
            more!
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg hover:bg-secondary transition-colors"
          >
            Get Started
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
