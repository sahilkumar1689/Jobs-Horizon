import { createSlice } from "@reduxjs/toolkit";

const candidateProfileSlice = createSlice({
  name: "candidateProfile",
  initialState: {},
  reducers: {
    setCandidateProfile: (state, action) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const setProfileAction = candidateProfileSlice.actions;
export default candidateProfileSlice;
