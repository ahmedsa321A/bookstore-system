import { useState } from 'react';
import { BookPlus } from 'lucide-react';
import { type AddBookErrors } from '../../types/book';
import FormInput from '../../components/FormInput';
import AlertCard from '../../components/AlertCard';
import { validateAddBook, uploadImageToImgbb } from '../../utils/helper';
import FormSelect from '../../components/FormSelect';
import AddPublisherModal from '../../components/AddPublisherModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import bookService from '../../api/bookService';


export function AddBook() {
  const [errors, setErrors] = useState<AddBookErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [alert, setAlert] = useState<{
    variant: 'success' | 'error';
    title?: string;
    message: string;
  } | null>(null);
  const [isPublisherModalOpen, setIsPublisherModalOpen] = useState(false);

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
    image: '',
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof AddBookErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const { data: publishersList = [] } = useQuery({
    queryKey: ['publishers'],
    queryFn: bookService.getPublishers,
    select: (data) => data.map(p => ({ label: p.name, value: p.publisher_id.toString() }))
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => bookService.addBook(data),
    onSuccess: () => {
      setAlert({
        variant: 'success',
        title: 'Success',
        message: 'Book added successfully!',
      });
      setFormData({
        isbn: '',
        title: '',
        authors: [''],
        publisher: '', // This needs to be publisher_id ideally
        publicationYear: new Date().getFullYear(),
        price: '',
        category: '',
        stockQuantity: '',
        thresholdQuantity: '',
        image: '',
      });
      setErrors({});
      setIsSubmitting(false);
    },
    onError: (err: any) => {
      const errorData = err.response?.data;
      let errorMessage = 'Failed to add book.';

      if (typeof errorData === 'string') {
        errorMessage = errorData;
      } else if (errorData?.errors && Array.isArray(errorData.errors)) {
        errorMessage = errorData.errors.join(' ');
      } else if (errorData?.error) {
        errorMessage = errorData.error;
      }

      setAlert({
        variant: 'error',
        title: 'Error',
        message: errorMessage,
      });
      setIsSubmitting(false);
    }
  });

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

    const formDataToSend = new FormData();
    formDataToSend.append('isbn', formData.isbn.replace(/-/g, ''));
    formDataToSend.append('title', formData.title);
    formDataToSend.append('publication_year', formData.publicationYear.toString());
    formDataToSend.append('price', formData.price);
    formDataToSend.append('stock', formData.stockQuantity);
    formDataToSend.append('threshold', formData.thresholdQuantity);
    formDataToSend.append('publisher_id', formData.publisher);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('image', formData.image);

    formData.authors.forEach((author) => {
      formDataToSend.append('author', author);
    });

    if (pdfFile) {
      formDataToSend.append('pdf', pdfFile);
    }

    addMutation.mutate(formDataToSend);
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



  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImageToImgbb(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: undefined }));
      }
      setAlert({
        variant: 'success',
        title: 'Upload Success',
        message: 'Image uploaded successfully!',
      });
    } catch (error) {
      setAlert({
        variant: 'error',
        title: 'Upload Failed',
        message: 'Failed to upload image. Please try again.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
    }
  };

  return (
    <div>
      {/* Header */}
      < div className="mb-8" >
        <div className="flex items-center gap-2 mb-2">
          <BookPlus className="h-6 w-6 text-primary" />
          <h1>Add New Book</h1>
        </div>
        <p className="text-muted-foreground">
          Enter the details to add a new book
        </p>
      </div >

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
              options={publishersList}
            />

            <div className="flex items-center mt-2 md:col-span-2 md:mt-0 md:-ml-2 text-sm">
              <button
                type="button"
                onClick={() => setIsPublisherModalOpen(true)}
                className="text-primary hover:underline flex items-center gap-1"
              >
                <BookPlus className="h-4 w-4" />
                Add New Publisher
              </button>
            </div>

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
              <label className="block mb-2 text-sm font-medium text-gray-700">Book Cover Image</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary file:text-white
                        hover:file:bg-primary/90"
                />
                {isUploading && <span className="text-sm text-muted-foreground">Uploading...</span>}
              </div>
              {errors.image && <p className="text-sm text-destructive mt-1">{errors.image}</p>}
              {formData.image && (
                <div className="mt-2">
                  <img src={formData.image} alt="Book Preview" className="h-32 w-auto object-cover rounded border" />
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">Book PDF</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-white
                hover:file:bg-primary/90"
              />
              {pdfFile && <p className="text-sm text-green-600 mt-1">Selected: {pdfFile.name}</p>}
            </div>
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

      <AddPublisherModal
        isOpen={isPublisherModalOpen}
        onClose={() => setIsPublisherModalOpen(false)}
        onSuccess={() => {
          setAlert({ variant: 'success', title: 'Success', message: 'Publisher added successfully!' });
          // Ideally we could also select the new publisher, but that requires more state passing or logic.
        }}
      />
    </div >
  );
}
