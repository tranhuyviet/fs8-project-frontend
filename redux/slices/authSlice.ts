import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
    banned: boolean;
    email: string;
    image?: string;
    name: string;
    role: string;
    token: string;
    _id: string;
    createdAt: string;
}

const initialState = {
    user: <IUser>{},
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
