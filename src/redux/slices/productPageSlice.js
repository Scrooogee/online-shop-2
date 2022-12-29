import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfuctPage = createAsyncThunk('product/fetchProductPageStatus', async ({id}) => {
    const {data} = await axios.get(`https://637c4a6372f3ce38ea9edc01.mockapi.io/Items/${id}`);
    return data
})

const initialState = {
    product: {},
    status: 'loading'
}

const productPageSlice = createSlice({
    name: 'product',
    initialState,
    reducers : {
        setProduct(state, action) {
            state.product = action.payload
        }
    },
    extraReducers: {
        [fetchProfuctPage.pending]: (state) => {
            state.status = 'loading';
            state.product = {};
        },
        [fetchProfuctPage.fulfilled]: (state, action) => {
            state.product = action.payload
            state.status = 'succes'
        },
        [fetchProfuctPage.rejected]: (state, action) => {
            state.status = 'error';
            state.items = {};
        }
    }
});

export const productPage = state => state.productPageSlice;

export const {setProduct} = productPageSlice.actions;
export default productPageSlice.reducer