import api from './axios';

export interface SalesReport {
    period?: string;
    total_sales: number;
    date?: string;
}

export interface CustomerSpending {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    total_spent: number;
}

export interface TopBook {
    isbn: string;
    title: string;
    total_copies_sold: number;
}

export interface ReplenishmentStats {
    isbn: string;
    title: string;
    times_ordered: number;
    total_quantity_received: number;
}

const reportsService = {
    // GET /api/admin/sales/last-month
    getSalesLastMonth: async (): Promise<SalesReport> => {
        const response = await api.get<SalesReport>('/admin/sales/last-month');
        return response.data;
    },

    // GET /api/admin/sales/date?date=YYYY-MM-DD
    getSalesByDate: async (date: string): Promise<SalesReport> => {
        const response = await api.get<SalesReport>(`/admin/sales/date?date=${date}`);
        return response.data;
    },

    // GET /api/admin/top-customers
    getTopCustomers: async (): Promise<CustomerSpending[]> => {
        const response = await api.get<CustomerSpending[]>('/admin/top-customers');
        return response.data;
    },

    // GET /api/admin/top-books
    getTopSellingBooks: async (): Promise<TopBook[]> => {
        const response = await api.get<TopBook[]>('/admin/top-books');
        return response.data;
    },

    // GET /api/admin/replenishment/:isbn
    getReplenishmentStats: async (isbn: string): Promise<ReplenishmentStats> => {
        const response = await api.get<ReplenishmentStats>(`/admin/replenishment/${isbn}`);
        return response.data;
    }
};

export default reportsService;
