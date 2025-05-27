import { createSlice } from "@reduxjs/toolkit";

const AddedJobsSlice = createSlice({
  name: "addedJobs",
  initialState: [],
  reducers: {
    setAddedJobs: (state, action) => {
      return action.payload;
    },
  },
});

export const addedJobsActions = AddedJobsSlice.actions;
export default AddedJobsSlice;
