import type { User } from "./auth";

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