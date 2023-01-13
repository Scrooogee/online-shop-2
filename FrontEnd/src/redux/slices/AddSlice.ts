import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AddStateSlice = {
    state: boolean,
    id: string
}

const initialState: AddStateSlice =  {
    state: false,
    id: ''
}


export const AddPopUpSlice = createSlice({
    name: 'popUp',
    initialState,
    reducers: {
        OpenPop(state) {
            state.state = true
        },
        ClosePop(state) {
            state.state = false
        },
        AddId(state, action: PayloadAction<string>) {
            state.id = action.payload
            // console.log(action.payload)
        },
        RemoveId(state, ) {
            state.id = ''
        }
    }
})

export const AddPopSelect = (state: RootState) => state.AddPopUpSlice

export const {OpenPop, ClosePop, AddId, RemoveId} = AddPopUpSlice.actions

export default AddPopUpSlice.reducer
