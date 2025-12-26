
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

    // GET /api/orders/admin/all
    getAllCustomerOrders: async (): Promise<any[]> => { // Using any[] for now to avoid circular dependency or complex type mapping until I fix types/book.ts
        const response = await api.get<any[]>('/orders/admin/all');
        // Transform backend keys to frontend types if needed, or update types. 
        // For now, let's assume we update types later or use loose typing here. 
        // The page usually expects: id, customerName, total, status, date, items...
        return response.data;
    },

    // PUT /api/orders/admin/status/:id
    updateCustomerOrderStatus: async (id: string | number, status: string): Promise<string> => {
        const response = await api.put<string>(`/orders/admin/status/${id}`, { status });
        return response.data;
    },

    // GET /api/orders/admin/low-stock
    getLowStockBooks: async (): Promise<any[]> => {
        const response = await api.get<any[]>('/orders/admin/low-stock');
        return response.data;
    },

    // GET /api/orders/admin/publisher-orders
    getAllPublisherOrders: async (): Promise<any[]> => {
        const response = await api.get<any[]>('/orders/admin/publisher-orders');
        return response.data;
    },

    // POST /api/orders/admin/publisher-order
    placePublisherOrder: async (isbn: string, quantity: number): Promise<string> => {
        const response = await api.post<string>('/orders/admin/publisher-order', { isbn, quantity });
        return response.data;
    },

    // PUT /api/orders/admin/publisher-order/:id/confirm
    confirmPublisherOrder: async (id: string | number): Promise<string> => {
        const response = await api.put<string>(`/orders/admin/publisher-order/${id}/confirm`);
        return response.data; // "Order confirmed and stock updated."
    }
};

export default orderService;
