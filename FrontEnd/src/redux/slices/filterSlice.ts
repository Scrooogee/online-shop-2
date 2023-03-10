import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Action } from '@remix-run/router';
import { RootState } from '../store';

export type SortType = {
    name: string,
    property: 'new' | '-old' | 'price' | '-price' 
}
interface filterSliceState {
    categoryId: string,
    pageItem: number,
    sortType: SortType
}

const initialState: filterSliceState = {
    categoryId: 'All',
    pageItem: 1,
    sortType: {
        name: 'new', 
        property: 'new'
    }
}


export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategorieId(state, action: PayloadAction<string>) {
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