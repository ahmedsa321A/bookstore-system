import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { books as allBooks, publishers } from '../../types/book';
import { BookCard } from '../../components/BookCard';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';

const ITEMS_PER_PAGE = 4;

export function SearchBooks() {
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPublisher, setSelectedPublisher] = useState('All');
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['All', 'Science', 'Art', 'Religion', 'History', 'Geography'];
  const authors = ['All', ...Array.from(new Set(allBooks.flatMap((b) => b.authors)))];

  /** ---------------- FILTERING ---------------- */
  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      const q = searchQuery.toLowerCase();

      const matchesSearch =
        book.title.toLowerCase().includes(q) ||
        book.isbn.includes(searchQuery) ||
        book.authors.some((a) => a.toLowerCase().includes(q));

      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      const matchesPublisher = selectedPublisher === 'All' || book.publisher === selectedPublisher;
      const matchesAuthor =
        selectedAuthor === 'All' || book.authors.includes(selectedAuthor);

      return matchesSearch && matchesCategory && matchesPublisher && matchesAuthor;
    });
  }, [searchQuery, selectedCategory, selectedPublisher, selectedAuthor]);

  /** Reset page when filters change */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedPublisher, selectedAuthor]);

  /** ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-6">
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
            placeholder="Search by title, ISBN, or author..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-border focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-white rounded-lg border border-border"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          className="px-4 py-2 bg-white rounded-lg border border-border"
        >
          {authors.map((author) => (
            <option key={author}>{author}</option>
          ))}
        </select>

        <select
          value={selectedPublisher}
          onChange={(e) => setSelectedPublisher(e.target.value)}
          className="px-4 py-2 bg-white rounded-lg border border-border"
        >
          <option value="All">All Publishers</option>
          {publishers.map((pub) => (
            <option key={pub}>{pub}</option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <p className="mb-4 text-muted-foreground">
        {filteredBooks.length} result{filteredBooks.length !== 1 && 's'}
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
                  className={`px-3 py-1 rounded border ${
                    currentPage === i + 1
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
          <p className="text-muted-foreground">No books found.</p>
        </div>
      )}
    </div>
  );
}
