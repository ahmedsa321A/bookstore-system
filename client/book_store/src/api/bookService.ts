
import api from './axios';
import type { Book } from '../types/book';
import { AxiosError } from 'axios';

export interface BookSearchFilters {
    isbn?: string;
    title?: string;
    category?: string;
    author?: string;
    publisher?: string;
}

// Define DTOs (Data Transfer Objects) mirroring backend JSON
export interface BookResponseDTO {
    isbn: string;
    title: string;
    authors: string | string[]; 
    publisher_name?: string;
    publisher_id?: number;
    publication_year: number;
    price: string | number;
    category: 'Science' | 'Art' | 'Religion' | 'History' | 'Geography';
    stock: number;
    threshold: number;
    image?: string;
    featured?: boolean;
}

export interface ApiBookSearchResponse {
    books: BookResponseDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface AddBookRequest {
    isbn: string;
    title: string;
    category: string;
    price: number;
    stock: number;
    threshold: number;
    publisher: string;
    authors: string[];
    publicationYear: number;
    image?: string;
}

export interface AddPublisherRequest {
    name: string;
    address?: string;
    phone?: string;
}

export interface PublisherDTO {
    publisher_id: number;
    name: string;
}

export interface AuthorDTO {
    author_id: number;
    name: string;
}

const transformBook = (data: BookResponseDTO): Book => {
    return {
        isbn: data.isbn,
        title: data.title,
        authors: Array.isArray(data.authors)
            ? data.authors
            : (data.authors || '').split(',').map(s => s.trim()).filter(Boolean),
        publisher: data.publisher_name || 'Unknown Publisher',
        publisher_name: data.publisher_name,
        publisher_id: data.publisher_id,
        publicationYear: data.publication_year,
        price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
        category: data.category,
        stockQuantity: data.stock,
        thresholdQuantity: data.threshold,
        image: data.image || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1080&auto=format&fit=crop',
        featured: data.featured || false,
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
            const response = await api.get<ApiBookSearchResponse | BookResponseDTO[]>(`/books/search?${params.toString()}`);

            // Handle Standard Pagination Response
            if ('books' in response.data && Array.isArray(response.data.books)) {
                return {
                    books: response.data.books.map(transformBook),
                    total: response.data.total,
                    page: response.data.page,
                    limit: response.data.limit,
                    totalPages: response.data.totalPages
                };
            }

            // Handle Array Response (Legacy fallback)
            if (Array.isArray(response.data)) {
                return {
                    books: response.data.map(transformBook),
                    total: response.data.length,
                    page: 1,
                    limit: response.data.length,
                    totalPages: 1
                };
            }

            // Default Empty
            return { books: [], total: 0, page: 1, limit: 10, totalPages: 1 };

        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 404) {
                return { books: [], total: 0, page: 1, limit: 10, totalPages: 1 };
            }
            throw error;
        }
    },

    // POST /api/books/add
    addBook: async (data: AddBookRequest): Promise<void> => {
        await api.post('/books/add', data);
    },

    // PUT /api/books/update/:isbn
    updateBook: async (isbn: string, data: Partial<AddBookRequest>): Promise<void> => {
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
    addPublisher: async (data: AddPublisherRequest): Promise<void> => {
        await api.post('/books/addPublisher', data);
    },

    // GET /api/books/publishers
    getPublishers: async (): Promise<PublisherDTO[]> => {
        const response = await api.get<PublisherDTO[]>('/books/publishers');
        return response.data;
    },

    // GET /api/books/authors
    getAuthors: async (): Promise<AuthorDTO[]> => {
        const response = await api.get<AuthorDTO[]>('/books/authors');
        return response.data;
    },

};

export default bookService;
