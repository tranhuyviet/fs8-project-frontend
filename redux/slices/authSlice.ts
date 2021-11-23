import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
    banned: boolean;
    email: string;
    image?: string;
    name: string;
    role: string;
    token: string;
    _id: string;
}

const initialState = {
    user: <IUser>{},
    isLoggedIn: false,
    // banned: false,
    // email: '',
    // image: '',
    // name: '',
    // role: '',
    // token: '',
    // _id: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.user = <IUser>{};
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
