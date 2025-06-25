import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  selectedIndex: 0,
  filterdPriority: "",
};

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    search: (state, action) => {
      state.searchQuery = action.payload;
    },
    filterStatus: (state, action) => {
      state.selectedIndex = action.payload;
    },
    filterPriority: (state, action) => {
      state.filterdPriority = action.payload;
    },
  },
});

export const { search, filterStatus, filterPriority } = filterSlice.actions;

export default filterSlice.reducer;
