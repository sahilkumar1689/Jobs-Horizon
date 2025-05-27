import { createSlice } from "@reduxjs/toolkit";

const searchDataSlice = createSlice({
  name: "searchData",
  initialState: [],
  reducers: {
    setData: (prevState, action) => {
      return [...action.payload];
    },
  },
});

export const searchDataAction = searchDataSlice.actions;

export default searchDataSlice;
