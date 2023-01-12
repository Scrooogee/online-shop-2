import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { CardProps } from "../../components/Card";
import { RootState } from "../store";

type fetchProfuccParams = Record<string, string>

export const fetchProfuctPage = createAsyncThunk('product/fetchProductPageStatus', async (params: fetchProfuccParams) => {
    const {id} = params;
    const {data} = await axios.get<CardProps>(`/product/${id}`);
    return data;
})

interface ProductPageSlice {
    product: CardProps,
    status: 'loading' | 'succes' | 'error'
}

const initialState: ProductPageSlice = {
    product: {
        _id: '',
        title: '',
        imageUrl: '',
        price: 0,
        sizes: []
    },
    status: 'loading'
}

const productPageSlice = createSlice({
    name: 'product',
    initialState,
    reducers : {
        setProduct(state, action: PayloadAction<CardProps>) {
            state.product = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfuctPage.pending, (state) => {
            state.status = 'loading';
            state.product = {...Object(0)};
        });

        builder.addCase(fetchProfuctPage.fulfilled, (state, action: PayloadAction<CardProps>) => {
            state.product = action.payload
            state.status = 'succes'
        });

        builder.addCase(fetchProfuctPage.rejected, (state) => {
            state.status = 'error';
            state.product = {...Object(0)};
        });
    }
});

export const productPage = (state : RootState) => state.productPageSlice;

export const {setProduct} = productPageSlice.actions;
export default productPageSlice.reducer 