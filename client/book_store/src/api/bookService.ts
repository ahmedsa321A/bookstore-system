
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

export interface PaginatedBooks {
    books: Book[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

const bookService = {
    // GET /api/books/search
    searchBooks: async (filters: BookSearchFilters & { page?: number; limit?: number } = {}): Promise<PaginatedBooks> => {
        const params = new URLSearchParams();
        if (filters.isbn) params.append('isbn', filters.isbn);
        if (filters.title) params.append('title', filters.title);
        if (filters.category && filters.category !== 'All Categories') params.append('category', filters.category);
        if (filters.author) params.append('author', filters.author);
        if (filters.publisher) params.append('publisher', filters.publisher);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());

        try {
            const response = await api.get<{ books: any[]; total: number; page: number; limit: number; totalPages: number }>(`/books/search?${params.toString()}`);

            // Handle new backend response format including metadata
            if (response.data && Array.isArray(response.data.books)) {
                return {
                    books: response.data.books.map(transformBook),
                    total: response.data.total,
                    page: response.data.page,
                    limit: response.data.limit,
                    totalPages: response.data.totalPages
                };
            }

            // Fallback for legacy response (if any)
            if (Array.isArray(response.data)) {
                return {
                    books: (response.data as any[]).map(transformBook),
                    total: (response.data as any[]).length,
                    page: 1,
                    limit: (response.data as any[]).length,
                    totalPages: 1
                };
            }

            return { books: [], total: 0, page: 1, limit: 10, totalPages: 1 };

        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return { books: [], total: 0, page: 1, limit: 10, totalPages: 1 };
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
