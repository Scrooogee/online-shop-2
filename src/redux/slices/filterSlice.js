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
        setFilters(state, action) {
            state.categoryId = action.payload;
        }
    },

})


export const { setCategorieId, setSort, setPage } = filterSlice.actions

export default filterSlice.reducer