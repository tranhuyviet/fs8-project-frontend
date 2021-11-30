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
        updateProduct: (state, action: PayloadAction<IProduct>) => {
            const product: IProduct = state.products.find(
                (product) => product._id === action.payload._id
            );
            product.name = action.payload.name;
            product.description = action.payload.description;
            product.price = action.payload.price;
            product.discount = action.payload.discount;
            product.images = action.payload.images;
            product.category = action.payload.category;
            product.variants = action.payload.variants;
            product.sizes = action.payload.sizes;
            product.user = action.payload.user;
        },
    },
});

export const { setProducts, addProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;