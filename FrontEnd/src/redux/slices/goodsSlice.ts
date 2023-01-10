import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CardProps } from "../../components/Card";
import { RootState } from "../store";

type FetchGoodsParams = Record<string, string>

export const fetchGoods = createAsyncThunk('item/fetchItemStatus', async (params: FetchGoodsParams) => {
    const {order, sortBy, categorie, pages} = params;
    const {data} = await axios.get<CardProps[]>(`https://637c4a6372f3ce38ea9edc01.mockapi.io/Items?${categorie}${pages}&sortBy=${sortBy}&order=${order}`);

    return data;
}) 

interface GoodSliceState {
    items: CardProps[],
    status: 'loading' | 'succes' | 'error'
}

const initialState: GoodSliceState = {
    items: [],
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
            state.status = 'succes'
        });

        builder.addCase(fetchGoods.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        });
    }
});

export const selectGood = (state: RootState) => state.goodsSlice;

export const {setItem} = goodsSlice.actions;
export default goodsSlice.reducer