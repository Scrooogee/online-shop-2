import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pageItem: 1,
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setPage(state, action) {
            state.pageItem = action.payload
        }
    }
});

export const {setPage} = paginationSlice.actions;

export default paginationSlice.reducer