
import api from './axios';

export interface OrderItem {
    isbn: string;
    quantity: number;
}

export interface CheckoutRequest {
    cardNumber: string;
    cartItems: OrderItem[];
}

const orderService = {
    // POST /api/orders/checkout
    checkout: async (data: CheckoutRequest): Promise<string> => {
        const response = await api.post<string>('/orders/checkout', data);
        return response.data;
    },

    // GET /api/orders/getCustomerOrderHistory
    getMyOrders: async (): Promise<any[]> => {
        const response = await api.get<any[]>('/orders/getCustomerOrderHistory');
        return response.data;
    },

    // Admin Methods

    // GET /api/books/publisher/orders
    getAllPublisherOrders: async (): Promise<any[]> => {
        const response = await api.get<any[]>('/books/publisher/orders');
        return response.data;
    },
    // POST /api/books/publisher/order
    placePublisherOrder: async (isbn: string, quantity: number): Promise<string> => {
        const response = await api.post<string>('/books/publisher/order', { isbn, quantity });
        return response.data;
    },

    //PUT /api/books/publisher/order/confirm/:orderId
    confirmPublisherOrder: async (orderId: string): Promise<string> => {
        const response = await api.put<string>(`/books/publisher/order/confirm/${orderId}`);
        return response.data;
    },
    //PUT /api/books/publisher/order/delete/:orderId
    cancelPublisherOrder: async (orderId: string): Promise<string> => {
        const response = await api.put<string>(`/books/publisher/order/cancel/${orderId}`);
        return response.data;
    },

};

export default orderService;
