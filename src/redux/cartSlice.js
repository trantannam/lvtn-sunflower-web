import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            const { id, product } = action.payload;
            const index = state.products.findIndex((item) => item.productId === id);
            if (index >= 0) {
                if (state.products[index].quantity + product.quantity > 50) {
                    state.products[index].quantity = 50
                } else if (state.products[index].quantity > 50) {
                    return state.products
                } else {
                    state.products[index].quantity = state.products[index].quantity + product.quantity;
                }
            }
            if (index < 0) {
                const newItem = {
                    productId: id,
                   ...product
                }
                state.products.push(newItem);
            }
        },
        quantityProduct: (state, action) => {
            const { id, quantity } = action.payload;
            const index = state.products.findIndex((item) => item.productId === id);
            if (index < 0) return;
            state.products[index].quantity = quantity;
        },
        removeProduct: (state, action) => {
            const { id } = action.payload;
            const index = state.products.findIndex((item) => item.productId === id);
            if (index < 0) return;
            state.products.splice(index, 1);
        },
        updateProduct: (state, action) => {
            state.products = action.payload;
        }
    }
});

const { reducer, actions } = cartSlice;
export const { updateProduct, addProductToCart, quantityProduct, removeProduct } = actions;
export default reducer;
