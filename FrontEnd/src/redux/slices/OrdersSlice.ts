import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { AddCardProps } from "../../components/AdminPanel/AddGoods";
import { CartItemsProps } from "../../components/CartItem";
import { RootState } from "../store";

type FetchGoodsParams = string | undefined

interface ordersState {
    items: CartItemsProps[],
    status: 'loading' | 'succes' | 'error'
} 

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
    const {data} = await axios.get('/orders');
    return data
});

export const fetchRemoveOrder = createAsyncThunk('item/fetchRemoveOrder', async (params: FetchGoodsParams) => {
    const {data} = await axios.delete<CartItemsProps>(`/orders/${params}`);
    return data;
});

export const fetchUsersOrders = createAsyncThunk('order/fetchOrders', async (params: FetchGoodsParams) => {
    const {data} = await axios.get(`/orders/user/${params}`);
    return data
});



const initialState: ordersState = {
    items: [],
    status: 'loading'
}


const OrdersSlice = createSlice({
    name: 'order',
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder.addCase(fetchOrders.pending, (state) => {
            state.status = 'loading';
            state.items = [];
        });

        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = 'succes'
        });

        builder.addCase(fetchOrders.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        });
        builder.addCase(fetchRemoveOrder.pending, (state, action:any) => {
            state.items = state.items.filter((obj) => obj._id !== action.meta.arg)
        });
    },
})


export const SelectOrders = (state : RootState) => state.OrdersSlice;

export default OrdersSlice.reducer