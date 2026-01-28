import { Search } from 'lucide-react';
import { BookCard } from '../../components/BookCard';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import FormSelect from '../../components/FormSelect';
import Loading from '../../components/Loading';
import { useBookSearch } from '../../hooks/useBookSearch';

export function SearchBooks() {
  const dispatch = useAppDispatch();

  const {
    searchQuery,
    selectedCategory,
    selectedPublisher,
    selectedAuthor,
    currentPage,
    books,
    totalPages,
    totalResults,
    publishersList,
    authorsList,
    isLoading,
    error,
    setSearchQuery,
    setSelectedCategory,
    setSelectedPublisher,
    setSelectedAuthor,
    setCurrentPage
  } = useBookSearch();

  const categories = ['All', 'Science', 'Art', 'Religion', 'History', 'Geography'];

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
          options={[
            { label: "All Authors", value: "All" },
            ...authorsList.map((author) => ({
              label: author.name,
              value: author.name,
            })),
          ]}
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
                const rangeSize = 1;
                const pages = new Set<number>();

                for (let i = currentPage - rangeSize; i <= currentPage + rangeSize; i++) {
                  if (i > 0 && i <= totalPages) {
                    pages.add(i);
                  }
                }

                if (totalPages > 1) pages.add(totalPages - 1);
                pages.add(totalPages);
                pages.add(1);

                const sortedPages = Array.from(pages)
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
