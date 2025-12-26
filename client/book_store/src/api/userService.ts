// src/api/authService.ts
import type { User } from '../types/auth';
import type { EditProfileFormState, updatedUserResponse } from '../types/user';
import api from './axios';

const userService = {
    // PUT /auth/users/:id
    update: async (id: number, data: EditProfileFormState): Promise<updatedUserResponse> => {
        const response = await api.put<User>(`/users/${id}`, data);
        return response.data as unknown as updatedUserResponse;
    },
    
};

export default userService;