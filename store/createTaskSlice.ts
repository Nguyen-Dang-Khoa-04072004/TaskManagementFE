import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    priority: "HIGH"
}


const createTaskSlice = createSlice({
    name:"filterSlice",
    initialState,
    reducers:{
        setName: (state, action) => {
            state.name = action.payload
        },
        setPriority: (state, action) => {
            state.priority = action.payload
        },
    }
})

export const {setName, setPriority } = createTaskSlice.actions


export default createTaskSlice.reducer