import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardProps } from "../../components/Card";
import { RootState } from "../store";

type AddStateSlice = {
    state: boolean,
}

const initialState: AddStateSlice =  {
    state: false
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
        }
    }
})

export const AddPopSelect = (state: RootState) => state.AddPopUpSlice

export const {OpenPop, ClosePop} = AddPopUpSlice.actions

export default AddPopUpSlice.reducer
