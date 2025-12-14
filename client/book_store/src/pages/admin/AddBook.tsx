import { useState } from 'react';
import { BookPlus, Plus, X } from 'lucide-react';
import { publishers } from '../../types/book';

export function AddBook() {
  const [authors, setAuthors] = useState(['']);
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    publisher: publishers[0],
    publicationYear: new Date().getFullYear(),
    price: '',
    category: 'Science' as const,
    stockQuantity: '',
    thresholdQuantity: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Book added successfully!');
    // Reset form
    setFormData({
      isbn: '',
      title: '',
      publisher: publishers[0],
      publicationYear: new Date().getFullYear(),
      price: '',
      category: 'Science',
      stockQuantity: '',
      thresholdQuantity: '',
    });
    setAuthors(['']);
  };

  const handleAddAuthor = () => {
    setAuthors([...authors, '']);
  };

  const handleRemoveAuthor = (index: number) => {
    if (authors.length > 1) {
      setAuthors(authors.filter((_, i) => i !== index));
    }
  };

  const handleAuthorChange = (index: number, value: string) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BookPlus className="h-6 w-6 text-primary" />
          <h1>Add New Book</h1>
        </div>
        <p className="text-muted-foreground">Enter the details to add a new book to the catalog</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="isbn" className="block mb-2">
                ISBN
              </label>
              <input
                id="isbn"
                name="isbn"
                type="text"
                value={formData.isbn}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
                placeholder="978-0-123456-78-9"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="title" className="block mb-2">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
                placeholder="Enter book title"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label>Authors</label>
                <button
                  type="button"
                  onClick={handleAddAuthor}
                  className="flex items-center gap-1 text-primary hover:underline text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Author
                </button>
              </div>
              <div className="space-y-2">
                {authors.map((author, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      required
                      className="flex-1 px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
                      placeholder={`Author ${index + 1}`}
                    />
                    {authors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAuthor(index)}
                        className="p-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="publisher" className="block mb-2">
                Publisher
              </label>
              <select
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
              >
                {publishers.map((publisher) => (
                  <option key={publisher} value={publisher}>
                    {publisher}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="publicationYear" className="block mb-2">
                Publication Year
              </label>
              <input
                id="publicationYear"
                name="publicationYear"
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.publicationYear}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="price" className="block mb-2">
                Selling Price ($)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="category" className="block mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
              >
                <option value="Science">Science</option>
                <option value="Art">Art</option>
                <option value="Religion">Religion</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
              </select>
            </div>

            <div>
              <label htmlFor="stockQuantity" className="block mb-2">
                Stock Quantity
              </label>
              <input
                id="stockQuantity"
                name="stockQuantity"
                type="number"
                min="0"
                value={formData.stockQuantity}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="thresholdQuantity" className="block mb-2">
                Threshold Quantity
              </label>
              <input
                id="thresholdQuantity"
                name="thresholdQuantity"
                type="number"
                min="0"
                value={formData.thresholdQuantity}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
                placeholder="0"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Alert when stock falls below this quantity
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add Book
            </button>
            <button
              type="button"
              className="px-6 py-3 border border-border rounded-lg hover:bg-secondary/30 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
