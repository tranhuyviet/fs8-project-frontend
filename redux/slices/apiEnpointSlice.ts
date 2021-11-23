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
    },
});

export const { setFilterProductEndpoint } = apiEnpointSlice.actions;
export default apiEnpointSlice.reducer;
