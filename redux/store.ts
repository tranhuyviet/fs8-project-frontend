import { configureStore } from '@reduxjs/toolkit';

// import reducers
import apiEnpointReducer from './slices/apiEnpointSlice';
import authReducer from './slices/authSlice';
import confirmDialogReducer from './slices/confirmDialogSlice';
import optionsReducer from './slices/optionsSlice';
import productsReducer from './slices/productSlice';

export const store = configureStore({
    reducer: {
        apiEndpoint: apiEnpointReducer,
        auth: authReducer,
        confirm: confirmDialogReducer,
        options: optionsReducer,
        products: productsReducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
