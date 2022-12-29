import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalPrice: 0,
};

const tottalPriceState = (state) => {
    state.totalPrice = state.cartItems.reduce((sum, item) => sum += (item.price * item.count), 0).toFixed(2)
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItems(state, action) {
            const findItem = state.cartItems.find(obj => obj.id === action.payload.id && obj.size === action.payload.size)

            if (findItem) {
                findItem.count++
            } else {
                state.cartItems.push({
                    ...action.payload,
                    count: 1,
                })
            }

            tottalPriceState(state)
        },
        minusCartItem(state, action) {
            const findItem = state.cartItems.find(obj => obj.id === action.payload.id && obj.size === action.payload.size)

            if (findItem) {
                findItem.count--
            }

            tottalPriceState(state)
        },
        removeCartItems(state, action) {
            const findItem = state.cartItems.find(obj => obj.id === action.payload.id && obj.size === action.payload.size)

            if (findItem) {
                state.cartItems = state.cartItems.filter(obj => obj !== findItem)
            }

            tottalPriceState(state)
        },
        clearItems(state) {
            state.cartItems = [];
            state.totalPrice = 0;
        }
    }
});

export const selectCart = state => state.cartSlice;

export const {addCartItems, removeCartItems, clearItems, minusCartItem} = cartSlice.actions;

export default cartSlice.reducer