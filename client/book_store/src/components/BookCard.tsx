import type { Book } from '../data/books';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
  showDetails?: boolean;
}

export function BookCard({ book, onAddToCart, showDetails = true }: BookCardProps) {
  const inStock = book.stockQuantity > 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-3/4 overflow-hidden bg-secondary/20 relative">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-destructive text-white px-4 py-2 rounded-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm mb-2">
          {book.category}
        </span>
        <h3 className="mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-muted-foreground mb-2">{book.authors.join(', ')}</p>
        <p className="text-sm text-muted-foreground mb-3">{book.publisher}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-primary">${book.price.toFixed(2)}</span>
          <div className="flex gap-2">
            {showDetails && (
              <Link
                to={`/book/${book.id}`}
                className="flex items-center gap-1 px-3 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                <Eye className="h-4 w-4" />
              </Link>
            )}
            {onAddToCart && inStock && (
              <button
                onClick={() => onAddToCart(book)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
