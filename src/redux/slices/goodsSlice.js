import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGoods = createAsyncThunk('item/fetchItemStatus', async (params) => {
    const {order, sortBy, categorie, pages} = params;
    const {data} = await axios.get(`https://637c4a6372f3ce38ea9edc01.mockapi.io/Items?${categorie}${pages}&sortBy=${sortBy}&order=${order}`);
    return data
}) 

const initialState = {
    items: [],
    status: 'loading'
}

const goodsSlice = createSlice({
    name: 'item',
    initialState,
    reducers : {
        setItem(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: {
        [fetchGoods.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchGoods.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'succes'
        },
        [fetchGoods.rejected]: (state, action) => {
            state.status = 'error';
            state.items = [];
        }
    }
});

export const selectGood = state => state.goodsSlice;

export const {setItem} = goodsSlice.actions;
export default goodsSlice.reducer