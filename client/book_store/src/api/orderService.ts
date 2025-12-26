
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
    }
};

export default orderService;
