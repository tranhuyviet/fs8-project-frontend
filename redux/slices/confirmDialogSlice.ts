import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IConfirm {
    show?: boolean;
    action?: IAction;
    name: string;
    _id: string;
}

export enum IAction {
    no, // do nothing
    delete = 'DELETE',
    ban = 'BAN',
    unban = 'UNBAN',
}

const initialState = {
    show: false,
    action: IAction.no,
    name: '',
    _id: '',
};

const confirmDialogSlice = createSlice({
    name: 'confirmDialog',
    initialState,
    reducers: {
        openConfirmDialog: (state, action: PayloadAction<IConfirm>) => {
            state.show = true;
            state.action = action.payload.action;
            state.name = action.payload.name;
            state._id = action.payload._id;
        },
        closeConfirmDialog: (state) => {
            state.show = false;
            state.action = IAction.no;
            state.name = '';
            state._id = '';
        },
    },
});

export const { openConfirmDialog, closeConfirmDialog } =
    confirmDialogSlice.actions;
export default confirmDialogSlice.reducer;
