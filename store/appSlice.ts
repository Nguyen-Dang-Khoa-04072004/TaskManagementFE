import { Task } from "@/app/(tabs)";
import { createSlice } from "@reduxjs/toolkit";


interface initialStateType {
    isOpen: boolean;
    tasks: Task[];
    deleteTaskId: null | number;
    isLoading: boolean,
    isUpdate: boolean
}

const initialState : initialStateType  = {
    isOpen: false,
    tasks : [],
    deleteTaskId: null,
    isLoading: false,
    isUpdate: false
}

const appSlice = createSlice({
    name:"filterSlice",
    initialState,
    reducers:{
        setIsOpen: (state, action) => {
            state.isOpen = action.payload
        },
        setTasks: (state, action) => {
            state.tasks =action.payload
        },
        setDeleteTaskId: (state, action) => {
            state.deleteTaskId = action.payload
        },
        setLoading:(state, action) => {
            state.isLoading = action.payload
        },
        update:(state) => {
            state.isUpdate = !state.isUpdate
        }
    }
})

export const {setIsOpen, setTasks, setDeleteTaskId, setLoading, update} = appSlice.actions


export default appSlice.reducer