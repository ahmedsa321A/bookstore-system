import type { User } from "./auth";

export const users: User[] = [
  {
    UserID: 1,
    Username: 'admin',
    Email: 'admin@bookstore.com',
    FirstName: 'Admin',
    LastName: 'User',
    Phone: '+1 (555) 100-0001',
    Address: '100 Admin Lane, New York, NY 10001',
    Role: 'admin',
  },
  {
    UserID: 2,
    Username: 'john.smith',
    Email: 'john.smith@email.com',
    FirstName: 'John',
    LastName: 'Smith',
    Phone: '+1 (555) 123-4567',
    Address: '123 Main St, New York, NY 10001',
    Role: 'customer',
  },
  {
    UserID: 3,
    Username: 'sarah.johnson',
    Email: 'sarah.j@email.com',
    FirstName: 'Sarah',
    LastName: 'Johnson',
    Phone: '+1 (555) 234-5678',
    Address: '456 Oak Ave, Boston, MA 02101',
    Role: 'customer',
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
