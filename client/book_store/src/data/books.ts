export interface Book {
  id: string;
  isbn: string;
  title: string;
  authors: string[];
  publisher: string;
  publicationYear: number;
  price: number;
  category: 'Science' | 'Art' | 'Religion' | 'History' | 'Geography';
  stockQuantity: number;
  thresholdQuantity: number;
  image: string;
  description: string;
  featured?: boolean;
}

export const publishers = [
  'Penguin Random House',
  'HarperCollins',
  'Simon & Schuster',
  'Macmillan Publishers',
  'Hachette Book Group',
  'Oxford University Press',
  'Cambridge University Press',
  'National Geographic',
];

export const books: Book[] = [
  {
    id: '1',
    isbn: '978-0-123456-47-2',
    title: 'The Cosmos Explained',
    authors: ['Dr. Sarah Johnson'],
    publisher: 'Oxford University Press',
    publicationYear: 2023,
    price: 29.99,
    category: 'Science',
    stockQuantity: 45,
    thresholdQuantity: 10,
    image: 'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2NDkwNDg3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A comprehensive guide to understanding the universe and its mysteries.',
    featured: true,
  },
  {
    id: '2',
    isbn: '978-0-234567-89-1',
    title: 'Modern Art Movements',
    authors: ['Emily Carter'],
    publisher: 'Penguin Random House',
    publicationYear: 2022,
    price: 34.99,
    category: 'Art',
    stockQuantity: 32,
    thresholdQuantity: 15,
    image: 'https://images.unsplash.com/photo-1735989647891-b05b35b8caff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzY0OTYzMDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Explore the evolution of art from the 19th century to today.',
    featured: true,
  },
  {
    id: '3',
    isbn: '978-0-345678-90-1',
    title: 'World Religions',
    authors: ['Prof. Michael Chen'],
    publisher: 'HarperCollins',
    publicationYear: 2021,
    price: 24.99,
    category: 'Religion',
    stockQuantity: 28,
    thresholdQuantity: 12,
    image: 'https://images.unsplash.com/photo-1672109010925-ca310021e361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWxpZ2lvbiUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NjQ5NjMwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'An unbiased look at the major religions of the world.',
    featured: true,
  },
  {
    id: '4',
    isbn: '978-0-456789-01-2',
    title: 'Ancient Civilizations',
    authors: ['David Robertson'],
    publisher: 'Cambridge University Press',
    publicationYear: 2023,
    price: 27.99,
    category: 'History',
    stockQuantity: 8,
    thresholdQuantity: 15,
    image: 'https://images.unsplash.com/photo-1611576673788-a954e01092d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2NDk2MzA5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Journey through the great civilizations that shaped our world.',
    featured: true,
  },
  {
    id: '5',
    isbn: '978-0-567890-12-3',
    title: 'Atlas of the World',
    authors: ['National Geographic Team'],
    publisher: 'National Geographic',
    publicationYear: 2024,
    price: 39.99,
    category: 'Geography',
    stockQuantity: 52,
    thresholdQuantity: 20,
    image: 'https://images.unsplash.com/photo-1621414154392-4eb9ee0b6f57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9ncmFwaHklMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzY0OTYzMTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'The most detailed and comprehensive atlas available.',
    featured: true,
  },
  {
    id: '6',
    isbn: '978-0-678901-23-4',
    title: 'Quantum Physics for Beginners',
    authors: ['Dr. Lisa Wang'],
    publisher: 'Oxford University Press',
    publicationYear: 2022,
    price: 32.99,
    category: 'Science',
    stockQuantity: 18,
    thresholdQuantity: 10,
    image: 'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2NDkwNDg3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Simplified explanations of complex quantum mechanics concepts.',
    featured: false,
  },
  {
    id: '7',
    isbn: '978-0-789012-34-5',
    title: 'The Renaissance Masters',
    authors: ['Antonio Rossi', 'Maria Bianchi'],
    publisher: 'Macmillan Publishers',
    publicationYear: 2023,
    price: 44.99,
    category: 'Art',
    stockQuantity: 5,
    thresholdQuantity: 8,
    image: 'https://images.unsplash.com/photo-1735989647891-b05b35b8caff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzY0OTYzMDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A deep dive into the works of Leonardo, Michelangelo, and Raphael.',
    featured: false,
  },
  {
    id: '8',
    isbn: '978-0-890123-45-6',
    title: 'World War II Chronicles',
    authors: ['James Miller'],
    publisher: 'Simon & Schuster',
    publicationYear: 2021,
    price: 28.99,
    category: 'History',
    stockQuantity: 23,
    thresholdQuantity: 12,
    image: 'https://images.unsplash.com/photo-1611576673788-a954e01092d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2NDk2MzA5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A comprehensive account of the most devastating war in history.',
    featured: false,
  },
];

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  shippingAddress: string;
  paymentMethod: string;
}

