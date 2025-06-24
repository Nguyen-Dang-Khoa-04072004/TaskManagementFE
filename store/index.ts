import {configureStore} from '@reduxjs/toolkit'
import filterReducer from "./filterSlice"
import createTaskReducer from "./createTaskSlice"
import appReducer from "./appSlice"
import { useDispatch, useSelector } from 'react-redux'
const store = configureStore({
    reducer:{
        searchAndFilter: filterReducer,
        createTask: createTaskReducer,
        app: appReducer
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export default store