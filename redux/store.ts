import { configureStore } from '@reduxjs/toolkit';

// import reducers
import apiEnpointReducer from './slices/apiEnpointSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        apiEndpoint: apiEnpointReducer,
        auth: authReducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
