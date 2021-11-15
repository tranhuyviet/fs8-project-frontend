import { configureStore } from '@reduxjs/toolkit';
import apiEnpointReducer from './slices/apiEnpointSlice';

export const store = configureStore({
    reducer: {
        apiEndpoint: apiEnpointReducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';

// import rootReducer from './rootReducer';

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;
