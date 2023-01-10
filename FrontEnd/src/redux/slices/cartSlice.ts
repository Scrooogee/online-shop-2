import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemsProps } from "../../pages/CartItem";
import { RootState } from "../store";

interface CartSliceState {
    cartItems: CartItemsProps[],
    totalPrice: number,
}

const initialState: CartSliceState = {
    cartItems: [],
    totalPrice: 0,
};

const tottalPriceState = (state : CartSliceState) => {
    state.totalPrice = +state.cartItems.reduce((sum, item) => sum += (item.price * item.count), 0).toFixed(2)
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItems(state, action: PayloadAction<CartItemsProps>) {
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
        minusCartItem(state, action: PayloadAction<CartItemsProps>) {
            const findItem = state.cartItems.find(obj => obj.id === action.payload.id && obj.size === action.payload.size)

            if (findItem) {
                findItem.count--
            }

            tottalPriceState(state)
        },
        removeCartItems(state, action: PayloadAction<CartItemsProps>) {
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

export const selectCart = (state: RootState) => state.cartSlice;

export const {addCartItems, removeCartItems, clearItems, minusCartItem} = cartSlice.actions;

export default cartSlice.reducer