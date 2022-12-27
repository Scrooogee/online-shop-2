import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
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
        }
    },
})


export const { setCategorieId, setSort } = filterSlice.actions

export default filterSlice.reducer