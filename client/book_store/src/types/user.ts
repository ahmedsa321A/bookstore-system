import type { User } from "./auth";

export const users: User[] = [
  {
    user_id: 1,
    username: 'admin',
    email: 'admin@bookstore.com',
    first_name: 'Admin',
    last_name: 'User',
    phone: '+1 (555) 100-0001',
    address: '100 Admin Lane, New York, NY 10001',
    role: 'ADMIN',
  },
  {
    user_id: 2,
    username: 'john.smith',
    email: 'john.smith@email.com',
    first_name: 'John',
    last_name: 'Smith',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    role: 'CUSTOMER',
  },
  {
    user_id: 3,
    username: 'sarah.johnson',
    email: 'sarah.j@email.com',
    first_name: 'Sarah',
    last_name: 'Johnson',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, Boston, MA 02101',
    role: 'CUSTOMER',
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

export interface EditProfileFormState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  current_password?: string;
  new_password?: string;
  confirm_password?: string;
}

export interface updatedUserResponse {
  message: string;
  user: User;
}