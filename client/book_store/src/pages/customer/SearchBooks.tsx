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

const ITEMS_PER_PAGE = 6;

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

  // Fetch authors
  const { data: authorsList = [] } = useQuery({
    queryKey: ['authors'],
    queryFn: bookService.getAuthors,
  });

  // Debounce search query to avoid too many requests
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch books from backend
  const { data, isLoading, error } = useQuery({
    queryKey: ['books', debouncedSearchQuery, selectedCategory, selectedPublisher, selectedAuthor, currentPage],
    queryFn: () => {
      // If query contains letters, treat as title. If it's only numbers/dashes, treat as ISBN.
      const isIsbn = /^[0-9-]+$/.test(debouncedSearchQuery);

      return bookService.searchBooks({
        title: !isIsbn ? debouncedSearchQuery : undefined,
        isbn: isIsbn ? debouncedSearchQuery : undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        publisher: selectedPublisher !== 'All' ? selectedPublisher : undefined,
        author: selectedAuthor !== 'All' ? selectedAuthor : undefined,
        page: currentPage,
        limit: ITEMS_PER_PAGE
      });
    },
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new page
  });

  const books = data?.books || [];
  const totalPages = data?.totalPages || 1;
  const totalResults = data?.total || 0;



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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
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
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
        />
        <FormSelect
          label="Author"
          id="author"
          name="author"
          bgColor='bg-white'
          value={selectedAuthor}
          options={[
            { label: "All Authors", value: "All" },
            ...authorsList.map((author) => ({
              label: author.name,
              value: author.name,
            })),
          ]}
          onChange={(e) => {
            setSelectedAuthor(e.target.value);
            setCurrentPage(1);
          }}
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
          onChange={(e) => {
            setSelectedPublisher(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>


      {/* Results Count */}
      <p className="mb-4 text-muted-foreground">
        {totalResults} result{totalResults !== 1 && 's'}
      </p>

      {/* Books */}
      {books.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {books.map((book) => (
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

              {(() => {
                // Generate page numbers: First 3, Last 2, and Current
                const pageSet = new Set([
                  1, 2, 3,
                  totalPages - 1, totalPages,
                  currentPage
                ]);

                const sortedPages = Array.from(pageSet)
                  .filter((p) => p >= 1 && p <= totalPages)
                  .sort((a, b) => a - b);

                const paginationItems: (number | string)[] = [];
                let previousPage: number | null = null;

                for (const page of sortedPages) {
                  if (previousPage !== null && page - previousPage > 1) {
                    paginationItems.push('...');
                  }
                  paginationItems.push(page);
                  previousPage = page;
                }

                return paginationItems.map((item, index) => (
                  <button
                    key={`${item}-${index}`}
                    onClick={() => typeof item === 'number' && setCurrentPage(item)}
                    disabled={typeof item !== 'number'}
                    className={`px-3 py-1 rounded border ${item === currentPage
                      ? 'bg-primary text-white'
                      : typeof item === 'number'
                        ? 'bg-white hover:bg-gray-50'
                        : 'bg-transparent border-none cursor-default'
                      }`}
                  >
                    {item}
                  </button>
                ));
              })()}

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
