export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddress: string;
  role: 'admin' | 'customer';
}

export const users: User[] = [
  {
    id: 'ADMIN-001',
    username: 'admin',
    email: 'admin@bookstore.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    phone: '+1 (555) 100-0001',
    shippingAddress: '100 Admin Lane, New York, NY 10001',
    role: 'admin',
  },
  {
    id: 'CUST-001',
    username: 'john.smith',
    email: 'john.smith@email.com',
    password: 'customer123',
    firstName: 'John',
    lastName: 'Smith',
    phone: '+1 (555) 123-4567',
    shippingAddress: '123 Main St, New York, NY 10001',
    role: 'customer',
  },
  {
    id: 'CUST-002',
    username: 'sarah.johnson',
    email: 'sarah.j@email.com',
    password: 'customer123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '+1 (555) 234-5678',
    shippingAddress: '456 Oak Ave, Boston, MA 02101',
    role: 'customer',
  },
];

export interface CustomerProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  currentPassword?: string;
  newPassword?: string;
}
