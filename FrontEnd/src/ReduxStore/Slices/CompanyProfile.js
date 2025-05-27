import { createSlice } from "@reduxjs/toolkit";

const CompanyProfileSlice = createSlice({
  name: "companyProfile",
  initialState: {},
  reducers: {
    setCompanyProfile: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const companyProfileActions = CompanyProfileSlice.actions;
export default CompanyProfileSlice;
