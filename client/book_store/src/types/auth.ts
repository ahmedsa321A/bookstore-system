
export interface User {
    UserID: number;
    Username: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    Address: string;
    Role: string;
  }
  
  export interface SignupRequest {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
  }
  
  export interface LoginRequest {
    username: string;
    password: string;
  }
  
