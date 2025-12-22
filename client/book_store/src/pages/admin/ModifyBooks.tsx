import { useState } from 'react';
import { Search, Edit, Trash2, Save, X } from 'lucide-react';
import { books as initialBooks, type Book } from '../../types/book';
import { validateModifyBook } from "../../utils/helper";
import { ConfirmModal } from "../../components/ConfirmModal";
import AlertCard from '../../components/AlertCard';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';


export function ModifyBooks() {
  const [books, setBooks] = useState(initialBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIsbn, setEditingIsbn] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});
  const [alert, setAlert] = useState<{
    variant: 'success' | 'error';
    title?: string;
    message: string;
  } | null>(null);
  const [deleteIsbn, setDeleteIsbn] = useState<string | null>(null);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery) ||
      book.authors.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEdit = (book: Book) => {
    setEditingIsbn(book.isbn);
    setEditData({ ...book, authors: book.authors.join(', ') });
  };

  const handleSave = () => {
    const validationErrors = validateModifyBook(editData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setAlert({
        variant: "error",
        title: "Validation Error",
        message: "Please fix the highlighted fields before saving.",
      });
      return;
    }

    setBooks(
      books.map((book) =>
        book.isbn === editingIsbn
          ? {
            ...editData,
            authors: editData.authors
              .split(",")
              .map((a: string) => a.trim()),
          }
          : book
      )
    );

    setEditingIsbn(null);
    setEditData(null);
    setErrors({});

    setAlert({
      variant: "success",
      title: "Updated",
      message: "Book updated successfully.",
    });
  };


  const handleCancel = () => {
    setEditingIsbn(null);
    setEditData(null);
  };

  const confirmDelete = () => {
    setBooks(books.filter((book) => book.isbn !== deleteIsbn));
    setDeleteIsbn(null);
    setAlert({
      variant: "success",
      title: "Updated",
      message: "Book deleted successfully.",
    });
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
      {alert && (
        <AlertCard
          variant={alert.variant}
          title={alert.title}
          message={alert.message}
          duration={3000}
          onClose={() => setAlert(null)}
        />
      )}
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
                <tr key={book.isbn} className="hover:bg-secondary/30">
                  {editingIsbn === book.isbn ? (
                    <>
                      <td className="px-6 py-4">
                        <FormInput
                          id="isbn"
                          name="isbn"
                          value={editData.isbn}
                          error={errors.isbn}
                          compact
                          onChange={(e) =>
                            setEditData({ ...editData, isbn: e.target.value })
                          }
                        />
                      </td>
                      <td className="px-6 py-4">
                        <FormInput
                          id="title"
                          name="title"
                          value={editData.title}
                          error={errors.title}
                          compact
                          onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                          }
                        />
                      </td>
                      <td className="px-6 py-4">
                        <FormInput
                          id="authors"
                          name="authors"
                          value={editData.authors}
                          error={errors.authors}
                          compact
                          placeholder="Author 1, Author 2"
                          onChange={(e) =>
                            setEditData({ ...editData, authors: e.target.value })
                          }
                        />
                      </td>
                      <td className="px-6 py-4">
                        <FormSelect
                          label=""
                          id="category"
                          name="category"
                          value={editData.category}
                          error={errors.category}
                          compact
                          onChange={(e) =>
                            setEditData({ ...editData, category: e.target.value })
                          }
                          options={[
                            { label: "Science", value: "Science" },
                            { label: "Art", value: "Art" },
                            { label: "Religion", value: "Religion" },
                            { label: "History", value: "History" },
                            { label: "Geography", value: "Geography" },
                          ]}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <FormInput
                          label=""
                          id="stockQuantity"
                          name="stockQuantity"
                          type="number"
                          value={editData.stockQuantity.toString()}
                          error={errors.stockQuantity}
                          compact
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              stockQuantity: Number(e.target.value),
                            })
                          }
                        />
                      </td>
                      <td className="px-6 py-4">
                        <FormInput
                          label=""
                          id="price"
                          name="price"
                          type="number"
                          value={editData.price.toString()}
                          error={errors.price}
                          compact
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              price: Number(e.target.value),
                            })
                          }
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
                            onClick={() => setDeleteIsbn(book.isbn)}
                            className="p-2 text-destructive hover:bg-destructive/10 rounded"
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
      {deleteIsbn && (
        <ConfirmModal
          title="Delete Book"
          description="Are you sure you want to delete this book? This action cannot be undone."
          onCancel={() => setDeleteIsbn(null)}
          onConfirm={confirmDelete}
        />
      )}

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books found matching your search.</p>
        </div>
      )}
    </div>
  );
}
