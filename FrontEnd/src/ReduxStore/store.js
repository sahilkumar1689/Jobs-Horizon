import { configureStore } from "@reduxjs/toolkit";
import logInSlice from "./Slices/logInSlice";
import searchDataSlice from "./Slices/SearchDataSlice";
import candidateProfileSlice from "./Slices/CandidateProfile";
import companyProfileSlice from "./Slices/CompanyProfile";
import addedJobsSlice from "./Slices/AddedJobs";

const reduxStore = configureStore({
  reducer: {
    isLogin: logInSlice.reducer,
    searchData: searchDataSlice.reducer,
    candidateProfile: candidateProfileSlice.reducer,
    companyProfile: companyProfileSlice.reducer,
    addedJobs: addedJobsSlice.reducer,
  },
});

export default reduxStore;
