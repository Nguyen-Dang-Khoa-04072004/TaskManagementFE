import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: true,
    tasks: [],
}


const appSlice = createSlice({
    name:"filterSlice",
    initialState,
    reducers:{
        setIsOpen: (state, action) => {
            state.isOpen = action.payload
        },
    }
})

export const {setIsOpen} = appSlice.actions


export default appSlice.reducer