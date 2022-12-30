import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export type SortType = {
    name: string,
    property: 'rating' | '-rating' | 'price' | '-price' | 'title' | '-title'
}
interface filterSliceState {
    categoryId: number,
    pageItem: number,
    sortType: SortType
}

const initialState: filterSliceState = {
    categoryId: 0,
    pageItem: 1,
    sortType: {
        name: 'popular ↓', 
        property: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategorieId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },

        setSort(state, action: PayloadAction<SortType>) {
            state.sortType = action.payload
        },
        setPage(state, action: PayloadAction<number>) {
            state.pageItem = action.payload;
        },

    },

})


export const selectFilter = (state: RootState) => state.filterSlice;

export const selectCategory = (state: RootState) => state.filterSlice.categoryId;

export const selectSortType = (state: RootState) => state.filterSlice.sortType;

export const selectPage = (state: RootState) => state.filterSlice.pageItem;

export const { setCategorieId, setSort, setPage } = filterSlice.actions

export default filterSlice.reducer