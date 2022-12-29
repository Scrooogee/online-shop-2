import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
        setCategorieId(state, action) {
            state.categoryId = action.payload;
        },

        setSort(state, action) {
            state.sortType = action.payload
        },
        setPage(state, action) {
            state.pageItem = action.payload;
        },

    },

})


export const selectFilter = state => state.filterSlice;
export const selectCategory = state => state.filterSlice.categoryId;
export const selectSortType = state => state.filterSlice.sortType;
export const selectPage = state => state.filterSlice.pageItem;

export const { setCategorieId, setSort, setPage } = filterSlice.actions

export default filterSlice.reducer