// src/api/authService.ts
import api from './axios';
import type { LoginRequest, SignupRequest, User } from '../types/auth';

const authService = {
    // POST /api/auth/signup
    signup: async (data: SignupRequest): Promise<User> => {
        const response = await api.post<User>('/auth/signup', data);
        return response.data;
    },

    // POST /api/auth/login
    login: async (credentials: LoginRequest): Promise<User> => {
        const response = await api.post<User>('/auth/login', credentials);
        return response.data;
    },

    // POST /api/auth/logout
    logout: async (): Promise<void> => {
        await api.post('/auth/logout', {});
    },
    // GET /api/auth/me
    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>('/users/me');
        return response.data;
    },
};

export default authService;