export interface OrderItem {
  bookId: string;
  isbn: string;
  title: string;
  quantity: number;
  price: number;
}

export const customerOrders: Order[] = [
  {
    id: 'ORD-1001',
    customerId: 'CUST-001',
    customerName: 'John Smith',
    items: [
      {
        bookId: '1',
        isbn: '978-0-123456-47-2',
        title: 'The Cosmos Explained',
        quantity: 2,
        price: 29.99,
      },
      {
        bookId: '3',
        isbn: '978-0-345678-90-1',
        title: 'World Religions',
        quantity: 1,
        price: 24.99,
      },
    ],
    total: 84.97,
    status: 'Pending',
    date: '2025-12-04',
    shippingAddress: '123 Main St, New York, NY 10001',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-1002',
    customerId: 'CUST-002',
    customerName: 'Sarah Johnson',
    items: [
      {
        bookId: '2',
        isbn: '978-0-234567-89-1',
        title: 'Modern Art Movements',
        quantity: 1,
        price: 34.99,
      },
      {
        bookId: '4',
        isbn: '978-0-456789-01-2',
        title: 'Ancient Civilizations',
        quantity: 1,
        price: 27.99,
      },
    ],
    total: 62.98,
    status: 'Shipped',
    date: '2025-12-03',
    shippingAddress: '456 Oak Ave, Boston, MA 02101',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-1003',
    customerId: 'CUST-003',
    customerName: 'Mike Davis',
    items: [
      {
        bookId: '1',
        isbn: '978-0-123456-47-2',
        title: 'The Cosmos Explained',
        quantity: 1,
        price: 29.99,
      },
    ],
    total: 29.99,
    status: 'Delivered',
    date: '2025-12-02',
    shippingAddress: '789 Pine Rd, Chicago, IL 60601',
    paymentMethod: 'PayPal',
  },
  {
    id: 'ORD-1004',
    customerId: 'CUST-004',
    customerName: 'Emily Brown',
    items: [
      {
        bookId: '5',
        isbn: '978-0-567890-12-3',
        title: 'Atlas of the World',
        quantity: 2,
        price: 39.99,
      },
      {
        bookId: '6',
        isbn: '978-0-678901-23-4',
        title: 'Quantum Physics for Beginners',
        quantity: 1,
        price: 32.99,
      },
    ],
    total: 112.97,
    status: 'Processing',
    date: '2025-12-04',
    shippingAddress: '321 Elm St, Los Angeles, CA 90001',
    paymentMethod: 'Credit Card',
  },
];

export interface PublisherOrder {
  id: string;
  bookId: string;
  isbn: string;
  title: string;
  publisher: string;
  currentQuantity: number;
  thresholdQuantity: number;
  orderQuantity: number;
  status: 'Pending' | 'Confirmed' | 'Received';
  date: string;
}

export const publisherOrders: PublisherOrder[] = [
  {
    id: 'PO-2001',
    bookId: '4',
    isbn: '978-0-456789-01-2',
    title: 'Ancient Civilizations',
    publisher: 'Cambridge University Press',
    currentQuantity: 8,
    thresholdQuantity: 15,
    orderQuantity: 20,
    status: 'Pending',
    date: '2025-12-05',
  },
  {
    id: 'PO-2002',
    bookId: '7',
    isbn: '978-0-789012-34-5',
    title: 'The Renaissance Masters',
    publisher: 'Macmillan Publishers',
    currentQuantity: 5,
    thresholdQuantity: 8,
    orderQuantity: 15,
    status: 'Pending',
    date: '2025-12-05',
  },
];
