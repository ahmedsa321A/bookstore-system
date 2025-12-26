import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import bookService from '../../api/bookService';
import Loading from '../../components/Loading';
import AlertCard from '../../components/AlertCard';

export function BookDetails() {
  const { isbn } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState<{
    variant: 'success' | 'error';
    title?: string;
    message: string;
  } | null>(null);

  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ['book', isbn],
    queryFn: () => bookService.searchBooks({ isbn }),
    enabled: !!isbn,
  });

  const bookData = books[0];

  if (isLoading) return <Loading size="large" color="#4A90E2" />;

  if (error || !bookData) {
    return (
      <div className="text-center py-16">
        <h2 className="mb-4">{error ? "Error loading book" : "Book Not Found"}</h2>
        <button
          onClick={() => navigate('/customer/search')}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Back to Books
        </button>
      </div>
    );
  }

  const book = bookData;
  const inStock = book.stockQuantity > 0;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {alert && (
        <div className="mb-4">
          <AlertCard
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
          {/* Book Image */}
          <div>
            <div className="aspect-3/4 rounded-lg overflow-hidden bg-secondary/20">
              <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Book Details */}
          <div>
            <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-lg mb-4">
              {book.category}
            </span>
            <h1 className="mb-4">{book.title}</h1>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-muted-foreground">Author(s)</p>
                <p>{book.authors.join(', ')}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Publisher</p>
                <p>{book.publisher}</p>
              </div>

              <div>
                <p className="text-muted-foreground">ISBN</p>
                <p className="font-mono">{book.isbn}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Publication Year</p>
                <p>{book.publicationYear}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Category</p>
                <p>{book.category}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Price</p>
                <h2 className="text-primary">${book.price.toFixed(2)}</h2>
              </div>

              <div className="flex items-center gap-2">
                {inStock ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-green-600">In Stock ({book.stockQuantity} available)</p>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-destructive" />
                    <p className="text-destructive">Out of Stock</p>
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-6 mb-6">
              <h3 className="mb-3">Description</h3>
              <p className="text-muted-foreground">{book.description}</p>
            </div>

            {inStock && (
              <button
                onClick={() => {
                  dispatch(addToCart(book));
                  setAlert({
                    variant: 'success',
                    title: 'Added to Cart',
                    message: `${book.title} has been added to your shopping cart.`
                  });
                }}
                className="w-full py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
