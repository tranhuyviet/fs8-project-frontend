import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IApiEndpoint {
    filterProductEndpoint: string;
    productsEndpoint: string;
}

const initialState: IApiEndpoint = {
    filterProductEndpoint: '',
    productsEndpoint: process.env.NEXTAUTH_URL,
};

const apiEnpointSlice = createSlice({
    name: 'api-endpoint',
    initialState,
    reducers: {
        setFilterProductEndpoint(state, action: PayloadAction<string>) {
            state.filterProductEndpoint = action.payload;
        },
        setProductsEndpoint(state, action: PayloadAction<string>) {
            state.productsEndpoint = action.payload;
        },
    },
});

export const { setFilterProductEndpoint, setProductsEndpoint } =
    apiEnpointSlice.actions;
export default apiEnpointSlice.reducer;
