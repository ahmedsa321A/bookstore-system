import { useState } from 'react';
import { Search, Edit, Trash2, Save, X } from 'lucide-react';
import { books as initialBooks } from '../../data/book';

export function ModifyBooks() {
  const [books, setBooks] = useState(initialBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery) ||
      book.authors.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEdit = (book: any) => {
    setEditingId(book.id);
    setEditData({ ...book, authors: book.authors.join(', ') });
  };

  const handleSave = () => {
    setBooks(
      books.map((book) =>
        book.id === editingId
          ? { ...editData, authors: editData.authors.split(',').map((a: string) => a.trim()) }
          : book
      )
    );
    setEditingId(null);
    setEditData(null);
    alert('Book updated successfully!');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter((book) => book.id !== id));
      alert('Book deleted successfully!');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">Modify Books</h1>
        <p className="text-muted-foreground">Search and update existing book information</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ISBN, title, or author..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-border focus:border-primary focus:outline-none transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left">ISBN</th>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Author(s)</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Stock</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-secondary/30">
                  {editingId === book.id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editData.isbn}
                          onChange={(e) => setEditData({ ...editData, isbn: e.target.value })}
                          className="w-full px-2 py-1 bg-input-background rounded border border-border"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editData.title}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                          className="w-full px-2 py-1 bg-input-background rounded border border-border"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editData.authors}
                          onChange={(e) => setEditData({ ...editData, authors: e.target.value })}
                          className="w-full px-2 py-1 bg-input-background rounded border border-border"
                          placeholder="Author 1, Author 2"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={editData.category}
                          onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                          className="w-full px-2 py-1 bg-input-background rounded border border-border"
                        >
                          <option value="Science">Science</option>
                          <option value="Art">Art</option>
                          <option value="Religion">Religion</option>
                          <option value="History">History</option>
                          <option value="Geography">Geography</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min="0"
                          value={editData.stockQuantity}
                          onChange={(e) =>
                            setEditData({ ...editData, stockQuantity: parseInt(e.target.value) })
                          }
                          className="w-24 px-2 py-1 bg-input-background rounded border border-border"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={editData.price}
                          onChange={(e) =>
                            setEditData({ ...editData, price: parseFloat(e.target.value) })
                          }
                          className="w-24 px-2 py-1 bg-input-background rounded border border-border"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-2 text-muted-foreground hover:bg-secondary/30 rounded transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 font-mono text-sm">{book.isbn}</td>
                      <td className="px-6 py-4">{book.title}</td>
                      <td className="px-6 py-4">{book.authors.join(', ')}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-1 bg-secondary rounded text-sm">
                          {book.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={
                            book.stockQuantity < book.thresholdQuantity
                              ? 'text-destructive'
                              : 'text-foreground'
                          }
                        >
                          {book.stockQuantity}
                        </span>
                      </td>
                      <td className="px-6 py-4">${book.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(book)}
                            className="p-2 text-primary hover:bg-primary/10 rounded transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books found matching your search.</p>
        </div>
      )}
    </div>
  );
}
