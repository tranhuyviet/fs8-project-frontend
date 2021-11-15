import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IApiEndpoint {
    apiEnpoint: string;
}

const initialState: IApiEndpoint = {
    apiEnpoint: '',
};

const apiEnpointSlice = createSlice({
    name: 'api-endpoint',
    initialState,
    reducers: {
        changeApiEndpoint(state, action: PayloadAction<string>) {
            state.apiEnpoint = action.payload;
        },
    },
});

export const { changeApiEndpoint } = apiEnpointSlice.actions;
export default apiEnpointSlice.reducer;
