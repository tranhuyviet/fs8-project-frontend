// category, variant, size store
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICategory {
    _id?: string;
    name: string;
    global?: string;
}

export interface IVariant {
    _id?: string;
    name: string;
    colorHex: string;
    global?: string;
}

export interface ISize {
    _id?: string;
    name: string;
    global?: string;
}

interface IOptions {
    categories: ICategory[];
    variants: IVariant[];
    sizes: ISize[];
}

const initialState: IOptions = {
    categories: [],
    variants: [],
    sizes: [],
};

const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setVariants: (state, action) => {
            state.variants = action.payload;
        },
        setSizes: (state, action) => {
            state.sizes = action.payload;
        },
    },
});

export const { setCategories, setVariants, setSizes } = optionsSlice.actions;
export default optionsSlice.reducer;
