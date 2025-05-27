import { createSlice } from "@reduxjs/toolkit";

const logInSlice = createSlice({
  name: "isLogin",
  initialState: false,
  reducers: {
    setLogIn: (prevState, action) => {
      return action.payload;
    },
  },
});

export const logInAction = logInSlice.actions;

export default logInSlice;
