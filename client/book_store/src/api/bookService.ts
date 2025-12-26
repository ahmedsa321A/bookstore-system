
import api from './axios';
import type { Book } from '../types/book';

export interface BookSearchFilters {
    isbn?: string;
    title?: string;
    category?: string;
    author?: string;
    publisher?: string;
}

const transformBook = (data: any): Book => {
    return {
        isbn: data.isbn,
        title: data.title,
        authors: Array.isArray(data.authors) ? data.authors : (data.authors || '').split(',').filter(Boolean),
        publisher: data.publisher_name || 'Unknown Publisher',
        publisher_name: data.publisher_name,
        publisher_id: data.publisher_id,
        publicationYear: data.publication_year,
        price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
        category: data.category,
        stockQuantity: data.stock,
        thresholdQuantity: data.threshold,
        image: data.image || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1080&auto=format&fit=crop',
        description: data.description || 'No description available.',
        featured: false, // Default
    };
};

const bookService = {
    // GET /api/books/search
    searchBooks: async (filters: BookSearchFilters = {}): Promise<Book[]> => {
        const params = new URLSearchParams();
        if (filters.isbn) params.append('isbn', filters.isbn);
        if (filters.title) params.append('title', filters.title);
        if (filters.category && filters.category !== 'All Categories') params.append('category', filters.category);
        if (filters.author) params.append('author', filters.author);
        if (filters.publisher) params.append('publisher', filters.publisher);

        try {
            const response = await api.get<any[]>(`/books/search?${params.toString()}`);
            return response.data.map(transformBook);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return [];
            }
            throw error;
        }
    },

    // POST /api/books/add
    addBook: async (data: any): Promise<void> => {
        await api.post('/books/add', data);
    },

    // PUT /api/books/update/:isbn
    updateBook: async (isbn: string, data: any): Promise<void> => {
        await api.put(`/books/update/${isbn}`, data);
    },

    // DELETE /api/books/delete/:isbn
    deleteBook: async (isbn: string): Promise<void> => {
        await api.delete(`/books/delete/${isbn}`);
    },

    // POST /api/books/addAuthor
    addAuthor: async (name: string): Promise<void> => {
        await api.post('/books/addAuthor', { name });
    },

    // POST /api/books/addPublisher
    addPublisher: async (data: { name: string; address?: string; phone?: string }): Promise<void> => {
        await api.post('/books/addPublisher', data);
    },

    // GET /api/books/publishers
    getPublishers: async (): Promise<{ publisher_id: number, name: string }[]> => {
        const response = await api.get('/books/publishers');
        return response.data as { publisher_id: number, name: string }[];
    },

    
};

export default bookService;
