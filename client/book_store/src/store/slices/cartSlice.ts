// store/slices/cartSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../../types/book';
import type { CartItem } from '../../types/cart';
import { loadCart, saveCart } from '../../utils/helper';

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: loadCart(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Book>) => {
            const item = state.items.find(
                (i) => i.id === action.payload.id
            );
            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            saveCart(state.items);
        },

        updateQuantity: (
            state,
            action: PayloadAction<{ bookId: string; quantity: number }>
        ) => {
            const item = state.items.find(
                (i) => i.id === action.payload.bookId
            );

            if (item) {
                item.quantity = action.payload.quantity;
            }

            saveCart(state.items);
        },

        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (i) => i.id !== action.payload
            );

            saveCart(state.items);
        },

        clearCart: (state) => {
            state.items = [];
            saveCart([]);
        },
    },
});

export const {
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
