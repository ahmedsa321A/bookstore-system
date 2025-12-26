import type { Book } from '../types/book';
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
      <div className="p-3">
        <span className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs mb-2">
          {book.category}
        </span>
        <h3 className="mb-1 line-clamp-2 text-sm font-semibold">{book.title}</h3>
        <p className="text-xs text-muted-foreground mb-1">{book.authors?.join(', ') || 'Unknown Author'}</p>
        <p className="text-xs text-muted-foreground mb-2">{book.publisher_name || 'Unknown Publisher'}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-primary font-medium text-sm">${book.price.toFixed(2)}</span>
          <div className="flex gap-2">
            {showDetails && (
              <Link
                to={`/book/${book.isbn}`}
                className="flex items-center gap-1 px-2 py-1.5 border border-primary text-primary rounded-md hover:bg-primary/5 transition-colors"
                title="View Details"
              >
                <Eye className="h-3.5 w-3.5" />
              </Link>
            )}
            {onAddToCart && inStock && (
              <button
                onClick={() => onAddToCart(book)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-xs"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
