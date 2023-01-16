import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import axios from "../../axios";
import { CardProps } from "../../components/Card";
import { RootState } from "../store";

type FetchGoodsParams = Record<string, string>


export const fetchGoods = createAsyncThunk('item/fetchItemStatus', async (params: FetchGoodsParams) => {
    const {order, sortBy, category} = params;
    const {data} = await axios.get<CardProps[]>(`/product?${category}${order}=${sortBy}`);
    return data;
});

export const fetchAdminGoods = createAsyncThunk('item/fetchAdminItemStatus', async () => {
    const {data} = await axios.get<CardProps[]>(`/admin`);
    return data;
});

export const fetchDelete = createAsyncThunk('item/fetchDelet', async (params: FetchGoodsParams) => {
    const {data} = await axios.delete<CardProps[]>(`/product/${params}`);
    return data;
});





interface GoodSliceState {
    items: CardProps[],
    categoryItems: string[]
    status: 'loading' | 'succes' | 'error'
}



const initialState: GoodSliceState = {
    items: [],
    categoryItems: [],
    status: 'loading'
}



const goodsSlice = createSlice({
    name: 'item',
    initialState,
    reducers : {
        setItem(state, action: PayloadAction<CardProps[]>) {
            state.items = action.payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchGoods.pending, (state) => {
            state.status = 'loading';
            state.items = [];
        });

        builder.addCase(fetchGoods.fulfilled, (state, action) => {
            state.items = action.payload
            state.categoryItems = action.payload.reduce((acc, item) => acc.includes(item.category) ? acc: acc =`${acc}, ${item.category}`, 'All').split(',');
            // console.log(state.categoryItems)
            state.status = 'succes'
        });

        builder.addCase(fetchGoods.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        });
        builder.addCase(fetchAdminGoods.pending, (state) => {
            state.status = 'loading';
            state.items = [];
        });

        builder.addCase(fetchAdminGoods.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = 'succes'
        });

        builder.addCase(fetchAdminGoods.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        });
        builder.addCase(fetchDelete.pending, (state, action:any) => {
            state.items = state.items.filter((obj) => obj._id !== action.meta.arg)
        });
    }
});

export const selectGood = (state: RootState) => state.goodsSlice;

export const selectCaregoryItems = (state: RootState) => state.goodsSlice.categoryItems;

export const {setItem} = goodsSlice.actions;

export default goodsSlice.reducer