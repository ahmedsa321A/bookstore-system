export interface Book {
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
export interface AddBookErrors {
  isbn?: string;
  title?: string;
  author?: string;
  publisher?: string;
  publicationYear?: string;
  price?: string;
  category?: string;
  stockQuantity?: string;
  thresholdQuantity?: string;
  image?: string;
}

export interface ModifyBookErrors {
  isbn?: string;
  title?: string;
  authors?: string;
  category?: string;
  stockQuantity?: string;
  price?: string;
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
        isbn: '978-0-123456-47-2',
        title: 'The Cosmos Explained',
        quantity: 2,
        price: 29.99,
      },
      {
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
        isbn: '978-0-234567-89-1',
        title: 'Modern Art Movements',
        quantity: 1,
        price: 34.99,
      },
      {
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
        isbn: '978-0-567890-12-3',
        title: 'Atlas of the World',
        quantity: 2,
        price: 39.99,
      },
      {
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
