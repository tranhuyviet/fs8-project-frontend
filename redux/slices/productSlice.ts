import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IProduct {
    _id?: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    images: string[];
    category: string;
    variants: string[];
    sizes: string[];
    user: string;
    createdAt?: string;
    updateAt?: string;
    global?: string;
}

const initialState = {
    products: <IProduct[]>[],
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
        },
        addProduct: (state, action: PayloadAction<IProduct>) => {
            state.products = [...state.products, action.payload];
        },
    },
});

export const { setProducts, addProduct } = productSlice.actions;
export default productSlice.reducer;
