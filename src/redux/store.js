import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import cartSlice from './slices/cartSlice'
import goodsSlice from './slices/goodsSlice'
import productPageSlice from './slices/productPageSlice'

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    goodsSlice,
    productPageSlice
  },
})