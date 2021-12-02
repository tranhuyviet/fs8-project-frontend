import { configureStore } from '@reduxjs/toolkit';

// import reducers
import apiEnpointReducer from './slices/apiEnpointSlice';
import authReducer from './slices/authSlice';
import confirmDialogReducer from './slices/confirmDialogSlice';
import optionsReducer from './slices/optionsSlice';
import productsReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        apiEndpoint: apiEnpointReducer,
        auth: authReducer,
        confirm: confirmDialogReducer,
        options: optionsReducer,
        products: productsReducer,
        cart: cartReducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
