import { useState } from 'react';
import { Search } from 'lucide-react';
import { books as allBooks, publishers } from '../../types/book';
import { BookCard } from '../../components/BookCard';
import type { Book } from '../../types/book';

interface SearchBooksProps {
  onAddToCart: (book: Book) => void;
}

export function SearchBooks({ onAddToCart }: SearchBooksProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPublisher, setSelectedPublisher] = useState<string>('All');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('All');

  const categories = ['All', 'Science', 'Art', 'Religion', 'History', 'Geography'];
  const authors = ['All', ...Array.from(new Set(allBooks.flatMap((b) => b.authors)))];

  const filteredBooks = allBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery) ||
      book.authors.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesPublisher = selectedPublisher === 'All' || book.publisher === selectedPublisher;
    const matchesAuthor =
      selectedAuthor === 'All' || book.authors.some((author) => author === selectedAuthor);
    return matchesSearch && matchesCategory && matchesPublisher && matchesAuthor;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">Search Books</h1>
        <p className="text-muted-foreground">Browse and search our extensive book collection</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, ISBN, or author..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-border focus:border-primary focus:outline-none transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="category" className="block mb-2">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 bg-white rounded-lg border border-border focus:border-primary focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="author" className="block mb-2">
            Author
          </label>
          <select
            id="author"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="w-full px-4 py-2 bg-white rounded-lg border border-border focus:border-primary focus:outline-none"
          >
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="publisher" className="block mb-2">
            Publisher
          </label>
          <select
            id="publisher"
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
            className="w-full px-4 py-2 bg-white rounded-lg border border-border focus:border-primary focus:outline-none"
          >
            <option value="All">All Publishers</option>
            {publishers.map((pub) => (
              <option key={pub} value={pub}>
                {pub}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
        </p>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onAddToCart={onAddToCart} showDetails={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg">
          <p className="text-muted-foreground">No books found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
