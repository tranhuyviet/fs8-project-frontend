import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../slices/productSlice';
import { IVariant, ISize } from '../slices/optionsSlice';
import { is } from 'immer/dist/internal';

export interface ICartItem {
    _id: string;
    name: string;
    image: string;
    price: number;
    discount: number;
    quantity: number;
    variant: string;
    size: string;
}

const initialState = {
    cart: <ICartItem[]>[],
    totalItems: 0,
    subTotal: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const isExist = state.cart.find(
                (item) => item._id === action.payload._id
            );
            // if product already exists in cart -> only plus quantity
            if (isExist) {
                isExist.quantity++;
                // state.cart = [...state.cart, isExist];
            } else {
                state.cart = [...state.cart, action.payload];
            }

            let totalItems = 0;
            let subTotal = 0;
            for (let item of state.cart) {
                totalItems += item.quantity;
                subTotal = subTotal + item.price * item.quantity;
            }
            state.totalItems = totalItems;
            state.subTotal = subTotal;
        },
    },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
