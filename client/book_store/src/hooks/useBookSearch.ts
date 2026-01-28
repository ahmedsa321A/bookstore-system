import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import bookService from '../api/bookService';
import { useDebounce } from './useDebounce';

const ITEMS_PER_PAGE = 6;

export function useBookSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPublisher, setSelectedPublisher] = useState('All');
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch publishers
  const { data: publishersList = [] } = useQuery({
    queryKey: ['publishers'],
    queryFn: bookService.getPublishers,
  });

  // Fetch authors
  const { data: authorsList = [] } = useQuery({
    queryKey: ['authors'],
    queryFn: bookService.getAuthors,
  });

  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch books
  const { data, isLoading, error } = useQuery({
    queryKey: ['books', debouncedSearchQuery, selectedCategory, selectedPublisher, selectedAuthor, currentPage],
    queryFn: () => {
      const isIsbn = /^[0-9-]+$/.test(debouncedSearchQuery);

      return bookService.searchBooks({
        title: !isIsbn ? debouncedSearchQuery : undefined,
        isbn: isIsbn ? debouncedSearchQuery : undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        publisher: selectedPublisher !== 'All' ? selectedPublisher : undefined,
        author: selectedAuthor !== 'All' ? selectedAuthor : undefined,
        page: currentPage,
        limit: ITEMS_PER_PAGE
      });
    },
    placeholderData: (previousData) => previousData,
  });

  // Handlers
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePublisherChange = (publisher: string) => {
    setSelectedPublisher(publisher);
    setCurrentPage(1);
  };

  const handleAuthorChange = (author: string) => {
    setSelectedAuthor(author);
    setCurrentPage(1);
  };

  return {
    // State
    searchQuery,
    selectedCategory,
    selectedPublisher,
    selectedAuthor,
    currentPage,
    
    // Data
    books: data?.books || [],
    totalPages: data?.totalPages || 1,
    totalResults: data?.total || 0,
    publishersList,
    authorsList,
    
    // Status
    isLoading,
    error,

    // Actions
    setSearchQuery: handleSearchChange, // Wrapping setter to enforce page reset logic if needed, or simply expose handler
    setSelectedCategory: handleCategoryChange,
    setSelectedPublisher: handlePublisherChange,
    setSelectedAuthor: handleAuthorChange,
    setCurrentPage,
  };
}
