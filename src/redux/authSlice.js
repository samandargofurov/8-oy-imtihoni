import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: '',
    date: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        create: (state, action) => {
            state.token = action.payload.token;
            state.date = action.payload.date;
        },
        // save: (state, action) => {
        //     state.name = action.name;
        //     state.des
        // }
    }
})

export const {create, save} = authSlice.actions;
export default authSlice.reducer;