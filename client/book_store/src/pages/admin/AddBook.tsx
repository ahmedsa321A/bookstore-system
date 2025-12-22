import { useState } from 'react';
import { BookPlus } from 'lucide-react';
import { publishers, type AddBookErrors } from '../../types/book';
import FormInput from '../../components/FormInput';
import AlertCard from '../../components/AlertCard';
import { validateAddBook } from '../../utils/helper';
import FormSelect from '../../components/FormSelect';


export function AddBook() {
  const [errors, setErrors] = useState<AddBookErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    variant: 'success' | 'error';
    title?: string;
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    authors: [''],
    publisher: '',
    publicationYear: new Date().getFullYear(),
    price: '',
    category: '',
    stockQuantity: '',
    thresholdQuantity: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof AddBookErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setIsSubmitting(true);

    const newErrors: AddBookErrors = {};
    validateAddBook({ ...formData, errors: newErrors });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAlert({
        variant: 'error',
        title: 'Validation Error',
        message: 'Please fix the highlighted fields.',
      });
      setIsSubmitting(false);
      return;
    }

    console.log('Submitting book:', formData);

    setAlert({
      variant: 'success',
      title: 'Success',
      message: 'Book added successfully!',
    });

    setFormData({
      isbn: '',
      title: '',
      authors: [''],
      publisher: publishers[0],
      publicationYear: new Date().getFullYear(),
      price: '',
      category: '',
      stockQuantity: '',
      thresholdQuantity: '',
    });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleAuthorChange = (index: number, value: string) => {
    const updatedAuthors = [...formData.authors];
    updatedAuthors[index] = value;
    setFormData((prev) => ({ ...prev, authors: updatedAuthors }));

    if (errors.author) {
      setErrors((prev) => ({ ...prev, author: undefined }));
    }
  };

  const addAuthor = () => {
    setFormData((prev) => ({
      ...prev,
      authors: [...prev.authors, ''],
    }));
  };

  const removeAuthor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index),
    }));
  };


  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BookPlus className="h-6 w-6 text-primary" />
          <h1>Add New Book</h1>
        </div>
        <p className="text-muted-foreground">
          Enter the details to add a new book
        </p>
      </div>

      <div className="max-w-3xl">
        {alert && (
          <div className="mb-6">
            <AlertCard
              variant={alert.variant}
              title={alert.title}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="md:col-span-2">
              <FormInput
                label="ISBN"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                error={errors.isbn}
                onChange={handleChange}
                placeholder="e.g. 978-3-16-148410-0"
              />
            </div>

            <div className="md:col-span-2">
              <FormInput
                label="Title"
                id="title"
                name="title"
                placeholder='e.g. Wireless Mouse'
                value={formData.title}
                error={errors.title}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="block mb-1">Authors</label>

              {formData.authors.map((author, index) => (
                <div key={index} className="flex gap-2">
                  <FormInput
                    label=""
                    id={`author-${index}`}
                    name={`author-${index}`}
                    value={author}
                    onChange={(e) => handleAuthorChange(index, e.target.value)}
                    placeholder={
                      index === 0
                        ? "e.g. Robert C. Martin"
                        : "e.g. Co-author name"
                    }
                    error={index === 0 ? errors.author : undefined}
                  />

                  {formData.authors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAuthor(index)}
                      className="px-3 py-2 rounded-lg border hover:bg-secondary text-destructive"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addAuthor}
                className="text-sm text-primary hover:underline mt-1"
              >
                + Add another author
              </button>
            </div>

            <FormSelect
              label="Category"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              error={errors.category}
              options={[
                { label: "Science", value: "Science" },
                { label: "Art", value: "Art" },
                { label: "Religion", value: "Religion" },
                { label: "History", value: "History" },
                { label: "Geography", value: "Geography" },
              ]}
            />

            <FormSelect
              label="Publisher"
              id="publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              error={errors.publisher}
              options={publishers.map((publisher) => ({
                label: publisher,
                value: publisher,
              }))}
            />

            <FormInput
              label="Publication Year"
              id="publicationYear"
              name="publicationYear"
              type="number"
              value={formData.publicationYear.toString()}
              error={errors.publicationYear}
              onChange={handleChange}
            />

            <FormInput
              label="Price ($)"
              id="price"
              name="price"
              type="number"
              value={formData.price}
              placeholder='e.g. 19.99'
              error={errors.price}
              onChange={handleChange}
            />

            <FormInput
              label="Stock Quantity"
              id="stockQuantity"
              name="stockQuantity"
              placeholder='e.g. 100'
              type="number"
              value={formData.stockQuantity}
              error={errors.stockQuantity}
              onChange={handleChange}
            />

            <FormInput
              label="Threshold Quantity"
              id="thresholdQuantity"
              name="thresholdQuantity"
              placeholder='e.g. 10'
              type="number"
              value={formData.thresholdQuantity}
              error={errors.thresholdQuantity}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-white rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Adding...' : 'Add Book'}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
