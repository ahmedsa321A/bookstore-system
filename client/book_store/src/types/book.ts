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
  publisher_name?: string;
  publisher_id?: number;
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


