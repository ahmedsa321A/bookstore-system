import { createListenerMiddleware } from '@reduxjs/toolkit';
import { saveCart } from '../../utils/helper';
import {
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
} from '../slices/cartSlice';

export const cartListenerMiddleware = createListenerMiddleware();

cartListenerMiddleware.startListening({
    matcher: (action) =>
        addToCart.match(action) ||
        updateQuantity.match(action) ||
        removeItem.match(action) ||
        clearCart.match(action),

    effect: (_, api) => {
        saveCart((api.getState() as { cart: { items: any[] } }).cart.items);
    },
});
