import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import cartSlice from './slices/cartSlice'
import goodsSlice from './slices/goodsSlice'
import productPageSlice from './slices/productPageSlice'
import authSlice from './slices/authSlice'
import AddPopUpSlice from './slices/AddSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    goodsSlice,
    productPageSlice,
    authSlice,
    AddPopUpSlice
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;