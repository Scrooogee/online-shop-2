import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";
import { RootState } from "../store";

type fetchLoginParams = Record<string, string>

export type UserData =  {
    address: string,
    email: string,
    isAdmin: boolean
    lastName: string
    name: string
    _id: string
}


export type Data = {
    userData: UserData
}




export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params: fetchLoginParams) => {
    const {data} = await axios.post('/auth/login', params);
    console.log(data)
    return data
    
});

export const fetchReg = createAsyncThunk('auth/fetchReg', async (params: fetchLoginParams) => {
    const {data} = await axios.post('/auth/register', params)
    console.log(data)
    return data
   
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const {data} = await axios.get('/auth/me')
    console.log(data)
    return data
});


interface AuthSliceState {
    data: Data | null,
    status: 'loading' | 'succes' | 'error'
}

const initialState: AuthSliceState = {
    data: null,
    status: 'loading'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.status = 'loading';
            state.data = null;
        });

        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'succes'
        });

        builder.addCase(fetchLogin.rejected, (state) => {
            state.status = 'error';
            state.data =null;
        });
        builder.addCase(fetchReg.pending, (state) => {
            state.status = 'loading';
            state.data =null;
        });

        builder.addCase(fetchReg.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'succes'
        });

        builder.addCase(fetchReg.rejected, (state) => {
            state.status = 'error';
            state.data =null;
        });
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.status = 'loading';
            state.data =null;
        });

        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'succes'
        });

        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.status = 'error';
            state.data =null;
        });
    }
})


export default authSlice.reducer

