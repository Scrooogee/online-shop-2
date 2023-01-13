import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { CartItemsProps } from "../../components/CartItem";
import { RootState } from "../store";
import { UserData } from "./authSlice";

// type FetchGoodsParams = {
//     _id: string;
//     title: string;
//     size: number;
//     category: string;
//     imageUrl: string;
//     count: number;
//     price: number;
//     user: UserData;
// }

type FetchGoodsParams = Record<string, string>

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

export const fetchSendOrder = createAsyncThunk('item/fetchSendOrder', async (params: FetchGoodsParams) => {
    const {data} = await axios.post<CartItemsProps>(`/orders` ,params);
    return data;
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItems(state, action: PayloadAction<CartItemsProps>) {
            const findItem = state.cartItems.find(obj => obj._id === action.payload._id && obj.size === action.payload.size)

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
            const findItem = state.cartItems.find(obj => obj._id === action.payload._id && obj.size === action.payload.size)

            if (findItem) {
                findItem.count--
            }

            tottalPriceState(state)
        },
        removeCartItems(state, action: PayloadAction<CartItemsProps>) {
            const findItem = state.cartItems.find(obj => obj._id === action.payload._id && obj.size === action.payload.size)

            if (findItem) {
                state.cartItems = state.cartItems.filter(obj => obj !== findItem)
            }

            tottalPriceState(state)
        },
        clearItems(state) {
            state.cartItems = [];
            state.totalPrice = 0;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchSendOrder.pending, state => {

        })
    },
});

export const selectCart = (state: RootState) => state.cartSlice;

export const {addCartItems, removeCartItems, clearItems, minusCartItem} = cartSlice.actions;

export default cartSlice.reducer