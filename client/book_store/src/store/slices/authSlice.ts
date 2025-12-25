import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/auth';
import authService from '../../api/authService';

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const user = await authService.getCurrentUser();
            return user;
        } catch (error) {
            return rejectWithValue(null);
        }
    }
);
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<Partial<User>>) {
            if (state.user) {
                state.user = { ...state.user, ...action.payload } as User;
            } else {
                state.user = action.payload as User;
            }
            state.isAuthenticated = true;
            state.loading = false;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCurrentUser.pending, state => {
                state.loading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<Partial<User>>) => {
                state.user = {
                    ...state.user,
                    ...action.payload,
                } as User;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(fetchCurrentUser.rejected, state => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
            });
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
