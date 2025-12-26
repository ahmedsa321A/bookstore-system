import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { BookCard } from '../../components/BookCard';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import FormSelect from '../../components/FormSelect';
import bookService from '../../api/bookService';
import Loading from '../../components/Loading';
import { useDebounce } from '../../hooks/useDebounce';

const ITEMS_PER_PAGE = 4;

export function SearchBooks() {
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPublisher, setSelectedPublisher] = useState('All');
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['All', 'Science', 'Art', 'Religion', 'History', 'Geography'];

  // Fetch publishers
  const { data: publishersList = [] } = useQuery({
    queryKey: ['publishers'],
    queryFn: bookService.getPublishers,
  });

  // Debounce search query to avoid too many requests
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch books from backend
  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ['books', debouncedSearchQuery, selectedCategory, selectedPublisher, selectedAuthor],
    queryFn: () => {
      // If query contains letters, treat as title. If it's only numbers/dashes, treat as ISBN.
      const isIsbn = /^[0-9-]+$/.test(debouncedSearchQuery);

      return bookService.searchBooks({
        title: !isIsbn ? debouncedSearchQuery : undefined,
        isbn: isIsbn ? debouncedSearchQuery : undefined,  
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        publisher: selectedPublisher !== 'All' ? selectedPublisher : undefined,
        author: selectedAuthor !== 'All' ? selectedAuthor : undefined,
      });
    },
  });


  const authors = ['All', ...Array.from(new Set(books.flatMap((b) => b.authors || [])))];

  /** ---------------- PAGINATION ---------------- */
  // Since backend doesn't paginate, we do it here
  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);

  const paginatedBooks = books.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  console.log(paginatedBooks);
  if (isLoading) return <Loading size="large" color="#4A90E2" />;
  if (error) return <div className="text-center py-16 text-red-500">Error loading books. Please try again.</div>;

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="mb-2">
        <h1 className="mb-1">Search Books</h1>
        <p className="text-muted-foreground">
          Browse and search our extensive book collection
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or ISBN..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-border focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <FormSelect
          label="Category"
          id="category"
          name="category"
          bgColor='bg-white'
          value={selectedCategory}
          options={categories.map((cat) => ({
            label: cat,
            value: cat,
          }))}
          onChange={(e) => setSelectedCategory(e.target.value)}
        />
        <FormSelect
          label="Author"
          id="author"
          name="author"
          bgColor='bg-white'
          value={selectedAuthor}
          options={authors.map((author) => ({
            label: author,
            value: author,
          }))}
          onChange={(e) => setSelectedAuthor(e.target.value)}
        />

        <FormSelect
          label="Publisher"
          id="publisher"
          name="publisher"
          bgColor='bg-white'
          value={selectedPublisher}
          options={[
            { label: "All Publishers", value: "All" },
            ...publishersList.map((pub) => ({
              label: pub.name,
              value: pub.name,
            })),
          ]}
          onChange={(e) => setSelectedPublisher(e.target.value)}
        />
      </div>


      {/* Results Count */}
      <p className="mb-4 text-muted-foreground">
        {books.length} result{books.length !== 1 && 's'}
      </p>

      {/* Books */}
      {paginatedBooks.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedBooks.map((book) => (
              <BookCard
                key={book.isbn}
                book={book}
                showDetails
                onAddToCart={() => dispatch(addToCart(book))}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded border ${currentPage === i + 1
                    ? 'bg-primary text-white'
                    : 'bg-white'
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg">
          <p className="text-muted-foreground">No books found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
