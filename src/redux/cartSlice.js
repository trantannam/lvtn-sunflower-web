import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        newCart: null
    },
    reducers: {
        update: (state, action) => {
            state.newCart = action.payload;
        }
    }
});

export const { update } = cartSlice.actions;

export default cartSlice.reducer;