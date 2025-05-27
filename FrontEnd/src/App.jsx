import { lazy, useEffect } from "react";
import Home from "./Components/Home.jsx";
import About from "./Components/About.jsx";
// const Home = lazy(() => import("./Components/Home.jsx"));
// const About = lazy(() => import("./Components/About.jsx"));
const JobSingle = lazy(() => import("./Components/JobSingle.jsx"));
const PostJob = lazy(() => import("./Components/PostJob.jsx"));
const Testimonial = lazy(() => import("./Components/Testimonial.jsx"));
const FrequentQuestion = lazy(() =>
  import("./Components/FrequentQuestion.jsx")
);

const Contact = lazy(() => import("./Components/Contact.jsx"));
const LogIn = lazy(() => import("./Components/LogIn.jsx"));
const SearchListJobs = lazy(() => import("./Components/SearchListJobs"));
const Profilepage = lazy(() => import("./Components/Profilepage.jsx"));
const AppliedJob = lazy(() => import("./Components/AppliedJob.jsx"));
const AdminPannel = lazy(() => import("./AdminPannel/AdminPannel.jsx"));
const UpdateProfileForm = lazy(() =>
  import("./Components/UpdateProfileForm.jsx")
);
const RecruiterPannel = lazy(() => import("./Components/RecruiterPannel.jsx"));
const AddedJobs = lazy(() => import("./Components/AddedJobs.jsx"));
const AppliedApplicant = lazy(() =>
  import("./Components/AppliedApplicant.jsx")
);
const UpdateCompanyForm = lazy(() =>
  import("./Components/UpdateCompanyForm.jsx")
);
const AllJobs = lazy(() => import("./Components/AllJobs.jsx"));

import { ToastContainer } from "react-toastify";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logInAction } from "./ReduxStore/Slices/logInSlice.js";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  let localData = localStorage.getItem("userLogIn") ? true : false;
  let dispatch = useDispatch();
  dispatch(logInAction.setLogIn(localData));

  let isLogIn = useSelector((state) => state.isLogin);

  // console.log(import.meta.env.VITE_BACKEND_URL);

  const PrivateRouter = ({ element }) => {
    return isLogIn ? element : <Navigate to="/logIn" />;
  };

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminPannel/*" element={<AdminPannel />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobSingle/:id" element={<JobSingle />} />
          <Route path="/allJobs" element={<AllJobs />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/frequentQuestion" element={<FrequentQuestion />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/searchListJobs" element={<SearchListJobs />} />
          <Route
            path="/postJob"
            element={<PrivateRouter element={<PostJob />} />}
          />
          <Route
            path="/companyProfile"
            element={<PrivateRouter element={<RecruiterPannel />} />}
          />
          <Route
            path="/candidateProfile"
            element={<PrivateRouter element={<Profilepage />} />}
          />
          <Route
            path="/updateProfileForm"
            element={<PrivateRouter element={<UpdateProfileForm />} />}
          />
          <Route
            path="/updateCompanyForm"
            element={<PrivateRouter element={<UpdateCompanyForm />} />}
          />
          <Route
            path="/appliedApplicant/:autoId"
            element={<PrivateRouter element={<AppliedApplicant />} />}
          />
          <Route
            path="/appliedJob"
            element={<PrivateRouter element={<AppliedJob />} />}
          />
          <Route
            path="/addedJob"
            element={<PrivateRouter element={<AddedJobs />} />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
